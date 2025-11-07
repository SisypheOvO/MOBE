<template>
    <div class="px-2 py-2 border-t border-[#3c3c3c]">
        <label class="text-xs text-[#888888] pl-2 block mb-1">Editor Theme</label>
        <select v-model="selectedTheme" @change="handleThemeChange" class="w-full px-2 py-1.5 bg-[#141413] border border-[#3c3c3c] rounded-md text-sm text-[#d4d4d4] hover:border-[#4c4c4c] focus:border-[#d97757] focus:outline-none cursor-pointer transition-colors">
            <option v-for="theme in themeStore.availableThemes" :key="theme.id" :value="theme.id">
                {{ theme.name }}
            </option>
        </select>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { useThemeStore } from "@/stores/theme"

const themeStore = useThemeStore()
const selectedTheme = ref(themeStore.currentTheme.id)

// Watch for theme changes from store
watch(
    () => themeStore.currentTheme.id,
    (newTheme) => {
        selectedTheme.value = newTheme
    }
)

const handleThemeChange = () => {
    themeStore.setTheme(selectedTheme.value)
}
</script>
