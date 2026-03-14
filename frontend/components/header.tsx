import AppLogo from "./app-logo"

const Header = () => {
  return (
    <div className="flex items-center gap-2">
      <AppLogo />
      <div>
        <h1 className="text-sm font-medium">FUOYE EduChat</h1>
        <p className="text-xs">Student Enquiry Assistant</p>
      </div>
    </div>
  )
}

export default Header