// ─── CUSTOMER DATA ────────────────────────────────────────────────────────────

export const SITES = [
  { id: "tower1",  name: "Suntec City Tower 1", address: "1 Raffles Blvd, Singapore 039593",      assets: 18, compliant: 15, overdue: 1, lastServiced: "15 Jan 2025", status: "Due Soon"  },
  { id: "raffles", name: "Raffles Hospital",     address: "585 North Bridge Rd, Singapore 188770", assets: 16, compliant: 16, overdue: 0, lastServiced: "20 Jan 2025", status: "Compliant" },
  { id: "parkway", name: "Parkway Parade",       address: "80 Marine Parade Rd, Singapore 449269", assets: 14, compliant: 10, overdue: 1, lastServiced: "5 Jan 2025",  status: "Overdue"   },
];

export const ASSETS = [
  { id: "EXTING-001", type: "Fire Extinguisher", site: "Suntec City Tower 1", location: "Level 2, North Wing",         lastServiced: "15 Jan 2025", nextDue: "15 Jan 2026", cert: "UF-SG-2024-0041", status: "Compliant", manufacturer: "Amerex", installDate: "10 Mar 2021", model: "B456"     },
  { id: "EXTING-005", type: "Fire Extinguisher", site: "Raffles Hospital",    location: "Level 3, East Corridor",       lastServiced: "20 Jan 2025", nextDue: "20 Jan 2026", cert: "UF-SG-2024-0055", status: "Compliant", manufacturer: "Gloria",  installDate: "5 Jun 2020",  model: "P6GM"     },
  { id: "EXTING-012", type: "Fire Extinguisher", site: "Parkway Parade",      location: "B1, Car Park Zone A",          lastServiced: "10 Nov 2024", nextDue: "10 Feb 2025", cert: "UF-SG-2024-0012", status: "Overdue",   manufacturer: "Amerex", installDate: "1 Jan 2019",  model: "B402"     },
  { id: "HOSE-002",   type: "Hose Reel",         site: "Suntec City Tower 1", location: "Level 1, Main Lobby",          lastServiced: "15 Jan 2025", nextDue: "15 Jan 2026", cert: "UF-SG-2024-0082", status: "Compliant", manufacturer: "Viking",  installDate: "12 Apr 2018", model: "VK-HR200" },
  { id: "HOSE-006",   type: "Hose Reel",         site: "Parkway Parade",      location: "Level 2, Food Court",          lastServiced: "5 Jan 2025",  nextDue: "5 Apr 2025",  cert: "UF-SG-2024-0093", status: "Due Soon",  manufacturer: "Viking",  installDate: "20 Aug 2019", model: "VK-HR150" },
  { id: "HYDRANT-001",type: "Hydrant",            site: "Suntec City Tower 1", location: "Basement 1, Pump Room",        lastServiced: "15 Jan 2025", nextDue: "15 Jan 2026", cert: "UF-SG-2024-0101", status: "Compliant", manufacturer: "Viking",  installDate: "3 Sep 2017",  model: "VK-H500"  },
  { id: "HYDRANT-003",type: "Hydrant",            site: "Raffles Hospital",    location: "Ground Floor, South Entrance", lastServiced: "20 Jan 2025", nextDue: "20 Jan 2026", cert: "UF-SG-2024-0108", status: "Compliant", manufacturer: "Gloria",  installDate: "8 Nov 2018",  model: "G-HY300"  },
  { id: "SPRINK-003", type: "Sprinkler Head",     site: "Raffles Hospital",    location: "Level 4, ICU Wing",            lastServiced: "20 Jan 2025", nextDue: "20 Jan 2026", cert: "UF-SG-2024-0122", status: "Compliant", manufacturer: "Viking",  installDate: "15 Feb 2020", model: "VK-102"   },
  { id: "SPRINK-008", type: "Sprinkler Head",     site: "Parkway Parade",      location: "Level 3, Retail Zone B",       lastServiced: "5 Jan 2025",  nextDue: "5 Apr 2025",  cert: "UF-SG-2024-0135", status: "Due Soon",  manufacturer: "Amerex", installDate: "22 Jul 2021", model: "AX-SP200" },
  { id: "EXTING-018", type: "Fire Extinguisher", site: "Suntec City Tower 1", location: "Level 5, Server Room",         lastServiced: "15 Jan 2025", nextDue: "15 Jul 2025", cert: "UF-SG-2024-0048", status: "Due Soon",  manufacturer: "Gloria",  installDate: "9 Oct 2020",  model: "P9GM"     },
  { id: "HOSE-008",   type: "Hose Reel",         site: "Raffles Hospital",    location: "Level 1, Emergency Dept",      lastServiced: "20 Jan 2025", nextDue: "20 Jan 2026", cert: "UF-SG-2024-0089", status: "Compliant", manufacturer: "Viking",  installDate: "17 Jan 2019", model: "VK-HR200" },
  { id: "SPRINK-012", type: "Sprinkler Head",     site: "Suntec City Tower 1", location: "Level 3, Conference Hall",     lastServiced: "8 Dec 2024",  nextDue: "8 Dec 2025",  cert: "UF-SG-2024-0141", status: "Overdue",   manufacturer: "Viking",  installDate: "30 Mar 2018", model: "VK-115"   },
];

export const SERVICE_HISTORY = {
  "EXTING-001": [
    { date: "15 Jan 2025", tech: "Ahmad Razif",      action: "Annual inspection and pressure test. Passed all checks." },
    { date: "15 Jan 2024", tech: "Tan Boon Kiat",    action: "Annual inspection. Replaced discharge hose nozzle." },
    { date: "15 Jan 2023", tech: "Selvam Rajendran", action: "Annual inspection. Minor servicing of valve assembly." },
  ],
  "EXTING-012": [
    { date: "10 Nov 2024", tech: "Selvam Rajendran", action: "Annual inspection. Unit flagged — pressure below threshold (8 bar)." },
    { date: "10 Nov 2023", tech: "Ahmad Razif",      action: "Annual inspection. Passed all checks." },
  ],
  "HOSE-002": [
    { date: "15 Jan 2025", tech: "Tan Boon Kiat",    action: "Full inspection. Hose flow test passed at 0.42 MPa." },
    { date: "15 Jan 2024", tech: "Selvam Rajendran", action: "Annual inspection. Drum rotation serviced." },
    { date: "15 Jan 2023", tech: "Ahmad Razif",      action: "Annual inspection. All checks passed." },
  ],
};

export const getHistory = (id) =>
  SERVICE_HISTORY[id] || [
    { date: "15 Jan 2025", tech: "Ahmad Razif",   action: "Annual inspection completed. All checks passed." },
    { date: "15 Jan 2024", tech: "Tan Boon Kiat", action: "Annual inspection. Minor servicing performed." },
  ];

export const DEFECT_MAP = { "EXTING-012": true, "SPRINK-012": true };

export const DEFECTS = [
  { id: "DEF-2025-001", assetId: "EXTING-012", assetType: "Fire Extinguisher", site: "Parkway Parade",       desc: "Pressure gauge below acceptable range (8 bar vs required 10 bar). Unit may not discharge effectively.",          reported: "12 Nov 2024", status: "In Progress", tech: "Selvam Rajendran", closedBy: null,              closedOn: null           },
  { id: "DEF-2025-002", assetId: "HOSE-006",   assetType: "Hose Reel",         site: "Parkway Parade",       desc: "Hose reel drum not rotating freely. Mechanical resistance detected during quarterly inspection.",              reported: "8 Jan 2025",  status: "Open",        tech: "Tan Boon Kiat",    closedBy: null,              closedOn: null           },
  { id: "DEF-2025-003", assetId: "SPRINK-012", assetType: "Sprinkler Head",     site: "Suntec City Tower 1", desc: "Sprinkler head corrosion detected on deflector plate. Risk of compromised spray pattern in activation.",        reported: "10 Dec 2024", status: "In Progress", tech: "Ahmad Razif",       closedBy: null,              closedOn: null           },
  { id: "DEF-2024-019", assetId: "EXTING-018", assetType: "Fire Extinguisher", site: "Suntec City Tower 1", desc: "Safety pin tamper seal broken. Possible unauthorised discharge attempt. Seal replaced and unit re-tested.",    reported: "20 Dec 2024", status: "Closed",      tech: "Ahmad Razif",       closedBy: "Ahmad Razif",     closedOn: "28 Dec 2024"  },
  { id: "DEF-2024-017", assetId: "HOSE-008",   assetType: "Hose Reel",         site: "Raffles Hospital",     desc: "Coupling joint showing early signs of wear. Preventive replacement recommended before next inspection.",        reported: "5 Dec 2024",  status: "Closed",      tech: "Tan Boon Kiat",    closedBy: "Selvam Rajendran", closedOn: "18 Dec 2024" },
];

export const RECENT_ACTIVITY = [
  { dot: "#27AE60", text: "Certificate issued for EXTING-001 at Suntec City Tower 1", time: "15 Jan 2025, 3:24 PM" },
  { dot: "#27AE60", text: "Certificate issued for HYDRANT-001 at Suntec City Tower 1", time: "15 Jan 2025, 2:51 PM" },
  { dot: "#27AE60", text: "Defect DEF-2024-019 closed at Suntec City Tower 1", time: "28 Dec 2024, 11:10 AM" },
  { dot: "#C0392B", text: "New defect DEF-2025-003 opened for SPRINK-012", time: "10 Dec 2024, 2:38 PM" },
  { dot: "#F39C12", text: "SPRINK-012 flagged overdue — Suntec City Tower 1", time: "9 Dec 2024, 9:00 AM" },
];

export const AUDIT_DL = [
  { date: "3 Jan 2025",  site: "Suntec City Tower 1", by: "Ng Wei Ling", ref: "UF-SG-2025-APK-001" },
  { date: "15 Nov 2024", site: "Raffles Hospital",     by: "Ng Wei Ling", ref: "UF-SG-2024-APK-018" },
  { date: "2 Oct 2024",  site: "Parkway Parade",       by: "Ng Wei Ling", ref: "UF-SG-2024-APK-011" },
];

// ─── ADMIN DATA ───────────────────────────────────────────────────────────────

export const CUSTOMERS = [
  { id: "suntec", name: "Suntec City Mall",        sites: 3, assets: 48,  compliant: 42,  overdue: 1, nextAction: "28 Jan 2025", status: "Attention Needed", fm: "Ng Wei Ling"    },
  { id: "glen",   name: "Gleneagles Hospital",      sites: 1, assets: 62,  compliant: 62,  overdue: 0, nextAction: "3 Feb 2025",  status: "Active",           fm: "Dr Priya Nair"  },
  { id: "capita", name: "CapitaLand Portfolio",     sites: 5, assets: 134, compliant: 128, overdue: 2, nextAction: "14 Jan 2025", status: "Critical",         fm: "Jason Teo"      },
  { id: "maple",  name: "Mapletree Business City",  sites: 2, assets: 89,  compliant: 87,  overdue: 0, nextAction: "20 Feb 2025", status: "Active",           fm: "Siti Rahimah"   },
  { id: "changi", name: "Changi Airport Group",     sites: 4, assets: 201, compliant: 198, overdue: 0, nextAction: "10 Mar 2025", status: "Active",           fm: "Raymond Chia"   },
];

export const OPEN_DEFECTS_ADMIN = [
  { customer: "CapitaLand Portfolio",  asset: "EXTING-044", type: "Fire Extinguisher", status: "Overdue",     desc: "Pressure below minimum threshold" },
  { customer: "Suntec City Mall",      asset: "SPRINK-012", type: "Sprinkler Head",    status: "In Progress", desc: "Corrosion on deflector plate" },
  { customer: "CapitaLand Portfolio",  asset: "HOSE-031",   type: "Hose Reel",         status: "Open",        desc: "Drum rotation seized" },
  { customer: "Suntec City Mall",      asset: "EXTING-012", type: "Fire Extinguisher", status: "In Progress", desc: "Pressure gauge below 10 bar" },
  { customer: "Gleneagles Hospital",   asset: "HYDRANT-009",type: "Hydrant",           status: "Open",        desc: "Outlet cap corrosion detected" },
];

export const EXPIRING_CERTS = [
  { customer: "CapitaLand Portfolio",  asset: "EXTING-044", expiry: "14 Jan 2025", daysLeft: 0  },
  { customer: "Suntec City Mall",      asset: "EXTING-012", expiry: "10 Feb 2025", daysLeft: 27 },
  { customer: "CapitaLand Portfolio",  asset: "HOSE-031",   expiry: "15 Feb 2025", daysLeft: 32 },
  { customer: "Suntec City Mall",      asset: "SPRINK-012", expiry: "8 Mar 2025",  daysLeft: 53 },
  { customer: "Gleneagles Hospital",   asset: "HYDRANT-009",expiry: "20 Mar 2025", daysLeft: 65 },
];

export const ACTIONS = [
  { id: 1,  group: "This Week",  type: "Renewal",          customer: "CapitaLand Portfolio",    site: "Raffles City Tower",      asset: "EXTING-044", assetType: "Fire Extinguisher", desc: "Certificate renewal — annual pressurisation test required before reissue",                                    tech: "Ahmad Razif",      due: "20 Jan 2025", status: "Overdue"             },
  { id: 2,  group: "This Week",  type: "Inspection",       customer: "Suntec City Mall",        site: "Suntec City Tower 1",     asset: "HOSE-002",   assetType: "Hose Reel",         desc: "Quarterly hose reel flow and rotation check per SCDF FSR Schedule A requirements",                          tech: "Tan Boon Kiat",    due: "22 Jan 2025", status: "Scheduled"           },
  { id: 3,  group: "This Week",  type: "Defect Follow-up", customer: "CapitaLand Portfolio",    site: "One George Street",       asset: "HOSE-031",   assetType: "Hose Reel",         desc: "Follow-up on seized drum mechanism — replacement parts sourced, ready to install",                          tech: "Selvam Rajendran", due: "23 Jan 2025", status: "Scheduled"           },
  { id: 4,  group: "Next Week",  type: "Inspection",       customer: "Gleneagles Hospital",     site: "Gleneagles Main Block",   asset: "HYDRANT-009",assetType: "Hydrant",           desc: "Annual hydrant outlet and pressure test — SCDF FSR compliance inspection",                                   tech: "Lim Chee Wah",     due: "27 Jan 2025", status: "Scheduled"           },
  { id: 5,  group: "Next Week",  type: "Renewal",          customer: "Suntec City Mall",        site: "Parkway Parade",          asset: "EXTING-012", assetType: "Fire Extinguisher", desc: "Annual certificate renewal — pressure test and valve inspection required before reissue",                     tech: "Ahmad Razif",      due: "28 Jan 2025", status: "Pending Assignment"  },
  { id: 6,  group: "Next Week",  type: "Defect Follow-up", customer: "Suntec City Mall",        site: "Suntec City Tower 1",     asset: "SPRINK-012", assetType: "Sprinkler Head",    desc: "Sprinkler head replacement — corroded deflector plate unit on order, installation pending delivery",         tech: "Muthu Krishnan",   due: "29 Jan 2025", status: "Scheduled"           },
  { id: 7,  group: "Next Week",  type: "Inspection",       customer: "Mapletree Business City", site: "MBC Phase 1",             asset: "SPRINK-041", assetType: "Sprinkler Head",    desc: "Semi-annual sprinkler head visual inspection across Zones 4–7, 36 heads total",                             tech: "Tan Boon Kiat",    due: "30 Jan 2025", status: "Scheduled"           },
  { id: 8,  group: "This Month", type: "Renewal",          customer: "Gleneagles Hospital",     site: "Gleneagles Main Block",   asset: "HOSE-018",   assetType: "Hose Reel",         desc: "Annual certificate renewal — hose pressure and coupling integrity test required",                            tech: "Lim Chee Wah",     due: "3 Feb 2025",  status: "Scheduled"           },
  { id: 9,  group: "This Month", type: "Inspection",       customer: "CapitaLand Portfolio",    site: "Bugis Junction",          asset: "EXTING-077", assetType: "Fire Extinguisher", desc: "Annual inspection of CO2 extinguishers in server rooms and all electrical risers across L1–L4",               tech: "Selvam Rajendran", due: "7 Feb 2025",  status: "Scheduled"           },
  { id: 10, group: "This Month", type: "Renewal",          customer: "Mapletree Business City", site: "MBC Phase 2",             asset: "HYDRANT-022",assetType: "Hydrant",           desc: "Biennial hydrant certificate renewal — full flow and valve operation test per SCDF requirements",            tech: "Muthu Krishnan",   due: "12 Feb 2025", status: "Pending Assignment"  },
  { id: 11, group: "Next Month", type: "Inspection",       customer: "Changi Airport Group",    site: "Terminal 3 Basement",     asset: "SPRINK-112", assetType: "Sprinkler Head",    desc: "Quarterly sprinkler visual check — joint CAAS and SCDF compliance requirement for airside operations",      tech: "Ahmad Razif",      due: "3 Mar 2025",  status: "Scheduled"           },
  { id: 12, group: "Next Month", type: "Renewal",          customer: "Changi Airport Group",    site: "Terminal 2 Pier A",       asset: "HOSE-098",   assetType: "Hose Reel",         desc: "Annual hose reel certificate renewal — 24 units across Pier A departure gates, batch inspection scheduled", tech: "Tan Boon Kiat",    due: "10 Mar 2025", status: "Scheduled"           },
  { id: 13, group: "Next Month", type: "Defect Follow-up", customer: "Gleneagles Hospital",     site: "Gleneagles Annexe Block", asset: "HYDRANT-009",assetType: "Hydrant",           desc: "Post-repair verification test after outlet cap replacement — FSM sign-off required before certificate reissue",tech: "Lim Chee Wah",    due: "20 Mar 2025", status: "Pending Assignment"  },
];

// ─── CLIENT DATA ──────────────────────────────────────────────────────────────

export const CLIENT_DATA = [
  {
    id: "suntec", name: "Suntec City Mall", status: "Active", openDefects: 2,
    contact: { name: "Ng Wei Ling", email: "ngweiling@suntecreit.com.sg", phone: "+65 9123 4567" },
    sites: [
      { name: "Suntec City Tower 1",           address: "1 Raffles Blvd, Singapore 039593", assets: 18, compliance: "Attention Needed", lastServiced: "15 Jan 2025" },
      { name: "Suntec City Tower 2",           address: "1 Raffles Blvd, Singapore 039593", assets: 16, compliance: "Compliant",        lastServiced: "10 Jan 2025" },
      { name: "Suntec City Convention Centre", address: "1 Raffles Blvd, Singapore 039593", assets: 14, compliance: "Compliant",        lastServiced: "8 Jan 2025"  },
    ],
    contract: { start: "1 Jan 2024", renewal: "31 Dec 2025", value: "SGD $38,500/yr", renewalSoon: true },
    serviceHistory: [
      { date: "15 Jan 2025", tech: "Ahmad Razif",      site: "Suntec City Tower 1",           action: "Annual inspection — 18 assets inspected, 1 defect raised" },
      { date: "10 Jan 2025", tech: "Tan Boon Kiat",    site: "Suntec City Tower 2",           action: "Quarterly hose reel check — all 6 units passed" },
      { date: "8 Jan 2025",  tech: "Selvam Rajendran", site: "Suntec City Convention Centre", action: "Annual inspection — all assets compliant" },
    ],
  },
  {
    id: "glen", name: "Gleneagles Hospital", status: "Active", openDefects: 1,
    contact: { name: "Dr Priya Nair", email: "priya.nair@gleneagles.com.sg", phone: "+65 9234 5678" },
    sites: [
      { name: "Gleneagles Main Building", address: "6 Napier Rd, Singapore 258499", assets: 62, compliance: "Attention Needed", lastServiced: "20 Jan 2025" },
    ],
    contract: { start: "1 Mar 2024", renewal: "28 Feb 2026", value: "SGD $22,000/yr", renewalSoon: false },
    serviceHistory: [
      { date: "20 Jan 2025", tech: "Lim Chee Wah",  site: "Gleneagles Main Building", action: "Annual inspection — hydrant pressure test completed" },
      { date: "5 Dec 2024",  tech: "Tan Boon Kiat", site: "Gleneagles Main Building", action: "Hose reel coupling replacement — DEF-2024-017" },
      { date: "1 Nov 2024",  tech: "Ahmad Razif",   site: "Gleneagles Main Building", action: "Semi-annual sprinkler visual check — all clear" },
    ],
  },
  {
    id: "capita", name: "CapitaLand Portfolio", status: "Active", openDefects: 4,
    contact: { name: "Jason Teo", email: "jason.teo@capitaland.com", phone: "+65 9345 6789" },
    sites: [
      { name: "Plaza Singapura", address: "68 Orchard Rd, Singapore 238839",           assets: 31, compliance: "Overdue",          lastServiced: "2 Dec 2024"  },
      { name: "Bugis Junction",  address: "200 Victoria St, Singapore 188021",         assets: 28, compliance: "Compliant",        lastServiced: "18 Jan 2025" },
      { name: "Funan Mall",      address: "107 North Bridge Rd, Singapore 179105",     assets: 26, compliance: "Compliant",        lastServiced: "12 Jan 2025" },
      { name: "Westgate",        address: "3 Gateway Dr, Singapore 608532",            assets: 24, compliance: "Attention Needed", lastServiced: "6 Jan 2025"  },
      { name: "Bedok Mall",      address: "311 New Upper Changi Rd, Singapore 467360", assets: 25, compliance: "Compliant",        lastServiced: "14 Jan 2025" },
    ],
    contract: { start: "1 Jun 2023", renewal: "31 May 2026", value: "SGD $44,800/yr", renewalSoon: false },
    serviceHistory: [
      { date: "18 Jan 2025", tech: "Selvam Rajendran", site: "Bugis Junction", action: "Annual inspection — 28 assets passed, cert issued" },
      { date: "14 Jan 2025", tech: "Muthu Krishnan",   site: "Bedok Mall",     action: "Annual inspection — all 25 assets compliant" },
      { date: "12 Jan 2025", tech: "Ahmad Razif",      site: "Funan Mall",     action: "Annual inspection — 26 assets inspected" },
    ],
  },
  {
    id: "maple", name: "Mapletree Business City", status: "Active", openDefects: 0,
    contact: { name: "Siti Rahimah", email: "siti.rahimah@mapletree.com.sg", phone: "+65 9456 7890" },
    sites: [
      { name: "MBC Phase 1", address: "20 Pasir Panjang Rd, Singapore 117439", assets: 47, compliance: "Compliant", lastServiced: "17 Jan 2025" },
      { name: "MBC Phase 2", address: "10 Pasir Panjang Rd, Singapore 117438", assets: 42, compliance: "Compliant", lastServiced: "16 Jan 2025" },
    ],
    contract: { start: "1 Sep 2023", renewal: "31 Aug 2025", value: "SGD $28,200/yr", renewalSoon: true },
    serviceHistory: [
      { date: "17 Jan 2025", tech: "Tan Boon Kiat",  site: "MBC Phase 1", action: "Semi-annual sprinkler inspection — all 36 heads passed" },
      { date: "16 Jan 2025", tech: "Muthu Krishnan", site: "MBC Phase 2", action: "Annual inspection — all assets compliant, certs issued" },
      { date: "10 Dec 2024", tech: "Lim Chee Wah",   site: "MBC Phase 1", action: "Hydrant biennial test — flow rate confirmed at spec" },
    ],
  },
  {
    id: "changi", name: "Changi Airport Group", status: "Active", openDefects: 3,
    contact: { name: "Raymond Chia", email: "raymond.chia@changiairport.com", phone: "+65 9567 8901" },
    sites: [
      { name: "Terminal 1",   address: "Changi Airport, Singapore 819642",  assets: 58, compliance: "Overdue",          lastServiced: "5 Jan 2025"  },
      { name: "Terminal 2",   address: "Changi Airport, Singapore 819643",  assets: 54, compliance: "Attention Needed", lastServiced: "8 Jan 2025"  },
      { name: "Terminal 3",   address: "Changi Airport, Singapore 819645",  assets: 52, compliance: "Compliant",        lastServiced: "12 Jan 2025" },
      { name: "Jewel Changi", address: "78 Airport Blvd, Singapore 819666", assets: 37, compliance: "Compliant",        lastServiced: "14 Jan 2025" },
    ],
    contract: { start: "1 Jan 2023", renewal: "31 Dec 2025", value: "SGD $43,500/yr", renewalSoon: true },
    serviceHistory: [
      { date: "14 Jan 2025", tech: "Ahmad Razif",      site: "Jewel Changi", action: "Annual inspection — 37 assets inspected, all clear" },
      { date: "12 Jan 2025", tech: "Selvam Rajendran", site: "Terminal 3",   action: "Quarterly sprinkler check — 52 heads inspected" },
      { date: "8 Jan 2025",  tech: "Tan Boon Kiat",    site: "Terminal 2",   action: "Annual hose reel inspection — 3 defects raised" },
    ],
  },
];

// ─── TECHNICIAN DATA ──────────────────────────────────────────────────────────

export const TECHS = [
  { id: "AR", name: "Ahmad Razif",      empId: "UF-TECH-001", spec: "Full Spectrum",         phone: "+65 9111 2222", status: "On Assignment", assigned: 18, completed: 14 },
  { id: "TK", name: "Tan Boon Kiat",    empId: "UF-TECH-002", spec: "Suppression Systems",   phone: "+65 9222 3333", status: "On Assignment", assigned: 12, completed: 10 },
  { id: "SR", name: "Selvam Rajendran", empId: "UF-TECH-003", spec: "Detection & Alarms",    phone: "+65 9333 4444", status: "Available",     assigned: 15, completed: 15 },
  { id: "LC", name: "Lim Chee Wah",     empId: "UF-TECH-004", spec: "Extinguisher Certified", phone: "+65 9444 5555", status: "On Assignment", assigned: 20, completed: 16 },
  { id: "MK", name: "Muthu Krishnan",   empId: "UF-TECH-005", spec: "Full Spectrum",         phone: "+65 9555 6666", status: "Available",     assigned: 10, completed: 10 },
];

// ─── FORM BUILDER DATA ────────────────────────────────────────────────────────

export const MY_FORMS = [
  { id: 1, name: "Fire Extinguisher Annual Inspection",   type: "Inspection",    fields: 14, assignedTo: "Fire Extinguishers",   status: "Active", lastEdited: "12 Jan 2025" },
  { id: 2, name: "Hose Reel Quarterly Check",             type: "Inspection",    fields: 9,  assignedTo: "Hose Reels",            status: "Active", lastEdited: "5 Feb 2025"  },
  { id: 3, name: "Defect Report — Standard",              type: "Defect Report", fields: 11, assignedTo: "All Assets",            status: "Active", lastEdited: "20 Jan 2025" },
  { id: 4, name: "Sprinkler Head Inspection",             type: "Inspection",    fields: 16, assignedTo: "Sprinkler Systems",     status: "Active", lastEdited: "8 Mar 2025"  },
  { id: 5, name: "Suppression System Service Record",     type: "Certificate",   fields: 18, assignedTo: "Suppression Systems",   status: "Active", lastEdited: "1 Mar 2025"  },
  { id: 6, name: "Custom Client Checklist — Changi Airport", type: "Custom",     fields: 22, assignedTo: "Changi Airport Group",  status: "Draft",  lastEdited: "15 Mar 2025" },
];

export const TEMPLATES = [
  { id: 1, name: "Standard Fire Extinguisher Check", category: "Inspection",    desc: "Basic monthly extinguisher check template" },
  { id: 2, name: "Annual Compliance Inspection",      category: "Inspection",    desc: "Comprehensive annual fire safety inspection" },
  { id: 3, name: "Defect Identification Report",      category: "Defect Report", desc: "Standardised defect logging with photo evidence" },
  { id: 4, name: "Certificate of Completion",         category: "Certificate",   desc: "Post-service certificate template" },
  { id: 5, name: "Multi-Asset Site Audit",            category: "Custom",        desc: "Full site audit across multiple asset types" },
  { id: 6, name: "Client Handover Checklist",         category: "Custom",        desc: "End-of-contract asset handover documentation" },
];

export const FORM_FIELDS_PRESET = [
  { label: "Asset Information",             type: "Section Header",   required: false },
  { label: "Asset ID",                      type: "Short Text",       required: true  },
  { label: "Location / Floor",              type: "Short Text",       required: true  },
  { label: "Inspection Date",               type: "Date",             required: true  },
  { label: "Technician Name",               type: "Short Text",       required: true  },
  { label: "Physical Condition",            type: "Section Header",   required: false },
  { label: "Cylinder undamaged",            type: "Checkbox",         required: false },
  { label: "Safety pin intact",             type: "Checkbox",         required: false },
  { label: "Pressure gauge in green zone",  type: "Checkbox",         required: false },
  { label: "Hose and nozzle clear",         type: "Checkbox",         required: false },
  { label: "Overall Condition",             type: "Rating Scale",     required: false },
  { label: "Documentation",                 type: "Section Header",   required: false },
  { label: "Upload inspection photo",       type: "Photo Upload",     required: false },
  { label: "Technician Sign-off",           type: "Signature Capture",required: false },
];

export const FIELD_TYPES = [
  { icon: "📝", label: "Short Text" },
  { icon: "📄", label: "Long Text" },
  { icon: "🔢", label: "Number" },
  { icon: "📅", label: "Date" },
  { icon: "☑️", label: "Checkbox" },
  { icon: "🔘", label: "Radio Buttons" },
  { icon: "📋", label: "Dropdown Select" },
  { icon: "📷", label: "Photo Upload" },
  { icon: "✍️", label: "Signature Capture" },
  { icon: "⭐", label: "Rating Scale" },
  { icon: "📌", label: "Section Header" },
  { icon: "ℹ️",  label: "Instructions Text" },
];
