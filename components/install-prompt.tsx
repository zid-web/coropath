"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X, Smartphone } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

export function InstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showPrompt, setShowPrompt] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)

  useEffect(() => {
    // Verifier si deja installe en mode standalone
    const standalone = window.matchMedia("(display-mode: standalone)").matches
    setIsStandalone(standalone)

    // Detecter iOS
    const ios = /iPad|iPhone|iPod/.test(navigator.userAgent)
    setIsIOS(ios)

    // Ecouter l'evenement beforeinstallprompt (Android/Chrome)
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    // Afficher le prompt iOS apres un delai si pas deja installe
    if (ios && !standalone) {
      const timer = setTimeout(() => setShowPrompt(true), 3000)
      return () => {
        clearTimeout(timer)
        window.removeEventListener("beforeinstallprompt", handler)
      }
    }

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstall = async () => {
    if (!deferredPrompt) return
    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice
    if (outcome === "accepted") {
      setShowPrompt(false)
    }
    setDeferredPrompt(null)
  }

  const handleDismiss = () => {
    setShowPrompt(false)
    // Ne plus afficher pendant 7 jours
    localStorage.setItem("installPromptDismissed", Date.now().toString())
  }

  // Ne pas afficher si deja installe ou si refuse recemment
  useEffect(() => {
    const dismissed = localStorage.getItem("installPromptDismissed")
    if (dismissed) {
      const dismissedTime = Number.parseInt(dismissed)
      const sevenDays = 7 * 24 * 60 * 60 * 1000
      if (Date.now() - dismissedTime < sevenDays) {
        setShowPrompt(false)
      }
    }
  }, [])

  if (isStandalone || !showPrompt) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 animate-in slide-in-from-bottom-4 duration-300">
      <Card className="border-blue-200 bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-2xl">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="rounded-xl bg-white/20 p-2.5">
              <Smartphone className="h-6 w-6" />
            </div>
            <div className="flex-1 space-y-2">
              <h3 className="font-semibold">Installer CoroPath</h3>
              {isIOS ? (
                <p className="text-sm text-blue-100">
                  Appuyez sur{" "}
                  <span className="inline-flex items-center rounded bg-white/20 px-1.5 py-0.5 text-xs font-medium">
                    Partager
                  </span>{" "}
                  puis{" "}
                  <span className="inline-flex items-center rounded bg-white/20 px-1.5 py-0.5 text-xs font-medium">
                    Ajouter a l&apos;ecran d&apos;accueil
                  </span>
                </p>
              ) : (
                <p className="text-sm text-blue-100">
                  Installez l&apos;application pour un acces rapide en consultation
                </p>
              )}
              <div className="flex gap-2 pt-1">
                {!isIOS && (
                  <Button
                    size="sm"
                    variant="secondary"
                    className="bg-white text-blue-700 hover:bg-blue-50"
                    onClick={handleInstall}
                  >
                    <Download className="mr-1.5 h-4 w-4" />
                    Installer
                  </Button>
                )}
                <Button size="sm" variant="ghost" className="text-white hover:bg-white/20" onClick={handleDismiss}>
                  Plus tard
                </Button>
              </div>
            </div>
            <button onClick={handleDismiss} className="rounded-full p-1 hover:bg-white/20 transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default InstallPrompt
