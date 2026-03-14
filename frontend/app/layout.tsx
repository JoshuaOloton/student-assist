import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppSidebar } from "@/components/app-sidebar";
import Header from "@/components/header";

const nunitoSans = Nunito_Sans({variable:'--font-sans'});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Student Enquiry Assistant",
  description: "AI-powered chatbot for student enquiries about admissions, courses, fees, campus life, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={nunitoSans.variable}>
      <body
        className={`${inter.variable} ${jetbrains.variable} antialiased`}
      >
        <TooltipProvider>
          <SidebarProvider>
            <AppSidebar />
            <main className="flex-1">
              <div className="flex items-center gap-4 px-4 py-3 bg-gray-100">
                <SidebarTrigger />
                <Header />
              </div>
              {children}
            </main>
          </SidebarProvider>
        </TooltipProvider>
      </body>
    </html>
  );
}
