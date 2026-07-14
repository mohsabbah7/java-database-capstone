export function openModal(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = getModalContent(type);
  modal.style.display = "block";

  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.onclick = closeModal;

  if (type === "addDoctor") {
    const form = document.getElementById("addDoctorForm");
    if (form) {
      form.addEventListener("submit", (e) => {
        e.preventDefault();
        window.adminAddDoctor();
      });
    }
  }
}

export function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.style.display = "none";
}

function getModalContent(type) {
  switch (type) {
    case "adminLogin":
      return `
        <h2>Admin Login</h2>
        <input type="text" id="username" class="input-field" placeholder="Username" />
        <input type="password" id="password" class="input-field" placeholder="Password" />
        <button class="button" onclick="adminLoginHandler()">Login</button>`;

    case "doctorLogin":
      return `
        <h2>Doctor Login</h2>
        <input type="email" id="email" class="input-field" placeholder="Email" />
        <input type="password" id="password" class="input-field" placeholder="Password" />
        <button class="button" onclick="doctorLoginHandler()">Login</button>`;

    case "patientLogin":
      return `
        <h2>Patient Login</h2>
        <input type="email" id="email" class="input-field" placeholder="Email" />
        <input type="password" id="password" class="input-field" placeholder="Password" />
        <button class="button" onclick="loginPatient()">Login</button>`;

    case "patientSignup":
      return `
        <h2>Patient Sign Up</h2>
        <input type="text" id="name" class="input-field" placeholder="Full name" />
        <input type="email" id="email" class="input-field" placeholder="Email" />
        <input type="password" id="password" class="input-field" placeholder="Password" />
        <input type="text" id="phone" class="input-field" placeholder="Phone (10 digits)" />
        <input type="text" id="address" class="input-field" placeholder="Address" />
        <button class="button" onclick="signupPatient()">Sign Up</button>`;

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

    default:
      return "";
  }
}

// Booking overlay shown when a logged-in patient clicks "Book Now" on a doctor card
export function showBookingOverlay(event, doctor, patientData) {
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
      const token = localStorage.getItem("token");
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorId: doctor.id,
          patientId: patientData.id,
          appointmentTime: `${date}T${time.split("-")[0]}:00`,
        }),
      });
      if (!response.ok) throw new Error("Booking request failed");
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
