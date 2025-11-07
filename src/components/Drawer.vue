<template>
    <Transition name="drawer-overlay">
        <div v-if="isOpen" class="fixed inset-0 bg-black/70 bg-opacity-50 z-40" @click="$emit('close')"></div>
    </Transition>

    <Transition name="drawer">
        <div v-if="isOpen" class="fixed left-0 top-0 h-full w-80 bg-[#1f1e1d] border-r border-[#3c3c3c] z-50 flex flex-col font-[anthropicSans]">
            <!-- Header -->
            <div class="flex items-center justify-between px-3 py-2 border-b border-[#3c3c3c]">
                <button
                    class="inline-flex items-center justify-center relative shrink-0 can-focus select-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none disabled:drop-shadow-none border-transparent transition font-base duration-300 ease-[cubic-bezier(0.165,0.85,0.45,1)] h-8 w-8 rounded-md active:scale-95 group aria-expanded:bg-transparent aria-expanded:hover:bg-[#141413] text-[#8e8d86]"
                    type="button"
                    data-testid="pin-sidebar-toggle"
                    aria-label="Sidebar"
                    aria-expanded="true"
                    aria-haspopup="menu"
                    data-state="instant-open"
                    aria-describedby="radix-_r_1_"
                    @click="$emit('close')"
                >
                    <div class="relative">
                        <div class="flex items-center justify-center group-hover:scale-80 transition scale-100 group-hover:opacity-0 text-text-300" style="width: 20px; height: 20px">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0 group-hover:scale-80 transition scale-100 group-hover:opacity-0 text-text-300" aria-hidden="true">
                                <path d="M16.5 4C17.3284 4 18 4.67157 18 5.5V14.5C18 15.3284 17.3284 16 16.5 16H3.5C2.67157 16 2 15.3284 2 14.5V5.5C2 4.67157 2.67157 4 3.5 4H16.5ZM7 15H16.5C16.7761 15 17 14.7761 17 14.5V5.5C17 5.22386 16.7761 5 16.5 5H7V15ZM3.5 5C3.22386 5 3 5.22386 3 5.5V14.5C3 14.7761 3.22386 15 3.5 15H6V5H3.5Z"></path>
                            </svg>
                        </div>
                        <div class="flex items-center justify-center opacity-0 scale-75 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-text-200" style="width: 20px; height: 20px">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0 opacity-0 scale-75 absolute inset-0 group-hover:scale-100 group-hover:opacity-100 transition-all text-text-200" aria-hidden="true">
                                <path
                                    d="M3.5 3C3.77614 3 4 3.22386 4 3.5V16.5L3.99023 16.6006C3.94371 16.8286 3.74171 17 3.5 17C3.25829 17 3.05629 16.8286 3.00977 16.6006L3 16.5V3.5C3 3.22386 3.22386 3 3.5 3ZM11.2471 5.06836C11.4476 4.95058 11.7104 4.98547 11.8721 5.16504C12.0338 5.34471 12.0407 5.60979 11.9023 5.79688L11.835 5.87207L7.80371 9.5H16.5C16.7761 9.5 17 9.72386 17 10C17 10.2761 16.7761 10.5 16.5 10.5H7.80371L11.835 14.1279C12.0402 14.3127 12.0568 14.6297 11.8721 14.835C11.6873 15.0402 11.3703 15.0568 11.165 14.8721L6.16504 10.3721L6.09473 10.2939C6.03333 10.2093 6 10.1063 6 10C6 9.85828 6.05972 9.72275 6.16504 9.62793L11.165 5.12793L11.2471 5.06836Z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                </button>
                <h2 class="text-lg font-semibold text-[#d4d4d4] font-[anthropicSerif] m-0">Osu! BBCode Editor</h2>
            </div>

            <button aria-label="New chat" class="mx-2 my-2 h-10 px-2 py-2 rounded-lg active:scale-[0.985] whitespace-nowrap group transition ease-in-out active:scale-100 flex justify-start bg-transparent hover:bg-[#c6613f14] active:bg-[#d9775726]" @click="handleCreateNew">
                <div class="flex flex-row items-center gap-2">
                    <div class="w-6 h-6 flex items-center justify-center group-active:scale-[0.98] group-active:shadow-none group-active:bg-[#d97757] group-hover:scale-110 group-active:rotate-6 rounded-full transition-all ease-in-out bg-[#c6613f] group-hover:shadow-md">
                        <div class="flex items-center justify-center group-hover:scale-105 transition text-white" style="width: 12px; height: 12px">
                            <svg width="16" height="16" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" class="shrink-0 group-hover:scale-105 transition text-white" aria-hidden="true">
                                <path d="M10 3C10.4142 3 10.75 3.33579 10.75 3.75V9.25H16.25C16.6642 9.25 17 9.58579 17 10C17 10.3882 16.7051 10.7075 16.3271 10.7461L16.25 10.75H10.75V16.25C10.75 16.6642 10.4142 17 10 17C9.58579 17 9.25 16.6642 9.25 16.25V10.75H3.75C3.33579 10.75 3 10.4142 3 10C3 9.58579 3.33579 9.25 3.75 9.25H9.25V3.75C9.25 3.33579 9.58579 3 10 3Z"></path>
                            </svg>
                        </div>
                    </div>
                    <div class="transition-all duration-200 text-[#d97757] font-[510] text-sm">New Content</div>
                </div>
            </button>

            <!-- Contents List -->
            <div class="flex-1 flex flex-col overflow-y-auto px-2 py-2 gap-0.5">
                <h3 aria-hidden="false" class="text-[#c2c0b6] pb-2 mt-1 text-sm select-none pl-2 sticky top-0 z-10 bg-linear-to-b from-[#1f1e1d] from-50% to-[#1f1e1d66] m-0">Recents</h3>
                <div v-if="contentsStore.contents.length === 0" class="text-center text-[#888888] py-8 text-sm">No contents yet</div>

                <div v-for="content in contentsStore.contents" :key="content.id" class="group relative mb-1">
                    <button :class="['w-full text-left px-3 h-10 rounded-lg transition-colors flex flex-row items-center gap-2', content.id === contentsStore.currentContentId ? 'bg-black' : 'bg-transparent hover:bg-[#141413]']" @click="handleSwitchContent(content.id)">
                        <span class="truncate text-sm font-medium whitespace-nowrap flex-1 group-hover:mask-[linear-gradient(to_right,#000000_78%,transparent_95%)] group-focus-within:mask-[linear-gradient(to_right,#000000_78%,transparent_95%)] mask-size-[100%_100%] mask-[linear-gradient(to_right,#000000_78%,transparent_95%)] flex flex-row gap-1 items-baseline baseline">
                            <span class="text-[#bdbbb1] group-hover:text-[#faf9f5] transition-colors">{{ content.title }}</span>
                            <span class="text-xs text-[#888888] group-hover:text-[#9e9e9e] transition-colors">{{ formatDate(content.updatedAt) }}</span>
                        </span>
                    </button>

                    <!-- Three dots menu (shown on hover) -->
                    <div v-if="contentsStore.contents.length > 1" class="absolute right-2 top-1/2 -translate-y-1/2">
                        <ContentItemMenu @rename="handleRename(content.id)" @delete="handleDelete(content.id)" />
                    </div>
                </div>
            </div>

            <!-- Theme Selector -->
            <ThemeSelector />

            <!-- Footer Info -->
            <div class="pl-4 py-1 pr-2 border-t border-[#3c3c3c] text-xs text-[#888888]">
                <div class="flex items-center gap-1">
                    <i class="fas fa-info-circle"></i>
                    <span>Stored in localStorage</span>
                    <div class="flex-1"></div>
                    <a href="https://github.com/SisypheOvO/OBEditor" target="_blank" rel="noopener noreferrer" class="no-underline flex items-center justify-center w-9 h-9 border-0 bg-transparent text-[#cccccc] rounded-lg cursor-pointer transition-all duration-200 hover:bg-[#272727] hover:text-white active:bg-[#505050] active:scale-95 text-sm" title="view on Github">
                        <i class="fab fa-github text-[18px]"></i>
                    </a>
                </div>
            </div>
        </div>
    </Transition>

    <!-- Modals -->
    <RenameModal :is-open="renameModalOpen" :current-title="currentTitle" @close="handleRenameClose" @confirm="handleRenameConfirm" />
    <DeleteModal :is-open="deleteModalOpen" @close="handleDeleteClose" @confirm="handleDeleteConfirm" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue"
import { useContentsStore } from "@/stores/contents"
import ContentItemMenu from "./Drawer/ContentItemMenu.vue"
import RenameModal from "./Drawer/RenameModal.vue"
import DeleteModal from "./Drawer/DeleteModal.vue"
import ThemeSelector from "./Drawer/ThemeSelector.vue"

defineProps<{
    isOpen: boolean
}>()

const emit = defineEmits<{
    close: []
}>()

const contentsStore = useContentsStore()

// Modal states
const renameModalOpen = ref(false)
const deleteModalOpen = ref(false)
const currentOperatingId = ref<string | null>(null)
const currentTitle = ref("")

// Auto-refresh for relative time display
const currentTime = ref(Date.now())
let timeUpdateInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
    // Update currentTime every minute to refresh relative timestamps
    timeUpdateInterval = setInterval(() => {
        currentTime.value = Date.now()
    }, 60000) // Update every 60 seconds
})

onUnmounted(() => {
    if (timeUpdateInterval) {
        clearInterval(timeUpdateInterval)
    }
})

const handleCreateNew = () => {
    contentsStore.createContent()
}

const handleSwitchContent = (id: string) => {
    contentsStore.switchToContent(id)
}

const handleRename = (id: string) => {
    const content = contentsStore.contents.find((c) => c.id === id)
    if (!content) return

    currentOperatingId.value = id
    currentTitle.value = content.title
    renameModalOpen.value = true
}

const handleRenameConfirm = (newTitle: string) => {
    if (currentOperatingId.value && newTitle.trim() !== "") {
        contentsStore.updateContent(currentOperatingId.value, { title: newTitle.trim() })
    }
    renameModalOpen.value = false
    currentOperatingId.value = null
}

const handleRenameClose = () => {
    renameModalOpen.value = false
    currentOperatingId.value = null
}

const handleDelete = (id: string) => {
    currentOperatingId.value = id
    deleteModalOpen.value = true
}

const handleDeleteConfirm = () => {
    if (currentOperatingId.value) {
        contentsStore.deleteContent(currentOperatingId.value)
    }
    deleteModalOpen.value = false
    currentOperatingId.value = null
}

const handleDeleteClose = () => {
    deleteModalOpen.value = false
    currentOperatingId.value = null
}

const formatDate = (timestamp: number): string => {
    // Use currentTime.value to trigger reactivity and auto-refresh
    const now = currentTime.value
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`

    const date = new Date(timestamp)
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric" })
}
</script>

<style scoped>
/* Drawer transition */
.drawer-enter-active,
.drawer-leave-active {
    transition: transform 0.3s ease;
}

.drawer-enter-from,
.drawer-leave-to {
    transform: translateX(-100%);
}

/* Overlay transition */
.drawer-overlay-enter-active,
.drawer-overlay-leave-active {
    transition: opacity 0.3s ease;
}

.drawer-overlay-enter-from,
.drawer-overlay-leave-to {
    opacity: 0;
}

/* Custom scrollbar */
.overflow-y-auto::-webkit-scrollbar {
    width: 8px;
}

.overflow-y-auto::-webkit-scrollbar-track {
    background: transparent;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
    background: #3c3c3c;
    border-radius: 4px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
    background: #4c4c4c;
}
</style>
