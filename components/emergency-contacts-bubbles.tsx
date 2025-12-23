"use client"

import { useState } from "react"
import { Phone, Stethoscope, Activity, Building2 } from "lucide-react"
import { Card } from "@/components/ui/card"
import ContactCardioMessage from "@/components/contact-cardio-message"

export default function EmergencyContactsBubbles() {
  const [hoveredContact, setHoveredContact] = useState<string | null>(null)

  const contacts = [
    {
      id: "samu",
      label: "SAMU",
      number: "15",
      icon: Phone,
      color: "from-red-500 to-red-700",
      description: "Urgences vitales",
      position: { x: "15%", y: "30%" },
      size: "w-32 h-32 md:w-36 md:h-36",
    },
    {
      id: "cardio-garde",
      label: "Cardio Garde",
      number: "0679924458",
      icon: Stethoscope,
      color: "from-orange-500 to-orange-700",
      description: "Avis spécialisé",
      position: { x: "42%", y: "25%" },
      size: "w-36 h-36 md:w-40 md:h-40",
      hasMessage: true,
    },
    {
      id: "cardio-interv",
      label: "Cardio Interv.",
      number: "0243782340",
      icon: Activity,
      color: "from-blue-500 to-blue-700",
      description: "Coronarographie urgente",
      position: { x: "72%", y: "30%" },
      size: "w-32 h-32 md:w-36 md:h-36",
    },
    {
      id: "usic",
      label: "USIC/Avis",
      number: "0243784572",
      icon: Building2,
      color: "from-purple-500 to-purple-700",
      description: "Soins intensifs cardiologiques",
      position: { x: "85%", y: "60%" },
      size: "w-28 h-28 md:w-32 md:h-32",
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-red-50 via-orange-50 to-purple-50 border-2 border-red-200">
      <div className="p-4">
        <h2 className="text-xl font-bold text-red-900 mb-4 flex items-center gap-2">
          <Phone className="h-6 w-6" />
          Contacts Urgence
        </h2>

        <div className="relative w-full h-64 md:h-80">
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-red-100/50 to-purple-100/50 rounded-lg" />

          {/* Contact bubbles */}
          {contacts.map((contact) => {
            const Icon = contact.icon
            const isHovered = hoveredContact === contact.id
            const displayNumber =
              contact.number.length <= 2 ? contact.number : contact.number.replace(/(\d{2})(?=\d)/g, "$1 ")

            return (
              <div
                key={contact.id}
                className="absolute"
                style={{
                  left: contact.position.x,
                  top: contact.position.y,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <a
                  href={`tel:${contact.number.replace(/\s/g, "")}`}
                  onMouseEnter={() => setHoveredContact(contact.id)}
                  onMouseLeave={() => setHoveredContact(null)}
                  className={`
                    ${contact.size}
                    rounded-full
                    bg-gradient-to-br ${contact.color}
                    shadow-xl
                    backdrop-blur-sm
                    border-4 border-white/70
                    flex flex-col items-center justify-center gap-1
                    transition-all duration-300 ease-out
                    cursor-pointer
                    group
                    relative
                    ${isHovered ? "scale-110 shadow-2xl ring-4 ring-white/60" : "scale-100 hover:scale-105"}
                  `}
                  style={{
                    animation: `float ${3 + Math.random() * 2}s ease-in-out infinite`,
                    animationDelay: `${Math.random() * 1}s`,
                  }}
                >
                  <Icon className="h-6 w-6 md:h-8 md:w-8 text-white group-hover:scale-110 transition-transform" />
                  <span className="text-white font-bold text-xs md:text-sm text-center px-2">{contact.label}</span>
                  <span className="text-white/90 font-semibold text-xs">{displayNumber}</span>

                  {/* Message icon if applicable */}
                  {contact.hasMessage && (
                    <div className="absolute -top-2 -right-2" onClick={(e) => e.preventDefault()}>
                      <ContactCardioMessage />
                    </div>
                  )}

                  {/* Tooltip on hover */}
                  {isHovered && (
                    <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-48 z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                      <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2">
                        <div className="p-2 text-center">
                          <p className="text-xs text-gray-700">{contact.description}</p>
                        </div>
                      </Card>
                    </div>
                  )}
                </a>
              </div>
            )
          })}
        </div>

        {/* Omnidoc access */}
        <div className="mt-4 pt-3 border-t border-red-200">
          <button
            onClick={() => window.open("https://omnidoc.fr/login", "_blank", "width=1000,height=700")}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            <Stethoscope className="h-4 w-4" />
            Accéder à Omnidoc
          </button>
        </div>
      </div>
    </Card>
  )
}
