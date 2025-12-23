"use client"

import { useState, useEffect } from "react"
import { Calculator, AlertTriangle, Shield, Clock, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

// ============================================
// PRECISE-DAPT SCORE (Risque Hemorragique)
// ============================================
function PreciseDaptCalculator() {
  const [age, setAge] = useState<number | "">("")
  const [creatinine, setCreatinine] = useState<number | "">("")
  const [hemoglobin, setHemoglobin] = useState<number | "">("")
  const [wbc, setWbc] = useState<number | "">("")
  const [priorBleeding, setPriorBleeding] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [creatUnit, setCreatUnit] = useState<"clear" | "creat">("clear")
  const [creatValue, setCreatValue] = useState<number | "">("")

  // Formule PRECISE-DAPT simplifiee
  const calculateScore = () => {
    if (age === "" || hemoglobin === "" || wbc === "" || creatinine === "") {
      setScore(null)
      return
    }

    // Formule approximative basee sur les coefficients publies
    let s = 0
    s += (Number(age) - 40) * 0.5 // Age contribution
    s += (14 - Number(hemoglobin)) * 2 // Hemoglobin (inverse)
    s += Number(wbc) * 0.8 // WBC
    s += Math.max(0, Number(creatinine) - 60) * 0.1 // Creatinine clearance inverse
    if (priorBleeding) s += 10 // Prior bleeding

    setScore(Math.max(0, Math.min(100, Math.round(s))))
  }

  useEffect(() => {
    calculateScore()
  }, [age, creatinine, hemoglobin, wbc, priorBleeding])

  const convertCreatToClearance = (creatMgDl: number, age: number, isFemale: boolean) => {
    // Formule Cockcroft-Gault: (140 - âge) × poids / (créat × 72) × 0.85 si femme
    const poids = 75 // estimation
    const factor = isFemale ? 0.85 : 1.0
    return Math.round(((140 - age) * poids * factor) / (creatMgDl * 72))
  }

  const getRiskLevel = () => {
    if (score === null) return null
    if (score >= 25)
      return {
        level: "Haut risque hemorragique",
        color: "bg-red-500",
        textColor: "text-red-700",
        recommendation: "DAPT courte (3-6 mois) recommandee",
      }
    if (score >= 17)
      return {
        level: "Risque intermediaire",
        color: "bg-orange-500",
        textColor: "text-orange-700",
        recommendation: "DAPT standard (6-12 mois)",
      }
    return {
      level: "Bas risque hemorragique",
      color: "bg-green-500",
      textColor: "text-green-700",
      recommendation: "DAPT prolongee possible (12 mois ou plus)",
    }
  }

  const risk = getRiskLevel()

  const reset = () => {
    setAge("")
    setCreatinine("")
    setHemoglobin("")
    setWbc("")
    setPriorBleeding(false)
    setScore(null)
    setCreatUnit("clear")
    setCreatValue("")
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Age (ans)</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value ? Number(e.target.value) : "")}
            placeholder="65"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
        <div className="col-span-2">
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-medium text-gray-600">
              {creatUnit === "clear" ? "Clairance Créat. (mL/min)" : "Créatinine (mg/dL)"}
            </label>
            <button
              onClick={() => setCreatUnit(creatUnit === "clear" ? "creat" : "clear")}
              className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
            >
              {creatUnit === "clear" ? "→ Entrer créat." : "→ Entrer clairance"}
            </button>
          </div>

          {creatUnit === "clear" ? (
            <input
              type="number"
              value={creatinine}
              onChange={(e) => setCreatinine(e.target.value ? Number(e.target.value) : "")}
              placeholder="60"
              className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
            />
          ) : (
            <div className="space-y-2">
              <input
                type="number"
                step="0.1"
                value={creatValue}
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : ""
                  setCreatValue(val)
                  if (val && age) {
                    setCreatinine(convertCreatToClearance(Number(val), Number(age), false))
                  }
                }}
                placeholder="1.2"
                className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
              />
              {creatValue && age && creatinine && (
                <p className="text-xs text-gray-600">→ Clairance estimée: {creatinine} mL/min</p>
              )}
            </div>
          )}
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Hemoglobine (g/dL)</label>
          <input
            type="number"
            step="0.1"
            value={hemoglobin}
            onChange={(e) => setHemoglobin(e.target.value ? Number(e.target.value) : "")}
            placeholder="14"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-gray-600 block mb-1">Leucocytes (10^9/L)</label>
          <input
            type="number"
            step="0.1"
            value={wbc}
            onChange={(e) => setWbc(e.target.value ? Number(e.target.value) : "")}
            placeholder="7"
            className="w-full px-3 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-red-500 focus:border-transparent text-sm"
          />
        </div>
      </div>

      <div
        onClick={() => setPriorBleeding(!priorBleeding)}
        className={`p-3 rounded-lg border-2 cursor-pointer transition-all ${
          priorBleeding ? "bg-red-100 border-red-500" : "bg-gray-50 border-gray-200 hover:border-gray-300"
        }`}
      >
        <div className="flex items-center gap-2">
          <div
            className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
              priorBleeding ? "bg-red-500 border-red-500" : "border-gray-400"
            }`}
          >
            {priorBleeding && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-sm font-medium">Antecedent de saignement</span>
        </div>
      </div>

      {score !== null && risk && (
        <div className={`p-4 rounded-xl ${risk.color} bg-opacity-10 border-2 ${risk.color.replace("bg-", "border-")}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{score}</span>
            <Badge className={`${risk.color} text-white`}>{risk.level}</Badge>
          </div>
          <p className={`text-sm font-medium ${risk.textColor}`}>{risk.recommendation}</p>
        </div>
      )}

      <Button onClick={reset} variant="outline" size="sm" className="w-full bg-transparent">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reinitialiser
      </Button>
    </div>
  )
}

// ============================================
// DAPT SCORE (Risque Ischemique)
// ============================================
function DaptScoreCalculator() {
  const [age, setAge] = useState<"<65" | "65-74" | ">=75" | "">("")
  const [smoker, setSmoker] = useState(false)
  const [diabetes, setDiabetes] = useState(false)
  const [miPresentation, setMiPresentation] = useState(false)
  const [priorPciMi, setPriorPciMi] = useState(false)
  const [paclitaxelStent, setPaclitaxelStent] = useState(false)
  const [stentDiameter, setStentDiameter] = useState(false)
  const [chfLvef, setChfLvef] = useState(false)
  const [veinGraft, setVeinGraft] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const calculateScore = () => {
    let s = 0

    // Age (points negatifs pour age avance)
    if (age === ">=75") s -= 2
    else if (age === "65-74") s -= 1
    // <65 = 0 points

    // Facteurs positifs (favorisent DAPT prolongee)
    if (smoker) s += 1
    if (diabetes) s += 1
    if (miPresentation) s += 1
    if (priorPciMi) s += 1
    if (paclitaxelStent) s += 1
    if (stentDiameter) s += 1
    if (chfLvef) s += 2
    if (veinGraft) s += 2

    setScore(s)
  }

  useEffect(() => {
    if (age !== "") calculateScore()
  }, [age, smoker, diabetes, miPresentation, priorPciMi, paclitaxelStent, stentDiameter, chfLvef, veinGraft])

  const getRiskLevel = () => {
    if (score === null) return null
    if (score >= 2)
      return {
        level: "Haut risque ischemique",
        color: "bg-blue-500",
        textColor: "text-blue-700",
        recommendation: "DAPT prolongee (> 12 mois) recommandee si risque hemorragique acceptable",
        icon: Shield,
      }
    return {
      level: "Bas risque ischemique",
      color: "bg-green-500",
      textColor: "text-green-700",
      recommendation: "DAPT standard (12 mois) ou courte selon risque hemorragique",
      icon: Clock,
    }
  }

  const risk = getRiskLevel()

  const reset = () => {
    setAge("")
    setSmoker(false)
    setDiabetes(false)
    setMiPresentation(false)
    setPriorPciMi(false)
    setPaclitaxelStent(false)
    setStentDiameter(false)
    setChfLvef(false)
    setVeinGraft(false)
    setScore(null)
  }

  const CheckboxItem = ({
    checked,
    onChange,
    label,
    points,
  }: { checked: boolean; onChange: () => void; label: string; points: string }) => (
    <div
      onClick={onChange}
      className={`p-2 rounded-lg border cursor-pointer transition-all ${
        checked ? "bg-blue-100 border-blue-500" : "bg-gray-50 border-gray-200 hover:border-gray-300"
      }`}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`w-4 h-4 rounded border flex items-center justify-center ${
              checked ? "bg-blue-500 border-blue-500" : "border-gray-400"
            }`}
          >
            {checked && <span className="text-white text-xs">✓</span>}
          </div>
          <span className="text-xs font-medium">{label}</span>
        </div>
        <Badge variant="outline" className="text-xs">
          {points}
        </Badge>
      </div>
    </div>
  )

  return (
    <div className="space-y-3">
      <div>
        <label className="text-xs font-medium text-gray-600 block mb-2">Age</label>
        <div className="grid grid-cols-3 gap-2">
          {[
            { value: "<65", label: "< 65 ans", points: "0" },
            { value: "65-74", label: "65-74 ans", points: "-1" },
            { value: ">=75", label: ">= 75 ans", points: "-2" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() => setAge(option.value as typeof age)}
              className={`p-2 rounded-lg border text-xs font-medium transition-all ${
                age === option.value
                  ? "bg-blue-500 text-white border-blue-500"
                  : "bg-gray-50 border-gray-200 hover:border-blue-300"
              }`}
            >
              {option.label}
              <div className="text-xs opacity-75">{option.points} pt</div>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-2">
        <CheckboxItem checked={smoker} onChange={() => setSmoker(!smoker)} label="Tabagisme actif" points="+1" />
        <CheckboxItem checked={diabetes} onChange={() => setDiabetes(!diabetes)} label="Diabete" points="+1" />
        <CheckboxItem
          checked={miPresentation}
          onChange={() => setMiPresentation(!miPresentation)}
          label="IDM a la presentation"
          points="+1"
        />
        <CheckboxItem
          checked={priorPciMi}
          onChange={() => setPriorPciMi(!priorPciMi)}
          label="ATCD de PCI ou IDM"
          points="+1"
        />
        <CheckboxItem
          checked={stentDiameter}
          onChange={() => setStentDiameter(!stentDiameter)}
          label="Stent < 3mm"
          points="+1"
        />
        <CheckboxItem
          checked={paclitaxelStent}
          onChange={() => setPaclitaxelStent(!paclitaxelStent)}
          label="Stent paclitaxel"
          points="+1"
        />
        <CheckboxItem
          checked={chfLvef}
          onChange={() => setChfLvef(!chfLvef)}
          label="Insuffisance cardiaque / FEVG < 30%"
          points="+2"
        />
        <CheckboxItem
          checked={veinGraft}
          onChange={() => setVeinGraft(!veinGraft)}
          label="Stent sur greffon veineux"
          points="+2"
        />
      </div>

      {score !== null && risk && (
        <div className={`p-4 rounded-xl ${risk.color} bg-opacity-10 border-2 ${risk.color.replace("bg-", "border-")}`}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-2xl font-bold">{score}</span>
            <Badge className={`${risk.color} text-white`}>{risk.level}</Badge>
          </div>
          <p className={`text-sm font-medium ${risk.textColor}`}>{risk.recommendation}</p>
        </div>
      )}

      <Button onClick={reset} variant="outline" size="sm" className="w-full bg-transparent">
        <RotateCcw className="w-4 h-4 mr-2" />
        Reinitialiser
      </Button>
    </div>
  )
}

// ============================================
// COMPOSANT PRINCIPAL AVEC POPUP
// ============================================
export function CalculetteDAPT() {
  const [activeTab, setActiveTab] = useState<"precise" | "dapt">("precise")

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white border-0 hover:from-purple-600 hover:to-indigo-600 shadow-md"
        >
          <Calculator className="w-4 h-4 mr-1" />
          Scores DAPT
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-lg">
            <Calculator className="w-5 h-5 text-purple-600" />
            Evaluation Risque DAPT
          </DialogTitle>
        </DialogHeader>

        {/* Onglets */}
        <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
          <button
            onClick={() => setActiveTab("precise")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === "precise" ? "bg-white shadow text-red-600" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <AlertTriangle className="w-4 h-4 inline mr-1" />
            PRECISE-DAPT
          </button>
          <button
            onClick={() => setActiveTab("dapt")}
            className={`flex-1 py-2 px-3 rounded-md text-sm font-medium transition-all ${
              activeTab === "dapt" ? "bg-white shadow text-blue-600" : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <Shield className="w-4 h-4 inline mr-1" />
            DAPT Score
          </button>
        </div>

        {/* Description */}
        <div
          className={`p-3 rounded-lg text-xs ${activeTab === "precise" ? "bg-red-50 text-red-800" : "bg-blue-50 text-blue-800"}`}
        >
          {activeTab === "precise" ? (
            <p>
              <strong>PRECISE-DAPT:</strong> Evalue le risque hemorragique. Score ≥ 25 = haut risque, privilégier DAPT
              courte (3-6 mois).
            </p>
          ) : (
            <p>
              <strong>DAPT Score:</strong> Evalue le benefice d&apos;une DAPT prolongee. Score ≥ 2 = benefice d&apos;une
              prolongation {">"} 12 mois.
            </p>
          )}
        </div>

        {/* Calculette active */}
        {activeTab === "precise" ? <PreciseDaptCalculator /> : <DaptScoreCalculator />}

        {/* Reference */}
        <p className="text-xs text-gray-500 text-center mt-2">
          Ref: ESC 2023 - Evaluation risque ischemique/hemorragique post-PCI
        </p>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteDAPT
