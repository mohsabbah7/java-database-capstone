document.addEventListener("DOMContentLoaded", () => {
  loadTodayAppointments();

  const searchBar = document.getElementById("searchBar");
  const todayBtn = document.getElementById("todayBtn");
  const dateInput = document.getElementById("appointmentDate");

  if (searchBar) searchBar.addEventListener("input", applyPatientSearch);
  if (todayBtn) todayBtn.addEventListener("click", loadTodayAppointments);
  if (dateInput) dateInput.addEventListener("change", () => loadAppointmentsByDate(dateInput.value));
});

async function loadTodayAppointments() {
  const today = new Date().toISOString().split("T")[0];
  await loadAppointmentsByDate(today);
}

async function loadAppointmentsByDate(date) {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(`/api/doctor/appointments?date=${date}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!response.ok) throw new Error("Failed to fetch appointments");
    const appointments = await response.json();
    renderAppointments(appointments);
  } catch (err) {
    renderError(err.message);
  }
}

function applyPatientSearch() {
  const query = document.getElementById("searchBar").value.toLowerCase();
  const rows = document.querySelectorAll("#patientTable tbody tr");
  rows.forEach((row) => {
    const name = row.children[1]?.textContent.toLowerCase() || "";
    row.style.display = name.includes(query) ? "" : "none";
  });
}

function renderAppointments(appointments) {
  const tbody = document.querySelector("#patientTable tbody");
  if (!tbody) return;
  tbody.innerHTML = "";

  if (!appointments || appointments.length === 0) {
    const emptyRow = document.createElement("tr");
    emptyRow.innerHTML = `<td colspan="5" class="noPatientRecord">No appointments found for this date.</td>`;
    tbody.appendChild(emptyRow);
    return;
  }

  appointments.forEach((appointment) => {
    tbody.appendChild(createPatientRow(appointment));
  });
}

function renderError(message) {
  const tbody = document.querySelector("#patientTable tbody");
  if (tbody) tbody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">Error: ${message}</td></tr>`;
}
