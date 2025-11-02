<template>
    <div class="flex items-center gap-3 px-2 py-1.5 bg-[#2d2d2d] border-b border-[#3c3c3c] flex-wrap">
        <template v-for="(category, index) in categories" :key="category.name">
            <div class="flex items-center gap-1 pl-3 pr-1 bg-[#363636] rounded border border-[#454545]">
                <span class="text-xs text-[#a8a8a8] mr-1.5 font-semibold hidden md:inline">{{ category.label }}</span>
                <button v-for="tag in category.tags" :key="tag.tag" :class="buttonClass" :title="getTagTitle(tag)" @click="$emit('insert-tag', tag)">
                    <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
                </button>
            </div>

            <div v-if="index < categories.length - 1" :class="dividerClass"></div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { computed } from "vue"
    import type { BBCodeTag } from "@/config/bbcodeTags"

    const props = defineProps<{
        tags: BBCodeTag[]
    }>()

    defineEmits<{
        "insert-tag": [tag: BBCodeTag]
    }>()

    const buttonClass = "flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm"

    const dividerClass = "w-0.5 h-6 bg-[#4a4a4a] mx-0.5 hidden md:block rounded-full"

    const categoryConfig = [
        { name: "format", label: "格式" },
        { name: "media", label: "媒体" },
        { name: "layout", label: "布局" },
        { name: "special", label: "特殊" },
        { name: "osu", label: "osu!" },
    ] as const

    // 动态分组标签
    const categories = computed(() =>
        categoryConfig.map((config) => ({
            ...config,
            tags: props.tags.filter((t) => t.category === config.name),
        }))
    )

    const getTagTitle = (tag: BBCodeTag) => {
        return tag.shortcut ? `${tag.label} (${tag.shortcut})` : tag.label
    }
</script>
