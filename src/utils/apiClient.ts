/**
 * API 客户端工具
 */

const API_BASE = "http://localhost:3000"

export class ApiError extends Error {
    constructor(
        public status: number,
        message: string
    ) {
        super(message)
        this.name = "ApiError"
    }
}

/**
 * API 客户端
 */
export const apiClient = {
    /**
     * GET 请求
     * @param endpoint - API 端点
     * @returns 响应数据
     */
    async get<T>(endpoint: string): Promise<T> {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`)

            if (!response.ok) {
                throw new ApiError(response.status, `API 请求失败: ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new Error(`网络请求失败: ${error}`)
        }
    },

    /**
     * POST 请求
     * @param endpoint - API 端点
     * @param data - 请求数据
     * @returns 响应数据
     */
    async post<T>(endpoint: string, data: any): Promise<T> {
        try {
            const response = await fetch(`${API_BASE}${endpoint}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            })

            if (!response.ok) {
                throw new ApiError(response.status, `API 请求失败: ${response.statusText}`)
            }

            return await response.json()
        } catch (error) {
            if (error instanceof ApiError) {
                throw error
            }
            throw new Error(`网络请求失败: ${error}`)
        }
    },
}
