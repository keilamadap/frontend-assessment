"use client"

import { Wrench, MailCheck } from "lucide-react"
import Link from "next/link"
import { useSelectedLayoutSegment } from "next/navigation"

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { routes } from "@/lib/routes"

const items = [
  {
    title: "Skills",
    url: routes.skills,
    icon: Wrench,
  },
  {
    title: "Applications",
    url: routes.applications,
    icon: MailCheck,
  },
]

export function AppSidebar() {
  const segment = useSelectedLayoutSegment()

  const normalizeUrl = (url: string) => url.replace(/^\//, "")

  return (
    <Sidebar>
      <SidebarContent className="bg-gf-blue overflow-hidden">
        <SidebarHeader className="items-center justify-center h-24 w-24">
          <Link
            href="/"
            className="text-3xl font-bold text-white"
          >
            GF
          </Link>
        </SidebarHeader>
        <SidebarGroup className="p-0 flex-1">
          <SidebarGroupContent className="flex-1">
            <SidebarMenu className="gap-0 h-full">
              <div className="flex-1">
                {items.map((item) => (
                  <SidebarMenuItem
                    className="flex flex-col items-center justify-center h-24 w-24"
                    key={item.title}
                  >
                    <SidebarMenuButton
                      className="w-full h-full rounded-none active:text-white data-[active=true]:text-white
                      hover:text-white text-white hover:bg-white/20 active:bg-white/30 data-[active=true]:bg-white/30
                      data-[state=open]:bg-white/30"
                      asChild
                      isActive={segment === normalizeUrl(item.url)}
                    >
                      <Link
                        className="flex flex-col items-center justify-center text-white"
                        href={item.url}
                      >
                        <item.icon size={20} />
                        <span className="text-xs">{item.title}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </div>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
