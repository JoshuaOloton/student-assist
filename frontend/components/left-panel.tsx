import { COLORS } from "@/lib/constants"
import { GraduationCap } from "lucide-react"


const LeftPanel = () => {
  return (
    <div className="flex-1 bg-[#1a4731] hidden md:flex flex-col justify-center py-16 px-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-white rounded-[50%] top-1/2 left-1/2 -translate-1/2"
              style={{
                width: 80 + i * 60,
                height: 80 + i * 60,
              }}
            />
          ))}
        </div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-12">
            <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center ">
              <GraduationCap />
            </div>
            <div>
              <p className="text-white/60 tracking-wider text-xs uppercase m-0 font-[sans-serif]">Federal University</p>
              <p className="text-white font-bold m-0 font-[sans-serif]">Oye-Ekiti</p>
            </div>
          </div>
          <h1 className="text-white text-5xl leading-14 m-0 mb-6 -tracking-tighter">
            Your campus,
            <br />
            <em style={{ color: COLORS.mint }}>intelligently</em>
            <br />
            simplified.
          </h1>
          <p className="text-white/60 text-[1.05rem] leading-7 max-w-96 font-[sans-serif] font-light">
            FUOYE&apos;s AI-powered platform supports both students and
            administrators, offering an interactive chat assistant for student
            questions on admissions, fees, courses, and campus life, alongside a
            dedicated enquiry management interface for university staff to
            review and respond efficiently.
          </p>
          <div className="flex gap-8 mt-12">
            {[
              ["5K+", "Students"],
              ["10+", "Departments"],
              ["24/7", "Availability"],
            ].map(([num, label]) => (
              <div key={label}>
                <p className="text-white text-2xl m-0 font-bold font-[sans-serif]">
                  {num}
                </p>
                <p className="text-white/60 text-xs m-0 font-[sans-serif] leading-3">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
  )
}

export default LeftPanel