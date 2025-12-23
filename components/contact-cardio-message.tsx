"use client"

import type React from "react"
import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Send, Paperclip, CheckCircle2 } from "lucide-react"

export function ContactCardioMessage() {
  const [message, setMessage] = useState("")
  const [objet, setObjet] = useState("")
  const [fichier, setFichier] = useState<File | null>(null)
  const [expediteur, setExpediteur] = useState("")
  const [envoye, setEnvoye] = useState(false)

  const CARDIO_EMAIL = "cardio.garde@clinique.fr" // À remplacer par l'email réel

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFichier(e.target.files[0])
    }
  }

  const handleEnvoyer = () => {
    const sujet = encodeURIComponent(`[CoroPath] ${objet}`)
    const corps = encodeURIComponent(
      `De: ${expediteur}\n\n${message}\n\n${fichier ? `Pièce jointe: ${fichier.name}` : ""}\n\n---\nEnvoyé depuis CoroPath`,
    )

    // Ouverture du client mail avec le message pré-rempli
    window.location.href = `mailto:${CARDIO_EMAIL}?subject=${sujet}&body=${corps}`

    setEnvoye(true)
    setTimeout(() => {
      setEnvoye(false)
      setMessage("")
      setObjet("")
      setFichier(null)
      setExpediteur("")
    }, 3000)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-300">
          <Mail className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-blue-900">
            <Mail className="h-5 w-5" />
            Message au Cardiologue de Garde
          </DialogTitle>
        </DialogHeader>

        {!envoye ? (
          <div className="space-y-4">
            <div>
              <Label htmlFor="expediteur">Votre nom</Label>
              <Input
                id="expediteur"
                value={expediteur}
                onChange={(e) => setExpediteur(e.target.value)}
                placeholder="Dr. Martin"
              />
            </div>

            <div>
              <Label htmlFor="objet">Objet</Label>
              <Input
                id="objet"
                value={objet}
                onChange={(e) => setObjet(e.target.value)}
                placeholder="Avis urgence SCA"
              />
            </div>

            <div>
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Décrivez la situation clinique..."
                rows={5}
                className="resize-none"
              />
            </div>

            <div>
              <Label htmlFor="fichier" className="cursor-pointer">
                <div className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900">
                  <Paperclip className="h-4 w-4" />
                  <span>{fichier ? fichier.name : "Joindre une image (ECG, coronarographie...)"}</span>
                </div>
              </Label>
              <Input id="fichier" type="file" accept="image/*,.pdf" onChange={handleFileChange} className="hidden" />
            </div>

            <Button
              onClick={handleEnvoyer}
              disabled={!message || !objet || !expediteur}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <Send className="h-4 w-4 mr-2" />
              Envoyer le message
            </Button>

            <p className="text-xs text-gray-600 text-center">
              Votre client mail s'ouvrira avec le message pré-rempli à {CARDIO_EMAIL}
            </p>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-8 space-y-3">
            <CheckCircle2 className="h-16 w-16 text-green-600" />
            <p className="text-lg font-semibold text-green-900">Client mail ouvert !</p>
            <p className="text-sm text-gray-600 text-center">
              Vérifiez votre client mail et envoyez le message au cardiologue de garde.
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}

export default ContactCardioMessage
