"use client";

import AppLogo from "./app-logo";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, GraduationCap } from "lucide-react";

const Header = () => {
  const pathname = usePathname();

  return (
    <header className="flex-1 bg-card/50 backdrop-blur-sm">
      <div className="flex max-w-4xl items-center justify-between px-4 py-4 sm:py-6">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-primary/10 p-2">
            <GraduationCap className="h-6 w-6 text-primary" />
          </div>
          {pathname === "/" ? (
            <div>
              <h1 className="text-sm font-medium">FUOYE AI Chat</h1>
              <p className="text-xs">Student Enquiry Assistant</p>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-bold text-foreground">
                Student Lookup
              </h1>
              <p className="text-sm text-muted-foreground">
                Find and verify student information
              </p>
            </div>
          )}
        </div>
        { pathname !== "/" && (
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Chat</span>
            </Button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
