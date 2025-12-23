"use client"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"

export function ArbreRevascularisation() {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                    Arbre Décisionnel
                </Button>
            </DialogTrigger>
            <DialogContent>
                <div className="p-4">
                    <h2 className="text-lg font-bold mb-4">Arbre de Revascularisation</h2>
                    <p className="text-muted-foreground">Contenu de l'arbre décisionnel en cours de développement.</p>
                </div>
            </DialogContent>
        </Dialog>
    )
}
