
# 🏥 Smart Clinic Management System – Architecture Design

## 📐 Section 1: Architecture Summary

The Smart Clinic Management System follows a **three-tier architecture**, separating the application into **Presentation**, **Application**, and **Data** layers, as shown in the reference architecture diagram.

In the **Presentation layer**, the **AdminDashboard** and **DoctorDashboard** are server-rendered pages that go through **Thymeleaf Controllers**, while the **Appointments** and **PatientDashboard** modules are JSON-based and go through **REST Controllers** using a JSON API.

Both **Thymeleaf Controllers** and **REST Controllers** call into a shared **Service Layer**, which holds the core business logic and validation rules, keeping controllers thin.

The Service Layer then **uses** two separate repository types depending on the data:

- 🐘 **MySQL Repositories** → access the **MySQL Database**, storing structured relational data as JPA Entities: **Patient, Doctor, Appointment, and Admin**.
- 🍃 **MongoDB Repository** → accesses the **MongoDB Database**, storing **Prescription** data as a flexible **Document** model.

This dual-database approach enforces **strong consistency** where relationships matter most (appointments tied to doctors and patients), while remaining **flexible** where data shape can vary (prescriptions).

---

## 🔄 Section 2: Numbered Flow

1. **User Interaction** → The user interacts with a Dashboard: AdminDashboard/DoctorDashboard (server-rendered) or Appointments/PatientDashboard (JSON-based).
2. **Request Routed** → Server-rendered dashboards route through **Thymeleaf Controllers**; JSON-based modules route through **Rest Controllers** via a JSON API.
3. **Controller → Service** → Both controller types **call** the **Service Layer**.
4. **Business Logic** → The Service Layer applies business rules (e.g., checking doctor availability, verifying role permissions) and determines which repository to use.
5. **MySQL Path** → For Patient, Doctor, Appointment, and Admin data, the Service Layer **uses** the **MySQL Repositories**.
6. **MongoDB Path** → For Prescription data, the Service Layer **uses** the **MongoDB Repository**.
7. **MySQL Access** → MySQL Repositories **access** the **MySQL Database**, mapping rows to **MySQL Models** as JPA Entities.
8. **MongoDB Access** → The MongoDB Repository **accesses** the **MongoDB Database**, mapping documents to the **MongoDB Model** (Prescription as a Document).
9. **Response Sent** → Data flows back up through the Service Layer to the Controller: Thymeleaf Controllers return a rendered **HTML page**, Rest Controllers return **JSON**.
10. **UI Updated** → The Presentation layer updates what the user sees — either a freshly rendered page or a dynamic UI update driven by the JSON response.
