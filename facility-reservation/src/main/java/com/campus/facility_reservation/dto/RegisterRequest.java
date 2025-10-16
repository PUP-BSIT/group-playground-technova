package com.campus.facility_reservation.dto;

import com.campus.facility_reservation.model.Role;
import lombok.Data;

// Prevents using the entity directly in API calls
@Data
public class RegisterRequest {
    private String email;
    private String password;
    private Role role;
}
