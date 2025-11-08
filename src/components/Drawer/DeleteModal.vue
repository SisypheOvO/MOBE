<template>
    <BaseModal :is-open="isOpen" :title="t('drawer.deleteContent')" modal-class="max-w-sm" @close="handleCancel">
        <!-- Message Content -->
        <div class="text-[#c2c0b6] whitespace-pre-line">{{ t("drawer.deleteConfirmation") }}</div>

        <!-- Custom Footer Buttons -->
        <template #footer>
            <button type="button" class="inline-flex items-center justify-center relative shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 font-medium border border-[#5e5d58] transition duration-100 h-9 px-4 py-2 rounded-lg min-w-20 active:scale-[0.985] whitespace-nowrap bg-transparent hover:bg-black text-[#d4d4d4]" @click="handleCancel">{{ t("common.cancel") }}</button>
            <button type="button" class="inline-flex items-center justify-center relative shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 font-medium transition hover:scale-y-[1.015] hover:scale-x-[1.005] hover:opacity-95 h-9 px-4 py-2 rounded-lg min-w-20 active:scale-[0.985] whitespace-nowrap bg-[#d45151] text-white" data-testid="delete-modal-confirm" @click="handleConfirm">
                {{ t("common.delete") }}
            </button>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from "@/components/ui/BaseModal.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    close: []
    confirm: []
}>()

const handleConfirm = () => {
    emit("confirm")
}

const handleCancel = () => {
    emit("close")
}
</script>
