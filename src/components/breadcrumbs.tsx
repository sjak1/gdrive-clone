"use client"

import { ChevronRight } from "lucide-react"

interface BreadcrumbsProps {
  path: string[]
  onNavigate: (path: string[]) => void
}

export function Breadcrumbs({ path, onNavigate }: BreadcrumbsProps) {
  return (
    <div className="flex items-center gap-2 mb-6 text-sm">
      {path.map((item, index) => (
        <div key={index} className="flex items-center gap-2">
          <button
            onClick={() => onNavigate(path.slice(0, index + 1))}
            className="text-primary hover:text-primary/80 font-medium transition-colors"
          >
            {item}
          </button>
          {index < path.length - 1 && <ChevronRight size={16} className="text-muted-foreground" />}
        </div>
      ))}
    </div>
  )
}
