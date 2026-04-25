"use client";

// import { ComponentExample } from "@/components/component-example";

import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import ChatWelcome from "@/components/chat-welcome";
import { Sparkle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/header";

export interface Message {
  id: string;
  content: string;
  role: "user" | "ai";
  timestamp: Date;
}

export default function Page() {
  const [hasMessages, setHasMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [query, setQuery] = useState<string>("");
  const [awaitingResponse, setAwaitingResponse] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages?.length) {
      try {
        const parsedMessages = JSON.parse(storedMessages).map((msg: any) => ({
          ...msg,
          timestamp: new Date(msg.timestamp)
        }));
        setMessages(parsedMessages);
        setHasMessages(parsedMessages.length > 0);
      } catch (e) {
        console.error("Failed to parse stored messages:", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (query.trim() === "") return;

    if (!hasMessages) {
      setHasMessages(true);
    }

    setError(null);
    setAwaitingResponse(true);

    const userMessage: Message = {
      id: crypto.randomUUID(),
      content: query,
      role: "user",
      timestamp: new Date()
    };

    setMessages(prevMessages => [...prevMessages, userMessage]);
    
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    axios.post(`${apiUrl}/chat`, { message: query })
      .then(response => {
        console.log("Received response:", response.data);
        const aiMessage: Message = {
          id: crypto.randomUUID(),
          content: response.data,
          role: "ai",
          timestamp: new Date()
        };
        setMessages(prevMessages => [...prevMessages, aiMessage]);
        setAwaitingResponse(false);
      })
      .catch(error => {
        console.error("Error sending message:", error);
        setError("Failed to send message. Please try again.");
        setAwaitingResponse(false);
      });

    setQuery("");
  }
  
  return (
    <div className="flex flex-col flex-1 justify-between px-4">
      {/* <Header /> */}
      {hasMessages ? <ChatMessages messages={messages} /> : <ChatWelcome />}
      <ChatInput 
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onSend={sendMessage}
      />
    </div>
  );
}