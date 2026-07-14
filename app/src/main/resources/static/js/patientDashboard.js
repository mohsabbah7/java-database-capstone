import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) signupBtn.addEventListener("click", () => openModal("patientSignup"));

  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) loginBtn.addEventListener("click", () => openModal("patientLogin"));

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
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (doctors.length > 0) {
    doctors.forEach((doctor) => contentDiv.appendChild(createDoctorCard(doctor)));
  } else {
    contentDiv.innerHTML = "<p class=\"noPatientRecord\">No doctors found with the given filters.</p>";
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = `<p class="noPatientRecord">No doctors found.</p>`;
    return;
  }

  doctors.forEach((doctor) => contentDiv.appendChild(createDoctorCard(doctor)));
}

window.signupPatient = async function () {
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    phone: document.getElementById("phone").value,
    address: document.getElementById("address").value,
  };

  const result = await patientSignup(data);
  if (result.success) {
    alert(result.message || "Signup successful. Please log in.");
    document.getElementById("modal").style.display = "none";
    window.location.reload();
  } else {
    alert(result.message || "Signup failed.");
  }
};

window.loginPatient = async function () {
  const data = {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    const response = await patientLogin(data);
    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", "loggedPatient");
      window.location.href = "/pages/patientDashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  } catch (error) {
    alert("Something went wrong. Please try again.");
    console.error(error);
  }
};
