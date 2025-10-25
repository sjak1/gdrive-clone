"use client"

import { Search, Settings, HelpCircle, Grid3x3, List } from "lucide-react"
import { Button } from "~/components/ui/button"

interface HeaderProps {
  searchQuery: string
  onSearchChange: (query: string) => void
}

export function Header({ searchQuery, onSearchChange }: HeaderProps) {
  return (
    <div className="bg-card border-b border-border px-6 py-4">
      <div className="flex items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" size={18} />
            <input
              type="text"
              placeholder="Search in Drive"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-muted border border-border rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted rounded-full">
            <Grid3x3 size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted rounded-full">
            <List size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted rounded-full">
            <Settings size={20} />
          </Button>
          <Button variant="ghost" size="icon" className="text-foreground hover:bg-muted rounded-full">
            <HelpCircle size={20} />
          </Button>
        </div>
      </div>
    </div>
  )
}
