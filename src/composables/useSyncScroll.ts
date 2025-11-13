import { ref, onBeforeUnmount } from "vue"
import * as monaco from "monaco-editor"

/**
 * 同步滚动 composable
 * 用于同步编辑器和预览面板的滚动位置
 */
export function useSyncScroll() {
    const isSyncing = ref(false) // 防止循环触发

    let editorScrollDisposable: monaco.IDisposable | null = null
    let previewScrollHandler: (() => void) | null = null

    /**
     * 设置编辑器和预览容器的同步滚动
     * @param editor Monaco 编辑器实例
     * @param previewContainer 预览容器的 DOM 元素
     */
    const setupSync = (
        editor: monaco.editor.IStandaloneCodeEditor | null,
        previewContainer: HTMLElement | null
    ) => {
        if (!editor || !previewContainer) {
            return
        }

        cleanup()

        // 监听编辑器滚动
        editorScrollDisposable = editor.onDidScrollChange((e) => {
            if (isSyncing.value) return

            isSyncing.value = true

            // 计算编辑器的滚动比例
            const scrollTop = e.scrollTop
            const scrollHeight = editor.getScrollHeight()
            const clientHeight = editor.getLayoutInfo().height

            const maxScroll = Math.max(0, scrollHeight - clientHeight)
            const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0

            // 同步到预览容器
            const previewMaxScroll = Math.max(0, previewContainer.scrollHeight - previewContainer.clientHeight)
            previewContainer.scrollTop = scrollRatio * previewMaxScroll

            // 使用 requestAnimationFrame 确保滚动完成后再重置标志
            requestAnimationFrame(() => {
                isSyncing.value = false
            })
        })

        // 监听预览容器滚动
        previewScrollHandler = () => {
            if (isSyncing.value) return

            isSyncing.value = true

            const scrollTop = previewContainer.scrollTop
            const scrollHeight = previewContainer.scrollHeight
            const clientHeight = previewContainer.clientHeight

            const maxScroll = Math.max(0, scrollHeight - clientHeight)
            const scrollRatio = maxScroll > 0 ? scrollTop / maxScroll : 0

            const editorMaxScroll = Math.max(0, editor.getScrollHeight() - editor.getLayoutInfo().height)
            const targetScrollTop = scrollRatio * editorMaxScroll

            editor.setScrollTop(targetScrollTop)

            requestAnimationFrame(() => {
                isSyncing.value = false
            })
        }

        previewContainer.addEventListener("scroll", previewScrollHandler, { passive: true })
    }

    /**
     * 清理所有监听器
     */
    const cleanup = () => {
        if (editorScrollDisposable) {
            editorScrollDisposable.dispose()
            editorScrollDisposable = null
        }

        if (previewScrollHandler && typeof window !== "undefined") {
            const previewContainers = document.querySelectorAll(".preview-content")
            previewContainers.forEach((container) => {
                container.removeEventListener("scroll", previewScrollHandler as any)
            })
            previewScrollHandler = null
        }
    }

    // 组件卸载时清理
    onBeforeUnmount(() => {
        cleanup()
    })

    return {
        setupSync,
        cleanup,
    }
}
