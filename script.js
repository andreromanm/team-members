// ==========================================
// 1. DATA
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
// 2. STATE (Source of Truth)
// ==========================================
let searchQuery = "";      // what's typed in the search box
let currentFilter = "all"; // which status filter button is selected

// ==========================================
// 3. HELPER FUNCTIONS
// ==========================================
function capitalize(text) {
  if (!text) return ""; // if there's no text, return "" and stop
  return text.charAt(0).toUpperCase() + text.slice(1);
}

function normalizeText(text) {
  if (!text) return "";
  return text
    .normalize("NFD")                // splits accented letters (like "ó") into base letter + mark
    .replace(/[\u0300-\u036f]/g, "") // removes accent marks
    .trim()
    .toLowerCase();
}

function getStatusLabel(status) {
  if (status === "active") {
    return "Active";
  } else if (status === "invited") {
    return "Invite pending";
  } else if (status === "deactivated") {
    return "Deactivated";
  } else if (status === "expired") {
    return "Expired";
  } else {
    return "Unknown";
  }
}

function getStatusVariant(status) {
  if (status === "active") {
    return "badge--success";
  } else if (status === "invited") {
    return "badge--warning";
  } else {
    return "badge--neutral";
  }
}

function formatLastLogin(lastLogin) {
  if (!lastLogin) {
    return "Never";
  }

  const date = new Date(lastLogin);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC"
  });
}

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
function escapeHtml(text) {
  return String(text ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;");
}

function getEmptyStateMessage(filter, query) {
  const trimmedQuery = query.trim();
  const safeQuery = escapeHtml(trimmedQuery);
  const hasFilter = filter !== "all";
  const hasQuery = trimmedQuery !== "";

  if (hasFilter && hasQuery) {
    return `No ${filter} members match "${safeQuery}".`;
  }

  if (hasQuery) {
    return `No members match "${safeQuery}".`;
  }

  if (hasFilter) {
    return `No ${filter} members found.`;
  }

  return "No members found.";
}

// ==========================================
// 4. RENDER TABLE
// ==========================================
const tbody = document.querySelector(".members-table tbody");

function renderTable() {
  if (!tbody) return;

  const normalizedQuery = normalizeText(searchQuery);

  const filteredUsers = users.filter(user => {
    const matchesStatus =
      currentFilter === "all" || user.status === currentFilter;

    const matchesSearch =
      normalizedQuery === "" ||
      normalizeText(user.name).includes(normalizedQuery) ||
      normalizeText(user.email).includes(normalizedQuery);

    return matchesStatus && matchesSearch;
  });

  if (filteredUsers.length === 0) {
    const emptyMessage = getEmptyStateMessage(currentFilter, searchQuery);
    tbody.innerHTML = `
      <tr>
        <td colspan="5">
         ${emptyMessage}
          <button type="button" id="reset-filters" class="btn btn--secondary">Show all members</button>
        </td>
      </tr>
    `;
  } else {
    tbody.innerHTML = filteredUsers.map(renderRow).join("");
  }
}

// ==========================================
// 5. SEAT SUMMARY & EVENT LISTENERS
// ==========================================
const membersUsingSeats = users.filter(
  user => user.status === "invited" || user.status === "active"
);

workspace.seats.used = membersUsingSeats.length;
const percentage = Math.round((workspace.seats.used / workspace.seats.total) * 100);

const seatsBadge = document.querySelector(".seat-usage-badge");
const metricParagraph = document.querySelector(".metric");

if (seatsBadge && metricParagraph) {
  seatsBadge.classList.add(percentage >= 90 ? "badge--warning" : "badge--success");
  seatsBadge.textContent = `${percentage}%`;
  metricParagraph.textContent = `${workspace.seats.used} / ${workspace.seats.total}`;
}

const searchInput = document.querySelector("#member-search");
const filterButtons = document.querySelectorAll("[data-filter]");

function handleSearch(event) {
  searchQuery = event.target.value;
  renderTable();
}

if (searchInput) {
  searchInput.addEventListener("input", handleSearch);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;

    filterButtons.forEach((btn) => {
      btn.setAttribute("aria-pressed", btn === button ? "true" : "false");
    });

    renderTable();
  });
});

if (tbody) {
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

    renderTable();
  });
}


// ==========================================
// 6. INITIAL RENDER
// ==========================================
renderTable();