import { useState } from "react";
import { C, card } from "../../constants";
import { Badge, PageHeader, StatCard, Sel } from "../../components/UI";
import { DEFECTS } from "../../data/mockData";

export default function DefectsScreen() {
  const [siteF, setSiteF] = useState("all");
  const [statusF, setStatusF] = useState("all");

  const filtered = DEFECTS.filter(d => {
    if (siteF !== "all" && !d.site.toLowerCase().includes(siteF)) return false;
    if (statusF !== "all" && d.status !== statusF) return false;
    return true;
  });

  const siteOpts   = [{ value:"all",label:"All Sites" },{ value:"suntec",label:"Suntec City Tower 1" },{ value:"raffles",label:"Raffles Hospital" },{ value:"parkway",label:"Parkway Parade" }];
  const statusOpts = [{ value:"all",label:"All Statuses" },{ value:"Open",label:"Open" },{ value:"In Progress",label:"In Progress" },{ value:"Closed",label:"Closed" }];

  return (
    <div>
      <PageHeader title="Defects" subtitle="Track and monitor all defect reports" />
      <div style={{ display: "flex", gap: 16, marginBottom: 24 }}>
        <StatCard label="Open Defects"      value="3" accent={C.red}   />
        <StatCard label="In Progress"        value="2" accent={C.amber} />
        <StatCard label="Closed This Month" value="7" accent={C.green} />
      </div>
      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center" }}>
        <Sel value={siteF}   onChange={setSiteF}   options={siteOpts} />
        <Sel value={statusF} onChange={setStatusF} options={statusOpts} />
        <span style={{ marginLeft: "auto", color: C.textSecondary, fontSize: 13 }}>{filtered.length} defects</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {filtered.map(d => (
          <div key={d.id} style={{ ...card, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "13px 20px", borderBottom: `1px solid ${C.border}`, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 700, fontSize: 13, color: C.textPrimary }}>{d.id}</span>
              <div style={{ width: 1, height: 14, background: C.border }} />
              <span style={{ fontWeight: 700, fontSize: 13, color: C.red }}>{d.assetId}</span>
              <span style={{ fontSize: 12, color: C.textSecondary }}>{d.assetType}</span>
              <div style={{ width: 1, height: 14, background: C.border }} />
              <span style={{ fontSize: 12, color: C.textSecondary }}>{d.site}</span>
              <div style={{ marginLeft: "auto" }}><Badge status={d.status} /></div>
            </div>
            <div style={{ padding: "16px 20px", display: "flex", gap: 20, alignItems: "flex-start" }}>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: 14, color: C.textPrimary, lineHeight: 1.6, marginBottom: 16 }}>{d.desc}</p>
                <div style={{ display: "flex", gap: 28, flexWrap: "wrap" }}>
                  <div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Reported</div>
                    <div style={{ fontSize: 13, color: C.textPrimary }}>{d.reported}</div>
                  </div>
                  <div>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>Assigned To</div>
                    <div style={{ fontSize: 13, color: C.textPrimary }}>{d.tech}</div>
                  </div>
                </div>
                {d.status === "Closed" && (
                  <div style={{ marginTop: 14, padding: "10px 14px", background: C.greenBg, borderRadius: 6, border: `1px solid ${C.greenBorder}` }}>
                    <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>✓ Digitally signed off by {d.closedBy} on {d.closedOn}</div>
                  </div>
                )}
              </div>
              <div style={{ flexShrink: 0 }}>
                <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>Photo Evidence</div>
                <div style={{ width: 136, height: 92, background: "#F3F4F6", borderRadius: 6, border: `1.5px dashed ${C.border}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>
                  <span style={{ fontSize: 10, color: C.textMuted }}>Photo attached</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
