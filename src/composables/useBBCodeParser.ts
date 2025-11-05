import { computed, type Ref } from "vue"
import { trimBrTags, generateRandomId, escapeSingleQuotes } from "@/utils/stringUtils"
import { createBox, createProfileLink, createAudioBox } from "@/utils/htmlGenerators"
import { SIZE_REGEX } from "@/constants/bbcode"
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

                    // 验证URL
                    if (!isValidUrl(url)) {
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
                    if (!h.title) {
                        html += `<a class="imagemap__link"
                        href="${h.url}"
                        data-hotspot-id="${hotspotId}"
                        style="left:${h.left}%;top:${h.top}%;width:${h.width}%;height:${h.height}%;"></a>`
                    } else {
                        html += `<a class="imagemap__link"
                        href="${h.url}"
                        data-hotspot-id="${hotspotId}"
                        style="left:${h.left}%;top:${h.top}%;width:${h.width}%;height:${h.height}%;"
                        onmouseover="window.showImageMapTooltip?.(event, '${escapeSingleQuotes(h.title)}', this)"
                        onmouseleave="window.hideImageMapTooltip?.(this)"></a>`
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
        if (!url || typeof url !== "string" || !url.match(/^https?:\/\/.+/)) return false

        return true
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
     * 解析 [list]...[/list] 和 [list=TYPE]...[/list] 标签（支持嵌套）
     */
    const parseLists = (text: string): string => {
        // 先处理有序列表 [list=TYPE]
        const orderedListOpenRegex = /\[list=([^\]]+)]([\s\S]*)/i
        const orderedListCloseRegex = /([\s\S]*?)\[\/list]/i
        let match, matchNew, textNew

        while ((match = orderedListOpenRegex.exec(text))) {
            const listType = match[1]
            textNew = text.substring(0, match.index)

            matchNew = orderedListCloseRegex.exec(match[2])

            try {
                if (!matchNew) throw new Error("Ordered list not closed")

                let listContent = matchNew[1]

                // 去除内容开头和结尾的多余 <br>
                listContent = trimBrTags(listContent)

                // 处理列表项 [*]
                listContent = listContent.replace(/\[\*](.*?)(?=\[\*]|$)/gis, "<li>$1</li>")

                textNew += `<ol>${listContent}</ol>`
                textNew += text.substring(match.index + 6 + listType.length + 1 + matchNew[0].length)

                text = textNew
            } catch (error) {
                console.error("Ordered list parsing error:", error)
                return text
            }
        }

        // 再处理无序列表 [list]
        const unorderedListOpenRegex = /\[list]([\s\S]*)/i
        const unorderedListCloseRegex = /([\s\S]*?)\[\/list]/i

        while ((match = unorderedListOpenRegex.exec(text))) {
            textNew = text.substring(0, match.index)

            matchNew = unorderedListCloseRegex.exec(match[1])

            try {
                if (!matchNew) throw new Error("Unordered list not closed")

                let listContent = matchNew[1]

                // 去除内容开头和结尾的多余 <br>
                listContent = trimBrTags(listContent)

                // 处理列表项 [*]
                listContent = listContent.replace(/\[\*](.*?)(?=\[\*]|$)/gis, "<li>$1</li>")

                textNew += `<ol class="unordered">${listContent}</ol>`
                textNew += text.substring(match.index + 6 + matchNew[0].length)

                text = textNew
            } catch (error) {
                console.error("Unordered list parsing error:", error)
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

        // 7. 列表（支持嵌套）
        html = parseLists(html)

        // email
        html = html.replace(/\[email=(.*?)](.*?)\[\/email]/gis, '<a href="mailto:$1">$2</a>')

        // Images
        html = html.replace(/\[img](.*?)\[\/img]/gis, '<img src="$1" alt="Image" />')
        html = html.replace(/\[img=(.*?)](.*?)\[\/img]/gis, '<img src="$2" alt="Image" style="max-width: $1px;" />')

        // ImageMap (交互式图片地图)
        html = parseImageMap(html)

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

    return {
        parsedContent,
    }
}
