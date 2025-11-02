<template>
    <div class="flex items-center gap-2 px-4 py-1.5 bg-[#2d2d2d] border-b border-[#3c3c3c] flex-wrap">
        <div class="flex items-center gap-1">
            <span class="text-xs text-[#858585] mr-2 font-medium hidden md:inline">格式</span>
            <button v-for="tag in formatTags" :key="tag.tag" class="flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm" :title="`${tag.label}${tag.shortcut ? ` (${tag.shortcut})` : ''}`" @click="$emit('insert-tag', tag)">
                <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
            </button>
        </div>

        <div class="w-px h-6 bg-[#3c3c3c] mx-1 hidden md:block"></div>

        <div class="flex items-center gap-1">
            <span class="text-xs text-[#858585] mr-2 font-medium hidden md:inline">媒体</span>
            <button v-for="tag in mediaTags" :key="tag.tag" class="flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm" :title="`${tag.label}${tag.shortcut ? ` (${tag.shortcut})` : ''}`" @click="$emit('insert-tag', tag)">
                <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
            </button>
        </div>

        <div class="w-px h-6 bg-[#3c3c3c] mx-1 hidden md:block"></div>

        <div class="flex items-center gap-1">
            <span class="text-xs text-[#858585] mr-2 font-medium hidden md:inline">布局</span>
            <button v-for="tag in layoutTags" :key="tag.tag" class="flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm" :title="tag.label" @click="$emit('insert-tag', tag)">
                <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
            </button>
        </div>

        <div class="w-px h-6 bg-[#3c3c3c] mx-1 hidden md:block"></div>

        <div class="flex items-center gap-1">
            <span class="text-xs text-[#858585] mr-2 font-medium hidden md:inline">特殊</span>
            <button v-for="tag in specialTags" :key="tag.tag" class="flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm" :title="tag.label" @click="$emit('insert-tag', tag)">
                <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
            </button>
        </div>

        <div class="w-px h-6 bg-[#3c3c3c] mx-1 hidden md:block"></div>

        <div class="flex items-center gap-1">
            <span class="text-xs text-[#858585] mr-2 font-medium hidden md:inline">osu!</span>
            <button v-for="tag in osuTags" :key="tag.tag" class="flex items-center justify-center w-8 h-8 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm" :title="tag.label" @click="$emit('insert-tag', tag)">
                <span class="flex items-center justify-center font-bold">{{ tag.icon }}</span>
            </button>
        </div>
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

    const formatTags = computed(() => props.tags.filter((t) => t.category === "format"))
    const mediaTags = computed(() => props.tags.filter((t) => t.category === "media"))
    const layoutTags = computed(() => props.tags.filter((t) => t.category === "layout"))
    const specialTags = computed(() => props.tags.filter((t) => t.category === "special"))
    const osuTags = computed(() => props.tags.filter((t) => t.category === "osu"))
</script>
