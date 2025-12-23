"use client"

import { useState } from "react"
import { Heart, Stethoscope, Activity, Calendar } from "lucide-react"
import { Card } from "@/components/ui/card"

interface BubbleNavigationProps {
  onSelectPathway: (pathway: string) => void
}

export default function BubbleNavigation({ onSelectPathway }: BubbleNavigationProps) {
  const [hoveredBubble, setHoveredBubble] = useState<string | null>(null)

  const bubbles = [
    {
      id: "douleur", // Corrigé pour correspondre aux tabs
      label: "Douleur au Cabinet",
      icon: Stethoscope,
      color: "from-orange-400 to-orange-600",
      description: "Évaluation et prise en charge ambulatoire",
      position: { x: "20%", y: "25%" },
      size: "w-40 h-40 md:w-48 md:h-48",
    },
    {
      id: "sca", // Corrigé pour correspondre aux tabs
      label: "SCA Filière Courte",
      icon: Heart,
      color: "from-red-500 to-red-700",
      description: "Urgence - Syndrome coronaire aigu",
      position: { x: "70%", y: "20%" },
      size: "w-44 h-44 md:w-52 md:h-52",
    },
    {
      id: "scc", // Corrigé pour correspondre aux tabs
      label: "Syndrome Coronaire Chronique",
      icon: Activity,
      color: "from-blue-500 to-blue-700",
      description: "Prise en charge et suivi chronique",
      position: { x: "25%", y: "65%" },
      size: "w-42 h-42 md:w-50 md:h-50",
    },
    {
      id: "post", // Corrigé pour correspondre aux tabs
      label: "Suivi Post-Hospitalisation",
      icon: Calendar,
      color: "from-green-500 to-green-700",
      description: "Réadaptation et surveillance",
      position: { x: "65%", y: "70%" },
      size: "w-40 h-40 md:w-48 md:h-48",
    },
  ]

  return (
    <div className="relative w-full h-[calc(100vh-12rem)] min-h-[600px]">
      {/* Background animated gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 animate-gradient-shift" />

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-blue-300/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 10}s`,
            }}
          />
        ))}
      </div>

      {/* Bubbles */}
      {bubbles.map((bubble) => {
        const Icon = bubble.icon
        const isHovered = hoveredBubble === bubble.id

        return (
          <div
            key={bubble.id}
            className="absolute"
            style={{
              left: bubble.position.x,
              top: bubble.position.y,
              transform: "translate(-50%, -50%)",
            }}
          >
            <button
              onClick={() => onSelectPathway(bubble.id)}
              onMouseEnter={() => setHoveredBubble(bubble.id)}
              onMouseLeave={() => setHoveredBubble(null)}
              className={`
                ${bubble.size}
                rounded-full
                bg-gradient-to-br ${bubble.color}
                shadow-2xl
                backdrop-blur-sm
                border-4 border-white/50
                flex flex-col items-center justify-center gap-2
                transition-all duration-500 ease-out
                cursor-pointer
                group
                ${isHovered ? "scale-125 shadow-3xl ring-4 ring-white/60" : "scale-100 hover:scale-110"}
              `}
              style={{
                animation: `float ${5 + Math.random() * 3}s ease-in-out infinite`,
                animationDelay: `${Math.random() * 2}s`,
              }}
            >
              <Icon className="h-10 w-10 md:h-12 md:w-12 text-white group-hover:scale-110 transition-transform" />
              <span className="text-white font-bold text-sm md:text-base text-center px-3 leading-tight">
                {bubble.label}
              </span>

              {/* Tooltip on hover */}
              {isHovered && (
                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-64 z-10 animate-in fade-in slide-in-from-bottom-2 duration-300">
                  <Card className="bg-white/95 backdrop-blur-sm shadow-xl border-2">
                    <div className="p-3 text-center">
                      <p className="text-sm text-gray-700">{bubble.description}</p>
                    </div>
                  </Card>
                </div>
              )}
            </button>
          </div>
        )
      })}

      {/* Instruction text */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center">
        <p className="text-lg font-semibold text-gray-700 animate-pulse">Cliquez sur une bulle pour commencer</p>
      </div>
    </div>
  )
}
