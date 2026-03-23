# 🔥 Unique Fire Compliance Command Center

A full React SPA prototype for fire safety compliance management.

## Quick Start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

## Project Structure

```
src/
├── constants.js              # Design tokens, nav config, colours
├── data/
│   └── mockData.js           # All mock data (assets, clients, techs, forms)
├── components/
│   ├── UI.jsx                # Shared components: Badge, StatCard, NavIcon, TechAvatar, Sel, TH
│   └── FloatingChatbot.jsx   # Floating chat widget
├── screens/
│   ├── customer/
│   │   ├── DashboardScreen.jsx
│   │   ├── AssetsScreen.jsx
│   │   ├── DefectsScreen.jsx
│   │   └── AuditPackScreen.jsx
│   └── admin/
│       ├── AdminOverviewScreen.jsx
│       ├── UpcomingActionsScreen.jsx
│       ├── ClientManagementScreen.jsx
│       ├── TechnicianScreen.jsx
│       └── FormBuilderScreen.jsx
├── App.jsx                   # Shell: topbar, sidebar, view routing
├── main.jsx                  # Entry point
└── index.css                 # Global styles (Inter font, nav/toggle classes)
```

## Tech Stack

- **React 18** with hooks (useState, useEffect, useRef)
- **Vite** for dev server and bundling
- **Inline styles** for all component styling (no Tailwind, no CSS modules)
- **No external UI libraries** — everything is built from scratch

## Working with Claude Code

Tell Claude Code:
> "This is a Vite + React app using inline styles. Design tokens are in `src/constants.js`.
> All mock data is in `src/data/mockData.js`. Shared UI components are in `src/components/UI.jsx`.
> Screens are split into customer and admin folders under `src/screens/`."
