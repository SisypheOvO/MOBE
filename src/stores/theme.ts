import { ref } from "vue"
import { defineStore } from "pinia"
import { availableThemes, type ThemeDefinition } from "@/config/monacoThemes"

const THEME_STORAGE_KEY = "obe_theme"

export const useThemeStore = defineStore("theme", () => {
    const currentTheme = ref<ThemeDefinition>(availableThemes[0])

    // Load theme from localStorage
    const loadThemeFromStorage = () => {
        try {
            const storedThemeId = localStorage.getItem(THEME_STORAGE_KEY)
            if (storedThemeId) {
                const theme = availableThemes.find((t) => t.id === storedThemeId)
                if (theme) {
                    currentTheme.value = theme
                }
            }
        } catch (e) {
            console.error("Failed to load theme from storage:", e)
        }
    }

    // Save theme to localStorage
    const saveThemeToStorage = () => {
        try {
            localStorage.setItem(THEME_STORAGE_KEY, currentTheme.value.id)
        } catch (e) {
            console.error("Failed to save theme to storage:", e)
        }
    }

    // Set theme
    const setTheme = (themeId: string) => {
        const theme = availableThemes.find((t) => t.id === themeId)
        if (theme) {
            currentTheme.value = theme
            saveThemeToStorage()
        }
    }

    // Initialize
    const initialize = () => {
        loadThemeFromStorage()
    }

    return {
        currentTheme,
        availableThemes: availableThemes,
        setTheme,
        initialize,
    }
})
