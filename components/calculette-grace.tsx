"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, Heart, ArrowRightLeft } from "lucide-react"
import { motion } from "framer-motion"

interface GraceScore {
  total: number
  riskLevel: string
  inHospitalMortality: string
  sixMonthMortality: string
  color: string
  recommendation: string
}

export function CalculetteGrace() {
  const [age, setAge] = useState<string>("")
  const [heartRate, setHeartRate] = useState<string>("")
  const [systolicBP, setSystolicBP] = useState<string>("")
  const [creatinine, setCreatinine] = useState<string>("")
  const [creatinineUnit, setCreatinineUnit] = useState<"mg/dL" | "µmol/L">("mg/dL")
  const [killipClass, setKillipClass] = useState<string>("")
  const [cardiacArrest, setCardiacArrest] = useState<boolean>(false)
  const [stDeviation, setStDeviation] = useState<boolean>(false)
  const [elevatedBiomarkers, setElevatedBiomarkers] = useState<boolean>(false)
  const [acsStype, setAcsType] = useState<"STEMI" | "NSTEMI">("NSTEMI")

  const [result, setResult] = useState<GraceScore | null>(null)

  const convertCreatinine = (value: number, fromUnit: "mg/dL" | "µmol/L"): number => {
    if (fromUnit === "µmol/L") {
      return value / 88.4 // Conversion µmol/L vers mg/dL
    }
    return value
  }

  const getAgePoints = (age: number): number => {
    if (age < 30) return 0
    if (age <= 39) return 8
    if (age <= 49) return 25
    if (age <= 59) return 41
    if (age <= 69) return 58
    if (age <= 79) return 75
    if (age <= 89) return 91
    return 100
  }

  const getHeartRatePoints = (hr: number): number => {
    if (hr < 50) return 0
    if (hr <= 69) return 3
    if (hr <= 89) return 9
    if (hr <= 109) return 15
    if (hr <= 149) return 24
    if (hr <= 199) return 38
    return 46
  }

  const getSystolicBPPoints = (sbp: number): number => {
    if (sbp < 80) return 58
    if (sbp <= 99) return 53
    if (sbp <= 119) return 43
    if (sbp <= 139) return 34
    if (sbp <= 159) return 24
    if (sbp <= 199) return 10
    return 0
  }

  const getCreatininePoints = (cr: number): number => {
    if (cr < 0.4) return 1
    if (cr <= 0.79) return 4
    if (cr <= 1.19) return 7
    if (cr <= 1.59) return 10
    if (cr <= 1.99) return 13
    if (cr <= 3.99) return 21
    return 28
  }

  const getKillipPoints = (killip: string): number => {
    switch (killip) {
      case "I":
        return 0
      case "II":
        return 20
      case "III":
        return 39
      case "IV":
        return 59
      default:
        return 0
    }
  }

  const calculateGrace = () => {
    const ageVal = Number.parseInt(age)
    const hrVal = Number.parseInt(heartRate)
    const bpVal = Number.parseInt(systolicBP)
    const crVal = convertCreatinine(Number.parseFloat(creatinine), creatinineUnit)

    if (!age || !heartRate || !systolicBP || !creatinine || !killipClass) {
      return
    }

    let total = 0
    total += getAgePoints(ageVal)
    total += getHeartRatePoints(hrVal)
    total += getSystolicBPPoints(bpVal)
    total += getCreatininePoints(crVal)
    total += getKillipPoints(killipClass)
    total += cardiacArrest ? 39 : 0
    total += stDeviation ? 28 : 0
    total += elevatedBiomarkers ? 14 : 0

    let riskLevel = ""
    let inHospitalMortality = ""
    let sixMonthMortality = ""
    let color = ""
    let recommendation = ""

    if (acsStype === "NSTEMI") {
      if (total < 109) {
        riskLevel = "Faible"
        inHospitalMortality = "<1%"
        color = "text-green-600"
        recommendation = "Stratégie invasive dans les 72h si autres facteurs de risque"
      } else if (total <= 140) {
        riskLevel = "Intermédiaire"
        inHospitalMortality = "1-3%"
        color = "text-yellow-600"
        recommendation = "Coronarographie recommandée dans les 24-72h"
      } else {
        riskLevel = "Élevé"
        inHospitalMortality = ">3%"
        color = "text-red-600"
        recommendation = "Coronarographie urgente <24h - Traitement optimal"
      }

      if (total < 89) {
        sixMonthMortality = "<3%"
      } else if (total <= 118) {
        sixMonthMortality = "3-8%"
      } else {
        sixMonthMortality = ">8%"
      }
    } else {
      if (total < 126) {
        riskLevel = "Faible"
        inHospitalMortality = "<2%"
        color = "text-green-600"
        recommendation = "Coronarographie dans les 120 min - Surveillance standard"
      } else if (total <= 154) {
        riskLevel = "Intermédiaire"
        inHospitalMortality = "2-5%"
        color = "text-yellow-600"
        recommendation = "Coronarographie immédiate - Surveillance rapprochée"
      } else {
        riskLevel = "Élevé"
        inHospitalMortality = ">5%"
        color = "text-red-600"
        recommendation = "Coronarographie immédiate - Support hémodynamique si nécessaire"
      }

      if (total < 100) {
        sixMonthMortality = "<4.5%"
      } else if (total <= 127) {
        sixMonthMortality = "4.5-11%"
      } else {
        sixMonthMortality = ">11%"
      }
    }

    setResult({
      total,
      riskLevel,
      inHospitalMortality,
      sixMonthMortality,
      color,
      recommendation,
    })
  }

  useEffect(() => {
    if (age && heartRate && systolicBP && creatinine && killipClass) {
      calculateGrace()
    }
  }, [
    age,
    heartRate,
    systolicBP,
    creatinine,
    creatinineUnit,
    killipClass,
    cardiacArrest,
    stDeviation,
    elevatedBiomarkers,
    acsStype,
  ])

  const resetForm = () => {
    setAge("")
    setHeartRate("")
    setSystolicBP("")
    setCreatinine("")
    setCreatinineUnit("mg/dL")
    setKillipClass("")
    setCardiacArrest(false)
    setStDeviation(false)
    setElevatedBiomarkers(false)
    setResult(null)
  }

  return (
    <div className="space-y-6">
      <div className="bg-gradient-to-br from-red-900 via-red-800 to-orange-900 p-6 rounded-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 bg-white/10 rounded-lg backdrop-blur">
            <Heart className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">Score GRACE</h2>
            <p className="text-red-100 text-sm">Global Registry of Acute Coronary Events</p>
          </div>
        </div>

        <div className="mb-4">
          <Label className="text-white mb-2">Type de SCA</Label>
          <div className="flex gap-2">
            <Button
              type="button"
              variant={acsStype === "NSTEMI" ? "default" : "outline"}
              onClick={() => setAcsType("NSTEMI")}
              className="flex-1"
            >
              NSTEMI
            </Button>
            <Button
              type="button"
              variant={acsStype === "STEMI" ? "default" : "outline"}
              onClick={() => setAcsType("STEMI")}
              className="flex-1"
            >
              STEMI
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label className="text-white">Âge (années)</Label>
            <Input
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              placeholder="Ex: 65"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Fréquence cardiaque (bpm)</Label>
            <Input
              type="number"
              value={heartRate}
              onChange={(e) => setHeartRate(e.target.value)}
              placeholder="Ex: 80"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">PAS (mmHg)</Label>
            <Input
              type="number"
              value={systolicBP}
              onChange={(e) => setSystolicBP(e.target.value)}
              placeholder="Ex: 130"
              className="bg-white/20 border-white/30 text-white placeholder:text-white/50"
            />
          </div>

          <div className="space-y-2">
            <Label className="text-white">Créatinine</Label>
            <div className="flex gap-2">
              <Input
                type="number"
                step="0.1"
                value={creatinine}
                onChange={(e) => setCreatinine(e.target.value)}
                placeholder={creatinineUnit === "mg/dL" ? "Ex: 1.2" : "Ex: 106"}
                className="bg-white/20 border-white/30 text-white placeholder:text-white/50 flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => {
                  if (creatinine) {
                    const currentValue = Number.parseFloat(creatinine)
                    if (creatinineUnit === "mg/dL") {
                      setCreatinine((currentValue * 88.4).toFixed(1))
                      setCreatinineUnit("µmol/L")
                    } else {
                      setCreatinine((currentValue / 88.4).toFixed(2))
                      setCreatinineUnit("mg/dL")
                    }
                  } else {
                    setCreatinineUnit(creatinineUnit === "mg/dL" ? "µmol/L" : "mg/dL")
                  }
                }}
                className="bg-white/20 border-white/30 hover:bg-white/30 shrink-0"
                title="Convertir l'unité"
              >
                <ArrowRightLeft className="h-4 w-4 text-white" />
              </Button>
            </div>
            <p className="text-white/60 text-xs">{creatinineUnit}</p>
          </div>

          <div className="space-y-2 md:col-span-2">
            <Label className="text-white">Classe Killip</Label>
            <Select value={killipClass} onValueChange={setKillipClass}>
              <SelectTrigger className="bg-white/20 border-white/30 text-white">
                <SelectValue placeholder="Sélectionner" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="I">Classe I - Pas de signe d&apos;IC</SelectItem>
                <SelectItem value="II">Classe II - Râles, TJV élevée</SelectItem>
                <SelectItem value="III">Classe III - OAP</SelectItem>
                <SelectItem value="IV">Classe IV - Choc cardiogénique</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="mt-4 space-y-3">
          <Label className="text-white">Critères additionnels</Label>

          <div className="space-y-2">
            <label className="flex items-center gap-3 p-3 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition">
              <input
                type="checkbox"
                checked={cardiacArrest}
                onChange={(e) => setCardiacArrest(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <span className="text-white text-sm">Arrêt cardiaque à l&apos;admission (+39 pts)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition">
              <input
                type="checkbox"
                checked={stDeviation}
                onChange={(e) => setStDeviation(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <span className="text-white text-sm">Déviation du segment ST (+28 pts)</span>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-lg bg-white/10 cursor-pointer hover:bg-white/20 transition">
              <input
                type="checkbox"
                checked={elevatedBiomarkers}
                onChange={(e) => setElevatedBiomarkers(e.target.checked)}
                className="h-4 w-4 rounded"
              />
              <span className="text-white text-sm">Biomarqueurs cardiaques élevés (+14 pts)</span>
            </label>
          </div>
        </div>

        {result && (
          <div className="mt-6 space-y-4">
            <Card className="bg-white/10 backdrop-blur border-white/20">
              <CardContent className="p-4 space-y-4">

                {/* Score visualization */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-white font-medium">Score GRACE Total</span>
                    <span className="text-3xl font-bold text-white">{result.total}</span>
                  </div>
                  <div className="h-3 bg-black/30 rounded-full overflow-hidden backdrop-blur-sm">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min((result.total / 250) * 100, 100)}%` }}
                      className={`h-full ${result.color.replace('text-', 'bg-')}`}
                      transition={{ duration: 1.5, ease: "easeOut" }}
                    />
                  </div>
                  <div className="flex justify-between text-[10px] text-white/40 mt-1 px-1">
                    <span>Low risk</span>
                    <span>High risk</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Niveau de risque</span>
                    <Badge variant="outline" className={`${result.color} border-current bg-white/10 px-3`}>
                      {result.riskLevel}
                    </Badge>
                  </div>
// ... rest of component

                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Mortalité hospitalière</span>
                    <span className="text-white font-medium">{result.inHospitalMortality}</span>
                  </div>

                  <div className="flex justify-between items-center">
                    <span className="text-white/80 text-sm">Mortalité à 6 mois</span>
                    <span className="text-white font-medium">{result.sixMonthMortality}</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/20">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-yellow-300 mt-0.5 shrink-0" />
                    <p className="text-white text-sm">{result.recommendation}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Button
              onClick={resetForm}
              variant="outline"
              className="w-full bg-white/10 border-white/30 text-white hover:bg-white/20"
            >
              Réinitialiser
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

export default CalculetteGrace
