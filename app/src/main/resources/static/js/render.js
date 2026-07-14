// Runs on every page that includes header.js and footer.js,
// so the shared layout pieces get injected as soon as the DOM is ready.
document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();
});

// Saves the chosen role and routes to the right dashboard.
// Called after a successful admin/doctor login, and directly when a patient
// picks "Patient" on the homepage (patients don't need to log in to browse).
function selectRole(role) {
  localStorage.setItem("userRole", role);

  if (role === "admin") {
    window.location.href = "/adminDashboard";
  } else if (role === "doctor") {
    window.location.href = "/doctorDashboard";
  } else if (role === "patient") {
    window.location.href = "/pages/patientDashboard.html";
  }
}

window.selectRole = selectRole;
