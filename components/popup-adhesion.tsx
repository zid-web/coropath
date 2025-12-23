"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Heart, User, Wallet, Pill, Building2, Info } from "lucide-react"

export function PopupAdhesion() {
  const [open, setOpen] = useState(false)

  const dimensions = [
    {
      title: "Facteurs liés au patient",
      icon: User,
      color: "bg-blue-500",
      items: [
        "Connaissances sur la maladie",
        "Motivation et confiance en soi",
        "Croyances sur le traitement",
        "Oubli des prises",
        "Troubles cognitifs / dépression",
      ],
    },
    {
      title: "Facteurs socio-économiques",
      icon: Wallet,
      color: "bg-green-500",
      items: [
        "Niveau de revenus",
        "Couverture sociale / mutuelle",
        "Soutien familial et social",
        "Niveau d'éducation",
        "Conditions de vie / précarité",
      ],
    },
    {
      title: "Facteurs liés à la pathologie",
      icon: Heart,
      color: "bg-red-500",
      items: [
        "Sévérité des symptômes",
        "Chronicité de la maladie",
        "Comorbidités associées",
        "Handicap / limitations",
        "Pronostic perçu",
      ],
    },
    {
      title: "Facteurs liés au traitement",
      icon: Pill,
      color: "bg-purple-500",
      items: [
        "Complexité du schéma thérapeutique",
        "Nombre de médicaments (polypharmacie)",
        "Effets indésirables",
        "Durée du traitement",
        "Coût des médicaments",
      ],
    },
    {
      title: "Facteurs liés au système de santé",
      icon: Building2,
      color: "bg-orange-500",
      items: [
        "Relation médecin-patient",
        "Accessibilité aux soins",
        "Continuité du suivi",
        "Éducation thérapeutique",
        "Coordination des soins",
      ],
    },
  ]

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="h-7 px-2 text-xs bg-amber-50 border-amber-300 text-amber-700 hover:bg-amber-100"
        >
          <Info className="h-3 w-3 mr-1" />
          Adhésion
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-center text-lg font-bold text-gray-900">
            5 Dimensions de l'Adhésion au Traitement
          </DialogTitle>
          <p className="text-center text-sm text-gray-500">Modèle OMS - Recommandations ESC 2024</p>
        </DialogHeader>

        <div className="space-y-3 mt-4">
          {dimensions.map((dim, index) => {
            const IconComponent = dim.icon
            return (
              <div key={index} className="rounded-lg border bg-white shadow-sm overflow-hidden">
                <div className={`${dim.color} px-3 py-2 flex items-center gap-2`}>
                  <IconComponent className="h-4 w-4 text-white" />
                  <h3 className="font-semibold text-white text-sm">{dim.title}</h3>
                </div>
                <div className="p-3">
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-1">
                    {dim.items.map((item, i) => (
                      <li key={i} className="text-xs text-gray-700 flex items-start gap-1">
                        <span className="text-gray-400">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-xs text-amber-800">
            <strong>Stratégies pour améliorer l'adhésion (ESC 2024):</strong>
          </p>
          <ul className="text-xs text-amber-700 mt-2 space-y-1">
            <li>• Simplifier le schéma thérapeutique (piluliers, associations fixes)</li>
            <li>• Éducation thérapeutique personnalisée</li>
            <li>• Entretiens motivationnels réguliers</li>
            <li>• Implication de l'entourage</li>
            <li>• Suivi par IPA / pharmacien</li>
          </ul>
        </div>

        <div className="mt-3 p-2 bg-gray-100 rounded text-center">
          <p className="text-xs text-gray-600">
            <strong>Ref:</strong> ESC 2024 CCS Guidelines - Section 7: Lifestyle & Risk Factor Management
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default PopupAdhesion
