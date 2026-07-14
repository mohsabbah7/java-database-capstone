import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  const searchBar = document.getElementById("searchBar");
  const timeFilter = document.getElementById("filterTime");
  const specialtyFilter = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);
  if (timeFilter) timeFilter.addEventListener("change", filterDoctorsOnChange);
  if (specialtyFilter) specialtyFilter.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  const doctors = await getDoctors();
  renderDoctorCards(doctors);
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar")?.value || "";
  const time = document.getElementById("filterTime")?.value || "";
  const specialty = document.getElementById("filterSpecialty")?.value || "";

  const doctors = await filterDoctors(name, time, specialty);
  renderDoctorCards(doctors);
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = `<p class="noPatientRecord">No doctors found.</p>`;
    return;
  }

  doctors.forEach((doctor) => {
    contentDiv.appendChild(createDoctorCard(doctor));
  });
}

// Triggered by the Add Doctor form submit inside the modal (see modals.js)
window.adminAddDoctor = async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("Please log in as admin first.");
    return;
  }

  const doctor = {
    name: document.getElementById("docName").value,
    specialty: document.getElementById("docSpecialty").value,
    email: document.getElementById("docEmail").value,
    password: document.getElementById("docPassword").value,
    phone: document.getElementById("docPhone").value,
    availableTimes: document
      .getElementById("docAvailability")
      .value.split(",")
      .map((t) => t.trim())
      .filter(Boolean),
  };

  const result = await saveDoctor(doctor, token);
  if (result.success) {
    alert(result.message || "Doctor added successfully.");
    document.getElementById("modal").style.display = "none";
    loadDoctorCards();
  } else {
    alert(result.message || "Failed to add doctor.");
  }
};
