export const zhTW = {
    common: {
        save: "儲存",
        cancel: "取消",
        confirm: "確認",
        delete: "刪除",
        edit: "編輯",
        loading: "載入中...",
    },
    drawer: {
        title: "設定",
        recentContents: "最近使用",
        language: "語言",
        editorTheme: "編輯器主題",
        selectTheme: "選擇主題",
        storageInfo: "儲存在 localStorage",
        template: "範本",
        renameContent: "重新命名",
        deleteContent: "刪除內容",
        deleteConfirmation: "您確定要刪除此內容嗎？此操作無法撤消。",
        emptyState: "尚無內容",
        createNew: "新建內容",
        profile: "的個人資料",
    },
    statusbar: {
        row: "行",
        column: "列",
        charsCount: "字元數",
        selectedCharsCount: "已選取",
    },
    oauthDropdown: {
        importProfile: "匯入個人資料",
        signOut: "登出",
        globalRanking: "全球排名",
        pp: "PP",
        loadError: "載入使用者資料失敗",
        loadErrorDesc: "載入您的個人資料資訊時發生錯誤。請檢查網路連線並重試。",
        retry: "重試",
    },
    toolbar: {
        format: "格式",
        media: "媒體",
        layout: "佈局",
        special: "特殊",
        osu: "osu!",
    },
    preview: {
        realtimePreview: "即時預覽",
    },
    bbcode: {
        bold: {
            label: "粗體",
            placeholder: "文字",
            documentation: "**粗體** - 使文字加粗顯示",
            detail: "BBCode 粗體標籤",
            hoverInfo: "**粗體標籤** - 使文字加粗顯示\n\n用法: `[b]文字[/b]`",
        },
        italic: {
            label: "斜體",
            placeholder: "文字",
            documentation: "**斜體** - 使文字斜體顯示",
            detail: "BBCode 斜體標籤",
            hoverInfo: "**斜體標籤** - 使文字斜體顯示\n\n用法: `[i]文字[/i]`",
        },
        underline: {
            label: "底線",
            placeholder: "文字",
            documentation: "**底線** - 為文字添加底線",
            detail: "BBCode 底線標籤",
            hoverInfo: "**底線標籤** - 為文字添加底線\n\n用法: `[u]文字[/u]`",
        },
        strikethrough: {
            label: "刪除線",
            placeholder: "文字",
            documentation: "**刪除線** - 為文字添加刪除線",
            detail: "BBCode 刪除線標籤",
            hoverInfo: "**刪除線標籤** - 為文字添加刪除線\n\n用法: `[s]文字[/s]`",
        },
        color: {
            label: "顏色",
            placeholder: "文字",
            documentation: "**文字顏色** - 設定文字顏色\n\n範例: `[color=#ff0000]紅色文字[/color]`",
            detail: "BBCode 顏色標籤",
            hoverInfo: "**顏色標籤** - 設定文字顏色\n\n用法: `[color=#ff0000]文字[/color]`",
        },
        size: {
            label: "大小",
            placeholder: "文字",
            documentation: "**文字大小** - 設定文字大小（百分比）\n\n範例: `[size=150]大號文字[/size]`",
            detail: "BBCode 大小標籤",
            hoverInfo: "**大小標籤** - 設定文字大小\n\n用法: `[size=100]文字[/size]`\n\n提示：只支援50, 85, 100, 150。100 為正常大小，150 為 1.5 倍",
        },
        url: {
            label: "連結",
            placeholder: "連結文字",
            documentation: "**超連結** - 建立可點擊的連結\n\n範例: `[url=https://osu.ppy.sh]訪問 osu![/url]`",
            detail: "BBCode 連結標籤",
            hoverInfo: "**連結標籤** - 建立超連結\n\n用法: `[url=位址]文字[/url]`",
        },
        img: {
            label: "圖片",
            placeholder: "https://example.com/image.jpg",
            documentation: "**圖片** - 插入圖片\n\n範例: `[img]https://example.com/logo.png[/img]`",
            detail: "BBCode 圖片標籤",
            hoverInfo: "**圖片標籤** - 插入圖片\n\n用法: `[img]圖片位址[/img]`",
        },
        centre: {
            label: "置中",
            placeholder: "置中文字",
            documentation: "**置中對齊** - 使文字置中顯示",
            detail: "BBCode 置中標籤",
            hoverInfo: "**置中標籤** - 文字置中對齊\n\n用法: `[centre]文字[/centre]`",
        },
        code: {
            label: "程式碼區塊",
            placeholder: "\n// 程式碼內容\n",
            documentation: "**程式碼區塊** - 顯示格式化的程式碼\n\n用於展示程式設計程式碼",
            detail: "BBCode 程式碼區塊標籤",
            hoverInfo: "**程式碼區塊標籤** - 顯示程式碼區塊\n\n用法: `[code]程式碼[/code]`",
        },
        inlineCode: {
            label: "行內程式碼",
            placeholder: "程式碼內容",
            documentation: "**行內程式碼** - 顯示行內程式碼\n\n用於展示程式設計程式碼",
            detail: "BBCode 行內程式碼標籤",
            hoverInfo: "**行內程式碼標籤** - 顯示行內程式碼\n\n用法: `[c]程式碼[/c]`",
        },
        quote: {
            label: "引用",
            placeholder: "引用內容",
            documentation: "**引用區塊** - 引用他人的話\n\n常用於回覆或引述\n\n可選語法: `[quote=作者]內容[/quote]`",
            detail: "BBCode 引用標籤",
            hoverInfo: "**引用標籤** - 顯示引用內容\n\n用法: `[quote]引用文字[/quote]`\n或: `[quote=作者]引用文字[/quote]`",
        },
        list: {
            label: "清單",
            placeholder: "[*]項目1\n[*]項目2\n[*]項目3",
            documentation: "**清單** - 建立清單\n\n使用 `[*]` 表示清單項目\n\n• `[list]` - 建立無序清單（項目符號）\n• `[list=TYPE]` - 建立有序清單（編號）",
            detail: "BBCode 清單標籤",
            hoverInfo: "**清單標籤** - 建立清單\n\n無序清單: `[list][*]項目1[*]項目2[/list]`\n\n有序清單(TYPE可以為任意值): `[list=TYPE][*]項目1[*]項目2[/list]`",
        },
        spoiler: {
            label: "隱藏",
            placeholder: "隱藏內容",
            documentation: "**隱藏內容** - 建立需要點擊才能檢視的內容\n\n常用於劇透警告",
            detail: "BBCode 隱藏標籤",
            hoverInfo: "**隱藏標籤** - 隱藏敏感內容\n\n用法: `[spoiler]隱藏的文字[/spoiler]`",
        },
        heading: {
            label: "標題",
            placeholder: "標題文字",
            documentation: "**標題** - osu! 論壇專用標題樣式\n\n建立醒目的章節標題",
            detail: "osu! 標題標籤",
            hoverInfo: "**標題標籤** - osu! 論壇標題樣式\n\n用法: `[heading]標題[/heading]`",
        },
        notice: {
            label: "提示框",
            placeholder: "提示內容",
            documentation: "**提示框** - osu! 論壇專用提示框\n\n顯示重要提示或警告資訊",
            detail: "osu! 提示框標籤",
            hoverInfo: "**提示框標籤** - osu! 論壇提示框\n\n用法: `[notice]提示內容[/notice]`",
        },
        box: {
            label: "摺疊框",
            placeholder: "摺疊的內容",
            documentation: "**摺疊框** - osu! 論壇專用摺疊框\n\n建立可展開/收起的內容區域\n\n範例: `[box=點擊展開]內容[/box]`",
            detail: "osu! 摺疊框標籤",
            hoverInfo: "**摺疊框標籤** - osu! 論壇摺疊框\n\n用法: `[box=標題]內容[/box]`",
        },
        profile: {
            label: "使用者",
            placeholder: "使用者名稱",
            documentation: "**使用者連結** - osu! 論壇使用者資料連結\n\n建立指向使用者主頁的連結\n\n範例: `[profile=2]peppy[/profile]`",
            detail: "osu! 使用者標籤",
            hoverInfo: "**使用者標籤** - osu! 使用者資料連結\n\n用法: `[profile=使用者ID]使用者名稱[/profile]`",
        },
        spoilerbox: {
            label: "劇透框",
            placeholder: "劇透內容",
            documentation: "**劇透框** - osu! 論壇專用劇透框\n\n建立固定標題為 SPOILER 的摺疊框\n\n範例: `[spoilerbox]劇透內容[/spoilerbox]`",
            detail: "osu! 劇透框標籤",
            hoverInfo: "**劇透框標籤** - osu! 論壇劇透框\n\n用法: `[spoilerbox]內容[/spoilerbox]`\n\n劇透框的標題固定為 SPOILER",
        },
        email: {
            label: "電子郵件",
            placeholder: "Sisy",
            documentation: "**電子郵件** - 電子郵件連結\n\n建立觸發瀏覽器mailto功能的電子郵件連結\n\n範例: `[email=test@gmail.com]Your email name[/email]`",
            detail: "osu! 電子郵件標籤",
            hoverInfo: "**電子郵件標籤** - 電子郵件連結\n\n用法: `[email=電子郵件位址]顯示內容[/email]`",
        },
        youtube: {
            label: "YouTube",
            placeholder: "",
            documentation: "**YouTube** - youtube影片\n\n用於嵌入 YouTube 影片\n\n範例: `[youtube]Ef6zwIR44Ww[/youtube]`",
            detail: "osu! YouTube 標籤",
            hoverInfo: "**YouTube 標籤** - youtube影片\n\n用法: `[youtube]影片ID[/youtube]`",
        },
        audio: {
            label: "音訊",
            placeholder: "",
            documentation: "**音訊** - 音訊\n\n用於嵌入可播放的音訊\n\n範例: `[audio]https://example.com/audiofile[/audio]`",
            detail: "osu! 音訊 標籤",
            hoverInfo: "**音訊 標籤** - 音訊\n\n用法: `[audio]音訊URL（須對osu可用）[/audio]`",
        },
        imagemap: {
            label: "Imagemap",
            placeholder: "",
            documentation: "**Imagemap** - Imagemap\n\n用於添加各個分區可跳轉的圖片\n\n範例: `[imagemap]https://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/21242012\n\n70 8 30 7 https://osu.ppy.sh/users/27608705\n\n0 16 20 7 https://osu.ppy.sh/users/9650376\n\n22 12 20 7 https://osu.ppy.sh/users/35628968[/imagemap]`",
            detail: "osu! Imagemap 標籤",
            hoverInfo: "**Imagemap 標籤** - Imagemap\n\n用法: \n\n[imagemap]\n\nhttps://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/1\n\n70 8 30 7 https://osu.ppy.sh/users/2\n\n0 16 20 7 https://osu.ppy.sh/users/3\n\n22 12 20 7 https://osu.ppy.sh/users/4\n\n[/imagemap]",
        },
    },
    defaultContent: `[centre]
[size=150][b]🎨 歡迎使用 MOBE[/b][/size]
[size=85][i]專為 osu! 論壇設計的現代化 BBCode 編輯器[/i][/size]
[/centre]

[heading]✨ 編輯器特性[/heading]

[notice]
本編輯器支援完整的 osu! 論壇 BBCode 語法，包括語法高亮、智慧補全、顏色選擇器和即時預覽。
[/notice]

[heading]📝 文字格式[/heading]

[b]粗體文字[/b] [i]斜體文字[/i] [u]底線文字[/u] [s]刪除線文字[/s]

[b]組合使用：[/b][b][i][u]粗體+斜體+底線[/u][/i][/b]

[heading]🎨 顏色和大小[/heading]

[color=#ff6b6b]紅色[/color] [color=#4ecdc4]青色[/color] [color=#95e1d3]薄荷綠[/color] [color=#f38181]粉紅[/color] [color=#d9a6bd]osu! 粉[/color]

[size=50]小號文字 (50%)[/size]
[size=85]較小文字 (85%)[/size]
[size=100]正常文字 (100%)[/size]
[size=150]大號文字 (150%)[/size]

[heading]🔗 連結與媒體[/heading]

檢視使用者資料：[profile=35628968]SisypheOvO[/profile] 的主頁

嵌入imagemap：

[imagemap]
https://sisy.s-ul.eu/UWlCIYOX
53 30 40 60 https://osu.ppy.sh/users/35628968 Sisy
30 70 15 28 https://osu.ppy.sh/users/27608705 MarioKartya
18 70 12 28 https://osu.ppy.sh/users/9650376 Robinia
[/imagemap]

電子郵件連結：[email=test@gmail.com]Sisy 的電子郵件[/email]

嵌入音訊：

[audio]https://raw.githubusercontent.com/ZnCookie/osu-profile/refs/heads/main/music.opus[/audio]

嵌入YouTube影片：

[youtube]Ef6zwIR44Ww[/youtube]

[heading]💬 引用與程式碼[/heading]

[quote="peppy"]
這是來自 peppy 的引用
支援帶作者名的引用
[/quote]

[quote]
這是普通引用區塊
無作者署名
[/quote]

程式碼區塊範例：

[code]
function clickCircles() {
    const timing = calculateTiming();
    if (timing.perfect) {
        score += 300;
    }
}
[/code]

行內程式碼：使用 [c]console.log()[/c] 來除錯，或者檢查 [c]beatmap.difficulty[/c] 屬性。

[heading]📋 清單[/heading]

[b]無序清單（預設）：[/b]
[list]
[*]Standard 模式
[*]Taiko 模式
[*]Catch 模式
[*]Mania 模式
[/list]

[b]有序清單（使用 list=1）：[/b]
[list=1]
[*]下載 Beatmap
[*]匯入到 osu!
[*]開始遊玩
[*]上傳成績
[/list]

[heading]👁️ 隱藏與摺疊[/heading]

行內隱藏：這是 [spoiler]隱藏的文字內容[/spoiler]，滑鼠懸停檢視。

[box=點擊展開：技巧與訣竅]
[b]編輯器快捷鍵：[/b]
[list]
[*][b]Ctrl+B[/b] - 粗體
[*][b]Ctrl+I[/b] - 斜體
[*][b]Ctrl+U[/b] - 底線
[*][b]Ctrl+K[/b] - 插入連結
[/list]

[b]特殊功能：[/b]
[list]
[*]連結編輯：修改上標籤名，下標籤名會自動同步
[*]顏色選擇器：點擊 [c][color=#...][/c] 中的顏色值
[*]智慧補全：輸入 [c][[/c] 觸發標籤補全
[/list]
[/box]

[spoilerbox]
這是劇透框，標題固定為 "SPOILER"
適合隱藏遊戲劇透、答案等敏感內容
[/spoilerbox]

[heading]🎮 osu! 論壇標籤巢狀範例[/heading]

[centre]
[url=https://discord.gg/osu][img]https://p.sda1.dev/24/519a9b0cccd78e6b2baf7d385673d596/GcbaktIW4AAuuTF.jpeg[/img][/url]
[b][color=#5CF8EE]V[/color]ocaloid [color=#5CF8EE]A[/color]ppreciation [color=#5CF8EE]T[/color]eam[/b]
[size=85][url=https://discord.gg/osu]Join the Discord![/url][/size]
[/centre]
`,
    // Add more translations as needed
}
