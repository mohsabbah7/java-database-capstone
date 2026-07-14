import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

export async function patientSignup(data) {
  try {
    const response = await fetch(PATIENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return { success: response.ok, message: result.message || "" };
  } catch (error) {
    console.error("Signup failed:", error);
    return { success: false, message: "Signup failed. Please try again." };
  }
}

export async function patientLogin(data) {
  console.log("Attempting patient login for:", data.email);
  return fetch(`${PATIENT_API}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getPatientData(token) {
  try {
    const response = await fetch(`${PATIENT_API}/${token}`);
    const data = await response.json();
    return response.ok ? data.patient : null;
  } catch (error) {
    console.error("Failed to fetch patient data:", error);
    return null;
  }
}

// user is "patient" or "doctor" - same endpoint, different perspective on the backend
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(`${PATIENT_API}/${id}/${user}/${token}`);
    const data = await response.json();
    return response.ok ? data.appointments : null;
  } catch (error) {
    console.error("Failed to fetch patient appointments:", error);
    return null;
  }
}

export async function filterAppointments(condition, name, token) {
  try {
    const safeCondition = condition && condition.length > 0 ? condition : "null";
    const safeName = name && name.length > 0 ? name : "null";

    const response = await fetch(`${PATIENT_API}/filter/${safeCondition}/${safeName}/${token}`);
    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    }
    return [];
  } catch (error) {
    console.error("Failed to filter appointments:", error);
    alert("Something went wrong while filtering appointments.");
    return [];
  }
}
