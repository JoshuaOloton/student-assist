import { GraduationCap, User } from "lucide-react";

type MessageBubbleProps = {
  content: string;
  role: "user" | "ai";
  timestamp: Date;
};

const MessageBubble = ({ content, role, timestamp }: MessageBubbleProps) => {
  return (
    <div className={`flex gap-3 ${role === "user" ? "flex-row-reverse" : "flex-row"}`}>
      <div className="rounded-full h-8 w-8 bg-border flex items-center justify-center p-2">
        {role === "user" ? (
          <User/>
        ) : (
          <GraduationCap className="text-primary" />
        )}
      </div>
      <div className="max-w-1/2">
        <div className={`${role === "user" ? "bg-primary text-white rounded-tr-xs" : "bg-white text-primary border border-primary rounded-tl-xs"} rounded-2xl p-2`}>{content}</div>
        <span className="text-xs text-muted-foreground">
          {timestamp.toLocaleTimeString().slice(0, 5)}
        </span>
      </div>
    </div>
  );
};

export default MessageBubble;
