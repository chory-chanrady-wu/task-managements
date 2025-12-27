import { Calendar, ClipboardList, FolderGit2, Gauge, Search, Settings } from "lucide-react"
import "../app/globals.css"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"
import Link from "next/link"

// Menu items.
const items = [
  { title: "Dashboard", url: "/", icon: Gauge },
  { title: "Tasks Management", url: "/tasks", icon: ClipboardList },
  { title: "Projects Management", url: "/projects", icon: FolderGit2 },
  { title: "Calendar & Events", url: "/events", icon: Calendar },
  { title: "Settings", url: "/settings", icon: Settings },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="font-bold text-lg">
            <span><ClipboardList color="#3b66e8" /></span>Tasks Management
          </SidebarGroupLabel>
          <SidebarGroupContent className="px-2">
            <SidebarMenu>
              <div>
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full my-1 px-2 py-1 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 mb-2"
                />
              </div>
              <label className="border-b-2 border-gray-400 mt-2"> Menu </label>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild isActive={pathname === item.url}>
                    <Link href={item.url}>
                      <item.icon />
                      <span className={pathname === item.url ? "p-2 bg-gray-200 rounded-xl w-full text-blue-600 font-semibold" : "p-2 text-gray-700"}>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}