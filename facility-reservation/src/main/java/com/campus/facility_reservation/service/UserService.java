package com.campus.facility_reservation.service;

// Service class to handle user registration logic
import com.campus.facility_reservation.dto.RegisterRequest;
import com.campus.facility_reservation.model.User;
import com.campus.facility_reservation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.campus.facility_reservation.dto.LoginRequest;
import com.campus.facility_reservation.dto.AuthResponse;
import com.campus.facility_reservation.security.JwtUtil;

private final JwtUtil jwtUtil;

public AuthResponse login(LoginRequest request) {
    User user = userRepository.findByEmail(request.getEmail())
            .orElseThrow(() -> new RuntimeException("Invalid credentials"));

    if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
        throw new RuntimeException("Invalid credentials");
    }

    String token = jwtUtil.generateToken(user.getEmail(), user.getRole().name());
    return new AuthResponse(token);
}

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public String register(RegisterRequest request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already in use";
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole(request.getRole()); // set default role here

        userRepository.save(user);
        return "User registered successfully";
    }
}