# Fashion Ecommerce - Users API Module

## 📋 Tổng quan

Đây là module Users API được xây dựng bằng **ASP.NET Core 8 Web API** với các tính năng:
- Đăng ký / Đăng nhập người dùng
- Quản lý profile cá nhân
- Phân quyền Admin/Customer
- Khóa/Mở khóa tài khoản

## 🛠️ Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| Framework | ASP.NET Core 8 |
| Database | SQL Server |
| ORM | Entity Framework Core 8 |
| Authentication | JWT (JSON Web Token) |
| Password Hashing | BCrypt |
| API Documentation | Swagger |

## 📦 NuGet Packages đã cài đặt

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.Tools" Version="8.0.0" />
<PackageReference Include="Microsoft.AspNetCore.Authentication.JwtBearer" Version="8.0.0" />
<PackageReference Include="BCrypt.Net-Next" Version="4.0.3" />
<PackageReference Include="Swashbuckle.AspNetCore" Version="6.5.0" />
```

## 📁 Cấu trúc dự án

```
FashionEcommerce/
├── Controllers/
│   └── UsersController.cs      # API Endpoints
├── Services/
│   ├── Interfaces/
│   │   └── IUserService.cs     # Service Interface
│   └── UserService.cs           # Business Logic
├── Repositories/
│   ├── Interfaces/
│   │   └── IUserRepository.cs   # Repository Interface
│   └── UserRepository.cs        # Data Access
├── Models/
│   ├── Entities/
│   │   └── User.cs              # User Entity
│   └── DTOs/
│       ├── RegisterDTO.cs        # Đăng ký
│       ├── LoginDTO.cs           # Đăng nhập
│       ├── UserDTO.cs            # Thông tin user
│       ├── UpdateProfileDTO.cs   # Cập nhật profile
│       └── LoginResponseDTO.cs   # Response đăng nhập
├── Data/
│   └── AppDbContext.cs           # EF Core DbContext
├── Helpers/
│   └── JwtHelper.cs              # JWT Token Helper
├── appsettings.json              # Cấu hình
├── Program.cs                    # Entry Point
└── FashionEcommerce.csproj       # Project File
```

## 🔌 API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| POST | `/api/users/register` | Đăng ký tài khoản | None |
| POST | `/api/users/login` | Đăng nhập | None |
| GET | `/api/users/profile` | Xem thông tin cá nhân | JWT |
| PUT | `/api/users/profile` | Cập nhật thông tin | JWT |
| PUT | `/api/users/{id}/lock` | Khóa tài khoản | JWT (Admin) |
| PUT | `/api/users/{id}/unlock` | Mở khóa tài khoản | JWT (Admin) |

## ⚙️ Cấu hình

### appsettings.json

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost;Database=FashionEcommerceDB;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "Jwt": {
    "SecretKey": "YourSuperSecretKeyForJwtTokenGeneration2024!",
    "Issuer": "FashionEcommerceAPI",
    "Audience": "FashionEcommerceClient",
    "ExpirationMinutes": 60
  }
}
```

## 🚀 Cách chạy dự án

### 1. Cài đặt dependencies
```bash
dotnet restore
```

### 2. Cấu hình database
Đảm bảo SQL Server đang chạy và cập nhật connection string trong `appsettings.json`

### 3. Chạy ứng dụng (đã sử dụng EnsureCreated)
```bash
dotnet run
```

### 4. Truy cập Swagger UI
```
http://localhost:5000/swagger
```

## 🔐 Ví dụ sử dụng API

### 1. Đăng ký (Register)
```http
POST /api/users/register
Content-Type: application/json

{
  "email": "user@example.com",
  "username": "username",
  "password": "password123",
  "confirmPassword": "password123",
  "fullName": "Nguyen Van A",
  "phoneNumber": "0123456789"
}
```

### 2. Đăng nhập (Login)
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "expiresIn": 60,
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "Customer",
    ...
  }
}
```

### 3. Sử dụng Token
Thêm header vào request:
```
Authorization: Bearer <token>
```

### 4. Khóa tài khoản (Admin only)
```http
PUT /api/users/2/lock
Authorization: Bearer <admin_token>
```

## 🔑 Lưu ý bảo mật

1. **Secret Key**: Thay đổi `Jwt:SecretKey` trong appsettings.json bằng một chuỗi ngẫu nhiên an toàn
2. **HTTPS**: Trong môi trường production, hãy bật HTTPS
3. **Password**: Mật khẩu được hash bằng BCrypt với cost factor mặc định
4. **CORS**: Cấu hình CORS phù hợp trước khi deploy

## 📝 Database Schema

Bảng Users trong database:
| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary Key |
| Username | nvarchar(100) | Tên đăng nhập |
| PasswordHash | nvarchar(255) | Mật khẩu đã hash |
| Email | nvarchar(255) | Email (unique) |
| GoogleId | nvarchar(255) | Google ID (nullable) |
| DateOfBirth | datetime | Ngày sinh (nullable) |
| FullName | nvarchar(100) | Họ tên (nullable) |
| PhoneNumber | nvarchar(20) | Số điện thoại (nullable) |
| AvatarUrl | nvarchar(500) | URL ảnh đại diện (nullable) |
| Role | nvarchar(50) | Vai trò (Admin/Customer) |
| IsLocked | bit | Trạng thái khóa |
| CreatedAt | datetime | Ngày tạo |

## ✅ Checklist sau khi tạo dự án

- [x] Tạo dự án ASP.NET Core 8 Web API
- [x] Cài đặt NuGet Packages
- [x] Cấu hình Entity Framework Core
- [x] Tạo User Entity phù hợp với database
- [x] Tạo các DTOs
- [x] Tạo Repository và Service
- [x] Tạo UsersController với các endpoints
- [x] Cấu hình JWT Authentication
- [x] Cấu hình Swagger cho Production
- [x] Test các API endpoints

## 🎯 Trạng thái

Dự án đã hoàn thành và test thành công:
- ✅ Register API
- ✅ Login API (trả về JWT token)
- ✅ Get Profile API (với JWT)
- ✅ Update Profile API (với JWT)
- ✅ Lock/Unlock API (Admin only)
- ✅ Swagger UI hoạt động trên Production

