<template>
    <div class="flex flex-col h-full bg-[#1e1e1e] text-[#d4d4d4]">
        <Drawer :is-open="isDrawerOpen" @close="isDrawerOpen = false" />

        <EditorToolbar v-if="showToolbar" :tags="bbcodeTags" :show-preview="showPreview" @insert-tag="handleInsertTag" @toggle-preview="togglePreview" @toggle-drawer="isDrawerOpen = !isDrawerOpen" />

        <splitpanes class="flex flex-1 overflow-hidden" @resized="storePaneSize">
            <pane class="editor flex flex-col min-w-0 transition-all duration-300" min-size="40" :size="paneSize">
                <span class="sr-only">BBCode 编辑器</span>
                <div class="h-[21px] px-2 flex flex-col justify-center">
                    <span v-if="isAuthenticated && userData" class="text-[10px] text-[#9c8dcf]">https://osu.ppy.sh/users/{{ userData.id }}</span>
                </div>
                <MonacoEditor ref="editorRef" v-model="content" :options="editorOptions" :bbcode-tags="bbcodeTags" @editor-mounted="handleEditorMounted" />
            </pane>

            <Transition name="preview-fade">
                <pane v-if="showPreview" class="preview flex-1 min-w-0 border-l border-[#3c3c3c] overflow-y-hidden bg-[#17181c]" min-size="20" :size="100 - paneSize">
                    <BBCodePreview class="mx-auto" :content="content" />
                </pane>
            </Transition>
        </splitpanes>

        <EditorStatusBar :line="cursorPosition.line" :column="cursorPosition.column" :selected="cursorPosition.selected" :length="content.length" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { storeToRefs } from "pinia"
import { useI18n } from "vue-i18n"
import MonacoEditor from "./components/MonacoEditor.vue"
import EditorToolbar from "./components/EditorToolbar.vue"
import BBCodePreview from "./components/BBCodePreview.vue"
import EditorStatusBar from "./components/EditorStatusBar.vue"
import Drawer from "./components/Drawer.vue"
import * as monaco from "monaco-editor"
import { getTranslatedBBCodeTags, type BBCodeTag } from "./config/bbcodeTags"
import { Splitpanes, Pane } from "splitpanes"
import { useAuthStore } from "@/stores/auth"
import { useContentsStore } from "@/stores/contents"
import { useThemeStore } from "@/stores/theme"
import "splitpanes/dist/splitpanes.css"

const { t } = useI18n()

const authStore = useAuthStore()
const { isAuthenticated, userData } = storeToRefs(authStore)

const contentsStore = useContentsStore()
const themeStore = useThemeStore()

// Initialize stores
onMounted(() => {
    contentsStore.initialize()
    themeStore.initialize()
})

// Get translated BBCode tags
const bbcodeTags = computed(() => getTranslatedBBCodeTags(t))

// Use computed with getter/setter for two-way binding with store
const content = computed({
    get: () => contentsStore.currentContent || t("defaultContent"),
    set: (newContent: string) => {
        contentsStore.updateCurrentContentText(newContent)
    },
})

const showPreview = ref(true)
const showToolbar = ref(true)
const isDrawerOpen = ref(false)

const editorRef = ref<InstanceType<typeof MonacoEditor>>()
let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null
const cursorPosition = ref({ line: 1, column: 1, selected: 0 })
const paneSize = ref(localStorage.paneSize ?? 45) // Read from persistent localStorage.

interface PaneInfo {
    size: number
    id: number
    index: number
    max: number
    min: number
    givenSize: number
    el: any
}

const storePaneSize = ({ prevPane }: { prevPane: PaneInfo }) => {
    localStorage.paneSize = prevPane.size // Store in persistent localStorage.
    paneSize.value = prevPane.size
}

// 编辑器配置
const editorOptions = computed<monaco.editor.IStandaloneEditorConstructionOptions>(() => ({
    fontSize: 14,
    minimap: { enabled: showPreview.value },
    wordWrap: "on",
    lineNumbers: "on",
    scrollBeyondLastLine: false,
    automaticLayout: true,
    tabSize: 2,
    insertSpaces: true,
    formatOnPaste: true,
    formatOnType: true,
    linkedEditing: true,
}))

// 切换预览显示
const togglePreview = () => {
    showPreview.value = !showPreview.value
}

// 编辑器挂载完成
const handleEditorMounted = (editor: monaco.editor.IStandaloneCodeEditor) => {
    editorInstance = editor

    // 监听光标位置变化
    editor.onDidChangeCursorPosition((e) => {
        cursorPosition.value = {
            line: e.position.lineNumber,
            column: e.position.column,
            selected: editor.getModel()?.getValueLengthInRange(editor.getSelection()!) || 0,
        }
    })

    // 添加快捷键
    setupKeyboardShortcuts(editor)
}

// 设置快捷键
const setupKeyboardShortcuts = (editor: monaco.editor.IStandaloneCodeEditor) => {
    // Ctrl+B - 粗体
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyB, () => {
        insertTagByName("b")
    })

    // Ctrl+I - 斜体
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyI, () => {
        insertTagByName("i")
    })

    // Ctrl+U - 下划线
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyU, () => {
        insertTagByName("u")
    })

    // Ctrl+K - 链接
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyK, () => {
        insertTagByName("url")
    })

    // Ctrl+P - 切换预览
    editor.addCommand(monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyP, () => {
        togglePreview()
    })
}

// 插入标签
const handleInsertTag = (tag: BBCodeTag) => {
    if (!editorInstance) return

    const selection = editorInstance.getSelection()
    if (!selection) return

    const selectedText = editorInstance.getModel()?.getValueInRange(selection) || ""
    const insertText = formatTagText(tag, selectedText)

    editorInstance.executeEdits("insert-tag", [
        {
            range: selection,
            text: insertText,
        },
    ])

    // 设置光标位置（选中占位符文本）
    if (!selectedText && tag.placeholder) {
        const newSelection = calculateSelectionRange(selection, insertText, tag)
        editorInstance.setSelection(newSelection)
    }

    editorInstance.focus()
}

// 根据标签名插入
const insertTagByName = (tagName: string) => {
    const tag = bbcodeTags.value.find((t) => t.tag.startsWith(tagName))
    if (tag) {
        handleInsertTag(tag)
    }
}

// 格式化标签文本
const formatTagText = (tag: BBCodeTag, selectedText: string): string => {
    const tagMatch = tag.tag.match(/^([^=]+)(?:=(.+))?$/)
    if (!tagMatch) return selectedText

    const [, tagName, tagParam] = tagMatch
    const content = selectedText || tag.placeholder

    if (tagParam) {
        return `[${tag.tag}]${content}[/${tagName}]`
    }

    if (tagName === "list") {
        return selectedText ? `[list]\n${content}\n[/list]` : `[list]\n${content}\n[/list]`
    }

    return `[${tagName}]${content}[/${tagName}]`
}

// 计算选中范围（用于选中占位符）
const calculateSelectionRange = (originalSelection: monaco.Selection, insertedText: string, tag: BBCodeTag): monaco.Selection => {
    const openTagLength = tag.tag.length + 2 // [tag]
    const startColumn = originalSelection.startColumn + openTagLength
    const endColumn = startColumn + tag.placeholder.length

    return new monaco.Selection(originalSelection.startLineNumber, startColumn, originalSelection.startLineNumber, endColumn)
}
</script>

<style scoped>
.preview-fade-enter-active,
.preview-fade-leave-active {
    transition:
        opacity 0.3s ease,
        transform 0.3s ease;
}

.preview-fade-enter-from {
    opacity: 0;
    transform: translateX(20px);
}

.preview-fade-leave-to {
    opacity: 0;
    transform: translateX(20px);
}
</style>
