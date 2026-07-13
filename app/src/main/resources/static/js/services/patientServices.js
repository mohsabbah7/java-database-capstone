const BASE = "/api/patients";

export async function getPatientData(token) {
  const response = await fetch(`${BASE}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch patient data");
  return response.json();
}

export async function getPatientAppointments(patientId, token) {
  const response = await fetch(`${BASE}/${patientId}/appointments`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
}

export async function filterPatients(name, token) {
  const params = new URLSearchParams();
  if (name) params.append("name", name);

  const response = await fetch(`${BASE}/filter?${params.toString()}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) throw new Error("Failed to filter patients");
  return response.json();
}
