package com.campus.facility_reservation.model;

public enum RoleType {
    STUDENT("View available equipment and facilities, submit requests, check status"),
    ORGANIZATION("Submit requests for facilities, manage organization reservations"),
    ADMIN("Approve/decline requests, manage availability, view reports"),
    SUPER_ADMIN("Manage users, configure policies, handle backups");
    
    private final String description;
    
    RoleType(String description) {
        this.description = description;
    }
    
    public String getDescription() {
        return description;
    }
}

// File: model/Role.java
package com.campus.facility_reservation.model;

import javax.persistence.*;

@Entity
@Table(name = "user_role")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roleId;
    
    @Column(unique = true, nullable = false)
    @Enumerated(EnumType.STRING)
    private RoleType name;
    
    @Column(columnDefinition = "text")
    private String description;

    public Role() {}
    
    public Role(RoleType name, String description) {
        this.name = name;
        this.description = description;
    }

    public Long getRoleId() { return roleId; }
    public void setRoleId(Long roleId) { this.roleId = roleId; }
    
    public RoleType getName() { return name; }
    public void setName(RoleType name) { this.name = name; }
    
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}