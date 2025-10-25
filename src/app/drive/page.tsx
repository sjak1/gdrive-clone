"use client"

import { useState } from "react"
import { Sidebar } from "~/components/sidebar"
import { Header } from "~/components/header"
import { Breadcrumbs } from "~/components/breadcrumbs"
import { FileList } from "~/components/file-list"
import { useRouter } from "next/navigation"

export default function DrivePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const router = useRouter()

  const handleNavigate = (path: string[]) => {
    if (path.length === 1) {
      router.push("/drive")
    } else {
      const lastPath = path[path.length - 1]
      if (lastPath) {
        const folderId = lastPath.toLowerCase().replace(/\s+/g, "-")
        router.push(`/drive/${folderId}`)
      }
    }
  }

  const handleOpenFolder = (folderId: string, folderName: string) => {
    router.push(`/drive/${folderId}`)
  }

  return (
    <div className="flex h-screen bg-background">
      <Sidebar currentPath={["My Drive"]} onNavigate={handleNavigate} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        <div className="flex-1 overflow-auto">
          <div className="p-6">
            <Breadcrumbs path={["My Drive"]} onNavigate={handleNavigate} />
            <FileList currentPath={["My Drive"]} searchQuery={searchQuery} onOpenFolder={handleOpenFolder} />
          </div>
        </div>
      </div>
    </div>
  )
}
