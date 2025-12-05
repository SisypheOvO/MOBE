import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import wasm from "vite-plugin-wasm"
import topLevelAwait from "vite-plugin-top-level-await"
import { visualizer } from "rollup-plugin-visualizer"
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        wasm(),
        topLevelAwait(),
        visualizer({
            filename: "dist/stats.html",
            open: true,
            gzipSize: true,
            brotliSize: true,
        }),
    ],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
        },
    },
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    "monaco-editor": ["monaco-editor"],
                    "vue-vendor": ["vue", "vue-i18n", "pinia"],
                    "osu-api": ["@osynicite/osynic-osuapi"],
                    "ui-utils": ["splitpanes"],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
})
