/**
 * 用户信息管理
 */

import { ref, type Ref, onMounted } from "vue"
import { apiClient, ApiError } from "@/utils/apiClient"
import { API_ENDPOINTS } from "@/constants/bbcode"
import type { UserInfo, FriendRelation } from "@/types/user"

export const useUserInfo = () => {
    const currentUserId: Ref<string | null> = ref(null)
    const currentUserInfo: Ref<UserInfo | null> = ref(null)
    const friendsList: Ref<FriendRelation[]> = ref([])
    const userInput = ref("")

    /**
     * 从 localStorage 加载用户信息
     */
    const loadUserFromStorage = async () => {
        const savedUserInfo = localStorage.getItem("osu_current_user_info")
        if (!savedUserInfo) return

        try {
            const userInfo = JSON.parse(savedUserInfo)
            currentUserInfo.value = userInfo
            currentUserId.value = userInfo.id.toString()

            if (currentUserId.value) {
                await fetchFriendsList(currentUserId.value)
            }
        } catch (error) {
            console.error("Failed to parse saved user info:", error)
            localStorage.removeItem("osu_current_user_info")
        }
    }

    /**
     * 处理用户输入并获取用户信息
     */
    const handleUserInput = async () => {
        if (!userInput.value.trim()) return

        try {
            const userData = await apiClient.get<UserInfo>(`${API_ENDPOINTS.CURRENT_USER}?userId=${userInput.value}`)

            currentUserInfo.value = userData
            currentUserId.value = userData.id.toString()

            // 保存到 localStorage
            localStorage.setItem("osu_current_user_info", JSON.stringify(userData))
            localStorage.setItem("osu_current_user_id", userData.id.toString())

            // 获取好友列表
            await fetchFriendsList(userData.id.toString())

            userInput.value = ""
        } catch (error) {
            if (error instanceof ApiError) {
                alert("无法获取用户信息，请检查用户 ID 是否正确")
            } else {
                alert("获取用户信息失败，请稍后重试")
            }
            console.error("Failed to fetch user info:", error)
        }
    }

    /**
     * 清除当前用户信息
     */
    const clearCurrentUser = () => {
        currentUserInfo.value = null
        currentUserId.value = null
        friendsList.value = []
        localStorage.removeItem("osu_current_user_info")
        localStorage.removeItem("osu_current_user_id")
    }

    /**
     * 获取用户的好友列表
     * @param userId - 用户 ID
     */
    const fetchFriendsList = async (userId: string) => {
        try {
            const data = await apiClient.get<any>(`${API_ENDPOINTS.CURRENT_USER}?userId=${userId}`)
            friendsList.value = data.friends || []
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

    // 组件挂载时加载用户信息
    onMounted(loadUserFromStorage)

    return {
        currentUserId,
        currentUserInfo,
        friendsList,
        userInput,
        handleUserInput,
        clearCurrentUser,
        fetchFriendsList,
        getFriendshipStatus,
    }
}
