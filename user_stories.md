# User Story Template

**Title:**
_As a [user role], I want [feature/goal], so that [reason]._

**Acceptance Criteria:**
1. [Criteria 1]
2. [Criteria 2]
3. [Criteria 3]

**Priority:** [High/Medium/Low]
**Story Points:** [Estimated Effort in Points]
**Notes:**
- [Additional information or edge cases]

---

# 👤 Admin User Stories

**Title:**
_As an admin, I want to log into the portal with my username and password, so that I can manage the platform securely._

**Acceptance Criteria:**
1. Admin can log in with valid username and password.
2. Invalid credentials show an appropriate error message.
3. Successful login redirects to the admin dashboard.

**Priority:** High
**Story Points:** 3
**Notes:**
- Session/token should expire after a period of inactivity.

---

**Title:**
_As an admin, I want to log out of the portal, so that I can protect system access._

**Acceptance Criteria:**
1. Logout button is accessible from the admin dashboard.
2. Logging out invalidates the current session/token.
3. User is redirected to the login page after logout.

**Priority:** High
**Story Points:** 1
**Notes:**
- Should also handle auto-logout on token expiry.

---

**Title:**
_As an admin, I want to add doctors to the portal, so that they can be booked by patients._

**Acceptance Criteria:**
1. Admin can enter doctor name, specialization, and contact details.
2. New doctor appears in the patient-facing doctor list immediately.
3. Required fields are validated before saving.

**Priority:** High
**Story Points:** 5
**Notes:**
- Consider preventing duplicate doctor entries (same email/license number).

---

**Title:**
_As an admin, I want to delete a doctor's profile from the portal, so that inactive or incorrect doctor records are removed._

**Acceptance Criteria:**
1. Admin can select and delete a doctor profile.
2. Deleted doctor no longer appears in patient booking screens.
3. Existing historical appointments tied to that doctor remain intact for records.

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Edge case: prevent deletion if doctor has upcoming (not yet completed) appointments, or handle reassignment.

---

**Title:**
_As an admin, I want to run a stored procedure in MySQL CLI to get the number of appointments per month, so that I can track usage statistics._

**Acceptance Criteria:**
1. Stored procedure returns appointment count grouped by month.
2. Procedure can be executed directly via MySQL CLI.
3. Results are accurate even with cancelled/rescheduled appointments factored in appropriately.

**Priority:** Low
**Story Points:** 2
**Notes:**
- Decide whether cancelled appointments should count toward totals.

---

# 🧑‍⚕️ Patient User Stories

**Title:**
_As a patient, I want to view a list of doctors without logging in, so that I can explore options before registering._

**Acceptance Criteria:**
1. Doctor list page is publicly accessible (no auth required).
2. List shows doctor name and specialization.
3. No sensitive/booking actions are available without login.

**Priority:** Medium
**Story Points:** 2
**Notes:**
- Booking action should prompt login/signup if attempted while unauthenticated.

---

**Title:**
_As a patient, I want to sign up using my email and password, so that I can book appointments._

**Acceptance Criteria:**
1. Sign-up requires a valid email and password.
2. Duplicate email registration is rejected with a clear error.
3. Password meets minimum security requirements.

**Priority:** High
**Story Points:** 3
**Notes:**
- Consider email verification as a future enhancement.

---

**Title:**
_As a patient, I want to log into the portal, so that I can manage my bookings._

**Acceptance Criteria:**
1. Patient can log in with valid credentials.
2. Successful login redirects to the patient dashboard.
3. Invalid credentials show an appropriate error.

**Priority:** High
**Story Points:** 3
**Notes:**
- None.

---

**Title:**
_As a patient, I want to log out of the portal, so that I can secure my account._

**Acceptance Criteria:**
1. Logout invalidates the current session/token.
2. User is redirected to the login/home page.

**Priority:** High
**Story Points:** 1
**Notes:**
- None.

---

**Title:**
_As a patient, I want to log in and book an hour-long appointment, so that I can consult with a doctor._

**Acceptance Criteria:**
1. Patient can select a doctor and an available one-hour time slot.
2. Booking is confirmed and reflected immediately in the patient's appointment list.
3. Already-booked slots are not shown as available.

**Priority:** High
**Story Points:** 5
**Notes:**
- Edge case: handle two patients attempting to book the same slot simultaneously.

---

**Title:**
_As a patient, I want to view my upcoming appointments, so that I can prepare accordingly._

**Acceptance Criteria:**
1. Dashboard lists upcoming appointments sorted by date/time.
2. Each entry shows doctor name and appointment time.
3. Past appointments are shown separately from upcoming ones.

**Priority:** Medium
**Story Points:** 2
**Notes:**
- None.

---

# 🩺 Doctor User Stories

**Title:**
_As a doctor, I want to log into the portal, so that I can manage my appointments._

**Acceptance Criteria:**
1. Doctor can log in with valid credentials.
2. Successful login redirects to the doctor dashboard.
3. Invalid credentials show an appropriate error.

**Priority:** High
**Story Points:** 3
**Notes:**
- None.

---

**Title:**
_As a doctor, I want to log out of the portal, so that I can protect my data._

**Acceptance Criteria:**
1. Logout invalidates the current session/token.
2. User is redirected to the login page.

**Priority:** High
**Story Points:** 1
**Notes:**
- None.

---

**Title:**
_As a doctor, I want to view my appointment calendar, so that I can stay organized._

**Acceptance Criteria:**
1. Calendar displays all upcoming appointments by date.
2. Doctor can filter by day/week/month view.
3. Cancelled appointments are visually distinguished from active ones.

**Priority:** Medium
**Story Points:** 5
**Notes:**
- Consider color-coding by appointment status.

---

**Title:**
_As a doctor, I want to mark my unavailability, so that patients only see available slots._

**Acceptance Criteria:**
1. Doctor can block off specific dates/times as unavailable.
2. Blocked slots are hidden from the patient booking view immediately.
3. Existing bookings within a newly-blocked slot are flagged for review.

**Priority:** High
**Story Points:** 5
**Notes:**
- Edge case: doctor marks unavailability over an already-booked slot — needs a conflict resolution flow.

---

**Title:**
_As a doctor, I want to update my profile with specialization and contact information, so that patients have up-to-date information._

**Acceptance Criteria:**
1. Doctor can edit specialization, phone number, and other profile fields.
2. Updated info reflects immediately in the patient-facing doctor list.
3. Required fields cannot be left blank.

**Priority:** Medium
**Story Points:** 2
**Notes:**
- None.

---

**Title:**
_As a doctor, I want to view patient details for upcoming appointments, so that I can be prepared._

**Acceptance Criteria:**
1. Doctor can click an appointment to see patient name and reason for visit.
2. Sensitive patient info is only visible to the doctor assigned to that appointment.
3. Past medical history/prescriptions linked to the patient are visible if available.

**Priority:** Medium
**Story Points:** 3
**Notes:**
- Access control must ensure doctors can't view other doctors' patient details.
