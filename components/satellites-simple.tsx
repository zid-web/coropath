"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2, Clock, AlertTriangle } from "lucide-react"

export function TriageInitial() {
    return (
        <div className="space-y-4">
            <div className="flex items-center gap-3 mb-4 p-3 bg-red-950/20 border border-red-500/20 rounded-lg">
                <Clock className="w-5 h-5 text-red-500" />
                <div>
                    <h4 className="font-semibold text-red-400">Objectifs de Délais d'Urgence</h4>
                    <p className="text-xs text-red-300">ESC 2023 Guidelines - STEMI/NSTEMI</p>
                </div>
            </div>

            <div className="grid gap-3">
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>ECG 12 dérivations {"<"} 10 min</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Prélèvement Troponine Hs (H0)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Pose VVP / Oxygène (si SpO2 {"<"} 90%)</span>
                </div>
                <div className="flex items-center gap-2 p-3 bg-slate-900 rounded border border-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-green-500" />
                    <span>Monitoring Cardiaque Continu</span>
                </div>
            </div>
        </div>
    )
}

export function TestsFonctionnels() {
    return (
        <div className="space-y-4">
            <div className="p-4 bg-blue-950/20 rounded-lg border border-blue-500/20">
                <h3 className="font-semibold text-blue-400 mb-2">Imagerie Anatomique (Coro-CT)</h3>
                <p className="text-sm text-slate-300 mb-2">Recommandé si PTP 5-15% ou probabilité intermédiaire sans ATCD coronariens.</p>
                <Badge variant="outline" className="border-blue-500/50 text-blue-400">Excellente VPN</Badge>
            </div>

            <div className="p-4 bg-orange-950/20 rounded-lg border border-orange-500/20">
                <h3 className="font-semibold text-orange-400">Tests d'Ischémie (Echo/IRM Stress)</h3>
                <p className="text-sm text-slate-300 mb-2">Recommandé si PTP {">"} 15% ou revascularisation envisagée.</p>
                <Badge variant="outline" className="border-orange-500/50 text-orange-400">Valeur pronostique +++</Badge>
            </div>
        </div>
    )
}

export function SuiviPostHospitalisation() {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-green-400">Checklist de Sortie</h3>
            <div className="grid gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                    <span>Ordonnance de sortie (BASIC)</span>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                    <span>Arrêt de travail / Soins infirmiers</span>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                    <span>Rendez-vous Cardiologue (4-6 semaines)</span>
                </div>
                <div className="flex items-center gap-2">
                    <input type="checkbox" className="rounded border-slate-600 bg-slate-800" />
                    <span>Inscription Réadaptation Cardiaque (Phase II)</span>
                </div>
            </div>
        </div>
    )
}
