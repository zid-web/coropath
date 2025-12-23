"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Stethoscope, Heart, Activity, ArrowLeft, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

interface AtomicNavigationProps {
  onPathwaySelect: (pathway: string) => void
}

const pathways = [
  {
    id: "douleur",
    label: "Douleur Cabinet",
    icon: Stethoscope,
    color: "from-orange-500 to-red-500",
    position: { x: -150, y: -150 },
  },
  {
    id: "sca",
    label: "SCA Filière",
    icon: Heart,
    color: "from-red-600 to-pink-600",
    position: { x: 150, y: -150 },
  },
  {
    id: "scc",
    label: "Syndrome Coronaire",
    icon: Activity,
    color: "from-blue-600 to-cyan-600",
    position: { x: -150, y: 150 },
  },
  {
    id: "post",
    label: "Suivi Post-Hospit",
    icon: Users,
    color: "from-green-600 to-emerald-600",
    position: { x: 150, y: 150 },
  },
]

export default function AtomicNavigation({ onPathwaySelect }: AtomicNavigationProps) {
  const [selectedPathway, setSelectedPathway] = useState<string | null>(null)

  const handleNucleusClick = (pathwayId: string) => {
    setSelectedPathway(pathwayId)
    onPathwaySelect(pathwayId)
  }

  const handleBack = () => {
    setSelectedPathway(null)
  }

  return (
    <div className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
      {/* Titre */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="absolute top-8 left-0 right-0 text-center z-10"
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
          Parcours de Soins Coronaires
        </h2>
        <p className="text-muted-foreground mt-2">Sélectionnez un parcours pour explorer son contenu</p>
      </motion.div>

      {/* Bouton retour */}
      <AnimatePresence>
        {selectedPathway && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="absolute top-8 left-8 z-20"
          >
            <Button onClick={handleBack} variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Retour
            </Button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Noyau central - Vue globale */}
      <AnimatePresence mode="wait">
        {!selectedPathway && (
          <motion.div
            key="global"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            {/* Orbites */}
            {[1, 2, 3].map((orbit) => (
              <motion.div
                key={orbit}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-dashed border-muted-foreground/20"
                style={{
                  width: orbit * 200,
                  height: orbit * 200,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20 + orbit * 10,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}

            {/* Noyaux des 4 parcours */}
            {pathways.map((pathway, index) => {
              const Icon = pathway.icon
              return (
                <motion.button
                  key={pathway.id}
                  onClick={() => handleNucleusClick(pathway.id)}
                  className={`absolute top-1/2 left-1/2 w-32 h-32 rounded-full bg-gradient-to-br ${pathway.color} shadow-2xl flex flex-col items-center justify-center text-white cursor-pointer hover:scale-110 transition-transform group`}
                  style={{
                    transform: `translate(calc(-50% + ${pathway.position.x}px), calc(-50% + ${pathway.position.y}px))`,
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Icon className="h-10 w-10 mb-2 group-hover:animate-pulse" />
                  <span className="text-xs font-semibold text-center px-2 leading-tight">{pathway.label}</span>
                </motion.button>
              )
            })}

            {/* Noyau central décoratif */}
            <motion.div
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 shadow-2xl"
              animate={{
                scale: [1, 1.2, 1],
                rotate: 360,
              }}
              transition={{
                scale: {
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
                rotate: {
                  duration: 8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                },
              }}
            >
              <div className="absolute inset-2 rounded-full bg-white/20 backdrop-blur-sm" />
            </motion.div>
          </motion.div>
        )}

        {/* Vue parcours sélectionné */}
        {selectedPathway && (
          <motion.div
            key={selectedPathway}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="relative"
          >
            {/* Orbites pour le contenu */}
            {[1, 2, 3, 4].map((orbit) => (
              <motion.div
                key={orbit}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed opacity-30"
                style={{
                  width: orbit * 150,
                  height: orbit * 150,
                  borderColor: pathways
                    .find((p) => p.id === selectedPathway)
                    ?.color.split(" ")[0]
                    .replace("from-", ""),
                }}
                animate={{
                  rotate: orbit % 2 === 0 ? 360 : -360,
                }}
                transition={{
                  duration: 15 + orbit * 5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "linear",
                }}
              />
            ))}

            {/* Noyau central du parcours sélectionné */}
            <motion.div
              className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-full bg-gradient-to-br ${
                pathways.find((p) => p.id === selectedPathway)?.color
              } shadow-2xl flex flex-col items-center justify-center text-white`}
              animate={{
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                ease: "easeInOut",
              }}
            >
              {(() => {
                const Icon = pathways.find((p) => p.id === selectedPathway)?.icon || Activity
                return <Icon className="h-12 w-12" />
              })()}
            </motion.div>

            {/* Message - Le contenu détaillé s'affiche en dessous */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="absolute top-full mt-8 left-1/2 -translate-x-1/2 text-center"
            >
              <p className="text-sm text-muted-foreground">Contenu détaillé ci-dessous ↓</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
