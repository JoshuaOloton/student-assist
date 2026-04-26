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

import { House, BookOpen, GraduationCap, DollarSign, Search } from "lucide-react"
import { Separator } from "./ui/separator"
import AppLogo from "./app-logo"
import Link from "next/link"

export function AppSidebar() {
  const quickTopics = [
    { label: "General Info", icon: <House /> },
    { label: "Courses", icon: <BookOpen /> },
    { label: "Admissions", icon: <GraduationCap /> },
    { label: "School Fees", icon: <DollarSign /> }
  ]

  return (
    <Sidebar>
      <SidebarHeader className="bg-gray-100 py-3">
        <div className="flex items-center gap-2">
          <AppLogo />
          Quick Topics
        </div>
      </SidebarHeader>
      {/* <Separator /> */}
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton>
                <Search />
                <Link href="/student-lookup">Search Student Status</Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <Separator />
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