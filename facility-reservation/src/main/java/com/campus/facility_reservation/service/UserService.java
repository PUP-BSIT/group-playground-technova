package com.campus.facility_reservation.service;

// Service class to handle user registration logic
import com.campus.facility_reservation.dto.RegisterRequest;
import com.campus.facility_reservation.model.User;
import com.campus.facility_reservation.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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
