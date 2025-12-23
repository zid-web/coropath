"use client"

import { Phone } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PhoneNumberProps {
  number: string
  label?: string
  variant?: "inline" | "button"
  urgent?: boolean
}

export function PhoneNumber({ number, label, variant = "inline", urgent = false }: PhoneNumberProps) {
  const formattedNumber = number.replace(/\s/g, "")

  if (variant === "button") {
    return (
      <Button
        size="sm"
        variant={urgent ? "destructive" : "outline"}
        className="gap-2"
        onClick={() => (window.location.href = `tel:${formattedNumber}`)}
      >
        <Phone className="h-4 w-4" />
        {label || number}
      </Button>
    )
  }

  return (
    <a
      href={`tel:${formattedNumber}`}
      className={`inline-flex items-center gap-1.5 font-semibold underline decoration-2 hover:decoration-4 transition-all ${
        urgent ? "text-red-600 hover:text-red-700" : "text-blue-600 hover:text-blue-700"
      }`}
    >
      <Phone className="h-3.5 w-3.5" />
      {number}
    </a>
  )
}
