import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavPages } from "@/components/nav-pages"
// import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
  SidebarRail,
} from "@/components/ui/sidebar"

import {
  Search,
  Sparkles,
  Home,
  FrameIcon,
  Plus,
  AudioWaveformIcon,
} from "lucide-react"
import { getTitleText } from "@/lib/utils"
import { useUser } from "@clerk/react"
import { usePages } from "@/hooks/usePages"
import { useNavigate, useParams } from "react-router-dom"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { WorkspaceSwticher } from "./workspace-switcher"
import { useCreatePage } from "@/hooks/usePageMutations"
import type { CreatePageDTO } from "@/types/dtos"
import { toast } from "./ui/toast"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { workspaceId } = useParams<{ workspaceId: string }>()
  const { pageId } = useParams<{ pageId: string }>()
  const { data: workspaces } = useWorkspaces()
  const { data: pages, isLoading } = usePages(workspaceId!)
  const { user } = useUser()
  const createPage = useCreatePage(workspaceId!)
  const navigate = useNavigate()
  const title = JSON.stringify([
    {
      type: "heading",
      props: { level: 1 },
      content: [{ type: "text", text: "Untitled Page", styles: {} }],
    },
  ])
  const newPageData: CreatePageDTO = {
    title,
    moods: ["CALM", "HAPPY"],
  }
  const pageItems =
    pages?.map((page) => ({
      id: page.id,
      name: getTitleText(page.title),
      url: `w/${workspaceId}/p/${page.id}`,
      isActive: pageId === page.id,
      icon: <FrameIcon />,
    })) ?? []
  const workspaceItems =
    workspaces?.map((workspace) => ({
      id: workspace.id,
      name: workspace.name,
      logo: AudioWaveformIcon,
      status: workspace.status,
    })) ?? []
  const sidebarUser = {
    name: user?.fullName ?? "User",
    email: user?.primaryEmailAddress?.emailAddress ?? "No email",
    avatar: user?.imageUrl,
  }
  const data = {
    workspaces: workspaceItems,
    pageItems,
    user: sidebarUser,
    navMain: [
      {
        title: "Search",
        icon: Search,
      },
      {
        title: "Ask AI",
        icon: Sparkles,
        toolText: "coming soon! ",
      },
      {
        title: "Home",
        icon: Home,
        isActive: true,
      },
      {
        title: "New Page",
        icon: Plus,
        badge: "10",
        onClick: () => {
          if (!workspaceId) return
          toast.promise(
            createPage.mutateAsync(newPageData).then((page) => {
              navigate(`/w/${workspaceId}/p/${page.id}`)
              return page
            }),
            {
              loading: "Creating Page",
              success: "Page Created",
              error: "Failed to Create Page",
            }
          )
        },
      },
    ],
  }

  return (
    <Sidebar className="border-r-0" collapsible="icon" {...props}>
      <SidebarHeader>
        <WorkspaceSwticher workspaces={data.workspaces!} />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <SidebarGroup>
            <SidebarGroupLabel>Content Pages</SidebarGroupLabel>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <NavPages pages={data.pageItems} />
        )}
      </SidebarContent>
      <SidebarFooter>{/* <NavUser user={data.user} /> */}</SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
