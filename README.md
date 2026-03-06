# FashionEcommerce - .NET 9 & EF Core 9 Migration

## ✅ Migration Hoàn Tất

### Thay đổi chính:

#### 1. Framework & Packages
| Package | Version cũ | Version mới |
|---------|------------|-------------|
| TargetFramework | net8.0 | **net9.0** |
| Microsoft.EntityFrameworkCore.SqlServer | 8.0.0 | **9.0.0** |
| Microsoft.AspNetCore.Authentication.JwtBearer | 8.0.0 | **9.0.0** |
| Microsoft.AspNetCore.OpenApi | - | **9.0.0** |
| Swashbuckle.AspNetCore | 6.5.0 | **7.2.0** |

#### 2. Program.cs
- Sử dụng `builder.Services.AddOpenApi()` thay vì cấu phức tạp
- `app.MapOpenApi()` endpoint
- Swagger UI vẫn giữ nguyên với JWT Authorization

#### 3. EF Core 9 Optimizations
- Thêm `CancellationToken` support cho async operations
- Tối ưu hóa `ProductService.GetAllAsync()` với:
  - `CountAsync(cancellationToken)`
  - `ToListAsync(cancellationToken)`

---

## CLI Commands

```bash
# Di chuyển đến thư mục project
cd c:/t1/LTUDW/FashionEcommerce

# Clean project
dotnet clean

# Restore packages
dotnet restore

# Build project
dotnet build

# Run project
dotnet run
```

---

## Test API với Postman

### Bước 1: Chạy API
```bash
dotnet run
```
API sẽ chạy tại: `http://localhost:5000` (hoặc cổng khác tùy cấu hình)

### Bước 2: Đăng ký User (Lấy Token)

**POST** `http://localhost:5xxx/api/users/register`

```json
{
  "email": "admin@test.com",
  "password": "Admin123!",
  "fullName": "Admin User",
  "phone": "0123456789"
}
```

### Bước 3: Đăng nhập (Lấy JWT Token)

**POST** `http://localhost:5xxx/api/users/login`

```json
{
  "email": "admin@test.com",
  "password": "Admin123!"
}
```

**Response sẽ trả về:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "admin@test.com",
    "fullName": "Admin User"
  }
}
```

### Bước 4: Cấu hình Postman

1. Copy token từ response đăng nhập
2. Trong Postman, vào tab **Headers**
3. Thêm header:
   - **Key**: `Authorization`
   - **Value**: `Bearer YOUR_TOKEN_HERE`

---

## Danh sách API Endpoints

### 🔓 Public Endpoints (Không cần token)

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/users/register` | Đăng ký user mới |
| POST | `/api/users/login` | Đăng nhập, lấy JWT token |

### 🔐 Protected Endpoints (Cần token)

#### Categories
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/categories` | Lấy tất cả categories |
| GET | `/api/categories/tree` | Lấy categories theo cấu trúc cây |
| GET | `/api/categories/{id}` | Lấy category by ID |
| POST | `/api/categories` | Tạo category mới |
| PUT | `/api/categories/{id}` | Cập nhật category |
| DELETE | `/api/categories/{id}` | Xóa category |

#### Products
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy danh sách products (filter + paging) |
| GET | `/api/products/{id}` | Lấy product by ID |
| POST | `/api/products` | Tạo product mới |
| PUT | `/api/products/{id}` | Cập nhật product |
| DELETE | `/api/products/{id}` | Xóa product |

---

## Query Parameters cho Products

| Parameter | Type | Mô tả | Ví dụ |
|-----------|------|-------|-------|
| `SearchTerm` | string | Tìm theo tên | `?SearchTerm=áo` |
| `CategoryId` | int | Lọc theo category | `?CategoryId=1` |
| `MinPrice` | decimal | Giá tối thiểu | `?MinPrice=100000` |
| `MaxPrice` | decimal | Giá tối đa | `?MaxPrice=500000` |
| `PageIndex` | int | Trang hiện tại (mặc định: 1) | `?PageIndex=1` |
| `PageSize` | int | Số item/trang (mặc định: 10) | `?PageSize=10` |

**Ví dụ đầy đủ:**
```
GET http://localhost:5xxx/api/products?SearchTerm=áo&CategoryId=1&MinPrice=100000&MaxPrice=500000&PageIndex=1&PageSize=10
```

---

## Công nghệ sử dụng
- ASP.NET Core 9.0
- Entity Framework Core 9.0
- SQL Server
- JWT Authentication
- Swagger/OpenAPI
