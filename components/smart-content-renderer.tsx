import { SmartLink } from "@/components/ui/smart-link"

// Dictionary of Smart Keywords
const KEYWORDS = {
    "STEMI": {
        type: "action",
        summary: "ST-Elevation Myocardial Infarction. Urgence absolue.",
        details: "Sus-décalage ST > 1mm dans 2 dérivations contiguës. Angioplastie primaire immédiate requise."
    },
    "NSTEMI": {
        type: "action",
        summary: "Non-ST-Elevation Myocardial Infarction. Urgence relative.",
        details: "Pas de sus-décalage ST persistant. Stratification du risque (GRACE) pour délai de coronarographie."
    },
    "GRACE": {
        type: "calculator",
        summary: "Score de risque ischémique. Guide la stratégie invasive.",
        details: "Score > 140 = Haut risque (Coro < 24h)."
    },
    "DAPT": {
        type: "drug",
        summary: "Double Anti-Platelet Therapy (Aspirine + Inhibiteur P2Y12).",
        details: "Standard: 12 mois après SCA. À moduler selon risque hémorragique (PRECISE-DAPT)."
    },
    "LDL": {
        type: "definition",
        summary: "Objectif thérapeutique majeur en prévention secondaire.",
        details: "Cible ESC 2023: < 1.4 mmol/L (< 55 mg/dL) et réduction > 50% de la base."
    },
    "RF-CL": {
        type: "calculator",
        summary: "Probabilité pré-test de coronaropathie obstructive.",
        details: "Basé sur Age, Sexe, Symptômes + FdRCV."
    }
} as const

interface SmartContentRendererProps {
    text: string
}

export function SmartContentRenderer({ text }: SmartContentRendererProps) {
    // Simple regex replacement logic for demo purposes
    // In a real app, this would need a more robust parser to avoid nested replacements

    const parts = text.split(/(\b(?:STEMI|NSTEMI|GRACE|DAPT|LDL|RF-CL)\b)/g)

    return (
        <span className="leading-relaxed">
            {parts.map((part, i) => {
                const keyword = part as keyof typeof KEYWORDS
                if (KEYWORDS[keyword]) {
                    return (
                        <SmartLink
                            key={i}
                            keyword={keyword}
                            originalText={part}
                            type={KEYWORDS[keyword].type as any}
                            summary={KEYWORDS[keyword].summary}
                            details={KEYWORDS[keyword].details}
                        />
                    )
                }
                return part
            })}
        </span>
    )
}
