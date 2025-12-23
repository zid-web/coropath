"use client"

import { useEffect, useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Download, X, Share, MoreVertical, Plus } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function PWAHandler() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showBanner, setShowBanner] = useState(false)
  const [showInstructions, setShowInstructions] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isInstalling, setIsInstalling] = useState(false)

  useEffect(() => {
    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone === true ||
        document.referrer.includes("android-app://") ||
        window.location.search.includes("source=pwa")
      setIsStandalone(standalone)
      return standalone
    }

    const checkIOS = () => {
      const ios = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
      setIsIOS(ios)
      return ios
    }

    const standalone = checkStandalone()
    checkIOS()

    if (standalone) return

    const dismissedDate = localStorage.getItem("pwa-dismissed-date")
    const today = new Date().toDateString()

    if (dismissedDate !== today) {
      setTimeout(() => setShowBanner(true), 500)
    }

    const handleBeforeInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
    }

    const handleAppInstalled = () => {
      setDeferredPrompt(null)
      setShowBanner(false)
      localStorage.setItem("pwa-installed", "true")
    }

    window.addEventListener("beforeinstallprompt", handleBeforeInstall)
    window.addEventListener("appinstalled", handleAppInstalled)

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstall)
      window.removeEventListener("appinstalled", handleAppInstalled)
    }
  }, [])

  const handleInstall = useCallback(async () => {
    if (deferredPrompt) {
      try {
        setIsInstalling(true)
        await deferredPrompt.prompt()
        const { outcome } = await deferredPrompt.userChoice
        if (outcome === "accepted") {
          localStorage.setItem("pwa-installed", "true")
          setShowBanner(false)
        }
        setDeferredPrompt(null)
      } catch {
        // Erreur silencieuse
      } finally {
        setIsInstalling(false)
      }
    } else {
      setShowInstructions(true)
    }
  }, [deferredPrompt])

  const handleDismiss = () => {
    localStorage.setItem("pwa-dismissed-date", new Date().toDateString())
    setShowBanner(false)
    setShowInstructions(false)
  }

  if (isStandalone || !showBanner) return null

  return (
    <>
      <div className="fixed top-2 right-2 z-50 animate-in slide-in-from-top duration-300">
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 flex items-center gap-2 p-2 pr-3">
          <Button
            onClick={handleInstall}
            disabled={isInstalling}
            size="sm"
            className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8 px-3 flex items-center gap-1.5"
          >
            <Download className="h-3.5 w-3.5" />
            {isInstalling ? "..." : "Installer"}
          </Button>
          <button
            onClick={handleDismiss}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Fermer"
          >
            <X className="h-4 w-4 text-gray-400" />
          </button>
        </div>
      </div>

      {showInstructions && (
        <div
          className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4"
          onClick={() => setShowInstructions(false)}
        >
          <div
            className="bg-white rounded-xl shadow-2xl max-w-sm w-full p-5 animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-gray-900">Installer CoroPath</h3>
              <button onClick={() => setShowInstructions(false)} className="p-1.5 hover:bg-gray-100 rounded-full">
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            {isIOS ? (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Sur Safari :</p>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <span className="text-sm flex items-center gap-1">
                    Appuyez sur <Share className="h-4 w-4" /> Partager
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <span className="text-sm flex items-center gap-1">
                    <Plus className="h-4 w-4" /> Sur l&apos;ecran d&apos;accueil
                  </span>
                </div>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-sm text-gray-600">Sur Chrome :</p>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    1
                  </div>
                  <span className="text-sm flex items-center gap-1">
                    Menu <MoreVertical className="h-4 w-4" /> en haut a droite
                  </span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    2
                  </div>
                  <span className="text-sm">&quot;Ajouter a l&apos;ecran d&apos;accueil&quot;</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="bg-blue-600 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-sm">
                    3
                  </div>
                  <span className="text-sm">Confirmer &quot;Ajouter&quot;</span>
                </div>
              </div>
            )}

            <Button
              onClick={() => setShowInstructions(false)}
              className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700"
            >
              Compris
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default PWAHandler
