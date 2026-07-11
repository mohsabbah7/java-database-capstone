 📐 Section 1: Architecture Summary

The Smart Clinic Management System follows a **three-tier architecture**, separating the application into **Presentation**, **Application**, and **Data** layers.

The **Presentation layer** is served in two ways: certain pages (such as the Admin Dashboard and Doctor Dashboard) are rendered **server-side** using Spring Boot's **MVC framework with Thymeleaf templates**, while other modules (such as the Appointment and Patient dashboards) are built as **dynamic HTML/CSS/JavaScript** pages that communicate with the backend through **REST APIs**.

Both entry points — **MVC controllers** and **REST controllers** — route requests into a shared **Service layer**, which contains the core business logic and validation rules, keeping controllers thin and focused only on request handling.

The Service layer interacts with **two types of repositories** depending on the nature of the data:

- 🐘 **Spring Data JPA** → manages structured, relational data (patients, doctors, admins, appointments) stored in **MySQL**, taking advantage of strict schemas, foreign key constraints, and transactional integrity.
- 🍃 **Spring Data MongoDB** → manages **prescriptions**, stored as flexible, document-based records in **MongoDB**, since prescription data can vary in structure (medication lists, dosages, notes) without requiring a fixed schema.

This dual-database approach enforces **strong consistency** where relationships matter most (appointments tied to doctors and patients), while remaining **flexible** where data shape can vary (prescriptions).

---

 🔄 Section 2: Numbered Flow

1. **User Interaction** → The user interacts with the Presentation layer, either through a Thymeleaf-rendered page (Admin/Doctor dashboards) or a dynamic HTML/JS page (Patient/Appointment views).
2. **Request Routed** → Depending on the interaction, the request is sent either to an **MVC Controller** (server-rendered pages) or a **REST Controller** (AJAX/JSON calls from frontend JavaScript).
3. **Controller → Service** → The Controller validates basic input and delegates the actual logic to the **Service layer**.
4. **Business Logic** → The Service layer applies business rules (e.g., checking doctor availability, verifying role permissions) and determines which repository to call.
5. **MySQL Path** → For structured/relational data (patients, doctors, admins, appointments), the Service layer calls a **Spring Data JPA repository**, which translates the call into SQL against **MySQL**.
6. **MongoDB Path** → For flexible/document data (prescriptions), the Service layer calls a **Spring Data MongoDB repository**, which queries/updates documents in **MongoDB**.
7. **Data Returned** → The repository returns data (or confirms a write) back to the Service layer as Java objects (JPA entities or MongoDB documents).
8. **Response Mapping** → The Service layer maps this data into the right format — a model object for MVC views, or a DTO/JSON object for REST responses.
9. **Response Sent** → The Controller sends the response back: MVC controllers return a rendered **HTML page**, REST controllers return **JSON**.
10. **UI Updated** → The Presentation layer updates what the user sees — either a freshly rendered page or a dynamic UI update driven by the JSON response.
