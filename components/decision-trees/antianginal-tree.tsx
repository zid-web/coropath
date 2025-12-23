"use client"

import { DecisionNode, DecisionTreeFlow } from "./decision-tree-flow"

const ANTIANGINAL_NODES: Record<string, DecisionNode> = {
    start: {
        id: "start",
        type: "question",
        title: "Paramètres Hémodynamiques",
        content: "Quelle est la situation hémodynamique basale du patient ?",
        options: [
            { label: "Fréquence Cardiaque Élevée (>80 bpm)", nextNodeId: "high_hr", variant: "default" },
            { label: "Fréquence Cardiaque Basse (<50 bpm)", nextNodeId: "low_hr", variant: "secondary" },
            { label: "Dysfonction VG (FEVG < 40%)", nextNodeId: "lv_dysfunction", variant: "destructive" },
            { label: "Pression Artérielle Basse", nextNodeId: "low_bp", variant: "outline" },
            { label: "Standard / Aucune spécificité", nextNodeId: "standard", variant: "ghost" },
        ],
    },
    high_hr: {
        id: "high_hr",
        type: "recommendation",
        title: "Ralentisseurs Cardiaques",
        recommendationType: "success",
        content: "✅ **1er Choix : Bêta-Bloquants** (Bisoprolol, Nebivolol...)\n\nAlternative ou Association : Inhibiteur calcique non-DHP (Diltiazem/Verapamil) si pas de dysfonction VG.",
    },
    low_hr: {
        id: "low_hr",
        type: "recommendation",
        title: "Agents Non-Bradycardisants",
        recommendationType: "warning",
        content: "✅ **Inhibiteurs Calciques DHP** (Amlodipine, Lercanidipine) \n\nOu Nitrés retard si nécessaire.\n⚠️ Éviter BB et Verapamil/Diltiazem.",
    },
    lv_dysfunction: {
        id: "lv_dysfunction",
        type: "recommendation",
        title: "Dysfonction VG - Prudence",
        recommendationType: "danger",
        content: "✅ **Bêta-Bloquants** (Carvedilol, Bisoprolol, Metoprolol succinate) en priorité pour le bénéfice pronostique.\n\nAssocié si besoin à : Ivabradine (si RS > 70bpm) ou Nitrés.\n🚫 Contre-indication : Diltiazem/Verapamil.",
    },
    low_bp: {
        id: "low_bp",
        type: "recommendation",
        title: "Tension Basse",
        recommendationType: "warning",
        content: "✅ **Ivabradine** (si RS >70bpm), **Ranolazine**, ou **Trimetazidine**.\n\nPeu d'impact sur la PA.\n⚠️ Prudence avec BB et ICA.",
    },
    standard: {
        id: "standard",
        type: "question",
        title: "Choix Standard",
        content: "Préférence pour un traitement standard éprouvé ?",
        options: [
            { label: "Bêta-Bloquant ou IC", nextNodeId: "std_option_1", variant: "default" },
            { label: "Association d'emblée", nextNodeId: "std_option_2", variant: "secondary" },
        ],
    },
    std_option_1: {
        id: "std_option_1",
        type: "recommendation",
        title: "Monothérapie Initiale",
        recommendationType: "neutral",
        content: "Débuter par Bêta-bloquant OU Inhibiteur Calcique DHP.",
    },
    std_option_2: {
        id: "std_option_2",
        type: "recommendation",
        title: "Bi-thérapie Initiale",
        recommendationType: "success",
        content: "Bêta-bloquant + Inhibiteur Calcique DHP à faible dose peut être plus efficace qu'une monothérapie à pleine dose.",
    },
}

export function AntianginalTree() {
    return <DecisionTreeFlow nodes={ANTIANGINAL_NODES} initialNodeId="start" />
}
