import { GraduationCap, User } from "lucide-react";

type MessageBubbleProps = {
  content: string;
  role: "user" | "ai";
  timestamp: Date;
};

const MessageBubble = ({ content, role, timestamp }: MessageBubbleProps) => {
  return (
    <div className="flex flex-row-reverse gap-3">
      <div className="rounded-full h-8 w-8 bg-border flex items-center justify-center p-2">
        {role === "user" ? (
          <User/>
        ) : (
          <GraduationCap className="text-primary" />
        )}
      </div>
      <div>
        <div className="bg-primary text-white rounded-2xl rounded-tr-xs p-2">{content}</div>
        <span className="text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString().slice(0, 5)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
