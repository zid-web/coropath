import { CalculetteRFCL } from "@/components/calculette-rfcl"
import { CalculetteGrace } from "@/components/calculette-grace"
import { CalculetteRevascularisation } from "@/components/calculette-revascularisation"
import { PopupLifestyle } from "@/components/popup-lifestyle"
import { AntithromboticTree } from "@/components/decision-trees/antithrombotic-tree"
import { AntianginalTree } from "@/components/decision-trees/antianginal-tree"
import { TriageInitial, TestsFonctionnels, SuiviPostHospitalisation } from "@/components/satellites-simple"
import { DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"

function SatelliteContainer({ children, className }: { children: React.ReactNode, className?: string }) {
    return (
        <div className={cn("p-6 bg-slate-950/95 backdrop-blur-xl border border-slate-800 rounded-lg h-full", className)}>
            {children}
        </div>
    )
}

export function renderSatelliteContent(actionId: string) {
    switch (actionId) {
        case "triage-initial":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl">⏱️</span> Triage & Délais
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">Checklist de prise en charge immédiate (H0)</DialogDescription>
                    </DialogHeader>
                    <TriageInitial />
                </SatelliteContainer>
            )
        case "tests-fonc":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl">🔍</span> Choix des Tests
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">Stratégie diagnostique selon la PTP</DialogDescription>
                    </DialogHeader>
                    <TestsFonctionnels />
                </SatelliteContainer>
            )
        case "consult-ipa":
        case "readapt":
        case "suivi-long":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="flex items-center gap-3 text-xl">
                            <span className="text-2xl">📋</span> Suivi & Réadaptation
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">Checklist de sortie et prévention secondaire</DialogDescription>
                    </DialogHeader>
                    <SuiviPostHospitalisation />
                </SatelliteContainer>
            )
        case "calc-rfcl":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl">Calculette CACS-CL Pro</DialogTitle>
                        <DialogDescription className="text-slate-400">Probabilité pré-test ESC 2024</DialogDescription>
                    </DialogHeader>
                    <CalculetteRFCL />
                </SatelliteContainer>
            )
        case "calc-grace":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl">Calculette Score GRACE</DialogTitle>
                        <DialogDescription className="text-slate-400">Stratification du risque en SCA (ESC 2023)</DialogDescription>
                    </DialogHeader>
                    <CalculetteGrace />
                </SatelliteContainer>
            )
        case "calc-revasc":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl">Aide à la Revascularisation</DialogTitle>
                        <DialogDescription className="text-slate-400">PCI vs CABG - Recommandations ESC</DialogDescription>
                    </DialogHeader>
                    <CalculetteRevascularisation />
                </SatelliteContainer>
            )
        case "lifestyle":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-xl">Hygiène de Vie et Prévention</DialogTitle>
                        <DialogDescription className="text-slate-400">Interventions non médicamenteuses</DialogDescription>
                    </DialogHeader>
                    <PopupLifestyle category="prevention" trigger={null} />
                </SatelliteContainer>
            )
        case "arbre-anti-anginal":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-blue-500">💊</span> Traitement Anti-Angineux
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Algorithme décisionnel pas à pas (Approche "Diamond").
                        </DialogDescription>
                    </DialogHeader>
                    <AntianginalTree />
                </SatelliteContainer>
            )
        case "arbre-anti-thromb":
            return (
                <SatelliteContainer>
                    <DialogHeader className="mb-6">
                        <DialogTitle className="text-2xl font-bold flex items-center gap-2">
                            <span className="text-red-500">🩸</span> Stratégie Antithrombotique
                        </DialogTitle>
                        <DialogDescription className="text-slate-400">
                            Algorithme DAPT/SAPT selon ESC 2023.
                        </DialogDescription>
                    </DialogHeader>
                    <AntithromboticTree />
                </SatelliteContainer>
            )
        default:
            return (
                <SatelliteContainer className="flex flex-col items-center justify-center text-center">
                    <h3 className="text-xl font-semibold mb-2 text-slate-300">Composant en cours de développement</h3>
                    <p className="text-slate-500">L'action demandée sera bientôt disponible.</p>
                </SatelliteContainer>
            )
    }
}
