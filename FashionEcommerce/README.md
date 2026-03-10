# FashionEcommerce - E-Commerce API

## Giới thiệu

FashionEcommerce là API RESTful được xây dựng bằng ASP.NET Core 9.0 và Entity Framework Core 9.0, phục vụ cho ứng dụng thương mại điện tử bán quần áo thời trang.

## Công nghệ sử dụng

- **.NET 9.0** - Framework phát triển
- **Entity Framework Core 9.0** - ORM cho SQL Server
- **SQL Server** - Cơ sở dữ liệu
- **JWT Authentication** - Xác thực người dùng
- **Swagger/OpenAPI** - Tài liệu API

## Cấu trúc Project

```
FashionEcommerce/
├── Controllers/          # API Controllers
│   ├── CategoriesController.cs
│   ├── CouponController.cs
│   ├── MasterColorsController.cs
│   ├── MasterSizesController.cs
│   ├── ProductImagesController.cs
│   ├── ProductsController.cs
│   ├── ProductVariantsController.cs
│   ├── PromotionController.cs
│   └── UsersController.cs
├── Data/
│   └── AppDbContext.cs   # EF Core DbContext
├── Helpers/
│   └── JwtHelper.cs     # Hỗ trợ JWT
├── Models/
│   ├── DTOs/            # Data Transfer Objects
│   └── Entities/        # Entity Models
├── Repositories/        # Data Access Layer
├── Services/            # Business Logic Layer
└── Migrations/         # EF Core Migrations
```

## Cài đặt và Chạy

### Yêu cầu

- .NET 9.0 SDK
- SQL Server (LocalDB hoặc SQL Server Express)

### Các bước chạy

```bash
# Di chuyển đến thư mục project
cd c:/GIt/LTUDW/FashionEcommerce

# Restore packages
dotnet restore

# Build project
dotnet build

# Chạy migration (nếu cần)
dotnet ef database update

# Run project
dotnet run
```

API sẽ chạy tại: `http://localhost:5000` hoặc cổng khác tùy cấu hình

---

## API Endpoints

### 🔓 Public Endpoints (Không cần token)

#### Users
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/users/register` | Đăng ký user mới |
| POST | `/api/users/login` | Đăng nhập, lấy JWT token |

---

### 🔐 Protected Endpoints (Cần JWT Token)

#### Categories (Quản lý danh mục)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/categories` | Lấy tất cả categories |
| GET | `/api/categories/tree` | Lấy categories theo cấu trúc cây |
| GET | `/api/categories/{id}` | Lấy category by ID |
| POST | `/api/categories` | Tạo category mới |
| PUT | `/api/categories/{id}` | Cập nhật category |
| DELETE | `/api/categories/{id}` | Xóa category |

#### Products (Quản lý sản phẩm)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products` | Lấy danh sách products (filter + paging) |
| GET | `/api/products/{id}` | Lấy product by ID |
| POST | `/api/products` | Tạo product mới |
| PUT | `/api/products/{id}` | Cập nhật product |
| DELETE | `/api/products/{id}` | Xóa product |

#### Product Variants (Biến thể sản phẩm)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/variants/product/{productId}` | Lấy variants theo product |

#### Product Images (Hình ảnh sản phẩm)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/products/{productId}/images` | Lấy hình ảnh của product |
| POST | `/api/products/{productId}/images/upload` | Upload hình ảnh |
| DELETE | `/api/products/images/{id}` | Xóa hình ảnh |
| PUT | `/api/products/images/sort` | Sắp xếp hình ảnh |

#### Master Colors (Màu sắc)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/colors` | Lấy danh sách màu sắc |

#### Master Sizes (Kích thước)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/sizes` | Lấy danh sách kích thước |

#### Users (Người dùng)
| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/users/profile` | Xem thông tin cá nhân |
| PUT | `/api/users/profile` | Cập nhật thông tin cá nhân |
| PUT | `/api/users/{id}/lock` | Khóa tài khoản (Admin) |
| PUT | `/api/users/{id}/unlock` | Mở khóa tài khoản (Admin) |

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

## Hướng dẫn Test API với Postman

### Bước 1: Chạy API

```bash
cd c:\GIt\LTUDW\FashionEcommerce
dotnet run
```

API sẽ chạy tại: **`http://localhost:5000`**

---

### Bước 2: Đăng ký User

**POST** `http://localhost:5000/api/users/register`

**Headers:**
| Key | Value |
|-----|-------|
| Content-Type | application/json |

**Body (JSON):**
```json
{
  "email": "admin@test.com",
  "password": "Admin123!",
  "fullName": "Admin User",
  "phoneNumber": "0123456789"
}
```

---

### Bước 3: Đăng nhập (Lấy Token)

**POST** `http://localhost:5000/api/users/login`

**Body (JSON):**
```json
{
  "email": "admin@test.com",
  "password": "Admin123!"
}
```

**Response:**
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

**⚠️ QUAN TRỌNG:** Copy token từ response này!

---

### Bước 4: Cấu hình Authorization

Với mỗi request cần auth:
- Vào tab **Headers**
- Thêm:
  | Key | Value |
  |-----|-------|
  | Authorization | Bearer **YOUR_TOKEN_HERE** |

---

### Bước 5: Test các API Endpoints

#### 📁 Categories (Danh mục)

**1. Tạo Category**
- **POST** `http://localhost:5000/api/categories`
- **Headers:** Authorization: Bearer TOKEN
- **Body:**
```json
{
  "name": "Áo Thun",
  "slug": "ao-thun",
  "isActive": true
}
```

**2. Lấy tất cả Categories**
- **GET** `http://localhost:5000/api/categories`

---

#### 📦 Products (Sản phẩm)

**1. Tạo Product**
- **POST** `http://localhost:5000/api/products`
- **Headers:** Authorization: Bearer TOKEN
- **Body:**
```json
{
  "name": "Áo Thun Nam",
  "slug": "ao-thun-nam",
  "description": "Áo thun nam cotton",
  "price": 250000,
  "categoryId": 1,
  "thumbnail": "/images/thumb.jpg",
  "isActive": true
}
```

**2. Lấy danh sách Products (có filter + phân trang)**
- **GET** `http://localhost:5000/api/products?SearchTerm=áo&CategoryId=1&MinPrice=100000&MaxPrice=500000&PageIndex=1&PageSize=10`

**3. Lấy Product by ID**
- **GET** `http://localhost:5000/api/products/1`

**4. Cập nhật Product**
- **PUT** `http://localhost:5000/api/products/1`

**5. Xóa Product**
- **DELETE** `http://localhost:5000/api/products/1`

---

#### 🎨 Master Colors
- **GET** `http://localhost:5000/api/colors`

#### 📏 Master Sizes
- **GET** `http://localhost:5000/api/sizes`

---

#### 📋 Product Variants
- **GET** `http://localhost:5000/api/variants/product/1`

---

#### 🖼️ Product Images

**1. Lấy hình ảnh của product**
- **GET** `http://localhost:5000/api/products/1/images`

**2. Upload hình ảnh**
- **POST** `http://localhost:5000/api/products/1/images/upload`
- **Body:** form-data, key: `file` (type: File)

**3. Xóa hình ảnh**
- **DELETE** `http://localhost:5000/api/products/images/1`

---

#### 👤 User Profile

**1. Xem thông tin cá nhân**
- **GET** `http://localhost:5000/api/users/profile`
- **Headers:** Authorization: Bearer TOKEN

**2. Cập nhật thông tin**
- **PUT** `http://localhost:5000/api/users/profile`
- **Body:**
```json
{
  "fullName": "Nguyễn Văn A",
  "phoneNumber": "0987654321",
  "dateOfBirth": "1995-01-01"
}
```

---

### Mẹo sử dụng Postman

1. **Tạo Collection:** Tạo collection "FashionEcommerce" để lưu tất cả requests
2. **Sử dụng Environment:** Tạo environment với biến `baseUrl`: `http://localhost:5000`
3. **Authorization tab:** Vào tab **Authorization** chọn type **Bearer Token** và paste token

---

## Cấu hình Database

File `appsettings.json` chứa chuỗi kết nối:

```json
{
  "ConnectionStrings": {
    "FashionEcommerceDB": "Server=.;Database=FashionEcommerceDB;Trusted_Connection=True;TrustServerCertificate=True"
  }
}
```

Để sử dụng database:

```bash
# Tạo migration
dotnet ef migrations add InitialCreate

# Cập nhật database
dotnet ef database update
```

---

## Các Entity Models

### Product
- Id, Name, Slug, Description, Price, CategoryId, Thumbnail, IsActive

### ProductVariant  
- Id, ProductId, ColorId, SizeId, Sku, Quantity, PriceModifier

### ProductImage
- Id, ProductId, ImageUrl, SortOrder

### Category
- Id, Name, Slug, ParentId, IsActive

### MasterColor
- Id, Name, HexCode

### MasterSize
- Id, Name

### User
- Id, Username, Email, PasswordHash, FullName, PhoneNumber, Role, IsLocked

### Coupon
- Id, Code, DiscountType, DiscountValue, MinOrderValue, StartDate, EndDate, IsActive

### Promotion
- Id, Name, DiscountType, DiscountValue, StartDate, EndDate, IsActive

