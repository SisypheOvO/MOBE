<!--
    BBCode 预览头部组件
    包含：用户输入、用户信息显示、刷新按钮
-->
<template>
    <div class="flex items-center justify-between pl-5 pr-3 py-2 border-b border-[#3c3c3c] bg-[#22242a] rounded-sm">
        <h3 class="m-0 text-sm font-semibold text-[#cccccc]">实时预览</h3>

        <div class="flex items-center gap-3">
            <!-- 用户输入和显示 -->
            <div class="flex items-center gap-2">
                <input v-if="!currentUserInfo" v-model="userInput" @keyup.enter="handleUserInput" type="text" placeholder="输入你的 osu! ID" class="bg-[#1a1b1e] border border-[#3c3c3c] text-[#cccccc] text-sm rounded px-3 py-1.5 w-40 focus:outline-none focus:border-[#ff66aa] transition-colors" />
                <button v-if="!currentUserInfo && userInput" @click="handleUserInput" class="bg-[#ff66aa] hover:bg-[#ff4488] text-white text-sm px-3 py-1.5 rounded transition-colors">确认</button>

                <!-- 用户头像和信息 -->
                <a v-if="currentUserInfo" :href="`https://osu.ppy.sh/users/${currentUserInfo.id}`" target="_blank" class="flex items-center gap-2 hover:opacity-80 transition-opacity" :title="`${currentUserInfo.username} (ID: ${currentUserInfo.id})`">
                    <img :src="currentUserInfo.avatar_url" :alt="currentUserInfo.username" class="w-8 h-8 rounded-full border-2 border-[#3c3c3c]" />
                    <span class="text-[#cccccc] text-sm font-medium">{{ currentUserInfo.username }}</span>
                </a>
                <button v-if="currentUserInfo" @click="clearCurrentUser" class="bg-transparent border-0 text-[#cccccc] cursor-pointer p-1 rounded hover:bg-[#3c3c3c] transition-all" title="清除用户">
                    <span class="fas fa-times"></span>
                </button>
            </div>

            <button class="bg-transparent border-0 text-[#cccccc] cursor-pointer p-1 rounded transition-all duration-200 text-base flex items-center justify-center hover:bg-[#3c3c3c] hover:rotate-180" @click="emit('refresh')" title="刷新预览">
                <span>🔄</span>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useUserInfo } from "@/composables/useUserInfo"

const emit = defineEmits<{
    refresh: []
}>()

const { currentUserInfo, userInput, handleUserInput, clearCurrentUser } = useUserInfo()
</script>
