/**
 * HTML 生成工具函数
 * 用于生成 BBCode 解析后的 HTML 字符串
 */

import { CHEVRON_ICONS } from "@/constants/icons"
import type { BoxState } from "@/types/bbcode"
import { escapeHtml } from "./stringUtils"

/**
 * 创建折叠盒子的 HTML
 * @param name - 盒子标题
 * @param content - 盒子内容
 * @param boxId - 盒子唯一 ID
 * @param boxStates - 盒子状态对象
 * @returns HTML 字符串
 */
export const createBox = (name: string, content: string, boxId: string, boxStates: BoxState): string => {
    // 移除内容开头和结尾的 <br>
    content = content.replace(/^<br>/, "").replace(/<br>$/, "")

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

/**
 * 创建用户资料链接的 HTML
 * @param userId - 用户 ID
 * @param username - 用户名
 * @param qtipId - 卡片 ID
 * @returns HTML 字符串
 */
export const createProfileLink = (userId: string, username: string, qtipId: number): string => {
    const userUrl = `https://osu.ppy.sh/users/${userId}`

    return `
        <a class="user-name js-usercard"
        data-user-id="${userId}"
        href="${userUrl}"
        data-qtip-id="${qtipId}"
        target="_blank"
        rel="noopener noreferrer"
        onmouseenter="window.showUserCard?.(${qtipId}, this)"
        onmouseleave="window.hideUserCard?.(${qtipId})"
        onclick="window.cancelUserCardShow?.()">
            ${escapeHtml(username)}
        </a>
    `
}

/**
 * 创建音频播放器的 HTML
 * @param url - 音频文件 URL
 * @returns HTML 字符串
 */
export const createAudioBox = (url: string): string => {
    return /*html*/ `<div class="audio-player js-audio--player" data-audio-url="${url}" data-audio-state="paused">
        <button type="button" class="audio-player__button audio-player__button--play js-audio--play"><span class="fa-fw play-button"></span></button>

        <div class="audio-player__bar audio-player__bar--progress js-audio--seek">
            <div class="audio-player__bar-current"></div>
        </div>

        <div class="audio-player__timestamps">
            <div class="audio-player__timestamp audio-player__timestamp--current"></div>
            <div class="audio-player__timestamp-separator">/</div>
            <div class="audio-player__timestamp audio-player__timestamp--total"></div>
        </div>
    </div>`
}

/**
 * 根据好友关系生成按钮 HTML
 * @param status - 好友关系状态
 * @returns HTML 字符串
 */
export const getFriendButtonHTML = (status: "mutual" | "friend" | "none"): string => {
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
