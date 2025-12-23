"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Droplets, AlertTriangle, CheckCircle2, Info, ArrowRight } from "lucide-react"
import { CalculetteDAPT } from "./calculette-dapt"

export function ArbreAntithrombotique() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50 bg-transparent">
          <Droplets className="h-4 w-4" />
          Arbre Décisionnel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-blue-900">
            Arbre Décisionnel Traitement Antithrombotique
          </DialogTitle>
          <p className="text-sm text-gray-600">Stratification selon le contexte clinique - ESC 2024</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Antiagrégation plaquettaire */}
          <div className="border-2 border-blue-200 rounded-lg p-6 bg-gradient-to-br from-blue-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-blue-600" />
              <div>
                <h3 className="text-xl font-bold text-blue-900">Antiagrégation Plaquettaire</h3>
                <Badge className="bg-blue-100 text-blue-800 mt-1">Prévention Secondaire</Badge>
              </div>
            </div>

            {/* Monothérapie */}
            <div className="bg-white rounded-lg border-2 border-indigo-200 p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold">
                  1
                </div>
                <h4 className="font-bold text-indigo-900">Monothérapie Standard</h4>
                <Badge className="bg-indigo-100 text-indigo-800">I / A</Badge>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-4 border-2 border-blue-300">
                  <h5 className="font-semibold text-blue-900 mb-2">Aspirine (1ère intention)</h5>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>
                      • <strong>Dose:</strong> 75-100 mg/jour
                    </li>
                    <li>
                      • <strong>Mécanisme:</strong> Inhibition COX-1 → ↓ TXA₂
                    </li>
                    <li>
                      • <strong>Pour tous</strong> les patients SCC sauf CI
                    </li>
                  </ul>
                  <div className="mt-3 bg-blue-100 rounded p-2">
                    <p className="text-xs text-blue-900">
                      <strong>Classe I/A</strong> - Traitement de référence
                    </p>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-4 border-2 border-purple-300">
                  <h5 className="font-semibold text-purple-900 mb-2">Clopidogrel (si CI Aspirine)</h5>
                  <ul className="text-sm space-y-1 text-gray-700">
                    <li>
                      • <strong>Dose:</strong> 75 mg/jour
                    </li>
                    <li>
                      • <strong>Mécanisme:</strong> Inhibition récepteur P2Y₁₂
                    </li>
                    <li>• Alternative si intolérance Aspirine</li>
                  </ul>
                  <div className="mt-3 bg-purple-100 rounded p-2">
                    <p className="text-xs text-purple-900">
                      <strong>Classe I/A</strong> - Alternative valide
                    </p>
                  </div>
                </div>
              </div>

              <Accordion type="single" collapsible className="mt-4">
                <AccordionItem value="ci">
                  <AccordionTrigger className="text-sm font-semibold">
                    ⚠️ Contre-indications et Précautions
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="grid md:grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="font-medium text-red-800 mb-1">Aspirine:</p>
                        <ul className="space-y-1 text-red-700">
                          <li>• Allergie documentée</li>
                          <li>• Ulcère gastroduodénal actif</li>
                          <li>• Risque hémorragique majeur</li>
                          <li>• Asthme à l'aspirine (rare)</li>
                        </ul>
                      </div>
                      <div>
                        <p className="font-medium text-red-800 mb-1">Clopidogrel:</p>
                        <ul className="space-y-1 text-red-700">
                          <li>• Hémorragie évolutive</li>
                          <li>• Insuffisance hépatique sévère</li>
                          <li>• Métaboliseurs lents CYP2C19 (efficacité ↓)</li>
                        </ul>
                      </div>
                    </div>
                    <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-3">
                      <p className="text-xs text-amber-900">
                        <Info className="h-3 w-3 inline" /> <strong>IPP recommandé:</strong> Si antécédent d'ulcère ou
                        facteurs de risque hémorragique digestif
                      </p>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>

            {/* Bithérapie antiplaquettaire */}
            <div className="bg-white rounded-lg border-2 border-rose-200 p-5">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center font-bold">
                  2
                </div>
                <h4 className="font-bold text-rose-900">Bithérapie Antiplaquettaire (DAPT)</h4>
                <Badge className="bg-rose-100 text-rose-800">I / A (post-SCA)</Badge>
              </div>

              <div className="space-y-4">
                <div className="bg-gradient-to-r from-rose-50 to-red-50 rounded-lg p-4 border-2 border-rose-300">
                  <div className="flex items-center justify-center gap-3 mb-3">
                    <div className="px-4 py-2 bg-blue-100 rounded-lg font-semibold text-blue-900">
                      Aspirine 75-100 mg/j
                    </div>
                    <div className="text-2xl font-bold text-rose-600">+</div>
                    <div className="px-4 py-2 bg-purple-100 rounded-lg font-semibold text-purple-900">
                      P2Y₁₂ inhibiteur
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-3">
                    <div className="bg-white rounded-lg p-3 border border-purple-200">
                      <h6 className="font-semibold text-purple-900 mb-1">Clopidogrel</h6>
                      <p className="text-xs text-gray-600">75 mg/j</p>
                      <p className="text-xs text-gray-500 mt-1">Option standard</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-red-200">
                      <h6 className="font-semibold text-red-900 mb-1">Prasugrel</h6>
                      <p className="text-xs text-gray-600">
                        10 mg/j (5 mg si {">"}75 ans ou {"<"}60 kg)
                      </p>
                      <p className="text-xs text-gray-500 mt-1">Si haut risque ischémique</p>
                    </div>
                    <div className="bg-white rounded-lg p-3 border border-pink-200">
                      <h6 className="font-semibold text-pink-900 mb-1">Ticagrelor</h6>
                      <p className="text-xs text-gray-600">90 mg x2/j</p>
                      <p className="text-xs text-gray-500 mt-1">Alternative puissante</p>
                    </div>
                  </div>
                </div>

                <Accordion type="single" collapsible>
                  <AccordionItem value="indications">
                    <AccordionTrigger className="text-sm font-semibold">
                      📋 Indications et Durée de la DAPT
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3 text-sm">
                        <div className="bg-green-50 border border-green-200 rounded p-3">
                          <p className="font-semibold text-green-900 mb-2">✅ Post-SCA avec angioplastie (I/A):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>
                              • <strong>Durée standard:</strong> 12 mois
                            </li>
                            <li>
                              • <strong>Courte (1-6 mois):</strong> Si haut risque hémorragique (PRECISE-DAPT ≥25)
                            </li>
                            <li>
                              • <strong>Prolongée ({">"}12 mois):</strong> Si haut risque ischémique + risque
                              hémorragique faible (DAPT Score ≥2)
                            </li>
                          </ul>
                        </div>

                        <div className="bg-blue-50 border border-blue-200 rounded p-3">
                          <p className="font-semibold text-blue-900 mb-2">SCC stable avec angioplastie (IIa/A):</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>
                              • <strong>Durée:</strong> 1-6 mois selon risque hémorragique
                            </li>
                            <li>• Puis retour à monothérapie (Aspirine ou Clopidogrel)</li>
                          </ul>
                        </div>

                        <div className="bg-amber-50 border border-amber-200 rounded p-3">
                          <p className="font-semibold text-amber-900 mb-2">⚠️ Facteurs de décision:</p>
                          <ul className="space-y-1 text-gray-700">
                            <li>• Score PRECISE-DAPT (risque hémorragique)</li>
                            <li>• Score DAPT (bénéfice prolongation)</li>
                            <li>• Anatomie coronaire (tronc commun, multitronculaire)</li>
                            <li>• Comorbidités (diabète, IRC, FEVG)</li>
                          </ul>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="risque">
                    <AccordionTrigger className="text-sm font-semibold">
                      ⚖️ Balance Risque Ischémique / Hémorragique
                    </AccordionTrigger>
                    <AccordionContent>
                      <div className="mb-4 p-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border-2 border-purple-200">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h6 className="font-semibold text-purple-900">Évaluation Personnalisée</h6>
                            <p className="text-xs text-gray-600 mt-1">
                              Utilisez les scores PRECISE-DAPT et DAPT pour guider la durée optimale
                            </p>
                          </div>
                          <CalculetteDAPT />
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div className="bg-red-50 border border-red-200 rounded p-2">
                            <span className="font-semibold text-red-800">PRECISE-DAPT ≥25:</span>
                            <span className="text-red-700"> DAPT courte (3-6 mois)</span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded p-2">
                            <span className="font-semibold text-blue-800">DAPT Score ≥2:</span>
                            <span className="text-blue-700"> DAPT prolongée ({">"}12 mois)</span>
                          </div>
                        </div>
                      </div>

                      <div className="grid md:grid-cols-2 gap-3 text-sm">
                        <div className="bg-red-50 border-2 border-red-300 rounded p-3">
                          <h6 className="font-semibold text-red-900 mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Haut Risque Ischémique
                          </h6>
                          <ul className="space-y-1 text-red-800">
                            <li>• Lésion tronc commun</li>
                            <li>• Anatomie complexe (SYNTAX {">"}22)</li>
                            <li>• Diabète</li>
                            <li>• IRC (ClCr {"<"}60)</li>
                            <li>• SCA récent</li>
                            <li>• Revascularisation incomplète</li>
                          </ul>
                          <div className="mt-2 bg-red-100 rounded p-2">
                            <p className="text-xs font-semibold">
                              → DAPT prolongée ({">"}12 mois) si risque hémorragique acceptable
                            </p>
                          </div>
                        </div>

                        <div className="bg-orange-50 border-2 border-orange-300 rounded p-3">
                          <h6 className="font-semibold text-orange-900 mb-2 flex items-center gap-1">
                            <AlertTriangle className="h-4 w-4" /> Haut Risque Hémorragique
                          </h6>
                          <ul className="space-y-1 text-orange-800">
                            <li>• PRECISE-DAPT ≥25</li>
                            <li>• Âge {">"}75 ans</li>
                            <li>• ATCD hémorragie majeure</li>
                            <li>• Anticoagulation nécessaire</li>
                            <li>• Thrombopénie</li>
                            <li>• IRC sévère</li>
                          </ul>
                          <div className="mt-2 bg-orange-100 rounded p-2">
                            <p className="text-xs font-semibold">→ DAPT courte (1-6 mois) puis monothérapie</p>
                          </div>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </div>

          {/* Anticoagulation */}
          <div className="border-2 border-purple-200 rounded-lg p-6 bg-gradient-to-br from-purple-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <Droplets className="h-8 w-8 text-purple-600" />
              <div>
                <h3 className="text-xl font-bold text-purple-900">Anticoagulation</h3>
                <Badge className="bg-purple-100 text-purple-800 mt-1">Si Indication Spécifique</Badge>
              </div>
            </div>

            <div className="space-y-4">
              {/* FA */}
              <div className="bg-white rounded-lg border-2 border-violet-200 p-4">
                <h4 className="font-semibold text-violet-900 mb-3 flex items-center gap-2">
                  <ArrowRight className="h-5 w-5" /> Fibrillation Atriale (FA)
                  <Badge className="bg-violet-100 text-violet-800">I / A</Badge>
                </h4>

                <div className="grid md:grid-cols-2 gap-3 text-sm">
                  <div className="bg-violet-50 rounded p-3">
                    <h5 className="font-semibold text-violet-900 mb-2">
                      AOD (Anticoagulants Oraux Directs) - 1ère intention
                    </h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>
                        • <strong>Apixaban:</strong> 5 mg x2/j (2,5 mg si ≥2 critères: âge ≥80, poids ≤60 kg, créat ≥133
                        µmol/L)
                      </li>
                      <li>
                        • <strong>Rivaroxaban:</strong> 20 mg/j (15 mg si ClCr 30-49)
                      </li>
                      <li>
                        • <strong>Dabigatran:</strong> 150 mg x2/j (110 mg si âge ≥80 ou risque hémorragique)
                      </li>
                      <li>
                        • <strong>Edoxaban:</strong> 60 mg/j (30 mg si ClCr 30-50, poids ≤60 kg)
                      </li>
                    </ul>
                  </div>

                  <div className="bg-indigo-50 rounded p-3">
                    <h5 className="font-semibold text-indigo-900 mb-2">AVK (si valve mécanique ou IM sévère)</h5>
                    <ul className="space-y-1 text-gray-700">
                      <li>
                        • <strong>Warfarine:</strong> INR cible 2-3
                      </li>
                      <li>• Monitoring régulier INR</li>
                      <li>• Nombreuses interactions médicamenteuses</li>
                    </ul>
                  </div>
                </div>

                <div className="mt-3 bg-amber-50 border border-amber-200 rounded p-3">
                  <p className="text-sm text-amber-900">
                    <strong>Triple thérapie (AOD + Aspirine + Clopidogrel) post-SCA avec FA:</strong>
                    <br />• Durée minimale (1-7 jours selon risque hémorragique)
                    <br />• Puis bithérapie AOD + mono-antiagrégant (1-12 mois)
                    <br />• Puis AOD seul au long cours
                  </p>
                </div>
              </div>

              {/* Autres indications */}
              <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
                <h4 className="font-semibold text-indigo-900 mb-3">Autres Indications d'Anticoagulation</h4>

                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Thrombus VG:</strong> AOD ou AVK pendant 3-6 mois, réévaluation écho
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>Prothèse valvulaire mécanique:</strong> AVK (INR selon type valve)
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <strong>MTEV récente:</strong> Anticoagulation pleine dose (3-6 mois minimum)
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Statines */}
          <div className="border-2 border-amber-200 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full bg-amber-600 text-white flex items-center justify-center text-xl">
                💊
              </div>
              <div>
                <h3 className="text-xl font-bold text-amber-900">Traitement Hypolipémiant</h3>
                <Badge className="bg-amber-100 text-amber-800 mt-1">I / A - Essentiel</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
                <h4 className="font-semibold text-yellow-900 mb-3">Statines Haute Intensité</h4>
                <ul className="text-sm space-y-2 text-gray-700">
                  <li>
                    • <strong>Atorvastatine:</strong> 40-80 mg/j
                  </li>
                  <li>
                    • <strong>Rosuvastatine:</strong> 20-40 mg/j
                  </li>
                </ul>
                <div className="mt-3 bg-green-100 rounded p-2">
                  <p className="text-xs text-green-900">
                    <strong>Objectif LDL-c:</strong> {"<"}1,4 mmol/L ({"<"}0,55 g/L) ET ↓ ≥50% vs baseline
                  </p>
                </div>
              </div>

              <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
                <h4 className="font-semibold text-orange-900 mb-3">Escalade Thérapeutique</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                      1
                    </div>
                    <span>Statine haute intensité</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                      2
                    </div>
                    <span>+ Ézétimibe 10 mg/j</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-orange-600 text-white flex items-center justify-center text-xs font-bold">
                      3
                    </div>
                    <span>+ iPCSK9 (anticorps) si objectif non atteint</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Tableau synthèse */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Synthèse Traitement Antithrombotique</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2 font-semibold">Contexte</th>
                    <th className="text-left p-2 font-semibold">Traitement</th>
                    <th className="text-left p-2 font-semibold">Durée</th>
                    <th className="text-left p-2 font-semibold">Classe</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2">SCC stable sans angioplastie</td>
                    <td className="p-2">Aspirine 75-100 mg/j</td>
                    <td className="p-2">Indéfinie</td>
                    <td className="p-2">
                      <Badge className="bg-blue-100 text-blue-800">I/A</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Post-angioplastie SCC stable</td>
                    <td className="p-2">DAPT 1-6 mois puis mono</td>
                    <td className="p-2">Variable</td>
                    <td className="p-2">
                      <Badge className="bg-blue-100 text-blue-800">IIa/A</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">Post-SCA</td>
                    <td className="p-2">DAPT (Aspirine + P2Y12i)</td>
                    <td className="p-2">12 mois standard</td>
                    <td className="p-2">
                      <Badge className="bg-green-100 text-green-800">I/A</Badge>
                    </td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2">FA + SCC</td>
                    <td className="p-2">AOD + mono-antiagrégant</td>
                    <td className="p-2">Indéfinie</td>
                    <td className="p-2">
                      <Badge className="bg-purple-100 text-purple-800">I/A</Badge>
                    </td>
                  </tr>
                  <tr>
                    <td className="p-2">Tous les patients SCC</td>
                    <td className="p-2">Statine haute intensité</td>
                    <td className="p-2">Indéfinie</td>
                    <td className="p-2">
                      <Badge className="bg-amber-100 text-amber-800">I/A</Badge>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Points clés */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🔑 Points Clés ESC 2024</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Aspirine 75-100 mg/j</strong>: Traitement de référence pour tous les patients SCC (I/A)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>DAPT post-SCA:</strong> 12 mois standard, modulable selon scores PRECISE-DAPT et DAPT
                </span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Triple thérapie (AOD + DAPT):</strong> Durée minimale, transition rapide vers bithérapie
                </span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Statines haute intensité:</strong> Objectif LDL-c {"<"}1,4 mmol/L pour tous (I/A)
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-5 w-5 text-purple-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>AOD {">"} AVK:</strong> Préférer les AOD en 1ère intention si FA (sauf valve mécanique)
                </span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArbreAntithrombotique
