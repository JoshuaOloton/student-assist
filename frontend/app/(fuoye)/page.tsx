/* eslint-disable */

"use client";

import { useState, useEffect, useRef } from "react";
import { COLORS, QUICK_TOPICS } from "@/lib/constants";
import { Message } from "@/lib/types";
import { Responses } from "@/lib/responses";
import SuggestionCards from "@/components/suggestion-cards";
import TypingIndicator from "@/components/typing-indicator";


export default function Page() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // useEffect(() => {
  //   try {
  //     const storedMessages = localStorage.getItem("messages");
  //     if (!storedMessages) return;

  //     const parsed  = JSON.parse(storedMessages);
  //     if (Array.isArray(parsed)) {
  //       setMessages(parsed as Message[]);
  //     } else {
  //       console.warn("stored messages is not array type");
  //     }
  //   } catch (e) {
  //     console.error("Failed to parse stored messages:", e);
  //   }
  // }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = (key: string, query: string) => {
    const userMsg = query || input.trim();
    if (!userMsg) return;

    setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content: userMsg, timestamp: new Date() }]);

    setLoading(true);

    const delay = Math.floor(Math.random() * (10000 - 6000 + 1)) + 6000;

    setTimeout(() => {
      const options = Responses[key];

      let reply =
      !options || options.length === 0
        ? "Sorry, I don't have a response for that right now."
        : options[Math.floor(Math.random() * options.length)];
      
        setMessages((msg) => [...msg, { id: crypto.randomUUID(), role: "ai", content: reply, timestamp: new Date(), lastPrompt: key }]);

        setLoading(false);
    }, delay);
  }

  // const sendMessage = async (query: string) => {
  //   const userMsg = query || input.trim();
  //   if (!userMsg) return;
  //   setInput("");
  //   setMessages((m) => [...m, { id: crypto.randomUUID(), role: "user", content: userMsg, timestamp: new Date() }]);
  //   setLoading(true);


  //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  //   try {
  //     const res = await fetch(`${apiUrl}/chat`, {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify({
  //         message: userMsg
  //       }),
  //     });
  //     const data = await res.text();
  //     const reply = data || "I'm sorry, I couldn't process that. Please try again.";
  //     setMessages((msg) => [...msg, { id: crypto.randomUUID(), role: "ai", content: reply, timestamp: new Date() }]);
  //   } catch(e) {
  //     console.error("Error communicating with API:", e);
  //     setMessages((msg) => [...msg, { id: crypto.randomUUID(), role: "ai", content: "Connection error. Please check your network and try again.", timestamp: new Date() }]);
  //   }
  //   setLoading(false);
  // };

  const empty = messages.length === 0;

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", height: "100vh", background: COLORS.cream }}>

      {/* Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "2rem" }}>
        {empty ? (
          <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: 20,
                background: COLORS.softGreen,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 1.5rem",
              }}
            >
              <span style={{ fontSize: 32 }}>✦</span>
            </div>
            <h2 style={{ fontFamily: "'Georgia', serif", fontSize: "2rem", color: COLORS.charcoal, margin: "0 0 0.5rem", fontWeight: "normal" }}>
              Campus AI Assistant
            </h2>
            <p style={{ fontFamily: "sans-serif", fontSize: 14, color: COLORS.muted, maxWidth: 400, margin: "0 auto 2.5rem", lineHeight: 1.6 }}>
              Your AI-powered student enquiry assistant. Ask me anything about admissions, courses, fees, or campus life.
            </p>

            <div
              className=""
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 12,
                textAlign: "left",
                maxWidth: 580,
                margin: "0 auto",
              }}
            >
              {QUICK_TOPICS.map((t) => (
                <button
                  key={t.title}
                  onClick={() => sendMessage(t.title, t.prompt)}
                  style={{
                    background: "white",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: 12,
                    padding: "14px 16px",
                    cursor: "pointer",
                    textAlign: "left",
                    transition: "all 0.2s",
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.borderColor = COLORS.emerald; e.currentTarget.style.background = COLORS.softGreen; }}
                  onMouseLeave={(e) => { e.currentTarget.style.borderColor = COLORS.border; e.currentTarget.style.background = "white"; }}
                >
                  <span style={{ fontSize: 18, color: COLORS.emerald, marginTop: 2 }}>{t.icon}</span>
                  <div>
                    <p style={{ fontFamily: "sans-serif", fontSize: 13, fontWeight: 600, color: COLORS.charcoal, margin: "0 0 3px" }}>{t.title}</p>
                    <p style={{ fontFamily: "sans-serif", fontSize: 12, color: COLORS.muted, margin: 0, lineHeight: 1.4 }}>{t.sub}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: 700, margin: "0 auto", display: "flex", flexDirection: "column", gap: 16 }}>
            {messages.map((msg, i) => {
              const isUser = msg.role === "user";
              const isLastAssistant = !isUser && i === messages.length - 1 && !loading;

              return (
                <div key={i} className="flex flex-col">
                  <div
                    className={`flex gap-2.5 items-start ${msg.role === "user" ? "justify-end" : "justify-normal"}`}
                  >
                    {msg.role === "ai" && (
                      <div
                        style={{
                          width: 30,
                          height: 30,
                          borderRadius: 8,
                          background: COLORS.softGreen,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                          marginTop: 4,
                        }}
                      >
                        <span style={{ fontSize: 14, color: COLORS.emerald }}>✦</span>
                      </div>
                    )}
                    <div
                      style={{
                        maxWidth: "75%",
                        padding: "12px 16px",
                        borderRadius: msg.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                        background: msg.role === "user" ? COLORS.forest : "white",
                        color: msg.role === "user" ? "white" : COLORS.charcoal,
                        border: msg.role === "user" ? "none" : `1px solid ${COLORS.border}`,
                        fontFamily: "sans-serif",
                        fontSize: 14,
                        lineHeight: 1.6,
                        whiteSpace: "pre-wrap",
                      }}
                    >
                      {msg.content}
                    </div>
                  </div>
                  {isLastAssistant && (
                      <div className="chips mt-4">
                        <SuggestionCards usedPrompt={msg.lastPrompt} onSelect={sendMessage} />
                      </div>
                    )}
                </div>
                )
            })}
            {loading && <TypingIndicator />}
            <div ref={bottomRef} />
          </div>
        )}
        {/* Chips after the latest assistant reply */}
      </div>

      {/* Input */}
      <div style={{ padding: "12px 24px 18px", background: "white", borderTop: `1px solid ${COLORS.border}`, flexShrink: 0 }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "#f3f4f6", border: "1.5px solid #e5e7eb", borderRadius: 14, padding: "10px 14px", cursor: "not-allowed" }}>
            <span style={{ fontSize: 16, opacity: 0.35 }}>⌨</span>
            <span style={{ fontSize: 13, color: "#9ca3af", flex: 1, userSelect: "none" }}>
              Use the topic buttons above to continue the conversation
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 5, background: COLORS.lightGreen, border: `1px solid ${COLORS.border}`, borderRadius: 6, padding: "3px 8px" }}>
              <span style={{ fontSize: 11, color: COLORS.emerald, fontWeight: 600 }}>↑ scroll for options</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}