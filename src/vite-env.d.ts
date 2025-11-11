/// <reference types="vite/client" />

declare module "splitpanes"

// Monaco themes JSON imports
declare module "monaco-themes/themes/*.json" {
    const value: any
    export default value
}

declare module '*.vue' {
import { DefineComponent } from 'vue';
const component: DefineComponent<{}, {}, any>;
export default component;
}
