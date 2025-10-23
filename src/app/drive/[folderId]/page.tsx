"use client"

import { useState } from "react"
import { Sidebar } from "~/components/sidebar"
import { Header } from "~/components/header"
import { Breadcrumbs } from "~/components/breadcrumbs"
import { FileList } from "~/components/file-list"
import { useRouter, useParams } from "next/navigation"

// Mock folder data structure
const folderData: Record<string, { name: string; parent: string | null }> = {
  "project-proposal": { name: "Project Proposal", parent: null },
  "design-assets": { name: "Design Assets", parent: null },
  archive: { name: "Archive", parent: null },
}

export default function FolderPage() {
  const params = useParams()
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const folderId = params.folderId as string

  // Build breadcrumb path
  const buildPath = (id: string): string[] => {
    const path = ["My Drive"]
    const folder = folderData[id]
    if (folder) {
      path.push(folder.name)
    }
    return path
  }

  const currentPath = buildPath(folderId)

  const handleNavigate = (path: string[]) => {
    if (path.length === 1) {
      router.push("/drive")
    } else {
      const targetId = path[path.length - 1].toLowerCase().replace(/\s+/g, "-")
      router.push(`/drive/${targetId}`)
    }
  }

  const handleOpenFolder = (newFolderId: string, folderName: string) => {
    router.push(`/drive/${newFolderId}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath={currentPath} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Breadcrumbs path={currentPath} onNavigate={handleNavigate} />
            <FileList currentPath={currentPath} searchQuery={searchQuery} onOpenFolder={handleOpenFolder} />
          </div>
        </div>
      </div>
    </div>
  )
}
