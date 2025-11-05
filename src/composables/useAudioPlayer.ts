import { onMounted, onUnmounted } from "vue"

// 时间格式化
type TimeFormat = "minute_minimal" | "minute" | "hour_minimal" | "hour"
type PlayState = "loading" | "playing" | "paused"

const pad = (num: number) => num.toString().padStart(2, "0")

const format = (time: number, fmt: TimeFormat): string => {
    const secondTotal = Math.floor(time)
    const second = secondTotal % 60
    const minuteTotal = Math.floor(secondTotal / 60)

    if (fmt === "minute_minimal") {
        return `'${minuteTotal}:${pad(second)}'`
    } else if (fmt === "minute") {
        return `'${pad(minuteTotal)}:${pad(second)}'`
    } else {
        const minute = minuteTotal % 60
        const hourTotal = Math.floor(minuteTotal / 60)

        if (fmt === "hour_minimal") {
            return `'${hourTotal}:${pad(minute)}:${pad(second)}'`
        } else {
            return `'${pad(hourTotal)}:${pad(minute)}:${pad(second)}'`
        }
    }
}

const getTimeFormat = (duration: number): TimeFormat => {
    if (duration < 600) {
        return "minute_minimal"
    } else if (duration < 3600) {
        return "minute"
    } else if (duration < 36000) {
        return "hour_minimal"
    } else {
        return "hour"
    }
}

// Slider 类 - 处理拖动交互
class Slider {
    private active = true
    private percentage = 0
    private readonly bar: HTMLElement
    private readonly endCallback?: (slider: Slider) => void
    private readonly moveCallback?: (slider: Slider) => void

    constructor(params: { bar: HTMLElement; endCallback?: (slider: Slider) => void; moveCallback?: (slider: Slider) => void; initialEvent: MouseEvent | TouchEvent }) {
        this.bar = params.bar
        this.endCallback = params.endCallback
        this.moveCallback = params.moveCallback

        this.bar.dataset.audioDragging = "1"
        this.move(this.getClientX(params.initialEvent))

        document.addEventListener("mousemove", this.onMove)
        document.addEventListener("touchmove", this.onMove)
        document.addEventListener("mouseup", this.end)
        document.addEventListener("touchend", this.end)
        window.addEventListener("blur", this.end)
    }

    private getClientX(e: MouseEvent | TouchEvent): number {
        if (e instanceof MouseEvent) {
            return e.clientX
        } else {
            return e.touches[0].clientX
        }
    }

    private move = (clientX: number) => {
        if (!this.active) return

        const rect = this.bar.getBoundingClientRect()
        const x = clientX - rect.left
        const width = rect.width
        this.percentage = Math.max(0, Math.min(1, x / width))

        if (this.moveCallback) {
            this.moveCallback(this)
        }

        // 同时更新 --bar 和 --progress 以保持同步
        this.bar.style.setProperty("--bar", this.percentage.toString())

        // 找到播放器元素并更新 --progress
        const player = this.bar.closest(".js-audio--player") as HTMLElement
        if (player) {
            player.style.setProperty("--progress", this.percentage.toString())
        }
    }

    private onMove = (e: MouseEvent | TouchEvent) => {
        const x = this.getClientX(e)
        requestAnimationFrame(() => {
            this.move(x)
        })
    }

    end = () => {
        this.active = false

        document.removeEventListener("mousemove", this.onMove)
        document.removeEventListener("touchmove", this.onMove)
        document.removeEventListener("mouseup", this.end)
        document.removeEventListener("touchend", this.end)
        window.removeEventListener("blur", this.end)

        if (this.endCallback) {
            this.endCallback(this)
        }

        // 不移除 --bar，让它保持最后的值
        // CSS 中的 --bar: var(--progress) 只在没有内联样式时生效
        // 移除内联的 --bar 后，由 syncProgress 来接管更新
        this.bar.style.removeProperty("--bar")
        this.bar.dataset.audioDragging = "0"
    }

    getPercentage = () => this.percentage
}

export const useAudioPlayer = () => {
    // 单例 Audio 实例
    const audio = new Audio()
    audio.volume = 0.5 // 设置默认音量为 50%

    let pagePlayer: HTMLElement | null = null
    let currentSlider: Slider | null = null
    let state: PlayState = "paused"
    let timeFormat: TimeFormat = "minute_minimal"
    let durationFormatted = "'0:00'"
    let url: string | null = null
    let observer: MutationObserver | null = null

    const ignoredErrors = ["AbortError", "NotAllowedError", "NotSupportedError"]

    // 查找播放器元素
    const findPlayer = (elem: HTMLElement): HTMLElement | null => {
        return elem.closest(".js-audio--player") as HTMLElement | null
    }

    // 更新所有播放器的状态
    const updatePlayers = (func: (player: HTMLElement) => void) => {
        if (pagePlayer) {
            func(pagePlayer)
        }
    }

    // 设置时间格式
    const setTimeFormat = () => {
        if (audio.duration < 600) {
            timeFormat = "minute_minimal"
        } else if (audio.duration < 3600) {
            timeFormat = "minute"
        } else if (audio.duration < 36000) {
            timeFormat = "hour_minimal"
        } else {
            timeFormat = "hour"
        }
    }

    // 同步进度
    const syncProgress = () => {
        if (audio.duration > 0) {
            const progress = audio.currentTime / audio.duration
            const over50 = progress >= 0.5 ? "1" : "0"
            const progressFormatted = progress.toString()
            const currentTimeFormatted = format(audio.currentTime, timeFormat)

            updatePlayers((player) => {
                player.style.setProperty("--current-time", currentTimeFormatted)
                player.style.setProperty("--progress", progressFormatted)
                player.dataset.audioOver50 = over50

                // 同时更新进度条的 --bar 变量，但只在没有拖拽时
                const seekBar = player.querySelector(".js-audio--seek") as HTMLElement
                if (seekBar && seekBar.dataset.audioDragging !== "1") {
                    seekBar.style.setProperty("--bar", progressFormatted)
                }
            })
        }

        if (!audio.paused) {
            requestAnimationFrame(syncProgress)
        }
    }

    const syncState = () => {
        updatePlayers((player) => {
            player.dataset.audioHasDuration = Number.isFinite(audio.duration) ? "1" : "0"
            player.dataset.audioState = state
            player.dataset.audioTimeFormat = timeFormat
            player.style.setProperty("--duration", durationFormatted)
        })

        syncProgress()
    }

    const setState = (newState: PlayState) => {
        state = newState
        syncState()
    }

    const setTime = (t: number) => {
        audio.currentTime = t
        syncProgress()
    }

    const stop = () => {
        audio.pause()
        currentSlider?.end()
        audio.currentTime = 0
        onPause()
    }

    const load = (player: HTMLElement) => {
        const audioUrl = player.dataset.audioUrl

        if (!audioUrl) {
            throw new Error("Player is missing url")
        }

        if (!audio.paused) {
            stop()
        }

        setTime(0)
        pagePlayer = player

        url = audioUrl
        audio.setAttribute("src", audioUrl)
        audio.currentTime = 0
        setState("loading")

        const promise = audio.play()
        promise?.catch((error: DOMException) => {
            if (ignoredErrors.includes(error.name)) {
                console.error("playback failed:", error.name)
                stop()
                return
            }
            throw error
        })
    }

    const togglePlay = () => {
        if (!url) {
            return
        }

        if (audio.paused) {
            void audio.play()
        } else {
            audio.pause()
        }
    }

    const onPause = () => {
        setState("paused")
    }

    const onPlaying = () => {
        setTimeFormat()
        durationFormatted = format(audio.duration, timeFormat)
        setState("playing")
    }

    const onEnded = () => {
        stop()
    }

    const onTimeupdate = () => {
        // time update when playing is already handled by a requestAnimationFrame loop
        if (audio.paused) {
            syncProgress()
        }
    }

    const onSeekEnd = (slider: Slider) => {
        currentSlider = null
        const targetTime = slider.getPercentage() === 1 ? audio.duration - 0.01 : audio.duration * slider.getPercentage()

        setTime(targetTime)
    }

    const onSeekStart = (e: Event) => {
        e.preventDefault()
        const bar = e.currentTarget as HTMLElement
        const originalEvent = e as MouseEvent | TouchEvent

        if (!bar) return

        // 查找包含这个进度条的播放器
        const player = bar.closest(".js-audio--player") as HTMLElement
        if (!player) return

        // 如果没有正在播放的音频，或者音频时长无效，则不允许拖拽
        if (!Number.isFinite(audio.duration) || audio.duration === 0) return

        currentSlider = new Slider({
            bar,
            endCallback: onSeekEnd,
            initialEvent: originalEvent,
        })
    }

    const onClickPlay = (e: Event) => {
        e.preventDefault()

        const target = e.currentTarget as HTMLElement
        const player = findPlayer(target)

        if (!player) {
            throw new Error("couldn't find pagePlayer of the play button")
        }

        if (player === pagePlayer) {
            togglePlay()
        } else {
            load(player)
        }
    }

    const initAudioPlayers = () => {
        const players = document.querySelectorAll(".js-audio--player")
        players.forEach((player) => {
            if (!(player instanceof HTMLElement)) return

            if (player.dataset.audioInitialized === "1") return
            player.dataset.audioInitialized = "1"

            // 添加播放按钮事件
            const playButton = player.querySelector(".js-audio--play")
            if (playButton) {
                playButton.addEventListener("click", onClickPlay)
            }

            // 为进度条添加拖动事件
            const seekBar = player.querySelector(".js-audio--seek")
            if (seekBar) {
                seekBar.addEventListener("mousedown", onSeekStart as EventListener)
                seekBar.addEventListener("touchstart", onSeekStart as EventListener)
            }

            // 如果是当前 URL 的播放器，重新附加
            if (url && player.dataset.audioUrl === url) {
                pagePlayer = player
                syncState()
            }
        })
    }

    const observePage = (mutations: MutationRecord[]) => {
        let shouldInit = false

        mutations.forEach((mutation) => {
            mutation.addedNodes.forEach((node) => {
                if (node instanceof HTMLElement) {
                    if (node.classList.contains("js-audio--player") || node.querySelector(".js-audio--player")) {
                        shouldInit = true
                    }
                }
            })
        })

        if (shouldInit) {
            initAudioPlayers()
        }
    }

    const setupAudioEvents = () => {
        audio.addEventListener("pause", onPause)
        audio.addEventListener("playing", onPlaying)
        audio.addEventListener("ended", onEnded)
        audio.addEventListener("timeupdate", onTimeupdate)
    }

    const cleanup = () => {
        audio.pause()
        audio.src = ""
        audio.removeEventListener("pause", onPause)
        audio.removeEventListener("playing", onPlaying)
        audio.removeEventListener("ended", onEnded)
        audio.removeEventListener("timeupdate", onTimeupdate)

        if (observer) {
            observer.disconnect()
        }
    }

    onMounted(() => {
        setupAudioEvents()

        // 使用 MutationObserver 监听 DOM 变化
        observer = new MutationObserver(observePage)
        observer.observe(document.body, {
            childList: true,
            subtree: true,
        })

        initAudioPlayers()
    })

    onUnmounted(() => {
        cleanup()
    })

    return {
        initAudioPlayers,
    }
}
