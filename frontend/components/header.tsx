"use client";

import { COLORS } from "@/lib/constants";
import Image from "next/image";

const Header = () => {

  return (
    <header
      style={{
        padding: "1rem 2rem",
        borderBottom: `1px solid ${COLORS.border}`,
        background: "white",
        display: "flex",
        alignItems: "center",
        gap: 12,
      }}
    >
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: 10,
          background: COLORS.softGreen,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Image src="/fuoye-logo.jpg" alt="FUOYE Logo" width={60} height={60} />
        {/* <GraduationCap /> */}
      </div>
      <div>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 15,
            fontWeight: 700,
            color: COLORS.charcoal,
            margin: 0,
          }}
        >
          FUOYE AI Chat
        </p>
        <p
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: COLORS.muted,
            margin: 0,
          }}
        >
          Student Enquiry Assistant
        </p>
      </div>
      <div
        style={{
          marginLeft: "auto",
          display: "flex",
          alignItems: "center",
          gap: 6,
        }}
      >
        <div
          style={{
            width: 8,
            height: 8,
            borderRadius: "50%",
            background: "#22c55e",
          }}
        />
        <span
          style={{
            fontFamily: "sans-serif",
            fontSize: 12,
            color: COLORS.muted,
          }}
        >
          Online
        </span>
      </div>
    </header>
  );
};

export default Header;
