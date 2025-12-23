"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { BookOpen } from "lucide-react"

export default function ArbreEtudesReference() {
    const [open, setOpen] = useState(false)

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <button className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm hover:shadow">
                    <BookOpen className="h-4 w-4" />
                    <span>Études de Référence</span>
                </button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <BookOpen className="h-6 w-6 text-purple-600" />
                        Études de Référence ESC 2024
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 mt-4">
                    <div className="bg-purple-50 rounded-lg p-4 border-l-4 border-purple-600">
                        <p className="text-sm text-purple-900 font-medium">
                            Principales études cliniques guidant les recommandations ESC 2024 sur la prise en charge des syndromes
                            coronariens chroniques
                        </p>
                    </div>

                    <Accordion type="single" collapsible className="space-y-3">
                        {/* STICH/STICHES */}
                        <AccordionItem value="stich" className="border-2 border-green-200 rounded-lg overflow-hidden">
                            <AccordionTrigger className="bg-green-50 hover:bg-green-100 px-4 py-3 transition-colors">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-600 text-white font-bold text-sm shrink-0">
                                        1
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge className="bg-green-600 text-white">STICH/STICHES</Badge>
                                        <span className="font-semibold text-green-900">CABG + Insuffisance Cardiaque Ischémique</span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-4 space-y-3">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">👥 Population</h4>
                                        <p className="text-sm text-gray-700">
                                            Patients avec insuffisance cardiaque (FEVG ≤ 35%) et coronaropathie multitronc éligibles à la
                                            revascularisation
                                        </p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-green-900 mb-2 flex items-center gap-2">🎯 Design</h4>
                                        <p className="text-sm text-gray-700">Essai randomisé: CABG + TMO vs TMO seul</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">📊 Résultats Principaux</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span>
                                                <strong>Survie à 10 ans:</strong> CABG + TMO améliore la survie (58% vs 41%, p&lt;0.001)
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span>
                                                <strong>Mortalité CV:</strong> Réduction significative avec CABG
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-green-600 font-bold">✓</span>
                                            <span>
                                                <strong>Hospitalisations:</strong> Moins d'hospitalisations pour IC
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-green-100 rounded-lg p-3 border-l-4 border-green-600">
                                    <p className="text-sm font-semibold text-green-900">
                                        💡 Message Clé: CABG améliore significativement la survie à long terme chez les patients avec IC
                                        ischémique et coronaropathie multitronc
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* REVIVED-BCIS2 */}
                        <AccordionItem value="revived" className="border-2 border-orange-200 rounded-lg overflow-hidden">
                            <AccordionTrigger className="bg-orange-50 hover:bg-orange-100 px-4 py-3 transition-colors">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-600 text-white font-bold text-sm shrink-0">
                                        2
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge className="bg-orange-600 text-white">REVIVED-BCIS2</Badge>
                                        <span className="font-semibold text-orange-900">PCI + Insuffisance Cardiaque Ischémique</span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-4 space-y-3">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-orange-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">👥 Population</h4>
                                        <p className="text-sm text-gray-700">
                                            Patients avec IC (FEVG ≤ 35%), viabilité myocardique démontrée et coronaropathie extensive
                                        </p>
                                    </div>
                                    <div className="bg-orange-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-orange-900 mb-2 flex items-center gap-2">🎯 Design</h4>
                                        <p className="text-sm text-gray-700">Essai randomisé: PCI + TMO vs TMO seul</p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">📊 Résultats Principaux</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-600 font-bold">×</span>
                                            <span>
                                                <strong>Critère primaire:</strong> Pas de différence mortalité ou hospitalisation IC (HR 0.99,
                                                p=0.96)
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-600 font-bold">×</span>
                                            <span>
                                                <strong>FEVG:</strong> Pas d'amélioration significative de la fonction VG
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-orange-600 font-bold">×</span>
                                            <span>
                                                <strong>Qualité de vie:</strong> Pas de bénéfice démontré
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-orange-100 rounded-lg p-3 border-l-4 border-orange-600">
                                    <p className="text-sm font-semibold text-orange-900">
                                        💡 Message Clé: PCI seul n'améliore pas le pronostic des patients IC ischémique avec viabilité.
                                        Privilégier CABG si revascularisation indiquée
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>

                        {/* ISCHEMIA */}
                        <AccordionItem value="ischemia" className="border-2 border-blue-200 rounded-lg overflow-hidden">
                            <AccordionTrigger className="bg-blue-50 hover:bg-blue-100 px-4 py-3 transition-colors">
                                <div className="flex items-center gap-3 w-full">
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white font-bold text-sm shrink-0">
                                        3
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Badge className="bg-blue-600 text-white">ISCHEMIA</Badge>
                                        <span className="font-semibold text-blue-900">Revascularisation + Ischémie Stable</span>
                                    </div>
                                </div>
                            </AccordionTrigger>
                            <AccordionContent className="bg-white p-4 space-y-3">
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">👥 Population</h4>
                                        <p className="text-sm text-gray-700">
                                            Patients avec coronaropathie stable et ischémie modérée à sévère (≥10% myocarde)
                                        </p>
                                    </div>
                                    <div className="bg-blue-50 rounded-lg p-3">
                                        <h4 className="font-semibold text-blue-900 mb-2 flex items-center gap-2">🎯 Design</h4>
                                        <p className="text-sm text-gray-700">
                                            Essai randomisé: Stratégie invasive (PCI/CABG) + TMO vs TMO seul
                                        </p>
                                    </div>
                                </div>
                                <div className="bg-gray-50 rounded-lg p-4">
                                    <h4 className="font-semibold text-gray-900 mb-2">📊 Résultats Principaux</h4>
                                    <ul className="space-y-2 text-sm text-gray-700">
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-bold">≈</span>
                                            <span>
                                                <strong>Critère primaire:</strong> Pas de différence mortalité CV ou IDM à 3.3 ans (13.3% vs
                                                15.5%, p=0.34)
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-bold">✓</span>
                                            <span>
                                                <strong>Symptômes:</strong> Amélioration plus importante de l'angor avec stratégie invasive
                                            </span>
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="text-blue-600 font-bold">✓</span>
                                            <span>
                                                <strong>Qualité de vie:</strong> Bénéfice modeste pour revascularisation
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                                <div className="bg-blue-100 rounded-lg p-3 border-l-4 border-blue-600">
                                    <p className="text-sm font-semibold text-blue-900">
                                        💡 Message Clé: Débuter par TMO optimal. Revascularisation réservée aux patients avec angor
                                        persistant malgré TMO ou ischémie très extensive
                                    </p>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    {/* Tableau récapitulatif */}
                    <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4 border border-purple-200">
                        <h4 className="font-semibold text-purple-900 mb-3">📋 Tableau Récapitulatif</h4>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                                <thead>
                                    <tr className="bg-purple-100">
                                        <th className="text-left p-2 font-semibold text-purple-900">Étude</th>
                                        <th className="text-left p-2 font-semibold text-purple-900">Population</th>
                                        <th className="text-left p-2 font-semibold text-purple-900">Intervention</th>
                                        <th className="text-left p-2 font-semibold text-purple-900">Conclusion</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-purple-100">
                                    <tr className="bg-white">
                                        <td className="p-2 font-medium text-green-700">STICH/STICHES</td>
                                        <td className="p-2 text-gray-700">IC + FEVG≤35%</td>
                                        <td className="p-2 text-gray-700">CABG vs TMO</td>
                                        <td className="p-2 text-green-700 font-medium">✓ CABG améliore survie</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-2 font-medium text-orange-700">REVIVED-BCIS2</td>
                                        <td className="p-2 text-gray-700">IC + viabilité</td>
                                        <td className="p-2 text-gray-700">PCI vs TMO</td>
                                        <td className="p-2 text-orange-700 font-medium">× PCI sans bénéfice</td>
                                    </tr>
                                    <tr className="bg-white">
                                        <td className="p-2 font-medium text-blue-700">ISCHEMIA</td>
                                        <td className="p-2 text-gray-700">Ischémie stable</td>
                                        <td className="p-2 text-gray-700">Invasif vs TMO</td>
                                        <td className="p-2 text-blue-700 font-medium">≈ TMO d'abord</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="bg-purple-100 rounded-lg p-3">
                        <p className="text-xs text-purple-900">
                            <strong>Référence ESC 2024:</strong> Ces études majeures ont façonné les recommandations actuelles sur la
                            stratégie de revascularisation dans les syndromes coronariens chroniques
                        </p>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}
