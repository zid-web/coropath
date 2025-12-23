import { PathwaySatellite } from "@/lib/pathways-data"
import { Button } from "@/components/ui/button"
import { Calculator, Activity, Heart, FileText, Zap } from "lucide-react"

interface PathwaySatellitesProps {
    satellites: PathwaySatellite[]
    color: string
    onActionClick: (actionId: string) => void
}

export function PathwaySatellites({ satellites, color, onActionClick }: PathwaySatellitesProps) {
    const getIcon = (actionId: string) => {
        if (actionId.startsWith("calc") || actionId === "calc-grace") return <Calculator className="h-4 w-4" />
        if (actionId.startsWith("arbre")) return <Activity className="h-4 w-4" />
        if (actionId === "lifestyle") return <Heart className="h-4 w-4" />
        return <Zap className="h-4 w-4" />
    }

    const getColorClass = (color: string) => {
        switch (color) {
            case "orange":
                return "bg-orange-500/10 text-orange-400 hover:bg-orange-500/20 border border-orange-500/20"
            case "red":
                return "bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20"
            case "blue":
                return "bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 border border-blue-500/20"
            case "green":
                return "bg-green-500/10 text-green-400 hover:bg-green-500/20 border border-green-500/20"
            default:
                return "bg-slate-800 text-slate-300 hover:bg-slate-700"
        }
    }

    return (
        <div className="flex flex-wrap gap-2 mt-4 mb-6">
            {satellites.map((satellite, index) => (
                <Button
                    key={index}
                    variant="ghost"
                    className={`gap-2 h-auto py-2 px-3 ${getColorClass(color)}`}
                    onClick={() => onActionClick(satellite.actionId)}
                >
                    {getIcon(satellite.actionId)}
                    <div className="text-left">
                        <div className="font-semibold text-xs">{satellite.label}</div>
                        <div className="text-[10px] opacity-80 font-normal">{satellite.description}</div>
                    </div>
                </Button>
            ))}
        </div>
    )
}
