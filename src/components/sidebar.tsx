"use client"

import { useState } from "react"
import { Plus, FileText, Folder, Clock, Star, Trash2 } from "lucide-react"
import { Button } from "~/components/ui/button"

interface SidebarProps {
  currentPath: string[]
  onNavigate: (path: string[]) => void
}

export function Sidebar({ currentPath, onNavigate }: SidebarProps) {
  const [showNewMenu, setShowNewMenu] = useState(false)

  const menuItems = [
    { icon: FileText, label: "My Drive", path: ["My Drive"] },
    { icon: Clock, label: "Recent", path: ["Recent"] },
    { icon: Star, label: "Starred", path: ["Starred"] },
    { icon: Trash2, label: "Trash", path: ["Trash"] },
  ]

  return (
    <div className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo and New Button */}
      <div className="p-4 border-b border-sidebar-border">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-bold text-sm">D</span>
          </div>
          <span className="font-semibold text-sidebar-foreground text-base">Drive</span>
        </div>
        <div className="relative">
          <Button
            onClick={() => setShowNewMenu(!showNewMenu)}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2 rounded-full"
          >
            <Plus size={18} />
            New
          </Button>
          {showNewMenu && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10">
              <button className="w-full text-left px-4 py-2 hover:bg-muted text-card-foreground flex items-center gap-2 text-sm">
                <FileText size={16} />
                File upload
              </button>
              <button className="w-full text-left px-4 py-2 hover:bg-muted text-card-foreground flex items-center gap-2 text-sm">
                <Folder size={16} />
                New folder
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 p-2 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon
          const isActive = JSON.stringify(currentPath) === JSON.stringify(item.path)
          return (
            <button
              key={item.label}
              onClick={() => onNavigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg transition-colors text-sm font-medium ${
                isActive
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              }`}
            >
              <Icon size={20} />
              <span>{item.label}</span>
            </button>
          )
        })}
      </nav>

      {/* Storage Info */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="bg-muted rounded-lg p-3">
          <div className="w-full bg-border rounded-full h-2 mb-2">
            <div className="bg-primary h-2 rounded-full" style={{ width: "45%" }} />
          </div>
          <p className="text-xs text-muted-foreground">4.5 GB of 15 GB used</p>
        </div>
      </div>
    </div>
  )
}
