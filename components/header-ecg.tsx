"use client"

import { useState, useEffect } from "react"
import { Heart, Phone, Volume2, VolumeX } from "lucide-react"
import { ContactCardioMessage } from "@/components/contact-cardio-message"
import { Button } from "@/components/ui/button"
import { useAudioManager } from "@/hooks/use-audio-manager"

export function HeaderECG({ isScrolled }: { isScrolled: boolean }) {
    const [heartBeat, setHeartBeat] = useState(false)
    const { soundEnabled, toggleSound, playHeartbeat, playClick } = useAudioManager()

    useEffect(() => {
        const interval = setInterval(() => {
            setHeartBeat(true)
            playHeartbeat()
            setTimeout(() => setHeartBeat(false), 400)
        }, 1200)
        return () => clearInterval(interval)
    }, [playHeartbeat])

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div
                            className={`rounded-xl bg-gradient-to-br from-red-500 to-red-600 p-2 transition-transform duration-200 ${heartBeat ? "scale-110" : "scale-100"
                                }`}
                        >
                            <Heart className="h-5 w-5 md:h-6 md:w-6 text-white fill-white" />
                        </div>
                        {heartBeat && <div className="absolute inset-0 rounded-xl bg-red-400 animate-ping opacity-75" />}
                    </div>

                    <div className="flex-1">
                        <h1
                            className={`font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient-flow transition-all hover:scale-[1.02] cursor-default ${isScrolled ? "text-sm md:text-base" : "text-base md:text-lg lg:text-xl"}`}
                        >
                            Parcours Coronaire (CoroPath) Clinique Pôle Santé sud - Le MANS
                        </h1>
                    </div>

                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                            playClick()
                            toggleSound()
                        }}
                        className="h-8 w-8 p-0 rounded-full hover:bg-gray-100"
                        title={soundEnabled ? "Désactiver tous les sons" : "Activer tous les sons"}
                    >
                        {soundEnabled ? (
                            <Volume2 className="h-4 w-4 text-blue-600" />
                        ) : (
                            <VolumeX className="h-4 w-4 text-gray-400" />
                        )}
                    </Button>
                </div>
            </div>

            <div className="relative h-12 w-full overflow-hidden rounded-lg bg-gradient-to-r from-red-50 to-pink-50 border border-red-100">
                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 60" preserveAspectRatio="none">
                    <defs>
                        <linearGradient id="ecgGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.3" />
                            <stop offset="50%" stopColor="#dc2626" stopOpacity="0.8" />
                            <stop offset="100%" stopColor="#ef4444" stopOpacity="0.3" />
                        </linearGradient>
                    </defs>

                    <path
                        d="M0,30 L50,30 L55,10 L60,50 L65,30 L70,30 L75,25 L80,35 L85,30 L400,30"
                        fill="none"
                        stroke="url(#ecgGradient)"
                        strokeWidth="2"
                        strokeLinecap="round"
                        className="animate-ecg-trace"
                    />
                </svg>

                <div className="absolute inset-0 opacity-10">
                    {[...Array(20)].map((_, i) => (
                        <div key={i} className="absolute h-full w-px bg-red-300" style={{ left: `${i * 5}%` }} />
                    ))}
                </div>
            </div>

            {!isScrolled && (
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 p-3 rounded-lg bg-gradient-to-r from-blue-50 to-green-50 border border-blue-200">
                    <div className="flex items-center gap-2 w-full">
                        <Phone className="h-4 w-4 text-red-600 flex-shrink-0" />
                        <div className="grid grid-cols-2 sm:flex sm:flex-row gap-x-4 gap-y-2 sm:gap-3 text-xs flex-1">
                            <a
                                href="tel:15"
                                className="font-semibold text-red-600 hover:underline whitespace-nowrap"
                                onClick={playClick}
                            >
                                SAMU 15
                            </a>
                            <a
                                href="tel:0679924458"
                                className="font-semibold text-blue-600 hover:underline whitespace-nowrap"
                                onClick={playClick}
                            >
                                Cardio Garde
                            </a>
                            <a
                                href="tel:0243505050"
                                className="text-gray-700 font-medium hover:underline whitespace-nowrap"
                                onClick={playClick}
                            >
                                Cardio Interventionnel
                            </a>
                            <a
                                href="tel:0243783939"
                                className="text-gray-700 font-medium hover:underline whitespace-nowrap"
                                onClick={playClick}
                            >
                                USIC/Standard
                            </a>
                        </div>
                    </div>
                    <ContactCardioMessage />
                </div>
            )}
        </div>
    )
}
