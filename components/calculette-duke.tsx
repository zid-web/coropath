"use client"

import { useState } from "react"
import { Calculator, Activity, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function CalculetteDuke() {
  const [open, setOpen] = useState(false)
  const [duration, setDuration] = useState(9)
  const [stDepression, setStDepression] = useState(0)
  const [anginaIndex, setAnginaIndex] = useState("0")
  const [result, setResult] = useState<{
    score: number
    category: string
    mortality: string
    color: string
  } | null>(null)

  const calculateDuke = () => {
    // Duke Formula: Duration - (5 x ST depression) - (4 x Angina index)
    const score = duration - 5 * stDepression - 4 * Number.parseInt(anginaIndex)

    let category: string, mortality: string, color: string

    if (score >= 5) {
      category = "Risque Faible"
      mortality = "<1% par an"
      color = "text-green-600"
    } else if (score >= -10) {
      category = "Risque Modere"
      mortality = "1-3% par an"
      color = "text-yellow-600"
    } else {
      category = "Risque Eleve"
      mortality = ">3% par an"
      color = "text-red-600"
    }

    setResult({ score, category, mortality, color })
  }

  const reset = () => {
    setDuration(9)
    setStDepression(0)
    setAnginaIndex("0")
    setResult(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="gap-1 bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200"
        >
          <Activity className="h-3.5 w-3.5" />
          Duke
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-purple-700">
            <Activity className="h-5 w-5" />
            Duke Treadmill Score
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="p-3 bg-purple-50 rounded-lg text-sm">
            <p className="text-purple-800">
              <strong>Formule:</strong> Duree - (5 x Sous-decalage ST) - (4 x Index Angor)
            </p>
          </div>

          <div className="space-y-2">
            <Label>Duree effort (min) - Protocole Bruce</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(Number.parseFloat(e.target.value) || 0)}
              min={0}
              max={30}
              step={0.5}
            />
          </div>

          <div className="space-y-2">
            <Label>Sous-decalage ST max (mm)</Label>
            <Input
              type="number"
              value={stDepression}
              onChange={(e) => setStDepression(Number.parseFloat(e.target.value) || 0)}
              min={0}
              max={10}
              step={0.5}
            />
            <p className="text-xs text-gray-500">Mesure a 80ms apres le point J</p>
          </div>

          <div className="space-y-2">
            <Label>Angor a effort</Label>
            <RadioGroup value={anginaIndex} onValueChange={setAnginaIndex}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="0" id="angina-0" />
                <Label htmlFor="angina-0" className="text-sm">
                  Aucun angor (0)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="1" id="angina-1" />
                <Label htmlFor="angina-1" className="text-sm">
                  Angor sans limitation (1)
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="2" id="angina-2" />
                <Label htmlFor="angina-2" className="text-sm">
                  Angor limitant effort (2)
                </Label>
              </div>
            </RadioGroup>
          </div>

          <div className="flex gap-2">
            <Button onClick={calculateDuke} className="flex-1 bg-purple-600 hover:bg-purple-700">
              <Calculator className="h-4 w-4 mr-2" />
              Calculer
            </Button>
            <Button onClick={reset} variant="outline" size="icon">
              <Info className="h-4 w-4" />
            </Button>
          </div>

          {result && (
            <div
              className={`p-4 rounded-lg border-2 ${
                result.score >= 5
                  ? "bg-green-50 border-green-200"
                  : result.score >= -10
                    ? "bg-yellow-50 border-yellow-200"
                    : "bg-red-50 border-red-200"
              }`}
            >
              <div className="text-center mb-3">
                <div className={`text-3xl font-bold ${result.color}`}>{result.score.toFixed(1)}</div>
                <div className={`text-lg font-semibold ${result.color}`}>{result.category}</div>
                <div className="text-sm text-gray-600">Mortalite: {result.mortality}</div>
              </div>

              <div className="text-sm space-y-2 mt-3 pt-3 border-t">
                <p className="font-medium">Recommandations:</p>
                {result.score >= 5 && (
                  <ul className="list-disc list-inside text-green-700 space-y-1">
                    <li>Pas examen complementaire necessaire</li>
                    <li>Traitement medical optimal</li>
                    <li>Suivi clinique annuel</li>
                  </ul>
                )}
                {result.score >= -10 && result.score < 5 && (
                  <ul className="list-disc list-inside text-yellow-700 space-y-1">
                    <li>Imagerie fonctionnelle recommandee (IIa/B)</li>
                    <li>Scintigraphie, echo stress ou IRM</li>
                    <li>Si ischemie ≥10% : coronarographie</li>
                  </ul>
                )}
                {result.score < -10 && (
                  <ul className="list-disc list-inside text-red-700 space-y-1">
                    <li>Coronarographie recommandee (I/B)</li>
                    <li>Evaluation hemodynamique FFR/iFR</li>
                    <li>Discussion Heart Team</li>
                  </ul>
                )}
              </div>
            </div>
          )}

          <div className="text-xs text-gray-500 p-2 bg-gray-50 rounded">
            <strong>Seuils:</strong> ≥5 (faible), -10 a +4 (modere), ≤-11 (eleve)
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteDuke
