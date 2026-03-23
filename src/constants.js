export const C = {
  red: "#C0392B",
  redBg: "rgba(192,57,43,0.08)",
  redBorder: "rgba(192,57,43,0.2)",
  green: "#27AE60",
  greenBg: "rgba(39,174,96,0.08)",
  greenBorder: "rgba(39,174,96,0.2)",
  amber: "#F39C12",
  amberBg: "rgba(243,156,18,0.08)",
  amberBorder: "rgba(243,156,18,0.2)",
  blue: "#2563EB",
  blueBg: "rgba(37,99,235,0.08)",
  blueBorder: "rgba(37,99,235,0.2)",
  charcoal: "#e8e8e8",
  lightGrey: "#F5F5F5",
  white: "#FFFFFF",
  border: "#E5E7EB",
  textPrimary: "#111827",
  textSecondary: "#6B7280",
  textMuted: "#9CA3AF",
};

export const card = {
  background: C.white,
  borderRadius: 8,
  boxShadow: "0 1px 4px rgba(0,0,0,0.07), 0 0 0 1px rgba(0,0,0,0.04)",
  padding: "20px 24px",
};

export const CUSTOMER_NAV = [
  { id: "dashboard", label: "Dashboard",  iconType: "rect4" },
  { id: "assets",    label: "Assets",     iconType: "house" },
  { id: "defects",   label: "Defects",    iconType: "warn"  },
  { id: "auditpack", label: "Audit Pack", iconType: "doc"   },
];

export const ADMIN_NAV = [
  { id: "overview",  label: "Overview",          iconType: "info"    },
  { id: "upcoming",  label: "Upcoming Actions",  iconType: "cal"     },
  { id: "clients",   label: "Clients",           iconType: "clients" },
  { id: "techs",     label: "Technicians",       iconType: "techs"   },
  { id: "forms",     label: "Form Builder",      iconType: "forms"   },
];

export const TECH_INITIALS = {
  "Ahmad Razif": "AR",
  "Tan Boon Kiat": "TK",
  "Selvam Rajendran": "SR",
  "Lim Chee Wah": "LC",
  "Muthu Krishnan": "MK",
};

export const TECH_COLORS = {
  "Ahmad Razif": "#7C3AED",
  "Tan Boon Kiat": "#0891B2",
  "Selvam Rajendran": "#059669",
  "Lim Chee Wah": "#D97706",
  "Muthu Krishnan": "#DB2777",
};
