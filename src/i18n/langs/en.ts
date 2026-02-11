export const en = {
    common: {
        save: "Save",
        cancel: "Cancel",
        confirm: "Confirm",
        delete: "Delete",
        edit: "Edit",
        loading: "Loading...",
    },
    drawer: {
        title: "Settings",
        recentContents: "Recents",
        language: "Language",
        editorTheme: "Editor Theme",
        selectTheme: "Select a theme",
        storageInfo: "Stored in localStorage",
        template: "Template",
        renameContent: "Rename",
        deleteContent: "Delete Content",
        deleteConfirmation: "Are you sure you want to delete this content? This action cannot be undone.",
        emptyState: "No contents yet",
        createNew: "New Content",
        profile: "'s Profile",
    },
    statusbar: {
        row: "Row",
        column: "Col",
        charsCount: "Chars",
        selectedCharsCount: "Selected",
    },
    oauthDropdown: {
        importProfile: "Import Profile",
        signOut: "Sign Out",
        globalRanking: "Global Ranking",
        pp: "PP",
        loadError: "Failed to load user data",
        loadErrorDesc: "There was an error loading your profile information. Please check your network connection and try again.",
        retry: "Retry",
    },
    toolbar: {
        format: "format",
        media: "media",
        layout: "layout",
        special: "special",
        osu: "osu!",
    },
    preview: {
        realtimePreview: "Realtime Preview",
    },
    bbcode: {
        bold: {
            label: "Bold",
            placeholder: "text",
            documentation: "**Bold** - Make text bold",
            detail: "BBCode bold tag",
            hoverInfo: "**Bold tag** - Make text bold\n\nUsage: `[b]text[/b]`",
        },
        italic: {
            label: "Italic",
            placeholder: "text",
            documentation: "**Italic** - Make text italic",
            detail: "BBCode italic tag",
            hoverInfo: "**Italic tag** - Make text italic\n\nUsage: `[i]text[/i]`",
        },
        underline: {
            label: "Underline",
            placeholder: "text",
            documentation: "**Underline** - Add underline to text",
            detail: "BBCode underline tag",
            hoverInfo: "**Underline tag** - Add underline to text\n\nUsage: `[u]text[/u]`",
        },
        strikethrough: {
            label: "Strikethrough",
            placeholder: "text",
            documentation: "**Strikethrough** - Add strikethrough to text",
            detail: "BBCode strikethrough tag",
            hoverInfo: "**Strikethrough tag** - Add strikethrough to text\n\nUsage: `[s]text[/s]`",
        },
        color: {
            label: "Color",
            placeholder: "text",
            documentation: "**Text Color** - Set text color\n\nExample: `[color=#ff0000]red text[/color]`",
            detail: "BBCode color tag",
            hoverInfo: "**Color tag** - Set text color\n\nUsage: `[color=#ff0000]text[/color]`",
        },
        size: {
            label: "Size",
            placeholder: "text",
            documentation: "**Text Size** - Set text size (percentage)\n\nExample: `[size=150]large text[/size]`",
            detail: "BBCode size tag",
            hoverInfo: "**Size tag** - Set text size\n\nUsage: `[size=100]text[/size]`\n\nNote: Only supports 50, 85, 100, 150. 100 is normal size, 150 is 1.5x",
        },
        url: {
            label: "Link",
            placeholder: "link text",
            documentation: "**Hyperlink** - Create clickable link\n\nExample: `[url=https://osu.ppy.sh]Visit osu![/url]`",
            detail: "BBCode link tag",
            hoverInfo: "**Link tag** - Create hyperlink\n\nUsage: `[url=address]text[/url]`",
        },
        img: {
            label: "Image",
            placeholder: "https://example.com/image.jpg",
            documentation: "**Image** - Insert image\n\nExample: `[img]https://example.com/logo.png[/img]`",
            detail: "BBCode image tag",
            hoverInfo: "**Image tag** - Insert image\n\nUsage: `[img]image URL[/img]`",
        },
        centre: {
            label: "Centre",
            placeholder: "centered text",
            documentation: "**Center Align** - Center text",
            detail: "BBCode centre tag",
            hoverInfo: "**Centre tag** - Center align text\n\nUsage: `[centre]text[/centre]`",
        },
        code: {
            label: "Code Block",
            placeholder: "\n// code content\n",
            documentation: "**Code Block** - Display formatted code\n\nUsed to display programming code",
            detail: "BBCode code block tag",
            hoverInfo: "**Code block tag** - Display code block\n\nUsage: `[code]code[/code]`",
        },
        inlineCode: {
            label: "Inline Code",
            placeholder: "code content",
            documentation: "**Inline Code** - Display inline code\n\nUsed to display programming code",
            detail: "BBCode inline code tag",
            hoverInfo: "**Inline code tag** - Display inline code\n\nUsage: `[c]code[/c]`",
        },
        quote: {
            label: "Quote",
            placeholder: "quote content",
            documentation: "**Quote Block** - Quote someone's words\n\nCommonly used for replies or citations\n\nOptional syntax: `[quote=author]content[/quote]`",
            detail: "BBCode quote tag",
            hoverInfo: "**Quote tag** - Display quoted content\n\nUsage: `[quote]quoted text[/quote]`\nor: `[quote=author]quoted text[/quote]`",
        },
        list: {
            label: "List",
            placeholder: "[*]item 1\n[*]item 2\n[*]item 3",
            documentation: "**List** - Create list\n\nUse `[*]` for list items\n\n• `[list]` - Create unordered list (bullets)\n• `[list=TYPE]` - Create ordered list (numbers)",
            detail: "BBCode list tag",
            hoverInfo: "**List tag** - Create list\n\nUnordered list: `[list][*]item 1[*]item 2[/list]`\n\nOrdered list (TYPE can be any value): `[list=TYPE][*]item 1[*]item 2[/list]`",
        },
        spoiler: {
            label: "Spoiler",
            placeholder: "hidden content",
            documentation: "**Spoiler Content** - Create content that requires click to view\n\nCommonly used for spoiler warnings",
            detail: "BBCode spoiler tag",
            hoverInfo: "**Spoiler tag** - Hide sensitive content\n\nUsage: `[spoiler]hidden text[/spoiler]`",
        },
        heading: {
            label: "Heading",
            placeholder: "heading text",
            documentation: "**Heading** - osu! forum heading style\n\nCreate prominent section headings",
            detail: "osu! heading tag",
            hoverInfo: "**Heading tag** - osu! forum heading style\n\nUsage: `[heading]heading[/heading]`",
        },
        notice: {
            label: "Notice",
            placeholder: "notice content",
            documentation: "**Notice Box** - osu! forum notice box\n\nDisplay important notices or warnings",
            detail: "osu! notice box tag",
            hoverInfo: "**Notice box tag** - osu! forum notice box\n\nUsage: `[notice]notice content[/notice]`",
        },
        box: {
            label: "Box",
            placeholder: "collapsed content",
            documentation: "**Collapsible Box** - osu! forum collapsible box\n\nCreate expandable/collapsible content area\n\nExample: `[box=Click to expand]content[/box]`",
            detail: "osu! box tag",
            hoverInfo: "**Box tag** - osu! forum collapsible box\n\nUsage: `[box=title]content[/box]`",
        },
        profile: {
            label: "User",
            placeholder: "username",
            documentation: "**User Link** - osu! forum user profile link\n\nCreate link to user homepage\n\nExample: `[profile=2]peppy[/profile]`",
            detail: "osu! user tag",
            hoverInfo: "**User tag** - osu! user profile link\n\nUsage: `[profile=user ID]username[/profile]`",
        },
        spoilerbox: {
            label: "Spoilerbox",
            placeholder: "spoiler content",
            documentation: "**Spoilerbox** - osu! forum spoilerbox\n\nCreate collapsible box with fixed title SPOILER\n\nExample: `[spoilerbox]spoiler content[/spoilerbox]`",
            detail: "osu! spoilerbox tag",
            hoverInfo: "**Spoilerbox tag** - osu! forum spoilerbox\n\nUsage: `[spoilerbox]content[/spoilerbox]`\n\nThe title is fixed as SPOILER",
        },
        email: {
            label: "Email",
            placeholder: "Sisy",
            documentation: "**Email** - Email link\n\nCreate email link that triggers browser mailto function\n\nExample: `[email=test{'@'}gmail.com]Your email name[/email]`",
            detail: "osu! email tag",
            hoverInfo: "**Email tag** - Email link\n\nUsage: `[email=email address]display text[/email]`",
        },
        youtube: {
            label: "YouTube",
            placeholder: "",
            documentation: "**YouTube** - YouTube video\n\nEmbed YouTube video\n\nExample: `[youtube]Ef6zwIR44Ww[/youtube]`",
            detail: "osu! YouTube tag",
            hoverInfo: "**YouTube tag** - YouTube video\n\nUsage: `[youtube]video ID[/youtube]`",
        },
        audio: {
            label: "Audio",
            placeholder: "",
            documentation: "**Audio** - Audio\n\nEmbed playable audio\n\nExample: `[audio]https://example.com/audiofile[/audio]`",
            detail: "osu! audio tag",
            hoverInfo: "**Audio tag** - Audio\n\nUsage: `[audio]audio URL (must be accessible to osu)[/audio]`",
        },
        imagemap: {
            label: "Imagemap",
            placeholder: "",
            documentation: "**Imagemap** - Imagemap\n\nAdd image with clickable regions\n\nExample: `[imagemap]https://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/21242012\n\n70 8 30 7 https://osu.ppy.sh/users/27608705\n\n0 16 20 7 https://osu.ppy.sh/users/9650376\n\n22 12 20 7 https://osu.ppy.sh/users/35628968[/imagemap]`",
            detail: "osu! Imagemap tag",
            hoverInfo: "**Imagemap tag** - Imagemap\n\nUsage: \n\n[imagemap]\n\nhttps://test.com/example.jpg\n\n45 16 25 7 https://osu.ppy.sh/users/1\n\n70 8 30 7 https://osu.ppy.sh/users/2\n\n0 16 20 7 https://osu.ppy.sh/users/3\n\n22 12 20 7 https://osu.ppy.sh/users/4\n\n[/imagemap]",
        },
    },
    defaultContent: `[centre]
[size=150][b]🎨 Welcome to MOBE[/b][/size]
[size=85][i]A modern BBCode editor designed for osu! forum[/i][/size]
[/centre]

[heading]✨ Editor Features[/heading]

[notice]
This editor supports the full osu! forum BBCode syntax, including syntax highlighting, smart completion, color picker, and real-time preview.
[/notice]

[heading]📝 Text Formatting[/heading]

[b]Bold text[/b] [i]Italic text[/i] [u]Underlined text[/u] [s]Strikethrough text[/s]

[b]Combined:[/b][b][i][u]Bold+Italic+Underline[/u][/i][/b]

[heading]🎨 Colors and Sizes[/heading]

[color=#ff6b6b]Red[/color] [color=#4ecdc4]Cyan[/color] [color=#95e1d3]Mint Green[/color] [color=#f38181]Pink[/color] [color=#d9a6bd]osu! Pink[/color]

[size=50]Small text (50%)[/size]
[size=85]Smaller text (85%)[/size]
[size=100]Normal text (100%)[/size]
[size=150]Large text (150%)[/size]

[heading]🔗 Links and Media[/heading]

View user profile: [profile=35628968]SisypheOvO[/profile]'s homepage

Embed imagemap:

[imagemap]
https://sisy.s-ul.eu/UWlCIYOX
53 30 40 60 https://osu.ppy.sh/users/35628968 Sisy
30 70 15 28 https://osu.ppy.sh/users/27608705 MarioKartya
18 70 12 28 https://osu.ppy.sh/users/9650376 Robinia
[/imagemap]

Email link: [email=test{'@'}gmail.com]Sisy's email[/email]

Embed audio:

[audio]https://raw.githubusercontent.com/ZnCookie/osu-profile/refs/heads/main/music.opus[/audio]

Embed YouTube video:

[youtube]Ef6zwIR44Ww[/youtube]

[heading]💬 Quotes and Code[/heading]

[quote="peppy"]
This is a quote from peppy
Supports quotes with author names
[/quote]

[quote]
This is a regular quote block
Without author attribution
[/quote]

Code block example:

[code]
function clickCircles() {'{'}
    const timing = calculateTiming();
    if (timing.perfect) {'{'}
        score += 300;
    {'}'}
{'}'}
[/code]

Inline code: Use [c]console.log()[/c] for debugging, or check the [c]beatmap.difficulty[/c] property.

[heading]📋 Lists[/heading]

[b]Unordered list (default):[/b]
[list]
[*]Standard mode
[*]Taiko mode
[*]Catch mode
[*]Mania mode
[/list]

[b]Ordered list (using list=1):[/b]
[list=1]
[*]Download Beatmap
[*]Import to osu!
[*]Start playing
[*]Upload score
[/list]

[heading]👁️ Spoilers and Collapsibles[/heading]

Inline spoiler: This is [spoiler]hidden text content[/spoiler], hover to view.

[box=Click to expand: Tips and Tricks]
[b]Editor shortcuts:[/b]
[list]
[*][b]Ctrl+B[/b] - Bold
[*][b]Ctrl+I[/b] - Italic
[*][b]Ctrl+U[/b] - Underline
[*][b]Ctrl+K[/b] - Insert link
[/list]

[b]Special features:[/b]
[list]
[*]Linked editing: Modify opening tag name, closing tag syncs automatically
[*]Color picker: Click on color value in [c][color=#...][/c]
[*]Smart completion: Type [c][[/c] to trigger tag completion
[/list]
[/box]

[spoilerbox]
This is a spoilerbox with fixed title "SPOILER"
Suitable for hiding game spoilers, answers, and other sensitive content
[/spoilerbox]

[heading]🎮 osu! Forum Tag Nesting Example[/heading]

[centre]
[url=https://discord.gg/osu][img]https://p.sda1.dev/24/519a9b0cccd78e6b2baf7d385673d596/GcbaktIW4AAuuTF.jpeg[/img][/url]
[b][color=#5CF8EE]V[/color]ocaloid [color=#5CF8EE]A[/color]ppreciation [color=#5CF8EE]T[/color]eam[/b]
[size=85][url=https://discord.gg/osu]Join the Discord![/url][/size]
[/centre]
`,
    // Add more translations as needed
}
