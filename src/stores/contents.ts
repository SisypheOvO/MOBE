import { ref } from "vue"
import { defineStore } from "pinia"
import { defaultContent } from "@/config/defaultContent"

export interface BBCodeContent {
    id: string
    title: string
    content: string
    createdAt: number
    updatedAt: number
}

const CONTENTS_STORAGE_KEY = "obe_contents"
const CURRENT_CONTENT_ID_KEY = "obe_current_content_id"

export const useContentsStore = defineStore("contents", () => {
    const contents = ref<BBCodeContent[]>([])
    const currentContentId = ref<string | null>(null)
    const currentContent = ref<string>("")

    // Debounce timer for auto-save
    let saveTimeout: ReturnType<typeof setTimeout> | null = null

    // Load contents from localStorage
    const loadContentsFromStorage = () => {
        try {
            const stored = localStorage.getItem(CONTENTS_STORAGE_KEY)
            if (stored) {
                contents.value = JSON.parse(stored)
            }

            const storedCurrentId = localStorage.getItem(CURRENT_CONTENT_ID_KEY)
            if (storedCurrentId && contents.value.find((c) => c.id === storedCurrentId)) {
                currentContentId.value = storedCurrentId
                const content = contents.value.find((c) => c.id === storedCurrentId)
                if (content) {
                    currentContent.value = content.content
                }
            } else if (contents.value.length > 0) {
                currentContentId.value = contents.value[0].id
                currentContent.value = contents.value[0].content
            }
        } catch (e) {
            console.error("Failed to load contents from storage:", e)
        }
    }

    // Save contents to localStorage
    const saveContentsToStorage = () => {
        try {
            // Sync currentContent back to contents array before saving
            if (currentContentId.value) {
                const index = contents.value.findIndex((c) => c.id === currentContentId.value)
                if (index !== -1) {
                    contents.value[index].content = currentContent.value
                    contents.value[index].updatedAt = Date.now()
                }
            }

            localStorage.setItem(CONTENTS_STORAGE_KEY, JSON.stringify(contents.value))
            if (currentContentId.value) {
                localStorage.setItem(CURRENT_CONTENT_ID_KEY, currentContentId.value)
            }
        } catch (e) {
            console.error("Failed to save contents to storage:", e)
        }
    }

    // Create new content
    const createContent = (title: string = "New Untitled", content: string = defaultContent): BBCodeContent => {
        const newContent: BBCodeContent = {
            id: `content_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`,
            title,
            content,
            createdAt: Date.now(),
            updatedAt: Date.now(),
        }
        contents.value.unshift(newContent)
        currentContentId.value = newContent.id
        currentContent.value = content
        saveContentsToStorage()
        return newContent
    }

    // Update content
    const updateContent = (id: string, updates: Partial<Pick<BBCodeContent, "title" | "content">>) => {
        const index = contents.value.findIndex((c) => c.id === id)
        if (index !== -1) {
            contents.value[index] = {
                ...contents.value[index],
                ...updates,
                updatedAt: Date.now(),
            }
            saveContentsToStorage()
        }
    }

    // Update current content's text (with debounced save)
    const updateCurrentContentText = (content: string) => {
        currentContent.value = content

        // Debounce save to localStorage
        if (saveTimeout) {
            clearTimeout(saveTimeout)
        }
        saveTimeout = setTimeout(() => {
            saveContentsToStorage()
        }, 500)
    }

    // Delete content
    const deleteContent = (id: string) => {
        const index = contents.value.findIndex((c) => c.id === id)
        if (index !== -1) {
            contents.value.splice(index, 1)
            if (currentContentId.value === id) {
                if (contents.value.length > 0) {
                    currentContentId.value = contents.value[0].id
                    currentContent.value = contents.value[0].content
                } else {
                    createContent("Welcome", defaultContent)
                }
            }
            saveContentsToStorage()
        }
    }

    // Switch to a different content
    const switchToContent = (id: string) => {
        const content = contents.value.find((c) => c.id === id)
        if (content) {
            // Clear debounce timer and save immediately before switching
            if (saveTimeout) {
                clearTimeout(saveTimeout)
                saveTimeout = null
            }
            saveContentsToStorage()

            // Switch to new content
            currentContentId.value = id
            currentContent.value = content.content
        }
    }

    // Import BBCode from OAuth (e.g., user profile page)
    const importFromOAuth = (title: string, bbcodeContent: string) => {
        // Create a new content or update current one
        const newContent = createContent(title, bbcodeContent)
        return newContent
    }

    // Initialize - load from storage or create default
    const initialize = () => {
        loadContentsFromStorage()
        if (contents.value.length === 0) {
            createContent("Welcome", defaultContent)
        }
    }

    return {
        contents,
        currentContentId,
        currentContent,
        createContent,
        updateContent,
        updateCurrentContentText,
        deleteContent,
        switchToContent,
        importFromOAuth,
        initialize,
    }
})
