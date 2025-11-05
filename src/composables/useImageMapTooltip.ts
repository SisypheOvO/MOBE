let tooltipCounter = 0
let scrollListeners: Map<string, () => void> = new Map()

/**
 * Tooltip 配置接口
 */
export interface TooltipConfig {
    position: "top" | "bottom" | "left" | "right"
    offsetX: number
    offsetY: number
    maxWidth: number
    minWidth: number
    fontSize: string
    padding: string
    backgroundColor: string
    textColor: string
    borderRadius: string
    zIndex: number
}

/**
 * 默认配置
 */
export const defaultTooltipConfig: TooltipConfig = {
    position: "top",
    offsetX: 0,
    offsetY: -14,
    maxWidth: 280,
    minWidth: 50,
    fontSize: "12px",
    padding: "0",
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    textColor: "#fff",
    borderRadius: "5px",
    zIndex: 15016,
}

/**
 * 显示 tooltip
 */
export const showImageMapTooltip = (event: MouseEvent, title: string, linkElement: HTMLElement, config: Partial<TooltipConfig> = {}) => {
    const mergedConfig = { ...defaultTooltipConfig, ...config }
    const hotspotId = linkElement.getAttribute("data-hotspot-id")
    if (!hotspotId) return

    // 如果已存在则不重复创建
    const existingTooltip = document.getElementById(`hotspot-${hotspotId}`)
    if (existingTooltip) {
        existingTooltip.style.display = "block"
        updateTooltipPosition(linkElement, existingTooltip as HTMLElement, mergedConfig)
        addScrollListener(hotspotId, linkElement, existingTooltip as HTMLElement, mergedConfig)
        return
    }

    // 创建 tooltip
    const tooltip = document.createElement("div")
    tooltip.id = `hotspot-${hotspotId}`
    tooltip.className = "hotspot hotspot-default hotspot tooltip-default hotspot-pos-bc"
    tooltip.setAttribute("role", "alert")
    tooltip.setAttribute("aria-live", "polite")
    tooltip.setAttribute("aria-atomic", "false")
    tooltip.setAttribute("aria-describedby", `hotspot-${hotspotId}-content`)
    tooltip.setAttribute("aria-hidden", "false")
    tooltip.setAttribute("data-hotspot-id", hotspotId)

    // 应用样式配置
    tooltip.style.cssText = `
        z-index: ${mergedConfig.zIndex};
        max-width: ${mergedConfig.maxWidth}px;
        min-width: ${mergedConfig.minWidth}px;
        font-size: ${mergedConfig.fontSize};
        background-color: ${mergedConfig.backgroundColor};
        color: ${mergedConfig.textColor};
        border-radius: ${mergedConfig.borderRadius};
        padding: ${mergedConfig.padding};
        position: absolute;
        display: block;
        line-height: 1.4;
        pointer-events: none; /* 防止 tooltip 干扰鼠标事件 */
    `

    // 创建内容区域
    const content = document.createElement("div")
    content.className = "hotspot-content"
    content.id = `hotspot-${hotspotId}-content`
    content.setAttribute("aria-atomic", "true")

    // 设置内容区域的样式
    content.style.cssText = `
        min-width: 10px;
        padding: 5px 16px;
        position: relative;
        overflow: hidden;
        text-align: center;
        word-wrap: break-word;
        overflow-wrap: break-word;
        white-space: normal;
        line-height: 1.4;
    `

    const span = document.createElement("span")
    span.style.display = "block"
    span.style.visibility = "visible"
    span.textContent = title

    content.appendChild(span)
    tooltip.appendChild(content)

    const tip = createTooltipTip(tooltip, mergedConfig)
    tooltip.appendChild(tip)

    // 添加到 body
    document.body.appendChild(tooltip)

    // 更新位置并添加滚动监听
    updateTooltipPosition(linkElement, tooltip, mergedConfig)
    addScrollListener(hotspotId, linkElement, tooltip, mergedConfig)
}

/**
 * 添加滚动监听
 */
const addScrollListener = (hotspotId: string, linkElement: HTMLElement, tooltip: HTMLElement, config: TooltipConfig) => {
    removeScrollListener(hotspotId)

    const scrollHandler = () => {
        updateTooltipPosition(linkElement, tooltip, config)
    }

    // 监听所有可能包含滚动容器的滚动事件
    const scrollContainers = findScrollContainers(linkElement)
    scrollContainers.forEach((container) => {
        container.addEventListener("scroll", scrollHandler, { passive: true })
    })

    // 也监听窗口滚动
    window.addEventListener("scroll", scrollHandler, { passive: true })

    // 存储监听器以便清理
    scrollListeners.set(hotspotId, scrollHandler)
}

/**
 * 移除滚动监听
 */
const removeScrollListener = (hotspotId: string) => {
    const handler = scrollListeners.get(hotspotId)
    if (handler) {
        const scrollContainers = document.querySelectorAll("*")
        scrollContainers.forEach((container) => {
            container.removeEventListener("scroll", handler)
        })
        window.removeEventListener("scroll", handler)
        scrollListeners.delete(hotspotId)
    }
}

/**
 * 查找所有可能包含元素的滚动容器
 */
const findScrollContainers = (element: HTMLElement): Element[] => {
    const containers: Element[] = []
    let current: HTMLElement | null = element

    while (current && current !== document.body) {
        const style = window.getComputedStyle(current)
        const overflow = style.overflow + style.overflowX + style.overflowY

        if (overflow.includes("auto") || overflow.includes("scroll")) {
            containers.push(current)
        }

        current = current.parentElement
    }

    return containers
}

/**
 * 更新 tooltip 位置
 */
const updateTooltipPosition = (linkElement: HTMLElement, tooltip: HTMLElement, config: TooltipConfig) => {
    const rect = linkElement.getBoundingClientRect()
    const tooltipRect = tooltip.getBoundingClientRect()

    // 计算相对于文档的绝对位置
    const scrollX = window.pageXOffset || document.documentElement.scrollLeft
    const scrollY = window.pageYOffset || document.documentElement.scrollTop

    let left: number, top: number

    switch (config.position) {
        case "top":
            left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2 + config.offsetX
            top = rect.top + scrollY - tooltipRect.height + config.offsetY
            break
        case "bottom":
            left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2 + config.offsetX
            top = rect.bottom + scrollY + config.offsetY
            break
        case "left":
            left = rect.left + scrollX - tooltipRect.width + config.offsetX
            top = rect.top + scrollY + rect.height / 2 - tooltipRect.height / 2 + config.offsetY
            break
        case "right":
            left = rect.right + scrollX + config.offsetX
            top = rect.top + scrollY + rect.height / 2 - tooltipRect.height / 2 + config.offsetY
            break
        default:
            left = rect.left + scrollX + rect.width / 2 - tooltipRect.width / 2
            top = rect.top + scrollY - tooltipRect.height - 8
    }

    // 边界检查，确保 tooltip 不会超出视口
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    // 水平边界检查（相对于视口）
    const viewportLeft = left - scrollX
    if (viewportLeft < 10) {
        left = scrollX + 10
    } else if (viewportLeft + tooltipRect.width > viewportWidth - 10) {
        left = scrollX + viewportWidth - tooltipRect.width - 10
    }

    // 垂直边界检查（相对于视口）
    const viewportTop = top - scrollY
    if (viewportTop < 10) {
        top = scrollY + 10
    } else if (viewportTop + tooltipRect.height > viewportHeight - 10) {
        top = scrollY + viewportHeight - tooltipRect.height - 10
    }

    tooltip.style.left = `${left}px`
    tooltip.style.top = `${top}px`
    tooltip.style.display = "block"
}

/**
 * 隐藏 tooltip
 */
export const hideImageMapTooltip = (linkElement: HTMLElement) => {
    const hotspotId = linkElement.getAttribute("data-hotspot-id")
    if (!hotspotId) return

    const tooltip = document.getElementById(`hotspot-${hotspotId}`)
    if (tooltip) {
        tooltip.style.display = "none"
        removeScrollListener(hotspotId)
    }
}

/**
 * 生成唯一的 hotspot ID
 */
export const generateTooltipId = (): number => {
    return tooltipCounter++
}

/**
 * 清理所有 tooltip
 */
export const cleanupImageMapTooltips = () => {
    const tooltips = document.querySelectorAll(".hotspot-default")
    tooltips.forEach((tooltip) => {
        const hotspotId = tooltip.getAttribute("data-hotspot-id")
        if (hotspotId) {
            removeScrollListener(hotspotId)
        }
        tooltip.remove()
    })
    tooltipCounter = 0
    scrollListeners.clear()
}

/**
 * 创建tooltip下方小三角
 */
const createTooltipTip = (tooltip: HTMLElement, config: TooltipConfig): HTMLElement => {
    const tip = document.createElement("div")
    tip.className = "hotspot-tip"

    const tipStyle: { [key: string]: string } = {
        backgroundColor: "transparent !important",
        border: "0px !important",
        position: "absolute",
        overflow: "hidden",
        pointerEvents: "none",
    }

    // 根据位置设置小三角样式
    switch (config.position) {
        case "top":
            tipStyle.left = "50%"
            tipStyle.transform = "translateX(-50%)"
            tipStyle.bottom = "-8px"
            tipStyle.width = "17.5px"
            tipStyle.height = "8px"
            break
        case "bottom":
            tipStyle.left = "50%"
            tipStyle.transform = "translateX(-50%)"
            tipStyle.top = "-8px"
            tipStyle.width = "17.5px"
            tipStyle.height = "8px"
            break
        case "left":
            tipStyle.top = "50%"
            tipStyle.transform = "translateY(-50%)"
            tipStyle.right = "-8px"
            tipStyle.width = "8px"
            tipStyle.height = "17.5px"
            break
        case "right":
            tipStyle.top = "50%"
            tipStyle.transform = "translateY(-50%)"
            tipStyle.left = "-8px"
            tipStyle.width = "8px"
            tipStyle.height = "17.5px"
            break
    }

    // 应用样式
    Object.assign(tip.style, tipStyle)

    const canvas = document.createElement("canvas")

    // 根据方向设置 canvas 尺寸
    if (config.position === "top" || config.position === "bottom") {
        canvas.width = 17.5
        canvas.height = 8
        canvas.style.cssText = "background-color: transparent !important; border: 0px !important; width: 17.5px; height: 8px; display: block;"
    } else {
        canvas.width = 8
        canvas.height = 17.5
        canvas.style.cssText = "background-color: transparent !important; border: 0px !important; width: 8px; height: 17.5px; display: block;"
    }

    // 绘制小三角
    const ctx = canvas.getContext("2d")
    if (ctx) {
        ctx.fillStyle = config.backgroundColor
        ctx.beginPath()

        // 根据位置调整小三角方向
        switch (config.position) {
            case "top":
                // 向下的三角形
                ctx.moveTo(8.75, 8)
                ctx.lineTo(4, 0)
                ctx.lineTo(13.5, 0)
                break
            case "bottom":
                ctx.moveTo(8.75, 0)
                ctx.lineTo(0, 8)
                ctx.lineTo(17.5, 8)
                break
            case "left":
                // 向右的三角形
                ctx.moveTo(8, 8.75)
                ctx.lineTo(0, 0)
                ctx.lineTo(0, 17.5)
                break
            case "right":
                ctx.moveTo(0, 8.75)
                ctx.lineTo(8, 0)
                ctx.lineTo(8, 17.5)
                break
        }

        ctx.closePath()
        ctx.fill()
    }

    tip.appendChild(canvas)
    return tip
}
