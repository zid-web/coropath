"use client"

import { ChevronRight, Home } from "lucide-react"

export function BreadcrumbNavigation({
    currentPage,
    onNavigate,
}: {
    currentPage: any
    onNavigate: (target: any) => void
}) {
    return (
        <div className="flex items-center text-sm text-muted-foreground mb-4">
            <button onClick={() => onNavigate(null)} className="flex items-center hover:text-foreground">
                <Home className="h-4 w-4" />
            </button>
            {currentPage && (
                <>
                    <ChevronRight className="h-4 w-4 mx-2" />
                    <span className="font-medium text-foreground">{currentPage}</span>
                </>
            )}
        </div>
    )
}
