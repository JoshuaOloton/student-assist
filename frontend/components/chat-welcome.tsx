import { Sparkles } from "lucide-react";
import AppSparkles from "./app-sparkles";

const ChatWelcome = () => {
  return (
    <div className="flex flex-col items-center w-full justify-center gap-4">
      <AppSparkles />
      <p>Welcome to the chat!</p>
    </div>
  )
}

export default ChatWelcome