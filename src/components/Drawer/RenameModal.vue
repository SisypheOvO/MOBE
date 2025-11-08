<template>
    <BaseModal :is-open="isOpen" :title="t('drawer.renameContent')" modal-class="max-w-sm" @close="handleCancel">
        <!-- Form Content -->
        <form class="grid gap-2 -mb-3" @submit.prevent="handleSubmit">
            <input
                ref="inputRef"
                v-model="newTitle"
                type="text"
                class="bg-[#30302e] border border-[#4a4a46] hover:border-[#65645f] transition-outline placeholder:text-[#888888] focus:outline-offset-2 focus:outline-solid focus:outline-2 focus:outline-[#74abe2b3] disabled:cursor-not-allowed disabled:opacity-50 h-6 px-3 py-2 m-1 rounded-xl mt-3 text-[#d4d4d4]"
                placeholder="Enter new title"
                data-testid="rename-input"
            />
        </form>

        <!-- Custom Footer Buttons -->
        <template #footer>
            <button type="button" class="inline-flex items-center justify-center relative shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 font-medium border border-[#5e5d58] transition duration-100 h-9 px-4 py-2 rounded-lg min-w-20 active:scale-[0.985] whitespace-nowrap bg-transparent hover:bg-black text-[#d4d4d4]" @click="handleCancel">
                {{ t("common.cancel") }}
            </button>
            <button
                type="button"
                class="inline-flex items-center justify-center relative shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 font-medium transition-transform ease-[cubic-bezier(0.165,0.85,0.45,1)] duration-150 hover:scale-y-[1.015] hover:scale-x-[1.005] h-9 px-4 py-2 rounded-lg min-w-20 active:scale-[0.985] whitespace-nowrap bg-[#74abe2b3] hover:bg-[#83b6e9b3] text-[#1e1e1e]"
                :disabled="!newTitle.trim()"
                data-testid="rename-submit"
                @click="handleSubmit"
            >
                {{ t("common.save") }}
            </button>
        </template>
    </BaseModal>
</template>

<script setup lang="ts">
import { ref, watch, nextTick } from "vue"
import BaseModal from "@/components/ui/BaseModal.vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const props = defineProps<{
    isOpen: boolean
    currentTitle: string
}>()

const emit = defineEmits<{
    close: []
    confirm: [title: string]
}>()

const inputRef = ref<HTMLInputElement>()
const newTitle = ref("")

watch(
    () => props.isOpen,
    (open) => {
        if (open) {
            newTitle.value = props.currentTitle
            nextTick(() => {
                inputRef.value?.focus()
                inputRef.value?.select()
            })
        }
    }
)

const handleSubmit = () => {
    if (newTitle.value.trim()) {
        emit("confirm", newTitle.value.trim())
    }
}

const handleCancel = () => {
    emit("close")
}
</script>
