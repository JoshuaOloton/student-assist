"use client";

// import { ComponentExample } from "@/components/component-example";

import ChatInput from "@/components/chat-input";
import ChatMessages from "@/components/chat-messages";
import ChatWelcome from "@/components/chat-welcome";
import { Sparkle, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

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

  useEffect(() => {
    const storedMessages = localStorage.getItem("messages");
    if (storedMessages) {
      setMessages(JSON.parse(storedMessages));
      setHasMessages(true);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("messages", JSON.stringify(messages));
  }, [messages]);

  const sendMessage = () => {
    if (query.trim() === "") return;
    
    if(!hasMessages) {
      setHasMessages(true);
    }

    setAwaitingResponse(true);

    setMessages(prevMessages => [...prevMessages, {
      id: crypto.randomUUID(),
      content: query,
      role: "user",
      timestamp: new Date()
    }])
    
    console.log("Sending message:", query);
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
      })
      .catch(error => {
        console.error("Error sending message:", error);
      });

    setQuery("");
    setAwaitingResponse(false);
  }
  
  return (
    <div className="flex flex-col flex-1 justify-between px-4">
      {hasMessages ? <ChatMessages messages={messages} /> : <ChatWelcome />}
      <ChatInput 
        query={query}
        onChange={(e) => setQuery(e.target.value)}
        onSend={sendMessage}
      />
    </div>
  );
}