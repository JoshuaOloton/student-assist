import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton
} from "@/components/ui/sidebar"

import { DropdownMenu, DropdownMenuTrigger, DropdownMenuItem, DropdownMenuContent } from "./ui/dropdown-menu"

import { House, BookOpen, GraduationCap, DollarSign } from "lucide-react"
import { Separator } from "./ui/separator"
import AppLogo from "./app-logo"

export function AppSidebar() {
  const quickTopics = [
    { label: "General Info", icon: <House /> },
    { label: "Courses", icon: <BookOpen /> },
    { label: "Admissions", icon: <GraduationCap /> },
    { label: "School Fees", icon: <DollarSign /> }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="bg-blue-100 py-3">
        <div className="flex items-center gap-2">
          <AppLogo />
          Quick Topics
        </div>
      </SidebarHeader>
      <Separator />
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {quickTopics.map((topic, index) => (
              <SidebarMenuItem key={index}>
                <SidebarMenuButton>
                  {topic.icon}
                  <span>{topic.label}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <Separator />
      <SidebarFooter>
        <SidebarMenuButton isActive className="flex justify-center">
          New Conversation
          
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  )
} 