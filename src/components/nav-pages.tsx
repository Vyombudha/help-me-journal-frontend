"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"
import {
  MoreHorizontalIcon,
  FolderIcon,
  ArrowRightIcon,
  Trash2Icon,
} from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import ConfirmDelete from "./ConfirmDelete"
import { useState } from "react"
import { toast } from "./ui/toast"
import { useDeletePage } from "@/hooks/usePageMutations"
import { downloadMarkdown } from "@/lib/utils"
import { usePages } from "@/hooks/usePages"

export function NavPages({
  pages,
}: {
  pages: {
    id: string
    name: string
    url: string
    icon: React.ReactNode
    isActive: boolean
  }[]
}) {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const navigate = useNavigate()
  const { isMobile } = useSidebar()
  const deletePage = useDeletePage(workspaceId!)
  const { data: pagesData } = usePages(workspaceId!)
  const [pendingDelete, setPendingDelete] = useState<{
    id: string
    isActive: boolean
  } | null>(null)
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Context Pages</SidebarGroupLabel>
      <SidebarMenu>
        {pages.map((item) => (
          <SidebarMenuItem key={item.id}>
            <SidebarMenuButton
              isActive={item.isActive}
              render={<Link to={item.url} />}
            >
              {item.icon}
              <span>{item.name}</span>
            </SidebarMenuButton>

            <DropdownMenu>
              <DropdownMenuTrigger
                render={
                  <SidebarMenuAction
                    showOnHover
                    className="aria-expanded:bg-muted"
                  />
                }
              >
                <MoreHorizontalIcon />
                <span className="sr-only">More</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="w-fit"
                side={isMobile ? "bottom" : "right"}
                align={isMobile ? "end" : "start"}
              >
                <DropdownMenuItem>
                  <FolderIcon />
                  <span>View Page</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    const page = pagesData?.find((p) => p.id === item.id)
                    const safeName = item.name || "Untitled Page"
                    toast.promise(
                      downloadMarkdown(page?.content, `${safeName}.md`),
                      {
                        loading: "Preparing download",
                        success: "Page downloaded",
                        error: "Failed to download page",
                      }
                    )
                  }}
                >
                  <ArrowRightIcon />
                  <span>Share Page As Md</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  variant="destructive"
                  onClick={() => {
                    setPendingDelete({ id: item.id, isActive: item.isActive })
                  }}
                >
                  <Trash2Icon />
                  <span>Delete Page</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        ))}
        <ConfirmDelete
          open={pendingDelete !== null}
          onOpenChange={(open) => {
            if (!open) setPendingDelete(null)
          }}

          onConfirm={() => {
            if (!pendingDelete) return
            const { id, isActive } = pendingDelete

            toast.promise(
              deletePage.mutateAsync(id).then(() => {
                if (isActive) {
                  navigate(`/w/${workspaceId}`)
                }
              }),
              {
                loading: "Deleting Page",
                success: "Page Deleted",
                error: "Failed to Delete Page",
              }
            )
          }}
        />
        <SidebarMenuItem>
          <SidebarMenuButton className="text-sidebar-foreground/70">
            <MoreHorizontalIcon className="text-sidebar-foreground/70" />
            <span>More</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
    </SidebarGroup>
  )
}
