<template>
    <div ref="editorContainer" class="w-full flex-1"></div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch, computed } from "vue"
import * as monaco from "monaco-editor"
import { registerBBCodeLanguage } from "@/config/bbcodeLanguage"
import { useThemeStore } from "@/stores/theme"

const props = defineProps<{
    modelValue: string
    language?: string
    theme?: string
    options?: monaco.editor.IStandaloneEditorConstructionOptions
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

    // 注册 BBCode 语言
    registerBBCodeLanguage(monaco)

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
