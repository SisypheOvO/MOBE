import { createApp } from "vue"
import { createPinia } from "pinia"
import { createI18n } from "vue-i18n"
import "./styles/index.css"
import App from "./App.vue"
import { i18nConfig } from "./i18n"

const app = createApp(App)
const pinia = createPinia()
const i18n = createI18n(i18nConfig)

// Use pinia and i18n
app.use(pinia).use(i18n).mount("#app")
