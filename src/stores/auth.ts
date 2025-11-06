import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { OsynicOsuApiV2GlooClient } from "@osynicite/osynic-osuapi"
import type { OToken, User, FriendXApiVersion } from "@osynicite/osynic-osuapi"

interface StoredToken extends OToken {
    stored_at: number
}

const TOKEN_STORAGE_KEY = "obe_token"

export const useAuthStore = defineStore("auth", () => {
    // Configuration
    const clientId = ref<string>(import.meta.env.VITE_OSU_CLIENT_ID || "nil")
    const redirectUri = ref<string>(import.meta.env.VITE_OSU_REDIRECT_URI || "http://localhost:4000/callback")
    const proxyUrl = ref<string>(import.meta.env.VITE_OSU_PROXY_URL || "http://localhost:8000/")

    // State
    const client = ref<OsynicOsuApiV2GlooClient | null>(null)
    const userData = ref<User | null>(null)
    const isAuthenticated = ref(false)
    const friendsList = ref<FriendXApiVersion[]>([])

    // Computed
    const authUrl = computed(() => {
        if (!clientId.value || !redirectUri.value) return ""
        const scopes = ["public", "identify", "friends.read"].join(" ")
        return `https://osu.ppy.sh/oauth/authorize?client_id=${clientId.value}&redirect_uri=${encodeURIComponent(redirectUri.value)}&response_type=code&scope=${encodeURIComponent(scopes)}`
    })

    const checkEnvConfig = () => {
        if (!import.meta.env.VITE_OSU_CLIENT_ID || import.meta.env.VITE_OSU_CLIENT_ID === "nil") {
            console.warn('⚠️ please config your OAuth client_id! Copy `.env.development.example` and input your own configuration.')
            return false
        }
        return true
    }

    // Token management
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

    // Client management
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

    /**
     * 加载用户的好友列表
     */
    const loadFriendsList = async () => {
        if (!client.value) {
            console.error("Client not initialized")
            return
        }

        try {
            const data: FriendXApiVersion[] = await client.value.getFriendsXApiVersion()
            friendsList.value = data || []
        } catch (error) {
            console.error("Failed to fetch friends list:", error)
        }
    }

    /**
     * 检查用户的好友关系
     * @param userId - 要检查的用户 ID
     * @returns 好友关系状态
     */
    const getFriendshipStatus = (userId: number): "mutual" | "friend" | "none" => {
        const friend = friendsList.value.find((f) => f.target_id === userId)
        if (!friend) return "none"
        return friend.mutual ? "mutual" : "friend"
    }

    // Authentication actions
    const login = () => {
        if (!checkEnvConfig()) {
            alert('请先配置 OAuth client_id')
            return
        }
        if (authUrl.value) {
            globalThis.open(authUrl.value, "_self")
        }
    }

    const logout = async () => {
        if (client.value) {
            try {
                await client.value.revokeCurrentToken()
            } catch (e) {
                console.error("Failed to revoke token:", e)
            }
        }
        clearStoredToken()
        isAuthenticated.value = false
        userData.value = null
        client.value = null
        friendsList.value = []
        globalThis.location.reload()
    }

    const initializeAuth = async () => {
        // Check for OAuth callback
        const callbackToken = parseOAuthCallback()
        if (callbackToken) {
            globalThis.location.hash = ""
            saveTokenToStorage(callbackToken)
            initializeClient(callbackToken)
            isAuthenticated.value = true
            await fetchUserData()
            await loadFriendsList()
            return
        }

        // Check for stored token
        const storedToken = loadTokenFromStorage()
        if (storedToken) {
            initializeClient(storedToken)
            isAuthenticated.value = true
            await fetchUserData()
            await loadFriendsList()
        }
    }

    return {
        // State
        client,
        userData,
        isAuthenticated,
        friendsList,
        authUrl,

        // Actions
        login,
        logout,
        initializeAuth,
        loadFriendsList,
        getFriendshipStatus,
    }
})
