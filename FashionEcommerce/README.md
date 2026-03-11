# Fashion Ecommerce API

API Web ASP.NET Core cho nền tảng thương mại điện tử thời trang với đầy đủ các tính năng xác thực, quản lý sản phẩm, giỏ hàng, đơn hàng, khuyến mãi và trang quản trị admin.

## 🚀 Các Tính Năng

### Xác Thực & Phân Quyền
- Xác thực JWT với Access Token & Refresh Token
- Phân quyền theo vai trò (Admin, Customer)
- Mật khẩu được bảo mật bằng BCrypt
- Cơ chế làm mới token

### Quản Lý Sản Phẩm
- CRUD sản phẩm
- Quản lý hình ảnh sản phẩm
- Biến thể sản phẩm (size, color)
- Quản lý danh mục
- Tìm kiếm và lọc sản phẩm

### Giỏ Hàng
- Thêm/xóa sản phẩm vào giỏ
- Quản lý số lượng
- Lưu giá tại thời điểm thêm

### Quản Lý Đơn Hàng
- Tạo và theo dõi đơn hàng
- Quy trình trạng thái: Chờ xác nhận → Đã thanh toán → Đang giao → Hoàn thành / Đã hủy
- Lịch sử đơn hàng và trạng thái
- Ghi log trạng thái đơn hàng
- Quản lý đơn hàng cho admin

### Khuyến Mãi & Coupon
- Hệ thống coupon
- Chiến dịch khuyến mãi
- Khuyến mãi theo sản phẩm

### Thông Báo
- Thông báo thời gian thực cho thay đổi trạng thái đơn hàng
- Quản lý thông báo người dùng

### Tài Liệu API
- Tích hợp Swagger UI
- Đầy đủ tài liệu API

## 🛠️ Công Nghệ

- **Framework:** ASP.NET Core 8.0
- **Database:** SQL Server
- **ORM:** Entity Framework Core
- **Authentication:** JWT (JSON Web Tokens)
- **Password Hashing:** BCrypt
- **API Documentation:** Swagger / OpenAPI
- **Architecture:** MVC Pattern với Services & Repositories

## 📁 Cấu Trúc Dự Án

```
FashionEcommerce/
├── Controllers/           # API Controllers
│   ├── AuthController.cs         # Xác thực (Login, Register, Refresh)
│   ├── ProductsController.cs      # Quản lý sản phẩm
│   ├── CategoriesController.cs    # Quản lý danh mục
│   ├── CartControlleer.cs        # Giỏ hàng
│   ├── OrdersController.cs       # Đơn hàng người dùng
│   ├── AdminOrdersController.cs  # Quản lý đơn hàng Admin
│   ├── UsersController.cs        # Quản lý profile
│   ├── NotificationsController.cs # Thông báo
│   ├── CouponController.cs        # Quản lý coupon
│   ├── PromotionController.cs    # Quản lý khuyến mãi
│   ├── ProductVariantsController.cs # Biến thể sản phẩm
│   ├── MasterColorsController.cs # Quản lý màu
│   ├── MasterSizesController.cs  # Quản lý size
│   └── ProductImagesController.cs # Hình ảnh sản phẩm
│
├── Models/
│   ├── Entities/          # Database entities
│   │   ├── User.cs
│   │   ├── Product.cs
│   │   ├── Category.cs
│   │   ├── CartItem.cs
│   │   ├── Order.cs
│   │   ├── OrderDetail.cs
│   │   ├── OrderStatusHistory.cs
│   │   ├── Notification.cs
│   │   ├── ProductImage.cs
│   │   ├── ProductVariant.cs
│   │   ├── MasterColor.cs
│   │   ├── MasterSize.cs
│   │   ├── Coupon.cs
│   │   ├── Promotion.cs
│   │   ├── ProductPromotion.cs
│   │   ├── PromotionCondition.cs
│   │   └── RefreshToken.cs
│   │
│   └── DTOs/             # Data Transfer Objects
│       ├── AuthDtos.cs
│       ├── LoginDTO.cs
│       ├── RegisterDTO.cs
│       ├── ProductDto.cs
│       ├── CreateProductDto.cs
│       ├── UpdateProductDto.cs
│       ├── CategoryDto.cs
│       ├── PagedResult.cs
│       └── ...
│
├── Services/             # Business logic services
│   ├── ProductService.cs
│   ├── UserService.cs
│   ├── CategoryService.cs
│   ├── JwtService.cs
│   └── Interfaces/
│
├── Repositories/         # Data access layer
│   ├── UserRepository.cs
│   └── Interfaces/
│
├── Data/                # Database context
│   └── AppDbContext.cs
│
├── Helpers/             # Helper classes
│   └── JwtHelper.cs
│
├── Middleware/          # Custom middleware
│   └── GlobalExceptionMiddleware.cs
│
├── Migrations/          # EF Core migrations
│
└── Properties/          # Launch settings
```

## 📋 Các API Endpoints

### Xác Thực
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| POST | `/api/auth/register` | Đăng ký người dùng mới | Không |
| POST | `/api/auth/login` | Đăng nhập | Không |
| POST | `/api/auth/refresh` | Làm mới token | Không |

### Sản Phẩm
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/products` | Lấy tất cả sản phẩm | Không |
| GET | `/api/products/{id}` | Lấy sản phẩm theo ID | Không |
| POST | `/api/products` | Tạo sản phẩm | Admin |
| PUT | `/api/products/{id}` | Cập nhật sản phẩm | Admin |
| DELETE | `/api/products/{id}` | Xóa sản phẩm | Admin |

### Danh Mục
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/categories` | Lấy tất cả danh mục | Không |
| POST | `/api/categories` | Tạo danh mục | Admin |
| PUT | `/api/categories/{id}` | Cập nhật danh mục | Admin |
| DELETE | `/api/categories/{id}` | Xóa danh mục | Admin |

### Giỏ Hàng
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/cart` | Lấy các mặt hàng trong giỏ | Có |
| POST | `/api/cart` | Thêm vào giỏ | Có |
| PUT | `/api/cart/{id}` | Cập nhật số lượng | Có |
| DELETE | `/api/cart/{id}` | Xóa khỏi giỏ | Có |

### Đơn Hàng
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/orders` | Lấy đơn hàng của user | Có |
| POST | `/api/orders` | Tạo đơn hàng | Có |
| GET | `/api/orders/{id}` | Lấy chi tiết đơn hàng | Có |

### Admin Đơn Hàng
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/admin/orders` | Lấy tất cả đơn hàng | Admin |
| PUT | `/api/admin/orders/{id}/status` | Cập nhật trạng thái | Admin |

### Người Dùng
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/users/profile` | Lấy profile user | Có |
| PUT | `/api/users/profile` | Cập nhật profile | Có |

### Thông Báo
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/notifications` | Lấy thông báo | Có |
| PUT | `/api/notifications/{id}/read` | Đánh dấu đã đọc | Có |

### Coupon
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/coupons` | Lấy tất cả coupon | Admin |
| POST | `/api/coupons` | Tạo coupon | Admin |
| PUT | `/api/coupons/{id}` | Cập nhật coupon | Admin |
| DELETE | `/api/coupons/{id}` | Xóa coupon | Admin |
| POST | `/api/coupons/validate` | Kiểm tra coupon | Có |

### Khuyến Mãi
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/promotions` | Lấy tất cả khuyến mãi | Không |
| POST | `/api/promotions` | Tạo khuyến mãi | Admin |
| PUT | `/api/promotions/{id}` | Cập nhật khuyến mãi | Admin |
| DELETE | `/api/promotions/{id}` | Xóa khuyến mãi | Admin |

### Biến Thể Sản Phẩm
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/productvariants` | Lấy tất cả biến thể | Không |
| POST | `/api/productvariants` | Tạo biến thể | Admin |
| PUT | `/api/productvariants/{id}` | Cập nhật biến thể | Admin |
| DELETE | `/api/productvariants/{id}` | Xóa biến thể | Admin |

### Màu & Size
| Method | Endpoint | Mô Tả | Auth |
|--------|----------|--------|------|
| GET | `/api/mastercolors` | Lấy tất cả màu | Không |
| GET | `/api/mastersizes` | Lấy tất cả size | Không |
| POST | `/api/mastercolors` | Tạo màu | Admin |
| POST | `/api/mastersizes` | Tạo size | Admin |

## ⚙️ Cấu Hình

### appsettings.json
```json
{
  "Logging": {
    "LogLevel": {
      "Default": "Information",
      "Microsoft.AspNetCore": "Warning"
    }
  },
  "AllowedHosts": "*",
  "ConnectionStrings": {
    "DefaultConnection": "Server=.;Database=FashionEcommerceDB;Trusted_Connection=True;TrustServerCertificate=True"
  },
  "Jwt": {
    "Key": "FashionEcommerceSuperSecretKey2024!@#$%^&*()",
    "Issuer": "FashionEcommerceAPI",
    "Audience": "FashionEcommerceClient",
    "ExpirationMinutes": 60
  }
}
```

## 🏃‍♂️ Bắt Đầu

### Yêu Cầu
- .NET 8.0 SDK
- SQL Server (LocalDB hoặc Express)

### Cài Đặt

1. Clone repository
2. Di chuyển đến thư mục dự án:
   ```bash
   cd LTUDW/FashionEcommerce
   ```

3. Khôi phục dependencies:
   ```bash
   dotnet restore
   ```

4. Cập nhật database (tạo migrations):
   ```bash
   dotnet ef database update
   ```
   Hoặc sử dụng migrations có sẵn để tạo database.

5. Chạy ứng dụng:
   ```bash
   dotnet run
   ```

6. Mở trình duyệt truy cập Swagger UI:
   ```
   http://localhost:5014/swagger
   ```

### Tài Khoản Admin Mặc Định
Hệ thống tạo sẵn tài khoản admin:
- **Email:** admin@fashion.com
- **Password:** Admin123

## 📦 Database Schema

### Bảng Users
| Column | Type | Mô Tả |
|--------|------|--------|
| Id | int | Primary Key |
| Email | string | Email duy nhất |
| PasswordHash | string | Mật khẩu BCrypt |
| FullName | string? | Họ tên |
| PhoneNumber | string? | Số điện thoại |
| Role | string | Admin/Customer |
| IsLocked | bool | Trạng thái khóa |
| CreatedAt | DateTime | Thời gian tạo |

### Bảng Products
| Column | Type | Mô Tả |
|--------|------|--------|
| Id | int | Primary Key |
| Name | string | Tên sản phẩm |
| Description | string | Mô tả |
| Price | decimal | Giá |
| Discount | decimal | Giảm giá |
| Stock | int | Tồn kho |
| CategoryId | int | FK đến Category |
| Slug | string | URL-friendly slug |
| IsActive | bool | Trạng thái hoạt động |

### Bảng Orders
| Column | Type | Mô Tả |
|--------|------|--------|
| Id | int | Primary Key |
| UserId | int | FK đến User |
| Status | string | Trạng thái đơn hàng |
| TotalAmount | decimal | Tổng tiền trước giảm |
| DiscountAmount | decimal | Tiền giảm |
| ShippingFee | decimal | Phí vận chuyển |
| FinalAmount | decimal | Tiền cuối cùng |
| ShippingAddress | string | Địa chỉ giao hàng |
| CreatedAt | DateTime | Thời gian tạo đơn |

### Quy Trình Trạng Thái Đơn Hàng
```
Chờ xác nhận → Đã thanh toán → Đang giao → Hoàn thành
                          ↓
                       Đã hủy
```

## 🔐 Tính Năng Bảo Mật

- JWT tokens với thời hạn có thể cấu hình
- Password hashing với BCrypt
- Role-based access control
- Token refresh mechanism
- Protected API endpoints

## 📝 Ghi Chú Phát Triển

- Sử dụng Entity Framework Core cho data access
- Hỗ trợ database seeding cho dữ liệu ban đầu
- Global exception handling middleware
- Swagger documentation cho tất cả endpoints
- Paged results cho các endpoints list

## 📄 License

Dự án này cho mục đích học tập.

