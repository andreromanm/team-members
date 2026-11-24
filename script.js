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
    lastLogin: null
  }
];

const workspace = {
  name: "Acme Inc.",
  plan: "Pro",
  seats: { used: 0, total: 50 } // The used 0 is calculated from users below
};

// ==========================================
// 2. LOGIC & ACTIONS 
// ==========================================

// filter: to keep members who occupy a seat (active or invited)
const membersUsingSeats = users.filter(
  user => user.status === "invited" || user.status === "active"
);

workspace.seats.used = membersUsingSeats.length; // seats used = members who are active or invited

// What to do if the operation returns decimal: (43 / 47 * 100 = 91.489...)
const rawPercentage = (workspace.seats.used / workspace.seats.total) * 100;
// Round it to the nearest whole number
const percentage = Math.round(rawPercentage);

// To change the hard-coded text into dynamic inputs
const seatsBadge = document.querySelector('.seat-usage-badge'); // The 90%
const metricParagraph = document.querySelector('.metric'); // The 45/50
const isNearCapacity = percentage >= 90;

if (isNearCapacity) {
  seatsBadge.classList.add('badge--warning');
} else {
  seatsBadge.classList.add('badge--success');
}

// The operations or transformation for each calculation
seatsBadge.textContent = `${percentage}%`;
metricParagraph.textContent = `${workspace.seats.used} / ${workspace.seats.total}`;

// A function (reusable recipe) that uses input and return outputs, for Status Label 
function getStatusLabel(status) {        // status = the input
  if (status === "active") {
    return "Active";                     // return = the output
  } else if (status === "invited") {
    return "Invite pending";
  } else if (status === "deactivated") {
    return "Deactivated";  
  } else if (status === "expired") {
    return "Expired";
  } else {
    return "Unknown";                    // always handle the case you didn't expect
  }
}

// A function for Variants and their badges 
function getStatusVariant(status) {
  if (status === "active") {
    return "badge--success";
  } else if (status === "invited") {
    return "badge--warning";
  } else {
    return "badge--neutral";
  }
}

// Scenarios for null or return the date 
function formatLastLogin(lastLogin) {
  if (!lastLogin) { // ! before an item means: if there's not... or that item has no value... 
    return "Never";
  }

 const date = new Date(lastLogin);
  return date.toLocaleDateString("en-US", {
    month: "short", //Short means short version so instead of November (long) use Nov
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}

// Function for adding dynamic info into the table in HTML instead of hard coded. 
function renderRow(user) {
  const formattedRole = capitalize(user.role);
  const statusLabel = getStatusLabel(user.status);
  const statusVariant = getStatusVariant(user.status);
  const formattedLogin = formatLastLogin(user.lastLogin);

  let actionHtml = "";
  if (user.status === "invited" || user.status === "expired") {
    actionHtml = `<button type="button" class="btn btn--secondary">Resend invite <span class="sr-only">to ${user.name}</span></button>`;
  }

  return `
    <tr>
      <td>${user.name}</td>
      <td>${formattedRole}</td>
      <td><span class="badge ${statusVariant}">${statusLabel}</span></td>
      <td>${formattedLogin}</td>
      <td>${actionHtml}</td>
    </tr>
  `;
}

// Function so the data from the renderRow can be shown in the HTML
const tbody = document.querySelector(".members-table tbody");

// Function to turn to Upper case
function capitalize(text) {
  if (!text) return ""; // It can read as: if there's no text, the function returns "" and stops right there. And if it find something continue with the Upper Case.
  return text.charAt(0).toUpperCase() + text.slice(1);
}

// A good rule for console log is to test every: if, else if and else, they should run at least once while you test.
console.log(getStatusLabel("active"));
console.log(getStatusLabel("invited"));
console.log(getStatusLabel("deactivated"));
console.log(getStatusLabel("expired"));
console.log(getStatusLabel("banana"));
console.log(getStatusVariant("active")); 
console.log(getStatusVariant("invited")); 
console.log(getStatusVariant("deactivated")); 
console.log(getStatusVariant("expired")); 
console.log(getStatusVariant("banana"));  
console.log(formatLastLogin(null));  
console.log(formatLastLogin("2026-11-08")); 


const invitedMembers = users.filter(user => user.status === "invited");
const invitedNames = invitedMembers.map(user => user.name);

console.log(invitedNames);

// Configurate the table to return search and filter button
let searchQuery = "";      // what's typed in the search box
let currentFilter = "all"; // which filter button is selected

function handleSearch(event) {
  searchQuery = event.target.value;
  renderTable();
}

function normalizeQuery(text) {
  if (!text) return "";
  return text.trim().toLowerCase();
}

function renderTable() {
  if (!tbody) return;

  const normalizedQuery = normalizeQuery(searchQuery);

  const filteredUsers = users.filter(user => {
    const matchesStatus =
      currentFilter === "all" || user.status === currentFilter;

    const matchesSearch =
      normalizedQuery === "" ||
      user.name.toLowerCase().includes(normalizedQuery) ||
      user.email.toLowerCase().includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });

    if (filteredUsers.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5">No matching results found <button type="button" id="reset-filters" class="btn btn--secondary">Show all members</button></td>
        
      </tr>
    `;
  } else {
    tbody.innerHTML = filteredUsers.map(renderRow).join("");
  }
}

// Call once on initial page load
renderTable();

// Practice for me
const filterButtons = document.querySelectorAll("[data-filter]");

    filterButtons.forEach((button) => {
      button.addEventListener("click", () => {
        currentFilter = button.dataset.filter;
    
    filterButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
    });

    renderTable();
  });
});

const searchInput = document.querySelector("#member-search");

const resetBtn = tbody.querySelector("#reset-filters"); 

tbody.addEventListener("click", (event) => {
  const resetButton = event.target.closest("#reset-filters");
  if (!resetButton) return;

  searchQuery = "";
  currentFilter = "all";

  if (searchInput) {
  searchInput.value = "";
  }

  filterButtons.forEach((btn) => {
    btn.setAttribute("aria-pressed", btn.dataset.filter === "all" ? "true" : "false");
  });

  console.log("reset clicked");
  renderTable();
});