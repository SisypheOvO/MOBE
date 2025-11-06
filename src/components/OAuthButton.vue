<template>
    <div data-auth-button-container class="relative">
        <!-- Button -->
        <button @click="handleAuthClick" class="relative w-10 h-10 rounded-md overflow-hidden border outline-0 border-[#3c3c3c] hover:outline hover:outline-[#ff66aa] transition-all hover:shadow-lg hover:shadow-[#ff66aa]/20 hover:cursor-pointer flex items-center justify-center bg-[#2e3038]">
            <img v-if="isAuthenticated && userData" :src="userData.avatar_url" :alt="userData.username" class="w-full h-full object-cover" />
            <img v-else :src="guestAvatarUrl" alt="Guest" class="w-full h-full object-cover" />
        </button>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-show="showDropdown && isAuthenticated" class="absolute right-0 mt-4 w-56 bg-[#22242a]/95 backdrop-blur-md outline outline-[hsla(var(--hsl-b5),0.9)] rounded-lg shadow-2xl shadow-black/60 overflow-hidden z-50 object-cover" :style="userData?.cover?.custom_url ? { backgroundImage: 'url(' + userData?.cover?.custom_url + ')', backgroundPosition: 'center center', backgroundSize: 'cover' } : {}">
                <!-- User Info Section -->
                <div class="px-5 py-4 bg-[hsla(var(--hsl-b5),0.7)]">
                    <div class="space-y-1">
                        <p class="text-base font-semibold text-[#cccccc] truncate">
                            {{ userData?.username }}
                        </p>
                        <p class="text-sm text-[#bcbcbc]">
                            {{ userData?.country?.name || "Unknown" }}
                        </p>
                        <div v-if="userData?.statistics_rulesets?.osu" class="pt-2 space-y-1.5">
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#aeaeae]">全球排名</span>
                                <span class="font-medium text-[#ff66aa]"> #{{ formatNumber(getRuleset(userData)?.global_rank) }} </span>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#aeaeae]">表现值</span>
                                <span class="font-medium text-[#ff66aa]"> {{ formatNumber(getRuleset(userData)?.pp) }} PP </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-px bg-linear-to-r from-transparent bg-[hsla(var(--hsl-b5),0.8)]"></div>

                <!-- Logout Button -->
                <div class="p-2 bg-[hsla(var(--hsl-b5),0.7)] flex flex-row gap-2">
                    <button @click="handleImportBBCode" class="flex-1 h-8 w-16 px-4 text-sm font-medium text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.8)] hover:text-black rounded-full transition-all duration-250 ease-out">导入me!</button>
                    <button @click="handleLogout" class="h-8 w-16 px-4 text-sm font-medium text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.3)] hover:text-[#b7bcc4] rounded-full transition-all duration-250 ease-out">登出</button>
                </div>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, inject } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import type { User } from "@osynicite/osynic-osuapi"

// Use auth store
const authStore = useAuthStore()
const { isAuthenticated, userData } = storeToRefs(authStore)

const userBBCodeImport = inject("userBBCodeImport") as () => void

const handleImportBBCode = () => {
    userBBCodeImport()
}

// Local UI state
const showDropdown = ref(false)

// Computed
const guestAvatarUrl = computed(() => "/images/guest.png")

const handleAuthClick = () => {
    if (isAuthenticated.value) {
        showDropdown.value = !showDropdown.value

        if (showDropdown.value) {
            nextTick(() => {
                document.addEventListener('click', handleClickOutside)
            })
        } else {
            document.removeEventListener('click', handleClickOutside)
        }
    } else {
        authStore.login()
    }
}

const handleLogout = () => {
    showDropdown.value = false
    document.removeEventListener('click', handleClickOutside)
    authStore.logout()
}

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-auth-button-container]")) {
        showDropdown.value = false
        document.removeEventListener('click', handleClickOutside)
    }
}

onMounted(() => {
    authStore.initializeAuth()
})

type RulesetKey = keyof NonNullable<User['statistics_rulesets']>

const getRuleset = (ud: User | null) => {
    if (!ud || !ud.statistics_rulesets) return undefined
    const key = (ud.playmode as RulesetKey) || "osu"
    return ud.statistics_rulesets[key]
}

const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return "N/A"
    return num.toLocaleString()
}
</script>
