import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

let selectedDate = new Date().toISOString().split("T")[0];
const token = localStorage.getItem("token");
let patientName = "null";

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      const value = searchBar.value.trim();
      patientName = value.length > 0 ? value : "null";
      loadAppointments();
    });
  }

  const todayButton = document.getElementById("todayButton");
  if (todayButton) {
    todayButton.addEventListener("click", () => {
      selectedDate = new Date().toISOString().split("T")[0];
      const datePicker = document.getElementById("datePicker");
      if (datePicker) datePicker.value = selectedDate;
      loadAppointments();
    });
  }

  const datePicker = document.getElementById("datePicker");
  if (datePicker) {
    datePicker.value = selectedDate;
    datePicker.addEventListener("change", (e) => {
      selectedDate = e.target.value;
      loadAppointments();
    });
  }

  loadAppointments();
});

async function loadAppointments() {
  const tableBody = document.getElementById("patientTableBody");
  if (!tableBody) return;

  try {
    const appointments = await getAllAppointments(selectedDate, patientName, token);
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">No Appointments found for today.</td></tr>`;
      return;
    }

    appointments.forEach((appointment) => {
      tableBody.appendChild(createPatientRow(appointment));
    });
  } catch (error) {
    tableBody.innerHTML = `<tr><td colspan="5" class="noPatientRecord">Error loading appointments.</td></tr>`;
    console.error(error);
  }
}
