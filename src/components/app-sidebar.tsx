import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavUser } from "@/components/nav-user"
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

import { Search, Sparkles, Home, FrameIcon, Plus } from "lucide-react"
import { useWorkspaces } from "@/hooks/useWorkspaces"
import { getTitleText } from "@/lib/utils"
import { useUser } from "@clerk/react"
import { AppBrand } from "./app-brand"

// This is sample data.

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: projects, isLoading } = useWorkspaces()
  const { user } = useUser()
  const projectItems =
    projects?.map((p) => ({
      name: getTitleText(p.name),
      url: `/${p.id}`,
      icon: <FrameIcon />,
    })) ?? []

  const sidebarUser = {
    name: user?.fullName,
    email: user?.primaryEmailAddress?.emailAddress,
    avatar: user?.imageUrl,
  }
  const data = {
    projects: projectItems,
    user: sidebarUser,
    navMain: [
      {
        title: "Search",
        url: "#",
        icon: Search,
      },
      {
        title: "Ask AI",
        url: "#",
        icon: Sparkles,
        toolText: "coming soon! ",
      },
      {
        title: "Home",
        url: "/",
        icon: Home,
        isActive: true,
      },
      {
        title: "New Project",
        url: "/container",
        icon: Plus,
        badge: "10",
      },
    ],
  }

  return (
    <Sidebar className="border-r-0" collapsible="icon" {...props}>
      <SidebarHeader>
        <AppBrand />
        <NavMain items={data.navMain} />
      </SidebarHeader>
      <SidebarContent>
        {isLoading ? (
          <SidebarGroup>
            <SidebarGroupLabel>Projects</SidebarGroupLabel>
            <SidebarMenu>
              {Array.from({ length: 5 }).map((_, i) => (
                <SidebarMenuItem key={i}>
                  <SidebarMenuSkeleton showIcon />
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroup>
        ) : (
          <NavProjects projects={data.projects} />
        )}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
