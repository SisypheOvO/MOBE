import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import tailwindcss from "@tailwindcss/vite"
import wasm from "vite-plugin-wasm"
import { visualizer } from "rollup-plugin-visualizer"
import path from "node:path"

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        tailwindcss(),
        wasm(),
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
        rolldownOptions: {
            output: {
                codeSplitting: {
                    groups: [
                        {
                            test: /node_modules\/monaco-editor/,
                            name: "monaco-editor",
                        },
                        {
                            test: /node_modules\/(vue|vue-i18n|pinia)/,
                            name: "vue-vendor",
                        },
                        {
                            test: /node_modules\/@osynicite\/osynic-osuapi/,
                            name: "osu-api",
                        },
                        {
                            test: /node_modules\/splitpanes/,
                            name: "ui-utils",
                        },
                    ],
                },
            },
        },
        chunkSizeWarningLimit: 1000,
    },
})
