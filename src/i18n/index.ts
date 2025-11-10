import { ref } from "vue"
import { dateTimeFormats, numberFormats } from "./formats.ts"
import { zh, zhTW, en, ja, kr, ru } from "./langs"

// Constants and Types
export const SUPPORTED_LOCALES = ["zh", "zh-TW", "en", "ja", "kr", "ru"] as const
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number]

export const LOCALE_STORAGE_KEY = "mobe_locale"

export interface LocaleOption {
    code: SupportedLocale
    name: string
    nativeName: string
}

export const availableLocales: LocaleOption[] = [
    { code: "zh", name: "Chinese (Simplified)", nativeName: "简体中文" },
    { code: "zh-TW", name: "Chinese (Traditional)", nativeName: "繁體中文" },
    { code: "en", name: "English", nativeName: "English" },
    { code: "ja", name: "Japanese", nativeName: "日本語" },
    { code: "kr", name: "Korean", nativeName: "한국어" },
    { code: "ru", name: "Russian", nativeName: "Русский" },
]

// a map for faster lookups
export const localeMap = Object.fromEntries(availableLocales.map((locale) => [locale.code, locale])) as Record<SupportedLocale, LocaleOption>

// Language detection utilities
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
    return SUPPORTED_LOCALES.includes(locale as SupportedLocale)
}

export const normalizeLocale = (locale: string): SupportedLocale => {
    // 1. case-insensitive 完全匹配
    const lowerLocale = locale.toLowerCase()
    const exactMatch = SUPPORTED_LOCALES.find((supported) => supported.toLowerCase() === lowerLocale)
    if (exactMatch) {
        return exactMatch
    }

    // 2. special handling for Chinese variants
    if (lowerLocale.startsWith("zh")) {
        if (lowerLocale.includes("tw") || lowerLocale.includes("hk") || lowerLocale.includes("mo")) {
            return "zh-TW"
        }
        return "zh"
    }

    // 3. Language code match (e.g., "en-US" -> "en")
    const langCode = lowerLocale.split("-")[0]
    if (isSupportedLocale(langCode)) {
        return langCode
    }

    // 4. Default fallback
    return "en"
}

export const detectBrowserLocale = (): SupportedLocale => {
    if (typeof navigator === "undefined") return "en"

    const languages = [navigator.language, ...navigator.languages]

    for (const lang of languages) {
        if (!lang) continue

        const detected = normalizeLocale(lang)
        if (detected !== "en") {
            // Prefer non-English if available
            return detected
        }
    }

    return normalizeLocale(navigator.language || "en")
}

// Storage utilities
export const loadLocaleFromStorage = (): SupportedLocale => {
    try {
        const stored = localStorage.getItem(LOCALE_STORAGE_KEY)
        return stored ? normalizeLocale(stored) : detectBrowserLocale()
    } catch (error) {
        console.warn("Failed to load locale from storage:", error)
        return detectBrowserLocale()
    }
}

export const saveLocaleToStorage = (locale: string): boolean => {
    try {
        const normalized = normalizeLocale(locale)
        localStorage.setItem(LOCALE_STORAGE_KEY, normalized)
        return true
    } catch (error) {
        console.warn("Failed to save locale to storage:", error)
        return false
    }
}

// Reactive state
export const savedLanguage = ref<SupportedLocale>(loadLocaleFromStorage())
export const selectedLanguage = ref<SupportedLocale>(savedLanguage.value)

// i18n configuration
export const i18nConfig = {
    locale: selectedLanguage.value,
    fallbackLocale: "en",
    messages: { zh, "zh-TW": zhTW, en, ja, kr, ru },
    dateTimeFormats,
    numberFormats,
    legacy: false,
}

// Utility function for locale management
export const setApplicationLocale = (locale: string): SupportedLocale => {
    const normalized = normalizeLocale(locale)

    if (saveLocaleToStorage(normalized)) {
        selectedLanguage.value = normalized
        savedLanguage.value = normalized
    }

    return normalized
}
