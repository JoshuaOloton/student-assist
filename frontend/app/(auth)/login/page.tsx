"use client";

import { useSession } from "next-auth/react";
import { COLORS } from "@/lib/constants";
import { GraduationCap } from "lucide-react";
import { redirect } from "next/navigation";
import RightPanel from "@/components/right-panel";
import LeftPanel from "@/components/left-panel";

const GlowOrb = ({ classname }: { classname: string }) => (
  <div className={`absolute rounded-[50%] blur-3xl opacity-20 ${classname}`} />
);

export default function Page() {
  const { data: session } = useSession();

  if (session) {
    redirect("/");
  }

  

  return (
    <div className="min-h-dvh bg-[#fafdf7] flex overflow-hidden relative font-['Georgia','Times New Roman',serif]">
      <GlowOrb classname="w-96 h-96 bg-[#4ade80] -top-24 -left-24" />
      <GlowOrb classname="w-72 h-96 bg-[#2d7a4f] -top-12 -right-24" />

      <LeftPanel />
      <RightPanel />
      
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
