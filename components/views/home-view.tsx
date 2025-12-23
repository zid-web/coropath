import { Phone, Stethoscope, AlertCircle, Activity, Calendar, ChevronRight, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HomeViewProps {
    onNavigate: (pathwayId: string) => void
}

export function HomeView({ onNavigate }: HomeViewProps) {
    return (
        <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col overflow-hidden selection:bg-cyan-500/30">

            {/* Background Grid & Glow Effects */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(15,23,42,0.95),rgba(15,23,42,0.95)),url('https://grainy-gradients.vercel.app/noise.svg')] opacity-60 pointer-events-none" />
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[400px] bg-cyan-500/20 blur-[100px] rounded-full pointer-events-none" />

            {/* Header */}
            <div className="relative z-10 p-6 flex items-center justify-between border-b border-slate-800/50 backdrop-blur-sm">
                <div>
                    <h1 className="text-3xl font-bold tracking-tighter flex items-center gap-2">
                        <span className="text-cyan-400">CORO</span>PATH
                        <span className="text-xs bg-slate-800 px-2 py-0.5 rounded text-slate-400 border border-slate-700">v2.0</span>
                    </h1>
                    <p className="text-xs text-slate-400 font-mono mt-1">Parcours Coronaire: Pôle Santé Sud LE MANS</p>
                </div>
                <Button variant="outline" className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:text-red-300 gap-2">
                    <Phone className="h-4 w-4 animate-pulse" />
                    <span>URGENCE</span>
                </Button>
            </div>

            {/* Main Content Area */}
            <div className="relative z-10 flex-1 container mx-auto p-6 flex flex-col justify-center">

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

                    {/* Card 1: Douleur */}
                    <div
                        onClick={() => onNavigate("douleur")}
                        className="group relative h-80 glass-panel rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-cyan-500/50 hover:shadow-[0_0_30px_-5px_rgba(6,182,212,0.3)]"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <span className="text-xs font-mono text-cyan-300">01</span>
                        </div>
                        <div className="h-full flex flex-col">
                            <div className="mb-6 p-3 w-fit rounded-xl bg-cyan-500/10 border border-cyan-500/20 group-hover:bg-cyan-500/20 transition-colors">
                                <Stethoscope className="h-8 w-8 text-cyan-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-cyan-300 transition-colors">Cabinet</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
                                Évaluation et orientation de la douleur thoracique. Calcul probabilité RF-CL.
                            </p>
                            <div className="flex items-center text-cyan-500 text-sm font-medium mt-4">
                                <span className="border-b border-dashed border-cyan-500/50 hover:border-solid">Explorer</span>
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        {/* Background Accent */}
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-cyan-500/10 blur-3xl rounded-full group-hover:bg-cyan-500/20 transition-colors" />
                    </div>

                    {/* Card 2: SCA (Focus) */}
                    <div
                        onClick={() => onNavigate("sca")}
                        className="group relative h-80 glass-panel rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-red-500/50 hover:shadow-[0_0_30px_-5px_rgba(239,68,68,0.3)] border-slate-700"
                    >
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-red-600 to-transparent" />
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <span className="text-xs font-mono text-red-300 animate-pulse">URGENT</span>
                        </div>
                        <div className="h-full flex flex-col relative z-10">
                            <div className="mb-6 p-3 w-fit rounded-xl bg-red-500/10 border border-red-500/20 group-hover:bg-red-500/20 transition-colors">
                                <Zap className="h-8 w-8 text-red-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-red-300 transition-colors">SCA Urgent</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
                                Filière courte STEMI / NSTEMI. Stratégie invasive et antithrombotique.
                            </p>
                            <div className="flex items-center text-red-500 text-sm font-medium mt-4">
                                <span className="border-b border-dashed border-red-500/50 hover:border-solid">Activer protocole</span>
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-red-500/10 blur-3xl rounded-full group-hover:bg-red-500/20 transition-colors" />
                    </div>

                    {/* Card 3: SCC */}
                    <div
                        onClick={() => onNavigate("scc")}
                        className="group relative h-80 glass-panel rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-blue-500/50 hover:shadow-[0_0_30px_-5px_rgba(59,130,246,0.3)]"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <span className="text-xs font-mono text-blue-300">03</span>
                        </div>
                        <div className="h-full flex flex-col">
                            <div className="mb-6 p-3 w-fit rounded-xl bg-blue-500/10 border border-blue-500/20 group-hover:bg-blue-500/20 transition-colors">
                                <Activity className="h-8 w-8 text-blue-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-blue-300 transition-colors">Chronique</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
                                SCC. Tests fonctionnels, imagerie et traitement anti-ischémique de fond.
                            </p>
                            <div className="flex items-center text-blue-500 text-sm font-medium mt-4">
                                <span className="border-b border-dashed border-blue-500/50 hover:border-solid">Explorer</span>
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-blue-500/10 blur-3xl rounded-full group-hover:bg-blue-500/20 transition-colors" />
                    </div>

                    {/* Card 4: Suivi */}
                    <div
                        onClick={() => onNavigate("post")}
                        className="group relative h-80 glass-panel rounded-2xl p-6 cursor-pointer overflow-hidden transition-all duration-300 hover:border-emerald-500/50 hover:shadow-[0_0_30px_-5px_rgba(16,185,129,0.3)]"
                    >
                        <div className="absolute top-0 right-0 p-4 opacity-50">
                            <span className="text-xs font-mono text-emerald-300">04</span>
                        </div>
                        <div className="h-full flex flex-col">
                            <div className="mb-6 p-3 w-fit rounded-xl bg-emerald-500/10 border border-emerald-500/20 group-hover:bg-emerald-500/20 transition-colors">
                                <Calendar className="h-8 w-8 text-emerald-400" />
                            </div>
                            <h3 className="text-2xl font-bold text-slate-100 mb-2 group-hover:text-emerald-300 transition-colors">Suivi</h3>
                            <p className="text-slate-400 text-sm leading-relaxed mb-auto">
                                Post-Hospitalisation, Réadaptation et Prévention secondaire optimisée.
                            </p>
                            <div className="flex items-center text-emerald-500 text-sm font-medium mt-4">
                                <span className="border-b border-dashed border-emerald-500/50 hover:border-solid">Explorer</span>
                                <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </div>
                        </div>
                        <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-emerald-500/10 blur-3xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
                    </div>

                </div>
            </div>

            {/* Footer Status */}
            <div className="bg-slate-900/50 border-t border-slate-800 p-2 px-6 flex items-center justify-between text-[10px] text-slate-500 font-mono backdrop-blur-md">
                <div className="flex items-center gap-4">
                    <span className="flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        SYSTEM: ONLINE
                    </span>
                    <span>GUIDELINES: ESC 2023/2024</span>
                </div>
                <div>
                    SECURE CONNECTION
                </div>
            </div>
        </div>
    )
}
