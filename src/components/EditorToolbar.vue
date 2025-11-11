<template>
    <div class="flex items-center gap-2.5 pl-2 pr-4 py-1.5 bg-[#2d2d2d] border-b border-[#3c3c3c]">
        <button
            class="inline-flex items-center justify-center relative shrink-0 can-focus select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-transparent transition font-base duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] h-8 w-8 rounded-md active:scale-95 group bg-transparent hover:bg-[hsl(60,3%,14%)] text-[#8e8d86]"
            type="button"
            data-testid="pin-sidebar-toggle"
            aria-label="Sidebar"
            aria-haspopup="menu"
            data-state="closed"
            @click="$emit('toggle-drawer')"
        >
            <div class="relative">
                <div class="flex items-center justify-center group-hover:scale-80 group-hover:opacity-0 transition scale-100 text-text-300" style="width: 20px; height: 20px">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0 group-hover:scale-80 group-hover:opacity-0 transition scale-100 text-text-300" aria-hidden="true">
                        <path d="M16.5 4C17.3284 4 18 4.67157 18 5.5V14.5C18 15.3284 17.3284 16 16.5 16H3.5C2.67157 16 2 15.3284 2 14.5V5.5C2 4.67157 2.67157 4 3.5 4H16.5ZM7 15H16.5C16.7761 15 17 14.7761 17 14.5V5.5C17 5.22386 16.7761 5 16.5 5H7V15ZM3.5 5C3.22386 5 3 5.22386 3 5.5V14.5C3 14.7761 3.22386 15 3.5 15H6V5H3.5Z"></path>
                    </svg>
                </div>
                <div class="flex items-center justify-center opacity-0 scale-75 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-text-200" style="width: 20px; height: 20px">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0 opacity-0 scale-75 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-text-200" aria-hidden="true">
                        <path
                            d="M16.5 3C16.7761 3 17 3.22386 17 3.5V16.5L16.9902 16.6006C16.9437 16.8286 16.7417 17 16.5 17C16.2583 17 16.0563 16.8286 16.0098 16.6006L16 16.5V3.5C16 3.22386 16.2239 3 16.5 3ZM8.12793 5.16504C8.28958 4.98547 8.5524 4.95058 8.75293 5.06836L8.83496 5.12793L13.835 9.62793C13.9403 9.72275 14 9.85828 14 10C14 10.1063 13.9667 10.2093 13.9053 10.2939L13.835 10.3721L8.83496 14.8721C8.62972 15.0568 8.31267 15.0402 8.12793 14.835C7.94322 14.6297 7.95984 14.3127 8.16504 14.1279L12.1963 10.5H3.5C3.22386 10.5 3 10.2761 3 10C3 9.72386 3.22386 9.5 3.5 9.5H12.1963L8.16504 5.87207L8.09766 5.79688C7.95931 5.60979 7.96622 5.34471 8.12793 5.16504Z"
                        ></path>
                    </svg>
                </div>
            </div>
        </button>

        <div :class="dividerClass"></div>

        <div class="md:flex-1 w-0 md:opacity-100 opacity-0 md:min-w-0 min-w-0 relative transition-all duration-300 overflow-hidden pointer-events-none md:pointer-events-auto">
            <div ref="scrollContainer" class="overflow-x-auto items-center gap-2.5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden flex" @scroll="handleScroll">
                <template v-for="(category, index) in categories" :key="category.name">
                    <div class="flex items-center gap-1 pl-3 pr-1 py-1 bg-[#363636] rounded border border-[#454545] shrink-0">
                        <span class="text-xs text-[#a8a8a8] mr-1.5 font-semibold">{{ category.label }}</span>
                        <button v-for="tag in category.tags" :key="tag.tag" :class="buttonClass" :title="getTagTitle(tag)" @click="$emit('insert-tag', tag)">
                            <i :class="tag.icon"></i>
                        </button>
                    </div>

                    <div v-if="index < categories.length - 1" :class="dividerClass"></div>
                </template>
            </div>
            <div class="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-[#2d2d2d] to-transparent pointer-events-none transition-opacity duration-200" :class="showLeftFade ? 'opacity-100' : 'opacity-0'"></div>
            <div class="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#2d2d2d] to-transparent pointer-events-none transition-opacity duration-200" :class="showRightFade ? 'opacity-100' : 'opacity-0'"></div>
        </div>

        <div class="flex-1 md:flex-[0_0_0px] transition-all duration-300"></div>

        <OAuthButton class="shrink-0" />

        <button :class="[buttonClass, showPreview ? 'text-[#4ec9b0]' : '', 'shrink-0']" :title="showPreview ? '隐藏预览 (Ctrl+P)' : '显示预览 (Ctrl+P)'" @click="$emit('toggle-preview')">
            <i :class="showPreview ? 'fas fa-eye' : 'fas fa-eye-slash'"></i>
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted, nextTick } from "vue"
import type { BBCodeTag } from "@/config/bbcodeTags"
import OAuthButton from "@/components/OAuthButton.vue"
import { useI18n } from "vue-i18n"

const props = defineProps<{
    tags: BBCodeTag[]
    showPreview?: boolean
}>()

defineEmits<{
    "insert-tag": [tag: BBCodeTag]
    "toggle-preview": []
    "toggle-drawer": []
}>()

const { t } = useI18n()

const buttonClass = "flex items-center justify-center w-7 h-7 border-0 bg-transparent text-[#cccccc] rounded cursor-pointer transition-all duration-200 hover:bg-[#3c3c3c] hover:text-white active:bg-[#505050] active:scale-95 text-sm"

const dividerClass = "w-0.5 h-6 bg-[#4a4a4a] hidden md:block rounded-full"

// 动态分组标签
const categories = computed(() => {
    const categoryConfig = [
        { name: "format", label: t("toolbar.format") },
        { name: "media", label: t("toolbar.media") },
        { name: "layout", label: t("toolbar.layout") },
        { name: "special", label: t("toolbar.special") },
        { name: "osu", label: t("toolbar.osu") },
    ] as const

    return categoryConfig.map((config) => ({
        ...config,
        tags: props.tags.filter((tag) => tag.category === config.name),
    }))
})

const getTagTitle = (tag: BBCodeTag) => {
    return tag.shortcut ? `${tag.label} (${tag.shortcut})` : tag.label
}

// 滚动相关
const scrollContainer = ref<HTMLElement | null>(null)
const showLeftFade = ref(false)
const showRightFade = ref(false)

const updateFadeStates = () => {
    if (!scrollContainer.value) return

    const { scrollLeft, scrollWidth, clientWidth } = scrollContainer.value

    // 左侧遮罩：滚动位置大于 5px 时显示
    showLeftFade.value = scrollLeft > 5

    // 右侧遮罩：还没滚动到底部时显示（留 5px 容差）
    showRightFade.value = scrollLeft < scrollWidth - clientWidth - 5
}

const handleScroll = () => {
    updateFadeStates()
}

const handleResize = () => {
    updateFadeStates()
}

onMounted(() => {
    nextTick(() => {
        updateFadeStates()
    })

    window.addEventListener("resize", handleResize)
})

onUnmounted(() => {
    window.removeEventListener("resize", handleResize)
})
</script>
