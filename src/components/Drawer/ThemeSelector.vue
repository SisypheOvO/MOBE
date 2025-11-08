<template>
    <div class="px-2 pt-2 pb-2.5 border-t border-[#3c3c3c]">
        <BaseSelect
            v-model="selectedTheme"
            :options="themeOptions"
            :label="t('drawer.editorTheme')"
            :placeholder="t('drawer.selectTheme')"
            @change="handleThemeChange"
        />
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue"
import { useThemeStore } from "@/stores/theme"
import BaseSelect from "@/components/ui/BaseSelect.vue"
import { useI18n } from "vue-i18n"

const themeStore = useThemeStore()
const selectedTheme = ref(themeStore.currentTheme.id)
const { t } = useI18n()

// Convert themes to select options format
const themeOptions = computed(() =>
    themeStore.availableThemes.map((theme) => ({
        value: theme.id,
        label: theme.name,
    }))
)

watch(
    () => themeStore.currentTheme.id,
    (newTheme: string) => {
        selectedTheme.value = newTheme
    }
)

const handleThemeChange = () => {
    themeStore.setTheme(selectedTheme.value)
}
</script>
