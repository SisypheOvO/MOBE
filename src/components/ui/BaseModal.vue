<template>
    <Teleport to="body">
        <Transition name="modal">
            <div v-if="isOpen" class="fixed z-100 inset-0 grid items-center justify-items-center bg-black/50 backdrop-brightness-75 overflow-y-auto md:p-10 p-4" @click.self="handleBackgroundClick">
                <div role="dialog" :class="['flex flex-col focus:outline-none relative text-[#d4d4d4] text-left shadow-xl border border-[#41413e] rounded-2xl md:p-6 p-4 align-middle min-w-0 w-full bg-[#262624] font-[anthropicSans]', modalClass]" @click.stop>
                    <div class="min-h-full flex flex-col">
                        <!-- Header -->
                        <div class="flex items-center gap-4 justify-between">
                            <h2 class="text-xl font-[560] text-[#faf9f5] flex w-full min-w-0 items-center leading-6 wrap-break-words m-0">
                                <slot name="title">{{ title }}</slot>
                            </h2>
                        </div>

                        <!-- Content -->
                        <div class="mt-3 mb-4"><slot></slot></div>

                        <!-- Footer (Buttons) -->
                        <div class="mt-4 flex flex-col gap-2 sm:flex-row justify-end">
                            <slot name="footer">
                                <button
                                    type="button"
                                    class="inline-flex items-center justify-center relative shrink-0 select-none disabled:pointer-events-none disabled:opacity-50 font-medium border border-[#3c3c3c] transition duration-100 h-9 px-4 py-2 rounded-lg min-w-20 active:scale-[0.985] whitespace-nowrap bg-transparent hover:bg-[#2d2d2d] text-[#d4d4d4]"
                                    @click="$emit('close')"
                                >
                                    {{ t("common.cancel") }}
                                </button>
                            </slot>
                        </div>
                    </div>
                </div>
            </div>
        </Transition>
    </Teleport>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

const { t } = useI18n();

defineProps<{
    isOpen: boolean
    title?: string
    modalClass?: string
}>()

const emit = defineEmits<{
    close: []
}>()

const handleBackgroundClick = () => {
    emit("close")
}
</script>

<style scoped>
.modal-enter-active {
    animation: fade 250ms ease-out forwards;
}

.modal-leave-active {
    animation: fade 125ms ease-in reverse forwards;
}

.modal-enter-active > div {
    animation: zoom 250ms ease-out forwards;
}

.modal-leave-active > div {
    animation: zoom 125ms ease-in reverse forwards;
}

@keyframes fade {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes zoom {
    from {
        opacity: 0;
        transform: scale(0.95);
    }
    to {
        opacity: 1;
        transform: scale(1);
    }
}
</style>
