package com.smartclinic.models;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "prescriptions")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Prescription {

    @Id
    private String id;

    @NotNull(message = "Patient name is required")
    @Size(min = 2, max = 100, message = "Patient name must be between 2 and 100 characters")
    private String patientName;

    @NotNull(message = "Appointment ID is required")
    private Long appointmentId;

    private Long patientId;

    private Long doctorId;

    private LocalDateTime dateIssued;

    @NotNull(message = "At least one medication is required")
    @Size(min = 1, message = "At least one medication must be provided")
    private List<Medication> medications;

    private String notes;

    private boolean refillable = false;

    // Nested document type — represents each medication entry within a prescription
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Medication {

        @NotNull(message = "Medication name is required")
        private String name;

        @NotNull(message = "Dosage is required")
        private String dosage;

        private String frequency;

        private Integer durationDays;
    }
}
