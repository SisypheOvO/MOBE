<template>
    <div class="bbcode_preview h-[calc(100%-4px)] flex flex-col gap-1 bg-[#2e3038] p-1 pb-0">
        <BBCodeHeader @refresh="forceUpdate" />
        <BBCodeContent :parsed-content="parsedContent" />
    </div>
</template>

<script setup lang="ts">
import { ref, toRef, onMounted, onBeforeUnmount } from "vue"
import BBCodeHeader from "./BBCodeHeader.vue"
import BBCodeContent from "./BBCodeContent.vue"
import { useBoxToggle } from "@/composables/useBoxToggle"
import { useUserInfo } from "@/composables/useUserInfo"
import { useBBCodeParser } from "@/composables/useBBCodeParser"
import { useUserCard } from "@/composables/useUserCard"
import { showImageMapTooltip, hideImageMapTooltip, cleanupImageMapTooltips } from "@/composables/useImageMapTooltip"

const props = defineProps<{
    content: string
}>()

const refreshKey = ref(0)

const { boxStates, boxCounters, registerGlobalHandlers, resetBoxes } = useBoxToggle()
const { getFriendshipStatus } = useUserInfo()

const { parsedContent } = useBBCodeParser({
    content: toRef(props, "content"),
    boxStates,
    boxCounters,
    resetBoxes,
    refreshKey,
})

const { registerGlobalHandlers: registerUserCardHandlers, cleanup: cleanupUserCard } = useUserCard(getFriendshipStatus)

const forceUpdate = () => {
    refreshKey.value++
}

onMounted(() => {
    if (globalThis?.window !== undefined) {
        registerGlobalHandlers()
        registerUserCardHandlers()

        // 注册 imagemap tooltip 处理器
        ;(globalThis as any).showImageMapTooltip = showImageMapTooltip
        ;(globalThis as any).hideImageMapTooltip = hideImageMapTooltip
    }
})

onBeforeUnmount(() => {
    cleanupUserCard()
    cleanupImageMapTooltips()

    if (globalThis?.window !== undefined) {
        delete (globalThis as any).showImageMapTooltip
        delete (globalThis as any).hideImageMapTooltip
    }
})
</script>
