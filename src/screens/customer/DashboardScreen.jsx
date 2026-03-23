import { C, card } from "../../constants";
import { Badge, PageHeader, StatCard, TH } from "../../components/UI";
import { SITES, RECENT_ACTIVITY } from "../../data/mockData";

export default function DashboardScreen() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Suntec City Mall — Compliance Overview" />
      <div style={{ display: "flex", gap: 16, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard label="Total Assets"   value="48" accent={C.blue}  />
        <StatCard label="Compliant"      value="41" accent={C.green} />
        <StatCard label="Due This Month" value="5"  accent={C.amber} />
        <StatCard label="Overdue"        value="2"  accent={C.red}   />
      </div>
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ ...card, flex: 3, minWidth: 400, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Sites Overview</div>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>{["Site Name", "Total Assets", "Compliant", "Overdue", "Last Serviced", "Status"].map(h => <TH key={h}>{h}</TH>)}</tr>
            </thead>
            <tbody>
              {SITES.map((s, i) => (
                <tr key={s.id} style={{ borderBottom: i < SITES.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <td style={{ padding: "13px 14px" }}>
                    <div style={{ fontWeight: 600, color: C.textPrimary }}>{s.name}</div>
                    <div style={{ color: C.textMuted, fontSize: 11, marginTop: 2 }}>{s.address}</div>
                  </td>
                  <td style={{ padding: "13px 14px", color: C.textPrimary, fontWeight: 500 }}>{s.assets}</td>
                  <td style={{ padding: "13px 14px", color: C.green, fontWeight: 600 }}>{s.compliant}</td>
                  <td style={{ padding: "13px 14px", color: s.overdue > 0 ? C.red : C.textMuted, fontWeight: 600 }}>{s.overdue}</td>
                  <td style={{ padding: "13px 14px", color: C.textSecondary }}>{s.lastServiced}</td>
                  <td style={{ padding: "13px 14px" }}><Badge status={s.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ ...card, flex: 2, minWidth: 260, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Recent Activity</div>
          </div>
          {RECENT_ACTIVITY.map((a, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "12px 20px", borderBottom: i < RECENT_ACTIVITY.length - 1 ? `1px solid ${C.border}` : "none" }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: a.dot, flexShrink: 0, marginTop: 5 }} />
              <div>
                <div style={{ fontSize: 13, color: C.textPrimary, lineHeight: 1.45 }}>{a.text}</div>
                <div style={{ fontSize: 11, color: C.textMuted, marginTop: 4 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
