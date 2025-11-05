# OBEditor

<!-- markdownlint-disable MD033 -->

<div align="center">

## **🎨 Modern BBCode Editor for osu! Forum**

A powerful, feature-rich BBCode editor designed for osu! profile edit & forum posts

[English](#english-version) | [中文](#中文版)

</div>

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Vue](https://img.shields.io/badge/Vue-3.5-42b883.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg) ![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-0.54-007ACC.svg)

---

## English Version

### ✨ Overview

**OBEditor** is a modern, feature-rich BBCode editor built with Vue 3 and Monaco Editor, specifically tailored for osu! profile editing and forum posts. It provides an intuitive interface for creating and previewing BBCode content with advanced features like syntax highlighting, autocomplete, color picker, and real-time preview.

### 🚀 Features

#### Core Features

- 🎨 **Syntax Highlighting** - Category-based color coding for different tag types (format, media, layout, special, osu!)
- 🌈 **Rainbow Brackets** - Visual nesting levels with rainbow colors (disabled by default, can be enabled)
- ⚡ **Smart Autocomplete** - Intelligent BBCode tag completion with parameter suggestions
- 👀 **Hover Documentation** - Detailed tag documentation and usage examples on hover
- 🔗 **Linked Editing** - Edit opening tags and closing tags sync automatically
- 🎯 **Bracket Matching** - Automatic bracket pairing and validation

#### UI/UX

- 🔧 **Visual Toolbar** - Categorized quick-access buttons (Format, Media, Layout, Special, osu!)
- 📱 **Live Preview** - Real-time BBCode rendering with osu! forum styling
- ⌨️ **Keyboard Shortcuts** - Efficient editing (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
- 📊 **Status Bar** - Line/column info, selection length, character count
- 🌙 **Dark Theme** - Eye-friendly VS Code-inspired dark theme

#### Specific

- 🎮 **osu! Tags Support** - Full support for osu! forum exclusive tags
- 🎨 **Color Picker** - Visual color picker for `[color]` tags

### Tech Stack

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>`)
- **Editor**: Monaco Editor (VS Code's editor)
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4

### Installation

#### Prerequisites

- I hope you have Node 24.x or higher
- npm or yarn or pnpm

#### Setup

```bash
npm install # Install dependencies
npm run dev # Start frontend at 5173

cd ./server
npm run dev # Start backend at 3000
npm run build # Build for production
```

### Usage

1. **Launch the editor**: Open your browser and navigate to `http://localhost:5173` (default Vite port)

2. **Write BBCode**: Use the Monaco editor to write your BBCode content with:

    - Type `[` to trigger autocomplete
    - Hover over tags for documentation
    - Use keyboard shortcuts for common formatting

3. **Use Toolbar**: Click toolbar buttons to insert BBCode tags quickly

4. **Preview**: View the rendered result in the preview panel

### Project Structure

```plaintext
OBEditor/
├── src/
│   ├── components/
│   │   ├── MonacoEditor.vue       # Monaco editor wrapper
│   │   ├── BBCodePreview.vue      # BBCode preview panel
│   │   ├── EditorToolbar.vue      # Formatting toolbar
│   │   └── EditorStatusBar.vue    # Editor status bar
│   ├── config/
│   │   ├── bbcodeLanguage.ts      # Monaco language configuration
│   │   ├── bbcodeTags.ts          # BBCode tag definitions
│   │   └── defaultContent.ts      # Default editor content
│   ├── App.vue                     # Main application component
│   ├── main.ts                     # Application entry point
│   └── style.css                   # Global styles
├── package.json
├── vite.config.ts
├── tsconfig.json
├── serve.js                       # Deno serve file
└── README.md
```

### Development

#### Adding New BBCode Tags

1. Add tag definition to `src/config/bbcodeTags.ts`
2. Add completion item to `src/config/bbcodeLanguage.ts` in `createCompletionSuggestions`=
3. Update syntax rules if needed

#### Customizing Editor Theme

Modify the theme configuration in `src/config/bbcodeLanguage.ts`:

```typescript
monaco.editor.defineTheme("bbcode-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
        // Add your custom token colors
    ],
    colors: {
        // Add your custom editor colors
    },
})
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

## 中文版

### ✨ 项目简介

**OBEditor** 是一个基于 Vue 3 和 Monaco Editor 构建的现代化、功能丰富的 BBCode 编辑器，专为 osu! 个人资料编辑和论坛帖子设计。它提供了直观的界面，支持语法高亮、智能补全、颜色选择器和实时预览等高级功能，让 BBCode 内容创作变得简单高效。

### 🚀 特性

#### 核心功能

- 🎨 **语法高亮** - 基于标签类别的颜色编码（格式、媒体、布局、特殊、osu!）
- 🌈 **彩虹括号** - 嵌套层级的可视化彩虹配色（默认关闭，可启用）
- ⚡ **智能补全** - 智能的 BBCode 标签自动补全，带参数建议
- 👀 **悬停文档** - 鼠标悬停显示详细的标签文档和使用示例
- 🔗 **链接编辑** - 开标签和闭标签自动同步编辑
- 🎯 **括号匹配** - 自动括号配对和验证

#### 用户界面/体验

- 🔧 **可视化工具栏** - 分类的快捷按钮（格式、媒体、布局、特殊、osu!）
- 📱 **实时预览** - 实时渲染 BBCode，采用 osu! 论坛样式
- ⌨️ **键盘快捷键** - 高效编辑（Ctrl+B、Ctrl+I、Ctrl+U、Ctrl+K）
- 📊 **状态栏** - 行/列信息、选区长度、字符计数
- 🌙 **暗色主题** - 护眼的 VS Code 风格暗色主题

#### 特色功能

- 🎮 **osu! 标签支持** - 完整支持 osu! 论坛专属标签
- 🎨 **颜色选择器** - `[color]` 标签的可视化颜色选择器

### 技术栈

- **前端框架**: Vue 3（Composition API，使用 `<script setup>`）
- **编辑器**: Monaco Editor（VS Code 编辑器内核）
- **构建工具**: Vite
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS v4

### 安装

#### 环境要求

- 希望你有 Node 24.x 或更高版本
- npm 或 yarn 或 pnpm

#### 安装步骤

```bash
npm install # 安装依赖
npm run dev # 在 5173 启动开发服务器

cd ./server
npm run dev # 在 3000 启动后端 api
npm run build # 构建生产版本
```

### 使用方法

1. **启动编辑器**：打开浏览器访问 `http://localhost:5173`（Vite 默认端口）

2. **编写 BBCode**：在 Monaco 编辑器中编写 BBCode 内容：

   - 输入 `[` 触发自动补全
   - 鼠标悬停在标签上查看文档
   - 使用键盘快捷键进行常用格式化

3. **使用工具栏**：点击工具栏按钮快速插入 BBCode 标签

4. **预览**：在预览面板中查看渲染结果

### 项目结构

```plaintext
OBEditor/
├── src/
│   ├── components/
│   │   ├── MonacoEditor.vue       # Monaco 编辑器包装组件
│   │   ├── BBCodePreview.vue      # BBCode 预览面板
│   │   ├── EditorToolbar.vue      # 格式化工具栏
│   │   └── EditorStatusBar.vue    # 编辑器状态栏
│   ├── config/
│   │   ├── bbcodeLanguage.ts      # Monaco 语言配置
│   │   ├── bbcodeTags.ts          # BBCode 标签定义
│   │   └── defaultContent.ts      # 默认编辑器内容
│   ├── App.vue                     # 主应用组件
│   ├── main.ts                     # 应用程序入口
│   └── style.css                   # 全局样式
├── package.json
├── vite.config.ts
├── tsconfig.json
├── serve.js                       # Deno 部署
└── README.md
```

### 开发指南

#### 添加新的 BBCode 标签

1. 在 `src/config/bbcodeTags.ts` 中添加标签定义
2. 在 `src/config/bbcodeLanguage.ts` 中添加补全项（`createCompletionSuggestions`）
3. 如需要，更新语法规则

#### 自定义编辑器主题

在 `src/config/bbcodeLanguage.ts` 中修改主题配置：

```typescript
monaco.editor.defineTheme("bbcode-theme", {
    base: "vs-dark",
    inherit: true,
    rules: [
        // 添加自定义 token 颜色
    ],
    colors: {
        // 添加自定义编辑器颜色
    },
})
```

### 贡献

欢迎贡献！请随时提交 Pull Request。
