"use client"

import { Heart, Phone, Calculator, BookOpen } from "lucide-react"
import { cn } from "@/lib/utils"

interface BottomNavProps {
  activeTab: string
  onTabChange: (tab: string) => void
  onOpenCalculator: () => void
}

export function BottomNav({ activeTab, onTabChange, onOpenCalculator }: BottomNavProps) {
  const navItems = [
    { id: "sca", label: "SCA", icon: Heart, color: "text-red-500" },
    { id: "douleur", label: "Cabinet", icon: BookOpen, color: "text-orange-500" },
    { id: "contacts", label: "Urgences", icon: Phone, color: "text-green-500" },
    { id: "calculator", label: "Calcul", icon: Calculator, color: "text-blue-500", action: true },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 backdrop-blur-lg safe-area-pb md:hidden">
      <div className="grid grid-cols-4 gap-1 px-2 py-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => (item.action ? onOpenCalculator() : onTabChange(item.id))}
              className={cn(
                "flex flex-col items-center justify-center gap-0.5 rounded-xl py-2 transition-all",
                isActive && !item.action ? "bg-blue-50 text-blue-600" : "text-gray-500 hover:bg-gray-50",
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && !item.action ? "text-blue-600" : item.color)} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
