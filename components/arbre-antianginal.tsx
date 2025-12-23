"use client"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Heart, ArrowDown, AlertTriangle, CheckCircle2, Info } from "lucide-react"

export function ArbreAntianginal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2 border-green-300 text-green-700 hover:bg-green-50 bg-transparent">
          <Heart className="h-4 w-4" />
          Arbre Décisionnel
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-green-900">
            Arbre Décisionnel Traitement Anti-Angineux
          </DialogTitle>
          <p className="text-sm text-gray-600">Approche progressive et individualisée selon ESC 2024</p>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Étape 1 */}
          <div className="border-2 border-green-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                1
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900">Monothérapie de Première Ligne</h3>
                <Badge className="bg-green-100 text-green-800 mt-1">I / B</Badge>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Bêta-Bloquants */}
              <div className="bg-white rounded-lg border-2 border-blue-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-blue-600" />
                  <h4 className="font-bold text-blue-900">Bêta-Bloquants</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">↓ FC + ↓ Contractilité → ↓ Consommation O₂</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="molecules">
                    <AccordionTrigger className="text-sm">Molécules</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Bisoprolol</strong> 5-10 mg/j (1 prise)
                        </li>
                        <li>
                          <strong>Métoprolol</strong> 50-200 mg/j (1-2 prises)
                        </li>
                        <li>
                          <strong>Nébivolol</strong> 5-10 mg/j (1 prise)
                        </li>
                        <li>
                          <strong>Carvédilol</strong> 25-50 mg/j (2 prises)
                        </li>
                      </ul>
                      <p className="mt-2 text-sm font-medium">Objectif FC: 55-60 bpm au repos</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="ci">
                    <AccordionTrigger className="text-sm">⚠️ Contre-indications</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 text-sm text-red-700">
                        <li>• BAV II-III non appareillé</li>
                        <li>• Bradycardie {"<"}50 bpm</li>
                        <li>• Asthme sévère</li>
                        <li>• Maladie du sinus</li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              {/* Inhibiteurs Calciques */}
              <div className="bg-white rounded-lg border-2 border-purple-200 p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Heart className="h-5 w-5 text-purple-600" />
                  <h4 className="font-bold text-purple-900">Inhibiteurs Calciques</h4>
                </div>
                <p className="text-sm text-gray-600 mb-3">Vasodilatation coronaire + ↓ Post-charge</p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="dhp">
                    <AccordionTrigger className="text-sm">DHP (dihydropyridines)</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Amlodipine</strong> 5-10 mg/j
                        </li>
                        <li>
                          <strong>Félodipine</strong> 5-10 mg/j
                        </li>
                        <li>
                          <strong>Lercanidipine</strong> 10-20 mg/j
                        </li>
                      </ul>
                      <p className="mt-2 text-xs text-gray-600">Préférer si bradycardie ou BB contre-indiqués</p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="nondhp">
                    <AccordionTrigger className="text-sm">Non-DHP</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2 text-sm">
                        <li>
                          <strong>Diltiazem</strong> 180-360 mg/j
                        </li>
                        <li>
                          <strong>Vérapamil</strong> 120-480 mg/j
                        </li>
                      </ul>
                      <div className="bg-red-50 border border-red-200 rounded p-2 mt-2">
                        <p className="text-xs text-red-700">⚠️ NE PAS associer avec BB (risque BAV/bradycardie)</p>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong>Évaluation à 2-4 semaines:</strong> Si angor persiste → Passer à l'Étape 2
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div className="flex flex-col items-center text-gray-500">
            <ArrowDown className="h-6 w-6" />
            <span className="text-sm font-medium">Si angor persistant</span>
          </div>

          {/* Étape 2 */}
          <div className="border-2 border-green-200 rounded-lg p-6 bg-gradient-to-br from-green-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-lg">
                2
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-green-900">Bithérapie: BB + IC</h3>
                <Badge className="bg-green-100 text-green-800 mt-1">I / B</Badge>
              </div>
            </div>

            <div className="bg-white rounded-lg border-2 border-indigo-200 p-4">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="px-4 py-2 bg-blue-100 rounded-lg font-semibold text-blue-900">Bêta-Bloquant</div>
                <div className="text-2xl font-bold text-indigo-600">+</div>
                <div className="px-4 py-2 bg-purple-100 rounded-lg font-semibold text-purple-900">IC DHP</div>
              </div>

              <div className="space-y-2 text-sm">
                <h5 className="font-semibold text-gray-800">Associations validées:</h5>
                <div className="grid md:grid-cols-3 gap-2">
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded border">
                    <p>
                      <strong>Bisoprolol</strong> 5-10 mg + <strong>Amlodipine</strong> 5-10 mg
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded border">
                    <p>
                      <strong>Métoprolol</strong> 50-200 mg + <strong>Félodipine</strong> 5-10 mg
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-3 rounded border">
                    <p>
                      <strong>Nébivolol</strong> 5-10 mg + <strong>Lercanidipine</strong> 10-20 mg
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-4 bg-red-50 border-2 border-red-300 rounded-lg p-3 flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong>ATTENTION:</strong> NE JAMAIS associer BB + IC non-DHP (diltiazem/vérapamil)
                  <br />→ Risque de bradycardie sévère et BAV
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong>Réévaluation à 2-4 semaines:</strong> Si angor persiste → Passer à l'Étape 3
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div className="flex flex-col items-center text-gray-500">
            <ArrowDown className="h-6 w-6" />
            <span className="text-sm font-medium">Si angor réfractaire</span>
          </div>

          {/* Étape 3 */}
          <div className="border-2 border-orange-200 rounded-lg p-6 bg-gradient-to-br from-orange-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-orange-500 text-white flex items-center justify-center font-bold text-lg">
                3
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-orange-900">Trithérapie: Ajout 3ème Ligne</h3>
                <Badge className="bg-orange-100 text-orange-800 mt-1">IIa / B</Badge>
              </div>
            </div>

            <p className="text-sm font-medium mb-4">Base: BB + IC DHP (doses maximales tolérées)</p>

            <div className="grid md:grid-cols-3 gap-3">
              {/* Nitrés LA */}
              <div className="bg-white rounded-lg border-2 border-emerald-200 p-4">
                <Badge className="bg-emerald-100 text-emerald-800 mb-2">IIa/B</Badge>
                <h5 className="font-semibold text-emerald-900 mb-2">Dérivés Nitrés LA</h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Isosorbide mononitrate 40-120 mg/j</li>
                  <li>• Isosorbide dinitrate 40-160 mg/j</li>
                </ul>
                <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
                  <p className="text-xs text-amber-800">
                    <Info className="h-3 w-3 inline" /> Fenêtre 10-14h sans nitré/jour
                  </p>
                </div>
              </div>

              {/* Ranolazine */}
              <div className="bg-white rounded-lg border-2 border-teal-200 p-4">
                <Badge className="bg-teal-100 text-teal-800 mb-2">IIa/B</Badge>
                <h5 className="font-semibold text-teal-900 mb-2">Ranolazine(Ranexa°)(Non commercialisé en France) </h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 375-750 mg x2/j</li>
                  <li>• Débuter 375 mg x2/j</li>
                </ul>
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
                  <p className="text-xs text-blue-800">
                    <CheckCircle2 className="h-3 w-3 inline" /> Pas d'effet hémodynamique
                  </p>
                </div>
              </div>

              {/* Ivabradine */}
              <div className="bg-white rounded-lg border-2 border-violet-200 p-4">
                <Badge className="bg-violet-100 text-violet-800 mb-2">IIa/B</Badge>
                <h5 className="font-semibold text-violet-900 mb-2">Ivabradine</h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 2,5-7,5 mg x2/j</li>
                  <li>• ↓ FC pure (canal If)</li>
                </ul>
                <div className="mt-2 bg-amber-50 border border-amber-200 rounded p-2">
                  <p className="text-xs text-amber-800 font-semibold">
                    ⭐ UNIQUEMENT si FEVG {"<"}40% + rythme sinusal + FC ≥70 bpm
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm">
                <strong>Réévaluation à 4-6 semaines:</strong> Si angor persiste → Étape 4 ou revascularisation
              </div>
            </div>
          </div>

          {/* Flèche */}
          <div className="flex flex-col items-center text-gray-500">
            <ArrowDown className="h-6 w-6" />
            <span className="text-sm font-medium">Si angor réfractaire persistant</span>
          </div>

          {/* Étape 4 */}
          <div className="border-2 border-amber-200 rounded-lg p-6 bg-gradient-to-br from-amber-50 to-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full bg-amber-600 text-white flex items-center justify-center font-bold text-lg">
                4
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-amber-900">Quadrithérapie: Ajout 4ème Ligne</h3>
                <Badge className="bg-amber-100 text-amber-800 mt-1">IIb / B</Badge>
              </div>
            </div>

            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-red-800">
                  <strong>Avant d'ajouter un 4ème médicament:</strong>
                  <ul className="mt-2 space-y-1 list-disc list-inside">
                    <li>Vérifier doses maximales tolérées</li>
                    <li>Confirmer observance thérapeutique</li>
                    <li>Réévaluer coronarographie (progression?)</li>
                    <li>Considérer ANOCA/INOCA</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {/* Nicorandil */}
              <div className="bg-white rounded-lg border-2 border-orange-200 p-4">
                <Badge className="bg-orange-100 text-orange-800 mb-2">IIb/B ↓</Badge>
                <h5 className="font-semibold text-orange-900 mb-2">Nicorandil</h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 10-30 mg x2/j</li>
                  <li>• Activateur canaux K⁺-ATP + donneur NO</li>
                </ul>
                <div className="mt-2 bg-red-50 border border-red-200 rounded p-2">
                  <p className="text-xs text-red-800">⚠️ EI: Ulcérations (rares mais graves)</p>
                </div>
              </div>

              {/* Trimétazidine */}
              <div className="bg-white rounded-lg border-2 border-yellow-200 p-4">
                <Badge className="bg-yellow-100 text-yellow-800 mb-2">IIb/B ↓</Badge>
                <h5 className="font-semibold text-yellow-900 mb-2">Trimétazidine</h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• 35 mg x2/j (MR) ou 20 mg x3/j</li>
                  <li>• Modulateur métabolique</li>
                </ul>
                <div className="mt-2 bg-blue-50 border border-blue-200 rounded p-2">
                  <p className="text-xs text-blue-800">
                    <CheckCircle2 className="h-3 w-3 inline" /> Pas d'effet hémodynamique
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-amber-50 border border-amber-300 rounded-lg p-3">
              <p className="text-sm text-amber-900">
                <strong>Note ESC 2024:</strong> Nicorandil et trimétazidine rétrogradés de IIa à IIb (données
                d'efficacité moins robustes)
              </p>
            </div>
          </div>

          {/* Nitrés à la demande */}
          <div className="bg-gradient-to-br from-green-100 to-emerald-100 border-2 border-green-300 rounded-lg p-6">
            <h3 className="text-lg font-bold text-green-900 mb-3 flex items-center gap-2">
              💊 Dérivés Nitrés Sublinguaux À la Demande
              <Badge className="bg-green-600 text-white">I / C</Badge>
            </h3>
            <p className="text-sm font-medium text-green-800 mb-3">
              Pour TOUS les patients en complément du traitement de fond
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-white rounded-lg p-4">
                <h5 className="font-semibold text-green-900 mb-2">Trinitrine (TNT) Sublinguale</h5>
                <ul className="text-sm space-y-1 text-gray-700">
                  <li>• Spray: 0,4 mg (1-2 pulvérisations)</li>
                  <li>• Comprimé: 0,3-0,6 mg</li>
                  <li>• Action: 1-3 minutes, durée 30 min</li>
                  <li>• Usage: 5 min avant effort OU dès douleur</li>
                </ul>
              </div>

              <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4">
                <h5 className="font-semibold text-red-900 mb-2">⚠️ Éducation Patient</h5>
                <ul className="text-sm space-y-1 text-red-800">
                  <li>• Toujours avoir sur soi</li>
                  <li>• Renouveler tous les 6 mois</li>
                  <li>
                    • <strong>S'asseoir avant prise</strong>
                  </li>
                  <li>
                    • Si 3 prises/15 min sans effet → <strong>Appel 15</strong>
                  </li>
                  <li>
                    • <strong>NE JAMAIS</strong> si IPE5 dans les 24-48h
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Tableau récapitulatif */}
          <div className="bg-white rounded-lg border-2 border-gray-200 p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4">📊 Tableau Récapitulatif</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b-2 border-gray-300">
                    <th className="text-left p-2 font-semibold">Étape</th>
                    <th className="text-left p-2 font-semibold">Traitement</th>
                    <th className="text-left p-2 font-semibold">Classe/Niveau</th>
                    <th className="text-left p-2 font-semibold">Évaluation</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="p-2 font-bold">1</td>
                    <td className="p-2">
                      BB <strong>OU</strong> IC (DHP ou non-DHP)
                    </td>
                    <td className="p-2">
                      <Badge className="bg-green-100 text-green-800">I/B</Badge>
                    </td>
                    <td className="p-2">2-4 semaines</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-bold">2</td>
                    <td className="p-2">
                      BB + IC <strong>DHP</strong>
                    </td>
                    <td className="p-2">
                      <Badge className="bg-green-100 text-green-800">I/B</Badge>
                    </td>
                    <td className="p-2">2-4 semaines</td>
                  </tr>
                  <tr className="border-b">
                    <td className="p-2 font-bold">3</td>
                    <td className="p-2">
                      BB + IC DHP + (Nitrés LA <strong>OU</strong> Ranolazine <strong>OU</strong> Ivabradine*)
                    </td>
                    <td className="p-2">
                      <Badge className="bg-orange-100 text-orange-800">IIa/B</Badge>
                    </td>
                    <td className="p-2">4-6 semaines</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-bold">4</td>
                    <td className="p-2">
                      Étape 3 + (Nicorandil <strong>OU</strong> Trimétazidine)
                    </td>
                    <td className="p-2">
                      <Badge className="bg-amber-100 text-amber-800">IIb/B</Badge>
                    </td>
                    <td className="p-2">4-6 semaines</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-gray-600 mt-3">
              * Ivabradine uniquement si FEVG {"<"}40% + rythme sinusal + FC ≥70 bpm
            </p>
          </div>

          {/* Points clés */}
          <div className="bg-blue-50 rounded-lg border-2 border-blue-200 p-6">
            <h3 className="text-lg font-bold text-blue-900 mb-3">🔑 Points Clés ESC 2024</h3>
            <ul className="space-y-2 text-sm text-gray-800">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                <span>Stratégie personnalisée selon tolérance, comorbidités, réponse</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>JAMAIS BB + IC non-DHP</strong>: Risque bradycardie sévère et BAV
                </span>
              </li>
              <li className="flex items-start gap-2">
                <Info className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>Fenêtre thérapeutique nitrés: 10-14h sans nitré/jour obligatoire</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                <span>Nitrés sublinguaux: À TOUS LES STADES (I/C)</span>
              </li>
              <li className="flex items-start gap-2">
                <AlertTriangle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
                <span>Angor réfractaire: Réévaluer revascularisation + ANOCA/INOCA</span>
              </li>
            </ul>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default ArbreAntianginal
