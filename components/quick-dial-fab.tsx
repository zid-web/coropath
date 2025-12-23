"use client"

import { useState } from "react"
import { Phone, X, PhoneCall, Stethoscope, Ambulance, Activity } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

export function QuickDialFAB() {
  const [isOpen, setIsOpen] = useState(false)

  const emergencyNumbers = [
    { label: "SAMU 72", number: "15", icon: Ambulance, urgent: true },
    { label: "Cardio Garde", number: "0679924458", icon: Stethoscope, urgent: false },
    { label: "Cardio Interv.", number: "0243782340", icon: PhoneCall, urgent: false }, // Corrigé le numéro
    { label: "USIC/Avis", number: "0243784572", icon: Activity, urgent: false }, // Changé label en USIC/Avis
  ]

  return (
    <>
      {/* Menu déroulant */}
      {isOpen && (
        <div className="fixed bottom-24 right-4 z-40 space-y-2 animate-in slide-in-from-bottom-2">
          <Card className="p-3 shadow-xl bg-white/95 backdrop-blur-sm">
            <div className="space-y-2 min-w-[200px]">
              <p className="text-xs font-semibold text-gray-600 mb-2">Appels Rapides</p>
              {emergencyNumbers.map((item) => (
                <a
                  key={item.label}
                  href={`tel:${item.number.replace(/\s/g, "")}`}
                  className={`flex items-center gap-2 p-2 rounded-lg hover:bg-gray-100 transition-colors active:scale-95 ${
                    item.urgent ? "bg-red-50 hover:bg-red-100" : ""
                  }`}
                >
                  <item.icon className={`h-4 w-4 ${item.urgent ? "text-red-600" : "text-blue-600"}`} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-900">{item.label}</p>
                    <p className="text-xs text-gray-500">
                      {item.number.length <= 2 ? item.number : item.number.replace(/(\d{2})(?=\d)/g, "$1 ")}
                    </p>
                  </div>
                </a>
              ))}
            </div>
          </Card>
        </div>
      )}

      {/* Bouton FAB */}
      <Button
        size="lg"
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-20 md:bottom-6 right-4 z-50 h-14 w-14 rounded-full shadow-2xl transition-all duration-300 ${
          isOpen
            ? "bg-gray-800 hover:bg-gray-900 rotate-90"
            : "bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
        }`}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </Button>
    </>
  )
}

export default QuickDialFAB
