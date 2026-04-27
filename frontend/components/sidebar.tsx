"use client";

import { COLORS } from "../lib/constants";
import { GraduationCap } from "lucide-react";
import { UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const AppSidebar = () => {
  const navItems = [
    { id: "/", label: "AI Assistant", icon: "✦" },
    { id: "/search", label: "Student Status", icon: "⊙" }
  ];

  const pathname = usePathname();
  const { data: session } = useSession();
  console.log("Session in sidebar:", session);

  return (
    <Sidebar variant="inset">
      <SidebarHeader>
        <div className="flex items-center gap-2.5 px-4 py-5">
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: COLORS.emerald,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <GraduationCap />
          </div>
          <div>
            <p className="text-white text-sm font-bold">FUOYE</p>
            <p className="text-white/40 text-xs">AI ASSISTANT</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <SidebarMenuButton variant={"fuoye"} asChild>
                    <Link href={item.id} className={`w-full px-6 py-6 text-sm font-sans transition-all duration-200 border-l-4 hover:text-white ${pathname === item.id ? "bg-[rgba(45,122,79,0.3)] border-[#4ade80] text-white font-semibold" : "bg-transparent border-transparent text-white/50 font-normal"}`}>
                      <span style={{ fontSize: 14 }}>{item.icon}</span>
                      {item.label}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: COLORS.emerald,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontSize: 12,
                fontFamily: "sans-serif",
                fontWeight: 700,
              }}
            >
              {session?.user?.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={session.user.image} alt="User Avatar" className="w-full h-full rounded-[50%]" />
              ): (
                <UserRound />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium m-0 truncate">{session?.user?.name}</p>
              <p className="text-white/70 text-xs m-0">{session?.user?.email}</p>
            </div>
            <button
              className="bg-none text-white hover:text-white/80 transition-colors p-1 cursor-pointer rounded"
              onClick={() => signOut({ callbackUrl: "/login" })}
              title="Logout"
            >
              ⇥
            </button>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}

export default AppSidebar;