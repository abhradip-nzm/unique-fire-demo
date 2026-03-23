import { useState } from "react";
import { C, card } from "../../constants";
import { Badge, PageHeader, Sel, TH } from "../../components/UI";
import { CLIENT_DATA } from "../../data/mockData";

const complianceStyle = {
  "Compliant":        { bg: "#E6F4EC", color: "#27AE60", border: "#A8D5B5" },
  "Attention Needed": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
  "Overdue":          { bg: "#FDECEA", color: "#C0392B", border: "#F5B7B1" },
};

export default function ClientManagementScreen() {
  const [search, setSearch] = useState("");
  const [statusF, setStatusF] = useState("all");
  const [drawer, setDrawer] = useState(null);

  const filtered = CLIENT_DATA.filter(c => {
    if (statusF !== "all" && c.status !== statusF) return false;
    if (search && !c.name.toLowerCase().includes(search.toLowerCase()) && !c.contact.name.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const statusOpts = [{ value: "all", label: "All Statuses" }, { value: "Active", label: "Active" }, { value: "Inactive", label: "Inactive" }];

  return (
    <div style={{ display: "flex", gap: 0, height: "100%" }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
          <PageHeader title="Client Management" subtitle="All registered customer accounts" />
          <button style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)", flexShrink: 0, marginTop: 2 }}>
            + Add New Client
          </button>
        </div>
        <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients or contacts…"
            style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textPrimary, background: C.white, fontFamily: "inherit", outline: "none", width: 240 }} />
          <Sel value={statusF} onChange={setStatusF} options={statusOpts} />
          <span style={{ marginLeft: "auto", color: C.textSecondary, fontSize: 13 }}>{filtered.length} clients</span>
        </div>
        <div style={{ ...card, padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>{["Client Name","Primary Contact","Email","Phone","Sites","Total Assets","Contract Renewal","Status","Actions"].map(h => <TH key={h}>{h}</TH>)}</tr>
              </thead>
              <tbody>
                {filtered.map((c, i) => {
                  const totalAssets = c.sites.reduce((s, x) => s + x.assets, 0);
                  return (
                    <tr key={c.id} style={{ borderBottom: i < filtered.length - 1 ? `1px solid ${C.border}` : "none" }}>
                      <td style={{ padding: "13px 14px" }}><div style={{ fontWeight: 700, color: C.textPrimary }}>{c.name}</div></td>
                      <td style={{ padding: "13px 14px", color: C.textPrimary }}>{c.contact.name}</td>
                      <td style={{ padding: "13px 14px", color: C.blue, fontSize: 12 }}>{c.contact.email}</td>
                      <td style={{ padding: "13px 14px", color: C.textSecondary, whiteSpace: "nowrap" }}>{c.contact.phone}</td>
                      <td style={{ padding: "13px 14px" }}>
                        <div style={{ fontWeight: 700, color: C.textPrimary }}>{c.sites.length} sites</div>
                        <div style={{ fontSize: 11, color: C.textMuted, marginTop: 2 }}>{c.sites[0].name}</div>
                      </td>
                      <td style={{ padding: "13px 14px", fontWeight: 600, color: C.textPrimary }}>{totalAssets}</td>
                      <td style={{ padding: "13px 14px", color: c.contract.renewalSoon ? C.amber : C.textSecondary, fontWeight: c.contract.renewalSoon ? 600 : 400, whiteSpace: "nowrap" }}>{c.contract.renewal}</td>
                      <td style={{ padding: "13px 14px" }}><Badge status={c.status} /></td>
                      <td style={{ padding: "13px 14px" }}>
                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => setDrawer(drawer?.id === c.id ? null : c)}
                            style={{ background: drawer?.id === c.id ? C.redBg : "#F3F4F6", color: drawer?.id === c.id ? C.red : C.textPrimary, border: `1px solid ${drawer?.id === c.id ? C.redBorder : C.border}`, borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>View</button>
                          <button style={{ background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {drawer && (
        <div style={{ width: 400, flexShrink: 0, marginLeft: 20, background: C.white, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)", overflowY: "auto", maxHeight: "calc(100vh - 108px)" }}>
          <div style={{ padding: "18px 20px", borderBottom: `1px solid ${C.border}`, position: "sticky", top: 0, background: C.white, zIndex: 2 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>{drawer.name}</div>
                <Badge status={drawer.status} />
              </div>
              <button onClick={() => setDrawer(null)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 20, lineHeight: 1, padding: 2 }}>×</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
              <div style={{ fontSize: 13, color: C.textPrimary, fontWeight: 600 }}>{drawer.contact.name}</div>
              <div style={{ fontSize: 12, color: C.blue }}>{drawer.contact.email}</div>
              <div style={{ fontSize: 12, color: C.textSecondary }}>{drawer.contact.phone}</div>
            </div>
          </div>

          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>Sites</div>
              <span style={{ background: C.blueBg, color: C.blue, border: `1px solid ${C.blueBorder}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{drawer.sites.length} Sites</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {drawer.sites.map((s, i) => {
                const cs = complianceStyle[s.compliance] || complianceStyle["Compliant"];
                return (
                  <div key={i} style={{ background: "#FAFAFA", border: `1px solid ${C.border}`, borderRadius: 7, padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                      <div style={{ fontWeight: 600, fontSize: 13, color: C.textPrimary }}>{s.name}</div>
                      <span style={{ background: cs.bg, color: cs.color, border: `1px solid ${cs.border}`, borderRadius: 4, padding: "2px 7px", fontSize: 10, fontWeight: 700, flexShrink: 0, marginLeft: 8 }}>{s.compliance}</span>
                    </div>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 6 }}>{s.address}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <span style={{ background: C.blueBg, color: C.blue, border: `1px solid ${C.blueBorder}`, borderRadius: 4, padding: "1px 7px", fontSize: 10, fontWeight: 600 }}>{s.assets} assets</span>
                      <span style={{ fontSize: 11, color: C.textMuted }}>Last serviced {s.lastServiced}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 12 }}>Contract</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em", marginBottom: 10 }}>{drawer.contract.value}</div>
            <div style={{ display: "flex", gap: 20 }}>
              <div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Start Date</div>
                <div style={{ fontSize: 13, color: C.textPrimary }}>{drawer.contract.start}</div>
              </div>
              <div>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Renewal Date</div>
                <div style={{ fontSize: 13, color: drawer.contract.renewalSoon ? C.amber : C.textPrimary, fontWeight: drawer.contract.renewalSoon ? 600 : 400 }}>{drawer.contract.renewal}</div>
              </div>
            </div>
            {drawer.contract.renewalSoon && (
              <div style={{ marginTop: 12, padding: "10px 12px", background: C.amberBg, border: `1px solid ${C.amberBorder}`, borderRadius: 6 }}>
                <div style={{ fontSize: 12, color: C.amber, fontWeight: 600 }}>⚠ Renewal due soon — please review contract</div>
              </div>
            )}
          </div>

          <div style={{ padding: "14px 20px", borderBottom: `1px solid ${C.border}` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>Open Defects</div>
              {drawer.openDefects === 0
                ? <span style={{ background: C.greenBg, color: C.green, border: `1px solid ${C.greenBorder}`, borderRadius: 4, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>No open defects</span>
                : <span style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 4, padding: "2px 10px", fontSize: 11, fontWeight: 700 }}>{drawer.openDefects} open</span>
              }
            </div>
          </div>

          <div style={{ padding: "16px 20px" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 14 }}>Service History</div>
            {drawer.serviceHistory.map((h, i, arr) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < arr.length - 1 ? 14 : 0 }}>
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, border: `2px solid #fff`, boxShadow: `0 0 0 1px ${C.green}`, marginTop: 2 }} />
                  {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, marginTop: 3 }} />}
                </div>
                <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 4 : 0 }}>
                  <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>{h.date} · {h.tech}</div>
                  <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 1 }}>{h.site}</div>
                  <div style={{ fontSize: 12, color: C.textPrimary, lineHeight: 1.4 }}>{h.action}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
