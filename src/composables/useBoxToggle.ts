/**
 * 盒子折叠/展开功能
 */

import { ref, shallowRef, type Ref, type ShallowRef } from "vue"
import { CHEVRON_ICONS } from "@/constants/icons"
import type { BoxState, BoxCounters } from "@/types/bbcode"

export const useBoxToggle = () => {
    const boxStates: ShallowRef<BoxState> = shallowRef({})
    const boxCounters: Ref<BoxCounters> = ref({})

    /**
     * 切换盒子的展开/收起状态
     * @param boxId - 盒子 ID
     * @param element - 触发元素
     */
    const toggleBox = (boxId: string, element: HTMLElement) => {
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
            boxStates.value[boxId] = "closed"

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
            boxStates.value[boxId] = "open"

            setTimeout(() => {
                boxBody.style.height = ""
                boxBody.style.overflow = ""
                boxBody.style.opacity = ""
            }, 300)
        }
    }

    /**
     * 注册全局处理器（用于内联 onclick）
     */
    const registerGlobalHandlers = () => {
        if (typeof window !== "undefined") {
            ;(window as any).toggleBox = toggleBox
        }
    }

    /**
     * 重置盒子计数器和状态
     */
    const resetBoxes = () => {
        boxCounters.value = {}
    }

    return {
        boxStates,
        boxCounters,
        toggleBox,
        registerGlobalHandlers,
        resetBoxes,
    }
}
