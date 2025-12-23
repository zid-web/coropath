"use client"

import { create } from "zustand"

export type NavigationTarget = string | null

interface NavigationState {
    currentPage: string | null
}

interface SmartNavigationStore {
    navState: NavigationState
    navigateTo: (target: NavigationTarget) => void
    reset: () => void
}

const useSmartNavigationStore = create<SmartNavigationStore>((set) => ({
    navState: { currentPage: null },
    navigateTo: (target) => set({ navState: { currentPage: target } }),
    reset: () => set({ navState: { currentPage: null } }),
}))

export function useSmartNavigation() {
    const { navState, navigateTo, reset } = useSmartNavigationStore()
    return { navState, navigateTo, reset }
}
