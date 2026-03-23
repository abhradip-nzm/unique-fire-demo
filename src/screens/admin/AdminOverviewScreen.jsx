import { C, card } from "../../constants";
import { Badge, PageHeader, StatCard, TH } from "../../components/UI";
import { CUSTOMERS, OPEN_DEFECTS_ADMIN, EXPIRING_CERTS } from "../../data/mockData";

export default function AdminOverviewScreen() {
  return (
    <div>
      <PageHeader title="Overview" subtitle="Unique Fire — All Customer Accounts" />
      <div style={{ display: "flex", gap: 14, marginBottom: 24, flexWrap: "wrap" }}>
        <StatCard label="Total Customers"         value="5"   accent={C.blue}  />
        <StatCard label="Assets Under Management" value="534" accent={C.blue}  />
        <StatCard label="Compliant Sites"         value="12"  accent={C.green} />
        <StatCard label="Due This Month"          value="8"   accent={C.amber} />
        <StatCard label="Overdue"                 value="3"   accent={C.red}   />
      </div>

      <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 20 }}>
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Customer Accounts</div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>All active managed accounts</div>
          </div>
          <span style={{ fontSize: 12, color: C.textMuted }}>5 accounts</span>
        </div>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr>{["Customer Name","Sites","Total Assets","Compliant","Overdue","Next Action Due","Account Status",""].map(h => <TH key={h}>{h}</TH>)}</tr>
            </thead>
            <tbody>
              {CUSTOMERS.map((c, i) => (
                <tr key={c.id} style={{ borderBottom: i < CUSTOMERS.length - 1 ? `1px solid ${C.border}` : "none" }}>
                  <td style={{ padding: "13px 14px" }}>
                    <div style={{ fontWeight: 600, color: C.textPrimary }}>{c.name}</div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>FM: {c.fm}</div>
                  </td>
                  <td style={{ padding: "13px 14px", color: C.textPrimary, fontWeight: 500 }}>{c.sites}</td>
                  <td style={{ padding: "13px 14px", color: C.textPrimary, fontWeight: 500 }}>{c.assets}</td>
                  <td style={{ padding: "13px 14px", color: C.green, fontWeight: 600 }}>{c.compliant}</td>
                  <td style={{ padding: "13px 14px", color: c.overdue > 0 ? C.red : C.textMuted, fontWeight: 600 }}>{c.overdue}</td>
                  <td style={{ padding: "13px 14px", color: c.overdue > 0 ? C.red : C.textSecondary, fontWeight: c.overdue > 0 ? 600 : 400, whiteSpace: "nowrap" }}>{c.nextAction}</td>
                  <td style={{ padding: "13px 14px" }}><Badge status={c.status} /></td>
                  <td style={{ padding: "13px 14px" }}>
                    <button style={{ background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "4px 12px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>View</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        <div style={{ ...card, flex: 1, minWidth: 300, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.red }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Open Defects Across All Sites</div>
          </div>
          {OPEN_DEFECTS_ADMIN.map((d, i) => (
            <div key={i} style={{ padding: "12px 18px", borderBottom: i < OPEN_DEFECTS_ADMIN.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: C.red }}>{d.asset}</span>
                  <span style={{ fontSize: 11, color: C.textSecondary }}>{d.type}</span>
                </div>
                <div style={{ fontSize: 12, color: C.textPrimary, marginBottom: 3, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{d.desc}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{d.customer}</div>
              </div>
              <Badge status={d.status} />
            </div>
          ))}
        </div>

        <div style={{ ...card, flex: 1, minWidth: 300, padding: 0, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: C.amber }} />
            <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Certificate Expiry This Month</div>
          </div>
          {EXPIRING_CERTS.map((c, i) => (
            <div key={i} style={{ padding: "12px 18px", borderBottom: i < EXPIRING_CERTS.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", alignItems: "center", gap: 12 }}>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                  <span style={{ fontWeight: 700, fontSize: 12, color: C.red }}>{c.asset}</span>
                  <span style={{ fontSize: 11, padding: "1px 7px", borderRadius: 4, background: c.daysLeft === 0 ? C.redBg : c.daysLeft < 30 ? C.amberBg : "#F3F4F6", color: c.daysLeft === 0 ? C.red : c.daysLeft < 30 ? C.amber : C.textSecondary, fontWeight: 600 }}>
                    {c.daysLeft === 0 ? "Expired" : `${c.daysLeft}d left`}
                  </span>
                </div>
                <div style={{ fontSize: 12, color: C.textPrimary, marginBottom: 2 }}>Expires {c.expiry}</div>
                <div style={{ fontSize: 11, color: C.textMuted }}>{c.customer}</div>
              </div>
              <button style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 5, padding: "4px 11px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", flexShrink: 0 }}>Action</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
