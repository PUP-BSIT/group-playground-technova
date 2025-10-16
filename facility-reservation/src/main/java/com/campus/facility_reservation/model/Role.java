package com.campus.facility_reservation.model;

public enum Role {
    STUDENT("View available equipment and facilities, submit requests, check status"),
    ORGANIZATION("Submit requests for facilities, manage organization reservations"),
    ADMIN("Approve/decline requests, manage availability, view reports"),
    SUPER_ADMIN("Manage users, configure policies, handle backups");

    private final String description;

    Role(String description) {
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public String getName() {
        return this.name();
    }
}