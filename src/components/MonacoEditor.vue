<template>
    <div ref="editorContainer" class="w-full flex-1"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue"
import * as monaco from "monaco-editor"
import editorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import { registerBBCodeLanguage, updateBBCodeTranslations } from "@/config/bbcodeLanguage"
import { type BBCodeTag } from "@/config/bbcodeTags"
import { useThemeStore } from "@/stores/theme"

const props = defineProps<{
    modelValue: string
    language?: string
    theme?: string
    options?: monaco.editor.IStandaloneEditorConstructionOptions
    bbcodeTags?: BBCodeTag[]
}>()

const emit = defineEmits<{
    "update:modelValue": [value: string]
    editorMounted: [editor: monaco.editor.IStandaloneCodeEditor]
}>()

const editorContainer = ref<HTMLDivElement>()
let editor: monaco.editor.IStandaloneCodeEditor | null = null
let updateTimeout: ReturnType<typeof setTimeout> | null = null

const themeStore = useThemeStore()

// Compute theme to use
const currentTheme = computed(() => {
    return props.theme || themeStore.currentTheme.id
})

// 初始化编辑器
const initEditor = async () => {
    if (!editorContainer.value) return

    self.MonacoEnvironment = {
        getWorker(_, label) {
            return new editorWorker()
        }
    }

    // 注册 BBCode 语言
    if (props.bbcodeTags) {
        registerBBCodeLanguage(monaco, props.bbcodeTags)
    }

    editor = monaco.editor.create(editorContainer.value, {
        value: props.modelValue,
        language: props.language || "bbcode",
        theme: currentTheme.value,
        automaticLayout: true,
        ...props.options,
    })

    // 防抖更新
    editor.onDidChangeModelContent(() => {
        if (updateTimeout) {
            clearTimeout(updateTimeout)
        }

        updateTimeout = globalThis.setTimeout(() => {
            if (editor) {
                emit("update:modelValue", editor.getValue())
            }
        }, 150)
    })

    emit("editorMounted", editor)
}

// 监听外部值变化
watch(
    () => props.modelValue,
    (newValue) => {
        if (editor && newValue !== editor.getValue()) {
            const position = editor.getPosition()
            editor.setValue(newValue)
            if (position) {
                editor.setPosition(position)
            }
        }
    }
)

// 监听配置变化
watch(
    () => props.options,
    (newOptions) => {
        if (editor && newOptions) {
            editor.updateOptions(newOptions)
        }
    },
    { deep: true }
)

// 监听主题变化
watch(currentTheme, (newTheme) => {
    if (editor) {
        monaco.editor.setTheme(newTheme)
    }
})

// 监听 bbcodeTags 变化（语言切换时更新）
watch(
    () => props.bbcodeTags,
    (newTags) => {
        if (newTags && newTags.length > 0) {
            // 只更新翻译，不重复注册语言
            updateBBCodeTranslations(newTags)
        }
    },
    { deep: true }
)

// 生命周期
onMounted(() => {
    initEditor()
})

onBeforeUnmount(() => {
    if (updateTimeout) {
        clearTimeout(updateTimeout)
    }
    editor?.dispose()
})

// 暴露编辑器实例
defineExpose({
    getEditor: () => editor,
})
</script>
