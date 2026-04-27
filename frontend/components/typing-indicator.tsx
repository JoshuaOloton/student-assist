import { COLORS } from "@/lib/constants"

const TypingIndicator = () => {
  return (
    <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
      <div style={{ width: 30, height: 30, borderRadius: 8, background: COLORS.softGreen, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 14, color: COLORS.emerald }}>✦</span>
      </div>
      <div style={{ display: "flex", gap: 5, padding: "12px 16px", background: "white", borderRadius: "16px 16px 16px 4px", border: `1px solid ${COLORS.border}` }}>
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: COLORS.emerald,
              animation: `pulse 1s ease-in-out ${i * 0.2}s infinite`,
            }}
          />
        ))}
      </div>
    </div>
  )
}

export default TypingIndicator