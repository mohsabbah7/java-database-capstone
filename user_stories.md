# 📝 Smart Clinic Management System – User Stories

## 👤 Admin User Stories

**1. Log Into the Portal**
As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely.
- Acceptance Criteria:
  - Admin can log in with valid username and password.
  - Invalid credentials show an appropriate error message.
  - Successful login redirects to the admin dashboard.
- Priority: High

**2. Log Out of the Portal**
As an admin, I want to log out of the portal, so that I can protect system access.
- Acceptance Criteria:
  - Logout button is accessible from the admin dashboard.
  - Logging out invalidates the current session/token.
  - User is redirected to the login page after logout.
- Priority: High

**3. Add Doctors to the Portal**
As an admin, I want to add doctors to the portal, so that they can be booked by patients.
- Acceptance Criteria:
  - Admin can enter doctor name, specialization, and contact details.
  - New doctor appears in the patient-facing doctor list immediately.
- Priority: High

**4. Delete Doctor's Profile**
As an admin, I want to delete a doctor's profile from the portal, so that inactive or incorrect doctor records are removed.
- Acceptance Criteria:
  - Admin can select and delete a doctor profile.
  - Deleted doctor no longer appears in patient booking screens.
  - Existing historical appointments tied to that doctor remain intact for records.
- Priority: Medium

**5. Track Appointment Statistics**
As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics.
- Acceptance Criteria:
  - Stored procedure returns appointment count grouped by month.
  - Procedure can be executed directly via MySQL CLI.
- Priority: Low

---

## 🧑‍⚕️ Patient User Stories

**1. View Doctors Without Logging In**
As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering.
- Acceptance Criteria:
  - Doctor list page is publicly accessible (no auth required).
  - List shows doctor name and specialization.
- Priority: Medium

**2. Sign Up**
As a patient, I want to sign up using my email and password, so that I can book appointments.
- Acceptance Criteria:
  - Sign-up requires a valid email and password.
  - Duplicate email registration is rejected with a clear error.
- Priority: High

**3. Log Into the Portal**
As a patient, I want to log into the portal, so that I can manage my bookings.
- Acceptance Criteria:
  - Patient can log in with valid credentials.
  - Successful login redirects to the patient dashboard.
- Priority: High

**4. Log Out of the Portal**
As a patient, I want to log out of the portal, so that I can secure my account.
- Acceptance Criteria:
  - Logout invalidates the current session/token.
  - User is redirected to the login/home page.
- Priority: High

**5. Book an Appointment**
As a patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor.
- Acceptance Criteria:
  - Patient can select a doctor and an available one-hour time slot.
  - Booking is confirmed and reflected immediately in the patient's appointment list.
- Priority: High

**6. View Upcoming Appointments**
As a patient, I want to view my upcoming appointments, so that I can prepare accordingly.
- Acceptance Criteria:
  - Dashboard lists upcoming appointments sorted by date/time.
  - Each entry shows doctor name and appointment time.
- Priority: Medium

---

## 🩺 Doctor User Stories

**1. Log Into the Portal**
As a doctor, I want to log into the portal, so that I can manage my appointments.
- Acceptance Criteria:
  - Doctor can log in with valid credentials.
  - Successful login redirects to the doctor dashboard.
- Priority: High

**2. Log Out of the Portal**
As a doctor, I want to log out of the portal, so that I can protect my data.
- Acceptance Criteria:
  - Logout invalidates the current session/token.
  - User is redirected to the login page.
- Priority: High

**3. View Appointment Calendar**
As a doctor, I want to view my appointment calendar, so that I can stay organized.
- Acceptance Criteria:
  - Calendar displays all upcoming appointments by date.
  - Doctor can filter by day/week/month view.
- Priority: Medium

**4. Mark Unavailability**
As a doctor, I want to mark my unavailability, so that patients only see available slots.
- Acceptance Criteria:
  - Doctor can block off specific dates/times as unavailable.
  - Blocked slots are hidden from the patient booking view immediately.
- Priority: High

**5. Update Profile**
As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information.
- Acceptance Criteria:
  - Doctor can edit specialization, phone number, and other profile fields.
  - Updated info reflects immediately in the patient-facing doctor list.
- Priority: Medium

**6. View Patient Details**
As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared.
- Acceptance Criteria:
  - Doctor can click an appointment to see patient name and reason for visit.
  - Sensitive patient info is only visible to the doctor assigned to that appointment.
- Priority: Medium
