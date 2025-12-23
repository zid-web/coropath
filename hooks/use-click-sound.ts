"use client"
import { useAudioManager } from "./use-audio-manager"

export function useClickSound() {
    const { playClick } = useAudioManager()

    return { playClickSound: playClick }
}
