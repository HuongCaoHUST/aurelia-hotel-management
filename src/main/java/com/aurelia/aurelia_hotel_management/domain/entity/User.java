package com.aurelia.aurelia_hotel_management.domain.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity @Table(name = "users", indexes = {@Index(name = "idx_users_email", columnList = "email")})
@Getter @Setter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User extends BaseEntity {
    @Column(nullable = false, unique = true, length = 320) private String email;
    @Column(name = "password_hash", nullable = false, length = 255) private String passwordHash;
    @Column(nullable = false, length = 120) private String fullName;
    @Column(length = 30) private String phone;
    @Column(nullable = false) private boolean enabled = true;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "user_roles", joinColumns = @JoinColumn(name = "user_id"), inverseJoinColumns = @JoinColumn(name = "role_id"), uniqueConstraints = @UniqueConstraint(name = "uk_user_roles", columnNames = {"user_id", "role_id"}))
    @ToString.Exclude private Set<Role> roles = new HashSet<>();
}
