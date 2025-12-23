"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Tabs } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Stethoscope, AlertCircle, Activity, Calendar } from "lucide-react"
import { PATHWAYS } from "@/lib/pathways-data"
import { PathwaySatellites } from "@/components/pathway-satellites"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { SmartContentRenderer } from "@/components/smart-content-renderer"
import { SmartGuidance } from "@/components/smart-guidance"
import { renderSatelliteContent } from "@/components/satellite-content-renderer"
import { motion, AnimatePresence } from "framer-motion"

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50, damping: 15 } }
}

interface PathwayViewProps {
    activeTab: string
    onBack: () => void
    onTabChange: (value: string) => void
}

export function PathwayView({ activeTab, onBack, onTabChange }: PathwayViewProps) {
    const [activeActionId, setActiveActionId] = useState<string | null>(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)

    const currentPathway = PATHWAYS.find((p) => p.id === activeTab)

    if (!currentPathway) return null

    const handleActionClick = (actionId: string) => {
        setActiveActionId(actionId)
        setIsDialogOpen(true)
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <Button variant="ghost" onClick={onBack} className="mb-4 text-slate-400 hover:text-slate-100 hover:bg-slate-800">
                ← Retour à l'accueil
            </Button>

            <Tabs value={activeTab} onValueChange={onTabChange} className="w-full">
                <Card className="shadow-2xl bg-slate-900 border-slate-700">
                    <CardHeader className="bg-slate-900 border-b border-slate-800">
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                {activeTab === "douleur" && <Stethoscope className="h-8 w-8 text-orange-500" />}
                                {activeTab === "sca" && <AlertCircle className="h-8 w-8 text-red-500 animate-pulse-slow" />}
                                {activeTab === "scc" && <Activity className="h-8 w-8 text-blue-500" />}
                                {activeTab === "post" && <Calendar className="h-8 w-8 text-green-500" />}

                                <div>
                                    <CardTitle className="text-2xl text-slate-100">{currentPathway.title}</CardTitle>
                                    <CardDescription className="text-slate-400">{currentPathway.description}</CardDescription>
                                </div>
                            </div>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-300">
                                {currentPathway.details.Urgence || currentPathway.details.Suivi || "Parcours"}
                            </Badge>
                        </div>

                        {/* Smart Navigation & Quick Actions */}
                        <div className="mt-6">
                            <SmartGuidance activePathwayId={activeTab} onActionClick={handleActionClick} />

                            <PathwaySatellites
                                satellites={currentPathway.satellites}
                                color={currentPathway.color}
                                onActionClick={handleActionClick}
                            />
                        </div>

                    </CardHeader>
                    <CardContent className="py-6 bg-slate-950">
                        <Accordion type="multiple" className="w-full space-y-4">
                            <motion.div
                                variants={containerVariants}
                                initial="hidden"
                                animate="show"
                            >
                                {/* DOULEUR THORACIQUE */}
                                {activeTab === "douleur" && (
                                    <>
                                        <motion.div variants={itemVariants} className="mb-4">
                                            <AccordionItem value="etape1" className="glass-panel border-slate-700 rounded-lg px-4">
                                                <AccordionTrigger className="hover:no-underline text-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(234,88,12,0.5)]">1</div>
                                                        <span className="font-semibold text-left">Évaluation Initiale au Cabinet</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 text-slate-300">
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex items-start gap-3">
                                                            <div className="flex-1 space-y-3">
                                                                <h3 className="font-semibold text-orange-400">Évaluation Initiale au Cabinet</h3>
                                                                <div className="grid md:grid-cols-2 gap-3">
                                                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                                                        <p className="font-medium text-sm mb-2 text-orange-400">Interrogatoire</p>
                                                                        <ul className="text-sm space-y-0.5 text-slate-400">
                                                                            <li>• Caractéristiques de la douleur</li>
                                                                            <li>• Délai d'apparition, durée</li>
                                                                            <li>• Facteurs déclenchants/soulageants</li>
                                                                            <li>• Symptômes associés</li>
                                                                        </ul>
                                                                    </div>
                                                                    <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                                                        <p className="font-medium text-sm mb-2 text-orange-400">Examen Clinique</p>
                                                                        <ul className="text-sm space-y-0.5 text-slate-400">
                                                                            <li>• Constantes: TA, FC, SpO2</li>
                                                                            <li>• Auscultation cardio-pulmonaire</li>
                                                                            <li>• Signes de gravité</li>
                                                                            <li>• ECG 12 dérivations</li>
                                                                        </ul>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <AccordionItem value="etape2" className="glass-panel border-slate-700 rounded-lg px-4">
                                                <AccordionTrigger className="hover:no-underline text-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">2</div>
                                                        <span className="font-semibold text-left">Orientation Diagnostique</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 text-slate-300">
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex-1 space-y-3">
                                                            <h3 className="font-semibold text-blue-400">Orientation Diagnostique</h3>
                                                            <div className="grid gap-3">
                                                                <div className="bg-red-950/30 rounded-lg p-4 border border-red-500/30">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <AlertCircle className="h-5 w-5 text-red-500" />
                                                                        <h4 className="font-semibold text-red-400">Suspicion de SCA (Urgence)</h4>
                                                                    </div>
                                                                    <div className="space-y-2 text-sm">
                                                                        <div className="bg-red-950/50 rounded p-3 border border-red-500/20">
                                                                            <p className="font-semibold text-red-400 mb-2">→ ACTION IMMÉDIATE</p>
                                                                            <div className="space-y-1">
                                                                                <div className="text-red-300"><SmartContentRenderer text="1. Appel SAMU 15 (si instabilité)" /></div>
                                                                                <div className="text-red-300"><strong>2.</strong> OU Appel cardiologue de garde: <a href="tel:0679924458" className="text-red-400 underline">06 79 92 44 58</a></div>
                                                                                <div className="text-red-300"><SmartContentRenderer text="3. Aspirine 250mg PO en attendant" /></div>
                                                                                <div className="text-red-300"><SmartContentRenderer text="4. Hospitalisation USIC immédiate" /></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-blue-950/30 rounded-lg p-4 border border-blue-500/30">
                                                                    <div className="flex items-center gap-2 mb-3">
                                                                        <Activity className="h-5 w-5 text-blue-500" />
                                                                        <h4 className="font-semibold text-blue-400">Angor Stable / SCC Probable</h4>
                                                                    </div>
                                                                    <div className="space-y-2 text-sm">
                                                                        <div className="bg-blue-950/50 rounded p-3 border border-blue-500/20">
                                                                            <p className="font-semibold text-blue-400 mb-2">→ BILAN AMBULATOIRE</p>
                                                                            <div className="space-y-1">
                                                                                <div className="text-blue-300"><SmartContentRenderer text="Calculer probabilité pré-test RF-CL" /></div>
                                                                                <div className="text-blue-300"><SmartContentRenderer text="Bilan bio: lipides (LDL), glycémie" /></div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    </>
                                )}

                                {/* SCA URGENT */}
                                {activeTab === "sca" && (
                                    <>
                                        <motion.div variants={itemVariants} className="mb-4">
                                            <AccordionItem value="etape1" className="glass-panel border-slate-700 rounded-lg px-4">
                                                <AccordionTrigger className="hover:no-underline text-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(220,38,38,0.5)]">1</div>
                                                        <span className="font-semibold text-left">Reconnaissance et Identification</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 text-slate-300">
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex-1 space-y-2">
                                                            <h3 className="font-semibold text-red-500 neon-text-red">Reconnaissance et Identification</h3>
                                                            <div className="space-y-1 text-sm text-slate-400">
                                                                <p className="font-medium text-red-400">Critères diagnostiques (ESC 2023):</p>
                                                                <ul className="space-y-0.5 ml-4">
                                                                    <li>• Douleur thoracique rétrosternale prolongée ({">"} 20 min)</li>
                                                                    <li>• Irradiation: bras gauche, mâchoire, épigastre, dos</li>
                                                                    <li>• Signes associés: sueurs profuses, nausées, dyspnée, malaise</li>
                                                                </ul>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>

                                        <motion.div variants={itemVariants} className="mb-4">
                                            <AccordionItem value="etape2" className="glass-panel border-slate-700 rounded-lg px-4">
                                                <AccordionTrigger className="hover:no-underline text-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(234,88,12,0.5)]">2</div>
                                                        <span className="font-semibold text-left">Régulation SAMU et Prise en Charge Pré-Hospitalière</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 text-slate-300">
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex-1 space-y-2">
                                                            <h3 className="font-semibold text-orange-400">Régulation SAMU et Prise en Charge Pré-Hospitalière</h3>
                                                            <div className="grid md:grid-cols-2 gap-3">
                                                                <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                                                    <p className="text-xs font-medium text-slate-500 mb-1">Actions SAMU</p>
                                                                    <ul className="text-sm space-y-0.5 text-slate-400">
                                                                        <li>• ECG 12 dérivations sur place</li>
                                                                        <li>• Transmission au cardiologue: <a href="tel:0679924458" className="text-blue-400 underline">06 79 92 44 58</a></li>
                                                                        <li className="flex gap-1 items-center">• <SmartContentRenderer text="Aspirine 250mg" /></li>
                                                                    </ul>
                                                                </div>
                                                                <div className="bg-slate-900 rounded-lg p-3 border border-slate-800">
                                                                    <p className="text-xs font-medium text-slate-500 mb-1">Délais cibles ESC 2023</p>
                                                                    <ul className="text-sm space-y-0.5 text-slate-400">
                                                                        <li>• 1er contact médical: {"<"} 10 min</li>
                                                                        <li>• ECG diagnostique: {"<"} 10 min</li>
                                                                    </ul>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>

                                        <motion.div variants={itemVariants}>
                                            <AccordionItem value="etape3" className="glass-panel border-slate-700 rounded-lg px-4">
                                                <AccordionTrigger className="hover:no-underline text-slate-200">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shadow-[0_0_10px_rgba(37,99,235,0.5)]">3</div>
                                                        <span className="font-semibold text-left">Orientation Stratifiée selon ECG et Troponine</span>
                                                    </div>
                                                </AccordionTrigger>
                                                <AccordionContent className="pt-4 text-slate-300">
                                                    <div className="p-4 bg-slate-900/50 rounded-lg border border-slate-800">
                                                        <div className="flex-1 space-y-3">
                                                            <div className="flex items-center justify-between">
                                                                <h3 className="font-semibold text-blue-400">Orientation Stratifiée selon ECG et Troponine</h3>
                                                            </div>
                                                            <div className="grid gap-2">
                                                                <div className="bg-red-950/40 rounded-lg p-3 border border-red-500/40">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Badge variant="destructive" className="text-xs bg-red-600 hover:bg-red-700"><SmartContentRenderer text="STEMI" /></Badge>
                                                                        <span className="text-xs text-red-400 font-medium">Sus-décalage ST ≥ 1mm (2 dérivations contiguës)</span>
                                                                    </div>
                                                                    <div className="space-y-1.5 text-sm">
                                                                        <p className="font-semibold text-red-300">→ Angioplastie Primaire IMMÉDIATE</p>
                                                                        <div className="text-red-400/80">• Délai FMC-Device: {"<"} 90 min</div>
                                                                        <div className="text-red-400/80"><SmartContentRenderer text="• Bithérapie DAPT: Aspirine + Prasugrel/Ticagrelor" /></div>
                                                                    </div>
                                                                </div>
                                                                <div className="bg-orange-950/40 rounded-lg p-3 border border-orange-500/40">
                                                                    <div className="flex items-center gap-2 mb-2">
                                                                        <Badge className="bg-orange-600 text-xs hover:bg-orange-700"><SmartContentRenderer text="NSTEMI" /> Très Haut Risque</Badge>
                                                                        <span className="text-xs text-orange-400 font-medium">Instabilité hémodynamique / rythmique</span>
                                                                    </div>
                                                                    <div className="space-y-1.5 text-sm">
                                                                        <p className="font-semibold text-orange-300">→ Coronarographie {"<"} 2h</p>
                                                                        <div className="text-orange-400/80"><SmartContentRenderer text="• Stratification risque GRACE recommandée" /></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </AccordionContent>
                                            </AccordionItem>
                                        </motion.div>
                                    </>
                                )}
                            </motion.div>
                        </Accordion>
                    </CardContent>
                </Card>
            </Tabs>

            {/* Shared Satellite Dialog */}
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-950 border-slate-800 text-slate-100 p-0">
                    {activeActionId && renderSatelliteContent(activeActionId)}
                </DialogContent>
            </Dialog>
        </div>
    )
}
