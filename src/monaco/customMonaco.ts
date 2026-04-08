import "monaco-editor/esm/vs/editor/editor.all.js"

import * as monacoApi from "monaco-editor/esm/vs/editor/editor.api"

// 为了获得完整的类型信息，这里把 ESM editor.api 强制断言成主入口的类型
const monaco = monacoApi as unknown as typeof import("monaco-editor")

export { monaco }
export type Monaco = typeof import("monaco-editor")
