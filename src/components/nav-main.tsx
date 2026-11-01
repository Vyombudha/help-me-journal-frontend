import { type LucideIcon } from "lucide-react"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    onClick?: () => void
    icon: LucideIcon
    isActive?: boolean
    toolText?: string
  }[]
}) {
  return (
    <SidebarMenu className="flex gap-2">
      {items.map((item) => (
        <SidebarMenuItem key={item.title}>
          <SidebarMenuButton
            isActive={item.isActive}
            tooltip={item.toolText}
            onClick={item.onClick}
          >
            <item.icon />
            <span>{item.title}</span>
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  )
}
