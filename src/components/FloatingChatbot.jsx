import { useState, useEffect, useRef } from "react";
import { C } from "../constants";

const BOT_REPLY = "Thank you for reaching out. Your Unique Fire coordinator will follow up with you shortly.";
const CHIPS = ["Check my certificates", "View upcoming renewals", "Report a defect"];

export default function FloatingChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: "bot", text: "Hi! I'm your Unique Fire compliance assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [chipsVisible, setChipsVisible] = useState(true);
  const [typing, setTyping] = useState(false);
  const chatBodyRef = useRef(null);

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, typing]);

  const sendMsg = (text) => {
    if (!text.trim()) return;
    setMessages(m => [...m, { from: "user", text }]);
    setChipsVisible(false);
    setInput("");
    setTyping(true);
    setTimeout(() => {
      setTyping(false);
      setMessages(m => [...m, { from: "bot", text: BOT_REPLY }]);
    }, 800);
  };

  return (
    <>
      {open && (
        <div style={{ position: "fixed", bottom: 96, right: 24, width: 320, height: 420, borderRadius: 12, boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 0 0 1px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", overflow: "hidden", zIndex: 9999, fontFamily: "'Inter', sans-serif" }}>
          {/* Header */}
          <div style={{ background: "#1C1C1E", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 30, height: 30, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 10, fontWeight: 700, flexShrink: 0 }}>UF</div>
              <span style={{ color: "#fff", fontWeight: 700, fontSize: 14 }}>Unique Fire Assistant</span>
            </div>
            <button onClick={() => setOpen(false)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.7)", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 2 }}>×</button>
          </div>

          {/* Body */}
          <div ref={chatBodyRef} style={{ flex: 1, overflowY: "auto", padding: "14px 12px", background: C.lightGrey, display: "flex", flexDirection: "column", gap: 10 }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.from === "user" ? "flex-end" : "flex-start" }}>
                <div style={{ maxWidth: "80%", background: m.from === "user" ? C.red : C.white, color: m.from === "user" ? "#fff" : C.textPrimary, borderRadius: m.from === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px", padding: "9px 12px", fontSize: 13, lineHeight: 1.5, boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  {m.text}
                </div>
              </div>
            ))}
            {typing && (
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
                <div style={{ background: C.white, borderRadius: "12px 12px 12px 2px", padding: "10px 14px", boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {[0, 1, 2].map(d => (
                      <div key={d} style={{ width: 6, height: 6, borderRadius: "50%", background: C.textMuted, animation: `uf-bounce 1s ease ${d * 0.15}s infinite` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {chipsVisible && messages.length === 1 && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
                {CHIPS.map(chip => (
                  <button key={chip} onClick={() => sendMsg(chip)} style={{ background: C.white, color: C.red, border: `1.5px solid rgba(192,57,43,0.25)`, borderRadius: 20, padding: "5px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>
                    {chip}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          <div style={{ background: C.white, borderTop: `1px solid ${C.border}`, padding: "10px 12px", display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter") sendMsg(input); }}
              placeholder="Type your message..."
              style={{ flex: 1, border: `1px solid ${C.border}`, borderRadius: 20, padding: "7px 14px", fontSize: 13, color: C.textPrimary, fontFamily: "inherit", outline: "none", background: C.lightGrey }}
            />
            <button onClick={() => sendMsg(input)} style={{ width: 34, height: 34, borderRadius: "50%", background: C.red, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"/>
                <polygon points="22 2 15 22 11 13 2 9 22 2"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Float button */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{ position: "fixed", bottom: 24, right: 24, width: 56, height: 56, borderRadius: "50%", background: C.red, border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 4px 16px rgba(192,57,43,0.45)", zIndex: 9999, transition: "background 0.15s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "#A93226"; }}
        onMouseLeave={e => { e.currentTarget.style.background = C.red; }}
      >
        {open
          ? <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
          : <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/></svg>
        }
      </button>

      <style>{`
        @keyframes uf-bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40%            { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
