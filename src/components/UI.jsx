import { C, card } from "../constants";

// ─── NAV ICON ─────────────────────────────────────────────────────────────────
export const NavIcon = ({ type }) => {
  const p = { width: 16, height: 16, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2, strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "rect4")  return <svg {...p}><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>;
  if (type === "house")  return <svg {...p}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>;
  if (type === "warn")   return <svg {...p}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>;
  if (type === "doc")    return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>;
  if (type === "info")   return <svg {...p}><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>;
  if (type === "cal")    return <svg {...p}><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
  if (type === "clients") return <svg {...p}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>;
  if (type === "techs")   return <svg {...p}><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>;
  if (type === "forms")   return <svg {...p}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>;
  return null;
};

// ─── BADGE ────────────────────────────────────────────────────────────────────
export const Badge = ({ status }) => {
  const map = {
    Compliant:            { bg: C.greenBg,  color: C.green,         border: C.greenBorder },
    "Due Soon":           { bg: C.amberBg,  color: C.amber,         border: C.amberBorder },
    Overdue:              { bg: C.redBg,    color: C.red,           border: C.redBorder   },
    Open:                 { bg: C.redBg,    color: C.red,           border: C.redBorder   },
    "In Progress":        { bg: C.amberBg,  color: C.amber,         border: C.amberBorder },
    Closed:               { bg: C.greenBg,  color: C.green,         border: C.greenBorder },
    Active:               { bg: C.greenBg,  color: C.green,         border: C.greenBorder },
    "Attention Needed":   { bg: C.amberBg,  color: C.amber,         border: C.amberBorder },
    Critical:             { bg: C.redBg,    color: C.red,           border: C.redBorder   },
    Scheduled:            { bg: C.greenBg,  color: C.green,         border: C.greenBorder },
    "Pending Assignment": { bg: C.amberBg,  color: C.amber,         border: C.amberBorder },
    Inactive:             { bg: "#F3F4F6",  color: C.textSecondary, border: C.border      },
    Draft:                { bg: "#F3F4F6",  color: C.textSecondary, border: C.border      },
  };
  const s = map[status] || map.Compliant;
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, borderRadius: 5, padding: "3px 9px", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap" }}>
      {status}
    </span>
  );
};

// ─── PAGE HEADER ──────────────────────────────────────────────────────────────
export const PageHeader = ({ title, subtitle }) => (
  <div style={{ marginBottom: 24 }}>
    <h1 style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em" }}>{title}</h1>
    <p style={{ fontSize: 14, color: C.textSecondary, marginTop: 3 }}>{subtitle}</p>
  </div>
);

// ─── STAT CARD ────────────────────────────────────────────────────────────────
export const StatCard = ({ label, value, accent }) => (
  <div style={{ ...card, flex: 1, minWidth: 120 }}>
    <div style={{ fontSize: 11, color: C.textSecondary, fontWeight: 600, marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.07em" }}>{label}</div>
    <div style={{ fontSize: 34, fontWeight: 700, color: accent, letterSpacing: "-0.03em" }}>{value}</div>
  </div>
);

// ─── SELECT ───────────────────────────────────────────────────────────────────
export const Sel = ({ value, onChange, options, style = {} }) => (
  <select
    value={value}
    onChange={e => onChange(e.target.value)}
    style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textPrimary, background: C.white, cursor: "pointer", fontFamily: "inherit", outline: "none", ...style }}
  >
    {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
  </select>
);

// ─── TABLE HEADER CELL ────────────────────────────────────────────────────────
export const TH = ({ children }) => (
  <th style={{ padding: "10px 14px", textAlign: "left", color: C.textSecondary, fontWeight: 600, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.06em", borderBottom: `1px solid ${C.border}`, background: "#FAFAFA", whiteSpace: "nowrap" }}>
    {children}
  </th>
);

// ─── TECH AVATAR ─────────────────────────────────────────────────────────────
import { TECH_INITIALS, TECH_COLORS } from "../constants";

export const TechAvatar = ({ name, size = 26 }) => (
  <div style={{ width: size, height: size, borderRadius: "50%", background: TECH_COLORS[name] || C.blue, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: Math.floor(size * 0.38), fontWeight: 700, flexShrink: 0 }}>
    {TECH_INITIALS[name] || "??"}
  </div>
);

// ─── RED PRIMARY BUTTON ───────────────────────────────────────────────────────
export const RedButton = ({ children, onClick, style = {} }) => (
  <button
    onClick={onClick}
    style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)", ...style }}
  >
    {children}
  </button>
);
