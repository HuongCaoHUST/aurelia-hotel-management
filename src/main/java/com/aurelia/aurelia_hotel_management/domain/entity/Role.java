package com.aurelia.aurelia_hotel_management.domain.entity;

import com.aurelia.aurelia_hotel_management.domain.enums.RoleName;
import jakarta.persistence.*;
import lombok.*;
import java.util.*;

@Entity @Table(name = "roles") @Getter @Setter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Role extends BaseEntity {
    @Enumerated(EnumType.STRING) @Column(nullable = false, unique = true, length = 40) private RoleName name;
    @Column(length = 255) private String description;
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "role_permissions", joinColumns = @JoinColumn(name = "role_id"), inverseJoinColumns = @JoinColumn(name = "permission_id"), uniqueConstraints = @UniqueConstraint(name = "uk_role_permissions", columnNames = {"role_id", "permission_id"}))
    @ToString.Exclude private Set<Permission> permissions = new HashSet<>();
}
