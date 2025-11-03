/**
 * BBCode 相关常量
 */

/**
 * 允许的文本尺寸
 */
export const ALLOWED_SIZES = [50, 85, 100, 150] as const

/**
 * 尺寸标签的正则表达式
 */
export const SIZE_REGEX = new RegExp(`\\[size=(${ALLOWED_SIZES.join("|")})\\](.*?)\\[\\/size\\]`, "gis")

/**
 * 允许的颜色（用于文本颜色标签）
 */
export const ALLOWED_COLORS = [
    "red",
    "blue",
    "green",
    "yellow",
    "orange",
    "purple",
    "pink",
    "brown",
    "black",
    "white",
    "gray",
    "cyan",
    "magenta",
] as const

/**
 * API 端点
 */
export const API_ENDPOINTS = {
    CURRENT_USER: "/api/current-user",
    USER_LOOKUP: "/api/users/lookup",
} as const
