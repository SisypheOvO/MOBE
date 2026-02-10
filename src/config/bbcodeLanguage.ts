import type * as monaco from "monaco-editor"
import { type BBCodeTag, getTagName } from "./bbcodeTags"
import { availableThemes, createMonacoTheme } from "./monacoThemes"

// Store translated tags for use in completion and hover providers
let translatedTags: BBCodeTag[] = []
let isLanguageRegistered = false

/**
 * 更新翻译后的标签（用于语言切换）
 */
export const updateBBCodeTranslations = (bbcodeTags: BBCodeTag[]) => {
    translatedTags = bbcodeTags
}

export const registerBBCodeLanguage = (monaco: typeof import("monaco-editor"), bbcodeTags: BBCodeTag[]) => {
    // Store the translated tags for use in providers
    translatedTags = bbcodeTags

    // 如果已经注册过，只更新翻译即可
    if (isLanguageRegistered) {
        return
    }

    isLanguageRegistered = true

    // 注册语言
    monaco.languages.register({ id: "bbcode" })

    // Register all themes
    availableThemes.forEach((theme) => {
        monaco.editor.defineTheme(theme.id, createMonacoTheme(theme))
    })

    // 语法高亮规则
    monaco.languages.setMonarchTokensProvider("bbcode", {
        tokenizer: {
            root: [
                // === 容器标签（box/list/spoilerbox）需要特殊处理，因为参数中可能包含嵌套的BBCode ===
                [/\[(box|list|spoilerbox)=/i, { token: "tag.open.container", next: "@containerParam" }],
                [/\[(box|list|spoilerbox)\]/i, "tag.open.container"],

                // === 其他开标签 ===
                [/\[(centre)(?:=[^\]]+)?\]/i, "tag.open.layout"],
                [/\[(url|img|profile|email|youtube|audio|imagemap)(?:=[^\]]+)?\]/i, "tag.open.media"],
                [/\[(b|i|u|s|strike)(?:=[^\]]+)?\]/i, "tag.open.format"],
                [/\[(color|size)(?:=[^\]]+)?\]/i, "tag.open.style"],
                [/\[(quote|c|code|notice|heading)(?:=[^\]]+)?\]/i, "tag.open.block"],

                // 默认标签（未知标签）
                [/\[([a-z]+)(?:=[^\]]+)?\]/i, "tag.open.default"],

                // === 闭标签 ===
                [/\[\/(centre)\]/i, "tag.close.layout"],
                [/\[\/(url|img|profile|email|youtube|audio|imagemap)\]/i, "tag.close.media"],
                [/\[\/(b|i|u|s|strike)\]/i, "tag.close.format"],
                [/\[\/(color|size)\]/i, "tag.close.style"],
                [/\[\/(quote|c|code|notice|heading)\]/i, "tag.close.block"],
                [/\[\/(list|box|spoilerbox)\]/i, "tag.close.container"],
                [/\[\/([a-z]+)\]/i, "tag.close.default"],

                // 其他规则
                [/https?:\/\/[^\s\[\]]+/, "string.url"],
                [/#[0-9a-fA-F]{3,6}/, "constant.numeric.hex"],
                [/\[\*\]/, "keyword.list"],
                [/[^\[]+/, "text"],
            ],

            // 容器参数状态 - 允许参数中包含嵌套的BBCode标签
            containerParam: [
                // 在参数中匹配嵌套的BBCode标签（开标签）
                [/\[(colour|center|centre)(?:=[^\]]+)?\]/i, "tag.open.layout"],
                [/\[(url|img|profile|email|youtube|audio|imagemap)(?:=[^\]]+)?\]/i, "tag.open.media"],
                [/\[(b|i|u|s|strike)(?:=[^\]]+)?\]/i, "tag.open.format"],
                [/\[(color|size)(?:=[^\]]+)?\]/i, "tag.open.style"],
                [/\[(quote|c|code|notice|heading)(?:=[^\]]+)?\]/i, "tag.open.block"],

                // 闭标签（与root状态保持一致）
                [/\[\/(centre)\]/i, "tag.close.layout"],
                [/\[\/(url|img|profile|email|youtube|audio|imagemap)\]/i, "tag.close.media"],
                [/\[\/(b|i|u|s|strike)\]/i, "tag.close.format"],
                [/\[\/(color|size)\]/i, "tag.close.style"],
                [/\[\/(quote|c|code|notice|heading)\]/i, "tag.close.block"],
                [/\[\/([a-z]+)\]/i, "tag.close.default"],

                // 其他内容
                [/#[0-9a-fA-F]{3,6}/, "constant.numeric.hex"],
                [/https?:\/\/[^\s\[\]]+/, "string.url"],

                // 参数结束的 ]
                [/\]/, { token: "tag.open.container", next: "@pop" }],

                // 普通文本（参数内容）- 不匹配以 [ 开头的内容，避免干扰BBCode标签
                [/[^\[\]]+/, ""],
            ],
        },
    })

    // 自动补全
    monaco.languages.registerCompletionItemProvider("bbcode", {
        triggerCharacters: ["["],
        provideCompletionItems: (model, position) => {
            const lineContent = model.getLineContent(position.lineNumber)
            const textBeforeCursor = lineContent.substring(0, position.column - 1)

            // 匹配 [ 后面的内容
            const match = textBeforeCursor.match(/\[([a-z]*)$/i)
            if (!match) {
                return { suggestions: [] }
            }

            const typedText = match[1]
            const startColumn = position.column - match[0].length

            const range: monaco.IRange = {
                startLineNumber: position.lineNumber,
                endLineNumber: position.lineNumber,
                startColumn: startColumn,
                endColumn: position.column,
            }

            const suggestions = createCompletionSuggestions(monaco, range, typedText)

            return { suggestions }
        },
    })

    // 悬停提示
    monaco.languages.registerHoverProvider("bbcode", {
        provideHover: (model, position) => {
            const word = model.getWordAtPosition(position)
            if (!word) return null

            const hoverInfo = getHoverInfo(word.word.toLowerCase())
            if (!hoverInfo) return null

            return {
                contents: [{ value: hoverInfo }],
            }
        },
    })

    // 括号匹配
    monaco.languages.setLanguageConfiguration("bbcode", {
        brackets: [["[", "]"]],
        autoClosingPairs: [{ open: "[", close: "]" }],
    })

    // 颜色选择器
    monaco.languages.registerColorProvider("bbcode", {
        provideColorPresentations: (model, colorInfo, token) => {
            const color = colorInfo.color
            const hex = rgbToHex(color)

            return [
                {
                    label: hex,
                    textEdit: {
                        range: colorInfo.range,
                        text: hex,
                    },
                },
            ]
        },

        provideDocumentColors: (model, token) => {
            const colors: monaco.languages.IColorInformation[] = []
            const lines = model.getLineCount()

            // 正则匹配颜色值
            const colorRegex = /\[color=((?:#?[0-9a-fA-F]{3,8})|(?:rgb\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*\))|(?:rgba\(\s*\d+\s*,\s*\d+\s*,\s*\d+\s*,\s*[\d.]+\s*\))|(?:hsl\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*\))|(?:hsla\(\s*\d+\s*,\s*\d+%\s*,\s*\d+%\s*,\s*[\d.]+\s*\)))\](.*?)\[\/color\]/gi

            for (let line = 1; line <= lines; line++) {
                const text = model.getLineContent(line)
                let match

                while ((match = colorRegex.exec(text)) !== null) {
                    const colorValue = match[1]
                    const startColumn = match.index + 8 // [color= 的长度
                    const endColumn = startColumn + colorValue.length

                    const color = parseColor(colorValue)
                    if (color) {
                        colors.push({
                            color: color,
                            range: {
                                startLineNumber: line,
                                endLineNumber: line,
                                startColumn: startColumn,
                                endColumn: endColumn,
                            },
                        })
                    }
                }
            }

            return colors
        },
    })

    // 链接编辑 - 修改开标签自动更新闭标签
    monaco.languages.registerLinkedEditingRangeProvider("bbcode", {
        provideLinkedEditingRanges: (model, position) => {
            const line = model.getLineContent(position.lineNumber)
            const offset = position.column - 1

            // 检查光标是否在标签名称上
            // 1. 检查开标签 [tagname] 或 [tagname=value]
            // 支持任意字符的标签名（除了 ] 和 =），包括空标签名
            const openTagRegex = /\[([^\]=]*)(?:=[^\]]+)?\]/gi
            let match: RegExpExecArray | null

            while ((match = openTagRegex.exec(line)) !== null) {
                const tagName = match[1]
                const tagStart = match.index + 1 // [ 后面的位置
                const tagEnd = tagStart + tagName.length

                // 如果光标在开标签的标签名上（包括空标签名的情况）
                if (offset >= tagStart && offset <= tagEnd) {
                    // 查找匹配的闭标签
                    const closeTag = `[/${tagName}]`
                    const content = model.getValue()
                    const openTagPos = model.getOffsetAt({
                        lineNumber: position.lineNumber,
                        column: tagStart + 1,
                    })

                    // 在开标签之后查找闭标签
                    const afterOpenTag = content.substring(openTagPos)
                    const closeTagIndex = afterOpenTag.indexOf(closeTag)

                    if (closeTagIndex !== -1) {
                        const closeTagAbsolutePos = openTagPos + closeTagIndex
                        const closeTagPosition = model.getPositionAt(closeTagAbsolutePos + 2) // +2 跳过 [/

                        return {
                            ranges: [
                                {
                                    startLineNumber: position.lineNumber,
                                    startColumn: tagStart + 1,
                                    endLineNumber: position.lineNumber,
                                    endColumn: tagEnd + 1,
                                },
                                {
                                    startLineNumber: closeTagPosition.lineNumber,
                                    startColumn: closeTagPosition.column,
                                    endLineNumber: closeTagPosition.lineNumber,
                                    endColumn: closeTagPosition.column + tagName.length,
                                },
                            ],
                        }
                    }
                }
            }

            // 2. 检查闭标签 [/tagname]
            // 支持任意字符的标签名（除了 ]），包括空标签名
            const closeTagRegex = /\[\/([^\]]*)\]/gi

            while ((match = closeTagRegex.exec(line)) !== null) {
                const tagName = match[1]
                const tagStart = match.index + 2 // [/ 后面的位置
                const tagEnd = tagStart + tagName.length

                // 如果光标在闭标签的标签名上（包括空标签名的情况）
                if (offset >= tagStart && offset <= tagEnd) {
                    // 向前查找匹配的开标签（转义特殊字符）
                    const escapedTagName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
                    const openTagPattern = new RegExp(`\\[${escapedTagName}(?:=[^\\]]+)?\\]`, "gi")
                    const content = model.getValue()
                    const closeTagPos = model.getOffsetAt({
                        lineNumber: position.lineNumber,
                        column: tagStart + 1,
                    })
                    const beforeCloseTag = content.substring(0, closeTagPos - 2) // -2 to exclude [/

                    // 从后往前找最近的开标签
                    let lastMatch: RegExpExecArray | null = null
                    let tempMatch: RegExpExecArray | null

                    while ((tempMatch = openTagPattern.exec(beforeCloseTag)) !== null) {
                        lastMatch = tempMatch
                    }

                    if (lastMatch) {
                        const openTagAbsolutePos = lastMatch.index + 1 // +1 跳过 [
                        const openTagPosition = model.getPositionAt(openTagAbsolutePos)

                        return {
                            ranges: [
                                {
                                    startLineNumber: openTagPosition.lineNumber,
                                    startColumn: openTagPosition.column,
                                    endLineNumber: openTagPosition.lineNumber,
                                    endColumn: openTagPosition.column + tagName.length,
                                },
                                {
                                    startLineNumber: position.lineNumber,
                                    startColumn: tagStart + 1,
                                    endLineNumber: position.lineNumber,
                                    endColumn: tagEnd + 1,
                                },
                            ],
                        }
                    }
                }
            }

            return { ranges: [] }
        },
    })

    // 区域折叠支持
    monaco.languages.registerFoldingRangeProvider("bbcode", {
        provideFoldingRanges: (model, _, __) => {
            const foldingRanges: monaco.languages.FoldingRange[] = []
            const lines = model.getLineCount()

            const foldableTags = ["box", "color", "center", "centre", "spoilerbox", "list", "quote", "notice",
                "code", "heading", "imagemap", "size"];

            // 使用栈来跟踪嵌套层级
            const stack: Array<{ tag: string; startLine: number; startPos: number }> = []

            const foldableTagsPattern = foldableTags.join("|")
            const openTagRegex = new RegExp(`\\[(${foldableTagsPattern})(?:=[^\\]]+)?\\]`, "gi")
            const closeTagRegex = new RegExp(`\\[\\/(${foldableTagsPattern})\\]`, "gi")

            for (let line = 1; line <= lines; line++) {
                const lineContent = model.getLineContent(line)
                const lineOffset = model.getOffsetAt({ lineNumber: line, column: 1 })

                // 匹配开标签
                let match: RegExpExecArray | null
                while ((match = openTagRegex.exec(lineContent)) !== null) {
                    const tagName = match[1].toLowerCase()
                    if (foldableTags.includes(tagName)) {
                        stack.push({
                            tag: tagName,
                            startLine: line,
                            startPos: lineOffset + match.index,
                        })
                    }
                }

                // 匹配闭标签
                while ((match = closeTagRegex.exec(lineContent)) !== null) {
                    const tagName = match[1].toLowerCase()

                    for (let i = stack.length - 1; i >= 0; i--) {
                        if (stack[i].tag === tagName) {
                            const start = stack[i]
                            foldingRanges.push({
                                start: start.startLine,
                                end: line,
                                kind: monaco.languages.FoldingRangeKind.Region,
                            })
                            stack.splice(i, 1)
                            break
                        }
                    }
                }
            }

            return foldingRanges
        },
    })
}

// 创建补全建议 - 从 bbcodeTags 自动生成
const createCompletionSuggestions = (monaco: typeof import("monaco-editor"), range: monaco.IRange, filter: string): monaco.languages.CompletionItem[] => {
    // 从统一的数据源生成补全建议
    const allSuggestions: monaco.languages.CompletionItem[] = translatedTags.map((tag) => {
        const tagName = getTagName(tag.tag)
        const hasClosingTag = tag.hasClosingTag !== false // 默认为 true

        // 构建插入文本
        let insertText: string
        if (tag.tag.includes("=")) {
            // 带参数的标签，如 url=xxx, color=#xxx
            const paramPart = tag.tag.split("=")[1]
            insertText = hasClosingTag ? `${tagName}=\${1:${paramPart}}]\${2:${tag.placeholder}}[/${tagName}]` : `${tagName}=\${1:${paramPart}}]\${2:${tag.placeholder}}`
        } else {
            // 简单标签
            // 如果 placeholder 包含换行，则在前后添加换行
            if (tag.placeholder.includes("\n")) {
                insertText = hasClosingTag ? `${tagName}]\n\${1:${tag.placeholder}}\n[/${tagName}]` : `${tagName}]\n\${1:${tag.placeholder}}`
            } else {
                insertText = hasClosingTag ? `${tagName}]\${1:${tag.placeholder}}[/${tagName}]` : `${tagName}]\${1:${tag.placeholder}}`
            }
        }

        return {
            label: tagName,
            kind: monaco.languages.CompletionItemKind.Snippet,
            insertText: insertText,
            insertTextRules: monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: tag.documentation,
            detail: tag.detail,
            range: range,
            sortText: `${tag.sortOrder ?? 9}-${tagName}`,
        }
    })

    // 根据已输入内容过滤
    if (filter) {
        return allSuggestions.filter((s) => s.label.toString().toLowerCase().startsWith(filter.toLowerCase()))
    }

    return allSuggestions
}

// 获取悬停信息 - 从 bbcodeTags 自动生成
const getHoverInfo = (word: string): string | null => {
    // 从统一的数据源查找悬停信息
    const tag = translatedTags.find((t) => getTagName(t.tag).toLowerCase() === word.toLowerCase())
    return tag ? tag.hoverInfo : null
}

// 颜色解析工具函数
const parseColor = (colorStr: string): monaco.languages.IColor | null => {
    // 处理 #RRGGBB 或 #RGB 格式
    if (colorStr.startsWith("#")) {
        let hex = colorStr.substring(1)

        // 扩展缩写格式 #RGB -> #RRGGBB
        if (hex.length === 3) {
            hex = hex
                .split("")
                .map((c) => c + c)
                .join("")
        }

        if (hex.length === 6) {
            const r = parseInt(hex.substring(0, 2), 16) / 255
            const g = parseInt(hex.substring(2, 4), 16) / 255
            const b = parseInt(hex.substring(4, 6), 16) / 255

            return { red: r, green: g, blue: b, alpha: 1 }
        }
    }

    // 处理 rgb(r, g, b) 格式
    const rgbMatch = colorStr.match(/rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)/i)
    if (rgbMatch) {
        return {
            red: parseInt(rgbMatch[1]) / 255,
            green: parseInt(rgbMatch[2]) / 255,
            blue: parseInt(rgbMatch[3]) / 255,
            alpha: 1,
        }
    }

    // 处理 rgba(r, g, b, a) 格式
    const rgbaMatch = colorStr.match(/rgba\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*,\s*([\d.]+)\s*\)/i)
    if (rgbaMatch) {
        return {
            red: parseInt(rgbaMatch[1]) / 255,
            green: parseInt(rgbaMatch[2]) / 255,
            blue: parseInt(rgbaMatch[3]) / 255,
            alpha: parseFloat(rgbaMatch[4]),
        }
    }

    return null
}

const rgbToHex = (color: monaco.languages.IColor): string => {
    const toHex = (value: number) => {
        const hex = Math.round(value * 255).toString(16)
        return hex.length === 1 ? "0" + hex : hex
    }

    return `#${toHex(color.red)}${toHex(color.green)}${toHex(color.blue)}`
}
