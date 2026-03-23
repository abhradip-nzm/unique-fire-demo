import { useState } from "react";
import { C, CUSTOMER_NAV, ADMIN_NAV } from "./constants";
import { NavIcon } from "./components/UI";
import FloatingChatbot from "./components/FloatingChatbot";

// Customer screens
import DashboardScreen  from "./screens/customer/DashboardScreen";
import AssetsScreen     from "./screens/customer/AssetsScreen";
import DefectsScreen    from "./screens/customer/DefectsScreen";
import AuditPackScreen  from "./screens/customer/AuditPackScreen";

// Admin screens
import AdminOverviewScreen    from "./screens/admin/AdminOverviewScreen";
import UpcomingActionsScreen  from "./screens/admin/UpcomingActionsScreen";
import ClientManagementScreen from "./screens/admin/ClientManagementScreen";
import TechnicianScreen       from "./screens/admin/TechnicianScreen";
import FormBuilderScreen      from "./screens/admin/FormBuilderScreen";

export default function App() {
  const [activeView,   setActiveView]   = useState("customer");
  const [activeScreen, setActiveScreen] = useState("dashboard");

  const navItems = activeView === "customer" ? CUSTOMER_NAV : ADMIN_NAV;

  const handleViewSwitch = (view) => {
    setActiveView(view);
    setActiveScreen(view === "customer" ? "dashboard" : "overview");
  };

  const renderScreen = () => {
    if (activeView === "admin") {
      switch (activeScreen) {
        case "overview":  return <AdminOverviewScreen />;
        case "upcoming":  return <UpcomingActionsScreen />;
        case "clients":   return <ClientManagementScreen />;
        case "techs":     return <TechnicianScreen />;
        case "forms":     return <FormBuilderScreen />;
        default:          return null;
      }
    }
    switch (activeScreen) {
      case "dashboard": return <DashboardScreen />;
      case "assets":    return <AssetsScreen />;
      case "defects":   return <DefectsScreen />;
      case "auditpack": return <AuditPackScreen />;
      default:          return null;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100vh", fontFamily: "'Inter', sans-serif", background: C.lightGrey }}>
      {/* TOP BAR */}
      <header style={{ background: C.charcoal, height: 60, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 24px", flexShrink: 0, borderBottom: "1px solid rgba(0,0,0,0.1)", zIndex: 100 }}>
        <div style={{ display: "flex", alignItems: "center", minWidth: 160 }}>
          <img src="/logo.png" alt="Unique Fire" style={{ height: 42, objectFit: "contain" }} />
        </div>
        <div style={{ display: "flex", background: "rgba(0,0,0,0.08)", borderRadius: 8, padding: 4, gap: 4, border: "1px solid rgba(0,0,0,0.1)" }}>
          {["customer", "admin"].map(view => (
            <button
              key={view}
              onClick={() => handleViewSwitch(view)}
              className={`toggle-btn ${activeView === view ? "active" : "inactive"}`}
            >
              {view === "customer" ? "Customer View" : "Admin View"}
            </button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 160, justifyContent: "flex-end" }}>
          <span style={{ color: "#555", fontSize: 13, fontWeight: 500 }}>Ng Wei Ling</span>
          <div style={{ width: 34, height: 34, borderRadius: "50%", background: "linear-gradient(135deg, #C0392B 0%, #922b21 100%)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontSize: 12, fontWeight: 700, flexShrink: 0, border: "2px solid rgba(0,0,0,0.15)" }}>NW</div>
        </div>
      </header>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* SIDEBAR */}
        <aside style={{ width: 220, background: C.charcoal, flexShrink: 0, display: "flex", flexDirection: "column", borderRight: "1px solid rgba(0,0,0,0.1)", overflowY: "auto" }}>
          <div style={{ padding: "20px 16px 10px", color: "#777", fontSize: 10, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>
            {activeView === "customer" ? "Customer Portal" : "Admin Console"}
          </div>
          <nav style={{ flex: 1 }}>
            {navItems.map(item => (
              <div
                key={item.id}
                className={`nav-item${activeScreen === item.id ? " active" : ""}`}
                onClick={() => setActiveScreen(item.id)}
              >
                <span style={{ flexShrink: 0, opacity: activeScreen === item.id ? 1 : 0.7 }}>
                  <NavIcon type={item.iconType} />
                </span>
                <span>{item.label}</span>
              </div>
            ))}
          </nav>
          <div style={{ padding: 16, borderTop: "1px solid rgba(0,0,0,0.08)" }}>
            <div style={{ background: "rgba(192,57,43,0.12)", border: "1px solid rgba(192,57,43,0.25)", borderRadius: 6, padding: "8px 10px" }}>
              <div style={{ color: "#C0392B", fontSize: 11, fontWeight: 700, letterSpacing: "0.05em" }}>FIRE COMPLIANCE</div>
              <div style={{ color: "#6b6b6f", fontSize: 10, marginTop: 2 }}>Powered by Unique Fire</div>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <main style={{ flex: 1, background: C.lightGrey, overflowY: "auto", padding: 24 }}>
          {renderScreen()}
        </main>
      </div>

      <FloatingChatbot />
    </div>
  );
}
