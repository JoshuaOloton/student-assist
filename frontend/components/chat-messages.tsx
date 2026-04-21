"use client";

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message } from "@/app/page";
import { useState } from "react";
import MessageBubble from "./message-bubble";
import { GraduationCap } from "lucide-react";



function TypingIndicator() {
  return (
    <div className="flex items-start gap-3 py-2">
      <Avatar className="size-8 shrink-0 border border-primary/20">
        <AvatarFallback className="bg-primary/10 text-primary">
          <GraduationCap className="size-4" />
        </AvatarFallback>
      </Avatar>
      <div className="flex items-center gap-1.5 rounded-2xl rounded-tl-xs bg-white px-4 py-3 border border-primary/20">
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:0ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:150ms]" />
        <span className="size-2 animate-bounce rounded-full bg-muted-foreground/60 [animation-delay:300ms]" />
      </div>
    </div>
  )
}


type ChatMessagesProps = {
  messages: Message[]
}

const ChatMessages = ({ messages }: ChatMessagesProps) => {
  
  return (
    console.log("Rendering ChatMessages with messages:", messages),
    <div className="mt-5">
      {messages.map(message => (
        <MessageBubble 
          key={message.id} 
          content={message.content} 
          role={message.role} 
          timestamp={message.timestamp}
        />
      ))}
      {/* <TypingIndicator /> */}
    </div>
  )
}

export default ChatMessages