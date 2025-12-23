"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Brain, AlertTriangle } from "lucide-react"

type LifestyleCategory = "tobacco" | "weight" | "diet" | "mental" | "physical" | "lipid"

interface PopupLifestyleProps {
  category: LifestyleCategory
  trigger: React.ReactNode
}

export function PopupLifestyle({ category, trigger }: PopupLifestyleProps) {
  const [open, setOpen] = useState(false)

  const getContent = () => {
    switch (category) {
      case "tobacco":
        return <TobaccoContent />
      case "weight":
        return <WeightContent />
      case "diet":
        return <DietContent />
      case "mental":
        return <MentalHealthContent />
      case "physical":
        return <PhysicalActivityContent />
      case "lipid":
        return <LipidControlContent />
      default:
        return null
    }
  }

  const getTitle = () => {
    const titles = {
      tobacco: "🚭 Sevrage Tabagique",
      weight: "⚖️ Gestion du Poids",
      diet: "🥗 Régime Alimentaire",
      mental: "🧠 Santé Mentale",
      physical: "🏃 Activité Physique",
      lipid: "💊 Contrôle Lipidique",
    }
    return titles[category]
  }

  return (
    <>
      <div onClick={() => setOpen(true)} className="cursor-pointer">
        {trigger}
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold">{getTitle()}</DialogTitle>
          </DialogHeader>
          {getContent()}
        </DialogContent>
      </Dialog>
    </>
  )
}

// Tobacco Content
function TobaccoContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau A</p>
        <p className="text-blue-800">
          Le sevrage tabagique est LA mesure la plus efficace pour réduire le risque cardiovasculaire
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">📊 Impact du Sevrage</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">50%</p>
            <p className="text-sm">Réduction risque à 1 an</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">15 ans</p>
            <p className="text-sm">Risque = non-fumeur</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-2xl font-bold text-green-600">2-3x</p>
            <p className="text-sm">Risque SCA si fumeur</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">💊 Stratégies Thérapeutiques</h3>

        <div className="bg-white border-2 border-indigo-200 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">1. Substituts Nicotiniques (Classe I/A)</h4>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>
              <strong>Patchs 16-24h:</strong> 21mg/24h → dégressif sur 8-12 semaines
            </li>
            <li>
              <strong>Formes orales:</strong> Gommes 2-4mg, pastilles, spray (à la demande)
            </li>
            <li>
              <strong>Association possible:</strong> Patch + forme orale si forte dépendance
            </li>
            <li>
              <strong>Efficacité:</strong> ↑ 50-70% chances sevrage vs placebo
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-indigo-200 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">2. Varénicline (Champix®) - Classe I/A</h4>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>
              <strong>Mécanisme:</strong> Agoniste partiel récepteurs nicotiniques α4β2
            </li>
            <li>
              <strong>Posologie:</strong> 0,5mg x1/j (J1-3) → 0,5mg x2/j (J4-7) → 1mg x2/j (12 sem)
            </li>
            <li>
              <strong>Efficacité:</strong> ↑ 2-3x chances sevrage (meilleur que substituts)
            </li>
            <li>
              <strong>Sûreté CV:</strong> Rassurante, pas d'augmentation événements CV (études récentes)
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-indigo-200 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">3. Bupropion (Zyban®) - Classe IIa/B</h4>
          <ul className="space-y-2 text-sm list-disc pl-5">
            <li>
              <strong>Posologie:</strong> 150mg x1/j (7j) → 150mg x2/j (7-12 sem)
            </li>
            <li>
              <strong>Contre-indications:</strong> Épilepsie, troubles bipolaires, TCA
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-semibold text-amber-900 mb-2">⚠️ Cigarette Électronique</h4>
        <p className="text-sm text-amber-800">
          Position ESC 2024: Peut aider transition vers sevrage complet mais objectif = arrêt total nicotine. Toxicité
          CV moindre que tabac mais non nulle.
        </p>
      </div>
    </div>
  )
}

// Weight Management Content
function WeightContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau B</p>
        <p className="text-blue-800">Perte de poids 5-10% améliore tous les FDRCV</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-bold">🎯 Objectifs</h3>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="bg-green-50 p-4 rounded-lg border-2 border-green-200">
            <h4 className="font-semibold text-green-900">IMC Cible</h4>
            <p className="text-2xl font-bold text-green-600">20-25 kg/m²</p>
            <p className="text-sm text-green-700 mt-2">
              Tour de taille: {"<"}94cm (H) / {"<"}80cm (F)
            </p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-200">
            <h4 className="font-semibold text-blue-900">Perte Progressive</h4>
            <p className="text-2xl font-bold text-blue-600">0,5-1 kg/sem</p>
            <p className="text-sm text-blue-700 mt-2">Objectif réaliste: -5 à -10% en 6 mois</p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">💊 GLP-1 Agonistes (Nouvelle Option 2024)</h3>

        <div className="bg-purple-50 border-2 border-purple-300 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Sémaglutide (Wegovy®) - Classe IIa/B</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Indications:</strong> IMC ≥27 + FDRCV ou IMC ≥30
            </p>
            <p>
              <strong>Étude SELECT (2023):</strong> ↓ 20% MACE chez patients obèses sans diabète
            </p>
            <p>
              <strong>Posologie:</strong> 0,25mg SC/sem → escalade progressive → 2,4mg/sem
            </p>
            <p>
              <strong>Perte poids:</strong> -15% en moyenne à 68 semaines
            </p>
            <p>
              <strong>Effets secondaires:</strong> Nausées initiales, risque pancréatite
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">🔪 Chirurgie Bariatrique</h3>
        <div className="bg-white border-2 border-gray-300 p-4 rounded-lg">
          <p className="text-sm mb-3">
            <strong>Indications (Classe IIa/B):</strong>
          </p>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>IMC ≥40 ou IMC ≥35 + comorbidités</li>
            <li>Échec mesures diététiques bien conduites</li>
            <li>Évaluation pluridisciplinaire</li>
          </ul>
          <p className="text-sm mt-3">
            <strong>Bénéfices CV:</strong> ↓ 30-40% mortalité CV long terme, amélioration diabète, HTA, dyslipidémie
          </p>
        </div>
      </div>
    </div>
  )
}

// Diet Content
function DietContent() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null)

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau A</p>
        <p className="text-blue-800">Régime méditerranéen recommandé pour TOUS les patients SCC</p>
      </div>

      <div className="bg-green-50 p-4 rounded-lg">
        <h3 className="text-lg font-bold mb-2">🏅 Étude PREDIMED (2013)</h3>
        <div className="grid md:grid-cols-3 gap-3 text-sm">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">-30%</p>
            <p>Événements CV</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">-39%</p>
            <p>AVC</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">-29%</p>
            <p>Diabète</p>
          </div>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-green-100 p-4 rounded-lg border-2 border-green-400">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-green-900">✅ QUOTIDIEN</h4>
            <Badge className="bg-green-600">Abondant</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Fruits & Légumes:</strong> ≥5 portions/jour (400-500g)
            </li>
            <li>
              <strong>Céréales Complètes:</strong> Pain complet, pâtes, riz
            </li>
            <li>
              <strong>Huile d'Olive:</strong> 3-4 c. à soupe/jour
            </li>
            <li>
              <strong>Noix:</strong> 30g/jour (1 poignée)
            </li>
            <li>
              <strong>Légumineuses:</strong> 3-4x/semaine
            </li>
          </ul>
        </div>

        <div className="bg-blue-100 p-4 rounded-lg border-2 border-blue-400">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-blue-900">🐟 MODÉRÉ</h4>
            <Badge className="bg-blue-600">Plusieurs/semaine</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Poissons:</strong> ≥2 portions/sem (gras: saumon, maquereau)
            </li>
            <li>
              <strong>Volaille:</strong> 2-3 portions/sem
            </li>
            <li>
              <strong>Œufs:</strong> 3-4/semaine
            </li>
            <li>
              <strong>Produits Laitiers:</strong> 2-3/jour (yaourt, fromage blanc)
            </li>
          </ul>
        </div>

        <div className="bg-orange-100 p-4 rounded-lg border-2 border-orange-400">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-orange-900">🥩 LIMITÉ</h4>
            <Badge className="bg-orange-600">≤1-2x/semaine</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Viandes Rouges:</strong> Max 1-2 portions/sem (70-100g)
            </li>
            <li>
              <strong>Charcuterie:</strong> Très occasionnel
            </li>
          </ul>
        </div>

        <div className="bg-red-100 p-4 rounded-lg border-2 border-red-400">
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-bold text-red-900">❌ À ÉVITER</h4>
            <Badge className="bg-red-600">Limiter/Supprimer</Badge>
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <strong>Sucres Ajoutés:</strong> Sodas, pâtisseries
            </li>
            <li>
              <strong>Ultra-Transformés:</strong> Plats préparés industriels
            </li>
            <li>
              <strong>Sel:</strong> {"<"}5g/jour
            </li>
            <li>
              <strong>Graisses Saturées:</strong> Beurre, crème
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-semibold text-amber-900 mb-2">🍷 Alcool - ESC 2024</h4>
        <p className="text-sm text-amber-800">
          Consommation modérée acceptable: ≤2 verres/jour (H) ou ≤1 verre/jour (F). Abstinence complète préférable.
        </p>
      </div>
    </div>
  )
}

// Mental Health Content with PHQ-9 Calculator
function MentalHealthContent() {
  const [showPHQ9, setShowPHQ9] = useState(false)
  const [phq9Scores, setPHQ9Scores] = useState<number[]>(Array(9).fill(-1))
  const [phq9Result, setPHQ9Result] = useState<number | null>(null)

  const phq9Questions = [
    "Peu d'intérêt ou de plaisir à faire les choses",
    "Se sentir triste, déprimé(e) ou désespéré(e)",
    "Difficultés à s'endormir, sommeil interrompu ou sommeil excessif",
    "Se sentir fatigué(e) ou avoir peu d'énergie",
    "Peu ou pas d'appétit ou manger trop",
    "Mauvaise opinion de soi, sentiment d'échec ou d'avoir déçu sa famille",
    "Difficultés à se concentrer (lire, regarder la télévision)",
    "Mouvements ou paroles ralenties ou au contraire agitation/nervosité",
    "Pensées qu'il vaudrait mieux mourir ou se faire du mal",
  ]

  const calculatePHQ9 = () => {
    if (phq9Scores.some((s) => s === -1)) {
      alert("Veuillez répondre à toutes les questions")
      return
    }
    const total = phq9Scores.reduce((sum, score) => sum + score, 0)
    setPHQ9Result(total)
  }

  const getPHQ9Interpretation = (score: number) => {
    if (score <= 4)
      return { level: "Symptômes minimes", color: "green", recommendation: "Pas de traitement nécessaire" }
    if (score <= 9)
      return { level: "Dépression légère", color: "yellow", recommendation: "Suivi clinique, envisager psychothérapie" }
    if (score <= 14)
      return {
        level: "Dépression modérée",
        color: "orange",
        recommendation: "Psychothérapie ± ISRS recommandés (Classe IIa)",
      }
    if (score <= 19)
      return {
        level: "Dépression modérément sévère",
        color: "red",
        recommendation: "ISRS + Psychothérapie recommandés (Classe I)",
      }
    return { level: "Dépression sévère", color: "red", recommendation: "Prise en charge psychiatrique URGENTE" }
  }

  if (showPHQ9) {
    return (
      <div className="space-y-6">
        <Button onClick={() => setShowPHQ9(false)} variant="outline">
          ← Retour
        </Button>

        <div className="bg-purple-50 border-l-4 border-purple-600 p-4 rounded">
          <h3 className="font-bold text-purple-900 mb-2">Calculateur PHQ-9 (Patient Health Questionnaire-9)</h3>
          <p className="text-sm text-purple-800">
            Au cours des 2 dernières semaines, à quelle fréquence avez-vous été dérangé(e) par les problèmes suivants ?
          </p>
        </div>

        <div className="space-y-4">
          {phq9Questions.map((question, index) => (
            <div
              key={index}
              className={`p-4 rounded-lg border-2 ${index === 8 ? "bg-red-50 border-red-400" : "bg-white border-gray-200"}`}
            >
              <p className="font-semibold mb-3 text-sm">
                {index + 1}. {question}
              </p>
              <div className="grid grid-cols-4 gap-2">
                {[
                  "Jamais (0)",
                  "Plusieurs jours (1)",
                  "Plus de la moitié du temps (2)",
                  "Presque tous les jours (3)",
                ].map((option, scoreValue) => (
                  <button
                    key={scoreValue}
                    onClick={() => {
                      const newScores = [...phq9Scores]
                      newScores[index] = scoreValue
                      setPHQ9Scores(newScores)
                    }}
                    className={`p-2 text-xs rounded border-2 transition-colors ${
                      phq9Scores[index] === scoreValue
                        ? "bg-purple-600 text-white border-purple-600"
                        : "bg-white text-gray-700 border-gray-300 hover:border-purple-400"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
              {index === 8 && phq9Scores[8] > 0 && (
                <div className="mt-3 bg-red-100 border-l-4 border-red-600 p-3 rounded">
                  <p className="text-sm font-semibold text-red-900 flex items-center gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    ALERTE: Idées suicidaires détectées
                  </p>
                  <p className="text-xs text-red-800 mt-1">Évaluation psychiatrique URGENTE requise</p>
                  <p className="text-xs text-red-800 mt-1">Numéros d'urgence: SAMU 15 | Prévention Suicide 3114</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <Button onClick={calculatePHQ9} className="w-full bg-purple-600 hover:bg-purple-700">
          Calculer le Score PHQ-9
        </Button>

        {phq9Result !== null && (
          <div
            className={`p-6 rounded-lg border-4 ${
              phq9Result <= 4
                ? "bg-green-50 border-green-500"
                : phq9Result <= 9
                  ? "bg-yellow-50 border-yellow-500"
                  : phq9Result <= 14
                    ? "bg-orange-50 border-orange-500"
                    : "bg-red-50 border-red-500"
            }`}
          >
            <h3 className="text-2xl font-bold mb-2">Score PHQ-9: {phq9Result}/27</h3>
            <p className="text-lg font-semibold mb-2">{getPHQ9Interpretation(phq9Result).level}</p>
            <p className="text-sm">
              <strong>Recommandation ESC 2024:</strong> {getPHQ9Interpretation(phq9Result).recommendation}
            </p>
          </div>
        )}
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau B</p>
        <p className="text-blue-800">Dépistage systématique dépression/anxiété recommandé à chaque consultation</p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
          <h4 className="font-bold text-red-900 mb-2">📊 Prévalence</h4>
          <p className="text-3xl font-bold text-red-600">40-50%</p>
          <p className="text-sm text-red-800">des patients SCC souffrent de dépression ou anxiété</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg border-2 border-red-300">
          <h4 className="font-bold text-red-900 mb-2">⚠️ Impact</h4>
          <p className="text-3xl font-bold text-red-600">x2-3</p>
          <p className="text-sm text-red-800">Risque événements CV et mortalité</p>
        </div>
      </div>

      <Button onClick={() => setShowPHQ9(true)} className="w-full bg-purple-600 hover:bg-purple-700">
        <Brain className="h-5 w-5 mr-2" />
        Calculer le Score PHQ-9 (Dépression)
      </Button>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">💊 Prise en Charge</h3>

        <div className="bg-white border-2 border-blue-300 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Psychothérapie (Classe I/B)</h4>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>
              <strong>TCC (Thérapie Cognitivo-Comportementale):</strong> 12-16 séances
            </li>
            <li>
              <strong>Mindfulness / Relaxation:</strong> Réduction stress, anxiété
            </li>
            <li>
              <strong>Réadaptation cardiaque:</strong> Bénéfice psychologique important
            </li>
          </ul>
        </div>

        <div className="bg-white border-2 border-blue-300 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">ISRS (Classe IIa/B si modérée-sévère)</h4>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>
              <strong>Sertraline:</strong> 50-200mg/jour (meilleur profil sûreté CV)
            </li>
            <li>
              <strong>Citalopram:</strong> 20-40mg/jour
            </li>
            <li>
              <strong>Éviter:</strong> Tricycliques (risque arythmie)
            </li>
            <li>
              <strong>Surveillance:</strong> Risque hémorragie si AVK/AOD (prudence)
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-semibold text-amber-900 mb-2">🔍 Dépistage Systématique</h4>
        <p className="text-sm text-amber-800">
          Utiliser PHQ-9 (dépression) et/ou GAD-7 (anxiété) à chaque consultation de suivi. Score ≥10 = traitement
          recommandé.
        </p>
      </div>
    </div>
  )
}

// Physical Activity Content
function PhysicalActivityContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau A</p>
        <p className="text-blue-800">Activité physique régulière fortement recommandée pour TOUS</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-600">-26%</p>
          <p className="text-sm">Mortalité CV</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-600">-18%</p>
          <p className="text-sm">Hospitalisations</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg text-center">
          <p className="text-3xl font-bold text-green-600">+QdV</p>
          <p className="text-sm">Qualité de vie</p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">🎯 Recommandations ESC 2024</h3>

        <div className="bg-indigo-50 border-2 border-indigo-400 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">Objectif Hebdomadaire (Classe I/A)</h4>
          <div className="space-y-2 text-sm">
            <p>
              <strong>≥150 min/semaine</strong> activité modérée (marche rapide, vélo plat)
            </p>
            <p>
              OU <strong>≥75 min/semaine</strong> activité intense (jogging, vélo côte)
            </p>
            <p>
              OU <strong>Combinaison</strong> équivalente
            </p>
            <p className="text-xs text-indigo-700 mt-2">Répartir sur ≥3-5 jours/semaine, séances ≥10 minutes</p>
          </div>
        </div>

        <div className="bg-purple-50 border-2 border-purple-400 p-4 rounded-lg">
          <h4 className="font-semibold mb-2">+ Renforcement Musculaire</h4>
          <p className="text-sm">
            <strong>2 séances/semaine</strong> (poids, élastiques, poids du corps)
          </p>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">🏥 Réadaptation Cardiaque (Classe I/A)</h3>
        <div className="bg-teal-50 border-2 border-teal-400 p-4 rounded-lg">
          <p className="text-sm mb-2">
            <strong>Fortement recommandée</strong> après SCA ou revascularisation
          </p>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>Programme supervisé 12 semaines (36 séances)</li>
            <li>Exercice aérobie progressif + renforcement</li>
            <li>Éducation thérapeutique</li>
            <li>Soutien psychologique</li>
            <li>
              <strong>Bénéfice:</strong> ↓ 26% mortalité CV, ↓ réhospitalisations
            </li>
          </ul>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">💓 Intensité & Fréquence Cardiaque</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white border-2 border-gray-300 p-3 rounded-lg">
            <h5 className="font-semibold text-sm mb-2">FC Cible (Méthode Karvonen)</h5>
            <p className="text-xs">FC entraînement = FC repos + (0,6-0,8) × (FC max - FC repos)</p>
            <p className="text-xs text-gray-600 mt-1">FC max = 220 - âge (ou mieux: épreuve d'effort)</p>
          </div>
          <div className="bg-white border-2 border-gray-300 p-3 rounded-lg">
            <h5 className="font-semibold text-sm mb-2">Échelle Borg (Perception Effort)</h5>
            <p className="text-xs">
              <strong>Cible: 12-14/20</strong> ("un peu difficile")
            </p>
            <p className="text-xs text-gray-600 mt-1">Doit pouvoir parler pendant l'effort</p>
          </div>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-semibold text-amber-900 mb-2">⚠️ Précautions</h4>
        <ul className="space-y-1 text-sm text-amber-800 list-disc pl-5">
          <li>Éviter efforts intenses si angor instable ou FEVG très basse non contrôlée</li>
          <li>Arrêt si douleur thoracique, dyspnée excessive, vertiges</li>
          <li>Épreuve d'effort avant programme si doute capacité fonctionnelle</li>
        </ul>
      </div>
    </div>
  )
}

// Lipid Control Content
function LipidControlContent() {
  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
        <p className="font-semibold text-blue-900">Classe I / Niveau A</p>
        <p className="text-blue-800">Contrôle lipidique optimal ESSENTIEL dans le SCC</p>
      </div>

      <div className="bg-red-50 border-2 border-red-400 p-4 rounded-lg">
        <h3 className="text-lg font-bold text-red-900 mb-2">🎯 Objectif Principal (I/A)</h3>
        <div className="grid md:grid-cols-2 gap-3">
          <div className="bg-white p-3 rounded text-center">
            <p className="text-3xl font-bold text-red-600">{"<"}0,55 g/L</p>
            <p className="text-sm">LDL-Cholestérol</p>
          </div>
          <div className="bg-white p-3 rounded text-center">
            <p className="text-3xl font-bold text-red-600">≥50%</p>
            <p className="text-sm">Réduction LDL-c</p>
          </div>
        </div>
        <p className="text-sm text-red-800 mt-2 font-semibold">Les DEUX critères doivent être atteints</p>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">📋 Stratégie Séquentielle en 4 Étapes</h3>

        <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-2 border-blue-400 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-blue-600">Étape 1</Badge>
            <h4 className="font-semibold">Statine Haute Intensité (I/A)</h4>
          </div>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>
              <strong>Atorvastatine:</strong> 40-80 mg/jour (↓ LDL-c 48-55%)
            </li>
            <li>
              <strong>Rosuvastatine:</strong> 20-40 mg/jour (↓ LDL-c 52-63%)
            </li>
            <li>Débuter DÈS le diagnostic, sans attendre bilan lipidique</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-400 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-green-600">Étape 2</Badge>
            <h4 className="font-semibold">+ Ézétimibe (I/B)</h4>
          </div>
          <ul className="space-y-1 text-sm list-disc pl-5">
            <li>
              <strong>Posologie:</strong> 10 mg/jour
            </li>
            <li>
              <strong>Efficacité:</strong> ↓ LDL-c additionnelle 15-20%
            </li>
            <li>
              <strong>Étude IMPROVE-IT:</strong> ↓ 6,4% événements CV
            </li>
            <li>Associations fixes disponibles (statine + ézétimibe)</li>
          </ul>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border-2 border-amber-400 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-amber-600">Étape 3</Badge>
            <h4 className="font-semibold">+ Acide Bempédoïque (I/B si intolérance, IIa/C si 3ème ligne)</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Indications:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>Intolérance statine (myalgies) - Classe I/B</li>
              <li>3ème ligne si objectif non atteint - Classe IIa/C</li>
            </ul>
            <p>
              <strong>Posologie:</strong> 180 mg/jour
            </p>
            <p>
              <strong>Efficacité:</strong> ↓ LDL-c 15-25%
            </p>
            <p>
              <strong>Étude CLEAR Outcomes (2023):</strong> ↓ 13% événements CV
            </p>
            <p>
              <strong>Avantages:</strong> Pas de myalgies, bien toléré, 1 prise/jour
            </p>
            <p>
              <strong>Surveillance:</strong> Acide urique, créatinine
            </p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 border-2 border-purple-400 p-4 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Badge className="bg-purple-600">Étape 4</Badge>
            <h4 className="font-semibold">+ Anti-PCSK9 (I/A)</h4>
          </div>
          <div className="space-y-2 text-sm">
            <p>
              <strong>Molécules:</strong>
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                <strong>Évolocumab (Repatha®):</strong> 140 mg SC /2 sem ou 420 mg /mois
              </li>
              <li>
                <strong>Alirocumab (Praluent®):</strong> 75-150 mg SC /2 sem ou 300 mg /mois
              </li>
            </ul>
            <p>
              <strong>Efficacité:</strong> ↓ LDL-c 55-60%
            </p>
            <p>
              <strong>Études FOURIER/ODYSSEY:</strong> ↓ 15% événements CV
            </p>
            <p>
              <strong>Tolérance:</strong> Excellente (auto-injection SC)
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <h3 className="text-lg font-bold">📊 Suivi & Surveillance</h3>
        <div className="bg-gray-50 border-2 border-gray-300 p-4 rounded-lg">
          <ul className="space-y-2 text-sm">
            <li>
              <strong>4-6 semaines:</strong> Après initiation/augmentation statine (bilan + ALAT/ASAT)
            </li>
            <li>
              <strong>4-6 semaines:</strong> Après ajout ézétimibe
            </li>
            <li>
              <strong>8-12 semaines:</strong> Après ajout bempédoïque/PCSK9
            </li>
            <li>
              <strong>Annuel:</strong> Une fois objectif atteint et stable
            </li>
            <li>
              <strong>CPK:</strong> Pas systématique, uniquement si myalgies
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
        <h4 className="font-semibold text-amber-900 mb-2">💡 Autres Paramètres</h4>
        <ul className="space-y-1 text-sm text-amber-800 list-disc pl-5">
          <li>
            <strong>Triglycérides:</strong> Objectif {"<"}1,5 g/L, icosapent éthyl si ≥2 g/L
          </li>
          <li>
            <strong>Lipoprotéine(a):</strong> Si {">"}50 mg/dL → LDL-c {"<"}0,40 g/L
          </li>
          <li>
            <strong>ApoB:</strong> Objectif secondaire {"<"}0,65 g/L
          </li>
        </ul>
      </div>
    </div>
  )
}

export default PopupLifestyle
