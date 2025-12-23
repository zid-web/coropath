"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowLeft, CheckCircle2, AlertCircle, RefreshCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export type TreeNodeType = "question" | "recommendation" | "info"

export type TreeOption = {
    label: string
    nextNodeId: string
    variant?: "default" | "secondary" | "outline" | "destructive" | "ghost"
}

export type DecisionNode = {
    id: string
    type: TreeNodeType
    title: string
    content?: string
    options?: TreeOption[]
    recommendationType?: "success" | "warning" | "danger" | "neutral"
}

export type DecisionTreeProps = {
    nodes: Record<string, DecisionNode>
    initialNodeId: string
    onComplete?: (result: string) => void
    onReset?: () => void
}

export function DecisionTreeFlow({ nodes, initialNodeId, onComplete, onReset }: DecisionTreeProps) {
    const [history, setHistory] = useState<string[]>([])
    const [currentNodeId, setCurrentNodeId] = useState<string>(initialNodeId)
    const currentNode = nodes[currentNodeId]

    const handleOptionClick = (nextNodeId: string) => {
        setHistory((prev) => [...prev, currentNodeId])
        setCurrentNodeId(nextNodeId)
    }

    const handleBack = () => {
        if (history.length === 0) return
        const newHistory = [...history]
        const prevNodeId = newHistory.pop()
        setHistory(newHistory)
        if (prevNodeId) setCurrentNodeId(prevNodeId)
    }

    const handleReset = () => {
        setHistory([])
        setCurrentNodeId(initialNodeId)
        onReset?.()
    }

    if (!currentNode) {
        return <div className="text-red-500">Erreur: Noeud introuvable ({currentNodeId})</div>
    }

    const isRecommendation = currentNode.type === "recommendation"

    return (
        <div className="w-full max-w-md mx-auto">
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentNodeId}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                >
                    <Card className={`border-2 ${isRecommendation ? getRecommendationBorder(currentNode.recommendationType) : "border-slate-800"} bg-slate-900/50 backdrop-blur`}>
                        <CardHeader>
                            <div className="flex justify-between items-start">
                                {history.length > 0 && (
                                    <Button variant="ghost" size="sm" onClick={handleBack} className="mb-2 -ml-2 text-slate-400 hover:text-white">
                                        <ArrowLeft className="w-4 h-4 mr-1" /> Retour
                                    </Button>
                                )}
                                {isRecommendation && (
                                    <Badge className={getRecommendationBadgeStyle(currentNode.recommendationType)}>
                                        Recommandation
                                    </Badge>
                                )}
                            </div>

                            <CardTitle className={`text-xl font-bold ${isRecommendation ? "text-white" : "text-slate-100"}`}>
                                {currentNode.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            {currentNode.content && (
                                <div className="text-slate-300 text-base leading-relaxed whitespace-pre-line">
                                    {currentNode.content}
                                </div>
                            )}
                        </CardContent>
                        <CardFooter className="flex flex-col gap-3">
                            {isRecommendation ? (
                                <Button onClick={handleReset} variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800">
                                    <RefreshCcw className="w-4 h-4 mr-2" /> Recommencer
                                </Button>
                            ) : (
                                <div className="grid grid-cols-1 w-full gap-3">
                                    {currentNode.options?.map((option, index) => (
                                        <Button
                                            key={index}
                                            variant={option.variant || "secondary"}
                                            className="w-full justify-start text-left h-auto py-3 px-4 text-base"
                                            onClick={() => handleOptionClick(option.nextNodeId)}
                                        >
                                            {option.label}
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </CardFooter>
                    </Card>
                </motion.div>
            </AnimatePresence>
        </div>
    )
}

function getRecommendationBorder(type?: string) {
    switch (type) {
        case "success": return "border-green-500 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
        case "warning": return "border-orange-500 shadow-[0_0_15px_rgba(249,115,22,0.3)]"
        case "danger": return "border-red-500 shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        default: return "border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.3)]"
    }
}

function getRecommendationBadgeStyle(type?: string) {
    switch (type) {
        case "success": return "bg-green-500/20 text-green-400 border-green-500/50"
        case "warning": return "bg-orange-500/20 text-orange-400 border-orange-500/50"
        case "danger": return "bg-red-500/20 text-red-500 border-red-500/50"
        default: return "bg-blue-500/20 text-blue-400 border-blue-500/50"
    }
}
