export const zh = {
    common: {
        save: "保存",
        cancel: "取消",
        confirm: "确认",
        delete: "删除",
        edit: "编辑",
        loading: "加载中...",
    },
    drawer: {
        title: "设置",
        recentContents: "最近使用",
        language: "语言",
        editorTheme: "编辑器主题",
        selectTheme: "选择主题",
        storageInfo: "储存在 localStorage",
        template: "模板",
        renameContent: "重命名",
        deleteContent: "删除内容",
        deleteConfirmation: "您确定要删除此内容吗？此操作无法撤消。",
        emptyState: "尚无内容",
        createNew: "新建内容",
        profile: "的个人资料",
    },
    statusbar: {
        row: "行",
        column: "列",
        charsCount: "字符数",
        selectedCharsCount: "已选中",
    },
    oauthDropdown: {
        importProfile: "导入个人资料",
        signOut: "登出",
        globalRanking: "全球排名",
        pp: "PP",
        loadError: "加载用户数据失败",
        loadErrorDesc: "加载您的个人资料信息时出错。请检查网络连接并重试。",
        retry: "重试",
    },
    toolbar: {
        format: "格式",
        media: "媒体",
        layout: "布局",
        special: "特殊",
        osu: "osu!",
    },
    preview: {
        realtimePreview: "实时预览",
    },
    bbcode: {
        bold: {
            label: "粗体",
            placeholder: "文本",
            documentation: "**粗体** - 使文本加粗显示",
            detail: "BBCode 粗体标签",
            hoverInfo: "**粗体标签** - 使文本加粗显示\n\n用法: `[b]文本[/b]`",
        },
        italic: {
            label: "斜体",
            placeholder: "文本",
            documentation: "**斜体** - 使文本斜体显示",
            detail: "BBCode 斜体标签",
            hoverInfo: "**斜体标签** - 使文本斜体显示\n\n用法: `[i]文本[/i]`",
        },
        underline: {
            label: "下划线",
            placeholder: "文本",
            documentation: "**下划线** - 为文本添加下划线",
            detail: "BBCode 下划线标签",
            hoverInfo: "**下划线标签** - 为文本添加下划线\n\n用法: `[u]文本[/u]`",
        },
        strikethrough: {
            label: "删除线",
            placeholder: "文本",
            documentation: "**删除线** - 为文本添加删除线",
            detail: "BBCode 删除线标签",
            hoverInfo: "**删除线标签** - 为文本添加删除线\n\n用法: `[s]文本[/s]`",
        },
        color: {
            label: "颜色",
            placeholder: "文本",
            documentation: "**文字颜色** - 设置文字颜色\n\n示例: `[color=#ff0000]红色文字[/color]`",
            detail: "BBCode 颜色标签",
            hoverInfo: "**颜色标签** - 设置文字颜色\n\n用法: `[color=#ff0000]文本[/color]`",
        },
        size: {
            label: "大小",
            placeholder: "文本",
            documentation: "**文字大小** - 设置文字大小（百分比）\n\n示例: `[size=150]大号文字[/size]`",
            detail: "BBCode 大小标签",
            hoverInfo: "**大小标签** - 设置文字大小\n\n用法: `[size=100]文本[/size]`\n\n提示：只支持50, 85, 100, 150。100 为正常大小，150 为 1.5 倍",
        },
        url: {
            label: "链接",
            placeholder: "链接文本",
            documentation: "**超链接** - 创建可点击的链接\n\n示例: `[url=https://osu.ppy.sh]访问 osu![/url]`",
            detail: "BBCode 链接标签",
            hoverInfo: "**链接标签** - 创建超链接\n\n用法: `[url=地址]文本[/url]`",
        },
        img: {
            label: "图片",
            placeholder: "https://example.com/image.jpg",
            documentation: "**图片** - 插入图片\n\n示例: `[img]https://example.com/logo.png[/img]`",
            detail: "BBCode 图片标签",
            hoverInfo: "**图片标签** - 插入图片\n\n用法: `[img]图片地址[/img]`",
        },
        centre: {
            label: "居中",
            placeholder: "居中文本",
            documentation: "**居中对齐** - 使文本居中显示",
            detail: "BBCode 居中标签",
            hoverInfo: "**居中标签** - 文本居中对齐\n\n用法: `[centre]文本[/centre]`",
        },
        code: {
            label: "代码块",
            placeholder: "\n// 代码内容\n",
            documentation: "**代码块** - 显示格式化的代码\n\n用于展示编程代码",
            detail: "BBCode 代码块标签",
            hoverInfo: "**代码块标签** - 显示代码块\n\n用法: `[code]代码[/code]`",
        },
        inlineCode: {
            label: "行内代码",
            placeholder: "代码内容",
            documentation: "**行内代码** - 显示行内代码\n\n用于展示编程代码",
            detail: "BBCode 行内代码标签",
            hoverInfo: "**行内代码标签** - 显示行内代码\n\n用法: `[c]代码[/c]`",
        },
        quote: {
            label: "引用",
            placeholder: "引用内容",
            documentation: "**引用块** - 引用他人的话\n\n常用于回复或引述\n\n可选语法: `[quote=作者]内容[/quote]`",
            detail: "BBCode 引用标签",
            hoverInfo: "**引用标签** - 显示引用内容\n\n用法: `[quote]引用文本[/quote]`\n或: `[quote=作者]引用文本[/quote]`",
        },
        list: {
            label: "列表",
            placeholder: "[*]项目1\n[*]项目2\n[*]项目3",
            documentation: "**列表** - 创建列表\n\n使用 `[*]` 表示列表项\n\n• `[list]` - 创建无序列表（项目符号）\n• `[list=TYPE]` - 创建有序列表（编号）",
            detail: "BBCode 列表标签",
            hoverInfo: "**列表标签** - 创建列表\n\n无序列表: `[list][*]项目1[*]项目2[/list]`\n\n有序列表(TYPE可以为任意值): `[list=TYPE][*]项目1[*]项目2[/list]`",
        },
        spoiler: {
            label: "隐藏",
            placeholder: "隐藏内容",
            documentation: "**隐藏内容** - 创建需要点击才能查看的内容\n\n常用于剧透警告",
            detail: "BBCode 隐藏标签",
            hoverInfo: "**隐藏标签** - 隐藏敏感内容\n\n用法: `[spoiler]隐藏的文本[/spoiler]`",
        },
        heading: {
            label: "标题",
            placeholder: "标题文本",
            documentation: "**标题** - osu! 论坛专用标题样式\n\n创建醒目的章节标题",
            detail: "osu! 标题标签",
            hoverInfo: "**标题标签** - osu! 论坛标题样式\n\n用法: `[heading]标题[/heading]`",
        },
        notice: {
            label: "提示框",
            placeholder: "提示内容",
            documentation: "**提示框** - osu! 论坛专用提示框\n\n显示重要提示或警告信息",
            detail: "osu! 提示框标签",
            hoverInfo: "**提示框标签** - osu! 论坛提示框\n\n用法: `[notice]提示内容[/notice]`",
        },
        box: {
            label: "折叠框",
            placeholder: "折叠的内容",
            documentation: "**折叠框** - osu! 论坛专用折叠框\n\n创建可展开/收起的内容区域\n\n示例: `[box=点击展开]内容[/box]`",
            detail: "osu! 折叠框标签",
            hoverInfo: "**折叠框标签** - osu! 论坛折叠框\n\n用法: `[box=标题]内容[/box]`",
        },
        profile: {
            label: "用户",
            placeholder: "用户名",
            documentation: "**用户链接** - osu! 论坛用户资料链接\n\n创建指向用户主页的链接\n\n示例: `[profile=2]peppy[/profile]`",
            detail: "osu! 用户标签",
            hoverInfo: "**用户标签** - osu! 用户资料链接\n\n用法: `[profile=用户ID]用户名[/profile]`",
        },
        spoilerbox: {
            label: "剧透框",
            placeholder: "剧透内容",
            documentation: "**剧透框** - osu! 论坛专用剧透框\n\n创建固定标题为 SPOILER 的折叠框\n\n示例: `[spoilerbox]剧透内容[/spoilerbox]`",
            detail: "osu! 剧透框标签",
            hoverInfo: "**剧透框标签** - osu! 论坛剧透框\n\n用法: `[spoilerbox]内容[/spoilerbox]`\n\n剧透框的标题固定为 SPOILER",
        },
        email: {
            label: "邮箱",
            placeholder: "Sisy",
            documentation: "**邮箱** - 邮箱链接\n\n创建触发浏览器mailto功能的邮箱链接\n\n示例: `[email=test@gmail.com]Your email name[/email]`",
            detail: "osu! 邮箱标签",
            hoverInfo: "**邮箱标签** - 邮箱链接\n\n用法: `[email=邮箱地址]显示内容[/email]`",
        },
        youtube: {
            label: "YouTube",
            placeholder: "",
            documentation: "**YouTube** - youtube视频\n\n用于嵌入 YouTube 视频\n\n示例: `[youtube]Ef6zwIR44Ww[/youtube]`",
            detail: "osu! YouTube 标签",
            hoverInfo: "**YouTube 标签** - youtube视频\n\n用法: `[youtube]视频ID[/youtube]`",
        },
        audio: {
            label: "音频",
            placeholder: "",
            documentation: "**音频** - 音频\n\n用于嵌入可播放的音频\n\n示例: `[audio]https://example.com/audiofile[/audio]`",
            detail: "osu! 音频 标签",
            hoverInfo: "**音频 标签** - 音频\n\n用法: `[audio]音频URL（须对osu可用）[/audio]`",
        },
        imagemap: {
            label: "Imagemap",
            placeholder: "",
            documentation: "**Imagemap** - Imagemap\n\n用于添加各个分区可跳转的图片\n\n示例: `[imagemap]https://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/21242012\n\n70 8 30 7 https://osu.ppy.sh/users/27608705\n\n0 16 20 7 https://osu.ppy.sh/users/9650376\n\n22 12 20 7 https://osu.ppy.sh/users/35628968[/imagemap]`",
            detail: "osu! Imagemap 标签",
            hoverInfo: "**Imagemap 标签** - Imagemap\n\n用法: \n\n[imagemap]\n\nhttps://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/1\n\n70 8 30 7 https://osu.ppy.sh/users/2\n\n0 16 20 7 https://osu.ppy.sh/users/3\n\n22 12 20 7 https://osu.ppy.sh/users/4\n\n[/imagemap]",
        },
    },
    defaultContent: `[centre]
[size=150][b]🎨 欢迎使用 MOBE[/b][/size]
[size=85][i]专为 osu! 论坛设计的现代化 BBCode 编辑器[/i][/size]
[/centre]

[heading]✨ 编辑器特性[/heading]

[notice]
本编辑器支持完整的 osu! 论坛 BBCode 语法，包括语法高亮、智能补全、颜色选择器和实时预览。
[/notice]

[heading]📝 文本格式[/heading]

[b]粗体文本[/b] [i]斜体文本[/i] [u]下划线文本[/u] [s]删除线文本[/s]

[b]组合使用：[/b][b][i][u]粗体+斜体+下划线[/u][/i][/b]

[heading]🎨 颜色和大小[/heading]

[color=#ff6b6b]红色[/color] [color=#4ecdc4]青色[/color] [color=#95e1d3]薄荷绿[/color] [color=#f38181]粉红[/color] [color=#d9a6bd]osu! 粉[/color]

[size=50]小号文字 (50%)[/size]
[size=85]较小文字 (85%)[/size]
[size=100]正常文字 (100%)[/size]
[size=150]大号文字 (150%)[/size]

[heading]🔗 链接与媒体[/heading]

查看用户资料：[profile=35628968]SisypheOvO[/profile] 的主页

嵌入imagemap：

[imagemap]
https://sisy.s-ul.eu/UWlCIYOX
53 30 40 60 https://osu.ppy.sh/users/35628968 Sisy
30 70 15 28 https://osu.ppy.sh/users/27608705 MarioKartya
18 70 12 28 https://osu.ppy.sh/users/9650376 Robinia
[/imagemap]

邮箱链接：[email=test@gmail.com]Sisy 的邮箱[/email]

嵌入音频：

[audio]https://raw.githubusercontent.com/ZnCookie/osu-profile/refs/heads/main/music.opus[/audio]

嵌入油管视频：

[youtube]Ef6zwIR44Ww[/youtube]

[heading]💬 引用与代码[/heading]

[quote="peppy"]
这是来自 peppy 的引用
支持带作者名的引用
[/quote]

[quote]
这是普通引用块
无作者署名
[/quote]

代码块示例：

[code]
function clickCircles() {
    const timing = calculateTiming();
    if (timing.perfect) {
        score += 300;
    }
}
[/code]

行内代码：使用 [c]console.log()[/c] 来调试，或者检查 [c]beatmap.difficulty[/c] 属性。

[heading]📋 列表[/heading]

[b]无序列表（默认）：[/b]
[list]
[*]Standard 模式
[*]Taiko 模式
[*]Catch 模式
[*]Mania 模式
[/list]

[b]有序列表（使用 list=1）：[/b]
[list=1]
[*]下载 Beatmap
[*]导入到 osu!
[*]开始游玩
[*]上传成绩
[/list]

[heading]👁️ 隐藏与折叠[/heading]

行内隐藏：这是 [spoiler]隐藏的文本内容[/spoiler]，鼠标悬停查看。

[box=点击展开：技巧与窍门]
[b]编辑器快捷键：[/b]
[list]
[*][b]Ctrl+B[/b] - 粗体
[*][b]Ctrl+I[/b] - 斜体
[*][b]Ctrl+U[/b] - 下划线
[*][b]Ctrl+K[/b] - 插入链接
[/list]

[b]特殊功能：[/b]
[list]
[*]链接编辑：修改上标签名，下标签名会自动同步
[*]颜色选择器：点击 [c][color=#...][/c] 中的颜色值
[*]智能补全：输入 [c][[/c] 触发标签补全
[/list]
[/box]

[spoilerbox]
这是剧透框，标题固定为 "SPOILER"
适合隐藏游戏剧透、答案等敏感内容
[/spoilerbox]

[heading]🎮 osu! 论坛标签嵌套示例[/heading]

[centre]
[url=https://discord.gg/osu][img]https://p.sda1.dev/24/519a9b0cccd78e6b2baf7d385673d596/GcbaktIW4AAuuTF.jpeg[/img][/url]
[b][color=#5CF8EE]V[/color]ocaloid [color=#5CF8EE]A[/color]ppreciation [color=#5CF8EE]T[/color]eam[/b]
[size=85][url=https://discord.gg/osu]Join the Discord![/url][/size]
[/centre]
`,
    // Add more translations as needed
}
