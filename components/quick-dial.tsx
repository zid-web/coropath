"use client"

import { Phone, X } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const contacts = [
  { name: "SAMU", number: "15", color: "bg-red-500" },
  { name: "Cardio Garde", number: "0679924458", color: "bg-blue-500" },
  { name: "CHM", number: "0243505050", color: "bg-green-500" },
  { name: "Clinique PSS", number: "0243783939", color: "bg-purple-500" },
]

export function QuickDial() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="fixed bottom-20 right-4 z-50 md:bottom-4">
      {/* Menu des contacts */}
      <div
        className={cn(
          "absolute bottom-16 right-0 flex flex-col gap-2 transition-all duration-300",
          isOpen ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none",
        )}
      >
        {contacts.map((contact, index) => (
          <a
            key={contact.name}
            href={`tel:${contact.number}`}
            className={cn(
              "flex items-center gap-2 rounded-full px-4 py-2 text-white shadow-lg transition-all",
              contact.color,
              "animate-in slide-in-from-right-4",
            )}
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Phone className="h-4 w-4" />
            <span className="text-sm font-medium whitespace-nowrap">{contact.name}</span>
          </a>
        ))}
      </div>

      {/* Bouton principal */}
      <Button
        size="lg"
        className={cn(
          "h-14 w-14 rounded-full shadow-xl transition-all",
          isOpen ? "bg-gray-700 rotate-45" : "bg-green-500 hover:bg-green-600",
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-6 w-6" /> : <Phone className="h-6 w-6" />}
      </Button>
    </div>
  )
}
