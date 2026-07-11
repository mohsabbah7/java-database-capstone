# 📝 Smart Clinic Management System – User Stories

## 👤 Admin User Stories

**1. Manage Doctor Accounts**
As an admin, I want to add, update, and remove doctor profiles, so that I can keep the clinic's doctor directory accurate and up to date.
- Acceptance Criteria:
  - Admin can create a new doctor account with name, specialization, and contact details.
  - Admin can edit or deactivate an existing doctor profile.
  - Deactivated doctors no longer appear in patient-facing booking screens.

**2. View All Appointments**
As an admin, I want to view all appointments across the clinic, so that I can monitor scheduling and identify conflicts or gaps.
- Acceptance Criteria:
  - Admin can see a list of all appointments filtered by date, doctor, or status.
  - Admin can see appointment details (patient, doctor, time, status).

**3. Manage User Roles and Access**
As an admin, I want to control which users have access to admin, doctor, or patient features, so that sensitive functionality is restricted to authorized roles only.
- Acceptance Criteria:
  - Each user account is assigned exactly one role (admin, doctor, or patient).
  - Role-based access is enforced on both frontend routes and backend REST endpoints.

**4. Log In Securely**
As an admin, I want to log in with a secure username and password, so that only authorized personnel can access administrative functions.
- Acceptance Criteria:
  - Login requires valid credentials.
  - Invalid login attempts return an appropriate error without revealing whether the username or password was incorrect.

**5. Generate System Reports**
As an admin, I want to run reports on clinic activity (e.g., appointments per doctor, cancellations), so that I can track clinic performance and usage.
- Acceptance Criteria:
  - Admin can trigger a stored procedure/report from the dashboard.
  - Report results are displayed in a readable format (table view).

---

## 🧑‍⚕️ Patient User Stories

**1. Register an Account**
As a patient, I want to create an account with my personal details, so that I can book and manage my own appointments.
- Acceptance Criteria:
  - Registration requires name, email, and password.
  - Duplicate emails are rejected with a clear error message.

**2. Book an Appointment**
As a patient, I want to view available doctors and book an appointment at an available time slot, so that I can schedule a visit without calling the clinic.
- Acceptance Criteria:
  - Patient can browse doctors by specialization.
  - Only available time slots are shown for booking.
  - Booking is confirmed instantly and reflected in the patient's appointment list.

**3. View Appointment History**
As a patient, I want to view my past and upcoming appointments, so that I can keep track of my visits and plan ahead.
- Acceptance Criteria:
  - Patient dashboard lists appointments sorted by date.
  - Each entry shows doctor name, date/time, and status (upcoming/completed/cancelled).

**4. Cancel or Reschedule an Appointment**
As a patient, I want to cancel or reschedule an upcoming appointment, so that I can adjust my schedule when my plans change.
- Acceptance Criteria:
  - Patient can cancel an appointment before a defined cutoff time.
  - Rescheduling shows only new available slots for the same doctor.

**5. View Prescriptions**
As a patient, I want to view prescriptions issued to me by doctors, so that I have easy access to my medication history.
- Acceptance Criteria:
  - Patient can see a list of prescriptions linked to their past appointments.
  - Each prescription shows medication name, dosage, and notes.

---

## 🩺 Doctor User Stories

**1. Log In and View Dashboard**
As a doctor, I want to log in and see my dashboard, so that I can quickly check my schedule for the day.
- Acceptance Criteria:
  - Doctor login is role-restricted (cannot access admin functionality).
  - Dashboard shows today's appointments by default.

**2. Set Availability**
As a doctor, I want to set and update my available time slots, so that patients can only book appointments when I'm actually free.
- Acceptance Criteria:
  - Doctor can mark specific days/times as available or unavailable.
  - Changes to availability are immediately reflected in the patient booking view.

**3. View Patient Appointments**
As a doctor, I want to view a list of my upcoming appointments with patient details, so that I can prepare for each visit.
- Acceptance Criteria:
  - Doctor can see patient name, appointment time, and reason for visit (if provided).
  - List can be filtered by date range.

**4. Add Prescriptions**
As a doctor, I want to add a prescription after an appointment, so that the patient has a record of prescribed medication.
- Acceptance Criteria:
  - Doctor can attach a prescription (medication, dosage, notes) to a completed appointment.
  - Prescription is saved to MongoDB and becomes visible to the patient.

**5. Update Appointment Status**
As a doctor, I want to mark an appointment as completed or cancelled, so that records stay accurate and up to date.
- Acceptance Criteria:
  - Doctor can change appointment status after the visit.
  - Status change is reflected in both doctor's and patient's appointment views.
