# Fashion Ecommerce API

## 📋 Tổng quan

Đây là dự án Fashion Ecommerce API được xây dựng bằng **ASP.NET Core 8 Web API** với các tính năng:

### Module Users
- Đăng ký / Đăng nhập người dùng
- Quản lý profile cá nhân
- Phân quyền Admin/Customer
- Khóa/Mở khóa tài khoản

### Module Categories
- Quản lý danh mục sản phẩm (CRUD)
- Cấu trúc cây phân cấp (Tree structure)
- Self-referencing relationship (Parent/Children)

### Module Products
- Quản lý sản phẩm (CRUD)
- Tìm kiếm và lọc sản phẩm
- Phân trang (Pagination)
- Liên kết với Categories

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
- ✅ Categories API (CRUD + Tree)
- ✅ Products API (CRUD + Filter + Pagination)

---

# 📚 Catalog API Documentation (Categories & Products)

## 🔌 Categories API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/categories` | Lấy danh sách tất cả danh mục | None |
| GET | `/api/categories/tree` | Lấy danh sách danh mục theo cấu trúc cây | None |
| GET | `/api/categories/{id}` | Lấy chi tiết danh mục theo ID | None |
| POST | `/api/categories` | Tạo mới danh mục | JWT |
| PUT | `/api/categories/{id}` | Cập nhật danh mục | JWT |
| DELETE | `/api/categories/{id}` | Xóa danh mục | JWT |

## 🔌 Products API Endpoints

| Method | Endpoint | Mô tả | Auth |
|--------|----------|-------|------|
| GET | `/api/products` | Lấy danh sách sản phẩm (filter + pagination) | None |
| GET | `/api/products/{id}` | Lấy chi tiết sản phẩm (bao gồm tên danh mục) | None |
| POST | `/api/products` | Tạo mới sản phẩm | JWT |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm | JWT |
| DELETE | `/api/products/{id}` | Xóa sản phẩm | JWT |

## 📝 Database Schema (Categories & Products)

### Bảng Categories
| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary Key (Auto-increment) |
| Name | nvarchar(100) | Tên danh mục |
| Slug | varchar(100) | Slug (unique) |
| ParentId | int | ID danh mục cha (nullable, FK self-reference) |
| IsActive | bit | Trạng thái hoạt động (default: 1) |

### Bảng Products
| Column | Type | Description |
|--------|------|-------------|
| Id | int | Primary Key (Auto-increment) |
| Name | nvarchar(200) | Tên sản phẩm |
| Slug | varchar(200) | Slug (unique) |
| Description | nvarchar(max) | Mô tả sản phẩm (nullable) |
| Price | decimal(18,2) | Giá sản phẩm |
| CategoryId | int | FK đến bảng Categories |
| Thumbnail | varchar(500) | URL ảnh đại diện (nullable) |
| IsActive | bit | Trạng thái hoạt động (default: 1) |

## 🔍 Ví dụ sử dụng API Categories

### 1. Lấy danh sách tất cả danh mục
```http
GET /api/categories
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Áo nam",
    "slug": "ao-nam",
    "parentId": null,
    "isActive": true
  },
  {
    "id": 2,
    "name": "Áo thun",
    "slug": "ao-thun",
    "parentId": 1,
    "isActive": true
  }
]
```

### 2. Lấy danh mục theo cấu trúc cây
```http
GET /api/categories/tree
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Áo nam",
    "slug": "ao-nam",
    "parentId": null,
    "isActive": true,
    "children": [
      {
        "id": 2,
        "name": "Áo thun",
        "slug": "ao-thun",
        "parentId": 1,
        "isActive": true,
        "children": []
      }
    ]
  }
]
```

### 3. Tạo mới danh mục
```http
POST /api/categories
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Áo sơ mi",
  "slug": "ao-so-mi",
  "parentId": 1,
  "isActive": true
}
```

## 🔍 Ví dụ sử dụng API Products

### 1. Lấy danh sách sản phẩm với filter và pagination
```http
GET /api/products?SearchTerm=áo&CategoryId=1&MinPrice=100000&MaxPrice=500000&PageIndex=1&PageSize=10
```

**Query Parameters:**
| Parameter | Type | Description | Default |
|-----------|------|-------------|---------|
| SearchTerm | string | Tìm kiếm theo tên | null |
| CategoryId | int? | Lọc theo danh mục | null |
| MinPrice | decimal? | Giá tối thiểu | null |
| MaxPrice | decimal? | Giá tối đa | null |
| PageIndex | int | Chỉ mục trang | 1 |
| PageSize | int | Kích thước trang | 10 |

**Response:**
```json
{
  "totalItems": 25,
  "totalPages": 3,
  "pageIndex": 1,
  "pageSize": 10,
  "hasPreviousPage": false,
  "hasNextPage": true,
  "items": [
    {
      "id": 1,
      "name": "Áo thun nam",
      "slug": "ao-thun-nam",
      "description": "Áo thun cotton",
      "price": 199000,
      "categoryId": 1,
      "categoryName": "Áo nam",
      "thumbnail": "https://example.com/image.jpg",
      "isActive": true
    }
  ]
}
```

### 2. Lấy chi tiết sản phẩm
```http
GET /api/products/1
```

**Response:**
```json
{
  "id": 1,
  "name": "Áo thun nam",
  "slug": "ao-thun-nam",
  "description": "Áo thun cotton chất lượng cao",
  "price": 199000,
  "categoryId": 1,
  "categoryName": "Áo nam",
  "thumbnail": "https://example.com/image.jpg",
  "isActive": true
}
```

### 3. Tạo mới sản phẩm
```http
POST /api/products
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "Áo thun nam",
  "slug": "ao-thun-nam",
  "description": "Áo thun cotton chất lượng cao",
  "price": 199000,
  "categoryId": 1,
  "thumbnail": "https://example.com/image.jpg",
  "isActive": true
}
```

## ⚡ Tối ưu hiệu năng

1. **AsNoTracking()**: Được sử dụng cho tất cả các operation GET để tối ưu bộ nhớ
2. **IQueryable**: Sử dụng cho filter và pagination để tránh tải toàn bộ dữ liệu lên memory
3. **Include()**: Sử dụng .Include(p => p.Category) để load thông tin category trong cùng query
4. **Index**: Các trường Slug được đánh unique index để tăng tốc độ tìm kiếm

## ✅ Checklist Catalog API

- [x] Tạo Category Entity với self-referencing relationship
- [x] Tạo Product Entity với relationship với Category
- [x] Cấu hình Fluent API trong AppDbContext
- [x] Tạo DTOs cho Category và Product
- [x] Tạo PagedResult<T> cho pagination
- [x] Tạo ProductQueryParameters cho filter
- [x] Tạo CategoryService với recursive tree building
- [x] Tạo ProductService với IQueryable filter/pagination
- [x] Tạo CategoriesController
- [x] Tạo ProductsController
- [x] Đăng ký services trong Program.cs
- [x] Build thành công với 0 errors

