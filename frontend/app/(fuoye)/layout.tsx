import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

function SidebarLayout({ children }: { children: React.ReactNode }) {
  "use client";
  return (
    <SidebarProvider>
      <Sidebar />
      <SidebarInset>{children}</SidebarInset>
    </SidebarProvider>
  );
}

export default async function FuoyeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    // toast.success("You must be logged in to access this page.");
    redirect("/login");
  }

  return <SidebarLayout>
    <Header />
    {children}
  </SidebarLayout>;
}
