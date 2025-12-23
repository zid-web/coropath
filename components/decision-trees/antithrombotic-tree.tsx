"use client"

import { DecisionNode, DecisionTreeFlow } from "./decision-tree-flow"

const ANTITHROMBOTIC_NODES: Record<string, DecisionNode> = {
    start: {
        id: "start",
        type: "question",
        title: "Contexte Clinique",
        content: "Quel est le contexte clinique du patient ?",
        options: [
            { label: "SCA (Syndrome Coronarien Aigu)", nextNodeId: "sca_bleeding", variant: "default" },
            { label: "SCC (Syndrome Coronarien Chronique)", nextNodeId: "ccs_risk", variant: "secondary" },
        ],
    },
    // --- BRANCHE SC A---
    sca_bleeding: {
        id: "sca_bleeding",
        type: "question",
        title: "Risque Hémorragique (SCA)",
        content: "Évaluation du risque hémorragique (ex: critères PRECISE-DAPT ou ARC-HBR) ?",
        options: [
            { label: "Risque Très Haut (HBR)", nextNodeId: "sca_hbr", variant: "destructive" },
            { label: "Risque Haut", nextNodeId: "sca_high", variant: "outline" },
            { label: "Risque Faible/Standard", nextNodeId: "sca_std", variant: "default" },
        ],
    },
    sca_std: {
        id: "sca_std",
        type: "recommendation",
        title: "DAPT Standard (12 mois)",
        recommendationType: "success",
        content: "✅ **Aspirine + Inhibiteur P2Y12** (Prasugrel/Ticagrelor) pendant **12 mois**.\n\nEnsuite : Monothérapie Aspirine à vie.",
    },
    sca_high: {
        id: "sca_high",
        type: "recommendation",
        title: "DAPT Abrégée (3-6 mois)",
        recommendationType: "warning",
        content: "⚠️ **DAPT pendant 3 à 6 mois** selon tolérance.\n\nRelais par : \n- Monothérapie Aspirine OU \n- Monothérapie P2Y12 (Ticagrelor/Clopidogrel).",
    },
    sca_hbr: {
        id: "sca_hbr",
        type: "recommendation",
        title: "DAPT Très Courte (1 mois)",
        recommendationType: "danger",
        content: "🛑 **DAPT pendant 1 mois** seulement.\n\nRelais par Clopidogrel seul (ou Aspirine) selon le profil.",
    },

    // --- BRANCHE SCC ---
    ccs_risk: {
        id: "ccs_risk",
        type: "question",
        title: "Risque Ischémique (SCC)",
        content: "Le patient a-t-il un risque ischémique modéré ou élevé (ex: pluritronculaire, diabète, IDM récurrent, maladie artérielle périphérique) ?",
        options: [
            { label: "Risque Élevé", nextNodeId: "ccs_high_ischemic", variant: "destructive" },
            { label: "Risque Modéré", nextNodeId: "ccs_mod_ischemic", variant: "secondary" },
            { label: "Risque Standard", nextNodeId: "ccs_std", variant: "default" },
        ],
    },
    ccs_std: {
        id: "ccs_std",
        type: "recommendation",
        title: "Monothérapie Standard",
        recommendationType: "neutral",
        content: "✅ **Aspirine 75-100mg** en monothérapie à long terme.\nAlternative : Clopidogrel 75mg si intolérance.",
    },
    ccs_high_ischemic: {
        id: "ccs_high_ischemic",
        type: "recommendation",
        title: "Bi-Thérapie Prolongée (DAPT/DPI)",
        recommendationType: "warning",
        content: "🔄 Envisager l'ajout d'un second antithrombotique à l'aspirine à long terme :\n- **Rivaroxaban 2.5mg x2/j** (COMPASS)\n- OU Clopidogrel / Prasugrel / Ticagrelor\n\n(Si risque hémorragique faible)",
    },
    ccs_mod_ischemic: {
        id: "ccs_mod_ischemic",
        type: "recommendation",
        title: "Optionnel : Bi-Thérapie",
        recommendationType: "neutral",
        content: "L'ajout d'un second agent peut être **considéré** (Classe IIb) si le risque hémorragique est faible.",
    },
}

export function AntithromboticTree() {
    return <DecisionTreeFlow nodes={ANTITHROMBOTIC_NODES} initialNodeId="start" />
}
