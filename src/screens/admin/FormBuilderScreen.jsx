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

const btnBase = { border: "none", borderRadius: 6, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" };

function FieldEditModal({ field, onSave, onClose }) {
  const [label, setLabel] = useState(field.label);
  const [required, setRequired] = useState(field.required);
  const [type, setType] = useState(field.type);
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 400, display: "flex", alignItems: "center", justifyContent: "center" }}
      onClick={onClose}>
      <div style={{ background: C.white, borderRadius: 10, padding: 24, width: 380, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 18 }}>Edit Field</div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 6 }}>Label</div>
          <input value={label} onChange={e => setLabel(e.target.value)} autoFocus
            style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }} />
        </div>
        <div style={{ marginBottom: 14 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: C.textSecondary, marginBottom: 6 }}>Field Type</div>
          <select value={type} onChange={e => setType(e.target.value)}
            style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 6, padding: "8px 12px", fontSize: 13, fontFamily: "inherit", background: C.white, outline: "none", boxSizing: "border-box" }}>
            {FIELD_TYPES.map(ft => <option key={ft.label} value={ft.label}>{ft.icon} {ft.label}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 22 }}>
          <input type="checkbox" id="req-chk" checked={required} onChange={e => setRequired(e.target.checked)} style={{ cursor: "pointer" }} />
          <label htmlFor="req-chk" style={{ fontSize: 13, color: C.textPrimary, cursor: "pointer" }}>Required field</label>
        </div>
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button onClick={onClose} style={{ ...btnBase, background: "#F3F4F6", color: C.textPrimary, padding: "8px 16px" }}>Cancel</button>
          <button onClick={() => onSave({ ...field, label, required, type })} style={{ ...btnBase, background: C.red, color: "#fff", padding: "8px 16px" }}>Save</button>
        </div>
      </div>
    </div>
  );
}

function PreviewModal({ formName, fields, onClose }) {
  const renderField = (f) => {
    if (f.type === "Section Header") {
      return <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, textTransform: "uppercase", letterSpacing: "0.07em", paddingBottom: 6, borderBottom: `2px solid ${C.border}` }}>{f.label}</div>;
    }
    const labelEl = (
      <div style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary, marginBottom: 6 }}>
        {f.label}{f.required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}
      </div>
    );
    let input;
    switch (f.type) {
      case "Short Text":
        input = <input disabled placeholder="Short answer" style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", background: "#FAFAFA" }} />;
        break;
      case "Long Text":
        input = <textarea disabled placeholder="Long answer" rows={3} style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", resize: "none", background: "#FAFAFA" }} />;
        break;
      case "Number":
        input = <input disabled type="number" placeholder="0" style={{ width: 120, border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, background: "#FAFAFA" }} />;
        break;
      case "Date":
        input = <input disabled type="date" style={{ border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, background: "#FAFAFA" }} />;
        break;
      case "Checkbox":
        input = <div style={{ display: "flex", alignItems: "center", gap: 8 }}><input type="checkbox" disabled /><span style={{ fontSize: 13, color: C.textSecondary }}>{f.label}</span></div>;
        break;
      case "Radio Buttons":
        input = <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {["Option 1", "Option 2", "Option 3"].map(o => (
            <label key={o} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: C.textSecondary }}>
              <input type="radio" disabled /> {o}
            </label>
          ))}
        </div>;
        break;
      case "Dropdown Select":
        input = <select disabled style={{ border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, background: "#FAFAFA", minWidth: 180 }}><option>Select an option…</option></select>;
        break;
      case "Photo Upload":
        input = <div style={{ border: `2px dashed ${C.border}`, borderRadius: 7, padding: "20px", textAlign: "center", color: C.textMuted, fontSize: 12, background: "#FAFAFA" }}>📷 Click to upload photo</div>;
        break;
      case "Signature Capture":
        input = <div style={{ border: `1px solid ${C.border}`, borderRadius: 7, height: 80, background: "#FAFAFA", display: "flex", alignItems: "center", justifyContent: "center", color: C.textMuted, fontSize: 12 }}>✍️ Signature area</div>;
        break;
      case "Rating Scale":
        input = <div style={{ display: "flex", gap: 6 }}>
          {[1,2,3,4,5].map(n => <div key={n} style={{ width: 32, height: 32, borderRadius: 6, border: `1px solid ${C.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, color: C.textMuted, cursor: "default", background: "#FAFAFA" }}>{"⭐"}</div>)}
        </div>;
        break;
      case "Instructions Text":
        input = <div style={{ fontSize: 13, color: C.textSecondary, lineHeight: 1.6, fontStyle: "italic", padding: "8px 12px", background: "#F8F9FA", borderRadius: 6, border: `1px solid ${C.border}` }}>ℹ️ Instructions or notes will appear here.</div>;
        break;
      default:
        input = <input disabled placeholder="Input" style={{ width: "100%", border: `1px solid ${C.border}`, borderRadius: 5, padding: "7px 10px", fontSize: 13, boxSizing: "border-box", background: "#FAFAFA" }} />;
    }
    return <div>{labelEl}{input}</div>;
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 400, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "40px 20px" }}
      onClick={onClose}>
      <div style={{ background: C.white, borderRadius: 12, width: "100%", maxWidth: 620, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary }}>{formName}</div>
            <div style={{ fontSize: 12, color: C.textMuted, marginTop: 2 }}>Form Preview</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 22, lineHeight: 1 }}>×</button>
        </div>
        <div style={{ padding: "24px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {fields.length === 0 ? (
              <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, padding: "32px 0" }}>No fields added yet</div>
            ) : fields.map((f, i) => (
              <div key={i}>{renderField(f)}</div>
            ))}
          </div>
          {fields.length > 0 && (
            <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.border}` }}>
              <button style={{ ...btnBase, background: C.red, color: "#fff", padding: "10px 24px", fontSize: 13 }}>Submit Form</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function FormCanvas({ form, onBack, onSave }) {
  const initFields = () => {
    if (form.fieldsData) return [...form.fieldsData];
    if (!form.id) return [];
    return form.id === 1 ? [...FORM_FIELDS_PRESET] : [...FORM_FIELDS_PRESET.slice(0, form.fields > 10 ? 8 : 5)];
  };

  const [fields, setFields] = useState(initFields);
  const [editingField, setEditingField] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const [formName, setFormName] = useState(form.name);
  const [formType, setFormType] = useState(form.type);
  const [toast, setToast] = useState(null);

  const showToast = (msg) => { setToast(msg); setTimeout(() => setToast(null), 2500); };

  const addField = (ft) => {
    setFields(prev => [...prev, { label: ft.label, type: ft.label, required: false }]);
  };

  const deleteField = (i) => setFields(prev => prev.filter((_, idx) => idx !== i));

  const moveUp = (i) => {
    if (i === 0) return;
    setFields(prev => { const arr = [...prev]; [arr[i - 1], arr[i]] = [arr[i], arr[i - 1]]; return arr; });
  };

  const moveDown = (i) => {
    setFields(prev => {
      if (i >= prev.length - 1) return prev;
      const arr = [...prev]; [arr[i], arr[i + 1]] = [arr[i + 1], arr[i]]; return arr;
    });
  };

  const handleSave = (published) => {
    onSave({ ...form, name: formName, type: formType, fields: fields.length, fieldsData: fields, status: published ? "Active" : "Draft", lastEdited: "Today" });
    showToast(published ? "✓ Form published successfully" : "✓ Draft saved");
  };

  const typeOpts = [
    { value: "Inspection",    label: "Inspection" },
    { value: "Defect Report", label: "Defect Report" },
    { value: "Certificate",   label: "Certificate" },
    { value: "Custom",        label: "Custom" },
  ];

  return (
    <div style={{ display: "flex", gap: 0, height: "calc(100vh - 108px)", margin: "-24px", overflow: "hidden", position: "relative" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", background: "#1C1C1E", color: "#fff", borderRadius: 8, padding: "10px 20px", fontSize: 13, fontWeight: 600, zIndex: 500, boxShadow: "0 4px 16px rgba(0,0,0,0.2)" }}>
          {toast}
        </div>
      )}

      {/* Left panel — field types */}
      <div style={{ width: 240, background: "#F0F0F0", borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", flexShrink: 0, overflowY: "auto" }}>
        <div style={{ padding: "16px 16px 8px" }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 4 }}>Field Types</div>
          <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 14 }}>Click a field to add it →</div>
        </div>
        <div style={{ padding: "0 12px 16px", display: "flex", flexDirection: "column", gap: 5 }}>
          {FIELD_TYPES.map((ft, i) => (
            <div key={i} onClick={() => addField(ft)}
              style={{ background: C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: "9px 12px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer", userSelect: "none", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = "#FEF2F2"}
              onMouseLeave={e => e.currentTarget.style.background = C.white}>
              <span style={{ fontSize: 15 }}>{ft.icon}</span>
              <span style={{ fontSize: 12, color: C.textPrimary, fontWeight: 500 }}>{ft.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Right panel — canvas */}
      <div style={{ flex: 1, background: C.white, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Toolbar */}
        <div style={{ borderBottom: `1px solid ${C.border}`, padding: "10px 16px", display: "flex", alignItems: "center", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
          <button onClick={onBack} style={{ ...btnBase, background: "none", color: C.textSecondary, border: `1px solid ${C.border}`, padding: "6px 12px", fontWeight: 600 }}>← Back</button>
          <input value={formName} onChange={e => setFormName(e.target.value)}
            style={{ flex: 1, minWidth: 180, border: `1px solid ${C.border}`, borderRadius: 6, padding: "6px 12px", fontSize: 14, fontWeight: 600, color: C.textPrimary, fontFamily: "inherit", outline: "none" }} />
          <Sel value={formType} onChange={setFormType} options={typeOpts} />
          <span style={{ fontSize: 11, color: C.textMuted }}>{fields.length} fields</span>
          <button onClick={() => setShowPreview(true)} style={{ ...btnBase, background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, padding: "6px 12px" }}>Preview</button>
          <button onClick={() => handleSave(false)} style={{ ...btnBase, background: "none", color: C.red, border: `1.5px solid rgba(192,57,43,0.3)`, padding: "6px 14px" }}>Save Draft</button>
          <button onClick={() => handleSave(true)} style={{ ...btnBase, background: C.red, color: "#fff", padding: "6px 14px", boxShadow: "0 2px 6px rgba(192,57,43,0.25)" }}>Publish</button>
        </div>

        {/* Canvas area */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", background: "#FAFAFA" }}>
          <div style={{ maxWidth: 680, margin: "0 auto" }}>
            <div style={{ background: C.white, border: `1.5px dashed ${C.border}`, borderRadius: 10, padding: 20, minHeight: 400 }}>
              {fields.length === 0 && (
                <div style={{ textAlign: "center", color: C.textMuted, fontSize: 13, padding: "40px 0" }}>
                  <div style={{ fontSize: 32, marginBottom: 10 }}>📋</div>
                  Click a field type on the left to start building your form
                </div>
              )}
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {fields.map((f, i) => {
                  const isSection = f.type === "Section Header";
                  return (
                    <div key={i}
                      style={{ background: isSection ? "#F8F9FA" : C.white, border: `1px solid ${C.border}`, borderRadius: 7, padding: isSection ? "10px 14px" : "11px 14px", display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ color: C.textMuted, fontSize: 14, flexShrink: 0, opacity: 0.4 }}>⠿</div>
                      <div style={{ flex: 1 }}>
                        {isSection ? (
                          <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, textTransform: "uppercase", letterSpacing: "0.07em" }}>{f.label}</div>
                        ) : (
                          <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 13, fontWeight: 600, color: C.textPrimary }}>{f.label}</span>
                            {f.required && <span style={{ color: C.red, fontWeight: 700 }}>*</span>}
                            <span style={{ fontSize: 10, color: C.textSecondary, background: "#F3F4F6", border: `1px solid ${C.border}`, borderRadius: 4, padding: "1px 7px", fontWeight: 600 }}>{f.type}</span>
                          </div>
                        )}
                      </div>
                      <div style={{ display: "flex", gap: 3, flexShrink: 0 }}>
                        <button onClick={() => moveUp(i)} title="Move up" style={{ background: "none", border: "none", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? C.border : C.textMuted, padding: "2px 4px", fontSize: 12 }}>↑</button>
                        <button onClick={() => moveDown(i)} title="Move down" style={{ background: "none", border: "none", cursor: i === fields.length - 1 ? "default" : "pointer", color: i === fields.length - 1 ? C.border : C.textMuted, padding: "2px 4px", fontSize: 12 }}>↓</button>
                        <button onClick={() => setEditingField({ i, field: f })} title="Edit" style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: "2px 5px", fontSize: 12 }}>✏️</button>
                        <button onClick={() => deleteField(i)} title="Delete" style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, padding: "2px 5px", fontSize: 12 }}>🗑️</button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div onClick={() => addField(FIELD_TYPES[0])}
                style={{ marginTop: 12, border: `2px dashed ${C.border}`, borderRadius: 8, padding: "18px 16px", textAlign: "center", color: C.textMuted, fontSize: 13, background: "#FAFAFA", cursor: "pointer", transition: "border-color 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.borderColor = C.red}
                onMouseLeave={e => e.currentTarget.style.borderColor = C.border}>
                + Click to add a Short Text field
              </div>
            </div>
          </div>
        </div>
      </div>

      {editingField && (
        <FieldEditModal
          field={editingField.field}
          onSave={(updated) => { setFields(prev => prev.map((f, idx) => idx === editingField.i ? updated : f)); setEditingField(null); }}
          onClose={() => setEditingField(null)}
        />
      )}

      {showPreview && <PreviewModal formName={formName} fields={fields} onClose={() => setShowPreview(false)} />}
    </div>
  );
}

export default function FormBuilderScreen() {
  const [myForms, setMyForms] = useState(MY_FORMS);
  const [activeTab, setActiveTab] = useState("myforms");
  const [editingForm, setEditingForm] = useState(null);
  const [search, setSearch] = useState("");

  const handleSaveForm = (formData) => {
    if (!formData.id) {
      const newId = Math.max(...myForms.map(f => f.id)) + 1;
      const newForm = { ...formData, id: newId, assignedTo: "All Assets" };
      setMyForms(prev => [...prev, newForm]);
      setEditingForm(newForm);
    } else {
      setMyForms(prev => prev.map(f => f.id === formData.id ? { ...f, ...formData } : f));
      setEditingForm(prev => ({ ...prev, ...formData }));
    }
  };

  const handleDuplicate = (form) => {
    const newId = Math.max(...myForms.map(f => f.id)) + 1;
    const copy = { ...form, id: newId, name: `${form.name} (Copy)`, status: "Draft", lastEdited: "Today" };
    setMyForms(prev => [...prev, copy]);
  };

  const handleUseTemplate = (template) => {
    const newId = Math.max(...myForms.map(f => f.id)) + 1;
    const newForm = { id: newId, name: template.name, type: template.category, fields: FORM_FIELDS_PRESET.length, assignedTo: "All Assets", status: "Draft", lastEdited: "Today", fieldsData: [...FORM_FIELDS_PRESET] };
    setMyForms(prev => [...prev, newForm]);
    setEditingForm(newForm);
  };

  if (editingForm) {
    return <FormCanvas form={editingForm} onBack={() => setEditingForm(null)} onSave={handleSaveForm} />;
  }

  const filteredForms = myForms.filter(f => !search || f.name.toLowerCase().includes(search.toLowerCase()));

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
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search forms…"
          style={{ border: `1px solid ${C.border}`, borderRadius: 6, padding: "7px 12px", fontSize: 13, color: C.textPrimary, background: C.white, fontFamily: "inherit", outline: "none", width: 240 }} />
      </div>

      <div style={{ display: "flex", gap: 0, borderBottom: `1px solid ${C.border}`, marginBottom: 20 }}>
        {[{ id: "myforms", label: `My Forms (${myForms.length})` }, { id: "templates", label: "Templates" }].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            style={{ padding: "10px 20px", fontSize: 13, fontWeight: 600, background: "none", border: "none", borderBottom: activeTab === tab.id ? `2px solid ${C.red}` : "2px solid transparent", color: activeTab === tab.id ? C.red : C.textSecondary, cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s" }}>
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "myforms" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
          {filteredForms.map(f => {
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
                  <button onClick={() => setEditingForm({ ...f, previewOnly: true })} style={{ flex: 1, background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Preview</button>
                  <button onClick={() => handleDuplicate(f)} style={{ flex: 1, background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 5, padding: "6px 0", fontSize: 11, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Duplicate</button>
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
                <button onClick={() => handleUseTemplate(t)} style={{ width: "100%", background: C.red, color: "#fff", border: "none", borderRadius: 6, padding: "8px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }}>Use Template</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
