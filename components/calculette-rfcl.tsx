"use client"

import { useState, useEffect, useCallback } from "react"
import {
  Calculator,
  Heart,
  AlertTriangle,
  CheckCircle,
  Info,
  Zap,
  RotateCcw,
  Stethoscope,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

// Tables de référence basées sur les études publiées (Winther et al.) - ESC 2024
const RF_CL_TABLE: Record<string, Record<string, Record<string, number[]>>> = {
  female: {
    asymptomatic: {
      "30-39": [0, 0, 1],
      "40-49": [0, 1, 1],
      "50-59": [0, 1, 2],
      "60-69": [1, 2, 3],
      "70-80": [2, 3, 5],
    },
    nonanginal: {
      "30-39": [0, 1, 2],
      "40-49": [1, 1, 3],
      "50-59": [1, 2, 5],
      "60-69": [2, 4, 7],
      "70-80": [4, 7, 11],
    },
    atypical: {
      "30-39": [0, 1, 3],
      "40-49": [1, 2, 5],
      "50-59": [2, 3, 7],
      "60-69": [3, 6, 11],
      "70-80": [6, 10, 16],
    },
    typical: {
      "30-39": [2, 5, 10],
      "40-49": [4, 7, 12],
      "50-59": [6, 10, 15],
      "60-69": [10, 14, 19],
      "70-80": [16, 19, 23],
    },
    dyspnea: {
      "30-39": [0, 1, 3],
      "40-49": [1, 2, 5],
      "50-59": [2, 3, 7],
      "60-69": [3, 6, 11],
      "70-80": [6, 10, 16],
    },
  },
  male: {
    asymptomatic: {
      "30-39": [0, 1, 2],
      "40-49": [1, 2, 4],
      "50-59": [2, 4, 6],
      "60-69": [4, 6, 9],
      "70-80": [8, 10, 13],
    },
    nonanginal: {
      "30-39": [1, 2, 5],
      "40-49": [2, 4, 8],
      "50-59": [4, 7, 12],
      "60-69": [8, 12, 17],
      "70-80": [15, 19, 24],
    },
    atypical: {
      "30-39": [2, 4, 8],
      "40-49": [3, 6, 12],
      "50-59": [6, 11, 17],
      "60-69": [12, 17, 25],
      "70-80": [22, 27, 34],
    },
    typical: {
      "30-39": [9, 14, 22],
      "40-49": [14, 20, 27],
      "50-59": [21, 27, 33],
      "60-69": [32, 35, 39],
      "70-80": [44, 44, 45],
    },
    dyspnea: {
      "30-39": [2, 4, 8],
      "40-49": [3, 6, 12],
      "50-59": [6, 11, 17],
      "60-69": [12, 17, 25],
      "70-80": [22, 27, 34],
    },
  },
}

function getAgeGroup(age: number): string {
  if (age >= 30 && age <= 39) return "30-39"
  if (age >= 40 && age <= 49) return "40-49"
  if (age >= 50 && age <= 59) return "50-59"
  if (age >= 60 && age <= 69) return "60-69"
  if (age >= 70 && age <= 80) return "70-80"
  return "50-59"
}

function getRiskFactorIndex(count: number): number {
  if (count <= 1) return 0
  if (count <= 3) return 1
  return 2
}

function calculateRFCL(age: number, sex: string, symptoms: string, riskFactorCount: number): number {
  const ageGroup = getAgeGroup(age)
  const rfIndex = getRiskFactorIndex(riskFactorCount)
  try {
    return RF_CL_TABLE[sex][symptoms][ageGroup][rfIndex]
  } catch {
    return 15
  }
}

function calculateCACSCL(rfclProb: number, cacScore: number): number {
  let adjustedProb = rfclProb
  if (cacScore === 0) {
    adjustedProb = rfclProb * 0.2
  } else if (cacScore >= 1 && cacScore <= 10) {
    adjustedProb = rfclProb * 0.45
  } else if (cacScore >= 11 && cacScore <= 100) {
    adjustedProb = rfclProb * 0.85
  } else if (cacScore >= 101 && cacScore <= 400) {
    adjustedProb = rfclProb * 1.3
  } else if (cacScore >= 401 && cacScore <= 1000) {
    adjustedProb = Math.min(85, rfclProb * 2.0)
  } else if (cacScore > 1000) {
    adjustedProb = Math.min(90, rfclProb * 2.8)
  }
  return Math.max(0, Math.min(95, adjustedProb))
}

function getRiskCategory(probability: number) {
  if (probability < 5) {
    return {
      level: "Tres faible",
      class: "bg-green-100 text-green-800 border-green-300",
      color: "#22c55e",
      range: "< 5%",
    }
  } else if (probability >= 5 && probability <= 15) {
    return {
      level: "Faible",
      class: "bg-blue-100 text-blue-800 border-blue-300",
      color: "#3b82f6",
      range: "5-15%",
    }
  } else if (probability > 15 && probability <= 50) {
    return {
      level: "Modere",
      class: "bg-amber-100 text-amber-800 border-amber-300",
      color: "#f59e0b",
      range: "15-50%",
    }
  } else if (probability > 50 && probability <= 85) {
    return {
      level: "Eleve",
      class: "bg-orange-100 text-orange-800 border-orange-300",
      color: "#f97316",
      range: "50-85%",
    }
  } else {
    return {
      level: "Tres eleve",
      class: "bg-red-100 text-red-800 border-red-300",
      color: "#ef4444",
      range: "> 85%",
    }
  }
}

function getRecommendations(probability: number, hasCacScore: boolean, cacScore: number | null): string[] {
  let recommendations: string[] = []

  if (probability < 5) {
    recommendations = [
      "AUCUN test d'imagerie cardiaque supplementaire recommande (Classe III)",
      "Pas de coronaropathie obstructive significative",
      "Rechercher d'autres causes de douleur thoracique",
      "Optimisation de la prise en charge des facteurs de risque cardiovasculaires",
      "Taux annuel d'evenements cardiovasculaires < 0.5%",
      "Traitement medical : Controle des FdRCV (statine si indique, IEC/ARA2 si HTA/diabete)",
    ]
  } else if (probability >= 5 && probability <= 15) {
    if (!hasCacScore) {
      recommendations = [
        "SCORE CALCIQUE CORONAIRE recommande pour affiner l'estimation du risque (Classe IIa, Niveau B)",
        "Alternative : Coroscanner (angio-TDM coronaire) (Classe I, Niveau B)",
        "Le score calcique permet une meilleure reclassification dans cette categorie",
        "Si CAC = 0 : reclassification en risque tres faible",
        "Si CAC > 0 : poursuivre les investigations",
        "Traitement medical optimal : Statine (intensite moderee), Aspirine 75-100mg si CAC > 0, IEC/ARA2 si HTA/diabete",
      ]
    } else if (cacScore === 0) {
      recommendations = [
        "CAC = 0 : Reclassification en risque TRES FAIBLE",
        "Excellente valeur predictive negative",
        "Pas de test supplementaire necessaire",
        "Optimisation des facteurs de risque cardiovasculaires",
        "Traitement medical : Statine si FdRCV, pas d'antiagregant necessaire",
      ]
    } else {
      recommendations = [
        "Coroscanner (angio-TDM coronaire) recommande (Classe I, Niveau B)",
        "Alternative : Tests d'imagerie fonctionnels (echographie de stress, scintigraphie, IRM) (Classe I, Niveau B)",
        "Optimisation intensive des facteurs de risque",
        "Traitement medical optimal : Statine haute intensite (atorvastatine 40-80mg ou rosuvastatine 20-40mg), Aspirine 75-100mg, IEC/ARA2 si HTA/diabete, BB si angor",
      ]
    }
  } else if (probability > 15 && probability <= 50) {
    recommendations = [
      "COROSCANNER (angio-TDM coronaire) recommande en 1ere intention (Classe I, Niveau B)",
      "Imagerie anatomique : Evaluation stenoses coronaires, score calcique, plaques vulnerables",
      "Alternative : Imagerie fonctionnelle (echographie de stress, scintigraphie SPECT, IRM de perfusion) (Classe I, Niveau B)",
      "FFR-CT pour evaluation fonctionnelle des lesions intermediaires (40-90%) (Classe IIa, Niveau B)",
      "Traitement medical optimal : Statine haute intensite (atorvastatine 80mg ou rosuvastatine 40mg), Aspirine 75-100mg, BB si angor, IEC/ARA2 si HTA/diabete/FEVG < 40%, Ezetimibe si LDL > objectif",
      "Objectif LDL-c < 1.4 mmol/L (< 55 mg/dL) si haut risque cardiovasculaire",
    ]
  } else if (probability > 50 && probability <= 85) {
    recommendations = [
      "IMAGERIE FONCTIONNELLE recommandee en 1ere intention (Classe I, Niveau A)",
      "Tests fonctionnels : Echographie de stress, Scintigraphie myocardique SPECT, IRM de perfusion/dobutamine",
      "Objectif : Evaluer l'ischemie myocardique inducible (seuil > 10% myocarde)",
      "Coronarographie si tests fonctionnels positifs ou ischemie etendue (Classe I, Niveau A)",
      "Traitement medical optimal immediat : Statine haute dose (atorvastatine 80mg), Aspirine 75-100mg, BB titres (FC cible 55-60 bpm), IEC/ARA2, Ivabradine/Ranolazine si angor persistant",
      "Objectif LDL-c < 1.4 mmol/L, considerer iPCSK9 si non atteint",
      "Double antiagregation plaquettaire (DAPT) non recommandee hors SCA",
    ]
  } else {
    recommendations = [
      "CORONAROGRAPHIE DIRECTE recommandee (Classe I, Niveau A)",
      "Probabilite tres elevee de coronaropathie obstructive tritronculaire ou du tronc commun",
      "Evaluation fonctionnelle invasive systematique : FFR/iFR des lesions intermediaires (40-90%) (Classe I, Niveau A)",
      "Imagerie endocoronaire (IVUS/OCT) pour lesions du tronc commun et complexes (Classe IIa, Niveau B)",
      "Heart Team discussion pour strategie de revascularisation (angioplastie vs pontage)",
      "Traitement medical optimal immediat (pre-coronarographie) :",
      "- Statine tres haute dose (atorvastatine 80mg ou rosuvastatine 40mg)",
      "- Aspirine 75-100mg + Clopidogrel 75mg si revascularisation prevue",
      "- BB titres (FC cible 55-60 bpm)",
      "- IEC/ARA2 (ramipril 10mg ou perindopril 10mg)",
      "- Ezetimibe systematique",
      "Objectif LDL-c < 1.4 mmol/L, considerer iPCSK9 d'emblee si haut risque",
    ]
  }

  // Ajout des recommandations specifiques au score calcique
  if (hasCacScore && cacScore !== null) {
    if (cacScore === 0) {
      recommendations.push("CAC = 0 : Excellent pronostic, risque d'evenements tres faible a 5 ans")
    } else if (cacScore > 0 && cacScore <= 100) {
      recommendations.push("CAC 1-100 : Atherome coronaire debutant, surveillance et traitement preventif recommandes")
    } else if (cacScore > 100 && cacScore <= 400) {
      recommendations.push("CAC 100-400 : Atherome modere, tests fonctionnels fortement recommandes")
    } else if (cacScore > 400) {
      recommendations.push("CAC > 400 : Atherome severe, evaluation cardiologique approfondie et traitement intensif")
    }
  }

  return recommendations
}

export function CalculetteRFCL() {
  const [age, setAge] = useState<string>("")
  const [sex, setSex] = useState<string>("")
  const [symptoms, setSymptoms] = useState<string>("")
  const [cacScore, setCacScore] = useState<string>("")
  const [riskFactors, setRiskFactors] = useState({
    diabetes: false,
    hypertension: false,
    dyslipidemia: false,
    smoking: false,
    family: false,
  })
  const [result, setResult] = useState<{
    rfcl: number
    cacscl: number | null
    riskCategory: ReturnType<typeof getRiskCategory>
    cacsclRiskCategory: ReturnType<typeof getRiskCategory> | null
    recommendations: string[]
  } | null>(null)

  const riskFactorCount = Object.values(riskFactors).filter(Boolean).length

  const calculate = useCallback(() => {
    const ageNum = Number.parseInt(age)
    if (!age || !sex || !symptoms || isNaN(ageNum) || ageNum < 30 || ageNum > 90) {
      setResult(null)
      return
    }

    const rfcl = calculateRFCL(ageNum, sex, symptoms, riskFactorCount)
    const hasCacScore = cacScore !== "" && !isNaN(Number.parseInt(cacScore))
    const cacScoreNum = hasCacScore ? Number.parseInt(cacScore) : null
    const cacscl = hasCacScore ? calculateCACSCL(rfcl, cacScoreNum!) : null

    const finalProb = cacscl !== null ? cacscl : rfcl
    const riskCategory = getRiskCategory(finalProb)
    const cacsclRiskCategory = cacscl !== null ? getRiskCategory(cacscl) : null
    const recommendations = getRecommendations(finalProb, hasCacScore, cacScoreNum)

    setResult({ rfcl, cacscl, riskCategory, cacsclRiskCategory, recommendations })
  }, [age, sex, symptoms, riskFactorCount, cacScore])

  useEffect(() => {
    calculate()
  }, [calculate])

  const reset = () => {
    setAge("")
    setSex("")
    setSymptoms("")
    setCacScore("")
    setRiskFactors({ diabetes: false, hypertension: false, dyslipidemia: false, smoking: false, family: false })
    setResult(null)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 text-violet-700 border-violet-300 hover:bg-violet-50 bg-transparent"
        >
          <Calculator className="h-4 w-4" />
          Calculette
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        {/* Header */}
        <div className="bg-gradient-to-r from-violet-600 to-purple-600 text-white p-6">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-3 text-2xl font-bold text-white">
              <Heart className="h-8 w-8" />
              Calculette RF-CL / CACS-CL Pro
            </DialogTitle>
          </DialogHeader>
          <p className="text-violet-100 mt-2">
            Estimation de la probabilite pre-test de coronaropathie obstructive (Modele Winther et al.)
          </p>
          <div className="flex flex-wrap items-center gap-2 mt-3">
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">ESC 2024</span>
            <span className="bg-white/20 px-3 py-1 rounded-full text-sm">5 niveaux de risque</span>
            <span className="bg-green-500 px-3 py-1 rounded-full text-sm flex items-center gap-1">
              <Zap className="h-3 w-3" /> Calcul AUTO
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-0">
          {/* Input Section */}
          <div className="p-6 bg-slate-50 border-r">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg border-b-2 border-violet-500 pb-1">Donnees du Patient</h3>
              <Button variant="ghost" size="sm" onClick={reset} className="text-slate-500 hover:text-slate-700">
                <RotateCcw className="h-4 w-4 mr-1" /> Reset
              </Button>
            </div>

            <div className="bg-gradient-to-r from-violet-50 to-purple-50 border border-violet-200 rounded-lg p-3 mb-4">
              <p className="text-xs font-semibold text-violet-800 mb-2">Stratification ESC 2024 :</p>
              <div className="grid grid-cols-5 gap-1 text-xs">
                <div className="text-center">
                  <div className="bg-green-500 h-2 rounded mb-1"></div>
                  <span className="text-green-700">{"<5%"}</span>
                </div>
                <div className="text-center">
                  <div className="bg-blue-500 h-2 rounded mb-1"></div>
                  <span className="text-blue-700">5-15%</span>
                </div>
                <div className="text-center">
                  <div className="bg-amber-500 h-2 rounded mb-1"></div>
                  <span className="text-amber-700">15-50%</span>
                </div>
                <div className="text-center">
                  <div className="bg-orange-500 h-2 rounded mb-1"></div>
                  <span className="text-orange-700">50-85%</span>
                </div>
                <div className="text-center">
                  <div className="bg-red-500 h-2 rounded mb-1"></div>
                  <span className="text-red-700">{">85%"}</span>
                </div>
              </div>
            </div>

            {/* Age */}
            <div className="space-y-2 mb-4">
              <Label htmlFor="age" className="font-semibold">
                Age (annees) <span className="text-red-500">*</span>
              </Label>
              <Input
                id="age"
                type="number"
                min={30}
                max={90}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Entre 30 et 90 ans"
                className={age ? "border-green-400 bg-green-50" : ""}
              />
            </div>

            {/* Sex */}
            <div className="space-y-2 mb-4">
              <Label className="font-semibold">
                Sexe <span className="text-red-500">*</span>
              </Label>
              <Select value={sex} onValueChange={setSex}>
                <SelectTrigger className={sex ? "border-green-400 bg-green-50" : ""}>
                  <SelectValue placeholder="-- Selectionner --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="female">Femme</SelectItem>
                  <SelectItem value="male">Homme</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Symptoms */}
            <div className="space-y-2 mb-4">
              <Label className="font-semibold">
                Type de symptomes <span className="text-red-500">*</span>
              </Label>
              <Select value={symptoms} onValueChange={setSymptoms}>
                <SelectTrigger className={symptoms ? "border-green-400 bg-green-50" : ""}>
                  <SelectValue placeholder="-- Selectionner --" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="asymptomatic">Asymptomatique (aucun symptome)</SelectItem>
                  <SelectItem value="nonanginal">Douleur non angineuse (0-1 critere)</SelectItem>
                  <SelectItem value="atypical">Angor atypique (2 criteres)</SelectItem>
                  <SelectItem value="typical">Angor typique (3 criteres)</SelectItem>
                  <SelectItem value="dyspnea">Dyspnee d'effort</SelectItem>
                </SelectContent>
              </Select>
              <div className="bg-white rounded-lg p-3 mt-2 border text-xs text-slate-600">
                <p className="font-semibold mb-1">3 criteres de l'angor typique :</p>
                <ol className="list-decimal list-inside space-y-0.5">
                  <li>Douleur constrictive retrosternale</li>
                  <li>Declenchee par l'effort ou le stress emotionnel</li>
                  <li>Soulagee par le repos ou la trinitrine ({"<5 min"})</li>
                </ol>
                <p className="mt-2 text-violet-600">
                  <strong>Typique</strong> = 3/3 | <strong>Atypique</strong> = 2/3 | <strong>Non angineux</strong> =
                  0-1/3
                </p>
                <p className="mt-2 text-blue-600">
                  <strong>Asymptomatique</strong> : Patient sans douleur thoracique ni dyspnee (ex: depistage, bilan
                  pre-operatoire)
                </p>
              </div>
            </div>

            {/* Risk Factors */}
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between">
                <Label className="font-semibold">Facteurs de risque CV</Label>
                <span className="bg-violet-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
                  {riskFactorCount} FDR
                </span>
              </div>
              <div className="space-y-2">
                {[
                  { id: "diabetes", label: "Diabete" },
                  { id: "hypertension", label: "Hypertension arterielle" },
                  { id: "dyslipidemia", label: "Dyslipidemie" },
                  { id: "smoking", label: "Tabagisme actif ou sevre" },
                  { id: "family", label: "ATCD familial coronarien precoce" },
                ].map((item) => (
                  <div
                    key={item.id}
                    className={`flex items-center space-x-3 p-2 rounded-lg border-2 cursor-pointer transition-all ${
                      riskFactors[item.id as keyof typeof riskFactors]
                        ? "border-green-400 bg-green-50"
                        : "border-slate-200 bg-white hover:border-violet-300"
                    }`}
                    onClick={() =>
                      setRiskFactors((prev) => ({
                        ...prev,
                        [item.id]: !prev[item.id as keyof typeof prev],
                      }))
                    }
                  >
                    <Checkbox
                      id={item.id}
                      checked={riskFactors[item.id as keyof typeof riskFactors]}
                      className="data-[state=checked]:bg-violet-600"
                    />
                    <Label htmlFor={item.id} className="cursor-pointer flex-1 text-sm">
                      {item.label}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            {/* CAC Score */}
            <div className="space-y-2">
              <Label htmlFor="cac" className="font-semibold">
                Score calcique coronaire (optionnel)
              </Label>
              <Input
                id="cac"
                type="number"
                min={0}
                value={cacScore}
                onChange={(e) => setCacScore(e.target.value)}
                placeholder="Laisser vide si non disponible"
                className={cacScore ? "border-green-400 bg-green-50" : ""}
              />
              <p className="text-xs text-slate-500">Recommande si probabilite 5-15% pour reclassification</p>
            </div>
          </div>

          {/* Results Section */}
          <div className="p-6 bg-white">
            <h3 className="font-semibold text-lg border-b-2 border-violet-500 pb-1 mb-4">Resultats</h3>

            {!result ? (
              <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                  <div>
                    <p className="font-semibold text-amber-800">Donnees incompletes</p>
                    <p className="text-amber-700 text-sm">Remplir : age, sexe et type de symptomes</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* RF-CL Result */}
                <div className="bg-gradient-to-r from-slate-100 to-slate-200 rounded-xl p-4">
                  <p className="text-xs uppercase tracking-wider text-slate-500 mb-1">Probabilite Pre-Test RF-CL</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-bold text-violet-600">{result.rfcl.toFixed(1)}</span>
                      <span className="text-2xl text-violet-500">%</span>
                    </div>
                    {result.rfcl >= 5 && (
                      <button
                        onClick={() => window.open("https://omnidoc.fr/login", "omnidoc", "width=1000,height=700")}
                        className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                        title="Prendre RDV cardiologue via Omnidoc"
                      >
                        <Stethoscope className="h-3.5 w-3.5" />
                        <span>Omnidoc</span>
                        <ExternalLink className="h-3 w-3" />
                      </button>
                    )}
                  </div>
                  <div className="w-full h-3 bg-slate-300 rounded-full mt-3 overflow-hidden flex">
                    <div className="bg-green-500 h-full" style={{ width: "5%" }}></div>
                    <div className="bg-blue-500 h-full" style={{ width: "10%" }}></div>
                    <div className="bg-amber-500 h-full" style={{ width: "35%" }}></div>
                    <div className="bg-orange-500 h-full" style={{ width: "35%" }}></div>
                    <div className="bg-red-500 h-full" style={{ width: "15%" }}></div>
                  </div>
                  <div
                    className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-slate-800 mt-1 transition-all duration-500"
                    style={{ marginLeft: `calc(${Math.min(result.rfcl, 100)}% - 8px)` }}
                  ></div>
                  <span
                    className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold border ${getRiskCategory(result.rfcl).class}`}
                  >
                    {getRiskCategory(result.rfcl).level} ({getRiskCategory(result.rfcl).range})
                  </span>
                </div>

                {/* CACS-CL Result */}
                {result.cacscl !== null && (
                  <div className="bg-gradient-to-r from-violet-100 to-purple-100 rounded-xl p-4">
                    <p className="text-xs uppercase tracking-wider text-violet-600 mb-1">
                      Probabilite Ajustee CACS-CL (CAC: {cacScore})
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-baseline gap-1">
                        <span className="text-4xl font-bold text-purple-700">{result.cacscl.toFixed(1)}</span>
                        <span className="text-2xl text-purple-500">%</span>
                      </div>
                      {result.cacscl >= 5 && (
                        <button
                          onClick={() => window.open("https://omnidoc.fr/login", "omnidoc", "width=1000,height=700")}
                          className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shadow-sm"
                          title="Prendre RDV cardiologue via Omnidoc"
                        >
                          <Stethoscope className="h-3.5 w-3.5" />
                          <span>Omnidoc</span>
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      )}
                    </div>
                    <div className="w-full h-3 bg-purple-200 rounded-full mt-3 overflow-hidden flex">
                      <div className="bg-green-500 h-full" style={{ width: "5%" }}></div>
                      <div className="bg-blue-500 h-full" style={{ width: "10%" }}></div>
                      <div className="bg-amber-500 h-full" style={{ width: "35%" }}></div>
                      <div className="bg-orange-500 h-full" style={{ width: "35%" }}></div>
                      <div className="bg-red-500 h-full" style={{ width: "15%" }}></div>
                    </div>
                    <div
                      className="w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-purple-800 mt-1 transition-all duration-500"
                      style={{ marginLeft: `calc(${Math.min(result.cacscl, 100)}% - 8px)` }}
                    ></div>
                    <span
                      className={`inline-block mt-2 px-4 py-2 rounded-full text-sm font-semibold border ${result.cacsclRiskCategory?.class}`}
                    >
                      {result.cacsclRiskCategory?.level} ({result.cacsclRiskCategory?.range})
                    </span>

                    {/* Comparaison RF-CL vs CACS-CL */}
                    {result.cacscl !== result.rfcl && (
                      <div
                        className={`mt-3 p-2 rounded-lg text-xs ${result.cacscl < result.rfcl ? "bg-green-100 text-green-800" : "bg-orange-100 text-orange-800"}`}
                      >
                        {result.cacscl < result.rfcl
                          ? `Reclassification a la baisse : ${result.rfcl.toFixed(1)}% → ${result.cacscl.toFixed(1)}%`
                          : `Reclassification a la hausse : ${result.rfcl.toFixed(1)}% → ${result.cacscl.toFixed(1)}%`}
                      </div>
                    )}
                  </div>
                )}

                {/* Recommendations */}
                <div className="bg-slate-50 rounded-xl p-4 border">
                  <h4 className="font-semibold text-slate-800 mb-3 flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-violet-600" />
                    Recommandations ESC 2024
                  </h4>
                  <ul className="space-y-2">
                    {result.recommendations.map((rec, index) => (
                      <li key={index} className="flex items-start gap-2 text-sm text-slate-700">
                        <span className="text-violet-500 mt-1">•</span>
                        <span>{rec}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Reference */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                  <p className="text-xs text-blue-800 flex items-start gap-2">
                    <Info className="h-4 w-4 mt-0.5 shrink-0" />
                    <span>
                      <strong>Reference :</strong> Modele RF-CL (Risk Factor-weighted Clinical Likelihood) base sur
                      Winther et al. ESC 2024 Guidelines for Chronic Coronary Syndromes. European Heart Journal
                      2024;45:3415-3537
                    </span>
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteRFCL
