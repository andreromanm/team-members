// ==========================================
// 1. DATA & STATE (Source of Truth)
// ==========================================
const users = [
  {
    id: 1,
    name: "Ana López",
    email: "ana.lopez@acmeinc.io",
    role: "owner",
    status: "active",
    joinedAt: "2024-01-15",
    lastLogin: "2026-11-19" // logged in today
  },
  {
    id: 2,
    name: "Ben Carter",
    email: "ben.carter@acmeinc.io",
    role: "editor",
    status: "invited",
    joinedAt: "2026-11-10",
    lastLogin: null
  },
  {
    id: 3,
    name: "Chen Wei",
    email: "chen.wei@acmeinc.io",
    role: "viewer",
    status: "active",
    joinedAt: "2025-03-04",
    lastLogin: "2026-10-02"
  },
  {
    id: 4,
    name: "Dana Ortiz",
    email: "dana.ortiz@acmeinc.io",
    role: "editor",
    status: "deactivated",
    joinedAt: "2024-08-21",
    lastLogin: "2026-06-15"
  },
  {
    id: 5,
    name: "Maria Fernanda Gutiérrez-Santillán",
    email: "mf.gutierrez-santillan@acmeinc.io",
    role: "admin",
    status: "active",
    joinedAt: "2025-07-19",
    lastLogin: "2026-11-18"
  },
  {
    id: 6,
    name: "Samir Patel",
    email: "samir.patel@acmeinc.io",
    role: "billing", // 4th role
    status: "active",
    joinedAt: "2025-11-01",
    lastLogin: "2026-11-12"
  },
  {
    id: 7,
    name: "Lucía Méndez",
    email: "lucia.mendez@acmeinc.io",
    role: "viewer",
    status: "invited", // 2nd invited member
    joinedAt: "2026-11-17",
    lastLogin: null
  },
  {
    id: 8,
    name: "Mateo Silva",
    email: "mateo.silva@acmeinc.io",
    role: "admin",
    status: "expired", // another B2B workspace state
    joinedAt: "2024-11-30",
    lastLogin: "2026-09-28"
  }
];

const workspace = {
  name: "Acme Inc.",
  plan: "Pro",
  seats: { used: 45, total: 50 }
};

console.log(workspace.seats.used);

// ==========================================
// 2. LOGIC & ACTIONS 
// ==========================================

console.log(users.length);                    // Total count of members
console.log(users[users.length - 1].name);    // Name of the last member
console.log(users[3].email);                  // Email of the 4th member

// Test logging for a single user (Ben)
const ben = users[1];
const formattedRole = ben.role.charAt(0).toUpperCase() + ben.role.slice(1);
console.log(`${ben.name} · ${formattedRole} · ${ben.status}`);

// Calculate and log seat usage percentage What to do if the operation returns decimal: (43 / 47 * 100 = 91.489...)
const rawPercentage = (workspace.seats.used / workspace.seats.total) * 100;
// Round it to the nearest whole number
const percentage = Math.round(rawPercentage);
console.log(`${percentage}%`);

// This automatically evaluates to true or false
const isNearCapacity = percentage >= 90;

console.log(isNearCapacity); // True when 90% or more

// To change the hard-coded text into dynamic inputs
const seatsBadge = document.querySelector('.seats-badge'); // The 90%
const metricParagraph = document.querySelector('.metric'); // The 45/50

// The operations or transformation for each calculation
seatsBadge.textContent = `${percentage}%`;
metricParagraph.textContent = `${workspace.seats.used} / ${workspace.seats.total}`;