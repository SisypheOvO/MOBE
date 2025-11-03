/**
 * 字符串处理工具函数
 */

/**
 * 移除字符串开头和结尾的 <br> 标签
 * @param content - 要处理的字符串
 * @returns 处理后的字符串
 */
export const trimBrTags = (content: string): string => {
    return content.replace(/^(\s*<br>\s*)+/, "").replace(/(\s*<br>\s*)+$/, "")
}

/**
 * 生成随机ID
 * @param prefix - ID前缀
 * @returns 随机ID字符串
 */
export const generateRandomId = (prefix: string = "id"): string => {
    return `${prefix}-${Math.random().toString(36).substring(2, 9)}`
}

/**
 * 转义 HTML 特殊字符
 * @param text - 要转义的文本
 * @returns 转义后的文本
 */
export const escapeHtml = (text: string): string => {
    const map: Record<string, string> = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#039;",
    }
    return text.replace(/[&<>"']/g, (m) => map[m])
}
