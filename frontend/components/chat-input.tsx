"use client";

import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
  InputGroupText,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { SearchIcon, ArrowUp } from "lucide-react";

import { useState, useEffect } from "react";

type ChatInputProps = {
  query: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSend: () => void;
}

const ChatInput = ({ query, onChange, onSend }: ChatInputProps) => {


  return (
    <div className="p-5">
      <InputGroup>
        <InputGroupInput
          value={query}
          onChange={onChange}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          placeholder="Ask about admission, courses, fees..."
          className="text-sm"
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Send"
            onClick={onSend}
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatInput;
