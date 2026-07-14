import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);
    const data = await response.json();
    return data.doctors || data || [];
  } catch (error) {
    console.error("Failed to fetch doctors:", error);
    return [];
  }
}

export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`, {
      method: "DELETE",
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || "" };
  } catch (error) {
    console.error("Failed to delete doctor:", error);
    return { success: false, message: "Failed to delete doctor." };
  }
}

export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(doctor),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message || "" };
  } catch (error) {
    console.error("Failed to save doctor:", error);
    return { success: false, message: "Failed to save doctor." };
  }
}

export async function filterDoctors(name, time, specialty) {
  try {
    const safeName = name && name.length > 0 ? name : "null";
    const safeTime = time && time.length > 0 ? time : "null";
    const safeSpecialty = specialty && specialty.length > 0 ? specialty : "null";

    const response = await fetch(`${DOCTOR_API}/filter/${safeName}/${safeTime}/${safeSpecialty}`);
    if (response.ok) {
      const data = await response.json();
      return data.doctors || data || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to filter doctors:", error);
    alert("Something went wrong while filtering doctors.");
    return [];
  }
}
