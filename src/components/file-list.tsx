"use client"

import type React from "react"

import { File, Folder, MoreVertical, Star } from "lucide-react"
import { useState } from "react"
import { Button } from "~/components/ui/button"

interface FileListProps {
  currentPath: string[]
  searchQuery: string
  onOpenFolder: (folderId: string, folderName: string) => void
}

interface FileItem {
  id: string
  name: string
  type: "file" | "folder"
  size?: string
  modified: string
  owner: string
  starred: boolean
}

const folderStructure: Record<string, FileItem[]> = {
  root: [
    {
      id: "project-proposal",
      name: "Project Proposal",
      type: "folder",
      modified: "Today",
      owner: "You",
      starred: false,
    },
    {
      id: "2",
      name: "Q4 Budget.xlsx",
      type: "file",
      size: "2.4 MB",
      modified: "Yesterday",
      owner: "You",
      starred: true,
    },
    {
      id: "design-assets",
      name: "Design Assets",
      type: "folder",
      modified: "2 days ago",
      owner: "You",
      starred: false,
    },
    {
      id: "4",
      name: "Meeting Notes.docx",
      type: "file",
      size: "156 KB",
      modified: "3 days ago",
      owner: "You",
      starred: false,
    },
    {
      id: "5",
      name: "Presentation.pptx",
      type: "file",
      size: "5.2 MB",
      modified: "1 week ago",
      owner: "You",
      starred: true,
    },
    {
      id: "archive",
      name: "Archive",
      type: "folder",
      modified: "2 weeks ago",
      owner: "You",
      starred: false,
    },
  ],
  "project-proposal": [
    {
      id: "proposal-draft",
      name: "Proposal Draft.docx",
      type: "file",
      size: "1.2 MB",
      modified: "Today",
      owner: "You",
      starred: true,
    },
    {
      id: "budget-breakdown",
      name: "Budget Breakdown.xlsx",
      type: "file",
      size: "856 KB",
      modified: "Yesterday",
      owner: "You",
      starred: false,
    },
    {
      id: "timeline",
      name: "Timeline.pptx",
      type: "file",
      size: "2.1 MB",
      modified: "2 days ago",
      owner: "You",
      starred: false,
    },
    {
      id: "research-folder",
      name: "Research",
      type: "folder",
      modified: "3 days ago",
      owner: "You",
      starred: false,
    },
  ],
  "design-assets": [
    {
      id: "logos",
      name: "Logos",
      type: "folder",
      modified: "Today",
      owner: "You",
      starred: false,
    },
    {
      id: "mockups",
      name: "Mockups",
      type: "folder",
      modified: "Yesterday",
      owner: "You",
      starred: true,
    },
    {
      id: "brand-guide",
      name: "Brand Guide.pdf",
      type: "file",
      size: "3.4 MB",
      modified: "1 week ago",
      owner: "You",
      starred: false,
    },
    {
      id: "color-palette",
      name: "Color Palette.fig",
      type: "file",
      size: "512 KB",
      modified: "2 weeks ago",
      owner: "You",
      starred: false,
    },
  ],
  archive: [
    {
      id: "old-projects",
      name: "Old Projects",
      type: "folder",
      modified: "1 month ago",
      owner: "You",
      starred: false,
    },
    {
      id: "backup-2023",
      name: "Backup 2023.zip",
      type: "file",
      size: "12.5 MB",
      modified: "2 months ago",
      owner: "You",
      starred: false,
    },
  ],
}

export function FileList({ currentPath, searchQuery, onOpenFolder }: FileListProps) {
  const [starredItems, setStarredItems] = useState(
    new Set(folderStructure["root"]?.filter((f) => f.starred).map((f) => f.id) || []),
  )

  const getCurrentFolderId = () => {
    if (currentPath.length === 1) return "root"
    const lastPath = currentPath[currentPath.length - 1]
    return lastPath?.toLowerCase().replace(/\s+/g, "-") || "root"
  }

  const currentFolderId = getCurrentFolderId()
  const mockFiles = folderStructure[currentFolderId] || folderStructure["root"] || []

  const filteredFiles = mockFiles?.filter((file) => file.name.toLowerCase().includes(searchQuery.toLowerCase())) || []

  const toggleStar = (id: string, e: React.MouseEvent) => {
    e.stopPropagation()
    const newStarred = new Set(starredItems)
    if (newStarred.has(id)) {
      newStarred.delete(id)
    } else {
      newStarred.add(id)
    }
    setStarredItems(newStarred)
  }

  return (
    <div className="space-y-2">
      {/* Header Row */}
      <div className="grid grid-cols-12 gap-4 px-4 py-3 text-xs font-semibold text-muted-foreground border-b border-border">
        <div className="col-span-5">Name</div>
        <div className="col-span-2">Owner</div>
        <div className="col-span-2">Last modified</div>
        <div className="col-span-2">File size</div>
        <div className="col-span-1"></div>
      </div>

      {/* File Rows */}
      <div className="space-y-0.5">
        {filteredFiles.length > 0 ? (
          filteredFiles.map((file) => (
            <div
              key={file.id}
              onClick={() => {
                if (file.type === "folder") {
                  onOpenFolder(file.id, file.name)
                }
              }}
              className={`grid grid-cols-12 gap-4 px-4 py-3 rounded-lg transition-all items-center group ${
                file.type === "folder" ? "hover:bg-secondary cursor-pointer" : "hover:bg-muted"
              }`}
            >
              <div className="col-span-5 flex items-center gap-3">
                {file.type === "folder" ? (
                  <Folder size={20} className="text-primary flex-shrink-0" />
                ) : (
                  <File size={20} className="text-muted-foreground flex-shrink-0" />
                )}
                <span className="text-sm font-medium text-foreground truncate">{file.name}</span>
              </div>
              <div className="col-span-2 text-sm text-muted-foreground">{file.owner}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{file.modified}</div>
              <div className="col-span-2 text-sm text-muted-foreground">{file.size || "—"}</div>
              <div className="col-span-1 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => toggleStar(file.id, e)}>
                  <Star
                    size={16}
                    className={starredItems.has(file.id) ? "fill-primary text-primary" : "text-muted-foreground"}
                  />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical size={16} className="text-muted-foreground" />
                </Button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No files found</p>
          </div>
        )}
      </div>
    </div>
  )
}
