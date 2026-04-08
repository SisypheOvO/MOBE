<!-- markdownlint-disable MD028 MD033 MD041 -->

<div align="center">

# MOBE - Modern osu! BBCode Editor

A powerful, feature-rich BBCode editor designed for osu! profile edit & forum posts

[English](#english-version) | [中文](#中文版)

![License](https://img.shields.io/badge/license-MIT-blue.svg) ![Vue](https://img.shields.io/badge/Vue-3.5-42b883.svg) ![TypeScript](https://img.shields.io/badge/TypeScript-6.0-3178c6.svg) ![Monaco Editor](https://img.shields.io/badge/Monaco_Editor-0.55-007ACC.svg)

</div>

---

## English Version

### 🚀 Features

#### Core Features

We support all osu! tags.

- 🎨 **Syntax Highlighting** - Category-based color coding for different tag types (format, media, layout, special, osu!)
- 🌈 **Rainbow Brackets** - Visual nesting levels with rainbow colors
- ⚡ **Smart Autocomplete** - Intelligent BBCode tag completion with parameter suggestions
- 👀 **Hover Documentation** - Detailed tag documentation and usage examples on hover
- 🔗 **Linked Editing** - Edit opening tags and closing tags sync automatically
- 🎯 **Bracket Matching** - Automatic bracket pairing and validation
- 🎨 **Color Picker** - Visual color picker for `[color]` tags
- 🔧 **Visual Toolbar** - Categorized quick-access buttons (Format, Media, Layout, Special, osu!)
- ⌨️ **Keyboard Shortcuts** - Efficient editing (Ctrl+B, Ctrl+I, Ctrl+U, Ctrl+K)
- 📱 **Live Preview** - Real-time BBCode rendering with osu! forum styling
- 🔄 **Multiple BBCode Contents** - Simultaneously edit/save multiple BBCode instances
- ✅​ **Import BBCode** - from your profile or other places (\*need login)

#### Side Features

- **Hiding Preview** - immersion of coding
- **Width Memo** - Changing/memorizing width of code/preview sections
- **Multiple Editor Themes** - Switch between different editor visual themes
- **i18n** - Internationalization support for multiple languages
- **Check FriendShip** - once you login

#### Other UI/UX

- **Status Bar** - Line/column info, selection length, character count
- **Dark Theme** - Eye-friendly VS Code-inspired dark theme

### Tech Stack

👑​📢​🎉​🔥​✨​⚡​⭐​💯​👋​🫵​🏆​🗿​💫​

Appreciate the fantastic and amazing support from [@osynicite/osynic-osuapi](https://github.com/Osynicite/osynic_osuapi)

THIS API IS INSANE AS HELL.

👑​📢​🎉​🔥​✨​⚡​⭐​💯​👋​🫵​🏆​🗿​💫​

- **Frontend Framework**: Vue 3 (Composition API with `<script setup>`)
- **Editor**: Monaco Editor, Monaco-Themes
- **Build Tool**: Vite
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4, fontawesome
- **Width Support**: splitpanes

### Usage

1. **Launch the editor through <https://mobe.deno.dev/>**

2. **Write BBCode**: Use the Monaco editor to write your BBCode content with:
    - Type `[` to trigger autocomplete
    - Hover over tags for documentation
    - Use keyboard shortcuts for common formatting

3. **Use Toolbar**: Click toolbar buttons to insert BBCode tags quickly

4. **Preview**: View the rendered result in the preview panel

### Development

#### Prerequisites

- I hope you have Node 24.x or higher
- npm or yarn or pnpm
- somehow you may need `patch-package` installed already (globally or locally)
- deno (npm i -g deno)

#### Setup & Run

If you want to run the full features of this app, you need to run both CORS and OAuth services locally. But if you just want to run the editor without login features (button available in the right corner), you can skip 1./2. steps and jump to the 3. step to run the frontend directly.

##### 1. run CORS & OAuth repo

Fork

- <https://github.com/Islatri/deno_osynic_cors>
- <https://github.com/Islatri/deno_osynic_oauth>

Create and config `.env` file under both root

> [!TIP]
> OSU_CLIENT_ID & OSU_CLIENT_SECRET are from `https://osu.ppy.sh/home/account/edit#oauth` when you create a local app
>
> REDIRECT_URI should be the port you are running the CORS service
>
> WEBAPP_URLS is an Array of the urls you want to CORS
>
> WEBAPP_URL is the url OAuth service will redirect you to

> [!CAUTION]
> DON'T SHARE YOUR `OSU_CLIENT_SECRET` WITH ANYONE ELSE
>
> REDIRECT_URI should be also saved in the osu account setting under #oauth -> #own clients

Run each the code below under the two repo's root

```bash
deno task start # at OAuth root (see the service starting at 4000 by default)
deno task dev # at CORS root (see the service starting at 8000 by default)
```

##### 2. set your `.env.development` file at front end root

And you do like this(like in the `.env.development.example`)

```env
VITE_OSU_CLIENT_ID=<your_client_id>
VITE_OSU_REDIRECT_URI=http://localhost:4000/callback  # Your OAuth service port
VITE_OSU_PROXY_URL=http://localhost:8000/             # Your CORS proxy service port
```

##### 3. run front end

Enter the mobe front end root

```bash
npm install # Install dependencies
npm run dev # Start frontend at 5173
npm run build # Build for production
```

### Contributing

Contributions are welcome! Please feel free to submit a Pull Request or Issue.

---

## 中文版

### 🚀 特性

#### 核心功能

我们支持所有 osu! 标签。

- 🎨 **语法高亮** - 基于标签类别的颜色编码（格式、媒体、布局、特殊、osu!）
- 🌈 **彩虹括号** - 嵌套层级的可视化彩虹配色
- ⚡ **智能补全** - 智能的 BBCode 标签自动补全，带参数建议
- 👀 **悬停文档** - 鼠标悬停显示详细的标签文档和使用示例
- 🔗 **链接编辑** - 开标签和闭标签自动同步编辑
- 🎯 **括号匹配** - 自动括号配对和验证
- 🎨 **颜色选择器** - `[color]` 标签的可视化颜色选择器
- 🔧 **可视化工具栏** - 分类的快捷按钮（格式、媒体、布局、特殊、osu!）
- ⌨️ **键盘快捷键** - 高效编辑（Ctrl+B、Ctrl+I、Ctrl+U、Ctrl+K）
- 📱 **实时预览** - 实时渲染 BBCode，采用 osu! 论坛样式
- 🔄 **多个 BBCode 内容** - 同时编辑/保存多个 BBCode 实例
- ✅ **导入 BBCode** - 从你的个人资料或其他地方导入（\*需要登录）

#### 辅助功能

- **隐藏预览** - 沉浸式编码体验
- **宽度记忆** - 更改/记忆代码/预览区域的宽度
- **多种编辑器主题** - 切换不同的编辑器视觉主题
- **国际化** - 多语言支持
- **检查好友关系** - 登录后即可使用

#### 其他 UI/UX

- **状态栏** - 行/列信息、选区长度、字符计数
- **暗色主题** - 护眼的 VS Code 风格暗色主题

### 技术栈

👑📢🎉🔥✨⚡⭐💯👋🫵🏆🗿💫

感谢 [@osynicite/osynic-osuapi](https://github.com/Osynicite/osynic_osuapi) 提供的出色支持

这个库碉堡了。

👑📢🎉🔥✨⚡⭐💯👋🫵🏆🗿💫

- **前端框架**: Vue 3（Composition API，使用 `<script setup>`）
- **编辑器**: Monaco Editor, Monaco-Themes
- **构建工具**: Vite
- **开发语言**: TypeScript
- **样式框架**: Tailwind CSS v4, fontawesome
- **宽度支持**: splitpanes

### 使用方法

1. **通过 <https://mobe.deno.dev/> 启动编辑器**

2. **编写 BBCode**：在 Monaco 编辑器中编写 BBCode 内容：
    - 输入 `[` 触发自动补全
    - 鼠标悬停在标签上查看文档
    - 使用键盘快捷键进行常用格式化

3. **使用工具栏**：点击工具栏按钮快速插入 BBCode 标签

4. **预览**：在预览面板中查看渲染结果

### 开发指南

#### 环境要求

- 希望你有 Node 24.x 或更高版本
- npm 或 yarn 或 pnpm
- 你可能需要已经安装好 `patch-package`（全局或本地）
- deno (npm i -g deno)

#### 安装与运行

如果你想运行全部功能，你需要在本地同时运行 CORS 和 OAuth 服务。但如果你不需要登录功能（在右上角的按钮可以找到），你可以跳过第 1/2 两步，直接进入第 3 步运行前端。

##### 1. 运行 CORS 和 OAuth 仓库

Fork 以下仓库：

- <https://github.com/Islatri/deno_osynic_cors>
- <https://github.com/Islatri/deno_osynic_oauth>

在两个仓库的根目录创建并配置 `.env` 文件

> [!TIP]
> OSU_CLIENT_ID 和 OSU_CLIENT_SECRET 来自 `https://osu.ppy.sh/home/account/edit#oauth`，当你创建本地应用时获取
>
> REDIRECT_URI 应是你运行 CORS 服务的端口
>
> WEBAPP_URLS 是你想要 CORS 的 URL 数组
>
> WEBAPP_URL 是 OAuth 服务将重定向到的 URL

> [!CAUTION]
> 不要与任何人分享你的 `OSU_CLIENT_SECRET`
>
> REDIRECT_URI 也应该保存在 osu 账户设置的 #oauth -> #own clients 中才能正常运行

分别在两个项目的根目录下分别运行下面两行代码

```bash
deno task start # 在 OAuth 根目录（服务默认启动在 4000 端口）
deno task dev # 在 CORS 根目录（服务默认启动在 8000 端口）
```

##### 2. 在前端根目录设置 `.env.development` 文件

配置如下：(仿照 `.env.development.example`)

```env
VITE_OSU_CLIENT_ID=<your_client_id>
VITE_OSU_REDIRECT_URI=http://localhost:4000/callback  # 你的 OAuth 服务端口
VITE_OSU_PROXY_URL=http://localhost:8000/             # 你的 CORS 代理服务端口
```

##### 3. 运行前端

进入 mobe 前端根目录

```bash
npm install # 安装依赖
npm run dev # 在 5173 启动前端
npm run build # 构建生产版本
```

### 贡献

欢迎贡献！请随时提交 Pull Request 或 Issue。
