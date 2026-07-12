# 🗄️ Smart Clinic Management System – Schema Design

## 📐 Section 1: MySQL Database Design

The MySQL database stores structured, relational data where integrity between entities matters most — patients, doctors, admins, appointments, and doctor availability. Using foreign keys here ensures an appointment can never reference a patient or doctor that doesn't exist, and that data stays consistent across the system.

---

### 🧑‍⚕️ Table: `patients`

| Column        | Type          | Constraints                     |
|---------------|---------------|----------------------------------|
| id            | BIGINT        | PRIMARY KEY, AUTO_INCREMENT     |
| first_name    | VARCHAR(50)   | NOT NULL                        |
| last_name     | VARCHAR(50)   | NOT NULL                        |
| email         | VARCHAR(100)  | NOT NULL, UNIQUE                |
| password_hash | VARCHAR(255)  | NOT NULL                        |
| phone         | VARCHAR(20)   | NOT NULL                        |
| date_of_birth | DATE          | NOT NULL                        |
| created_at    | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

<!-- email is UNIQUE since it doubles as the login identifier; password_hash never stores plaintext -->

---

### 🩺 Table: `doctors`

| Column          | Type          | Constraints                     |
|-----------------|---------------|----------------------------------|
| id              | BIGINT        | PRIMARY KEY, AUTO_INCREMENT     |
| first_name      | VARCHAR(50)   | NOT NULL                        |
| last_name       | VARCHAR(50)   | NOT NULL                        |
| email           | VARCHAR(100)  | NOT NULL, UNIQUE                |
| password_hash   | VARCHAR(255)  | NOT NULL                        |
| specialization  | VARCHAR(100)  | NOT NULL                        |
| phone           | VARCHAR(20)   | NOT NULL                        |
| created_at      | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

<!-- specialization kept as a simple VARCHAR rather than a separate lookup table for simplicity at this scale; could be normalized into a specializations table later if the list grows large -->

---

### 🗂️ Table: `admin`

| Column        | Type          | Constraints                     |
|---------------|---------------|----------------------------------|
| id            | BIGINT        | PRIMARY KEY, AUTO_INCREMENT     |
| username      | VARCHAR(50)   | NOT NULL, UNIQUE                |
| password_hash | VARCHAR(255)  | NOT NULL                        |
| created_at    | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP |

<!-- admin is a small, tightly controlled table since accounts are created manually, not via public sign-up -->

---

### 📅 Table: `appointments`

| Column         | Type          | Constraints                                              |
|----------------|---------------|-----------------------------------------------------------|
| id             | BIGINT        | PRIMARY KEY, AUTO_INCREMENT                              |
| patient_id     | BIGINT        | NOT NULL, FOREIGN KEY → patients(id)                     |
| doctor_id      | BIGINT        | NOT NULL, FOREIGN KEY → doctors(id)                      |
| appointment_time | DATETIME    | NOT NULL                                                  |
| status         | VARCHAR(20)   | NOT NULL, DEFAULT 'SCHEDULED' — (SCHEDULED, COMPLETED, CANCELLED) |
| reason         | VARCHAR(255)  | NULL                                                       |
| created_at     | TIMESTAMP     | NOT NULL, DEFAULT CURRENT_TIMESTAMP                       |

<!-- status uses a constrained set of string values (enforced at the application/enum level) rather than a separate status table, since the set of states is small and unlikely to change -->
<!-- a UNIQUE constraint on (doctor_id, appointment_time) could be added to prevent double-booking the same doctor at the same time -->

---

### 🕒 Table: `doctor_available_times`

| Column      | Type      | Constraints                                |
|-------------|-----------|----------------------------------------------|
| id          | BIGINT    | PRIMARY KEY, AUTO_INCREMENT                 |
| doctor_id   | BIGINT    | NOT NULL, FOREIGN KEY → doctors(id)         |
| start_time  | DATETIME  | NOT NULL                                     |
| end_time    | DATETIME  | NOT NULL                                     |
| is_available| BOOLEAN   | NOT NULL, DEFAULT TRUE                       |

<!-- separated from doctors table because one doctor has many time slots (one-to-many); is_available lets a doctor explicitly block a slot without deleting the row -->

---

## 🍃 Section 2: MongoDB Collection Design

### Collection: `prescriptions`

Prescriptions are stored in MongoDB rather than MySQL because their structure varies — a prescription can include one or several medications, each with different dosage instructions, and may or may not include extra notes. Forcing this into a rigid relational schema would require extra join tables for little benefit, whereas a document naturally represents this nested, variable-length data.

```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 51,
  "patientId": 12,
  "doctorId": 4,
  "dateIssued": "2026-07-10T09:30:00Z",
  "medications": [
    {
      "name": "Amoxicillin",
      "dosage": "500mg",
      "frequency": "3 times a day",
      "durationDays": 7
    },
    {
      "name": "Ibuprofen",
      "dosage": "200mg",
      "frequency": "as needed for pain",
      "durationDays": 5
    }
  ],
  "notes": "Patient advised to take medication with food. Follow up in 2 weeks if symptoms persist.",
  "refillable": false
}
```

<!-- medications is an array since a single prescription can cover multiple drugs at once -->
<!-- appointmentId, patientId, and doctorId are stored as plain reference fields (not true foreign keys, since MongoDB doesn't enforce referential integrity) linking back to the corresponding MySQL records -->
<!-- refillable is a simple boolean flag; could be expanded into a refill history sub-document if needed later -->
