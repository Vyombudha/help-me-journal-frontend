import * as React from "react"
import { ChevronsUpDown, Plus } from "lucide-react"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import type { CreateWorkspaceDTO, WorkspaceStatus } from "@/types/dtos"
import CreateWorkspace from "./CreateWorkspace"
import { useCreateWorkspace } from "@/hooks/useWorkspaceMutations"
import { toast } from "./ui/toast"
import { useNavigate, useParams } from "react-router-dom"

type WorkspaceItem = {
  id: string
  name: string
  logo: React.ElementType
  status: WorkspaceStatus
}

export function WorkspaceSwticher({
  workspaces = [],
}: {
  workspaces?: WorkspaceItem[]
}) {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const navigate = useNavigate()
  const { isMobile } = useSidebar()
  const [menuOpen, setMenuOpen] = React.useState(false)
  // Derive the active workspace; falls back to the first until the user picks one.
  const STATUS: Record<WorkspaceStatus, { label: string; dot: string }> = {
    IN_PROGRESS: { label: "In progress", dot: "bg-yellow-400" },
    COMPLETED: { label: "Completed", dot: "bg-green-400" },
    ABANDONED: { label: "Abandoned", dot: "bg-red-400" },
  }
  const activeWorkspace =
    workspaces.find((w) => w.id === workspaceId) ?? workspaces[0]
  const createWorkspace = useCreateWorkspace()
  if (!activeWorkspace) {
    return null
  }

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <SidebarMenuButton
                size="lg"
                className="data-popup-open:bg-sidebar-accent data-popup-open:text-sidebar-accent-foreground"
              />
            }
          >
            <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
              <activeWorkspace.logo className="size-4" />
            </div>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">
                {activeWorkspace.name}
              </span>
              <span className="flex items-center gap-1.5 truncate text-xs text-muted-foreground">
                <span
                  className={`size-1.5 shrink-0 rounded-full ${STATUS[activeWorkspace.status].dot}`}
                />
                {STATUS[activeWorkspace.status].label}
              </span>
            </div>
            <ChevronsUpDown className="ml-auto" />
          </DropdownMenuTrigger>

          <DropdownMenuContent
            className="w-(--anchor-width) min-w-56 rounded-lg"
            align="start"

            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Workspaces
              </DropdownMenuLabel>
              {workspaces.map((workspace, index) => (
                <DropdownMenuItem
                  key={workspace.id}
                  onClick={() => navigate(`/w/${workspace.id}`)}
                  className="gap-2 p-2"
                >
                  <div className="flex size-6 items-center justify-center rounded-md border">
                    <workspace.logo className="size-3.5 shrink-0" />
                  </div>
                  {workspace.name}
                  <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="gap-2 p-2"
              onClick={() => setMenuOpen(true)}
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-transparent">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add Workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <CreateWorkspace
          open={menuOpen}
          onOpenChange={setMenuOpen}
          onConfirm={(newWsData: CreateWorkspaceDTO) => {
            toast.promise(createWorkspace.mutateAsync(newWsData), {
              loading: `Creating Workspace`,
              success: `Workspace Created`,
              error: `Failed to Create Workspace`,
            })
          }}
        />
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
