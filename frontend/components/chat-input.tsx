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
  disabled?: boolean;
}

const ChatInput = ({ query, onChange, onSend, disabled = false }: ChatInputProps) => {


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
          disabled={disabled}
        />
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Send"
            onClick={onSend}
            disabled={disabled}
          >
            <ArrowUp />
          </InputGroupButton>
        </InputGroupAddon>
      </InputGroup>
    </div>
  );
};

export default ChatInput;
