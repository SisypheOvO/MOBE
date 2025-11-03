/**
 * BBCode 相关类型定义
 */

export interface BBCodeTag {
    label: string
    icon: string
    category: "format" | "media" | "layout" | "special" | "osu"
    shortcut?: string
    tag: string
    placeholder: string
    hasClosingTag?: boolean
    documentation: string
    detail: string
    hoverInfo: string
    sortOrder?: number
}

export interface BoxState {
    [boxId: string]: "open" | "closed"
}

export interface BoxCounters {
    [boxName: string]: number
}

export interface SVGIcon {
    DOWN: string
    RIGHT: string
}
