package com.aurelia.aurelia_hotel_management.domain.repository;
import com.aurelia.aurelia_hotel_management.domain.entity.User; import org.springframework.data.jpa.repository.JpaRepository; import java.util.*;
public interface UserRepository extends JpaRepository<User, UUID> { Optional<User> findByEmail(String email); }
