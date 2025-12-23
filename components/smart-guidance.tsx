"use client"

import { useSmartNavigation } from "@/hooks/use-smart-navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Lightbulb, ArrowRight, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

interface SmartGuidanceProps {
    activePathwayId: string | null
    onActionClick?: (actionId: string) => void
}

export function SmartGuidance({ activePathwayId, onActionClick }: SmartGuidanceProps) {
    const { suggestion } = useSmartNavigation(activePathwayId)

    if (!suggestion) return null

    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={suggestion.id}
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: "auto" }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-6"
            >
                <div className={`
          relative overflow-hidden rounded-xl border p-4
          ${suggestion.priority === 'high'
                        ? 'bg-red-950/30 border-red-500/30 text-red-100'
                        : 'bg-blue-950/30 border-blue-500/30 text-blue-100'
                    }
        `}>
                    {/* Animated Gradient Background Effect */}
                    <div className={`absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 rounded-full blur-3xl opacity-20 
              ${suggestion.priority === 'high' ? 'bg-red-500' : 'bg-blue-500'}
           `}></div>

                    <div className="flex items-start gap-3 relative z-10">
                        <div className={`p-2 rounded-lg ${suggestion.priority === 'high' ? 'bg-red-500/20' : 'bg-blue-500/20'}`}>
                            <Sparkles className={`w-5 h-5 ${suggestion.priority === 'high' ? 'text-red-400' : 'text-blue-400'}`} />
                        </div>

                        <div className="flex-1">
                            <h4 className="font-semibold text-sm uppercase tracking-wider opacity-70 flex items-center gap-2">
                                Assistant CoroPath
                                {suggestion.priority === 'high' && <span className="text-[10px] bg-red-500/20 text-red-300 px-1.5 py-0.5 rounded border border-red-500/30">PRIORITAIRE</span>}
                            </h4>
                            <p className="text-base font-medium mt-1 leading-snug">
                                {suggestion.message}
                            </p>

                            {suggestion.actionLabel && suggestion.actionId && (
                                <Button
                                    onClick={() => onActionClick?.(suggestion.actionId!)}
                                    variant="ghost"
                                    size="sm"
                                    className={`mt-3 pl-0 hover:bg-transparent ${suggestion.priority === 'high' ? 'text-red-300 hover:text-red-200' : 'text-blue-300 hover:text-blue-200'} group`}
                                >
                                    {suggestion.actionLabel}
                                    <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
