import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import type { SideBarProps } from "@/types/SideBar.types"

import { Menu } from "lucide-react"
import { RenderProjectTree } from "./RenderProjectTree"
import { useContainers } from "@/hooks/useContainers"
import { useParams } from "react-router-dom"
import type { FileTreeItem } from "@/types/ProjectTreeTypes"
import { useProjects } from "@/hooks/useProjects"

export function SideBar({ open, onOpenChange }: SideBarProps) {
  const { projectId } = useParams<{ projectId: string }>()
  const { data: projects } = useProjects()
  const { data: containers } = useContainers(projectId!)

  return (
    <div className="fixed top-2 left-2 z-20">
      <DropdownMenu open={open} onOpenChange={onOpenChange}>
        <DropdownMenuTrigger
          render={
            <Button
              onClick={() => onOpenChange}
              size="icon-lg"
              aria-label="open menu"
              variant="outline"
            >
              <Menu />
            </Button>
          }
        />
        <DropdownMenuContent className="h-[calc(100vh-12rem)] w-64 overflow-y-auto p-0">
          {containers && projects && (
            <RenderProjectTree
              projectName={
                projects.find((p) => p.id === projectId)?.name ?? "Project"
              }
              notes={containers
                .filter((c) => c.type === "TECHNICAL_NOTE")
                .map((c) => {
                  const note: FileTreeItem = {
                    name: c.title,
                    path: `containers/${c.id}`,
                  }
                  return note
                })}

              journals={containers
                .filter((j) => j.type === "JOURNAL")
                .map((j) => {
                  const journal: FileTreeItem = {
                    name: j.title,
                    path: `containers/${j.id}`,
                  }
                  return journal
                })}
            />
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
