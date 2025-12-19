import { computed, type Ref } from "vue"
import { trimBrTags, generateRandomId, escapeSingleQuotes } from "@/utils/stringUtils"
import { createBox, createProfileLink, createAudioBox } from "@/utils/htmlGenerators"
import { MIN_SIZE, MAX_SIZE, ALLOWED_URL_PROTOCOLS } from "@/constants/bbcode"
import type { BoxState } from "@/types/bbcode"
import { generateTooltipId } from "./useImageMapTooltip"

interface UseBBCodeParserOptions {
    content: Ref<string>
    boxStates: Ref<BoxState>
    boxCounters: Ref<Record<string, number>>
    resetBoxes: () => void
    refreshKey: Ref<number>
}

export const useBBCodeParser = ({ content, boxStates, boxCounters, resetBoxes, refreshKey }: UseBBCodeParserOptions) => {
    let profileCardCounter = 0

    const parseAudio = (text: string): string => {
        return text.replace(/\[audio\]([^[]+?)\[\/audio\]/gi, (match, url) => {
            if (!isValidUrl(url)) {
                console.warn("Invalid audio URL:", url)
                return match
            }

            return createAudioBox(url)
        })
    }

    const parseBold = (text: string): string => {
        text = text.replace(/\[b]/gi, "<strong>")
        text = text.replace(/\[\/b]/gi, "</strong>")
        return text
    }

    const parseCentre = (text: string): string => {
        text = text.replace(/\[centre]/gi, "<center>")
        text = text.replace(/\[\/centre]/gi, "</center>")
        return text
    }

    const extractCodeBlocks = (text: string, codeBlocks: string[]): string => {
        return text.replace(/\[code]([\s\S]*?)\[\/code]/gi, (_match, content) => {
            const index = codeBlocks.length
            codeBlocks.push(content)
            return `__CODE_BLOCK_${index}__`
        })
    }

    const parseCode = (text: string, codeBlocks: string[]): string => {
        codeBlocks.forEach((content, index) => {
            const escapedContent = content.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
            const cleanedContent = trimBrTags(escapedContent)

            text = text.replace(`__CODE_BLOCK_${index}__`, `<pre>${cleanedContent}</pre>`)
        })

        return text
    }

    const parseColour = (text: string): string => {
        text = text.replace(/\[color=([^\]]+)]/gi, '<span style="color:$1">')
        text = text.replace(/\[\/color]/gi, "</span>")
        return text
    }

    const parseEmail = (text: string): string => {
        // 第一种格式：[email]address@example.com[/email] (显示邮箱地址本身)
        text = text.replace(/\[email](.+?)\[\/email]/gi, '<a rel="nofollow" href="mailto:$1">$1</a>')
        // 第二种格式：[email=address@example.com]显示文本[/email] (分两步处理)
        text = text.replace(/\[email=([^\]]+)]/gi, '<a rel="nofollow" href="mailto:$1">')
        text = text.replace(/\[\/email]/gi, "</a>")
        return text
    }

    const parseHeading = (text: string): string => {
        text = text.replace(/\[heading]/gi, "<h2>")
        text = text.replace(/\[\/heading]\n?/gi, "</h2>")
        return text
    }

    const parseItalic = (text: string): string => {
        text = text.replace(/\[i]/gi, "<em>")
        text = text.replace(/\[\/i]/gi, "</em>")
        return text
    }

    const parseInlineCode = (text: string): string => {
        text = text.replace(/\[c]/gi, "<code>")
        text = text.replace(/\[\/c]/gi, "</code>")
        return text
    }

    const parseList = (text: string): string => {
        // 步骤1：处理列表开头 + 第一个项目
        // [list=1]\n[*] → <ol><li>
        text = text.replace(/\[list=[^\]]+\]\s*(?:<br\s*\/?>)?\s*\[\*\]/gi, "<ol><li>")
        // [list]\n[*] → <ol class="unordered"><li>
        text = text.replace(/\[list\]\s*(?:<br\s*\/?>)?\s*\[\*\]/gi, '<ol class="unordered"><li>')

        // 步骤2：转换列表项
        // [/*] → </li> (支持可选的 :m 标记)
        text = text.replace(/\[\/\*(:m)?\]\n?\n?/gi, "</li>")
        // [*] → <li>
        text = text.replace(/\s*\[\*\]/gi, "<li>")

        // 步骤3：关闭列表标签
        // [/list:o] 或 [/list:u] → </ol>
        text = text.replace(/\s*\[\/list:[ou]\]\n?\n?/gi, "</ol>")
        // [/list] → </ol> (兜底处理)
        text = text.replace(/\s*\[\/list\]\n?\n?/gi, "</ol>")

        // 步骤4：处理带"标题"的列表
        // [list=1]标题文本<li> → <ul class="bbcode__list-title"><li>标题文本</li></ul><ol><li>
        text = text.replace(/\[list=[^\]]+\](.+?)(<li>|<\/ol>)/gis, '<ul class="bbcode__list-title"><li>$1</li></ul><ol>$2')
        // [list]标题文本<li> → <ul class="bbcode__list-title"><li>标题文本</li></ul><ol class="unordered"><li>
        text = text.replace(/\[list\](.+?)(<li>|<\/ol>)/gis, '<ul class="bbcode__list-title"><li>$1</li></ul><ol class="unordered">$2')

        return text
    }

    const parseNotice = (text: string): string => {
        return text.replace(/\[notice]\n*(.*?)\n*\[\/notice]\n?/gis, (_match, content) => {
            return `<div class="well">${trimBrTags(content)}</div>`
        })
    }

    const parseQuote = (text: string): string => {
        // 第一种格式：[quote="author"]...[/quote] - 带作者名
        text = text.replace(/\[quote="([^"]+)"\]\s*(.*?)\s*\[\/quote\]/gis, (_match, author, content) => {
            return `<blockquote><h4>${author} wrote:</h4>${trimBrTags(content)}</blockquote>`
        })
        // 第二种格式：[quote]...[/quote] - 不带作者名
        text = text.replace(/\[quote\]\s*(.*?)\s*\[\/quote\]/gis, (_match, content) => {
            return `<blockquote>${trimBrTags(content)}</blockquote>`
        })

        return text
    }

    const parseStrike = (text: string): string => {
        text = text.replace(/\[s]/gi, "<del>")
        text = text.replace(/\[\/s]/gi, "</del>")
        text = text.replace(/\[strike]/gi, "<del>")
        text = text.replace(/\[\/strike]/gi, "</del>")
        return text
    }

    const parseUnderline = (text: string): string => {
        // 对应 BBCodeFromDB::parseUnderline
        // 两步处理，支持嵌套
        text = text.replace(/\[u]/gi, "<u>")
        text = text.replace(/\[\/u]/gi, "</u>")
        return text
    }

    const parseSpoiler = (text: string): string => {
        // 对应 BBCodeFromDB::parseSpoiler
        // 两步处理，支持嵌套
        text = text.replace(/\[spoiler]/gi, "<span class='spoiler'>")
        text = text.replace(/\[\/spoiler]/gi, "</span>")
        return text
    }

    const parseSize = (text: string): string => {
        text = text.replace(/\[size=(\d+)\]/gi, (_match, size) => {
            const sizeNum = Math.max(MIN_SIZE, Math.min(MAX_SIZE, parseInt(size, 10)))
            return `<span style="font-size:${sizeNum}%;">`
        })
        text = text.replace(/\[\/size\]/gi, "</span>")
        return text
    }

    const parseUrl = (text: string): string => {
        // 第一种格式：[url]URL[/url] (显示URL本身)
        text = text.replace(/\[url](.+?)\[\/url]/gi, "<a rel='nofollow' href='$1' target='_blank'>$1</a>")

        // 第二种格式：[url=URL]显示文本[/url] (分两步处理，支持嵌套)
        text = text.replace(/\[url=([^\]]+)]/gi, "<a rel='nofollow' href='$1' target='_blank'>")
        text = text.replace(/\[\/url]/gi, "</a>")

        return text
    }

    const parseYoutube = (text: string): string => {
        text = text.replace(/\[youtube]/gi, "<iframe class='u-embed-wide u-embed-wide--bbcode' src='https://www.youtube.com/embed/")
        text = text.replace(/\[\/youtube]/gi, "?rel=0' allowfullscreen></iframe>")
        return text
    }

    /**
     * 解析 [imagemap]...[/imagemap] 标签
     * 格式：
     * [imagemap]
     * 图片URL
     * left top width height 链接URL 标题
     * ...
     * [/imagemap]
     */
    const parseImageMap = (text: string): string => {
        const imageMapRegex = /\[imagemap\]([\s\S]*?)\[\/imagemap\]/gi

        return text.replace(imageMapRegex, (match, content) => {
            try {
                const lines = content
                    .trim()
                    .split("<br>")
                    .filter((line: string) => line.trim())

                if (lines.length === 0) return match

                const imageUrl = lines[0].trim()

                // 验证图片URL
                if (!isValidUrl(imageUrl)) {
                    console.warn("Invalid image URL in imagemap:", imageUrl)
                    return match
                }

                // 解析热区（hotspots）
                const hotspots = []
                for (let i = 1; i < lines.length; i++) {
                    const line = lines[i].trim()
                    const parts = line.split(/\s+/)

                    // 验证每行的部分数量
                    if (parts.length < 5) {
                        console.warn("Too few parts in imagemap line:", line)
                        return match
                    }

                    const left = parseFloat(parts[0])
                    const top = parseFloat(parts[1])
                    const width = parseFloat(parts[2])
                    const height = parseFloat(parts[3])
                    const url = parts[4]
                    const title = parts.slice(5).join(" ")

                    // 验证坐标和尺寸
                    if (!isValidPercentage(left) || !isValidPercentage(top) || !isValidPercentage(width) || !isValidPercentage(height)) {
                        console.warn("Invalid coordinates in imagemap line:", line)
                        return match
                    }

                    // 验证URL（支持 # 作为非链接热区）
                    if (url !== "#" && !isValidUrl(url)) {
                        console.warn("Invalid URL in imagemap line:", url)
                        return match
                    }

                    // 验证热区边界
                    if (!isValidHotspotBoundaries(left, top, width, height)) {
                        console.warn("Hotspot boundaries exceed limits:", line)
                        return match
                    }

                    hotspots.push({ left, top, width, height, url, title })
                }

                // 生成HTML
                let html = `<div class="imagemap">`
                html += `<img class="imagemap__image" loading="lazy" src="${imageUrl}" alt="${imageUrl}">`

                hotspots.forEach((h) => {
                    const hotspotId = generateTooltipId()
                    const isNonClickable = h.url === "#"
                    const tag = isNonClickable ? "span" : "a"
                    const hrefAttr = isNonClickable ? "" : `href="${h.url}"`
                    const styleAttr = `style="left:${h.left}%;top:${h.top}%;width:${h.width}%;height:${h.height}%;"`

                    if (!h.title) {
                        html += `<${tag} class="imagemap__link" ${hrefAttr} data-hotspot-id="${hotspotId}" ${styleAttr}></${tag}>`
                    } else {
                        html += `<${tag} class="imagemap__link" ${hrefAttr} data-hotspot-id="${hotspotId}" ${styleAttr} onmouseover="window.showImageMapTooltip?.(event, '${escapeSingleQuotes(h.title)}', this)" onmouseleave="window.hideImageMapTooltip?.(this)"></${tag}>`
                    }
                })

                html += `</div>`
                return html
            } catch (error) {
                console.warn("Error parsing imagemap, returning original:", error)
                return match
            }
        })
    }

    /**
     * 验证URL格式
     */
    const isValidUrl = (url: string): boolean => {
        if (!url || typeof url !== "string") return false

        try {
            // 检查是否以安全协议开头
            const hasValidProtocol = ALLOWED_URL_PROTOCOLS.some((protocol) => url.toLowerCase().startsWith(protocol))
            if (!hasValidProtocol) return false

            // 额外检查：阻止 javascript: 等危险协议
            if (url.toLowerCase().includes("javascript:") || url.toLowerCase().includes("data:")) {
                console.warn("Blocked potentially dangerous URL:", url)
                return false
            }

            return true
        } catch {
            return false
        }
    }

    /**
     * 验证百分比值
     */
    const isValidPercentage = (value: number): boolean => {
        return !isNaN(value) && value >= 0 && value <= 100
    }

    /**
     * 验证热区边界
     */
    const isValidHotspotBoundaries = (left: number, top: number, width: number, height: number): boolean => {
        // 检查热区是否超出图像边界
        if (left + width > 100) return false
        if (top + height > 100) return false

        // 检查热区尺寸是否合理
        if (width <= 0 || height <= 0) return false
        if (width > 100 || height > 100) return false

        return true
    }

    /**
     * 解析 [box=name]...[/box] 标签
     */
    const parseBoxes = (text: string): string => {
        // 使用栈来跟踪嵌套层级
        const parseWithStack = (input: string): string => {
            let result = ""
            let i = 0

            while (i < input.length) {
                // 查找 [box= 开始标签
                if (input.substring(i, i + 5).toLowerCase() === "[box=") {
                    // 解析 box 名称（支持嵌套标签）
                    let nameStart = i + 5
                    let nameEnd = nameStart
                    let bracketDepth = 0

                    // 找到名称的结束位置
                    while (nameEnd < input.length) {
                        const char = input[nameEnd]
                        if (char === "[") {
                            bracketDepth++
                        } else if (char === "]") {
                            if (bracketDepth === 0) {
                                break
                            }
                            bracketDepth--
                        }
                        nameEnd++
                    }

                    if (nameEnd >= input.length) {
                        // 没有找到结束的 ]
                        result += input.substring(i)
                        break
                    }

                    const boxName = input.substring(nameStart, nameEnd)
                    const contentStart = nameEnd + 1

                    // 找到匹配的 [/box]
                    const contentEnd = findMatchingBoxEnd(input, i)
                    if (contentEnd === -1) {
                        // box 没有正确关闭
                        result += input.substring(i)
                        break
                    }

                    // 递归解析盒子内容
                    const boxContent = input.substring(contentStart, contentEnd)
                    const parsedContent = parseWithStack(boxContent)

                    boxCounters.value[boxName] = (boxCounters.value[boxName] || 0) + 1
                    const cleanedContent = trimBrTags(parsedContent)
                    const boxId = generateRandomId("box")
                    result += createBox(boxName, cleanedContent, boxId, boxStates.value)

                    i = contentEnd + 6 // 跳过 [/box]
                } else {
                    // 不是 box 开始，直接添加字符
                    result += input[i]
                    i++
                }
            }

            return result
        }

        return parseWithStack(text)
    }

    const findMatchingBoxEnd = (text: string, start: number): number => {
        let i = start + 5 // 跳过 [box=

        // 先跳过 box 名称
        let bracketDepth = 0
        while (i < text.length) {
            if (text[i] === "[") bracketDepth++
            else if (text[i] === "]") {
                if (bracketDepth === 0) break
                bracketDepth--
            }
            i++
        }
        i++ // 跳过 ]

        // 查找匹配的 [/box]，递归跳过嵌套的 box
        let depth = 1
        while (i < text.length && depth > 0) {
            if (text.substring(i, i + 5).toLowerCase() === "[box=") {
                // 找到嵌套的 box，递归跳过它
                const nestedEnd = findMatchingBoxEnd(text, i)
                if (nestedEnd === -1) return -1
                i = nestedEnd + 6 // 跳过嵌套 box 的 [/box]
            } else if (text.substring(i, i + 6).toLowerCase() === "[/box]") {
                depth--
                if (depth === 0) return i
                i += 6
            } else {
                i++
            }
        }

        return -1
    }

    /**
     * 解析 [spoilerbox]...[/spoilerbox] 标签
     */
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

    /**
     * 解析 BBCode 为 HTML
     */
    const parsedContent = computed(() => {
        // 强制更新
        refreshKey.value

        let html = content.value

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
        html = extractCodeBlocks(html, codeBlocks)

        // 1. 换行处理（最先处理）
        html = html.replace(/\n/g, "<br>")
        html = html.replace(/\[\/heading]<br>/g, "[/heading]")

        /// block
        html = parseImageMap(html)
        html = parseBoxes(html)
        html = parseSpoilerBoxes(html)
        html = parseList(html)
        html = parseNotice(html)
        html = parseQuote(html)
        html = parseHeading(html)

        /// inline
        html = parseAudio(html)
        html = parseBold(html)
        html = parseCentre(html)
        html = parseInlineCode(html)
        html = parseColour(html)
        html = parseEmail(html)
        // Images
        html = html.replace(/\[img](.*?)\[\/img]/gis, '<img src="$1" alt="Image" />')
        html = html.replace(/\[img=(.*?)](.*?)\[\/img]/gis, '<img src="$2" alt="Image" style="max-width: $1px;" />')
        html = parseItalic(html)
        html = parseSize(html)
        // smilies - 略过，暂时不处理
        html = parseSpoiler(html)
        html = parseStrike(html)
        html = parseUnderline(html)
        html = parseUrl(html)
        html = parseYoutube(html)
        // Profile
        html = html.replace(/\[profile=(.*?)](.*?)\[\/profile]/gis, (match, userId, username) => {
            const qtipId = profileCardCounter++
            return createProfileLink(userId, username, qtipId)
        })

        // 清理多余的 <br> 标签
        html = html.replace(/(<\/div>\s*)<br>/g, "</div>")
        html = html.replace(/(<\/blockquote>\s*)<br>/g, "</blockquote>")

        // 将裸露的URL转换为链接
        html = html.replace(/(?<!["'=])https?:\/\/[^\s<>"']+/gi, (url) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
        })

        html = parseCode(html, codeBlocks)

        html = html.replace(/(<\/pre>\s*)<br>/g, "</pre>")

        return html
    })

    return {
        parsedContent,
    }
}
