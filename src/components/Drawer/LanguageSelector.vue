<template>
    <div class="px-2 pt-2 pb-2.5 border-t border-[#3c3c3c]">
        <BaseSelect :label="t('drawer.language')" v-model="currentLanguage" :options="languageOptions" placeholder="Select a language..." @change="handleLanguageChange" />
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue"
import { useI18n } from "vue-i18n"
import BaseSelect from "@/components/ui/BaseSelect.vue"
import { availableLocales, setApplicationLocale, type SupportedLocale } from "@/i18n"

const { locale } = useI18n()
const { t } = useI18n()

const currentLanguage = ref<SupportedLocale>(locale.value as SupportedLocale)

const languageOptions = computed(() =>
    availableLocales.map((lang) => ({
        value: lang.code,
        label: lang.name,
    }))
)

const handleLanguageChange = (value: string) => {
    const newLocale = setApplicationLocale(value)
    locale.value = newLocale
    currentLanguage.value = newLocale
}
</script>
