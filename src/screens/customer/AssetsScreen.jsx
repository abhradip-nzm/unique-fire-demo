import { useState } from "react";
import { C, card } from "../../constants";
import { Badge, Sel, TH } from "../../components/UI";
import { ASSETS, DEFECTS, DEFECT_MAP, getHistory } from "../../data/mockData";

export default function AssetsScreen() {
  const [siteF, setSiteF] = useState("all");
  const [typeF, setTypeF] = useState("all");
  const [search, setSearch] = useState("");
  const [sel, setSel] = useState(null);

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
                      <button onClick={e => e.stopPropagation()} style={{ background: C.redBg, color: C.red, border: `1px solid ${C.redBorder}`, borderRadius: 5, padding: "3px 9px", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Download</button>
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
    </div>
  );
}
