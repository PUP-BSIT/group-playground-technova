package com.campus.facility_reservation.service;

import com.campus.facility_reservation.model.Role;
import com.campus.facility_reservation.model.User;
import com.campus.facility_reservation.repository.RoleRepository;
import com.campus.facility_reservation.repository.UserRepository;
import com.campus.facility_reservation.security.JwtTokenProvider;
import com.campus.facility_reservation.dto.AuthRequest;
import com.campus.facility_reservation.dto.AuthResponse;
import com.campus.facility_reservation.dto.UserResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;

@Service
public class AuthService {
    
    @Autowired
    private UserRepository userRepository;
    
    @Autowired
    private RoleRepository roleRepository;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    
    // Register new user
    public AuthResponse register(AuthRequest request) {
        // Check if email already exists
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        
        // Get role from database
        Role role = roleRepository.findByName(request.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        
        // Create new user
        User user = new User();
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(role);
        user.setOrganizationName(request.getOrganizationName());
        user.setIsActive(true);
        user.setCreatedAt(LocalDateTime.now());
        user.setUpdatedAt(LocalDateTime.now());
        
        userRepository.save(user);
        
        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), 
                user.getEmail(), role.getName().toString());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId(), 
                user.getEmail());
        
        return new AuthResponse(accessToken, refreshToken, "User registered successfully", 
                user.getId(), role.getName().toString());
    }
    
    // Login user
    public AuthResponse login(String email, String password) {
        // Find user by email
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid email or password"));
        
        // Check if user is active
        if (!user.getIsActive()) {
            throw new RuntimeException("User account has been deactivated");
        }
        
        // Verify password
        if (!passwordEncoder.matches(password, user.getPassword())) {
            throw new RuntimeException("Invalid email or password");
        }
        
        // Update last login
        user.setLastLogin(LocalDateTime.now());
        userRepository.save(user);
        
        // Generate tokens
        String accessToken = jwtTokenProvider.generateAccessToken(user.getId(), 
                user.getEmail(), user.getRole().getName().toString());
        String refreshToken = jwtTokenProvider.generateRefreshToken(user.getId(), 
                user.getEmail());
        
        return new AuthResponse(accessToken, refreshToken, "Login successful", 
                user.getId(), user.getRole().getName().toString());
    }
    
    // Refresh access token
    public AuthResponse refreshToken(String refreshToken) {
        if (!jwtTokenProvider.validateToken(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }
        
        Long userId = jwtTokenProvider.getUserIdFromToken(refreshToken);
        String email = jwtTokenProvider.getEmailFromToken(refreshToken);
        
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        String newAccessToken = jwtTokenProvider.generateAccessToken(user.getId(), 
                user.getEmail(), user.getRole().getName().toString());
        
        return new AuthResponse(newAccessToken, refreshToken, "Token refreshed successfully", 
                user.getId(), user.getRole().getName().toString());
    }
    
    // Get user profile
    public UserResponse getUserProfile(Long userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        return new UserResponse(user);
    }
    
    // Update user profile
    public UserResponse updateUserProfile(Long userId, AuthRequest request) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));
        
        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setOrganizationName(request.getOrganizationName());
        user.setUpdatedAt(LocalDateTime.now());
        
        userRepository.save(user);
        return new UserResponse(user);
    }
}