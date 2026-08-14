"use client";

import { COLORS } from "@/lib/constants";
import Image from "next/image";
import { useState } from "react";
import { signIn } from "next-auth/react";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const RightPanel = () => {
  const [loading, setLoading] = useState(false);

  const googleLogin = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/" });
  };

  return (
    <div className="flex-1 flex items-center justify-center p-12">
      <div className="w-full max-w-96">
        <div className="flex items-center gap-4 mb-8">
          <Image
            src="/fuoye-logo.jpg"
            alt="FUOYE Logo"
            width={60}
            height={60}
          />
          <div>
            <h2 className="font-serif text-xl md:text-2xl text-[#1c2b22] font-semibold">
              Welcome back
            </h2>
            <p className="text-[#6b7c72] text-sm font-[sans-serif]">
              Sign in to access the FUOYE Campus Assistant
            </p>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={googleLogin}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-3 px-5 py-3 bg-white border-2 border-[#d1e7d9] rounded-xl font-[sans-serif] font-semibold text-[#1c2b22] transition-all duration-200 shadow-xs hover:shadow-lg hover:border-[#2d7a4f] ${loading ? 'cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {loading ? (
            <div className="w-5 h-5 rounded-full border-2 border-[#d1e7d9] border-t-[#2d7a4f] animate-spin" />
          ) : (
            <GoogleIcon />
          )}
          {loading ? "Signing you in..." : "Continue with Google"}
        </button>

        <div className="flex items-center gap-3 my-8">
          <div className="flex-1 h-px bg-[#d1e7d9]" />
          <span className="font-[sans-serif] text-sm text-[#6b7c72]">
            secure sign-in
          </span>
          <div className="flex-1 h-px bg-[#d1e7d9]" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {[
            ["🔒", "Encrypted", "Your data is safe"],
            ["✦", "FUOYE Official", "Authorised platform"],
            ["⊙", "Google Auth", "No passwords needed"],
            ["◎", "Instant Access", "One click sign-in"],
          ].map(([icon, title, sub]) => (
            <div
              key={title}
              className="bg-[#f0faf4] rounded-lg px-4 py-3 border border-[#d1e7d9]">
              <p className="text-xs font-[sans-serif] text-[#2d7a4f] mb-1">
                {icon} {title}
              </p>
              <p className="font-[sans-serif] text-xs text-[#6b7c72] m-0">{sub}</p>
            </div>
          ))}
        </div>

        <p className="text-center text-[#6b7c72] text-sm font-[sans-serif] mt-8">
          By signing in you agree to FUOYE&apos;s{" "}
          <span className="text-[#2d7a4f] cursor-pointer">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-[#2d7a4f] cursor-pointer">
            Privacy Policy
          </span>
        </p>
      </div>
    </div>
  );
};

export default RightPanel;
