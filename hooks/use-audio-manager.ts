"use client"

import { create } from "zustand"
import { useCallback, useEffect } from "react"

interface AudioState {
    soundEnabled: boolean
    audioContext: AudioContext | null
    initialized: boolean
    setSoundEnabled: (enabled: boolean) => void
    initAudioContext: () => void
    playHeartbeat: () => void
    playClick: () => void
}

export const useAudioStore = create<AudioState>((set, get) => ({
    soundEnabled: true,
    audioContext: null,
    initialized: false,

    setSoundEnabled: (enabled) => {
        set({ soundEnabled: enabled })
    },

    initAudioContext: () => {
        const state = get()
        if (state.initialized || typeof window === "undefined") return

        try {
            const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)()

            if (audioCtx.state === "suspended") {
                audioCtx.resume()
            }

            set({ audioContext: audioCtx, initialized: true })
        } catch (error) {
            console.error("[v0] AudioContext init error:", error)
        }
    },

    playHeartbeat: () => {
        const { soundEnabled, audioContext, initialized } = get()
        if (!soundEnabled || !initialized || !audioContext) {
            return
        }

        try {
            if (audioContext.state === "suspended") {
                audioContext.resume()
            }

            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(60, audioContext.currentTime)
            oscillator.type = "sine"

            gainNode.gain.setValueAtTime(0, audioContext.currentTime)
            gainNode.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.2)
        } catch (error) {
            console.error("[v0] Heartbeat error:", error)
        }
    },

    playClick: () => {
        const { soundEnabled, audioContext, initialized } = get()
        if (!soundEnabled || !initialized || !audioContext) return

        if (typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return
        }

        try {
            if (audioContext.state === "suspended") {
                audioContext.resume()
            }

            const oscillator = audioContext.createOscillator()
            const gainNode = audioContext.createGain()

            oscillator.connect(gainNode)
            gainNode.connect(audioContext.destination)

            oscillator.frequency.setValueAtTime(800, audioContext.currentTime)
            oscillator.type = "sine"

            gainNode.gain.setValueAtTime(0, audioContext.currentTime)
            gainNode.gain.linearRampToValueAtTime(0.15, audioContext.currentTime + 0.01)
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05)

            oscillator.start(audioContext.currentTime)
            oscillator.stop(audioContext.currentTime + 0.05)
        } catch (error) {
            console.error("[v0] Click error:", error)
        }
    },
}))

export function useAudioManager() {
    const { soundEnabled, initialized, setSoundEnabled, initAudioContext, playHeartbeat, playClick } = useAudioStore()

    useEffect(() => {
        const handleFirstInteraction = () => {
            initAudioContext()
            document.removeEventListener("click", handleFirstInteraction)
            document.removeEventListener("touchstart", handleFirstInteraction)
        }

        document.addEventListener("click", handleFirstInteraction, { passive: true })
        document.addEventListener("touchstart", handleFirstInteraction, { passive: true })

        return () => {
            document.removeEventListener("click", handleFirstInteraction)
            document.removeEventListener("touchstart", handleFirstInteraction)
        }
    }, [initAudioContext])

    const toggleSound = useCallback(() => {
        initAudioContext()
        const newSoundEnabled = !soundEnabled
        setSoundEnabled(newSoundEnabled)
        if (newSoundEnabled) {
            playHeartbeat()
        }
    }, [soundEnabled, setSoundEnabled, initAudioContext, playHeartbeat])

    return {
        soundEnabled,
        initialized,
        toggleSound,
        playHeartbeat,
        playClick,
    }
}
