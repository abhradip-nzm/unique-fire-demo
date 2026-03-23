import { useState } from "react";
import { C, card } from "../../constants";
import { PageHeader, Sel, TH } from "../../components/UI";
import { AUDIT_DL } from "../../data/mockData";

export default function AuditPackScreen() {
  const [site, setSite] = useState("tower1");
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  const siteOpts = [{ value:"tower1",label:"Suntec City Tower 1" },{ value:"raffles",label:"Raffles Hospital" },{ value:"parkway",label:"Parkway Parade" }];

  const checklist = [
    { ok: true,  label: "All Valid Certificates",             count: "24 documents" },
    { ok: true,  label: "Service Logbook Entries",            count: "18 entries"   },
    { ok: true,  label: "Defect Reports with Photo Evidence", count: "5 reports"    },
    { ok: true,  label: "Defect Closure Sign-offs",           count: "3 closures"   },
    { ok: true,  label: "Asset Register",                     count: "48 assets"    },
    { ok: false, label: "Certificates Pending Renewal",       count: "2 certificates", warning: "EXTING-012 and SPRINK-012 require renewal before audit submission." },
  ];

  const handle = () => {
    setGenerating(true);
    setTimeout(() => { setGenerating(false); setGenerated(true); }, 1800);
  };

  return (
    <div>
      <PageHeader title="Audit Pack" subtitle="Generate and download compliance documentation" />
      <div style={{ display: "flex", gap: 20, alignItems: "flex-start", flexWrap: "wrap" }}>
        <div style={{ flex: 2, minWidth: 300 }}>
          <div style={{ ...card, marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 10 }}>Select Site</div>
            <Sel value={site} onChange={v => { setSite(v); setGenerated(false); }} options={siteOpts} style={{ width: "100%" }} />
          </div>
          <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Pack Contents</div>
              <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>{siteOpts.find(s2 => s2.value === site)?.label}</div>
            </div>
            {checklist.map((item, i) => (
              <div key={i} style={{ padding: "12px 18px", borderBottom: i < checklist.length - 1 ? `1px solid ${C.border}` : "none", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, background: item.ok ? C.greenBg : C.amberBg, border: `1.5px solid ${item.ok ? C.greenBorder : C.amberBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: item.ok ? C.green : C.amber, fontWeight: 700, marginTop: 1 }}>
                  {item.ok ? "✓" : "!"}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                    <span style={{ fontSize: 13, color: C.textPrimary, fontWeight: 500 }}>{item.label}</span>
                    <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: item.ok ? C.greenBg : C.amberBg, color: item.ok ? C.green : C.amber }}>{item.count}</span>
                  </div>
                  {item.warning && <div style={{ fontSize: 12, color: C.amber, marginTop: 5, fontWeight: 500 }}>⚠ {item.warning}</div>}
                </div>
              </div>
            ))}
          </div>
          <div style={{ ...card }}>
            <button onClick={handle} disabled={generating} style={{ width: "100%", padding: "13px", background: generating ? "#9B2335" : C.red, color: "#fff", border: "none", borderRadius: 7, fontSize: 15, fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", fontFamily: "inherit", boxShadow: generating ? "none" : "0 4px 14px rgba(192,57,43,0.28)", transition: "background 0.15s", display: "flex", alignItems: "center", justifyContent: "center", gap: 10 }}>
              {generating ? "Generating…" : generated ? (
                <>✓ Audit Pack Generated</>
              ) : (
                <>
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
                    <polyline points="7 10 12 15 17 10"/>
                    <line x1="12" y1="15" x2="12" y2="3"/>
                  </svg>
                  Generate Audit Pack
                </>
              )}
            </button>
            {generated && (
              <div style={{ marginTop: 12, padding: "10px 12px", background: C.greenBg, borderRadius: 6, border: `1px solid ${C.greenBorder}` }}>
                <div style={{ fontSize: 12, color: C.green, fontWeight: 600 }}>✓ Pack ready — available in Recent Downloads below</div>
              </div>
            )}
            <div style={{ marginTop: 14, fontSize: 12, color: C.textMuted }}>
              Last generated: <span style={{ color: C.textSecondary, fontWeight: 500 }}>3 Jan 2025</span> by <span style={{ color: C.textSecondary, fontWeight: 500 }}>Ng Wei Ling</span>
            </div>
          </div>
        </div>
        <div style={{ flex: 3, minWidth: 300 }}>
          <div style={{ ...card, padding: 0, overflow: "hidden", marginBottom: 16 }}>
            <div style={{ padding: "13px 18px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: C.textPrimary }}>Recent Downloads</div>
              <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>Previously generated audit packs</div>
            </div>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead><tr>{["Date","Site","Generated By","Reference",""].map((h,i) => <TH key={i}>{h}</TH>)}</tr></thead>
              <tbody>
                {AUDIT_DL.map((d, i) => (
                  <tr key={i} style={{ borderBottom: i < AUDIT_DL.length - 1 ? `1px solid ${C.border}` : "none" }}>
                    <td style={{ padding: "12px 14px", color: C.textPrimary, fontWeight: 500, whiteSpace: "nowrap" }}>{d.date}</td>
                    <td style={{ padding: "12px 14px", color: C.textSecondary }}>{d.site}</td>
                    <td style={{ padding: "12px 14px", color: C.textSecondary }}>{d.by}</td>
                    <td style={{ padding: "12px 14px", color: C.textMuted, fontSize: 11, fontFamily: "monospace" }}>{d.ref}</td>
                    <td style={{ padding: "12px 14px" }}>
                      <button style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 5, padding: "4px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Download</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div style={{ ...card, background: "#F8FAFF", border: `1px solid ${C.blueBorder}` }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <div style={{ width: 30, height: 30, borderRadius: 7, background: C.blueBg, border: `1px solid ${C.blueBorder}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={C.blue} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
              </div>
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.blue, marginBottom: 5 }}>What's included in your Audit Pack?</div>
                <div style={{ fontSize: 12, color: C.textSecondary, lineHeight: 1.7 }}>Your audit pack is a digitally signed PDF bundle containing all certificates, service records, defect reports, and your asset register — formatted for submission to SCDF or your appointed fire safety manager.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
