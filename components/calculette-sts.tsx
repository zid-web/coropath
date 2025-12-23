"use client"

import { useState } from "react"
import { Calculator, HeartPulse, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function CalculetteSTS() {
  const [open, setOpen] = useState(false)
  const [age, setAge] = useState(65)
  const [sex, setSex] = useState("M")
  const [creat, setCreat] = useState(1.0)
  const [ef, setEf] = useState(55)
  const [diabetes, setDiabetes] = useState(false)
  const [pvd, setPvd] = useState(false)
  const [copd, setCopd] = useState(false)
  const [surgery, setSurgery] = useState("isolated")
  const [urgency, setUrgency] = useState("elective")
  const [result, setResult] = useState<{
    score: number
    category: string
    color: string
  } | null>(null)

  const calculateSTS = () => {
    let riskScore = 0

    // Age contribution
    if (age < 50) riskScore += 0.5
    else if (age < 60) riskScore += 1
    else if (age < 70) riskScore += 2
    else if (age < 80) riskScore += 4
    else riskScore += 7

    // Sex
    if (sex === "F") riskScore += 0.5

    // Renal function
    if (creat > 2.0) riskScore += 3
    else if (creat > 1.5) riskScore += 1.5
    else if (creat > 1.2) riskScore += 0.5

    // LVEF
    if (ef < 30) riskScore += 3
    else if (ef < 40) riskScore += 1.5
    else if (ef < 50) riskScore += 0.5

    // Comorbidities
    if (diabetes) riskScore += 0.5
    if (pvd) riskScore += 1.5
    if (copd) riskScore += 1

    // Surgery type
    if (surgery === "combined") riskScore += 2

    // Urgency
    if (urgency === "urgent") riskScore += 1.5
    else if (urgency === "emergency") riskScore += 4

    riskScore = Math.min(riskScore, 20)

    let category: string, color: string

    if (riskScore < 4) {
      category = "Risque Faible (<4%)"
      color = "text-green-600"
    } else if (riskScore < 8) {
      category = "Risque Intermediaire (4-8%)"
      color = "text-yellow-600"
    } else {
      category = "Risque Eleve (>8%)"
      color = "text-red-600"
    }

    setResult({ score: riskScore, category, color })
  }

  const reset = () => {
    setAge(65)
    setSex("M")
    setCreat(1.0)
    setEf(55)
    setDiabetes(false)
    setPvd(false)
    setCopd(false)
    setSurgery("isolated")
    setUrgency("elective")
    setResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 bg-rose-50 hover:bg-rose-100 text-rose-700 border-rose-200"
        >
          <HeartPulse className="h-3.5 w-3.5" />
          STS
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-rose-700">
            <HeartPulse className="h-5 w-5" />
            Score STS (Estime)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            <strong>Estimation simplifiee.</strong> Score precis sur riskcalc.sts.org
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Age (ans)</Label>
              <Input
                type="number"
                value={age}
                onChange={(e) => setAge(Number.parseInt(e.target.value) || 65)}
                min={18}
                max={100}
              />
            </div>
            <div className="space-y-2">
              <Label>Sexe</Label>
              <RadioGroup value={sex} onValueChange={setSex} className="flex gap-4">
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="M" id="sex-m" />
                  <Label htmlFor="sex-m">H</Label>
                </div>
                <div className="flex items-center space-x-1">
                  <RadioGroupItem value="F" id="sex-f" />
                  <Label htmlFor="sex-f">F</Label>
                </div>
              </RadioGroup>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label>Creatinine (mg/dL)</Label>
              <Input
                type="number"
                value={creat}
                onChange={(e) => setCreat(Number.parseFloat(e.target.value) || 1)}
                min={0.5}
                max={10}
                step={0.1}
              />
            </div>
            <div className="space-y-2">
              <Label>FEVG (%)</Label>
              <Input
                type="number"
                value={ef}
                onChange={(e) => setEf(Number.parseInt(e.target.value) || 55)}
                min={10}
                max={80}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Comorbidites</Label>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="diabetes" checked={diabetes} onCheckedChange={(c) => setDiabetes(c === true)} />
                <Label htmlFor="diabetes" className="text-sm">
                  Diabete
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="pvd" checked={pvd} onCheckedChange={(c) => setPvd(c === true)} />
                <Label htmlFor="pvd" className="text-sm">
                  Arteriopathie peripherique
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Checkbox id="copd" checked={copd} onCheckedChange={(c) => setCopd(c === true)} />
                <Label htmlFor="copd" className="text-sm">
                  BPCO
                </Label>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Type chirurgie</Label>
            <RadioGroup value={surgery} onValueChange={setSurgery}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="isolated" id="surg-iso" />
                <Label htmlFor="surg-iso" className="text-sm">
                  PAC isole
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="combined" id="surg-comb" />
                <Label htmlFor="surg-comb" className="text-sm">
                  PAC + valve
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="space-y-2">
            <Label>Urgence</Label>
            <RadioGroup value={urgency} onValueChange={setUrgency}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="elective" id="urg-elec" />
                <Label htmlFor="urg-elec" className="text-sm">
                  Programme
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="urgent" id="urg-urg" />
                <Label htmlFor="urg-urg" className="text-sm">
                  Urgent
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="emergency" id="urg-emerg" />
                <Label htmlFor="urg-emerg" className="text-sm">
                  Urgence/Sauvetage
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateSTS} className="flex-1 bg-rose-600 hover:bg-rose-700">
              <Calculator className="h-4 w-4 mr-2" />
              Calculer
            </Button>
            <Button onClick={reset} variant="outline" size="icon">
              <AlertTriangle className="h-4 w-4" />
            </Button>
          </div>

          {result && (
            <div
              className={`p-4 rounded-lg border-2 ${
                result.score < 4
                  ? "bg-green-50 border-green-200"
                  : result.score < 8
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="text-center mb-3">
                <div className={`text-3xl font-bold ${result.color}`}>{result.score.toFixed(1)}%</div>
                <div className={`text-sm font-semibold ${result.color}`}>{result.category}</div>
                <div className="text-xs text-gray-600 mt-1">Mortalite operatoire a 30 jours</div>
              </div>

              <div className="text-sm space-y-1">
                {result.score < 4 && <p className="text-green-700">Excellent candidat pour CABG si indique</p>}
                {result.score >= 4 && result.score < 8 && (
                  <p className="text-yellow-700">Discussion Heart Team CABG vs PCI</p>
                )}
                {result.score >= 8 && <p className="text-red-700">Preferer PCI si anatomie favorable (IIa/B)</p>}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteSTS
