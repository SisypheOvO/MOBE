<template>
    <div data-auth-button-container class="relative">
        <!-- Button -->
        <button @click="handleAuthClick" class="relative w-10 h-10 rounded-md overflow-hidden border outline-0 border-[#3c3c3c] hover:outline hover:outline-[#ff66aa] transition-all hover:shadow-md hover:shadow-[#ff66aa]/20 hover:cursor-pointer flex items-center justify-center bg-[#2e3038]">
            <!-- Loading spinner - shown when waiting for userData or when image is loading -->
            <div v-if="shouldShowLoadingOnly || !avatarLoaded" class="absolute inset-0 flex items-center justify-center bg-[#2e3038]">
                <div class="spinner"></div>
            </div>

            <!-- User avatar - shown only when authenticated and userData is loaded -->
            <img v-if="shouldShowUserAvatar" :src="userData?.avatar_url" :alt="userData?.username" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" :class="avatarLoaded ? 'opacity-100' : 'opacity-0'" @load="onAvatarLoad" @error="onAvatarError" />

            <!-- Guest avatar - shown when not authenticated or userData failed to load -->
            <img v-if="shouldShowGuestAvatar" :src="guestAvatarUrl" alt="Guest" class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300" :class="avatarLoaded ? 'opacity-100' : 'opacity-0'" @load="onAvatarLoad" @error="onAvatarError" />
        </button>

        <!-- Dropdown Menu -->
        <transition enter-active-class="transition duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-show="showDropdown && isAuthenticated" class="absolute right-0 mt-4 w-fit min-w-[280px] bg-[#22242a]/95 backdrop-blur-md outline outline-[hsla(var(--hsl-b5),0.9)] rounded-lg shadow-2xl shadow-black/60 overflow-hidden z-50">
                <!-- Error State -->
                <div v-if="userDataLoadFailed" class="relative px-5 py-6 bg-[hsla(var(--hsl-b5),0.7)]">
                    <div class="flex flex-col items-center space-y-3">
                        <!-- Error Icon -->
                        <div class="w-12 h-12 rounded-full bg-[#ff6b6b]/20 flex items-center justify-center">
                            <svg class="w-6 h-6 text-[#ff6b6b]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>

                        <!-- Error Title -->
                        <p class="text-base font-semibold text-[#ff6b6b] text-center">
                            {{ t("oauthDropdown.loadError") }}
                        </p>

                        <!-- Error Description -->
                        <p class="text-xs text-[#bcbcbc] text-center leading-relaxed">
                            {{ t("oauthDropdown.loadErrorDesc") }}
                        </p>

                        <!-- Retry Button -->
                        <button @click="handleRetry" :disabled="isLoadingUserData" class="w-full h-9 px-4 text-sm font-medium text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.8)] hover:text-black disabled:opacity-50 disabled:cursor-not-allowed rounded-full transition-all duration-250 ease-out flex items-center justify-center gap-2">
                            <template v-if="isLoadingUserData">
                                <svg class="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            </template>
                            <template v-else>
                                {{ t("oauthDropdown.retry") }}
                            </template>
                        </button>
                    </div>

                    <!-- Divider -->
                    <div class="h-px bg-[hsla(var(--hsl-b5),0.8)] my-1"></div>

                    <!-- Logout Button -->
                    <button @click="handleLogout" class="w-full h-8 px-4 text-sm font-medium text-center whitespace-nowrap text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.3)] hover:text-[#b7bcc4] rounded-full transition-all duration-250 ease-out">{{ t("oauthDropdown.signOut") }}</button>
                </div>

                <!-- Normal State -->
                <template v-else-if="!isLoadingUserData">
                    <transition name="fade-slow">
                        <div
                            v-if="userData?.cover?.custom_url && coverLoaded"
                            class="absolute inset-0"
                            :style="{
                                backgroundImage: `url(${userData.cover.custom_url})`,
                                backgroundPosition: 'center center',
                                backgroundSize: 'cover',
                            }"
                        ></div>
                    </transition>

                    <div v-if="userData?.cover?.custom_url && !coverLoaded" class="absolute inset-0 bg-[#22242a] animate-pulse"></div>

                    <!-- User Info Section -->
                    <div class="relative px-5 py-4 bg-[hsla(var(--hsl-b5),0.7)]">
                        <div class="space-y-1">
                            <p class="text-base font-semibold text-[#cccccc] truncate">
                                {{ userData?.username }}
                            </p>
                            <p class="text-sm text-[#bcbcbc]">
                                {{ userData?.country?.name || "Unknown" }}
                            </p>
                            <div v-if="userData?.statistics_rulesets?.osu" class="pt-2 space-y-1.5">
                                <div class="flex justify-between items-center text-xs">
                                    <span class="text-[#aeaeae]">{{ t("oauthDropdown.globalRanking") }}</span>
                                    <span class="font-medium text-[#ff66aa]"> #{{ formatNumber(getRuleset(userData)?.global_rank) }} </span>
                                </div>
                                <div class="flex justify-between items-center text-xs">
                                    <span class="text-[#aeaeae]">{{ t("oauthDropdown.pp") }}</span>
                                    <span class="font-medium text-[#ff66aa]"> {{ formatNumber(getRuleset(userData)?.pp) }} PP </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Divider -->
                    <div class="relative h-px bg-linear-to-r from-transparent bg-[hsla(var(--hsl-b5),0.8)]"></div>

                    <!-- Action Buttons -->
                    <div class="relative p-2 bg-[hsla(var(--hsl-b5),0.7)] flex flex-row gap-2">
                        <button @click="handleImportBBCode" class="flex-1 h-8 w-fit px-4 text-sm font-medium text-center whitespace-nowrap text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.8)] hover:text-black rounded-full transition-all duration-250 ease-out">{{ t("oauthDropdown.importProfile") }}</button>
                        <button @click="handleLogout" class="h-8 w-fit px-4 text-sm font-medium text-center whitespace-nowrap text-[#1a1b1e] bg-[hsla(var(--hsl-l1),0.5)] hover:bg-[hsla(var(--hsl-l1),0.3)] hover:text-[#b7bcc4] rounded-full transition-all duration-250 ease-out">{{ t("oauthDropdown.signOut") }}</button>
                    </div>
                </template>
            </div>
        </transition>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick, watch } from "vue"
import { storeToRefs } from "pinia"
import { useAuthStore } from "@/stores/auth"
import type { User } from "@osynicite/osynic-osuapi"
import { useContentsStore } from "@/stores/contents"
import { useI18n } from "vue-i18n"

// Use auth store
const authStore = useAuthStore()
const { isAuthenticated, userData, isLoadingUserData, userDataLoadFailed } = storeToRefs(authStore)
const contentsStore = useContentsStore()
const { t } = useI18n()

const avatarLoaded = ref(false)
const coverLoaded = ref(false)

// Avatar display logic based on state machine
const shouldShowLoadingOnly = computed(() => {
    return isAuthenticated.value && isLoadingUserData.value
})

const shouldShowUserAvatar = computed(() => {
    return isAuthenticated.value && !isLoadingUserData.value && userData.value !== null
})

const shouldShowGuestAvatar = computed(() => {
    return !isAuthenticated.value || (isAuthenticated.value && !isLoadingUserData.value && (userDataLoadFailed.value || userData.value === null))
})

const handleImportBBCode = () => {
    userBBCodeImport()
}

const userBBCodeImport = () => {
    if (!isAuthenticated.value || !userData.value) return
    if (!authStore.userData?.page) return
    const username = authStore.userData.username
    const bbcodeContent = authStore.userData.page.raw
    contentsStore.importFromOAuth(`${username} ${t("drawer.profile")}`, bbcodeContent)
}

const showDropdown = ref(false)
const guestAvatarUrl = computed(() => "/images/guest.png")

const preloadCoverImage = (url: string) => {
    coverLoaded.value = false
    const img = new Image()
    img.onload = () => {
        coverLoaded.value = true
    }
    img.onerror = () => {
        coverLoaded.value = true
    }
    img.src = url
}

watch(
    () => userData.value?.cover?.custom_url,
    (newUrl) => {
        if (newUrl) {
            preloadCoverImage(newUrl)
        }
    },
    { immediate: true }
)

// Reset avatar loaded state when the avatar source changes
watch(
    () => {
        if (shouldShowUserAvatar.value) {
            return userData.value?.avatar_url
        } else if (shouldShowGuestAvatar.value) {
            return guestAvatarUrl.value
        }
        return null
    },
    () => {
        avatarLoaded.value = false
    }
)

const onAvatarLoad = () => {
    avatarLoaded.value = true
}

const onAvatarError = () => {
    // Even on error, mark as loaded to hide spinner
    avatarLoaded.value = true
}

const handleAuthClick = () => {
    if (isAuthenticated.value) {
        showDropdown.value = !showDropdown.value

        if (showDropdown.value) {
            nextTick(() => {
                document.addEventListener("click", handleClickOutside)
            })
        } else {
            document.removeEventListener("click", handleClickOutside)
        }
    } else {
        authStore.login()
    }
}

const handleLogout = () => {
    showDropdown.value = false
    document.removeEventListener("click", handleClickOutside)
    authStore.logout()
}

const handleRetry = async () => {
    await authStore.retryFetchUserData()
}

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-auth-button-container]")) {
        showDropdown.value = false
        document.removeEventListener("click", handleClickOutside)
    }
}

onMounted(() => {
    authStore.initializeAuth()
})

type RulesetKey = keyof NonNullable<User["statistics_rulesets"]>

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

<style scoped>
.spinner {
    width: 20px;
    height: 20px;
    border: 2px solid rgba(255, 102, 170, 0.2);
    border-top-color: #ff66aa;
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}

.fade-enter-active {
    transition: opacity 0.3s ease-in-out;
}

.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-slow-enter-active {
    transition: opacity 0.5s ease-in-out;
}

.fade-slow-enter-from {
    opacity: 0;
}

.fade-slow-enter-to {
    opacity: 1;
}

@keyframes fade-in {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

.animate-fade-in {
    animation: fade-in 0.5s ease-in-out;
}
</style>
