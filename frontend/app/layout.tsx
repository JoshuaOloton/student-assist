import type { Metadata } from "next";
import { JetBrains_Mono, Inter, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";
import AuthProvider from "@/components/auth-provider";

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
  title: "Federal Univeristy Oye Ekiti (FUOYE) - Student Enquiry Assistant",
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
        <AuthProvider>
          {children}
        </AuthProvider>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
