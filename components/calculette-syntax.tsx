"use client"

import { useState } from "react"
import { Calculator, GitBranch, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function CalculetteSyntax() {
  const [open, setOpen] = useState(false)
  const [vessels, setVessels] = useState("2")
  const [hasLM, setHasLM] = useState(false)
  const [lesions, setLesions] = useState(3)
  const [complexLesions, setComplexLesions] = useState(1)
  const [hasCalc, setHasCalc] = useState(false)
  const [hasDiffuse, setHasDiffuse] = useState(false)
  const [result, setResult] = useState<{
    score: number
    category: string
    recommendation: string
    color: string
  } | null>(null)

  const calculateSyntax = () => {
    let score = 0

    // Base score from number of lesions
    score += lesions * 3

    // Vessel involvement
    if (vessels === "3") score += 5

    // Left main
    if (hasLM) score += 5

    // Complex lesions
    score += complexLesions * 4

    // Calcifications
    if (hasCalc) score += 3

    // Diffuse disease
    if (hasDiffuse) score += 3

    // Cap at realistic maximum
    score = Math.min(score, 60)

    let category: string, recommendation: string, color: string

    if (score <= 22) {
      category = "Complexite Faible (≤22)"
      recommendation = "PCI ou CABG equivalents (I/A)"
      color = "text-green-600"
    } else if (score <= 32) {
      category = "Complexite Intermediaire (23-32)"
      recommendation = "CABG prefere (IIa/A), PCI acceptable"
      color = "text-yellow-600"
    } else {
      category = "Complexite Elevee (≥33)"
      recommendation = "CABG fortement recommande (I/A)"
      color = "text-red-600"
    }

    setResult({ score, category, recommendation, color })
  }

  const reset = () => {
    setVessels("2")
    setHasLM(false)
    setLesions(3)
    setComplexLesions(1)
    setHasCalc(false)
    setHasDiffuse(false)
    setResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border-indigo-200"
        >
          <GitBranch className="h-3.5 w-3.5" />
          SYNTAX
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-indigo-700">
            <GitBranch className="h-5 w-5" />
            Score SYNTAX (Estime)
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-amber-50 rounded-lg text-sm text-amber-800">
            <AlertTriangle className="h-4 w-4 inline mr-1" />
            <strong>Estimation simplifiee.</strong> Score precis sur syntaxscore.org
          </div>

          <div className="space-y-2">
            <Label>Nombre de vaisseaux atteints</Label>
            <RadioGroup value={vessels} onValueChange={setVessels}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="vessels-2" />
                <Label htmlFor="vessels-2">Bitronculaire</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="3" id="vessels-3" />
                <Label htmlFor="vessels-3">Tritronculaire</Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="lm" checked={hasLM} onCheckedChange={(c) => setHasLM(c === true)} />
            <Label htmlFor="lm">Atteinte du tronc commun</Label>
          </div>

          <div className="space-y-2">
            <Label>Nombre de lesions significatives ({">"}50%)</Label>
            <Input
              type="number"
              value={lesions}
              onChange={(e) => setLesions(Number.parseInt(e.target.value) || 0)}
              min={1}
              max={15}
            />
          </div>

          <div className="space-y-2">
            <Label>Lesions complexes (bifurcations, CTO)</Label>
            <Input
              type="number"
              value={complexLesions}
              onChange={(e) => setComplexLesions(Number.parseInt(e.target.value) || 0)}
              min={0}
              max={10}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="calc" checked={hasCalc} onCheckedChange={(c) => setHasCalc(c === true)} />
            <Label htmlFor="calc">Calcifications importantes</Label>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox id="diffuse" checked={hasDiffuse} onCheckedChange={(c) => setHasDiffuse(c === true)} />
            <Label htmlFor="diffuse">Maladie diffuse ({">"}20mm)</Label>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateSyntax} className="flex-1 bg-indigo-600 hover:bg-indigo-700">
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
                result.score <= 22
                  ? "bg-green-50 border-green-200"
                  : result.score <= 32
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="text-center mb-3">
                <div className={`text-3xl font-bold ${result.color}`}>{result.score}</div>
                <div className={`text-sm font-semibold ${result.color}`}>{result.category}</div>
              </div>

              <div className="text-sm p-2 bg-white rounded border">
                <p className="font-medium">{result.recommendation}</p>
              </div>

              <div className="text-sm mt-3 space-y-1">
                {result.score <= 22 && <p className="text-green-700">Choix selon preference patient et comorbidites</p>}
                {result.score > 22 && result.score <= 32 && (
                  <p className="text-yellow-700">Discussion Heart Team recommandee</p>
                )}
                {result.score > 32 && <p className="text-red-700">Discussion Heart Team INDISPENSABLE</p>}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteSyntax
