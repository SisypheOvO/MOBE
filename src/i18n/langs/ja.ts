export const ja = {
    common: {
        save: "保存",
        cancel: "キャンセル",
        confirm: "確認",
        delete: "削除",
        edit: "編集",
        loading: "インポート中...",
    },
    drawer: {
        title: "設定",
        recentContents: "最近の項目",
        language: "言語",
        editorTheme: "エディタのテーマ",
        selectTheme: "テーマを選択",
        storageInfo: "localStorageに保存されています",
        template: "テンプレート",
        renameContent: "名前を変更",
        deleteContent: "コンテンツを削除",
        deleteConfirmation: "このコンテンツを削除してもよろしいですか？この操作は元に戻せません。",
        emptyState: "まだコンテンツがありません",
        createNew: "新しいコンテンツ",
        profile: "のプロフィール",
    },
    statusbar: {
        row: "行",
        column: "列",
        charsCount: "文字数",
        selectedCharsCount: "選択済み文字数",
    },
    oauthDropdown: {
        importProfile: "プロフィールをインポート",
        signOut: "サインアウト",
        globalRanking: "世界ランキング",
        pp: "PP",
        loadError: "ユーザーデータのインポートに失敗しました",
        loadErrorDesc: "プロフィール情報のインポート中にエラーが発生しました。ネットワーク接続を確認して、もう一度お試しください。",
        retry: "再試行",
    },
    toolbar: {
        format: "書式",
        media: "メディア",
        layout: "レイアウト",
        special: "特殊",
        osu: "osu!",
    },
    preview: {
        realtimePreview: "リアルタイムプレビュー",
    },
    bbcode: {
        bold: {
            label: "太字",
            placeholder: "テキスト",
            documentation: "**太字** - テキストを太字にします",
            detail: "BBCode 太字タグ",
            hoverInfo: "**太字タグ** - テキストを太字にします\n\n使用法: `[b]テキスト[/b]`",
        },
        italic: {
            label: "斜体",
            placeholder: "テキスト",
            documentation: "**斜体** - テキストを斜体にします",
            detail: "BBCode 斜体タグ",
            hoverInfo: "**斜体タグ** - テキストを斜体にします\n\n使用法: `[i]テキスト[/i]`",
        },
        underline: {
            label: "下線",
            placeholder: "テキスト",
            documentation: "**下線** - テキストに下線を追加します",
            detail: "BBCode 下線タグ",
            hoverInfo: "**下線タグ** - テキストに下線を追加します\n\n使用法: `[u]テキスト[/u]`",
        },
        strikethrough: {
            label: "取り消し線",
            placeholder: "テキスト",
            documentation: "**取り消し線** - テキストに取り消し線を追加します",
            detail: "BBCode 取り消し線タグ",
            hoverInfo: "**取り消し線タグ** - テキストに取り消し線を追加します\n\n使用法: `[s]テキスト[/s]`",
        },
        color: {
            label: "色",
            placeholder: "テキスト",
            documentation: "**文字色** - 文字の色を設定します\n\n例: `[color=#ff0000]赤い文字[/color]`",
            detail: "BBCode 色タグ",
            hoverInfo: "**色タグ** - 文字の色を設定します\n\n使用法: `[color=#ff0000]テキスト[/color]`",
        },
        size: {
            label: "サイズ",
            placeholder: "テキスト",
            documentation: "**文字サイズ** - 文字のサイズを設定します（パーセンテージ）\n\n例: `[size=150]大きな文字[/size]`",
            detail: "BBCode サイズタグ",
            hoverInfo: "**サイズタグ** - 文字のサイズを設定します\n\n使用法: `[size=100]テキスト[/size]`\n\nヒント：50、85、100、150のみをサポートしています。100が通常サイズ、150が1.5倍",
        },
        url: {
            label: "リンク",
            placeholder: "リンクテキスト",
            documentation: "**ハイパーリンク** - クリック可能なリンクを作成します\n\n例: `[url=https://osu.ppy.sh]osu!にアクセス[/url]`",
            detail: "BBCode リンクタグ",
            hoverInfo: "**リンクタグ** - ハイパーリンクを作成します\n\n使用法: `[url=アドレス]テキスト[/url]`",
        },
        img: {
            label: "画像",
            placeholder: "https://example.com/image.jpg",
            documentation: "**画像** - 画像を挿入します\n\n例: `[img]https://example.com/logo.png[/img]`",
            detail: "BBCode 画像タグ",
            hoverInfo: "**画像タグ** - 画像を挿入します\n\n使用法: `[img]画像URL[/img]`",
        },
        centre: {
            label: "中央揃え",
            placeholder: "中央揃えテキスト",
            documentation: "**中央揃え** - テキストを中央に配置します",
            detail: "BBCode 中央揃えタグ",
            hoverInfo: "**中央揃えタグ** - テキストを中央揃えにします\n\n使用法: `[centre]テキスト[/centre]`",
        },
        code: {
            label: "コードブロック",
            placeholder: "\n// コード内容\n",
            documentation: "**コードブロック** - フォーマットされたコードを表示します\n\nプログラミングコードの表示に使用します",
            detail: "BBCode コードブロックタグ",
            hoverInfo: "**コードブロックタグ** - コードブロックを表示します\n\n使用法: `[code]コード[/code]`",
        },
        inlineCode: {
            label: "インラインコード",
            placeholder: "コード内容",
            documentation: "**インラインコード** - インラインコードを表示します\n\nプログラミングコードの表示に使用します",
            detail: "BBCode インラインコードタグ",
            hoverInfo: "**インラインコードタグ** - インラインコードを表示します\n\n使用法: `[c]コード[/c]`",
        },
        quote: {
            label: "引用",
            placeholder: "引用内容",
            documentation: "**引用ブロック** - 他人の言葉を引用します\n\n返信や引用によく使用されます\n\nオプション構文: `[quote=著者]内容[/quote]`",
            detail: "BBCode 引用タグ",
            hoverInfo: "**引用タグ** - 引用内容を表示します\n\n使用法: `[quote]引用テキスト[/quote]`\nまたは: `[quote=著者]引用テキスト[/quote]`",
        },
        list: {
            label: "リスト",
            placeholder: "[*]項目1\n[*]項目2\n[*]項目3",
            documentation: "**リスト** - リストを作成します\n\n`[*]` でリスト項目を表します\n\n• `[list]` - 箇条書きリストを作成します\n• `[list=TYPE]` - 番号付きリストを作成します",
            detail: "BBCode リストタグ",
            hoverInfo: "**リストタグ** - リストを作成します\n\n箇条書きリスト: `[list][*]項目1[*]項目2[/list]`\n\n番号付きリスト(TYPEは任意の値): `[list=TYPE][*]項目1[*]項目2[/list]`",
        },
        spoiler: {
            label: "隠す",
            placeholder: "隠された内容",
            documentation: "**隠された内容** - クリックして表示する内容を作成します\n\nネタバレ警告によく使用されます",
            detail: "BBCode 隠すタグ",
            hoverInfo: "**隠すタグ** - 機密コンテンツを隠します\n\n使用法: `[spoiler]隠されたテキスト[/spoiler]`",
        },
        heading: {
            label: "見出し",
            placeholder: "見出しテキスト",
            documentation: "**見出し** - osu!フォーラム専用の見出しスタイル\n\n目立つセクション見出しを作成します",
            detail: "osu! 見出しタグ",
            hoverInfo: "**見出しタグ** - osu!フォーラムの見出しスタイル\n\n使用法: `[heading]見出し[/heading]`",
        },
        notice: {
            label: "お知らせボックス",
            placeholder: "お知らせ内容",
            documentation: "**お知らせボックス** - osu!フォーラム専用のお知らせボックス\n\n重要なお知らせや警告を表示します",
            detail: "osu! お知らせボックスタグ",
            hoverInfo: "**お知らせボックスタグ** - osu!フォーラムのお知らせボックス\n\n使用法: `[notice]お知らせ内容[/notice]`",
        },
        box: {
            label: "折りたたみボックス",
            placeholder: "折りたたまれた内容",
            documentation: "**折りたたみボックス** - osu!フォーラム専用の折りたたみボックス\n\n展開/折りたたみ可能なコンテンツエリアを作成します\n\n例: `[box=クリックして展開]内容[/box]`",
            detail: "osu! ボックスタグ",
            hoverInfo: "**ボックスタグ** - osu!フォーラムの折りたたみボックス\n\n使用法: `[box=タイトル]内容[/box]`",
        },
        profile: {
            label: "ユーザー",
            placeholder: "ユーザー名",
            documentation: "**ユーザーリンク** - osu!フォーラムのユーザープロフィールリンク\n\nユーザーのホームページへのリンクを作成します\n\n例: `[profile=2]peppy[/profile]`",
            detail: "osu! ユーザータグ",
            hoverInfo: "**ユーザータグ** - osu!ユーザープロフィールリンク\n\n使用法: `[profile=ユーザーID]ユーザー名[/profile]`",
        },
        spoilerbox: {
            label: "ネタバレボックス",
            placeholder: "ネタバレ内容",
            documentation: "**ネタバレボックス** - osu!フォーラム専用のネタバレボックス\n\nSPOILERという固定タイトルの折りたたみボックスを作成します\n\n例: `[spoilerbox]ネタバレ内容[/spoilerbox]`",
            detail: "osu! ネタバレボックスタグ",
            hoverInfo: "**ネタバレボックスタグ** - osu!フォーラムのネタバレボックス\n\n使用法: `[spoilerbox]内容[/spoilerbox]`\n\nタイトルはSPOILERに固定されています",
        },
        email: {
            label: "メール",
            placeholder: "Sisy",
            documentation: "**メール** - メールリンク\n\nブラウザのmailto機能を起動するメールリンクを作成します\n\n例: `[email=test@gmail.com]メール名[/email]`",
            detail: "osu! メールタグ",
            hoverInfo: "**メールタグ** - メールリンク\n\n使用法: `[email=メールアドレス]表示テキスト[/email]`",
        },
        youtube: {
            label: "YouTube",
            placeholder: "",
            documentation: "**YouTube** - YouTube動画\n\nYouTube動画を埋め込みます\n\n例: `[youtube]Ef6zwIR44Ww[/youtube]`",
            detail: "osu! YouTubeタグ",
            hoverInfo: "**YouTubeタグ** - YouTube動画\n\n使用法: `[youtube]動画ID[/youtube]`",
        },
        audio: {
            label: "オーディオ",
            placeholder: "",
            documentation: "**オーディオ** - オーディオ\n\n再生可能なオーディオを埋め込みます\n\n例: `[audio]https://example.com/audiofile[/audio]`",
            detail: "osu! オーディオタグ",
            hoverInfo: "**オーディオタグ** - オーディオ\n\n使用法: `[audio]オーディオURL（osu!でアクセス可能である必要があります）[/audio]`",
        },
        imagemap: {
            label: "イメージマップ",
            placeholder: "",
            documentation: "**イメージマップ** - イメージマップ\n\nクリック可能な領域のある画像を追加します\n\n例: `[imagemap]https://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/21242012\n\n70 8 30 7 https://osu.ppy.sh/users/27608705\n\n0 16 20 7 https://osu.ppy.sh/users/9650376\n\n22 12 20 7 https://osu.ppy.sh/users/35628968[/imagemap]`",
            detail: "osu! イメージマップタグ",
            hoverInfo: "**イメージマップタグ** - イメージマップ\n\n使用法: \n\n[imagemap]\n\nhttps://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/1\n\n70 8 30 7 https://osu.ppy.sh/users/2\n\n0 16 20 7 https://osu.ppy.sh/users/3\n\n22 12 20 7 https://osu.ppy.sh/users/4\n\n[/imagemap]",
        },
    },
    defaultContent: `[centre]
[size=150][b]🎨 MOBEへようこそ[/b][/size]
[size=85][i]osu!フォーラムのための現代的なBBCodeエディター[/i][/size]
[/centre]

[heading]✨ エディタ機能[/heading]

[notice]
このエディターは、シンタックスハイライト、スマート補完、カラーピッカー、リアルタイムプレビューを含む、osu!フォーラムの完全なBBCode構文をサポートしています。
[/notice]

[heading]📝 テキスト書式[/heading]

[b]太字テキスト[/b] [i]斜体テキスト[/i] [u]下線テキスト[/u] [s]取り消し線テキスト[/s]

[b]組み合わせ：[/b][b][i][u]太字+斜体+下線[/u][/i][/b]

[heading]🎨 色とサイズ[/heading]

[color=#ff6b6b]赤[/color] [color=#4ecdc4]シアン[/color] [color=#95e1d3]ミントグリーン[/color] [color=#f38181]ピンク[/color] [color=#d9a6bd]osu! ピンク[/color]

[size=50]小さいテキスト (50%)[/size]
[size=85]やや小さいテキスト (85%)[/size]
[size=100]通常テキスト (100%)[/size]
[size=150]大きいテキスト (150%)[/size]

[heading]🔗 リンクとメディア[/heading]

ユーザープロフィールを表示：[profile=35628968]SisypheOvO[/profile]のホームページ

imagemapを埋め込む：

[imagemap]
https://sisy.s-ul.eu/UWlCIYOX
53 30 40 60 https://osu.ppy.sh/users/35628968 Sisy
30 70 15 28 https://osu.ppy.sh/users/27608705 MarioKartya
18 70 12 28 https://osu.ppy.sh/users/9650376 Robinia
[/imagemap]

メールリンク：[email=test@gmail.com]Sisyのメール[/email]

オーディオを埋め込む：

[audio]https://raw.githubusercontent.com/ZnCookie/osu-profile/refs/heads/main/music.opus[/audio]

YouTube動画を埋め込む：

[youtube]Ef6zwIR44Ww[/youtube]

[heading]💬 引用とコード[/heading]

[quote="peppy"]
これはpeppyからの引用です
著者名付きの引用をサポートしています
[/quote]

[quote]
これは通常の引用ブロックです
著者の署名なし
[/quote]

コードブロックの例：

[code]
function clickCircles() {
    const timing = calculateTiming();
    if (timing.perfect) {
        score += 300;
    }
}
[/code]

インラインコード：デバッグには [c]console.log()[/c] を使用するか、[c]beatmap.difficulty[/c] プロパティを確認してください。

[heading]📋 リスト[/heading]

[b]箇条書きリスト（デフォルト）：[/b]
[list]
[*]Standardモード
[*]Taikoモード
[*]Catchモード
[*]Maniaモード
[/list]

[b]番号付きリスト（list=1を使用）：[/b]
[list=1]
[*]Beatmapをダウンロード
[*]osu!にインポート
[*]プレイ開始
[*]スコアをアップロード
[/list]

[heading]👁️ ネタバレと折りたたみ[/heading]

インラインネタバレ：これは [spoiler]隠されたテキスト内容[/spoiler] です。ホバーして表示します。

[box=クリックして展開：ヒントとコツ]
[b]エディターショートカット：[/b]
[list]
[*][b]Ctrl+B[/b] - 太字
[*][b]Ctrl+I[/b] - 斜体
[*][b]Ctrl+U[/b] - 下線
[*][b]Ctrl+K[/b] - リンク挿入
[/list]

[b]特殊機能：[/b]
[list]
[*]リンク編輯：開始タグ名を変更すると、終了タグが自動的に同期します
[*]カラーピッカー：[c][color=#...][/c]の色の値をクリックします
[*]スマート補完：[c][[/c]と入力してタグ補完をトリガーします
[/list]
[/box]

[spoilerbox]
これは固定タイトル「SPOILER」のネタバレボックスです
ゲームのネタバレ、答え、その他の機密コンテンツを隠すのに適しています
[/spoilerbox]

[heading]🎮 osu!フォーラムタグのネスト例[/heading]

[centre]
[url=https://discord.gg/osu][img]https://p.sda1.dev/24/519a9b0cccd78e6b2baf7d385673d596/GcbaktIW4AAuuTF.jpeg[/img][/url]
[b][color=#5CF8EE]V[/color]ocaloid [color=#5CF8EE]A[/color]ppreciation [color=#5CF8EE]T[/color]eam[/b]
[size=85][url=https://discord.gg/osu]Join the Discord![/url][/size]
[/centre]
`,
    // Add more translations as needed
}
