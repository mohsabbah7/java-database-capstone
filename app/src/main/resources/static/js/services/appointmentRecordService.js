import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = API_BASE_URL + "/appointments";

export async function getAllAppointments(date, patientName, token) {
  try {
    const safeName = patientName && patientName.length > 0 ? patientName : "null";
    const response = await fetch(`${APPOINTMENT_API}/${date}/${safeName}/${token}`);
    if (!response.ok) throw new Error("Failed to fetch appointments");
    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    console.error("Failed to load appointments:", error);
    return [];
  }
}
