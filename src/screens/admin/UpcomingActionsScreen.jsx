import { useState } from "react";
import { C, card, TECH_COLORS, TECH_INITIALS } from "../../constants";
import { Badge, PageHeader, Sel, TechAvatar } from "../../components/UI";
import { ACTIONS } from "../../data/mockData";

export default function UpcomingActionsScreen() {
  const [custF, setCustF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [techF, setTechF] = useState("all");

  const custMap = { suntec: "Suntec", glen: "Gleneagles", capita: "CapitaLand", maple: "Mapletree", changi: "Changi" };

  const filtered = ACTIONS.filter(a => {
    if (custF !== "all" && !a.customer.includes(custMap[custF] || "")) return false;
    if (typeF !== "all" && a.type !== typeF) return false;
    if (techF !== "all" && a.tech !== techF) return false;
    return true;
  });

  const custOpts = [
    { value: "all",    label: "All Customers" },
    { value: "suntec", label: "Suntec City Mall" },
    { value: "glen",   label: "Gleneagles Hospital" },
    { value: "capita", label: "CapitaLand Portfolio" },
    { value: "maple",  label: "Mapletree Business City" },
    { value: "changi", label: "Changi Airport Group" },
  ];
  const typeOpts = [
    { value: "all",              label: "All Action Types" },
    { value: "Renewal",          label: "Renewal" },
    { value: "Inspection",       label: "Inspection" },
    { value: "Defect Follow-up", label: "Defect Follow-up" },
  ];
  const techOpts = [
    { value: "all", label: "All Technicians" },
    ...["Ahmad Razif","Tan Boon Kiat","Selvam Rajendran","Lim Chee Wah","Muthu Krishnan"].map(t => ({ value: t, label: t })),
  ];

  const groupMeta = {
    "This Week":  { color: C.red,   bg: C.redBg,   border: C.redBorder   },
    "Next Week":  { color: C.amber, bg: C.amberBg, border: C.amberBorder },
    "This Month": { color: C.blue,  bg: C.blueBg,  border: C.blueBorder  },
    "Next Month": { color: C.green, bg: C.greenBg, border: C.greenBorder },
  };
  const typeStyle = {
    "Renewal":          { color: C.blue,  bg: C.blueBg,  border: C.blueBorder,  emoji: "🔄" },
    "Inspection":       { color: C.green, bg: C.greenBg, border: C.greenBorder, emoji: "🔍" },
    "Defect Follow-up": { color: C.red,   bg: C.redBg,   border: C.redBorder,   emoji: "⚠️" },
  };

  const groups = ["This Week","Next Week","This Month","Next Month"]
    .map(g => ({ label: g, items: filtered.filter(a => a.group === g) }))
    .filter(g => g.items.length > 0);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <PageHeader title="Upcoming Actions" subtitle="Scheduled work and renewals for the next 90 days" />
        <button style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.28)", flexShrink: 0, marginTop: 2 }}>
          Export Schedule
        </button>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <Sel value={custF} onChange={setCustF} options={custOpts} />
        <Sel value={typeF} onChange={setTypeF} options={typeOpts} />
        <Sel value={techF} onChange={setTechF} options={techOpts} />
        <span style={{ marginLeft: "auto", color: C.textSecondary, fontSize: 13 }}>{filtered.length} action{filtered.length !== 1 ? "s" : ""}</span>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 24, flexWrap: "wrap" }}>
        {[
          { label: "Overdue",            count: filtered.filter(a => a.status === "Overdue").length,            color: C.red,   bg: C.redBg,   border: C.redBorder   },
          { label: "Pending Assignment", count: filtered.filter(a => a.status === "Pending Assignment").length, color: C.amber, bg: C.amberBg, border: C.amberBorder },
          { label: "Scheduled",          count: filtered.filter(a => a.status === "Scheduled").length,          color: C.green, bg: C.greenBg, border: C.greenBorder },
        ].map(chip => (
          <div key={chip.label} style={{ display: "flex", alignItems: "center", gap: 8, background: chip.bg, border: `1px solid ${chip.border}`, borderRadius: 7, padding: "7px 16px" }}>
            <span style={{ fontSize: 20, fontWeight: 700, color: chip.color, lineHeight: 1 }}>{chip.count}</span>
            <span style={{ fontSize: 12, color: chip.color, fontWeight: 600 }}>{chip.label}</span>
          </div>
        ))}
      </div>

      {groups.length === 0 ? (
        <div style={{ ...card, textAlign: "center", padding: "48px 24px", color: C.textMuted }}>No actions match the current filters.</div>
      ) : groups.map(group => {
        const meta = groupMeta[group.label];
        return (
          <div key={group.label} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <div style={{ background: meta.bg, border: `1px solid ${meta.border}`, borderRadius: 6, padding: "4px 14px", flexShrink: 0 }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: meta.color, textTransform: "uppercase", letterSpacing: "0.07em" }}>{group.label}</span>
              </div>
              <div style={{ flex: 1, height: 1, background: C.border }} />
              <span style={{ fontSize: 12, color: C.textMuted, flexShrink: 0 }}>{group.items.length} action{group.items.length !== 1 ? "s" : ""}</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {group.items.map(action => {
                const ts = typeStyle[action.type] || typeStyle["Inspection"];
                return (
                  <div key={action.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
                    <div style={{ display: "flex", alignItems: "stretch" }}>
                      <div style={{ width: 4, background: ts.color, flexShrink: 0 }} />
                      <div style={{ flex: 1, padding: "14px 18px", display: "flex", gap: 14, alignItems: "flex-start" }}>
                        <div style={{ fontSize: 18, flexShrink: 0, marginTop: 1, lineHeight: 1, width: 24, textAlign: "center" }}>{ts.emoji}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, fontWeight: 700, color: ts.color, background: ts.bg, border: `1px solid ${ts.border}`, borderRadius: 4, padding: "2px 8px" }}>{action.type}</span>
                            <span style={{ fontWeight: 700, fontSize: 12, color: C.red }}>{action.asset}</span>
                            <span style={{ fontSize: 12, color: C.textSecondary }}>{action.assetType}</span>
                          </div>
                          <div style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.55, marginBottom: 8 }}>{action.desc}</div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>
                            <span style={{ fontSize: 12, color: C.textMuted }}>{action.customer}</span>
                            <span style={{ color: C.border }}>·</span>
                            <span style={{ fontSize: 12, color: C.textMuted }}>{action.site}</span>
                          </div>
                        </div>
                        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, minWidth: 170 }}>
                          <Badge status={action.status} />
                          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <TechAvatar name={action.tech} size={26} />
                            <span style={{ fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>{action.tech}</span>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke={action.status === "Overdue" ? C.red : C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                              <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
                            </svg>
                            <span style={{ fontSize: 12, color: action.status === "Overdue" ? C.red : C.textSecondary, fontWeight: action.status === "Overdue" ? 600 : 400 }}>Due {action.due}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
