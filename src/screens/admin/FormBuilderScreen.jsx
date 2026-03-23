import { useState } from "react";
import { C, card } from "../../constants";
import { Badge, PageHeader, Sel } from "../../components/UI";
import { MY_FORMS, TEMPLATES, FORM_FIELDS_PRESET, FIELD_TYPES } from "../../data/mockData";

const formTypeBadge = {
  "Inspection":    { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  "Defect Report": { bg: "#FEF2F2", color: "#C0392B", border: "#FECACA" },
  "Certificate":   { bg: "#F0FDF4", color: "#27AE60", border: "#BBF7D0" },
  "Custom":        { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};

function FormCanvas({ form, onBack }) {
  const [hoveredField, setHoveredField] = useState(null);
  const fields = form.id === 1 ? FORM_FIELDS_PRESET : FORM_FIELDS_PRESET.slice(0, form.fields > 10 ? 8 : 5);
  const typeOpts = [
    { value: "Inspection",    label: "Inspection" },
    { value: "Defect Report", label: "Defect Report" },
    { value: "Certificate",   label: "Certificate" },
    { value: "Custom",        label: "Custom" },
  ];

  return (
    <div style={{ display: "flex", gap: 0, height: "100%", margin: "-24px", overflow: "hidden" }}>
      {/* Left panel */}
      <div style={{ width: 260, background: "#F0F0F0", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 5 }}>Field Types</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 14 }}>Drag fields into the form canvas →</div>
        </div>
        <div style={{ padding: "0 12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
          {FIELD_TYPES.map((ft, i) => (
            <div key={i} style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: "9px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "grab", userSelect: "none" }}>
              <span style={{ fontSize: 15 }}>{ft.icon}</span>
              <span style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{ft.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, background: C.white, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: 12, flexShrink: 0, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ background: "none", color: C.textSecondary, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>← Back to Forms</button>
          <input defaultValue={form.name} style={{ flex: 1, minWidth: 200, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: "inherit", outline: "none" }} />
          <Sel value={form.type} onChange={() => {}} options={typeOpts} />
          <button style={{ background: "none", color: C.red, border: `1.5px solid rgba(192,57,43,0.3)`, borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap" }}>Save Draft</button>
          <button style={{ background: C.red, color: "#fff", border: "none", borderRadius: 6, padding: "6px 14px", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", whiteSpace: "nowrap", boxShadow: "0 2px 6px rgba(192,57,43,0.25)" }}>Publish Form</button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: "#FAFAFA" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ background: C.white, border: `1.5px dashed ${C.border}`, borderRadius: 10, padding: 20, minHeight: 400 }}>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {fields.map((f, i) => {
                  const isSection = f.type === "Section Header";
                  return (
                    <div key={i}
                      onMouseEnter={() => setHoveredField(i)}
                      onMouseLeave={() => setHoveredField(null)}
                      style={{ background: hoveredField === i && !isSection ? "#EEF2FF" : isSection ? "#F8F9FA" : C.white, border: `1px solid ${hoveredField === i ? "#C7D2FE" : C.border}`, borderRadius: 7, padding: isSection ? "10px 16px" : "12px 16px", display: "flex", alignItems: "center", gap: 12, transition: "background 0.1s, border-color 0.1s", cursor: "default" }}>
                      <div style={{ color: C.textMuted, fontSize: 14, cursor: "grab", flexShrink: 0, opacity: 0.5 }}>⠿</div>
                      <div style={{ flex: 1 }}>
                        {isSection ? (
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, textTransform: "uppercase", letterSpacing: "0.07em" }}>{f.label}</div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                            {f.required && <span style={{ color: C.red, fontSize: 13, fontWeight: 700 }}>*</span>}
                            <span style={{ fontSize: 10, color: C.textSecondary, background: "#F3F4F6", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>{f.type}</span>
                          </div>
                        )}
                      </div>
                      {!isSection && (
                        <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: 4, fontSize: 13 }}>✏️</button>
                          <button style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: 4, fontSize: 13 }}>🗑️</button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
              <div style={{ marginTop: 16, border: `2px dashed ${C.border}`, borderRadius: 8, padding: "20px 16px", textAlign: "center", color: C.textMuted, fontSize: 13, background: "#FAFAFA" }}>
                Drop field here or click to add
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function FormBuilderScreen() {
  const [activeTab, setActiveTab] = useState("myforms");
  const [editingForm, setEditingForm] = useState(null);

  if (editingForm) {
    return <FormCanvas form={editingForm} onBack={() => setEditingForm(null)} />;
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 20 }}>
        <PageHeader title="Form Builder" subtitle="Create and manage inspection and compliance forms" />
        <button onClick={() => setEditingForm({ id: 0, name: "New Form", type: "Inspection", fields: 0 })}
          style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)", flexShrink: 0, marginTop: 2 }}>
          + Create New Form
        </button>
      </div>

      <div style={{ marginBottom: 20 }}>
        <input placeholder="Search forms…" style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textPrimary, background: C.white, fontFamily: "inherit", outline: "none", width: 240 }} />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
        {[{ id: "myforms", label: "My Forms" }, { id: "templates", label: "Templates" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, background: "none", border: "none", borderBottom: activeTab === tab.id ? `2px solid ${C.red}` : "2px solid transparent", color: activeTab === tab.id ? C.red : C.textSecondary, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "myforms" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {MY_FORMS.map(f => {
            const ts = formTypeBadge[f.type] || formTypeBadge["Custom"];
            return (
              <div key={f.id} style={{ ...card, display: "flex", flexDirection: "column" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                  <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, lineHeight: 1.4, flex: 1, marginRight: 8 }}>{f.name}</div>
                  <Badge status={f.status} />
                </div>
                <div style={{ marginBottom: 12 }}>
                  <span style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{f.type}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4, marginBottom: 14, flex: 1 }}>
                  <div style={{ fontSize: 12, color: C.textSecondary }}><span style={{ color: C.textMuted }}>Fields: </span>{f.fields}</div>
                  <div style={{ fontSize: 12, color: C.textSecondary }}><span style={{ color: C.textMuted }}>Assigned to: </span>{f.assignedTo}</div>
                  <div style={{ fontSize: 12, color: C.textMuted }}>Last edited {f.lastEdited}</div>
                </div>
                <div style={{ display: "flex", gap: 6, borderTop: `1px solid ${C.border}`, paddingTop: 12 }}>
                  <button onClick={() => setEditingForm(f)} style={{ flex: 1, background: "#FEF2F2", color: C.red, border: `1px solid #FECACA`, borderRadius: 5, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Edit</button>
                  <button style={{ flex: 1, background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Preview</button>
                  <button style={{ flex: 1, background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Duplicate</button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {activeTab === "templates" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {TEMPLATES.map(t => {
            const ts = formTypeBadge[t.category] || formTypeBadge["Custom"];
            return (
              <div key={t.id} style={{ background: C.white, borderRadius: 8, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", border: `1.5px solid rgba(37,99,235,0.2)`, padding: "20px" }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 8, lineHeight: 1.4 }}>{t.name}</div>
                <span style={{ background: ts.bg, color: ts.color, border: `1px solid ${ts.border}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600, display: "inline-block", marginBottom: 10 }}>{t.category}</span>
                <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 14, lineHeight: 1.5 }}>{t.desc}</div>
                <button style={{ width: "100%", background: C.red, color: "#fff", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Use Template</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
