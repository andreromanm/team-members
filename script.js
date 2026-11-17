// ==========================================
// 1. DATA & STATE (Source of Truth)
// ==========================================
const users = [
  { id: 1, name: "Ana López",  role: "admin",  status: "active",     lastLogin: "2026-11-08" },
  { id: 2, name: "Ben Carter", role: "editor", status: "invited",     lastLogin: null },
  { id: 3, name: "Chen Wei",   role: "viewer", status: "active",     lastLogin: "2026-10-02" },
  { id: 4, name: "Dana Ortiz", role: "editor", status: "deactivated", lastLogin: "2026-06-15" }
];

const seatsUsed = 47;
const seatsTotal = 49;


// ==========================================
// 2. LOGIC & ACTIONS 
// ==========================================

// Test logging for a single user (Ben)
const ben = users[1];
const formattedRole = ben.role.charAt(0).toUpperCase() + ben.role.slice(1);
console.log(`${ben.name} · ${formattedRole} · ${ben.status}`);

// Calculate and log seat usage percentage What to do if the operation returns decimal: (43 / 47 * 100 = 91.489...)
const rawPercentage = (seatsUsed / seatsTotal) * 100;
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
metricParagraph.textContent = `${seatsUsed} / ${seatsTotal}`;