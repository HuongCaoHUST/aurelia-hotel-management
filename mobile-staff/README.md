# Aurelia Mobile Staff - React Native App

Màn hình đăng nhập dành cho ứng dụng di động Nhân viên (Aurelia Staff Mobile), được xây dựng bằng **React Native** dựa trên giao diện thiết kế từ `frontend-staff`.

## Cấu trúc thư mục

```text
mobile-staff/
├── App.tsx                   # Entry point giao diện chính
├── src/
│   └── screens/
│       └── LoginScreen.tsx   # Màn hình Đăng nhập React Native (Theme Aurelia Gold & Dark)
├── package.json              # Khai báo phụ thuộc React Native
└── README.md                 # Hướng dẫn khởi chạy
```

## Cách mở và chạy trong Android Studio

### 1. Chuẩn bị môi trường
- Cài đặt **Node.js** (v18+) và **Yarn** hoặc **npm**.
- Cài đặt **Android Studio** (kèm theo Android SDK, Build-Tools và Virtual Device / Emulator).

### 2. Cài đặt phụ thuộc
Chạy lệnh sau tại thư mục `mobile-staff`:
```bash
cd mobile-staff
npm install
```

### 3. Mở dự án Android trong Android Studio
Nếu dự án đã khởi tạo cấu trúc Native Android (hoặc tạo bằng `npx react-native init` / Expo):
1. Trong **Android Studio**, chọn **Open**.
2. Trỏ đến thư mục `mobile-staff/android`.
3. Chờ Android Studio đồng bộ Gradle (`Sync Project with Gradle Files`).

### 4. Khởi chạy
- Chạy Metro Bundler:
  ```bash
  npm start
  ```
- Khởi chạy app trên thiết bị ảo Android trong Android Studio (nhấn nút **Run 'app'** ▶️) hoặc dùng lệnh:
  ```bash
  npm run android
  ```
