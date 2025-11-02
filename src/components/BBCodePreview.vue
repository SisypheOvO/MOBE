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

    const props = defineProps<{
        content: string
    }>()

    const refreshKey = ref(0)
    let boxCounters: Record<string, number> = {}
    const boxStates: Record<string, "open" | "closed"> = {}
    let profileCardCounter = 0

    // 当前用户信息和好友列表
    const currentUserId = ref<string | null>(null)
    const friendsList = ref<Array<{ target_id: number; relation_type: string; mutual: boolean }>>([])
    const currentUserInfo = ref<any>(null)
    const userInput = ref("")

    // 从 localStorage 获取当前用户信息
    onMounted(async () => {
        const savedUserInfo = localStorage.getItem("osu_current_user_info")
        if (savedUserInfo) {
            try {
                currentUserInfo.value = JSON.parse(savedUserInfo)
                currentUserId.value = currentUserInfo.value.id.toString()
                if (currentUserId.value) {
                    await fetchFriendsList(currentUserId.value)
                }
            } catch (error) {
                console.error("Failed to parse saved user info:", error)
                localStorage.removeItem("osu_current_user_info")
            }
        }
    })

    // 处理用户输入
    const handleUserInput = async () => {
        if (!userInput.value.trim()) return

        try {
            const response = await fetch(`http://localhost:3000/api/current-user?userId=${userInput.value}`)
            if (!response.ok) {
                alert("无法获取用户信息，请检查用户 ID 是否正确")
                return
            }

            const userData = await response.json()
            currentUserInfo.value = userData
            currentUserId.value = userData.id.toString()

            // 保存到 localStorage
            localStorage.setItem("osu_current_user_info", JSON.stringify(userData))
            localStorage.setItem("osu_current_user_id", userData.id.toString())

            // 获取好友列表
            await fetchFriendsList(userData.id.toString())

            userInput.value = ""
        } catch (error) {
            console.error("Failed to fetch user info:", error)
            alert("获取用户信息失败，请稍后重试")
        }
    }

    // 清除当前用户
    const clearCurrentUser = () => {
        currentUserInfo.value = null
        currentUserId.value = null
        friendsList.value = []
        localStorage.removeItem("osu_current_user_info")
        localStorage.removeItem("osu_current_user_id")
    }

    // 获取当前用户的好友列表
    const fetchFriendsList = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/current-user?userId=${userId}`)
            if (!response.ok) {
                console.error("Failed to fetch current user info:", response.status)
                return
            }
            const data = await response.json()
            friendsList.value = data.friends || []
        } catch (error) {
            console.error("Failed to fetch friends list:", error)
        }
    }

    // 检查用户的好友关系
    const getFriendshipStatus = (userId: number): "mutual" | "friend" | "none" => {
        const friend = friendsList.value.find((f) => f.target_id === userId)
        if (!friend) return "none"
        return friend.mutual ? "mutual" : "friend"
    }

    // 根据好友关系生成按钮 HTML
    const getFriendButtonHTML = (userId: number): string => {
        const status = getFriendshipStatus(userId)

        if (status === "mutual") {
            // 互相好友
            return /* html */ `
                <div class="user-card__icon">
                    <div title="删除好友">
                        <button class="user-action-button user-action-button--user-card user-action-button--mutual" type="button">
                            <span class="user-action-button__icon-container">
                                <span class="user-action-button__icon user-action-button__icon--hover-visible">
                                    <span class="fas fa-user-xmark"></span>
                                </span>
                                <span class="user-action-button__icon user-action-button__icon--hover-hidden">
                                    <span class="fas fa-user-group"></span>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>`
        } else if (status === "friend") {
            // 单向好友（我关注了他）
            return /* html */ `
                <div class="user-card__icon">
                    <div title="删除好友">
                        <button class="user-action-button user-action-button--user-card user-action-button--friend" type="button">
                            <span class="user-action-button__icon-container">
                                <span class="user-action-button__icon user-action-button__icon--hover-visible">
                                    <span class="fas fa-user-xmark"></span>
                                </span>
                                <span class="user-action-button__icon user-action-button__icon--hover-hidden">
                                    <span class="fas fa-user"></span>
                                </span>
                            </span>
                        </button>
                    </div>
                </div>`
        } else {
            // 不是好友
            return /* html */ `
                <div class="user-card__icon">
                    <div title="添加好友">
                        <button class="user-action-button user-action-button--user-card" type="button">
                            <span class="user-action-button__icon-container">
                                <span class="fas fa-user-plus"></span>
                            </span>
                        </button>
                    </div>
                </div>`
        }
    }

    const CHEVRON_ICONS = {
        DOWN: '<path d="M5 7L8 10L11 7" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(0, 1)"/>',
        RIGHT: '<path d="M7 5L10 8L7 11" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" transform="translate(1, 0)"/>',
    }

    const forceUpdate = () => {
        refreshKey.value++
    }

    // 通用的内容清理函数：去除开头和结尾的 <br> 标签
    const trimBrTags = (content: string): string => {
        return content.replace(/^(\s*<br>\s*)+/, "").replace(/(\s*<br>\s*)+$/, "")
    }

    const parsedContent = computed(() => {
        // 强制更新
        refreshKey.value

        let html = props.content

        // 重置 box 计数器和 profile 卡片计数器
        boxCounters = {}
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
        html = html.replace(/\[size=(50|85|100|150)](.*?)\[\/size]/gis, (match, size, text) => {
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

    const parseBoxes = (text: string): string => {
        const boxOpenRegex = /\[box=(.*?)]([\s\S]*)/i
        const boxCloseRegex = /([\s\S]*?)\[\/box]/i
        let match, matchNew, textNew

        while ((match = boxOpenRegex.exec(text))) {
            const boxName = match[1]
            boxCounters[boxName] = (boxCounters[boxName] || 0) + 1
            textNew = text.substring(0, match.index)

            matchNew = boxCloseRegex.exec(match[2])

            try {
                if (!matchNew) throw new Error("Box not closed")

                let boxContent = matchNew[1]

                // 去除内容开头和结尾的多余 <br>
                boxContent = boxContent.replace(/^(\s*<br>\s*)+/, "").replace(/(\s*<br>\s*)+$/, "")
                textNew += createBox(boxName, boxContent)
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
                boxContent = boxContent.replace(/^(\s*<br>\s*)+/, "").replace(/(\s*<br>\s*)+$/, "")
                textNew += createBox("SPOILER", boxContent)
                textNew += text.substring(match.index + 12 + matchNew[0].length)

                text = textNew
            } catch (error) {
                console.error("Spoilerbox parsing error:", error)
                return text
            }
        }

        return text
    }

    const createBox = (name: string, content: string): string => {
        content = content.replace(/^<br>/, "").replace(/<br>$/, "")

        // 生成完全唯一的随机ID
        const boxId = `box-${Math.random().toString(36).substr(2, 9)}`
        const isOpen = boxStates[boxId] === "open"
        const chevronIcon = isOpen ? CHEVRON_ICONS.DOWN : CHEVRON_ICONS.RIGHT

        return `
            <div class="bbcode-spoilerbox">
                <a class="bbcode-spoilerbox__link flex flex-row items-center" onclick="window.toggleBox?.('${boxId}', this); return false;" href="#">
                    <i class="bbcode-spoilerbox__link-icon ${isOpen ? "open" : ""}">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            ${chevronIcon}
                        </svg>
                    </i>
                    ${name}
                </a>
                <div class="bbcode-spoilerbox__body" id="${boxId}" style="${isOpen ? "" : "display: none;"}">
                    <div class="bbcode-spoilerbox__body-content">
                        ${content}
                    </div>
                </div>
            </div>
        `
    }

    const createProfileLink = (userId: string, username: string, qtipId: number): string => {
        const userUrl = `https://osu.ppy.sh/users/${userId}`

        return `
            <a class="user-name js-usercard"
            data-user-id="${userId}"
            href="${userUrl}"
            data-hasqtip="${qtipId}"
            target="_blank"
            rel="noopener noreferrer"
            onmouseenter="window.showUserCard?.(${qtipId}, this)"
            onmouseleave="window.hideUserCard?.(${qtipId})">
                ${username}
            </a>
        `
    }

    const getUserInfo = async (userId: string) => {
        try {
            const response = await fetch(`http://localhost:3000/api/users/lookup?ids[]=${userId}`)
            if (!response.ok) {
                console.error("Failed to fetch user info:", response.status, response.statusText)
                return null
            }
            const data = await response.json()
            const userInfo = data.users[0]
            return userInfo
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

    // 暴露 toggleBox 和用户卡片函数到 window
    if (typeof window !== "undefined") {
        let userCardTimeout: number | null = null

        ;(window as any).showUserCard = async (qtipId: number, triggerElement: HTMLElement) => {
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
                console.log(userInfo)
                const card = /* html */ `
                    <div id="qtip-${qtipId}"
                        class="qtip qtip--user-card"
                        data-qtip-id="${qtipId}"
                        style="z-index: 15001;"
                        onmouseenter="window.showUserCard?.(${qtipId}, this)"
                        onmouseleave="window.hideUserCard?.(${qtipId})">
                        <div class="qtip-content">
                            <div class="user-card user-card--card user-card--highlightable js-react--user-card-tooltip">
                                <div class="user-card user-card--card user-card--highlightable">
                                    <a class="user-card__background-container" href="https://osu.ppy.sh/users/${userId}" target="_blank">
                                        <img class="user-card__background" src="${userInfo.cover?.custom_url || userInfo.cover?.url || ""}">
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
                                                    <img class="user-card__avatar user-card__avatar--loaded" src="${userInfo.avatar_url}">
                                                </div>
                                            </div>
                                            <div class="user-card__details">
                                                <div class="user-card__icons user-card__icons--card">
                                                    <!-- country -->
                                                    <a class="user-card__icon user-card__icon--flag" href="https://osu.ppy.sh/rankings/osu/performance?country=${userInfo.country_code}">
                                                        <span class="flag-country" title="${userInfo.country?.name || userInfo.country_code}" original-title="${userInfo.country?.name || userInfo.country_code}" style="background-image: url('${getFlagUrl(userInfo.country_code)}');">
                                                        </span>
                                                    </a>
                                                    <!-- team -->
                                                    ${
                                                        userInfo.team
                                                            ? /* html */ `<a class="user-card__icon user-card__icon--flag" href="https://osu.ppy.sh/teams/${userInfo.team.id}">
                                                            <span class="flag-team" style="background-image: url('${userInfo.team.flag_url}');" title="${userInfo.team.name}"></span>
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
                                                    ${getFriendButtonHTML(parseInt(userId))}
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
                                                    <a class="user-card__username u-ellipsis-pre-overflow" href="https://osu.ppy.sh/users/${userId}">${userInfo.username}</a>
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
        ;(window as any).hideUserCard = (qtipId: number) => {
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
        ;(window as any).toggleBox = (boxId: string, element: HTMLElement) => {
            const boxBody = document.getElementById(boxId)
            const boxContent = boxBody?.querySelector(".bbcode-spoilerbox__body-content") as HTMLElement
            const icon = element.querySelector(".bbcode-spoilerbox__link-icon")
            const svg = icon?.querySelector("svg")

            if (!boxBody || !boxContent || !icon || !svg) return

            const isCurrentlyOpen = boxBody.style.height !== "0px" && boxBody.style.display !== "none"

            if (isCurrentlyOpen) {
                // 收起动画
                const currentHeight = boxBody.offsetHeight
                boxBody.style.height = currentHeight + "px"
                boxBody.style.overflow = "hidden"

                void boxBody.offsetHeight // 触发重绘

                boxBody.style.height = "0px"
                boxBody.style.opacity = "0"
                boxBody.style.transition = "height 300ms ease, opacity 300ms ease"

                svg.innerHTML = CHEVRON_ICONS.RIGHT
                icon.classList.remove("open")
                boxStates[boxId] = "closed"

                setTimeout(() => {
                    boxBody.style.display = "none"
                    boxBody.style.height = ""
                    boxBody.style.opacity = ""
                    boxBody.style.overflow = ""
                }, 300)
            } else {
                // 展开动画
                boxBody.style.display = "block"
                boxBody.style.height = "0px"
                boxBody.style.overflow = "hidden"
                boxBody.style.opacity = "0"

                const computed = window.getComputedStyle(boxContent)
                const marginTop = parseFloat(computed.marginTop || "0") || 0
                const marginBottom = parseFloat(computed.marginBottom || "0") || 0
                const targetHeight = boxContent.scrollHeight + marginTop + marginBottom

                void boxBody.offsetHeight // 触发重绘

                boxBody.style.height = targetHeight + "px"
                boxBody.style.opacity = "1"
                boxBody.style.transition = "height 300ms ease, opacity 300ms ease"

                svg.innerHTML = CHEVRON_ICONS.DOWN
                icon.classList.add("open")
                boxStates[boxId] = "open"

                setTimeout(() => {
                    boxBody.style.height = ""
                    boxBody.style.overflow = ""
                    boxBody.style.opacity = ""
                }, 300)
            }
        }
    }
</script>
