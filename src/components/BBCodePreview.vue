<template>
    <div class="h-full flex flex-col gap-1">
        <div class="flex items-center justify-between px-4 py-3 border-b border-[#3c3c3c] bg-[#22242a] rounded-sm">
            <h3 class="m-0 text-sm font-semibold text-[#cccccc]">实时预览</h3>

            <div class="flex items-center gap-3">
                <!-- 用户输入和显示 -->
                <div class="flex items-center gap-2">
                    <input v-if="!currentUserInfo" v-model="userInput" @keyup.enter="handleUserInput" type="text" placeholder="输入你的 osu! ID" class="bg-[#1a1b1e] border border-[#3c3c3c] text-[#cccccc] text-sm rounded px-3 py-1.5 w-40 focus:outline-none focus:border-[#ff66aa] transition-colors" />
                    <button v-if="!currentUserInfo && userInput" @click="handleUserInput" class="bg-[#ff66aa] hover:bg-[#ff4488] text-white text-sm px-3 py-1.5 rounded transition-colors">确认</button>

                    <!-- 用户头像和信息 -->
                    <a v-if="currentUserInfo" :href="`https://osu.ppy.sh/users/${currentUserInfo.id}`" target="_blank" class="flex items-center gap-2 hover:opacity-80 transition-opacity" :title="`${currentUserInfo.username} (ID: ${currentUserInfo.id})`">
                        <img :src="currentUserInfo.avatar_url" :alt="currentUserInfo.username" class="w-8 h-8 rounded-full border-2 border-[#3c3c3c]" />
                        <span class="text-[#cccccc] text-sm font-medium">{{ currentUserInfo.username }}</span>
                    </a>
                    <button v-if="currentUserInfo" @click="clearCurrentUser" class="bg-transparent border-0 text-[#cccccc] cursor-pointer p-1 rounded hover:bg-[#3c3c3c] transition-all" title="清除用户">
                        <span class="fas fa-times"></span>
                    </button>
                </div>

                <button class="bg-transparent border-0 text-[#cccccc] cursor-pointer p-1 rounded transition-all duration-200 text-base flex items-center justify-center hover:bg-[#3c3c3c] hover:rotate-180" @click="forceUpdate" title="刷新预览">
                    <span>🔄</span>
                </button>
            </div>
        </div>

        <div class="flex-1 overflow-y-auto p-6 text-[#ffffff] bbcode preview-content custom-scrollbar" v-html="parsedContent"></div>
    </div>
</template>

<script setup lang="ts">
    import { computed, ref, onMounted, watch } from "vue"
    import { useAudioPlayer } from "@/composables/useAudioPlayer"
    import { useBoxToggle } from "@/composables/useBoxToggle"
    import { useUserInfo } from "@/composables/useUserInfo"
    import { trimBrTags, generateRandomId, escapeHtml } from "@/utils/stringUtils"
    import { createBox, createProfileLink, createAudioBox, getFriendButtonHTML } from "@/utils/htmlGenerators"
    import { API_ENDPOINTS, SIZE_REGEX } from "@/constants/bbcode"
    import { apiClient } from "@/utils/apiClient"
    import type { UserInfo } from "@/types/user"

    const props = defineProps<{
        content: string
    }>()

    // 初始化音频播放器
    const { initAudioPlayers } = useAudioPlayer()

    // 盒子折叠逻辑
    const { boxStates, boxCounters, registerGlobalHandlers, resetBoxes } = useBoxToggle()

    // 用户信息管理
    const { currentUserInfo, userInput, handleUserInput, clearCurrentUser, getFriendshipStatus } = useUserInfo()

    // 注册全局处理器
    onMounted(() => {
        if (typeof window !== "undefined") {
            // 注册盒子折叠处理器
            registerGlobalHandlers()

            // 注册用户卡片处理器
            ;(window as any).showUserCard = showUserCard
            ;(window as any).hideUserCard = hideUserCard
            ;(window as any).keepUserCard = keepUserCard
        }
    })

    const refreshKey = ref(0)
    let profileCardCounter = 0

    const forceUpdate = () => {
        refreshKey.value++
    }

    const parseBoxes = (text: string): string => {
        const boxOpenRegex = /\[box=(.*?)]([\s\S]*)/i
        const boxCloseRegex = /([\s\S]*?)\[\/box]/i
        let match, matchNew, textNew

        while ((match = boxOpenRegex.exec(text))) {
            const boxName = match[1]
            boxCounters.value[boxName] = (boxCounters.value[boxName] || 0) + 1
            textNew = text.substring(0, match.index)

            matchNew = boxCloseRegex.exec(match[2])

            try {
                if (!matchNew) throw new Error("Box not closed")

                let boxContent = matchNew[1]

                // 去除内容开头和结尾的多余 <br>
                boxContent = trimBrTags(boxContent)
                const boxId = generateRandomId("box")
                textNew += createBox(boxName, boxContent, boxId, boxStates.value)
                textNew += text.substring(match.index + 6 + boxName.length + matchNew[0].length)

                text = textNew
            } catch (error) {
                console.error("Box parsing error:", error)
                return text
            }
        }

        return text
    }

    const parseSpoilerBoxes = (text: string): string => {
        const spoilerBoxOpenRegex = /\[spoilerbox]([\s\S]*)/i
        const spoilerBoxCloseRegex = /([\s\S]*?)\[\/spoilerbox]/i
        let match, matchNew, textNew

        while ((match = spoilerBoxOpenRegex.exec(text))) {
            textNew = text.substring(0, match.index)

            matchNew = spoilerBoxCloseRegex.exec(match[1])

            try {
                if (!matchNew) throw new Error("Spoilerbox not closed")

                let boxContent = matchNew[1]

                // 去除内容开头和结尾的多余 <br>
                boxContent = trimBrTags(boxContent)
                const boxId = generateRandomId("box")
                textNew += createBox("SPOILER", boxContent, boxId, boxStates.value)
                textNew += text.substring(match.index + 12 + matchNew[0].length)

                text = textNew
            } catch (error) {
                console.error("Spoilerbox parsing error:", error)
                return text
            }
        }

        return text
    }

    const parsedContent = computed(() => {
        // 强制更新
        refreshKey.value

        let html = props.content

        // 重置 box 计数器和 profile 卡片计数器
        resetBoxes()
        profileCardCounter = 0

        // 清除所有旧的 profile 卡片 DOM 元素
        if (typeof document !== "undefined") {
            const oldCards = document.querySelectorAll('[id^="qtip-"]')
            oldCards.forEach((card) => card.remove())
        }

        // 0. 提取代码块内容（防止内部BBCode被解析）
        const codeBlocks: string[] = []

        // 提取 [code] 块
        html = html.replace(/\[code](.*?)\[\/code]/gis, (match, content) => {
            const index = codeBlocks.length
            codeBlocks.push(content)
            return `__CODE_BLOCK_${index}__`
        })

        // 1. 换行处理（最先处理）
        html = html.replace(/\n/g, "<br>")
        html = html.replace(/\[\/heading]<br>/g, "[/heading]")

        // 2. 文本格式标签
        // Bold
        html = html.replace(/\[b](.*?)\[\/b]/gis, "<strong>$1</strong>")

        // Italic
        html = html.replace(/\[i](.*?)\[\/i]/gis, "<em>$1</em>")

        // Underline
        html = html.replace(/\[u](.*?)\[\/u]/gis, "<u>$1</u>")

        // Strikethrough
        html = html.replace(/\[s](.*?)\[\/s]/gis, "<s>$1</s>")
        html = html.replace(/\[strike](.*?)\[\/strike]/gis, "<s>$1</s>")

        // 3. 颜色和大小
        // Color
        html = html.replace(/\[color=(.*?)](.*?)\[\/color]/gis, '<span style="color:$1;">$2</span>')

        // Size (只有50、85、100、150可被渲染)
        html = html.replace(SIZE_REGEX, (match, size, text) => {
            return `<span style="font-size:${size}%;">${text}</span>`
        })

        // 4. 特殊标签
        // Spoiler
        html = html.replace(/\[spoiler](.*?)\[\/spoiler]/gis, '<span class="spoiler" onclick="this.classList.toggle(\'revealed\')">$1</span>')

        // Box (复杂处理)
        html = parseBoxes(html)

        // Spoiler Box (固定名称为 SPOILER)
        html = parseSpoilerBoxes(html)

        // Quote
        html = html.replace(/\[quote](.*?)\[\/quote]/gis, (match, content) => {
            return `<blockquote>${trimBrTags(content)}</blockquote>`
        })
        html = html.replace(/\[quote="(.*?)"\](.*?)\[\/quote]/gis, (match, author, content) => {
            return `<blockquote><h4>${author} wrote:</h4>${trimBrTags(content)}</blockquote>`
        })

        // Code（c only）
        html = html.replace(/\[c](.*?)\[\/c]/gis, (match, content) => {
            // 如果包含 <br> 换行，则不解析
            if (content.includes("<br>")) {
                return match
            }
            return `<code>${content}</code>`
        })

        // 5. 布局标签
        // Centre
        html = html.replace(/\[centre](.*?)\[\/centre]/gis, "<center>$1</center>")

        // 6. 链接和媒体
        // URL
        html = html.replace(/\[url](.*?)\[\/url]/gis, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
        html = html.replace(/\[url=(.*?)](.*?)\[\/url]/gis, '<a href="$1" target="_blank" rel="noopener noreferrer">$2</a>')

        // Profile (osu! specific) - 带悬浮卡片
        html = html.replace(/\[profile=(.*?)](.*?)\[\/profile]/gis, (match, userId, username) => {
            const qtipId = profileCardCounter++
            return createProfileLink(userId, username, qtipId)
        })

        // 7. 列表
        // 有序列表 [list=TYPE]（TYPE 可以是任意值）
        html = html.replace(/\[list=([^\]]+)](.*?)\[\/list]/gis, (match, type, content) => {
            return `<ol>${trimBrTags(content)}</ol>`
        })
        // 无序列表 [list]（默认）
        html = html.replace(/\[list](.*?)\[\/list]/gis, (match, content) => {
            return `<ol class="unordered">${trimBrTags(content)}</ol>`
        })
        // 列表项 [*]（同时支持有序和无序列表）
        html = html.replace(/\[\*](.*?)(?=\[\*]|<\/[ou]l>)/gis, "<li>$1</li>")

        // email
        html = html.replace(/\[email=(.*?)](.*?)\[\/email]/gis, '<a href="mailto:$1">$2</a>')

        // Images
        html = html.replace(/\[img](.*?)\[\/img]/gis, '<img src="$1" alt="Image" />')
        html = html.replace(/\[img=(.*?)](.*?)\[\/img]/gis, '<img src="$2" alt="Image" style="max-width: $1px;" />')

        // Youtube
        html = html.replace(/\[youtube](.*?)\[\/youtube]/gis, '<iframe class="u-embed-wide u-embed-wide--bbcode" src="https://www.youtube.com/embed/$1?rel=0" allowfullscreen></iframe>')

        //audio
        html = html.replace(/\[audio](.*?)\[\/audio]/gis, (match, content) => {
            return createAudioBox(content)
        })

        // 8. osu! 特有标签
        // Heading (osu! style)
        html = html.replace(/\[heading](.*?)\[\/heading]/gis, '<h2 class="osu-heading">$1</h2>')

        // Notice (well box)
        html = html.replace(/\[notice](.*?)\[\/notice]/gis, (match, content) => {
            return `<div class="well">${trimBrTags(content)}</div>`
        })

        // 清理多余的 <br> 标签
        html = html.replace(/(<\/div>\s*)<br>/g, "</div>")
        html = html.replace(/(<\/blockquote>\s*)<br>/g, "</blockquote>")

        // 8.5. 自动链接检测（将裸露的URL转换为链接）
        // 匹配不在 HTML 属性内的 http:// 或 https:// URL
        html = html.replace(/(?<!["=])https?:\/\/[^\s<>"]+/gi, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
        })

        // 9. 还原代码块（防止 HTML 渲染）
        // 还原 [code] 块
        codeBlocks.forEach((content, index) => {
            const escapedContent = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            html = html.replace(`__CODE_BLOCK_${index}__`, `<pre>${trimBrTags(escapedContent)}</pre>`)
        })

        html = html.replace(/(<\/pre>\s*)<br>/g, "</pre>")

        return html
    })

    // 监听内容变化，重新初始化音频播放器
    watch(parsedContent, () => {
        // 使用 nextTick 确保 DOM 已更新
        setTimeout(() => {
            initAudioPlayers()
        }, 0)
    })

    const getUserInfo = async (userId: string): Promise<UserInfo | null> => {
        try {
            const data = await apiClient.get<{ users: UserInfo[] }>(`${API_ENDPOINTS.USER_LOOKUP}?ids[]=${userId}`)
            return data.users[0] || null
        } catch (error) {
            console.error("Failed to fetch user info:", error)
            return null
        }
    }

    const getFlagUrl = (countryCode: string): string => {
        const baseFileName = countryCode
            .split("")
            .map((c) => (c.charCodeAt(0) + 127397).toString(16))
            .join("-")

        return `https://osu.ppy.sh/assets/images/flags/${baseFileName}.svg`
    }

    // 用户卡片相关的全局处理器
    let userCardTimeout: number | null = null

    // 保持用户卡片显示（不重新计算位置）
    const keepUserCard = () => {
        if (userCardTimeout) {
            clearTimeout(userCardTimeout)
            userCardTimeout = null
        }
    }

    const showUserCard = async (qtipId: number, triggerElement: HTMLElement) => {
        if (userCardTimeout) {
            clearTimeout(userCardTimeout)
            userCardTimeout = null
        }

        // 立即隐藏所有其他已显示的卡片
        const allCards = document.querySelectorAll('[id^="qtip-"]')
        allCards.forEach((card) => {
            if (card.id !== `qtip-${qtipId}`) {
                ;(card as HTMLElement).style.transition = "opacity 0.1s ease"
                ;(card as HTMLElement).style.opacity = "0"
                setTimeout(() => {
                    ;(card as HTMLElement).style.display = "none"
                }, 100)
            }
        })

        if (!document.getElementById(`qtip-${qtipId}`)) {
            const userId = triggerElement.getAttribute("data-user-id")
            if (!userId) return
            const userInfo = await getUserInfo(userId)
            if (!userInfo) return
            console.log(userInfo)
            const friendStatus = getFriendshipStatus(parseInt(userId))
            const card = /* html */ `
                    <div id="qtip-${qtipId}"
                        class="qtip qtip--user-card"
                        data-qtip-id="${qtipId}"
                        style="z-index: 15001;"
                        onmouseenter="window.keepUserCard?.()"
                        onmouseleave="window.hideUserCard?.(${qtipId})">
                        <div class="qtip-content">
                            <div class="user-card user-card--card user-card--highlightable js-react--user-card-tooltip">
                                <div class="user-card user-card--card user-card--highlightable">
                                    <a class="user-card__background-container" href="https://osu.ppy.sh/users/${userId}" target="_blank">
                                        <img class="user-card__background" src="${escapeHtml(userInfo.cover?.custom_url || userInfo.cover?.url || "")}">
                                        <div class="user-card__background-overlay">
                                        </div>
                                    </a>
                                    <div class="user-card__card">
                                        <div class="user-card__content user-card__content--details">
                                            <div class="user-card__user">
                                                <div class="user-card__avatar-space">
                                                    <div class="user-card__avatar-spinner user-card__avatar-spinner--loaded"> <!-- TODO: add loading logic -->
                                                        <span class="la-ball-clip-rotate la-ball-clip-rotate--loaded">
                                                        </span>
                                                    </div>
                                                    <img class="user-card__avatar user-card__avatar--loaded" src="${escapeHtml(userInfo.avatar_url)}">
                                                </div>
                                            </div>
                                            <div class="user-card__details">
                                                <div class="user-card__icons user-card__icons--card">
                                                    <!-- country -->
                                                    <a class="user-card__icon user-card__icon--flag" href="https://osu.ppy.sh/rankings/osu/performance?country=${userInfo.country_code}">
                                                        <span class="flag-country" title="${escapeHtml(userInfo.country?.name || userInfo.country_code)}" original-title="${escapeHtml(userInfo.country?.name || userInfo.country_code)}" style="background-image: url('${getFlagUrl(userInfo.country_code)}');">
                                                        </span>
                                                    </a>
                                                    <!-- team -->
                                                    ${
                                                        userInfo.team
                                                            ? /* html */ `<a class="user-card__icon user-card__icon--flag" href="https://osu.ppy.sh/teams/${userInfo.team.id}">
                                                            <span class="flag-team" style="background-image: url('${escapeHtml(userInfo.team.flag_url)}');" title="${escapeHtml(userInfo.team.name)}"></span>
                                                        </a>`
                                                            : ""
                                                    }
                                                    <!-- supporter -->
                                                    ${
                                                        userInfo.is_supporter
                                                            ? /* html */ `<a class="user-card__icon" href="https://osu.ppy.sh/home/support">
                                                            <span class="supporter-icon supporter-icon--user-card" title="osu! 支持者">
                                                                <span class="fas fa-heart"></span>
                                                            </span>
                                                        </a>`
                                                            : ""
                                                    }
                                                    <!-- friend -->
                                                    ${getFriendButtonHTML(friendStatus)}
                                                    <!-- bell mapper -->
                                                    <div class="user-card__icon">
                                                        <div title="该用户上传新谱面时不要再通知我">
                                                            <button class="user-action-button user-action-button--user-card user-action-button--friend">
                                                                <span class="user-action-button__icon-container">
                                                                    <i class="fas fa-bell">
                                                                    </i>
                                                                </span>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="user-card__username-row">
                                                    <a class="user-card__username u-ellipsis-pre-overflow" href="https://osu.ppy.sh/users/${userId}">${escapeHtml(userInfo.username)}</a>
                                                    <div v-if="${userInfo.groups}" class="user-card__group-badges">
                                                        <span class="user-card__group-badge"><!-- TODO: show groups like ALM here -->
                                                            <a class="user-group-badge user-group-badge--alumni" data-label="ALM" href="https://osu.ppy.sh/groups/16" style="--group-colour: #999999;" data-orig-title="osu! Alumni" data-hasqtip="4">
                                                            </a>
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="user-card__content user-card__content--status">
                                            <div class="user-card__status">
                                                <div class="user-card__status-icon-container">
                                                    <div class="user-card__status-icon ${userInfo.is_online ? "user-card__status-icon--online" : "user-card__status-icon--offline"}">
                                                    </div>
                                                </div>
                                                <div class="user-card__status-messages">
                                                    <span class="user-card__status-message user-card__status-message--sub u-ellipsis-overflow"></span>
                                                    <span class="user-card__status-message u-ellipsis-overflow">${userInfo.is_online ? "在线" : "离线"}</span>
                                                </div>
                                            </div>
                                            <div class="user-card__icons user-card__icons--menu">
                                                <div class="user-card__icon user-card__icon--menu">
                                                    <button class="popup-menu" type="button">
                                                        <span class="fas fa-ellipsis-v">
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                `
            document.body.insertAdjacentHTML("beforeend", card)
        }

        const card = document.getElementById(`qtip-${qtipId}`)
        if (card) {
            const rect = triggerElement.getBoundingClientRect()
            const cardRect = card.getBoundingClientRect()
            let top = (rect.bottom + rect.top) / 2 - 65
            let left = rect.right

            // 如果超出右侧边界，不显示
            if (left + cardRect.width > window.innerWidth) {
                return
            }

            // 如果超出底部边界，不显示
            if (top + cardRect.height > window.innerHeight + window.scrollY) {
                return
            }

            card.style.transition = "opacity 0.1s ease"
            card.style.opacity = "1"
            card.style.top = `${top}px`
            card.style.left = `${left}px`
            card.style.display = "block"
        }
    }

    const hideUserCard = (qtipId: number) => {
        userCardTimeout = window.setTimeout(() => {
            const card = document.getElementById(`qtip-${qtipId}`)
            if (card) {
                card.style.transition = "opacity 0.1s ease"
                card.style.opacity = "0"

                // 淡出动画结束后隐藏
                setTimeout(() => {
                    card.style.display = "none"
                }, 100)
            }
        }, 200)
    }
</script>
