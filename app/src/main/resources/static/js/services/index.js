// Wires up the role-selection buttons on the homepage (index.html).
// Clicking a role opens a login modal for that role; on success, redirects
// to the correct dashboard and stores the token + role in localStorage.

document.addEventListener("DOMContentLoaded", () => {
  const adminBtn = document.getElementById("adminBtn");
  const doctorBtn = document.getElementById("doctorBtn");
  const patientBtn = document.getElementById("patientBtn");

  if (adminBtn) adminBtn.addEventListener("click", () => selectRole("admin"));
  if (doctorBtn) doctorBtn.addEventListener("click", () => selectRole("doctor"));
  if (patientBtn) patientBtn.addEventListener("click", () => selectRole("patient"));
});

function selectRole(role) {
  localStorage.setItem("userRole", role);

  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <h2>${role.charAt(0).toUpperCase() + role.slice(1)} Login</h2>
    <form id="roleLoginForm">
      <input type="text" id="roleUsername" class="input-field" placeholder="Username or Email" required />
      <input type="password" id="rolePassword" class="input-field" placeholder="Password" required />
      <button type="submit" class="button">Login</button>
    </form>`;
  modal.style.display = "block";

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.onclick = () => (modal.style.display = "none");

  document.getElementById("roleLoginForm").addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = document.getElementById("roleUsername").value;
    const password = document.getElementById("rolePassword").value;
    await handleRoleLogin(role, username, password);
  });
}

async function handleRoleLogin(role, username, password) {
  try {
    const response = await fetch(`/api/${role}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, email: username, password }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      throw new Error(err.message || "Invalid credentials");
    }

    const data = await response.json();
    localStorage.setItem("token", data.token);

    if (role === "patient") {
      localStorage.setItem("userRole", "loggedPatient");
      window.location.href = "/pages/patientDashboard.html";
    } else if (role === "admin") {
      localStorage.setItem("userRole", "admin");
      window.location.href = "/adminDashboard";
    } else if (role === "doctor") {
      localStorage.setItem("userRole", "doctor");
      window.location.href = "/doctorDashboard";
    }
  } catch (err) {
    alert(`Login failed: ${err.message}`);
  }
}
