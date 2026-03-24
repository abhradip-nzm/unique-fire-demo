import { useState } from "react";
import { C, card } from "../../constants";
import { PageHeader, StatCard } from "../../components/UI";
import { TECHS as INITIAL_TECHS, ACTIONS } from "../../data/mockData";

const statusStyle = {
  "On Assignment": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
  "Available":     { bg: "#E6F4EC", color: "#27AE60", border: "#A8D5B5" },
  "Leave":         { bg: "#F3F4F6", color: "#6B7280", border: "#E5E7EB" },
};

const actionStatusStyle = {
  "Overdue":            { bg: "#FDECEA", color: "#C0392B", border: "#F5B7B1" },
  "Scheduled":          { bg: "#EFF6FF", color: "#2563EB", border: "#BFDBFE" },
  "Pending Assignment": { bg: "#FEF9EC", color: "#F39C12", border: "#FADA7A" },
};

const typeColors = {
  "Inspection":       { bg: "#EFF6FF", color: "#2563EB" },
  "Renewal":          { bg: "#F0FDF4", color: "#27AE60" },
  "Defect Follow-up": { bg: "#FEF2F2", color: "#C0392B" },
};

const SPEC_OPTS = [
  "Full Spectrum",
  "Suppression Systems",
  "Detection & Alarms",
  "Extinguisher Certified",
  "Hydrant Systems",
  "Sprinkler Systems",
];

const STATUS_OPTS = ["Available", "On Assignment", "Leave"];

const inputStyle = {
  width: "100%", border: `1px solid #D1D5DB`, borderRadius: 6, padding: "8px 12px",
  fontSize: 13, fontFamily: "inherit", outline: "none", boxSizing: "border-box", background: "#FAFAFA",
};

const labelStyle = { fontSize: 12, fontWeight: 600, color: "#374151", marginBottom: 5, display: "block" };

// Generate initials from a name (first letter of first and last word)
function getInitials(name) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/);
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

// Avatar colors pool for new technicians
const AVATAR_COLORS = ["#7C3AED", "#0891B2", "#059669", "#D97706", "#DB2777", "#2563EB", "#C0392B", "#F39C12"];

// ── Shared Field ─────────────────────────────────────────────────────────────
function FormField({ label, value, onChange, placeholder, required, type = "text", half, error }) {
  return (
    <div style={{ flex: half ? "0 0 calc(50% - 6px)" : "1 1 100%" }}>
      <label style={labelStyle}>{label}{required && <span style={{ color: C.red, marginLeft: 3 }}>*</span>}</label>
      <input type={type} value={value} onChange={e => onChange(e.target.value)} placeholder={placeholder}
        style={{ ...inputStyle, borderColor: error ? C.red : "#D1D5DB" }} />
      {error && <div style={{ fontSize: 11, color: C.red, marginTop: 3 }}>{error}</div>}
    </div>
  );
}

function Section({ title }) {
  return (
    <div style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary, marginBottom: 14, paddingBottom: 8, borderBottom: `1px solid ${C.border}` }}>
      {title}
    </div>
  );
}

// ── Technician Form (shared by Add & Edit) ───────────────────────────────────
function TechForm({ initial, onClose, onSubmit, mode }) {
  const [form, setForm] = useState({
    name:    initial?.name    || "",
    empId:   initial?.empId   || "",
    spec:    initial?.spec    || SPEC_OPTS[0],
    phone:   initial?.phone   || "",
    status:  initial?.status  || "Available",
    assigned:  initial?.assigned  ?? 0,
    completed: initial?.completed ?? 0,
  });
  const [errors, setErrors] = useState({});

  const set = (k, v) => setForm(p => ({ ...p, [k]: v }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())  e.name  = "Required";
    if (!form.empId.trim()) e.empId = "Required";
    if (!form.phone.trim()) e.phone = "Required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    const initials = getInitials(form.name);
    onSubmit({
      ...(initial || {}),
      id:   initial?.id || initials,
      name: form.name,
      empId: form.empId,
      spec:  form.spec,
      phone: form.phone,
      status: form.status,
      assigned:  Number(form.assigned)  || 0,
      completed: Number(form.completed) || 0,
      avatarColor: initial?.avatarColor || AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)],
    });
  };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 300, display: "flex", alignItems: "flex-start", justifyContent: "center", overflowY: "auto", padding: "32px 20px" }}
      onClick={onClose}>
      <div style={{ background: C.white, borderRadius: 12, width: "100%", maxWidth: 480, boxShadow: "0 8px 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary }}>
              {mode === "add" ? "Add New Technician" : "Edit Technician"}
            </div>
            <div style={{ fontSize: 12, color: C.textSecondary, marginTop: 2 }}>
              {mode === "add" ? "Register a new field technician" : `Editing details for ${initial?.name}`}
            </div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 22, lineHeight: 1 }}>×</button>
        </div>

        <div style={{ padding: "24px" }}>
          {/* Personal Info */}
          <div style={{ marginBottom: 24 }}>
            <Section title="Personal Information" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <FormField label="Full Name" value={form.name} onChange={v => set("name", v)} placeholder="e.g. Ahmad Razif" required error={errors.name} />
              <FormField label="Employee ID" value={form.empId} onChange={v => set("empId", v)} placeholder="e.g. UF-TECH-006" required half error={errors.empId} />
              <FormField label="Phone Number" value={form.phone} onChange={v => set("phone", v)} placeholder="+65 9XXX XXXX" required half error={errors.phone} />
            </div>
          </div>

          {/* Role */}
          <div style={{ marginBottom: 24 }}>
            <Section title="Role & Status" />
            <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
              <div style={{ flex: "1 1 100%" }}>
                <label style={labelStyle}>Specialization <span style={{ color: C.red, marginLeft: 3 }}>*</span></label>
                <select value={form.spec} onChange={e => set("spec", e.target.value)}
                  style={{ ...inputStyle, appearance: "none", backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 10px center", paddingRight: 30 }}>
                  {SPEC_OPTS.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div style={{ flex: "1 1 100%" }}>
                <label style={labelStyle}>Current Status</label>
                <div style={{ display: "flex", gap: 16, flexWrap: "wrap" }}>
                  {STATUS_OPTS.map(s => {
                    const ss = statusStyle[s];
                    return (
                      <label key={s} style={{ display: "flex", alignItems: "center", gap: 7, fontSize: 13, color: C.textPrimary, cursor: "pointer" }}>
                        <input type="radio" name={`tech-status-${mode}`} value={s} checked={form.status === s} onChange={() => set("status", s)} />
                        <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 4, padding: "2px 8px", fontSize: 11, fontWeight: 600 }}>{s}</span>
                      </label>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Job Counts */}
          <div style={{ marginBottom: 28 }}>
            <Section title="Jobs This Month" />
            <div style={{ display: "flex", gap: 12 }}>
              <div style={{ flex: "0 0 calc(50% - 6px)" }}>
                <label style={labelStyle}>Assigned</label>
                <input type="number" min="0" value={form.assigned} onChange={e => set("assigned", e.target.value)}
                  style={inputStyle} />
              </div>
              <div style={{ flex: "0 0 calc(50% - 6px)" }}>
                <label style={labelStyle}>Completed</label>
                <input type="number" min="0" value={form.completed} onChange={e => set("completed", e.target.value)}
                  style={inputStyle} />
              </div>
            </div>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 10, justifyContent: "flex-end", paddingTop: 4, borderTop: `1px solid ${C.border}` }}>
            <button onClick={onClose} style={{ background: "#F3F4F6", color: C.textPrimary, border: `1px solid ${C.border}`, borderRadius: 7, padding: "10px 20px", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>Cancel</button>
            <button onClick={handleSubmit} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "10px 24px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)" }}>
              {mode === "add" ? "Add Technician" : "Save Changes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Schedule Drawer ──────────────────────────────────────────────────────────
function ScheduleDrawer({ tech, onClose }) {
  const jobs   = ACTIONS.filter(a => a.tech === tech.name);
  const groups = [...new Set(ACTIONS.map(a => a.group))].filter(g => jobs.some(j => j.group === g));
  const ss     = statusStyle[tech.status] || statusStyle["Leave"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.35)", zIndex: 200, display: "flex", justifyContent: "flex-end" }}
      onClick={onClose}>
      <div style={{ width: 500, background: C.white, height: "100%", overflowY: "auto", boxShadow: "-4px 0 32px rgba(0,0,0,0.18)" }}
        onClick={e => e.stopPropagation()}>

        {/* Header */}
        <div style={{ padding: "18px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "sticky", top: 0, background: C.white, zIndex: 1 }}>
          <div>
            <div style={{ fontSize: 16, fontWeight: 700, color: C.textPrimary, marginBottom: 2 }}>{tech.name}</div>
            <div style={{ fontSize: 12, color: C.textSecondary }}>{tech.spec} · {tech.empId}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: C.textMuted, fontSize: 24, lineHeight: 1, padding: 2, flexShrink: 0 }}>×</button>
        </div>

        {/* Status bar */}
        <div style={{ padding: "12px 24px", borderBottom: `1px solid ${C.border}`, display: "flex", gap: 14, alignItems: "center", flexWrap: "wrap" }}>
          <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 5, padding: "3px 10px", fontSize: 12, fontWeight: 600 }}>{tech.status}</span>
          <div style={{ fontSize: 12, color: C.textSecondary }}>{tech.phone}</div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: C.textSecondary, fontWeight: 500 }}>
            <span style={{ color: C.textPrimary }}>{tech.assigned}</span> assigned · <span style={{ color: C.green }}>{tech.completed}</span> completed
          </div>
        </div>

        {/* Schedule */}
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: C.textPrimary, marginBottom: 18 }}>Upcoming Schedule</div>
          {jobs.length === 0 ? (
            <div style={{ fontSize: 13, color: C.textMuted, textAlign: "center", padding: "40px 0" }}>
              <div style={{ fontSize: 32, marginBottom: 12 }}>📋</div>
              <div style={{ fontWeight: 600, marginBottom: 4 }}>No upcoming jobs</div>
              <div>No jobs are currently assigned to {tech.name}</div>
            </div>
          ) : (
            groups.map(group => (
              <div key={group} style={{ marginBottom: 24 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: C.textMuted, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 10 }}>{group}</div>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {jobs.filter(j => j.group === group).map(j => {
                    const as2 = actionStatusStyle[j.status] || actionStatusStyle["Scheduled"];
                    const tc  = typeColors[j.type] || { bg: "#F3F4F6", color: C.textPrimary };
                    return (
                      <div key={j.id} style={{ background: "#FAFAFA", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 16px" }}>
                        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, marginBottom: 7 }}>
                          <div style={{ display: "flex", alignItems: "center", gap: 7, flexWrap: "wrap" }}>
                            <span style={{ fontSize: 11, fontWeight: 600, padding: "2px 8px", borderRadius: 4, background: tc.bg, color: tc.color }}>{j.type}</span>
                            <span style={{ fontSize: 13, fontWeight: 700, color: C.textPrimary }}>{j.asset}</span>
                            <span style={{ fontSize: 11, color: C.textMuted }}>{j.assetType}</span>
                          </div>
                          <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 7px", borderRadius: 4, background: as2.bg, color: as2.color, border: `1px solid ${as2.border}`, flexShrink: 0, whiteSpace: "nowrap" }}>{j.status}</span>
                        </div>
                        <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 5 }}>{j.customer} · {j.site}</div>
                        <div style={{ fontSize: 12, color: C.textPrimary, lineHeight: 1.5, marginBottom: 7 }}>{j.desc}</div>
                        <div style={{ fontSize: 11, color: C.textMuted }}>
                          Due: <span style={{ color: j.status === "Overdue" ? C.red : C.textSecondary, fontWeight: 600 }}>{j.due}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

// ── Main Screen ──────────────────────────────────────────────────────────────
export default function TechnicianScreen() {
  const [techs, setTechs]           = useState(INITIAL_TECHS);
  const [scheduleFor, setScheduleFor] = useState(null);
  const [addingTech, setAddingTech]   = useState(false);
  const [editingTech, setEditingTech] = useState(null);

  const total       = techs.length;
  const onAssignment = techs.filter(t => t.status === "On Assignment").length;
  const available    = techs.filter(t => t.status === "Available").length;

  const handleAddTech = (newTech) => {
    setTechs(prev => [...prev, newTech]);
    setAddingTech(false);
  };

  const handleEditTech = (updated) => {
    setTechs(prev => prev.map(t => t.id === updated.id ? updated : t));
    if (scheduleFor?.id === updated.id) setScheduleFor(updated);
    setEditingTech(null);
  };

  return (
    <div>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <PageHeader title="Technician Management" subtitle="Field team overview and assignments" />
        <button onClick={() => setAddingTech(true)} style={{ background: C.red, color: "#fff", border: "none", borderRadius: 7, padding: "9px 18px", fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 2px 8px rgba(192,57,43,0.25)", flexShrink: 0, marginTop: 2 }}>
          + Add Technician
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 16, marginBottom: 28, flexWrap: "wrap" }}>
        <StatCard label="Total Technicians"   value={String(total)}       accent={C.blue}  />
        <StatCard label="On Assignment Today" value={String(onAssignment)} accent={C.amber} />
        <StatCard label="Available"           value={String(available)}   accent={C.green} />
      </div>

      {/* Tech Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {techs.map(t => {
          const ss  = statusStyle[t.status] || statusStyle["Leave"];
          const pct = t.assigned > 0 ? Math.round((t.completed / t.assigned) * 100) : 0;
          const avatarColor = t.avatarColor || C.red;
          const initials = getInitials(t.name);

          return (
            <div key={t.id} style={{ ...card, display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
              {/* Avatar */}
              <div style={{ width: 52, height: 52, borderRadius: "50%", background: avatarColor, display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 17, fontWeight: 700, marginBottom: 10 }}>
                {initials}
              </div>

              <div style={{ fontSize: 15, fontWeight: 700, color: C.textPrimary, marginBottom: 3 }}>{t.name}</div>
              <div style={{ fontSize: 11, color: C.textMuted, marginBottom: 10 }}>{t.empId}</div>
              <span style={{ background: "#1C1C1E", color: "#fff", borderRadius: 4, padding: "3px 10px", fontSize: 11, fontWeight: 600, marginBottom: 10 }}>{t.spec}</span>
              <div style={{ fontSize: 12, color: C.textSecondary, marginBottom: 12 }}>{t.phone}</div>
              <span style={{ background: ss.bg, color: ss.color, border: `1px solid ${ss.border}`, borderRadius: 5, padding: "3px 10px", fontSize: 11, fontWeight: 600, marginBottom: 16 }}>{t.status}</span>

              {/* Progress */}
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

              {/* Buttons */}
              <div style={{ display: "flex", gap: 8, width: "100%", marginTop: 8 }}>
                <button onClick={() => setScheduleFor(t)}
                  style={{ flex: 1, padding: "8px", background: "none", color: C.red, border: `1.5px solid rgba(192,57,43,0.3)`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  View Schedule
                </button>
                <button onClick={() => setEditingTech(t)}
                  style={{ flex: 1, padding: "8px", background: "#F3F4F6", color: C.textPrimary, border: `1.5px solid ${C.border}`, borderRadius: 6, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {scheduleFor && <ScheduleDrawer tech={scheduleFor} onClose={() => setScheduleFor(null)} />}

      {addingTech && (
        <TechForm mode="add" initial={null} onClose={() => setAddingTech(false)} onSubmit={handleAddTech} />
      )}

      {editingTech && (
        <TechForm mode="edit" initial={editingTech} onClose={() => setEditingTech(null)} onSubmit={handleEditTech} />
      )}
    </div>
  );
}
