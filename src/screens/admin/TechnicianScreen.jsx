import { useState } from "react";
import { C, card } from "../../constants";
import { PageHeader, StatCard } from "../../components/UI";
import { TECHS, ACTIONS } from "../../data/mockData";

const statusStyle = {
  "On Assignment": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
  "Available":     { bg: "#E6F4EC", color: "#27AE60", border: "#A8D5B5" },
  "Leave":         { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};

const actionStatusStyle = {
  "Overdue":            { bg: "#FDECEA", color: "#C0392B", border: "#F5B7B1" },
  "Scheduled":          { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  "Pending Assignment": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
};

const typeColors = {
  "Inspection":       { bg: "#EFF6FF", color: "#2563EB" },
  "Renewal":          { bg: "#F0FDF4", color: "#27AE60" },
  "Defect Follow-up": { bg: "#FEF2F2", color: "#C0392B" },
};

function ScheduleDrawer({ tech, onClose }) {
  const jobs = ACTIONS.filter(a => a.tech === tech.name);
  const groups = [...new Set(ACTIONS.map(a => a.group))].filter(g => jobs.some(j => j.group === g));
  const ss = statusStyle[tech.status] || statusStyle["Leave"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200, display: "flex", justifyContent: "flex-end" }}
      onClick={onClose}>
      <div style={{ width: 500, background: C.white, height: "100%", overflowY: "auto", boxShadow: "-4px 0 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "sticky", top: 0, background: C.white, zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 2 }}>{tech.name}</div>
            <div style={{ fontSize: 12, color: C.textSecondary }}>{tech.spec} · {tech.empId}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 24, lineHeight: 1, padding: 2, flexShrink: 0 }}>×</button>
        </div>

        {/* Status bar */}
        <div style={{ padding: "12px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 5, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{tech.status}</span>
          <div style={{ fontSize: 12, color: C.textSecondary }}>{tech.phone}</div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>
            <span style={{ color: C.textPrimary }}>{tech.assigned}</span> assigned · <span style={{ color: C.green }}>{tech.completed}</span> completed
          </div>
        </div>

        {/* Schedule */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 18 }}>Upcoming Schedule</div>
          {jobs.length === 0 ? (
            <div style={{ fontSize: 13, color: C.textMuted, textAlign: "center", padding: "32px 0" }}>No upcoming jobs assigned</div>
          ) : (
            groups.map(group => (
              <div key={group} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{group}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {jobs.filter(j => j.group === group).map(j => {
                    const as2 = actionStatusStyle[j.status] || actionStatusStyle["Scheduled"];
                    const tc = typeColors[j.type] || { bg: "#F3F4F6", color: C.textPrimary };
                    return (
                      <div key={j.id} style={{ background: "#FAFAFA", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: tc.bg, color: tc.color }}>{j.type}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>{j.asset}</span>
                            <span style={{ fontSize: 11, color: C.textMuted }}>{j.assetType}</span>
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: as2.bg, color: as2.color, border: `1px solid ${as2.border}`, flexShrink: 0, whiteSpace: "nowrap" }}>{j.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 5 }}>{j.customer} · {j.site}</div>
                        <div style={{ fontSize: 12, color: C.textPrimary, lineHeight: 1.5, marginBottom: 7 }}>{j.desc}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>
                          Due: <span style={{ color: j.status === "Overdue" ? C.red : C.textSecondary, fontWeight: 600 }}>{j.due}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default function TechnicianScreen() {
  const [scheduleFor, setScheduleFor] = useState(null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <PageHeader title="Technician Management" subtitle="Field team overview and assignments" />
        <button style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)", flexShrink: 0, marginTop: 2 }}>
          + Add Technician
        </button>
      </div>
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <StatCard label="Total Technicians"  value="5" accent={C.blue}  />
        <StatCard label="On Assignment Today" value="3" accent={C.amber} />
        <StatCard label="Available"          value="2" accent={C.green} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {TECHS.map(t => {
          const ss = statusStyle[t.status] || statusStyle["Leave"];
          const pct = Math.round((t.completed / t.assigned) * 100);
          return (
            <div key={t.id} style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: C.red, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>{t.id}</div>
              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10 }}>{t.empId}</div>
              <span style={{ background: "#1C1C1E", color: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{t.spec}</span>
              <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 12 }}>{t.phone}</div>
              <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 5, padding: "3px 10px", fontSize: 11, fontWeight: 600, marginBottom: 16 }}>{t.status}</span>
              <div style={{ width: "100%", marginBottom: 8 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: C.textSecondary, marginBottom: 5 }}>
                  <span>Jobs This Month</span>
                  <span style={{ color: C.textMuted }}>{pct}%</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: C.textPrimary, fontWeight: 500, marginBottom: 8 }}>
                  <span>Assigned: <strong>{t.assigned}</strong></span>
                  <span>Completed: <strong style={{ color: t.completed === t.assigned ? C.green : C.textPrimary }}>{t.completed}</strong></span>
                </div>
                <div style={{ height: 5, background: "#E5E7EB", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: C.red, borderRadius: 3 }} />
                </div>
              </div>
              <button onClick={() => setScheduleFor(t)} style={{ marginTop: 8, width: "100%", padding: "8px", background: "none", color: C.red, border: `1.5px solid rgba(192,57,43,0.3)`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                View Schedule
              </button>
            </div>
          );
        })}
      </div>

      {scheduleFor && <ScheduleDrawer tech={scheduleFor} onClose={() => setScheduleFor(null)} />}
    </div>
  );
}
