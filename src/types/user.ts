/**
 * 用户相关类型定义
 */

export interface UserInfo {
    id: number
    username: string
    avatar_url: string
    cover?: {
        custom_url?: string
        url?: string
    }
    country_code: string
    country?: {
        name: string
    }
    team?: {
        id: number
        name: string
        flag_url: string
    }
    is_supporter: boolean
    is_online: boolean
    groups?: Array<{
        id: number
        identifier: string
        name: string
        short_name: string
        colour: string
    }>
}

export interface FriendRelation {
    target_id: number
    relation_type: string
    mutual: boolean
}

export interface UserWithFriends extends UserInfo {
    friends?: FriendRelation[]
}

export interface UserApiResponse {
    users: UserInfo[]
}
