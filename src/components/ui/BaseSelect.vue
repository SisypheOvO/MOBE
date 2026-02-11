<template>
    <div class="relative">
        <label v-if="label" class="block text-xs text-[#888888] pl-1 mb-2">
            {{ label }}
        </label>

        <!-- Custom Select Container -->
        <div ref="selectContainer" class="relative" @click="toggleDropdown">
            <!-- Select Trigger -->
            <div class="px-2 py-2 bg-[#141413] border border-[#3c3c3c] rounded-lg cursor-pointer transition-all duration-200 flex items-center justify-between" :class="isOpen ? 'border-[#d97757] ring-1 ring-[#d97757]/20' : 'hover:border-[#4c4c4c]'">
                <!-- Selected Value Display -->
                <span class="text-sm truncate" :class="displayValue ? 'text-[#d4d4d4]' : 'text-[#888888]'">
                    {{ displayValue || placeholder || "Select..." }}
                </span>

                <!-- Chevron Icon -->
                <svg class="w-4 h-4 text-[#888888] transition-transform duration-200 ml-2 shrink-0" :class="{ 'rotate-180': isOpen }" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <!-- Dropdown Menu -->
            <transition enter-active-class="transition duration-200 ease-out" enter-from-class="transform scale-95 opacity-0" enter-to-class="transform scale-100 opacity-100" leave-active-class="transition duration-150 ease-in" leave-from-class="transform scale-100 opacity-100" leave-to-class="transform scale-95 opacity-0">
                <div v-show="isOpen" class="absolute z-50 w-full bg-[#1f1e1d] border border-[#3c3c3c] rounded-md shadow-xl max-h-60 overflow-y-auto custom-scrollbar" :class="placement === 'bottom' ? 'top-full mt-1.5' : 'bottom-full mb-1.5'">
                    <!-- Options List -->
                    <div class="py-1">
                        <!-- No Options -->
                        <div v-if="options.length === 0" class="px-4 py-2 text-sm text-[#888888] text-center">No options</div>

                        <!-- Options -->
                        <div v-for="option in options" :key="option.value" class="px-3 py-2 cursor-pointer transition-colors duration-150 text-sm flex flex-row items-center justify-between" :class="isOptionSelected(option) ? 'bg-black text-[#faf9f5]' : 'text-[#bdbbb1] hover:bg-[#141413] hover:text-[#faf9f5]'" @click.stop="selectOption(option)">
                            {{ option.label }}

                            <!-- Selected Checkmark -->
                            <div v-if="isOptionSelected(option)" class="ml-2 w-4 h-4">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                                </svg>
                            </div>
                        </div>
                    </div>
                </div>
            </transition>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue"

interface SelectOption {
    value: any
    label: string
}

interface SelectProps {
    modelValue?: any
    options?: SelectOption[]
    label?: string
    placeholder?: string
    placement?: "top" | "bottom"
}

interface SelectEmits {
    (e: "update:modelValue", value: any): void
    (e: "change", value: any): void
}

const props = withDefaults(defineProps<SelectProps>(), {
    options: () => [],
    placement: "top",
})

const emit = defineEmits<SelectEmits>()

const isOpen = ref(false)
const selectContainer = ref<HTMLElement>()

const displayValue = computed(() => {
    const option = props.options.find((opt) => opt.value === props.modelValue)
    return option?.label || ""
})

const toggleDropdown = () => {
    isOpen.value = !isOpen.value

    if (isOpen.value) {
        nextTick(() => {
            document.addEventListener("click", handleClickOutside)
        })
    } else {
        document.removeEventListener("click", handleClickOutside)
    }
}

const selectOption = (option: SelectOption) => {
    emit("update:modelValue", option.value)
    emit("change", option.value)
    closeDropdown()
}

const isOptionSelected = (option: SelectOption) => {
    return props.modelValue === option.value
}

const handleClickOutside = (event: Event) => {
    if (selectContainer.value && !selectContainer.value.contains(event.target as Node)) {
        closeDropdown()
    }
}

const closeDropdown = () => {
    if (isOpen.value) {
        isOpen.value = false
        document.removeEventListener("click", handleClickOutside)
    }
}

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>

<style scoped>
.custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
}
</style>
