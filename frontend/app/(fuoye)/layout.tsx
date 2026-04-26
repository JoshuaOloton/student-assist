import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import Sidebar from "@/components/sidebar";

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

  return (
    <div style={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      {children}
    </div>
  );
}
