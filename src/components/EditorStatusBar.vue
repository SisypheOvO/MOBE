<template>
    <div class="flex items-center gap-3 px-4 pt-0.5 pb-[0.15rem] bg-[#007acc] text-white text-xs font-mono">
        <div class="flex items-center gap-2">
            <span class="opacity-80">{{ t('statusbar.row') }}</span>
            <span class="font-semibold">{{ line }}</span>
        </div>

        <div class="w-px h-3.5 bg-white/30"></div>

        <div class="flex items-center gap-2">
            <span class="opacity-80">{{ t('statusbar.column') }}</span>
            <span class="font-semibold">{{ column }}</span>
        </div>

        <div class="w-px h-3.5 bg-white/30"></div>

        <div class="flex items-center gap-2">
            <span class="opacity-80 hidden md:inline">{{ t('statusbar.charsCount') }}</span>
            <span class="font-semibold">{{ length.toLocaleString() }}</span>
        </div>

        <div v-if="selected" class="w-px h-3.5 bg-white/30"></div>

        <div v-if="selected" class="flex items-center gap-2">
            <span class="opacity-80 hidden md:inline">{{ t('statusbar.selectedCharsCount') }}</span>
            <span class="font-semibold">{{ selected.toLocaleString() }}</span>
        </div>

        <div class="flex-1"></div>

        <div class="flex items-center">
            <span class="font-semibold">{} BBCode</span>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

defineProps<{
    line: number
    column: number
    length: number
    selected: number
}>()
</script>
