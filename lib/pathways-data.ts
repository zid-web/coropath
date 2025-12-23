export type PathwaySatellite = {
    label: string
    description: string
    actionId: string
    icon?: string
}

export type Pathway = {
    id: string
    label: string
    title: string
    description: string
    color: "orange" | "red" | "blue" | "green"
    details: Record<string, string>
    satellites: PathwaySatellite[]
}

export const PATHWAYS: Pathway[] = [
    {
        id: "douleur",
        label: "🩺 Cabinet",
        title: "Douleur Thoracique",
        description: "Évaluation et orientation - ESC 2024",
        color: "orange",
        details: {
            Étapes: "3",
            Durée: "30 min",
            Urgence: "Variable",
        },
        satellites: [
            {
                label: "Évaluation Initiale",
                description: "Interrogatoire et examen",
                actionId: "eval-initiale",
            },
            {
                label: "RF-CL Calculator",
                description: "Probabilité pré-test",
                actionId: "calc-rfcl",
            },
            {
                label: "Orientation",
                description: "SCA vs SCC",
                actionId: "orientation",
            },
        ],
    },
    {
        id: "sca",
        label: "🚨 SCA Urgent",
        title: "Syndrome Coronarien Aigu",
        description: "Prise en charge urgente - ESC 2023",
        color: "red",
        details: {
            Étapes: "5",
            Délai: "< 2h",
            Urgence: "Vitale",
        },
        satellites: [
            {
                label: "Triage Initial",
                description: "ECG + Troponine",
                actionId: "triage-initial",
            },
            {
                label: "Score GRACE",
                description: "Stratification risque",
                actionId: "calc-grace",
            },
            {
                label: "Antithrombotique",
                description: "DAPT / SAPT",
                actionId: "arbre-anti-thromb",
            },
        ],
    },
    {
        id: "scc",
        label: "💙 Chronique",
        title: "Syndrome Coronarien Chronique",
        description: "Parcours diagnostique - ESC 2024",
        color: "blue",
        details: {
            Étapes: "6",
            Durée: "3-6 mois",
            Suivi: "Long terme",
        },
        satellites: [
            {
                label: "RF-CL Calculator",
                description: "Probabilité pré-test",
                actionId: "calc-rfcl",
            },
            {
                label: "Tests Fonctionnels",
                description: "Imagerie/Stress",
                actionId: "tests-fonc",
            },
            {
                label: "Anti-ischémique",
                description: "Arbre décisionnel",
                actionId: "arbre-anti-anginal",
            },
            {
                label: "Lifestyle",
                description: "Modification mode de vie",
                actionId: "lifestyle",
            },
        ],
    },
    {
        id: "post",
        label: "🏥 Suivi",
        title: "Suivi Post-Hospitalisation",
        description: "Réadaptation et suivi - ESC 2023",
        color: "green",
        details: {
            Consultations: "5",
            Durée: "12 mois",
            RCV: "Optimisée",
        },
        satellites: [
            {
                label: "Consultation IPA",
                description: "J7 post-sortie",
                actionId: "consult-ipa",
            },
            {
                label: "Réadaptation",
                description: "Programme 3-6 mois",
                actionId: "readapt",
            },
            {
                label: "Suivi Long Terme",
                description: "Prévention secondaire",
                actionId: "suivi-long",
            },
        ],
    },
]
