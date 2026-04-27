"use client";

import { useSession } from "next-auth/react";
import { COLORS } from "@/lib/constants";
import { GraduationCap } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";


const GlowOrb = ({ classname }: { classname: string }) => (
  <div className={`absolute rounded-[50%] blur-3xl opacity-20 ${classname}`} />
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

export default function Page() {
  const { data: session } = useSession();

  if (session) {
      redirect("/");
    }

  const [loading, setLoading] = useState(false);

  const googleLogin = () => {
    setLoading(true);
    signIn("google", { callbackUrl: "/" });
  }

  return (
    <div
      className="min-h-dvh bg-[#fafdf7] flex overflow-hidden relative font-['Georgia','Times New Roman',serif]"
    >
      <GlowOrb
        classname="w-96 h-96 bg-[#4ade80] -top-24 -left-24"
      />
      <GlowOrb
        classname="w-72 h-96 bg-[#2d7a4f] -top-12 -right-24"
      />

      {/* Left Panel */}
      <div
        className="flex-1 bg-[#1a4731] hidden md:flex flex-col justify-center py-16 px-20 relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-5"
        >
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-[50%] top-1/2 left-1/2 -translate-1/2"
              style={{
                width: 80 + i * 60,
                height: 80 + i * 60,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              marginBottom: "3rem",
            }}
          >
            <div
              style={{
                width: 44,
                height: 44,
                borderRadius: 12,
                background: "rgba(255,255,255,0.15)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <GraduationCap />
            </div>
            <div>
              <p
                style={{
                  color: "rgba(255,255,255,0.6)",
                  fontSize: 11,
                  letterSpacing: 3,
                  textTransform: "uppercase",
                  margin: 0,
                  fontFamily: "sans-serif",
                }}
              >
                Federal University
              </p>
              <p
                style={{
                  color: "white",
                  fontSize: 15,
                  fontWeight: "bold",
                  margin: 0,
                  fontFamily: "sans-serif",
                }}
              >
                Oye-Ekiti
              </p>
            </div>
          </div>
          <h1
            style={{
              color: "white",
              fontSize: "3.4rem",
              lineHeight: 1.1,
              margin: "0 0 1.5rem",
              fontWeight: "normal",
              letterSpacing: "-1px",
            }}
          >
            Your campus,
            <br />
            <em style={{ color: COLORS.mint }}>intelligently</em>
            <br />
            simplified.
          </h1>
          <p
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: "1.05rem",
              lineHeight: 1.7,
              maxWidth: 360,
              fontFamily: "sans-serif",
              fontWeight: 300,
            }}
          >
            FUOYE&apos;s AI-powered platform supports both students and administrators, offering an interactive chat assistant for student questions on admissions, fees, courses, and campus life, alongside a dedicated enquiry management interface for university staff to review and respond efficiently.
          </p>
          <div style={{ display: "flex", gap: 32, marginTop: "3rem" }}>
            {[
              ["1K+", "Students"],
              ["10+", "Departments"],
              ["24/7", "Support"],
            ].map(([num, label]) => (
              <div key={label}>
                <p
                  style={{
                    color: "white",
                    fontSize: "1.6rem",
                    margin: 0,
                    fontWeight: "bold",
                    fontFamily: "sans-serif",
                  }}
                >
                  {num}
                </p>
                <p
                  style={{
                    color: "rgba(255,255,255,0.5)",
                    fontSize: 12,
                    margin: 0,
                    fontFamily: "sans-serif",
                    letterSpacing: 1,
                  }}
                >
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel */}
      <div
        style={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "3rem",
        }}
      >
        <div style={{ width: "100%", maxWidth: 380 }}>
          <div className="flex items-center gap-4 mb-8">
            <Image src="/fuoye-logo.jpg" alt="FUOYE Logo" width={60} height={60} />
            <div className="">
              <h2
                className="font-serif text-xl md:text-2xl text-[#1c2b22] font-semibold"
              >
                Welcome back
              </h2>
              <p
                style={{
                  color: COLORS.muted,
                  fontSize: 14,
                  fontFamily: "sans-serif",
                }}
              >
                Sign in to access the FUOYE Campus Assistant
              </p>
            </div>
          </div>

          {/* Google Button */}
          <button
            onClick={googleLogin}
            disabled={loading}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 12,
              padding: "14px 20px",
              background: "white",
              border: `1.5px solid ${COLORS.border}`,
              borderRadius: 12,
              fontSize: 15,
              fontFamily: "sans-serif",
              fontWeight: 600,
              color: COLORS.charcoal,
              cursor: loading ? "not-allowed" : "pointer",
              transition: "all 0.2s",
              boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = COLORS.emerald;
              e.currentTarget.style.boxShadow =
                "0 2px 12px rgba(45,122,79,0.12)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = COLORS.border;
              e.currentTarget.style.boxShadow = "0 1px 6px rgba(0,0,0,0.06)";
            }}
          >
            {loading ? (
              <div
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: "50%",
                  border: `2px solid ${COLORS.border}`,
                  borderTopColor: COLORS.emerald,
                  animation: "spin 0.7s linear infinite",
                }}
              />
            ) : (
              <GoogleIcon />
            )}
            {loading ? "Signing you in..." : "Continue with Google"}
          </button>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              margin: "2rem 0",
            }}
          >
            <div style={{ flex: 1, height: 1, background: COLORS.border }} />
            <span
              style={{
                fontFamily: "sans-serif",
                fontSize: 12,
                color: COLORS.muted,
              }}
            >
              secure sign-in
            </span>
            <div style={{ flex: 1, height: 1, background: COLORS.border }} />
          </div>

          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}
          >
            {[
              ["🔒", "Encrypted", "Your data is safe"],
              ["✦", "FUOYE Official", "Authorised platform"],
              ["⊙", "Google Auth", "No passwords needed"],
              ["◎", "Instant Access", "One click sign-in"],
            ].map(([icon, title, sub]) => (
              <div
                key={title}
                style={{
                  background: COLORS.softGreen,
                  borderRadius: 10,
                  padding: "12px 14px",
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 11,
                    color: COLORS.emerald,
                    margin: "0 0 3px",
                    fontWeight: 700,
                  }}
                >
                  {icon} {title}
                </p>
                <p
                  style={{
                    fontFamily: "sans-serif",
                    fontSize: 11,
                    color: COLORS.muted,
                    margin: 0,
                  }}
                >
                  {sub}
                </p>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: "center",
              color: COLORS.muted,
              fontSize: 12,
              fontFamily: "sans-serif",
              marginTop: "2rem",
              lineHeight: 1.6,
            }}
          >
            By signing in you agree to FUOYE&apos;s{" "}
            <span style={{ color: COLORS.emerald, cursor: "pointer" }}>
              Terms of Service
            </span>{" "}
            and{" "}
            <span style={{ color: COLORS.emerald, cursor: "pointer" }}>
              Privacy Policy
            </span>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
