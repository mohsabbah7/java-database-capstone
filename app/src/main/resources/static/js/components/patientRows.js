export function createPatientRow(appointment) {
  const row = document.createElement("tr");

  const idCell = document.createElement("td");
  idCell.textContent = appointment.patient.id;

  const nameCell = document.createElement("td");
  nameCell.textContent = appointment.patient.name;

  const phoneCell = document.createElement("td");
  phoneCell.textContent = appointment.patient.phone;

  const emailCell = document.createElement("td");
  emailCell.textContent = appointment.patient.email || "N/A";

  const prescriptionCell = document.createElement("td");
  const prescriptionBtn = document.createElement("button");
  prescriptionBtn.textContent = "View Prescriptions";
  prescriptionBtn.classList.add("prescription-btn");
  prescriptionBtn.addEventListener("click", () => {
    window.location.href = `/pages/patientPrescriptions.html?patientId=${appointment.patient.id}`;
  });
  prescriptionCell.appendChild(prescriptionBtn);

  row.appendChild(idCell);
  row.appendChild(nameCell);
  row.appendChild(phoneCell);
  row.appendChild(emailCell);
  row.appendChild(prescriptionCell);

  return row;
}
