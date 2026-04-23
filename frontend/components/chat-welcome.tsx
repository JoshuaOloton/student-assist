import { BookOpen, CalendarDays, DollarSign, GraduationCap, MapPin, Sparkles } from "lucide-react"
import AppSparkles from "./app-sparkles";


const ChatWelcome = () => {
  const welcomePaths = [
    {
      icon: BookOpen,
      title: "Explore Courses",
      text: "Browse available programs and decrees"
    },
    {
      icon: GraduationCap,
      title: "Admissions",
      text: "Application process and requirements"
    },
    {
      icon: DollarSign,
      title: "Fees & Scholarships",
      text: "Tuition, financial aid, and scholarship options"
    },
    {
      icon: CalendarDays,
      title: "Key deadlines",
      text: "Important dates and timelines"
    },
    {
      icon: MapPin,
      title: "Campus Tour",
      text: "Facilities, housing and campus information"
    }
  ]
  return (
    <div className="flex flex-col items-center w-full justify-center gap-4 py-5">
      <div className="flex flex-col items-center">
        <AppSparkles />
        <h4 className="font-bold text-2xl">Campus AI Assistant!</h4>
        <p className="text-center">Your AI-powered student enquiry assistant. Ask me anything about admissions, courses, fees, or campus life.</p>
      </div>
      <div className="border grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-md">
        {welcomePaths.map((path, index) => (
          <div key={index} className="flex items-center gap-4 p-4 border rounded-md mb-2">
            <div className="text-primary bg-light rounded-4xl p-2 flex items-center justify-center"><path.icon /></div>
            <div>
              <h5 className="font-bold">{path.title}</h5>
              <p className="text-sm text-secondary">{path.text}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ChatWelcome