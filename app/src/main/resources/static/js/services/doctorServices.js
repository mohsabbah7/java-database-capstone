const BASE = "/api/doctors";

export async function getDoctors() {
  const response = await fetch(BASE);
  if (!response.ok) throw new Error("Failed to fetch doctors");
  return response.json();
}

export async function filterDoctors(name, time, specialty) {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (time) params.append("time", time);
  if (specialty) params.append("specialty", specialty);

  const response = await fetch(`${BASE}/filter?${params.toString()}`);
  if (!response.ok) throw new Error("Failed to filter doctors");
  return response.json();
}

export async function addDoctor(doctor, token) {
  const response = await fetch(BASE, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(doctor),
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to add doctor");
  }
  return response.json();
}

export async function deleteDoctor(id, token) {
  const response = await fetch(`${BASE}/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(err.message || "Failed to delete doctor");
  }
  return true;
}
