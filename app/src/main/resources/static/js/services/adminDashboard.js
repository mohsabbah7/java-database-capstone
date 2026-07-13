import { getDoctors, filterDoctors } from "./doctorServices.js";
import { createDoctorCard } from "../components/doctorCard.js";

document.addEventListener("DOMContentLoaded", () => {
  loadDoctors();

  const searchBar = document.getElementById("searchBar");
  const timeFilter = document.getElementById("filterTime");
  const specialtyFilter = document.getElementById("filterSpecialty");

  if (searchBar) searchBar.addEventListener("input", applyFilters);
  if (timeFilter) timeFilter.addEventListener("change", applyFilters);
  if (specialtyFilter) specialtyFilter.addEventListener("change", applyFilters);
});

async function loadDoctors() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (err) {
    renderError(err.message);
  }
}

async function applyFilters() {
  const name = document.getElementById("searchBar")?.value || "";
  const time = document.getElementById("filterTime")?.value || "";
  const specialty = document.getElementById("filterSpecialty")?.value || "";

  try {
    const doctors = await filterDoctors(name, time, specialty);
    renderDoctorCards(doctors);
  } catch (err) {
    renderError(err.message);
  }
}

function renderDoctorCards(doctors) {
  const content = document.getElementById("content");
  if (!content) return;
  content.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    content.innerHTML = `<p class="noPatientRecord">No doctors found.</p>`;
    return;
  }

  doctors.forEach((doctor) => {
    content.appendChild(createDoctorCard(doctor));
  });
}

function renderError(message) {
  const content = document.getElementById("content");
  if (content) content.innerHTML = `<p class="noPatientRecord">Error: ${message}</p>`;
}
