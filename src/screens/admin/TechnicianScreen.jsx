import { C, card } from "../../constants";
import { PageHeader, StatCard } from "../../components/UI";
import { TECHS } from "../../data/mockData";

const statusStyle = {
  "On Assignment": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
  "Available":     { bg: "#E6F4EC", color: "#27AE60", border: "#A8D5B5" },
  "Leave":         { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};

export default function TechnicianScreen() {
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
              <button style={{ marginTop: 8, width: "100%", padding: "8px", background: "none", color: C.red, border: `1.5px solid rgba(192,57,43,0.3)`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                View Schedule
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
