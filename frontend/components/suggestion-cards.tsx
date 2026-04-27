import { COLORS, QUICK_TOPICS } from "@/lib/constants";


interface SuggestionCardsProps {
  usedPrompt?: string;
  onSelect: (key: string, query: string) => void;
}

// Suggestion chips shown after each AI reply — picks 4 that weren't just used
const SuggestionCards = ({ usedPrompt, onSelect }: SuggestionCardsProps) => {
  const cards = QUICK_TOPICS.filter((t) => t.prompt !== usedPrompt).slice(0, 4);

  return (
    <div style={{ marginTop: 10, paddingLeft: 38 }}>
      <p style={{ fontSize: 11, color: COLORS.muted, margin: "0 0 8px", fontFamily: "sans-serif", letterSpacing: "0.03em" }}>
        Continue with →
      </p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cards.map((c) => (
          <button key={c.title} onClick={() => onSelect(c.title, c.prompt)}
            onMouseEnter={(e) => { e.currentTarget.style.background = COLORS.forest; e.currentTarget.style.color = "white"; e.currentTarget.style.borderColor = COLORS.forest; }}
            onMouseLeave={(e) => { e.currentTarget.style.background = "white"; e.currentTarget.style.color = COLORS.charcoal; e.currentTarget.style.borderColor = COLORS.border; }}
            style={{ display: "flex", alignItems: "center", gap: 6, padding: "7px 13px", background: "white", border: `1px solid ${COLORS.border}`, borderRadius: 20, fontSize: 12, fontWeight: 500, color: COLORS.charcoal, cursor: "pointer", fontFamily: "sans-serif", transition: "all 0.18s", opacity: 1 }}>
            <span style={{ fontSize: 13 }}>{c.icon}</span>
            {c.title}
          </button>
        ))}
      </div>
    </div>
  );
}

export default SuggestionCards