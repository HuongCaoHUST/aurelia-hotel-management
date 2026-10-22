package com.aurelia.auth.config;

import com.aurelia.auth.entity.Role;
import com.aurelia.auth.entity.Permission;
import com.aurelia.auth.repository.PermissionRepository;
import com.aurelia.auth.entity.User;
import com.aurelia.auth.repository.RoleRepository;
import com.aurelia.auth.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Arrays;
import java.util.HashSet;
import java.util.stream.Collectors;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    /**
     * Initialize default roles and test user on startup
     */
    @Bean
    public CommandLineRunner initializeData() {
        return args -> {
            // Seed defaults once; all subsequent roles and permissions are database records.
            Arrays.asList("CUSTOMER", "RECEPTIONIST", "HOUSEKEEPER", "TECHNICIAN", "MANAGER", "ADMIN").forEach(roleName -> {
                if (roleRepository.findByName(roleName).isEmpty()) {
                    Role role = Role.builder()
                        .name(roleName)
                            .description("Role: " + roleName)
                            .build();
                    roleRepository.save(role);
                    log.info("Created role: {}", roleName);
                }
            });

            // Danh mục toàn bộ các permissions nghiệp vụ của khách sạn
            java.util.Map<String, String> permissionDefs = new java.util.LinkedHashMap<>();
            // Dashboard & Báo cáo
            permissionDefs.put("DASHBOARD_VIEW", "Xem màn hình tổng quan và thống kê vận hành");
            permissionDefs.put("REPORT_VIEW", "Xem báo cáo doanh thu và công suất phòng");
            // Quản lý nhân viên & Phân quyền
            permissionDefs.put("ROLE_MANAGE_ROLES", "Quản lý vai trò / chức vụ");
            permissionDefs.put("ROLE_MANAGE_PERMISSIONS", "Quản lý quyền hạn hệ thống");
            permissionDefs.put("STAFF_VIEW", "Xem danh sách tài khoản nhân viên");
            permissionDefs.put("STAFF_MANAGE", "Thêm, sửa, khóa tài khoản nhân viên");
            // Đặt phòng (Booking) & Khách hàng
            permissionDefs.put("BOOKING_VIEW", "Xem danh sách đặt phòng và thông tin khách");
            permissionDefs.put("BOOKING_CREATE", "Tạo đặt phòng mới tại quầy hoặc qua điện thoại");
            permissionDefs.put("BOOKING_UPDATE", "Cập nhật hoặc đổi thông tin đặt phòng");
            permissionDefs.put("BOOKING_CANCEL", "Hủy đơn đặt phòng");
            permissionDefs.put("GUEST_CHECKIN_OUT", "Thực hiện thủ tục check-in và check-out");
            // Phòng (Room)
            permissionDefs.put("ROOM_VIEW", "Xem danh mục và sơ đồ phòng");
            permissionDefs.put("ROOM_STATUS_UPDATE", "Cập nhật trạng thái phòng (sẵn sàng, bận, sửa chữa)");
            // Buồng phòng (Housekeeping)
            permissionDefs.put("HOUSEKEEPING_VIEW", "Xem danh sách công việc buồng phòng");
            permissionDefs.put("HOUSEKEEPING_ASSIGN", "Phân công nhiệm vụ dọn dẹp cho nhân viên");
            permissionDefs.put("HOUSEKEEPING_UPDATE", "Cập nhật tiến độ dọn phòng (đang dọn, hoàn tất)");
            // Bảo trì kỹ thuật (Maintenance)
            permissionDefs.put("MAINTENANCE_VIEW", "Xem danh sách sự cố và yêu cầu bảo trì");
            permissionDefs.put("MAINTENANCE_CREATE", "Báo cáo sự cố phòng hoặc trang thiết bị");
            permissionDefs.put("MAINTENANCE_UPDATE", "Cập nhật tiến độ và hoàn thành sửa chữa");

            // Lưu hoặc cập nhật permissions vào database
            java.util.Map<String, Permission> savedPermissions = new java.util.HashMap<>();
            permissionDefs.forEach((code, desc) -> {
                Permission p = permissionRepository.findByCode(code)
                        .map(existing -> {
                            existing.setDescription(desc);
                            return permissionRepository.save(existing);
                        })
                        .orElseGet(() -> permissionRepository.save(
                                Permission.builder().code(code).description(desc).build()));
                savedPermissions.put(code, p);
            });

            // Định nghĩa quyền cho từng Role
            java.util.function.BiConsumer<String, java.util.List<String>> assignPermissionsToRole = (roleName, permCodes) -> {
                Role role = roleRepository.findByName(roleName).orElseThrow();
                role.getPermissions().clear();
                for (String code : permCodes) {
                    Permission p = savedPermissions.get(code);
                    if (p != null) {
                        role.getPermissions().add(p);
                    }
                }
                roleRepository.save(role);
                log.info("Role {} đã được kết nối với {} permissions", roleName, role.getPermissions().size());
            };

            // 1. ADMIN: Toàn bộ permissions
            assignPermissionsToRole.accept("ADMIN", new java.util.ArrayList<>(permissionDefs.keySet()));

            // 2. MANAGER: Quản lý vận hành + Báo cáo + Phân công
            assignPermissionsToRole.accept("MANAGER", Arrays.asList(
                    "DASHBOARD_VIEW", "REPORT_VIEW", "STAFF_VIEW",
                    "BOOKING_VIEW", "BOOKING_CREATE", "BOOKING_UPDATE", "BOOKING_CANCEL", "GUEST_CHECKIN_OUT",
                    "ROOM_VIEW", "ROOM_STATUS_UPDATE",
                    "HOUSEKEEPING_VIEW", "HOUSEKEEPING_ASSIGN", "HOUSEKEEPING_UPDATE",
                    "MAINTENANCE_VIEW", "MAINTENANCE_CREATE", "MAINTENANCE_UPDATE"
            ));

            // 3. RECEPTIONIST: Đặt phòng, checkin/checkout, xem trạng thái phòng, báo hỏng
            assignPermissionsToRole.accept("RECEPTIONIST", Arrays.asList(
                    "DASHBOARD_VIEW",
                    "BOOKING_VIEW", "BOOKING_CREATE", "BOOKING_UPDATE", "BOOKING_CANCEL", "GUEST_CHECKIN_OUT",
                    "ROOM_VIEW", "ROOM_STATUS_UPDATE",
                    "MAINTENANCE_CREATE"
            ));

            // 4. HOUSEKEEPER: Xem và cập nhật dọn phòng, đổi trạng thái phòng sạch/bẩn, báo hỏng thiết bị
            assignPermissionsToRole.accept("HOUSEKEEPER", Arrays.asList(
                    "ROOM_VIEW", "ROOM_STATUS_UPDATE",
                    "HOUSEKEEPING_VIEW", "HOUSEKEEPING_UPDATE",
                    "MAINTENANCE_CREATE"
            ));

            // 5. TECHNICIAN: Xem và xử lý các sự cố bảo trì, cập nhật trạng thái phòng khi sửa chữa
            assignPermissionsToRole.accept("TECHNICIAN", Arrays.asList(
                    "ROOM_VIEW", "ROOM_STATUS_UPDATE",
                    "MAINTENANCE_VIEW", "MAINTENANCE_UPDATE"
            ));

            // Helper tạo user mẫu nếu chưa tồn tại
            java.util.function.Consumer<User> createUserIfNotExists = (user) -> {
                if (!userRepository.existsByEmail(user.getEmail())) {
                    userRepository.save(user);
                    log.info("Tạo tài khoản mẫu: {} (Role: {})", user.getEmail(), 
                            user.getRoles().stream().map(Role::getName).collect(Collectors.joining(", ")));
                }
            };

            Role adminRole = roleRepository.findByName("ADMIN").orElseThrow();
            Role managerRole = roleRepository.findByName("MANAGER").orElseThrow();
            Role receptionistRole = roleRepository.findByName("RECEPTIONIST").orElseThrow();
            Role housekeeperRole = roleRepository.findByName("HOUSEKEEPER").orElseThrow();
            Role technicianRole = roleRepository.findByName("TECHNICIAN").orElseThrow();
            Role customerRole = roleRepository.findByName("CUSTOMER").orElseThrow();

            // 1. Admin
            createUserIfNotExists.accept(User.builder()
                    .email("admin@example.com")
                    .passwordHash(passwordEncoder.encode("admin123"))
                    .fullName("Admin Quản Trị")
                    .phone("0123456789")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(adminRole)))
                    .build());

            // 2. Manager
            createUserIfNotExists.accept(User.builder()
                    .email("manager@example.com")
                    .passwordHash(passwordEncoder.encode("manager123"))
                    .fullName("Lê Hoàng Nam (Quản lý)")
                    .phone("0912345678")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(managerRole)))
                    .build());

            // 3. Receptionist
            createUserIfNotExists.accept(User.builder()
                    .email("receptionist@example.com")
                    .passwordHash(passwordEncoder.encode("receptionist123"))
                    .fullName("Nguyễn Minh Anh (Lễ tân)")
                    .phone("0923456789")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(receptionistRole)))
                    .build());

            // 4. Housekeeper
            createUserIfNotExists.accept(User.builder()
                    .email("housekeeper@example.com")
                    .passwordHash(passwordEncoder.encode("housekeeper123"))
                    .fullName("Trần Quốc Bảo (Buồng phòng)")
                    .phone("0934567890")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(housekeeperRole)))
                    .build());

            // 5. Technician
            createUserIfNotExists.accept(User.builder()
                    .email("technician@example.com")
                    .passwordHash(passwordEncoder.encode("technician123"))
                    .fullName("Phạm Thu Hà (Kỹ thuật)")
                    .phone("0945678901")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(technicianRole)))
                    .build());

            // 6. Customer
            createUserIfNotExists.accept(User.builder()
                    .email("customer@example.com")
                    .passwordHash(passwordEncoder.encode("customer123"))
                    .fullName("Khách Hàng Mẫu")
                    .phone("0987654321")
                    .enabled(true)
                    .roles(new HashSet<>(Arrays.asList(customerRole)))
                    .build());
        };
    }
}
