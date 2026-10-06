package com.aurelia.aurelia_hotel_management.domain.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity @Table(name = "permissions") @Getter @Setter @NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Permission extends BaseEntity {
    @Column(nullable = false, unique = true, length = 100) private String code;
    @Column(length = 255) private String description;
}
