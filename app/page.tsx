"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Heart, Calculator, Activity, Stethoscope, AlertCircle, Building2, Calendar, ArrowLeft } from "lucide-react"
import CalculetteRFCL from "@/components/calculette-rfcl"
import CalculetteGRACE from "@/components/calculette-grace"
import PWAHandler from "@/components/pwa-handler"
import QuickDialFAB from "@/components/quick-dial-fab"
import CalculetteRevascularisation from "@/components/calculette-revascularisation"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import PopupLifestyle from "@/components/popup-lifestyle"
import ArbreAntianginal from "@/components/arbre-antianginal"
import ArbreAntithrombotique from "@/components/arbre-antithrombotique"
import { HeaderECG } from "@/components/header-ecg"
import { ArbreRevascularisation } from "@/components/arbre-revascularisation"
import ArbreEtudesReference from "@/components/arbre-etudes-reference"
import { useClickSound } from "@/hooks/use-click-sound"
import { SmartKeywordsLink } from "@/components/smart-keywords-link"
import { BreadcrumbNavigation } from "@/components/breadcrumb-navigation"
import { useSmartNavigation, type NavigationTarget } from "@/hooks/use-smart-navigation"

// Placeholder for getPHQ9Interpretation - replace with actual implementation if available
const getPHQ9Interpretation = (score: number) => {
  if (score <= 4) {
    return {
      level: "Dépression Minimale",
      recommendation: "Aucune action spécifique requise, mais encourager le maintien des bonnes habitudes.",
    }
  } else if (score <= 9) {
    return {
      level: "Dépression Légère",
      recommendation: "Surveillance, soutien psycho-social et éducation thérapeutique.",
    }
  } else if (score <= 14) {
    return { level: "Dépression Modérée", recommendation: "Traitement par psychothérapie et/ou pharmacologique." }
  } else {
    return {
      level: "Dépression Sévère",
      recommendation: "Traitement pharmacologique intensif et/ou psychothérapie spécialisée.",
    }
  }
}

export default function CoronaryPathways() {
  const [viewMode, setViewMode] = useState<"detailed" | "synthetic">("detailed")
  const [activeTab, setActiveTab] = useState<"home" | "douleur" | "sca" | "scc" | "post">("home")
  const [calculatorOpen, setCalculatorOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isStandalone, setIsStandalone] = useState(false)
  const [phq9Result, setPhq9Result] = useState<number | null>(null)

  const { playClickSound } = useClickSound()
  const { navState, navigateTo, reset } = useSmartNavigation()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    const checkStandalone = () => {
      const standalone =
        window.matchMedia("(display-mode: standalone)").matches ||
        (window.navigator as any).standalone ||
        document.referrer.includes("android-app://")
      setIsStandalone(standalone)
    }
    checkStandalone()

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSmartNavigation = (target: NavigationTarget) => {
    navigateTo(target)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <div className="mobile-viewport bg-gradient-to-br from-blue-50 via-white to-purple-50 safe-area-inset-bottom">
      <PWAHandler />
      <QuickDialFAB />

      {/* Header */}
      <header
        className={`sticky top-0 z-30 transition-all duration-300 safe-area-inset-top ${isScrolled ? "bg-white/95 backdrop-blur-lg shadow-sm py-3" : "bg-transparent py-4"
          }`}
      >
        <div className="mx-auto max-w-7xl px-4">
          <HeaderECG isScrolled={isScrolled} />

          {/* Boutons d'action à droite */}
          <div className="flex items-center justify-end gap-2 mt-2">
            <Button
              size="sm"
              variant={viewMode === "synthetic" ? "default" : "outline"}
              onClick={() => {
                playClickSound()
                setViewMode(viewMode === "detailed" ? "synthetic" : "detailed")
              }}
              className="text-xs"
            >
              {viewMode === "detailed" ? "Synthèse" : "Détaillé"}
            </Button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24 md:pb-6 mobile-scroll-container native-scroll">
        {navState.currentPage && (
          <BreadcrumbNavigation
            currentPage={navState.currentPage}
            onNavigate={(target) => {
              if (target === null) reset()
            }}
          />
        )}

        {activeTab === "home" ? (
          <div className="space-y-8">
            <div className="text-center space-y-4 py-8">
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                CoroPath
              </h1>
              <p className="mobile-text-base md:text-xl text-gray-600 max-w-2xl mx-auto">
                Application d'aide la prise en charge des douleurs thoraciques
              </p>
              <p className="text-sm text-gray-500">Sélectionnez un parcours pour commencer</p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab("douleur")
                }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-orange-100 to-orange-200 hover:from-orange-200 hover:to-orange-300 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl touch-target"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-orange-400/20 rounded-full blur-3xl group-hover:bg-orange-400/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-orange-300/20 rounded-full blur-2xl group-hover:bg-orange-300/30 transition-all duration-500" />

                <div className="relative space-y-4">
                  <div className="w-16 h-16 mx-auto bg-orange-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                    <Stethoscope className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-orange-900">Douleur au Cabinet</h3>
                  <p className="text-sm text-orange-700">
                    Évaluation et orientation de la douleur thoracique au cabinet médical
                  </p>
                  <Badge className="bg-orange-600">ESC 2024</Badge>
                </div>
              </button>

              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab("sca")
                }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-red-100 to-red-200 hover:from-red-200 hover:to-red-300 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl touch-target"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-400/20 rounded-full blur-3xl group-hover:bg-red-400/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-300/20 rounded-full blur-2xl group-hover:bg-red-300/30 transition-all duration-500" />

                <div className="relative space-y-4">
                  <div className="w-16 h-16 mx-auto bg-red-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                    <Heart className="h-8 w-8 text-white" />
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <h3 className="text-2xl font-bold text-red-900">SCA Filière Courte</h3>
                    <Badge variant="destructive" className="text-xs">
                      URGENCE
                    </Badge>
                  </div>
                  <p className="text-sm text-red-700">Prise en charge urgente du syndrome coronarien aigu</p>
                  <Badge className="bg-red-600">ESC 2023</Badge>
                </div>
              </button>

              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab("scc")
                }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-blue-100 to-blue-200 hover:from-blue-200 hover:to-blue-300 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl touch-target"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-3xl group-hover:bg-blue-400/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-300/20 rounded-full blur-2xl group-hover:bg-blue-300/30 transition-all duration-500" />

                <div className="relative space-y-4">
                  <div className="w-16 h-16 mx-auto bg-blue-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                    <Activity className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-blue-900">Syndrome Coronaire Chronique</h3>
                  <p className="text-sm text-blue-700">Diagnostic et stratégie thérapeutique du SCC</p>
                  <Badge className="bg-blue-600">ESC 2024</Badge>
                </div>
              </button>

              <button
                onClick={() => {
                  playClickSound()
                  setActiveTab("post")
                }}
                className="group relative overflow-hidden rounded-3xl p-8 bg-gradient-to-br from-green-100 to-green-200 hover:from-green-200 hover:to-green-300 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl touch-target"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-400/20 rounded-full blur-3xl group-hover:bg-green-400/30 transition-all duration-500" />
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-green-300/20 rounded-full blur-2xl group-hover:bg-green-300/30 transition-all duration-500" />

                <div className="relative space-y-4">
                  <div className="w-16 h-16 mx-auto bg-green-500 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-500">
                    <Calendar className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-green-900">Suivi Post-Hospitalisation</h3>
                  <p className="text-sm text-green-700">Suivi après syndrome coronarien aigu</p>
                  <Badge className="bg-green-600">ESC 2023</Badge>
                </div>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <Button variant="ghost" onClick={() => setActiveTab("home")} className="gap-2 touch-target">
              <ArrowLeft className="h-4 w-4" />
              Retour à l'accueil
            </Button>

            <Card
              className={`border-l-4 ${activeTab === "douleur"
                  ? "border-l-orange-500"
                  : activeTab === "sca"
                    ? "border-l-red-500"
                    : activeTab === "scc"
                      ? "border-l-blue-500"
                      : "border-l-green-500"
                }`}
            >
              <CardHeader>
                {activeTab === "douleur" && (
                  <>
                    <CardTitle className="flex items-center gap-2">
                      <Stethoscope className="h-5 w-5 text-orange-500" />
                      Douleur Thoracique au Cabinet du Médecin Traitant
                    </CardTitle>
                    <CardDescription className="mt-1">Évaluation et orientation - ESC 2024</CardDescription>
                  </>
                )}
                {activeTab === "sca" && (
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle className="flex items-center gap-2">
                        <AlertCircle className="h-5 w-5 text-red-500" />
                        Syndrome Coronarien Aigu - Filière Courte
                      </CardTitle>
                      <CardDescription className="mt-1">Prise en charge urgente - ESC 2023</CardDescription>
                    </div>
                    <Badge variant="destructive" className="text-xs">
                      URGENCE
                    </Badge>
                  </div>
                )}
                {activeTab === "scc" && (
                  <>
                    <CardTitle className="flex items-center gap-2">
                      <Activity className="h-5 w-5 text-blue-500" />
                      Syndrome Coronarien Chronique (SCC)
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Parcours diagnostique et thérapeutique - ESC Guidelines 2024
                    </CardDescription>
                  </>
                )}
                {activeTab === "post" && (
                  <>
                    <CardTitle className="flex items-center gap-2">
                      <Calendar className="h-5 w-5 text-green-500" />
                      Suivi Post-Hospitalisation (SCA)
                    </CardTitle>
                    <CardDescription className="mt-1">
                      Programme de réadaptation et suivi à long terme - ESC 2023
                    </CardDescription>
                  </>
                )}
              </CardHeader>
              <CardContent>
                <p className="text-center text-gray-500 py-8">Contenu détaillé du parcours {activeTab} (Placeholder - Contenu complet dans la version déployée)</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>
    </div>
  )
}
