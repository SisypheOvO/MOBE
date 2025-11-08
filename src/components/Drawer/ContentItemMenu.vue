<template>
    <div class="relative" ref="menuContainer">
        <!-- Three dots button -->
        <button class="w-6 h-6 flex items-center justify-center rounded-md bg-transparent hover:bg-[#252525] text-[#cccccc] transition-all opacity-0 group-hover:opacity-100" :class="{ 'opacity-100 bg-[#3c3c3c]': isOpen }" title="More options" @click.stop="toggleMenu">
            <i class="fas fa-ellipsis text-sm"></i>
        </button>

        <!-- Dropdown menu -->
        <Teleport to="body">
            <div v-if="isOpen" ref="dropdownRef" class="fixed z-50 bg-[#30302e]/10 backdrop-blur-xl border border-[#3c3c3c] rounded-xl min-w-32 overflow-hidden p-1.5 text-[#d4d4d4] shadow-2xl shadow-black/60 font-[anthropicSans]" :style="menuStyle" @click.stop>
                <!-- Rename option -->
                <button class="w-full font-base py-1.5 px-2 rounded-lg cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,1fr)_auto] gap-2 items-center outline-none select-none bg-transparent hover:bg-[#201f1e] text-[#bebcb2] hover:text-[#f5f4f0] transition-colors text-left" @click="handleRename">
                    <div class="flex items-center gap-2.5 w-full py-0.5 text-sm">
                        <div class="flex items-center justify-center" style="width: 20px; height: 20px">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                <path
                                    d="M9.72821 2.87934C10.0318 2.10869 10.9028 1.72933 11.6735 2.03266L14.4655 3.13226C15.236 3.43593 15.6145 4.30697 15.3112 5.07758L11.3903 15.0307C11.2954 15.2717 11.1394 15.4835 10.9391 15.6459L10.8513 15.7123L7.7077 17.8979C7.29581 18.1843 6.73463 17.9917 6.57294 17.5356L6.54657 17.4409L5.737 13.6987C5.67447 13.4092 5.69977 13.107 5.80829 12.8315L9.72821 2.87934ZM6.73798 13.1987C6.70201 13.2903 6.69385 13.3906 6.71454 13.4868L7.44501 16.8627L10.28 14.892L10.3376 14.8452C10.3909 14.7949 10.4325 14.7332 10.4597 14.6645L13.0974 7.96723L9.37567 6.50141L6.73798 13.1987ZM11.3073 2.96332C11.0504 2.86217 10.7601 2.98864 10.6589 3.24555L9.74188 5.57074L13.4636 7.03754L14.3806 4.71137C14.4817 4.45445 14.3552 4.16413 14.0983 4.06293L11.3073 2.96332Z"
                                ></path>
                            </svg>
                        </div>
                        <span class="flex-1 truncate">{{ t("drawer.renameContent") }}</span>
                    </div>
                </button>

                <!-- Separator -->
                <div class="h-0 border-t border-[#3c3c3c] m-1"></div>

                <!-- Delete option -->
                <button class="w-full font-base py-1.5 px-2 rounded-lg cursor-pointer whitespace-nowrap overflow-hidden text-ellipsis grid grid-cols-[minmax(0,1fr)_auto] gap-2 items-center outline-none select-none bg-transparent hover:bg-[#682626] transition-colors text-[#f77e7e] text-left" @click="handleDelete">
                    <div class="flex items-center gap-2.5 w-full py-0.5 text-sm">
                        <div class="flex items-center justify-center" style="width: 20px; height: 20px">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0">
                                <path
                                    d="M11.3232 1.5C11.9365 1.50011 12.4881 1.87396 12.7158 2.44336L13.3379 4H17.5L17.6006 4.00977C17.8285 4.0563 18 4.25829 18 4.5C18 4.7417 17.8285 4.94371 17.6006 4.99023L17.5 5H15.9629L15.0693 16.6152C15.0091 17.3965 14.3578 17.9999 13.5742 18H6.42578C5.6912 17.9999 5.07237 17.4697 4.94824 16.7598L4.93066 16.6152L4.03711 5H2.5C2.22387 5 2.00002 4.77613 2 4.5C2 4.22386 2.22386 4 2.5 4H6.66211L7.28418 2.44336L7.33105 2.33887C7.58152 1.82857 8.10177 1.5001 8.67676 1.5H11.3232ZM5.92773 16.5381C5.94778 16.7985 6.16464 16.9999 6.42578 17H13.5742C13.8354 16.9999 14.0522 16.7985 14.0723 16.5381L14.9609 5H5.03906L5.92773 16.5381ZM8.5 8C8.77613 8 8.99998 8.22388 9 8.5V13.5C9 13.7761 8.77614 14 8.5 14C8.22386 14 8 13.7761 8 13.5V8.5C8.00002 8.22388 8.22387 8 8.5 8ZM11.5 8C11.7761 8 12 8.22386 12 8.5V13.5C12 13.7761 11.7761 14 11.5 14C11.2239 14 11 13.7761 11 13.5V8.5C11 8.22386 11.2239 8 11.5 8ZM8.67676 2.5C8.49802 2.5001 8.33492 2.59525 8.24609 2.74609L8.21289 2.81445L7.73828 4H12.2617L11.7871 2.81445C11.7112 2.62471 11.5276 2.50011 11.3232 2.5H8.67676Z"
                                ></path>
                            </svg>
                        </div>
                        <span class="flex-1 truncate">{{ t("common.delete") }}</span>
                    </div>
                </button>
            </div>
        </Teleport>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onUnmounted, nextTick } from "vue"
import { useI18n } from "vue-i18n"

const { t } = useI18n()

const emit = defineEmits<{
    rename: []
    delete: []
}>()

const menuContainer = ref<HTMLElement>()
const dropdownRef = ref<HTMLElement>()
const isOpen = ref(false)
const buttonRect = ref<DOMRect | null>(null)

const menuStyle = computed(() => {
    if (!buttonRect.value) return {}

    const rect = buttonRect.value
    const menuWidth = 200 // Approximate menu width
    const windowWidth = window.innerWidth
    const windowHeight = window.innerHeight

    // Calculate position
    let left = rect.left
    let top = rect.bottom + 6

    // Adjust if menu goes off right edge
    if (left + menuWidth > windowWidth) {
        left = rect.right - menuWidth
    }

    // Adjust if menu goes off bottom edge
    const menuHeight = 120 // Approximate menu height
    if (top + menuHeight > windowHeight) {
        top = rect.top - menuHeight - 4
    }

    return {
        left: `${left}px`,
        top: `${top}px`,
        minWidth: `${menuWidth}px`,
    }
})

const toggleMenu = (event: Event) => {
    event.stopPropagation()
    if (!isOpen.value && menuContainer.value) {
        buttonRect.value = menuContainer.value.getBoundingClientRect()
    }
    isOpen.value = !isOpen.value

    if (isOpen.value) {
        nextTick(() => {
            document.addEventListener("click", handleClickOutside)
        })
    } else {
        document.removeEventListener("click", handleClickOutside)
    }
}

const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (menuContainer.value && !menuContainer.value.contains(target) && dropdownRef.value && !dropdownRef.value.contains(target)) {
        isOpen.value = false
        document.removeEventListener("click", handleClickOutside)
    }
}

const handleRename = () => {
    isOpen.value = false
    document.removeEventListener("click", handleClickOutside)
    emit("rename")
}

const handleDelete = () => {
    isOpen.value = false
    document.removeEventListener("click", handleClickOutside)
    emit("delete")
}

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside)
})
</script>
