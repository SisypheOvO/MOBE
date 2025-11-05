<script setup lang="ts">
import { ref, computed, onMounted } from "vue"
import { OsynicOsuApiV2GlooClient } from "@osynicite/osynic-osuapi"
import type { OToken, User } from "@osynicite/osynic-osuapi"

// Client configuration
const clientId = ref<string>("YOUR_CLIENT_ID") // TODO To register your own app and get a client ID at https://osu.ppy.sh/home/account/edit
const redirectUri = ref<string>("YOUR_REDIRECT_URI") // TODO Deploy your own OAuth server, you can fork a https://github.com/Islatri/deno_osynic_oauth then host it on deno.dev
const proxyUrl = ref<string>("YOUR_PROXY_URL") // TODO Deploy your own CORS server, you can fork a https://github.com/Islatri/deno_osynic_cors then host it on deno.dev
const TOKEN_STORAGE_KEY = "obe_token"

const authUrl = computed(() => {
    if (!clientId.value || !redirectUri.value) return ""
    const scopes = ["public", "identify", "friends.read"].join(" ")
    return `https://osu.ppy.sh/oauth/authorize?client_id=${clientId.value}&redirect_uri=${encodeURIComponent(redirectUri.value)}&response_type=code&scope=${encodeURIComponent(scopes)}`
})

// State
const isAuthenticated = ref(false)
const userData = ref<User | null>(null)
const showDropdown = ref(false)
const client = ref<OsynicOsuApiV2GlooClient | null>(null)

// Computed
const guestAvatarUrl = computed(() => "/images/guest.png")

interface StoredToken extends OToken {
    stored_at: number
}

const saveTokenToStorage = (tokenData: OToken) => {
    const storedToken: StoredToken = {
        ...tokenData,
        stored_at: Date.now(),
    }
    localStorage.setItem(TOKEN_STORAGE_KEY, JSON.stringify(storedToken))
}

const loadTokenFromStorage = (): OToken | null => {
    const stored = localStorage.getItem(TOKEN_STORAGE_KEY)
    if (!stored) return null

    try {
        const storedToken: StoredToken = JSON.parse(stored)
        const now = Date.now()
        const elapsed = Math.floor((now - storedToken.stored_at) / 1000)

        if (elapsed >= storedToken.expires_in) {
            localStorage.removeItem(TOKEN_STORAGE_KEY)
            return null
        }

        return {
            access_token: storedToken.access_token,
            refresh_token: storedToken.refresh_token,
            expires_in: storedToken.expires_in - elapsed,
            token_type: storedToken.token_type,
        }
    } catch (e) {
        console.error("Failed to parse stored token:", e)
        localStorage.removeItem(TOKEN_STORAGE_KEY)
        return null
    }
}

const clearStoredToken = () => {
    localStorage.removeItem(TOKEN_STORAGE_KEY)
}

const parseOAuthCallback = (): OToken | null => {
    const hash = globalThis.location.hash.substring(1)
    if (!hash) return null

    const params = new URLSearchParams(hash)
    const accessToken = params.get("access_token")
    const refreshToken = params.get("refresh_token")
    const expiresIn = params.get("expires_in")
    const tokenType = params.get("token_type")

    if (!accessToken || !expiresIn || !tokenType) {
        return null
    }

    return {
        access_token: accessToken,
        refresh_token: refreshToken || undefined,
        expires_in: Number.parseInt(expiresIn, 10),
        token_type: tokenType,
    }
}

const initializeClient = (tokenData: OToken) => {
    const newClient = new OsynicOsuApiV2GlooClient(tokenData)
    newClient.setProxyUrl(proxyUrl.value)
    client.value = newClient
    return newClient
}

const fetchUserData = async () => {
    if (!client.value) return

    try {
        const data = await client.value.getOwnData()
        userData.value = data
    } catch (e) {
        console.error("Failed to fetch user data:", e)
    }
}

const handleAuthClick = () => {
    if (isAuthenticated.value) {
        showDropdown.value = !showDropdown.value
    } else {
        globalThis.open(authUrl.value, "_blank")
    }
}

const handleLogout = () => {
    showDropdown.value = false
    if (client.value) {
        client.value.revokeCurrentToken().catch((e) => {
            console.error("Failed to revoke token:", e)
        })
    }
    clearStoredToken()
    isAuthenticated.value = false
    userData.value = null
    client.value = null
    globalThis.location.reload()
}

const handleClickOutside = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (!target.closest("[data-auth-button-container]")) {
        showDropdown.value = false
    }
}

onMounted(() => {
    document.addEventListener("click", handleClickOutside)

    const callbackToken = parseOAuthCallback()
    if (callbackToken) {
        globalThis.location.hash = ""
        saveTokenToStorage(callbackToken)
        initializeClient(callbackToken)
        isAuthenticated.value = true
        fetchUserData()
        return
    }

    const storedToken = loadTokenFromStorage()
    if (storedToken) {
        initializeClient(storedToken)
        isAuthenticated.value = true
        fetchUserData()
    }

    return () => {
        document.removeEventListener("click", handleClickOutside)
    }
})

const formatNumber = (num: number | null | undefined): string => {
    if (num === null || num === undefined) return "N/A"
    return num.toLocaleString()
}
</script>

<template>
    <div data-auth-button-container class="relative">
        <!-- Button -->
        <button @click="handleAuthClick" class="relative w-10 h-10 p-0 rounded-lg overflow-hidden border-3 border-[#3c3c3c] hover:border-[#ff66aa] transition-all hover:shadow-lg hover:shadow-[#ff66aa]/20 hover:scale-110 hover:cursor-pointer flex items-center justify-center bg-[#2e3038]">
            <img v-if="isAuthenticated && userData" :src="userData.avatar_url" :alt="userData.username" class="w-full h-full object-cover" />
            <img v-else :src="guestAvatarUrl" alt="Guest" class="w-full h-full object-cover" />
        </button>

        <!-- Dropdown Menu (优化版本) -->
        <transition enter-active-class="transition duration-100" enter-from-class="opacity-0 scale-95" enter-to-class="opacity-100 scale-100" leave-active-class="transition duration-100" leave-from-class="opacity-100 scale-100" leave-to-class="opacity-0 scale-95">
            <div v-show="showDropdown && isAuthenticated" class="absolute right-0 mt-3 w-56 bg-[#22242a]/95 backdrop-blur-md border border-[#3c3c3c] rounded-sm shadow-2xl shadow-black/40 overflow-hidden z-50">
                <!-- User Info Section -->
                <div class="px-5 py-4 bg-linear-to-br from-[#2e3038] to-[#1a1b1e]/50">
                    <div class="space-y-1">
                        <p class="text-base font-semibold text-[#cccccc] truncate">
                            {{ userData?.username }}
                        </p>
                        <p class="text-sm text-[#999999]">
                            {{ userData?.country?.name || "Unknown" }}
                        </p>
                        <div v-if="userData?.statistics_rulesets?.osu" class="pt-2 space-y-1.5">
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#666666]">全球排名</span>
                                <span class="font-medium text-[#ff66aa]"> #{{ formatNumber(userData.statistics_rulesets.osu.global_rank) }} </span>
                            </div>
                            <div class="flex justify-between items-center text-xs">
                                <span class="text-[#666666]">表现值</span>
                                <span class="font-medium text-[#ff66aa]"> {{ formatNumber(userData.statistics_rulesets.osu.pp) }} PP </span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Divider -->
                <div class="h-px bg-linear-to-r from-transparent via-[#3c3c3c]/40 to-transparent"></div>

                <!-- Logout Button -->
                <div class="p-2">
                    <button @click="handleLogout" class="w-full px-4 py-2.5 text-sm font-medium text-[#999999] bg-[#2e3038]/40 hover:bg-[#ff66aa] hover:text-[#1a1b1e] rounded-lg transition-all duration-150 ease-out">登出</button>
                </div>
            </div>
        </transition>
    </div>
</template>
