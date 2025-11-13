import { getUserInfo, getFlagUrl } from "@/services/userService"
import { escapeHtml } from "@/utils/stringUtils"
import { getFriendButtonHTML } from "@/utils/htmlGenerators"

interface CardInfo {
    qtipId: number
    triggerElement: HTMLElement
}

export const useUserCard = (getFriendshipStatus: (userId: number) => "mutual" | "friend" | "none") => {
    let userCardTimeout: number | null = null
    let currentCardInfo: CardInfo | null = null
    let scrollListener: (() => void) | null = null

    /**
     * 保持用户卡片显示（不重新计算位置）
     */
    const keepUserCard = () => {
        if (userCardTimeout) {
            clearTimeout(userCardTimeout)
            userCardTimeout = null
        }
    }

    /**
     * 更新用户卡片位置（使用 fixed 定位，相对于视口）
     */
    const updateCardPosition = (qtipId: number, triggerElement: HTMLElement) => {
        const card = document.getElementById(`qtip-${qtipId}`)
        if (!card) return

        const rect = triggerElement.getBoundingClientRect()

        // 使用 fixed 定位，直接用视口坐标
        let top = (rect.bottom + rect.top) / 2 - 67
        let left = rect.right

        // 更新位置（不触发过渡动画）
        card.style.transition = "none"
        card.style.top = `${top}px`
        card.style.left = `${left}px`
        // 恢复过渡动画（用于透明度变化）
        requestAnimationFrame(() => {
            card.style.transition = "opacity 0.1s ease"
        })
    }

    /**
     * 清理滚动监听器
     */
    const cleanupScrollListener = () => {
        if (scrollListener) {
            const previewContent = document.querySelector(".preview-content")
            if (previewContent) {
                previewContent.removeEventListener("scroll", scrollListener)
            }
            scrollListener = null
        }
    }

    /**
     * 显示用户卡片
     */
    const showUserCard = async (qtipId: number, triggerElement: HTMLElement) => {
        if (userCardTimeout) {
            clearTimeout(userCardTimeout)
            userCardTimeout = null
        }

        // 清理之前的滚动监听器
        cleanupScrollListener()

        // 存储当前 card 信息
        currentCardInfo = { qtipId, triggerElement }

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
                                                    <div class="user-card__avatar-spinner user-card__avatar-spinner--loaded">
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
                                                            ${
                                                                userInfo.team.flag_url
                                                                    ? /* html */ `<span class="flag-team" title="${escapeHtml(userInfo.team.name)}" style="background-image: url('${escapeHtml(userInfo.team.flag_url)}');">
                                                            </span>`
                                                                    : /* html */ `<span class="flag-team" title="${escapeHtml(userInfo.team.name)}"></span>`
                                                            }
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
                                                        <span class="user-card__group-badge">
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
            let top = (rect.bottom + rect.top) / 2 - 67
            let left = rect.right

            // 如果超出右侧边界，不显示
            if (left + cardRect.width > window.innerWidth) {
                return
            }

            // 如果超出底部边界，不显示（fixed 定位相对于视口）
            if (top + cardRect.height > window.innerHeight) {
                return
            }

            card.style.transition = "opacity 0.1s ease"
            card.style.opacity = "1"
            card.style.top = `${top}px`
            card.style.left = `${left}px`
            card.style.display = "block"

            // 添加滚动监听器
            const previewContent = document.querySelector(".preview-content")
            if (previewContent) {
                scrollListener = () => {
                    if (currentCardInfo) {
                        updateCardPosition(currentCardInfo.qtipId, currentCardInfo.triggerElement)
                    }
                }
                previewContent.addEventListener("scroll", scrollListener)
            }
        }
    }

    /**
     * 隐藏用户卡片
     */
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

                if (currentCardInfo && currentCardInfo.qtipId === qtipId) {
                    cleanupScrollListener()
                    currentCardInfo = null
                }
            }
        }, 200)
    }

    /**
     * 注册全局处理器
     */
    const registerGlobalHandlers = () => {
        if (typeof window !== "undefined") {
            ;(window as any).showUserCard = showUserCard
            ;(window as any).hideUserCard = hideUserCard
            ;(window as any).keepUserCard = keepUserCard
        }
    }

    /**
     * 清理全局处理器
     */
    const cleanup = () => {
        cleanupScrollListener()
        currentCardInfo = null
        if (userCardTimeout) {
            clearTimeout(userCardTimeout)
            userCardTimeout = null
        }
        if (typeof window !== "undefined") {
            delete (window as any).showUserCard
            delete (window as any).hideUserCard
            delete (window as any).keepUserCard
        }
    }

    return {
        registerGlobalHandlers,
        cleanup,
        showUserCard,
        hideUserCard,
        keepUserCard,
    }
}
