"use client";

import { COLORS } from "../lib/constants";
import { GraduationCap } from "lucide-react";
import { UserRound } from "lucide-react";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "next-auth/react";
import Link from "next/link";

const Sidebar = () => {
  const navItems = [
    { id: "/", label: "AI Assistant", icon: "✦" },
    { id: "/search", label: "Student Status", icon: "⊙" }
  ];

  const pathname = usePathname();
  const { data: session } = useSession();
  console.log("Session in sidebar:", session);

  return (
    <div
      style={{
        width: 240,
        minHeight: "100vh",
        background: COLORS.charcoal,
        display: "flex",
        flexDirection: "column",
        padding: "1.5rem 0",
        position: "relative",
      }}
    >
      {/* Logo */}
      <div style={{ padding: "0 1.5rem 1.5rem", borderBottom: `1px solid rgba(255,255,255,0.06)` }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
            <p style={{ color: "white", fontSize: 13, fontFamily: "sans-serif", fontWeight: 700, margin: 0 }}>FUOYE</p>
            <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 10, fontFamily: "sans-serif", margin: 0, letterSpacing: 1 }}>AI ASSISTANT</p>
          </div>
        </div>
      </div>

      {/* Quick Topics label */}
      <p style={{ color: "rgba(255,255,255,0.3)", fontSize: 10, fontFamily: "sans-serif", letterSpacing: 2, textTransform: "uppercase", padding: "1.2rem 1.5rem 0.5rem" }}>
        Navigation
      </p>

      {/* Nav */}
      <nav style={{ flex: 1 }}>
        {navItems.map((item) => (
          <Link
            key={item.id}
            href={item.id}
            // onClick={() => setPage(item.id)}
            className={`w-full flex items-center gap-2.5 px-6 py-3 border-none text-sm text-left font-sans transition-all duration-200 border-l-4 hover:text-white ${pathname === item.id ? "bg-[rgba(45,122,79,0.3)] border-[#4ade80] text-white font-semibold" : "bg-transparent border-transparent text-white/50 font-normal"}`}
          >
            <span style={{ fontSize: 14, opacity: 0.8 }}>{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>

      {/* User */}
      <div className="px-5 py-4 border-t border-white/5">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
          <div className="flex-1" >
            <p className="text-white text-sm font-serif m-0 font-medium">{session?.user?.name}</p>
            <p className="text-white text-xs font-serif m-0">FUO/2021/CSC/001</p>
          </div>
          <button
            className="bg-none text-white text-opacity-30 hover:text-opacity-80 transition-colors p-0 cursor-pointer"
            onClick={() => signOut({ callbackUrl: "/login" })}
            title="Logout"
          >
            ⇥
          </button>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;