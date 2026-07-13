// Central place for modal open/close logic and modal content templates.
// Exposed on window so inline onclick="openModal(...)" handlers keep working
// even though this file is loaded as a module.

function openModal(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = getModalContent(type);
  modal.style.display = "block";
  attachModalFormListeners(type);

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.onclick = closeModal;
}

function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

function getModalContent(type) {
  switch (type) {
    case "addDoctor":
      return `
        <h2>Add Doctor</h2>
        <form id="addDoctorForm">
          <input type="text" id="docName" class="input-field" placeholder="Full name" required />
          <input type="text" id="docSpecialty" class="input-field" placeholder="Specialty" required />
          <input type="email" id="docEmail" class="input-field" placeholder="Email" required />
          <input type="password" id="docPassword" class="input-field" placeholder="Password" required />
          <input type="text" id="docPhone" class="input-field" placeholder="Phone (10 digits)" required />
          <input type="text" id="docAvailability" class="input-field" placeholder="Available times, comma separated e.g. 09:00-10:00, 10:00-11:00" />
          <button type="submit" class="button">Save Doctor</button>
        </form>`;
    case "patientLogin":
      return `
        <h2>Patient Login</h2>
        <form id="patientLoginForm">
          <input type="email" id="loginEmail" class="input-field" placeholder="Email" required />
          <input type="password" id="loginPassword" class="input-field" placeholder="Password" required />
          <button type="submit" class="button">Login</button>
        </form>`;
    case "patientSignup":
      return `
        <h2>Patient Sign Up</h2>
        <form id="patientSignupForm">
          <input type="text" id="signupName" class="input-field" placeholder="Full name" required />
          <input type="email" id="signupEmail" class="input-field" placeholder="Email" required />
          <input type="password" id="signupPassword" class="input-field" placeholder="Password" required />
          <input type="text" id="signupPhone" class="input-field" placeholder="Phone (10 digits)" required />
          <input type="text" id="signupAddress" class="input-field" placeholder="Address" required />
          <button type="submit" class="button">Sign Up</button>
        </form>`;
    default:
      return "";
  }
}

function attachModalFormListeners(type) {
  if (type === "addDoctor") {
    const form = document.getElementById("addDoctorForm");
    if (form) form.addEventListener("submit", handleAddDoctorSubmit);
  } else if (type === "patientLogin") {
    const form = document.getElementById("patientLoginForm");
    if (form) form.addEventListener("submit", handlePatientLoginSubmit);
  } else if (type === "patientSignup") {
    const form = document.getElementById("patientSignupForm");
    if (form) form.addEventListener("submit", handlePatientSignupSubmit);
  }
}

async function handleAddDoctorSubmit(e) {
  e.preventDefault();
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

  try {
    const { addDoctor } = await import("../services/doctorServices.js");
    await addDoctor(doctor, getToken());
    alert("Doctor added successfully.");
    closeModal();
    window.location.reload();
  } catch (err) {
    alert(`Failed to add doctor: ${err.message}`);
  }
}

async function handlePatientLoginSubmit(e) {
  e.preventDefault();
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  try {
    const data = await apiFetch("/patient/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    localStorage.setItem("token", data.token);
    localStorage.setItem("userRole", "loggedPatient");
    closeModal();
    window.location.href = "/pages/patientDashboard.html";
  } catch (err) {
    alert(`Login failed: ${err.message}`);
  }
}

async function handlePatientSignupSubmit(e) {
  e.preventDefault();
  const patient = {
    name: document.getElementById("signupName").value,
    email: document.getElementById("signupEmail").value,
    password: document.getElementById("signupPassword").value,
    phone: document.getElementById("signupPhone").value,
    address: document.getElementById("signupAddress").value,
  };

  try {
    await apiFetch("/patient/signup", {
      method: "POST",
      body: JSON.stringify(patient),
    });
    alert("Signup successful. Please log in.");
    openModal("patientLogin");
  } catch (err) {
    alert(`Signup failed: ${err.message}`);
  }
}

// Booking overlay shown when a logged-in patient clicks "Book Now" on a doctor card
function showBookingOverlay(event, doctor, patientData) {
  const overlay = document.createElement("div");
  overlay.classList.add("modalApp");
  overlay.innerHTML = `
    <span class="close" id="closeBookingOverlay">&times;</span>
    <h3>Book Appointment with ${doctor.name}</h3>
    <select id="bookingTimeSlot" class="select-dropdown">
      ${(doctor.availableTimes || [])
        .map((t) => `<option value="${t}">${t}</option>`)
        .join("")}
    </select>
    <input type="date" id="bookingDate" class="input-field" />
    <button id="confirmBookingBtn" class="button">Confirm Booking</button>
  `;
  document.body.appendChild(overlay);
  overlay.classList.add("active");

  document.getElementById("closeBookingOverlay").addEventListener("click", () => {
    overlay.remove();
  });

  document.getElementById("confirmBookingBtn").addEventListener("click", async () => {
    const date = document.getElementById("bookingDate").value;
    const time = document.getElementById("bookingTimeSlot").value;
    if (!date || !time) {
      alert("Please select a date and time slot.");
      return;
    }
    try {
      await apiFetch("/appointments", {
        method: "POST",
        body: JSON.stringify({
          doctorId: doctor.id,
          patientId: patientData.id,
          appointmentTime: `${date}T${time.split("-")[0]}:00`,
        }),
      });
      alert("Appointment booked successfully.");
      overlay.remove();
    } catch (err) {
      alert(`Booking failed: ${err.message}`);
    }
  });
}

window.openModal = openModal;
window.closeModal = closeModal;
window.showBookingOverlay = showBookingOverlay;
