"use client"

import { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Info } from "lucide-react"

// Types of smart links
type LinkType = "definition" | "action" | "calculator" | "drug"

interface SmartLinkProps {
    keyword: string
    type: LinkType
    summary: string
    details?: ReactNode
    originalText: string
}

export function SmartLink({ keyword, type, summary, details, originalText }: SmartLinkProps) {
    const getColor = () => {
        switch (type) {
            case "calculator": return "text-blue-400 hover:text-blue-300 border-blue-500/50"
            case "action": return "text-red-400 hover:text-red-300 border-red-500/50"
            case "drug": return "text-green-400 hover:text-green-300 border-green-500/50"
            default: return "text-purple-400 hover:text-purple-300 border-purple-500/50"
        }
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <span
                    className={`cursor-pointer border-b border-dashed font-medium transition-colors ${getColor()}`}
                >
                    {originalText}
                </span>
            </PopoverTrigger>
            <PopoverContent className="w-80 glass-panel border-slate-600 text-slate-100">
                <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-slate-700 pb-2">
                        <Info className="h-4 w-4" />
                        <h4 className="font-semibold">{keyword}</h4>
                        <Badge variant="outline" className="ml-auto text-[10px] bg-slate-800">
                            {type.toUpperCase()}
                        </Badge>
                    </div>
                    <p className="text-sm text-slate-300">{summary}</p>
                    {details && (
                        <div className="pt-2">
                            {details}
                        </div>
                    )}
                </div>
            </PopoverContent>
        </Popover>
    )
}
