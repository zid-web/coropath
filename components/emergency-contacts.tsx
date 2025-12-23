"use client"

import { Phone, Stethoscope, Building2, Mail, Activity } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import ContactCardioMessage from "@/components/contact-cardio-message"

export default function EmergencyContacts() {
  const openOmnidoc = () => {
    window.open("https://omnidoc.fr/login", "_blank", "width=1000,height=700")
  }

  return (
    <Card className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200">
      <div className="p-4 md:p-6">
        <div className="flex items-center gap-2 mb-4">
          <div className="rounded-lg bg-red-500 p-2">
            <Phone className="h-5 w-5 text-white" />
          </div>
          <h2 className="text-xl font-bold text-red-900">Contacts Urgence</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {/* SAMU */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-red-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">SAMU</span>
              <Phone className="h-4 w-4 text-red-500" />
            </div>
            <a href="tel:15" className="text-2xl font-bold text-red-600 hover:text-red-700 transition-colors block">
              15
            </a>
            <p className="text-xs text-gray-600 mt-1">Urgences vitales</p>
          </div>

          {/* Cardiologue de Garde */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-orange-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Cardiologue de Garde</span>
              <div className="flex gap-1">
                <ContactCardioMessage />
                <Stethoscope className="h-4 w-4 text-orange-500" />
              </div>
            </div>
            <a
              href="tel:0679924458"
              className="text-xl font-bold text-orange-600 hover:text-orange-700 transition-colors block"
            >
              06 79 92 44 58
            </a>
            <p className="text-xs text-gray-600 mt-1">Avis spécialisé</p>
          </div>

          {/* Cardiologue Interventionnel */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-blue-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">Cardio Interventionnel</span>
              <Activity className="h-4 w-4 text-blue-500" />
            </div>
            <a
              href="tel:0243782340"
              className="text-xl font-bold text-blue-600 hover:text-blue-700 transition-colors block"
            >
              02 43 78 23 40
            </a>
            <p className="text-xs text-gray-600 mt-1">Coronarographie urgente</p>
          </div>

          {/* USIC */}
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-3 border border-purple-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold text-gray-700">USIC</span>
              <Building2 className="h-4 w-4 text-purple-500" />
            </div>
            <a
              href="tel:0243784572"
              className="text-xl font-bold text-purple-600 hover:text-purple-700 transition-colors block"
            >
              02 43 78 45 72
            </a>
            <p className="text-xs text-gray-600 mt-1">Unité soins intensifs</p>
          </div>
        </div>

        {/* Omnidoc Button */}
        <div className="mt-4 pt-4 border-t border-red-200">
          <Button
            onClick={openOmnidoc}
            variant="outline"
            className="w-full bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300"
          >
            <Stethoscope className="h-4 w-4 mr-2" />
            Accéder à Omnidoc
            <Mail className="h-4 w-4 ml-2" />
          </Button>
        </div>
      </div>
    </Card>
  )
}
