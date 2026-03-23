import { useState } from "react";
import { C, card } from "../../constants";
import { Badge, Sel, TH } from "../../components/UI";
import { ASSETS, DEFECTS, DEFECT_MAP, getHistory } from "../../data/mockData";

const DlIcon = () => (
  <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ display: "block", flexShrink: 0 }}>
    <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
    <polyline points="7 10 12 15 17 10"/>
    <line x1="12" y1="15" x2="12" y2="3"/>
  </svg>
);

function AssetDetailPanel({ asset, onClose }) {
  const history = getHistory(asset.id);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200, display: "flex", justifyContent: "flex-end" }}
      onClick={onClose}>
      <div style={{ width: 440, background: C.white, height: "100%", overflowY: "auto", boxShadow: "-4px 0 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, background: C.white, zIndex: 1 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>Asset Details</div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 24, lineHeight: 1, padding: 2 }}>×</button>
        </div>

        <div style={{ padding: 24 }}>
          {/* Asset ID card */}
          <div style={{ background: "#F8F9FA", borderRadius: 10, padding: "18px 20px", marginBottom: 24 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: C.textPrimary, letterSpacing: "-0.02em", marginBottom: 4 }}>{asset.id}</div>
            <div style={{ fontSize: 14, color: C.textSecondary }}>{asset.type}</div>
          </div>

          {/* Location */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Location</div>
            </div>
            <div style={{ paddingLeft: 24 }}>
              <div style={{ fontSize: 14, color: C.textPrimary, marginBottom: 3 }}>{asset.site}</div>
              <div style={{ fontSize: 13, color: C.textSecondary }}>{asset.location}</div>
            </div>
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 20 }} />

          {/* Asset Information */}
          <div style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Asset Information</div>
            </div>
            {[["Install Date", asset.installDate], ["Manufacturer", asset.manufacturer], ["Certificate", asset.cert]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "10px 0", borderBottom: `1px solid ${C.border}` }}>
                <span style={{ fontSize: 14, color: C.textSecondary }}>{k}</span>
                <span style={{ fontSize: 14, color: C.textPrimary, fontWeight: 500 }}>{v}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
              <span style={{ fontSize: 14, color: C.textSecondary }}>Status</span>
              <Badge status={asset.status} />
            </div>
          </div>

          <div style={{ height: 1, background: C.border, marginBottom: 20 }} />

          {/* Service History */}
          <div style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={C.red} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z"/>
              </svg>
              <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>Service History</div>
            </div>
            <div style={{ paddingLeft: 4 }}>
              {history.map((h, i, arr) => (
                <div key={i} style={{ display: "flex", gap: 14 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0, paddingTop: 4 }}>
                    <div style={{ width: 12, height: 12, borderRadius: "50%", background: C.red, flexShrink: 0 }} />
                    {i < arr.length - 1 && <div style={{ width: 2, flex: 1, background: "#E5E7EB", marginTop: 4, minHeight: 36 }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 18 : 0 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke={C.textMuted} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                        <line x1="16" y1="2" x2="16" y2="6"/>
                        <line x1="8" y1="2" x2="8" y2="6"/>
                        <line x1="3" y1="10" x2="21" y2="10"/>
                      </svg>
                      <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary }}>{h.date}</div>
                    </div>
                    <div style={{ fontSize: 13, color: C.textPrimary, marginBottom: 4, lineHeight: 1.4 }}>{h.action}</div>
                    <div style={{ fontSize: 12, color: C.textSecondary }}>Technician: {h.tech}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Download CTA */}
          <button style={{ width: "100%", padding: "13px", background: C.red, color: "#fff", border: "none", borderRadius: 7, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, boxShadow: "0 4px 14px rgba(192,57,43,0.28)" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/>
              <polyline points="7 10 12 15 17 10"/>
              <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download Asset Certificate
          </button>
        </div>
      </div>
    </div>
  );
}

export default function AssetsScreen() {
  const [siteF, setSiteF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);
  const [downloadSel, setDownloadSel] = useState(null);

  const filtered = ASSETS.filter(a => {
    if (siteF !== "all" && !a.site.toLowerCase().includes(siteF)) return false;
    if (typeF !== "all" && a.type !== typeF) return false;
    if (search && !a.id.toLowerCase().includes(search.toLowerCase()) && !a.location.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  });

  const siteOpts = [{ value:"all",label:"All Sites" },{ value:"suntec",label:"Suntec City Tower 1" },{ value:"raffles",label:"Raffles Hospital" },{ value:"parkway",label:"Parkway Parade" }];
  const typeOpts = [{ value:"all",label:"All Types" },{ value:"Fire Extinguisher",label:"Fire Extinguisher" },{ value:"Hose Reel",label:"Hose Reel" },{ value:"Hydrant",label:"Hydrant" },{ value:"Sprinkler Head",label:"Sprinkler Head" }];

  return (
    <div>
      <div style={{ fontSize: 22, fontWeight: 700, color: C.textPrimary, letterSpacing: "-0.02em", marginBottom: 3 }}>Assets</div>
      <div style={{ fontSize: 14, color: C.textSecondary, marginBottom: 24 }}>All fire safety assets across your sites</div>

      <div style={{ display: "flex", gap: 10, marginBottom: 18, alignItems: "center", flexWrap: "wrap" }}>
        <Sel value={siteF} onChange={setSiteF} options={siteOpts} />
        <Sel value={typeF} onChange={setTypeF} options={typeOpts} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by ID or location…"
          style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textPrimary, background: C.white, fontFamily: "inherit", outline: "none", width: 220 }} />
        <span style={{ marginLeft: "auto", color: C.textSecondary, fontSize: 13 }}>{filtered.length} assets</span>
      </div>

      <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
        <div style={{ ...card, flex: 1, padding: 0, overflow: "hidden" }}>
          <div style={{ overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr>{["Asset ID","Type","Site","Location","Last Serviced","Next Due","Certificate","Status"].map(h => <TH key={h}>{h}</TH>)}</tr>
              </thead>
              <tbody>
                {filtered.map(a => (
                  <tr key={a.id} onClick={() => setSel(sel?.id === a.id ? null : a)}
                    style={{ borderBottom: `1px solid ${C.border}`, cursor: "pointer", background: sel?.id === a.id ? C.redBg : "transparent", transition: "background 0.1s" }}>
                    <td style={{ padding: "11px 14px", fontWeight: 700, color: C.red, whiteSpace: "nowrap" }}>{a.id}</td>
                    <td style={{ padding: "11px 14px", color: C.textSecondary, whiteSpace: "nowrap" }}>{a.type}</td>
                    <td style={{ padding: "11px 14px", color: C.textPrimary, maxWidth: 120 }}><div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.site}</div></td>
                    <td style={{ padding: "11px 14px", color: C.textSecondary, maxWidth: 130 }}><div style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.location}</div></td>
                    <td style={{ padding: "11px 14px", color: C.textSecondary, whiteSpace: "nowrap" }}>{a.lastServiced}</td>
                    <td style={{ padding: "11px 14px", whiteSpace: "nowrap", color: a.status === "Overdue" ? C.red : a.status === "Due Soon" ? C.amber : C.textPrimary, fontWeight: a.status !== "Compliant" ? 600 : 400 }}>{a.nextDue}</td>
                    <td style={{ padding: "11px 14px" }}>
                      <button onClick={e => { e.stopPropagation(); setDownloadSel(a); }}
                        style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 5, padding: "4px 10px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 5 }}>
                        <DlIcon /> Download
                      </button>
                    </td>
                    <td style={{ padding: "11px 14px" }}><Badge status={a.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {sel && (
          <div style={{ ...card, width: 310, flexShrink: 0, padding: 0, overflow: "hidden" }}>
            <div style={{ padding: "13px 16px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.red }}>{sel.id}</div>
                <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 1 }}>{sel.type}</div>
              </div>
              <button onClick={() => setSel(null)} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 20, lineHeight: 1, padding: 2 }}>×</button>
            </div>
            <div style={{ padding: "14px 16px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 8px" }}>
                {[["Manufacturer",sel.manufacturer],["Model",sel.model],["Install Date",sel.installDate]].map(([k,v]) => (
                  <div key={k}>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
                {[["Site",sel.site],["Location",sel.location],["Certificate",sel.cert],["Cert Expiry",sel.nextDue]].map(([k,v]) => (
                  <div key={k} style={{ gridColumn: "1 / -1" }}>
                    <div style={{ fontSize: 10, color: C.textMuted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 2 }}>{k}</div>
                    <div style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{v}</div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10 }}><Badge status={sel.status} /></div>
            </div>
            <div style={{ padding: "13px 16px", borderBottom: `1px solid ${C.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: C.textPrimary, marginBottom: 12, textTransform: "uppercase", letterSpacing: "0.07em" }}>Service History</div>
              {getHistory(sel.id).map((h, i, arr) => (
                <div key={i} style={{ display: "flex", gap: 10, marginBottom: i < arr.length - 1 ? 12 : 0 }}>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "center", flexShrink: 0 }}>
                    <div style={{ width: 9, height: 9, borderRadius: "50%", background: C.green, border: `2px solid #fff`, boxShadow: `0 0 0 1px ${C.green}`, marginTop: 2 }} />
                    {i < arr.length - 1 && <div style={{ width: 1, flex: 1, background: C.border, marginTop: 3 }} />}
                  </div>
                  <div style={{ flex: 1, paddingBottom: i < arr.length - 1 ? 4 : 0 }}>
                    <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 2 }}>{h.date} · {h.tech}</div>
                    <div style={{ fontSize: 12, color: C.textPrimary, lineHeight: 1.4 }}>{h.action}</div>
                  </div>
                </div>
              ))}
            </div>
            {DEFECT_MAP[sel.id] ? (
              <div style={{ padding: "11px 16px", background: C.redBg }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.red, marginBottom: 4 }}>⚠ Open Defect</div>
                <div style={{ fontSize: 12, color: C.textPrimary, lineHeight: 1.4 }}>{DEFECTS.find(d => d.assetId === sel.id)?.desc}</div>
              </div>
            ) : (
              <div style={{ padding: "11px 16px", background: C.greenBg }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.green }}>✓ No open defects</div>
              </div>
            )}
          </div>
        )}
      </div>

      {downloadSel && <AssetDetailPanel asset={downloadSel} onClose={() => setDownloadSel(null)} />}
    </div>
  );
}
