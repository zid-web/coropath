"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Calculator, AlertCircle } from "lucide-react"

export function CalculetteRevascularisation() {
  const [syntaxScore, setSyntaxScore] = useState(0)
  const [stsScore, setStsScore] = useState<number | null>(null)
  const [euroScore, setEuroScore] = useState<number | null>(null)

  const [stsAge, setStsAge] = useState("")
  const [stsSexe, setStsSexe] = useState("H") // Default value set to "H"
  const [stsCreat, setStsCreat] = useState("")
  const [stsFEVG, setStsFEVG] = useState("")
  const [stsDiabete, setStsDiabete] = useState(false)
  const [stsHTA, setStsHTA] = useState(false)
  const [stsBPCO, setStsBPCO] = useState(false)
  const [stsDialyse, setStsDialyse] = useState(false)
  const [stsChocCardiogenique, setStsChocCardiogenique] = useState(false)
  const [stsReanimation, setStsReanimation] = useState(false)
  const [stsUrgence, setStsUrgence] = useState("Électif") // Default value set to "Électif"
  const [stsInfarctus, setStsInfarctus] = useState(false)
  const [stsAVC, setStsAVC] = useState(false)
  const [stsArterioPV, setStsArterioPV] = useState(false)

  const [euroAge, setEuroAge] = useState("")
  const [euroSexe, setEuroSexe] = useState("H") // Default value set to "H"
  const [euroCreat, setEuroCreat] = useState("")
  const [euroFEVG, setEuroFEVG] = useState("")
  const [euroUrgence, setEuroUrgence] = useState("Électif") // Default value set to "Électif"
  const [euroBPCO, setEuroBPCO] = useState(false)
  const [euroDialyse, setEuroDialyse] = useState(false)
  const [euroEndocardite, setEuroEndocardite] = useState(false)
  const [euroEtatCritique, setEuroEtatCritique] = useState(false)
  const [euroAngineFourth, setEuroAngineFourth] = useState(false)
  const [euroIMRecente, setEuroIMRecente] = useState(false)
  const [euroHTAP, setEuroHTAP] = useState(false)
  const [euroTypeChirurgie, setEuroTypeChirurgie] = useState("isole") // Changed default from "" to "isole"
  const [euroChirurgieThoracique, setEuroChirurgieThoracique] = useState(false)

  const [stsCreatUnit, setStsCreatUnit] = useState<"mg" | "umol">("mg")
  const [euroCreatUnit, setEuroCreatUnit] = useState<"mg" | "umol">("mg")

  const convertCreatinine = (value: string, fromUnit: "mg" | "umol", toUnit: "mg" | "umol") => {
    const val = Number.parseFloat(value)
    if (isNaN(val)) return ""
    if (fromUnit === toUnit) return value
    if (fromUnit === "mg" && toUnit === "umol") return (val * 88.4).toFixed(1)
    if (fromUnit === "umol" && toUnit === "mg") return (val / 88.4).toFixed(2)
    return value
  }

  const calculerSTS = () => {
    let logit = -7.0 // Constante de base

    const age = Number.parseFloat(stsAge)
    const creat = Number.parseFloat(stsCreat)
    const fevg = Number.parseFloat(stsFEVG)

    // Âge (coefficient non-linéaire)
    if (age) {
      logit += (age - 60) * 0.0285
    }

    // Sexe féminin
    if (stsSexe === "F") logit += 0.3304

    // Créatinine
    if (creat) {
      if (creat < 1.2) logit += 0
      else if (creat <= 2.0) logit += 0.3521
      else logit += 0.7419
    }

    // FEVG
    if (fevg) {
      if (fevg >= 50) logit += 0
      else if (fevg >= 40) logit += 0.1683
      else if (fevg >= 30) logit += 0.4823
      else logit += 0.7579
    }

    // Diabète
    if (stsDiabete) logit += 0.3647

    // Hypertension
    if (stsHTA) logit += 0.1825

    // BPCO
    if (stsBPCO) logit += 0.4241

    // Dialyse
    if (stsDialyse) logit += 0.8413

    // Choc cardiogénique
    if (stsChocCardiogenique) logit += 1.3876

    // Réanimation
    if (stsReanimation) logit += 0.8881

    // Urgence
    if (stsUrgence === "urgence") logit += 0.598
    else if (stsUrgence === "sauvetage") logit += 1.2452

    // Infarctus récent
    if (stsInfarctus) logit += 0.4412

    // AVC
    if (stsAVC) logit += 0.5319

    // Artériopathie périphérique
    if (stsArterioPV) logit += 0.2972

    // Conversion en probabilité
    const risque = (Math.exp(logit) / (1 + Math.exp(logit))) * 100
    setStsScore(risque)
  }

  const calculerEuroScore = () => {
    let logit = -5.324537 // Constante de base EuroSCORE II

    const age = Number.parseFloat(euroAge)
    const creat = Number.parseFloat(euroCreat)
    const fevg = Number.parseFloat(euroFEVG)

    // Âge (par 5 ans après 60 ans)
    if (age >= 60) {
      logit += ((age - 60) / 5) * 0.0666354
    }

    // Sexe féminin
    if (euroSexe === "F") logit += 0.2196434

    // Clairance créatinine (Cockroft-Gault)
    if (creat && age) {
      const poids = 75 // Estimation moyenne
      const clairance =
        euroSexe === "F" ? ((140 - age) * poids * 0.85) / (creat * 72) : ((140 - age) * poids) / (creat * 72)

      if (clairance < 50) logit += 0.303553
      if (euroDialyse) logit += 0.6421508
    }

    // FEVG
    if (fevg) {
      if (fevg < 20) logit += 1.086517
      else if (fevg <= 30) logit += 0.7676924
      else if (fevg <= 50) logit += 0.2801993
    }

    // BPCO
    if (euroBPCO) logit += 0.1886564

    // Endocardite active
    if (euroEndocardite) logit += 0.6194522

    // État critique
    if (euroEtatCritique) logit += 1.0192682

    // Angor classe IV
    if (euroAngineFourth) logit += 0.2226147

    // IM récent (<90j)
    if (euroIMRecente) logit += 0.1528943

    // HTAP (PAS > 55 mmHg)
    if (euroHTAP) logit += 0.3917868

    // Urgence
    if (euroUrgence === "urgente") logit += 0.3420878
    else if (euroUrgence === "urgence") logit += 0.7127953

    // Type de chirurgie
    if (euroTypeChirurgie === "tritronc") logit += 0.1202264
    else if (euroTypeChirurgie === "autre") logit += 0.5521478

    // Chirurgie thoracique antérieure
    if (euroChirurgieThoracique) logit += 1.118599

    // Conversion en probabilité
    const risque = (Math.exp(logit) / (1 + Math.exp(logit))) * 100
    setEuroScore(risque)
  }

  const getSyntaxRecommandation = (score: number) => {
    if (score <= 22)
      return { niveau: "Faible", color: "bg-green-100 text-green-800", conseil: "PCI ou CABG acceptables" }
    if (score <= 32)
      return { niveau: "Intermédiaire", color: "bg-yellow-100 text-yellow-800", conseil: "Discuter en Heart Team" }
    return { niveau: "Élevé", color: "bg-red-100 text-red-800", conseil: "CABG préférable" }
  }

  const getRisqueChirurgical = (score: number) => {
    if (score < 2) return { niveau: "Faible", color: "bg-green-100 text-green-800" }
    if (score < 6) return { niveau: "Modéré", color: "bg-yellow-100 text-yellow-800" }
    return { niveau: "Élevé", color: "bg-red-100 text-red-800" }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-300"
        >
          <Calculator className="h-4 w-4 mr-2" />
          Scores Revascularisation
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-purple-900">
            Calculettes Revascularisation Myocardique
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="syntax" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="syntax">SYNTAX Score</TabsTrigger>
            <TabsTrigger value="sts">STS Score</TabsTrigger>
            <TabsTrigger value="euroscore">EuroSCORE II</TabsTrigger>
          </TabsList>

          <TabsContent value="syntax" className="space-y-4">
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-4">
              <h3 className="font-semibold text-purple-900 mb-2">SYNTAX Score - Complexité anatomique</h3>
              <p className="text-sm text-gray-700 mb-4">
                Score angiographique évaluant la complexité des lésions coronaires
              </p>

              <div className="space-y-3">
                <div>
                  <Label htmlFor="syntax-score">Score SYNTAX (0-60+)</Label>
                  <Input
                    id="syntax-score"
                    type="number"
                    value={syntaxScore}
                    onChange={(e) => setSyntaxScore(Number(e.target.value))}
                    placeholder="Entrez le score SYNTAX"
                  />
                  <p className="text-xs text-gray-600 mt-1">
                    Calculé via www.syntaxscore.org à partir de la coronarographie
                  </p>
                </div>

                {syntaxScore > 0 && (
                  <div className="bg-white rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">Score SYNTAX:</span>
                      <Badge className="text-lg">{syntaxScore}</Badge>
                    </div>

                    <div className="flex items-center justify-between">
                      <span className="font-medium">Complexité:</span>
                      <Badge className={getSyntaxRecommandation(syntaxScore).color}>
                        {getSyntaxRecommandation(syntaxScore).niveau}
                      </Badge>
                    </div>

                    <div className="bg-blue-50 rounded p-3">
                      <p className="text-sm font-medium text-blue-900">
                        💡 {getSyntaxRecommandation(syntaxScore).conseil}
                      </p>
                    </div>

                    <div className="text-xs text-gray-600 space-y-1">
                      <p>
                        <strong>• SYNTAX ≤ 22:</strong> PCI non-inférieure au CABG (tronc commun, tritronc)
                      </p>
                      <p>
                        <strong>• SYNTAX 23-32:</strong> Décision Heart Team selon profil patient
                      </p>
                      <p>
                        <strong>• SYNTAX {">"} 32:</strong> CABG préférable (meilleurs résultats long terme)
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="sts" className="space-y-4">
            <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-lg p-4">
              <h3 className="font-semibold text-blue-900 mb-2">STS Score - Risque chirurgical CABG</h3>
              <p className="text-sm text-gray-700 mb-4">
                Score prédictif de mortalité opératoire (Society of Thoracic Surgeons)
              </p>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="sts-age">Âge (années)</Label>
                    <Input
                      id="sts-age"
                      type="number"
                      value={stsAge}
                      onChange={(e) => setStsAge(e.target.value)}
                      placeholder="65"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sts-sexe">Sexe</Label>
                    <Select value={stsSexe} onValueChange={setStsSexe}>
                      <SelectTrigger id="sts-sexe">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H">Homme</SelectItem>
                        <SelectItem value="F">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="sts-creat">Créatinine</Label>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Créatinine</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            const newUnit = stsCreatUnit === "mg" ? "umol" : "mg"
                            setStsCreat(convertCreatinine(stsCreat, stsCreatUnit, newUnit))
                            setStsCreatUnit(newUnit)
                          }}
                          className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          {stsCreatUnit === "mg" ? "mg/dL → µmol/L" : "µmol/L → mg/dL"}
                        </button>
                      </div>
                    </div>
                    <Input
                      id="sts-creat"
                      type="number"
                      step="0.1"
                      value={stsCreat}
                      onChange={(e) => setStsCreat(e.target.value)}
                      placeholder={stsCreatUnit === "mg" ? "1.0" : "88"}
                    />
                    <span className="text-xs text-gray-500">{stsCreatUnit === "mg" ? "mg/dL" : "µmol/L"}</span>
                  </div>

                  <div>
                    <Label htmlFor="sts-fevg">FEVG (%)</Label>
                    <Input
                      id="sts-fevg"
                      type="number"
                      value={stsFEVG}
                      onChange={(e) => setStsFEVG(e.target.value)}
                      placeholder="55"
                    />
                  </div>

                  <div>
                    <Label htmlFor="sts-urgence">Statut</Label>
                    <Select value={stsUrgence} onValueChange={setStsUrgence}>
                      <SelectTrigger id="sts-urgence">
                        <SelectValue placeholder="Électif" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Électif">Électif</SelectItem>
                        <SelectItem value="urgence">Urgence</SelectItem>
                        <SelectItem value="sauvetage">Sauvetage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-diabete"
                      checked={stsDiabete}
                      onChange={(e) => setStsDiabete(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-diabete" className="text-sm">
                      Diabète
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-hta"
                      checked={stsHTA}
                      onChange={(e) => setStsHTA(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-hta" className="text-sm">
                      HTA
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-bpco"
                      checked={stsBPCO}
                      onChange={(e) => setStsBPCO(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-bpco" className="text-sm">
                      BPCO
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-dialyse"
                      checked={stsDialyse}
                      onChange={(e) => setStsDialyse(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-dialyse" className="text-sm">
                      Dialyse
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-choc"
                      checked={stsChocCardiogenique}
                      onChange={(e) => setStsChocCardiogenique(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-choc" className="text-sm">
                      Choc cardiogénique
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-reanimation"
                      checked={stsReanimation}
                      onChange={(e) => setStsReanimation(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-reanimation" className="text-sm">
                      Réanimation
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-infarctus"
                      checked={stsInfarctus}
                      onChange={(e) => setStsInfarctus(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-infarctus" className="text-sm">
                      IM récent
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-avc"
                      checked={stsAVC}
                      onChange={(e) => setStsAVC(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-avc" className="text-sm">
                      AVC
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="sts-arterio"
                      checked={stsArterioPV}
                      onChange={(e) => setStsArterioPV(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="sts-arterio" className="text-sm">
                      Artériopathie
                    </Label>
                  </div>
                </div>
              </div>

              <Button onClick={calculerSTS} className="w-full mt-4 bg-blue-600 hover:bg-blue-700">
                Calculer STS Score
              </Button>

              {stsScore !== null && (
                <div className="bg-white rounded-lg p-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Risque de mortalité:</span>
                    <Badge className="text-lg">{stsScore.toFixed(2)}%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Catégorie:</span>
                    <Badge className={getRisqueChirurgical(stsScore).color}>
                      {getRisqueChirurgical(stsScore).niveau}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      <strong>• Risque faible {"<"} 2%:</strong> CABG sûr, mortalité faible
                    </p>
                    <p>
                      <strong>• Risque modéré 2-6%:</strong> Évaluer bénéfice/risque, optimisation pré-op
                    </p>
                    <p>
                      <strong>• Risque élevé {">"} 6%:</strong> Considérer PCI ou traitement médical optimal
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>

          <TabsContent value="euroscore" className="space-y-4">
            <div className="bg-gradient-to-br from-cyan-50 to-teal-50 rounded-lg p-4">
              <h3 className="font-semibold text-cyan-900 mb-2">EuroSCORE II - Risque chirurgical</h3>
              <p className="text-sm text-gray-700 mb-4">
                Score européen prédictif de mortalité pour chirurgie cardiaque
              </p>

              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="euro-age">Âge (années)</Label>
                    <Input
                      id="euro-age"
                      type="number"
                      value={euroAge}
                      onChange={(e) => setEuroAge(e.target.value)}
                      placeholder="70"
                    />
                  </div>

                  <div>
                    <Label htmlFor="euro-sexe">Sexe</Label>
                    <Select value={euroSexe} onValueChange={setEuroSexe}>
                      <SelectTrigger id="euro-sexe">
                        <SelectValue placeholder="Sélectionner" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="H">Homme</SelectItem>
                        <SelectItem value="F">Femme</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="euro-creat">Créatinine</Label>
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">Créatinine</span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            const newUnit = euroCreatUnit === "mg" ? "umol" : "mg"
                            setEuroCreat(convertCreatinine(euroCreat, euroCreatUnit, newUnit))
                            setEuroCreatUnit(newUnit)
                          }}
                          className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 transition-colors"
                        >
                          {euroCreatUnit === "mg" ? "mg/dL → µmol/L" : "µmol/L → mg/dL"}
                        </button>
                      </div>
                    </div>
                    <Input
                      id="euro-creat"
                      type="number"
                      step="0.1"
                      value={euroCreat}
                      onChange={(e) => setEuroCreat(e.target.value)}
                      placeholder={euroCreatUnit === "mg" ? "1.2" : "106"}
                    />
                    <span className="text-xs text-gray-500">{euroCreatUnit === "mg" ? "mg/dL" : "µmol/L"}</span>
                  </div>

                  <div>
                    <Label htmlFor="euro-fevg">FEVG (%)</Label>
                    <Input
                      id="euro-fevg"
                      type="number"
                      value={euroFEVG}
                      onChange={(e) => setEuroFEVG(e.target.value)}
                      placeholder="50"
                    />
                  </div>

                  <div>
                    <Label htmlFor="euro-urgence">Statut chirurgical</Label>
                    <Select value={euroUrgence} onValueChange={setEuroUrgence}>
                      <SelectTrigger id="euro-urgence">
                        <SelectValue placeholder="Électif" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Électif">Électif</SelectItem>
                        <SelectItem value="urgente">Urgente</SelectItem>
                        <SelectItem value="urgence">Urgence/Sauvetage</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="euro-type">Type chirurgie</Label>
                    <Select value={euroTypeChirurgie} onValueChange={setEuroTypeChirurgie}>
                      <SelectTrigger id="euro-type">
                        <SelectValue placeholder="CABG isolé" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="isole">CABG isolé 1-2 troncs</SelectItem>
                        <SelectItem value="tritronc">CABG 3 troncs</SelectItem>
                        <SelectItem value="autre">CABG + valve</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-bpco"
                      checked={euroBPCO}
                      onChange={(e) => setEuroBPCO(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-bpco" className="text-sm">
                      BPCO
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-dialyse"
                      checked={euroDialyse}
                      onChange={(e) => setEuroDialyse(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-dialyse" className="text-sm">
                      Dialyse
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-endocardite"
                      checked={euroEndocardite}
                      onChange={(e) => setEuroEndocardite(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-endocardite" className="text-sm">
                      Endocardite
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-critique"
                      checked={euroEtatCritique}
                      onChange={(e) => setEuroEtatCritique(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-critique" className="text-sm">
                      État critique
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-angine"
                      checked={euroAngineFourth}
                      onChange={(e) => setEuroAngineFourth(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-angine" className="text-sm">
                      Angor classe IV
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-im"
                      checked={euroIMRecente}
                      onChange={(e) => setEuroIMRecente(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-im" className="text-sm">
                      IM {"<"} 90j
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-htap"
                      checked={euroHTAP}
                      onChange={(e) => setEuroHTAP(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-htap" className="text-sm">
                      HTAP
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="euro-chirurgie"
                      checked={euroChirurgieThoracique}
                      onChange={(e) => setEuroChirurgieThoracique(e.target.checked)}
                      className="rounded"
                    />
                    <Label htmlFor="euro-chirurgie" className="text-sm">
                      Chirurgie antérieure
                    </Label>
                  </div>
                </div>
              </div>

              <Button onClick={calculerEuroScore} className="w-full mt-4 bg-cyan-600 hover:bg-cyan-700">
                Calculer EuroSCORE II
              </Button>

              {euroScore !== null && (
                <div className="bg-white rounded-lg p-4 mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">Risque de mortalité:</span>
                    <Badge className="text-lg">{euroScore.toFixed(2)}%</Badge>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="font-medium">Catégorie:</span>
                    <Badge className={getRisqueChirurgical(euroScore).color}>
                      {getRisqueChirurgical(euroScore).niveau}
                    </Badge>
                  </div>

                  <div className="text-xs text-gray-600 space-y-1">
                    <p>
                      <strong>• Risque faible {"<"} 2%:</strong> Chirurgie à faible risque
                    </p>
                    <p>
                      <strong>• Risque modéré 2-6%:</strong> Optimisation pré-opératoire recommandée
                    </p>
                    <p>
                      <strong>• Risque élevé {">"} 6%:</strong> Discussion multidisciplinaire nécessaire
                    </p>
                  </div>
                </div>
              )}
            </div>
          </TabsContent>
        </Tabs>

        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mt-4">
          <div className="flex gap-2">
            <AlertCircle className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-sm text-amber-900">
              <p className="font-medium mb-1">Note importante</p>
              <p>
                Ces calculateurs utilisent les formules validées STS et EuroSCORE II. La décision de revascularisation
                doit être prise en Heart Team multidisciplinaire intégrant les aspects cliniques, anatomiques et les
                préférences du patient.
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default CalculetteRevascularisation
