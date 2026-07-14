function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("index.html")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo">Smart Clinic</div>
      </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  let headerContent = `
    <header class="header">
      <div class="logo">Smart Clinic</div>
      <nav class="nav-links">`;

  if (role === "admin") {
    headerContent += `
        <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
        <a href="#" id="logoutLink">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
        <a href="/">Home</a>
        <a href="#" id="logoutLink">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
        <button id="patientLogin" class="button" onclick="openModal('patientLogin')">Login</button>
        <button id="patientSignup" class="button" onclick="openModal('patientSignup')">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
        <a href="/pages/patientDashboard.html">Home</a>
        <a href="/pages/patientAppointments.html">Appointments</a>
        <a href="#" id="logoutLink">Logout</a>`;
  }

  headerContent += `
      </nav>
    </header>`;

  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const logoutLink = document.getElementById("logoutLink");
  if (logoutLink) {
    logoutLink.addEventListener("click", (e) => {
      e.preventDefault();
      const role = localStorage.getItem("userRole");
      if (role === "loggedPatient") {
        logoutPatient();
      } else {
        logout();
      }
    });
  }
}

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}
