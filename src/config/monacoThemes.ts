import type * as monaco from "monaco-editor"

// Import themes from monaco-themes
import DraculaTheme from "monaco-themes/themes/Dracula.json"
import MonokaiTheme from "monaco-themes/themes/Monokai.json"
import GithubTheme from "monaco-themes/themes/GitHub.json"
import GithubDarkTheme from "monaco-themes/themes/GitHub Dark.json"
import NordTheme from "monaco-themes/themes/Nord.json"
import SolarizedDarkTheme from "monaco-themes/themes/Solarized-dark.json"
import SolarizedLightTheme from "monaco-themes/themes/Solarized-light.json"
import TomorrowNightTheme from "monaco-themes/themes/Tomorrow-Night.json"
import NightOwlTheme from "monaco-themes/themes/Night Owl.json"
import OneDarkProTheme from "monaco-themes/themes/Oceanic Next.json"

// BBCode-specific token colors for different color schemes
export interface BBCodeTokenColors {
    layout: string
    media: string
    format: string
    style: string
    block: string
    container: string
    default: string
    url: string
    hex: string
    listMarker: string
    text: string
}

// Theme definitions with their color configurations
export interface ThemeDefinition {
    id: string
    name: string
    baseTheme?: any // Monaco theme from monaco-themes
    customBase?: "vs" | "vs-dark" | "hc-black" | "hc-light"
    bbcodeColors: BBCodeTokenColors
}

// VS Code Dark (original default)
const vsDarkTheme: ThemeDefinition = {
    id: "bbcode-vs-dark",
    name: "VS Code Dark",
    customBase: "vs-dark",
    bbcodeColors: {
        layout: "ff6eb4", // hot pink
        media: "ce9178",
        format: "4ec9b0",
        style: "c586c0",
        block: "dcdcaa",
        container: "4fc1ff",
        default: "808080",
        url: "d7ba7d",
        hex: "b5cea8",
        listMarker: "ff8c00",
        text: "d4d4d4",
    },
}

// VS Code Light
const vsLightTheme: ThemeDefinition = {
    id: "bbcode-vs-light",
    name: "VS Code Light",
    customBase: "vs",
    bbcodeColors: {
        layout: "c71585", // medium violet red
        media: "a31515",
        format: "098658",
        style: "af00db",
        block: "795e26",
        container: "0070c1",
        default: "808080",
        url: "a31515",
        hex: "09885a",
        listMarker: "ff8800",
        text: "000000",
    },
}

// Monokai (from monaco-themes)
const monokaiTheme: ThemeDefinition = {
    id: "bbcode-monokai",
    name: "Monokai",
    baseTheme: MonokaiTheme,
    bbcodeColors: {
        layout: "f92672", // magenta/pink
        media: "fd971f", // orange
        format: "a6e22e", // green
        style: "ae81ff", // purple
        block: "e6db74", // yellow
        container: "66d9ef", // cyan
        default: "75715e", // gray
        url: "e6db74",
        hex: "ae81ff",
        listMarker: "fd971f",
        text: "f8f8f2",
    },
}

// Dracula (from monaco-themes)
const draculaTheme: ThemeDefinition = {
    id: "bbcode-dracula",
    name: "Dracula",
    baseTheme: DraculaTheme,
    bbcodeColors: {
        layout: "ff79c6", // pink
        media: "ffb86c", // orange
        format: "50fa7b", // green
        style: "bd93f9", // purple
        block: "f1fa8c", // yellow
        container: "8be9fd", // cyan
        default: "6272a4", // comment
        url: "f1fa8c",
        hex: "bd93f9",
        listMarker: "ffb86c",
        text: "f8f8f2",
    },
}

// GitHub Light (from monaco-themes)
const githubTheme: ThemeDefinition = {
    id: "bbcode-github",
    name: "GitHub Light",
    baseTheme: GithubTheme,
    bbcodeColors: {
        layout: "d73a49", // red
        media: "032f62",
        format: "22863a",
        style: "6f42c1",
        block: "e36209",
        container: "005cc5",
        default: "6a737d",
        url: "032f62",
        hex: "005cc5",
        listMarker: "e36209",
        text: "24292e",
    },
}

// GitHub Dark (from monaco-themes)
const githubDarkTheme: ThemeDefinition = {
    id: "bbcode-github-dark",
    name: "GitHub Dark",
    baseTheme: GithubDarkTheme,
    bbcodeColors: {
        layout: "ff7b72", // red/pink
        media: "ffa657", // orange
        format: "7ee787", // green
        style: "d2a8ff", // purple
        block: "ffa657", // yellow
        container: "56d4dd", // cyan
        default: "8b949e", // gray
        url: "a5d6ff",
        hex: "d2a8ff",
        listMarker: "ffa657",
        text: "c9d1d9",
    },
}

// Nord (from monaco-themes)
const nordTheme: ThemeDefinition = {
    id: "bbcode-nord",
    name: "Nord",
    baseTheme: NordTheme,
    bbcodeColors: {
        layout: "bf616a", // aurora red
        media: "d08770", // aurora orange
        format: "a3be8c", // aurora green
        style: "b48ead", // aurora purple
        block: "ebcb8b", // aurora yellow
        container: "8fbcbb", // frost teal
        default: "4c566a", // polar night
        url: "ebcb8b",
        hex: "b48ead",
        listMarker: "d08770",
        text: "d8dee9",
    },
}

// Solarized Dark (from monaco-themes)
const solarizedDarkTheme: ThemeDefinition = {
    id: "bbcode-solarized-dark",
    name: "Solarized Dark",
    baseTheme: SolarizedDarkTheme,
    bbcodeColors: {
        layout: "dc322f", // red
        media: "cb4b16", // orange
        format: "859900", // green
        style: "d33682", // magenta
        block: "b58900", // yellow
        container: "2aa198", // cyan
        default: "586e75", // base01
        url: "2aa198",
        hex: "6c71c4",
        listMarker: "cb4b16",
        text: "839496",
    },
}

// Solarized Light (from monaco-themes)
const solarizedLightTheme: ThemeDefinition = {
    id: "bbcode-solarized-light",
    name: "Solarized Light",
    baseTheme: SolarizedLightTheme,
    bbcodeColors: {
        layout: "dc322f", // red
        media: "cb4b16", // orange
        format: "859900", // green
        style: "d33682", // magenta
        block: "b58900", // yellow
        container: "2aa198", // cyan
        default: "93a1a1", // base1
        url: "2aa198",
        hex: "6c71c4",
        listMarker: "cb4b16",
        text: "657b83",
    },
}

// Tomorrow Night (from monaco-themes)
const tomorrowNightTheme: ThemeDefinition = {
    id: "bbcode-tomorrow-night",
    name: "Tomorrow Night",
    baseTheme: TomorrowNightTheme,
    bbcodeColors: {
        layout: "cc6666", // red
        media: "de935f", // orange
        format: "b5bd68", // green
        style: "b294bb", // purple
        block: "f0c674", // yellow
        container: "8abeb7", // cyan
        default: "969896", // comment
        url: "f0c674",
        hex: "b294bb",
        listMarker: "de935f",
        text: "c5c8c6",
    },
}

// Night Owl (from monaco-themes)
const nightOwlTheme: ThemeDefinition = {
    id: "bbcode-night-owl",
    name: "Night Owl",
    baseTheme: NightOwlTheme,
    bbcodeColors: {
        layout: "ff2c83", // pink
        media: "f78c6c", // orange
        format: "c3e88d", // green
        style: "c792ea", // purple
        block: "ffcb8b", // peach
        container: "7fdbca", // cyan
        default: "637777", // comment
        url: "ffcb8b",
        hex: "c792ea",
        listMarker: "f78c6c",
        text: "d6deeb",
    },
}

// Oceanic Next (from monaco-themes)
const oceanicNextTheme: ThemeDefinition = {
    id: "bbcode-oceanic-next",
    name: "Oceanic Next",
    baseTheme: OneDarkProTheme,
    bbcodeColors: {
        layout: "ec5f67", // red
        media: "f99157", // orange
        format: "99c794", // green
        style: "c594c5", // purple
        block: "fac863", // yellow
        container: "5fb3b3", // cyan
        default: "65737e", // comment
        url: "fac863",
        hex: "c594c5",
        listMarker: "f99157",
        text: "c0c5ce",
    },
}

// Export all themes
export const availableThemes: ThemeDefinition[] = [vsDarkTheme, vsLightTheme, monokaiTheme, draculaTheme, githubTheme, githubDarkTheme, nordTheme, solarizedDarkTheme, solarizedLightTheme, tomorrowNightTheme, nightOwlTheme, oceanicNextTheme]

// Helper function to create Monaco theme from theme definition
export const createMonacoTheme = (theme: ThemeDefinition): monaco.editor.IStandaloneThemeData => {
    // BBCode-specific token rules
    const bbcodeRules = [
        // Layout tags
        { token: "tag.open.layout", foreground: theme.bbcodeColors.layout, fontStyle: "bold" },
        { token: "tag.close.layout", foreground: theme.bbcodeColors.layout, fontStyle: "bold" },
        // Media tags
        { token: "tag.open.media", foreground: theme.bbcodeColors.media, fontStyle: "bold" },
        { token: "tag.close.media", foreground: theme.bbcodeColors.media, fontStyle: "bold" },
        // Format tags
        { token: "tag.open.format", foreground: theme.bbcodeColors.format, fontStyle: "bold" },
        { token: "tag.close.format", foreground: theme.bbcodeColors.format, fontStyle: "bold" },
        // Style tags
        { token: "tag.open.style", foreground: theme.bbcodeColors.style, fontStyle: "bold" },
        { token: "tag.close.style", foreground: theme.bbcodeColors.style, fontStyle: "bold" },
        // Block tags
        { token: "tag.open.block", foreground: theme.bbcodeColors.block, fontStyle: "bold" },
        { token: "tag.close.block", foreground: theme.bbcodeColors.block, fontStyle: "bold" },
        // Container tags
        { token: "tag.open.container", foreground: theme.bbcodeColors.container, fontStyle: "bold" },
        { token: "tag.close.container", foreground: theme.bbcodeColors.container, fontStyle: "bold" },
        // Default tags
        { token: "tag.open.default", foreground: theme.bbcodeColors.default, fontStyle: "bold" },
        { token: "tag.close.default", foreground: theme.bbcodeColors.default, fontStyle: "bold" },
        // Other elements
        { token: "string.url", foreground: theme.bbcodeColors.url, fontStyle: "underline" },
        { token: "constant.numeric.hex", foreground: theme.bbcodeColors.hex },
        { token: "keyword.list", foreground: theme.bbcodeColors.listMarker },
        { token: "text", foreground: theme.bbcodeColors.text },
    ]

    // If using a theme from monaco-themes, merge with its rules
    if (theme.baseTheme) {
        return {
            base: theme.baseTheme.base,
            inherit: true,
            rules: [...(theme.baseTheme.rules || []), ...bbcodeRules],
            colors: theme.baseTheme.colors || {},
        }
    }

    // Otherwise, create a custom theme
    return {
        base: theme.customBase || "vs-dark",
        inherit: true,
        rules: bbcodeRules,
        colors: {},
    }
}
