# 🛒 FashionEcommerce Backend API

## 🛠 Tech Stack

| Thành phần | Công nghệ |
|-----------|----------|
| **Framework** | ASP.NET Core 9 (Web API) |
| **Database** | SQL Server |
| **ORM** | Entity Framework Core |
| **Authentication** | JWT Bearer + Refresh Token + BCrypt Hashing |
| **API Testing** | Postman / Swagger (OpenAPI) |

## 🚀 Hướng dẫn cài đặt (Local)

### 1. Clone Source Code

```bash
git clone https://github.com/Nam1414/LTUDW.git
cd backend/FashionEcommerce.Api
```

### 2. Cấu hình Database

Mở file `appsettings.json` và cập nhật chuỗi kết nối phù hợp với máy của bạn:

```json
"ConnectionStrings": {
  "DefaultConnection": "Server=YOUR_SERVER_NAME;Database=FashionEcommerceDb;User Id=sa;Password=123;TrustServerCertificate=true;"
}
```

### 3. Khởi tạo dữ liệu (Migration & Seed)

Chạy lệnh sau để tạo Database và nạp dữ liệu mẫu (Admin, Customer, Products):

```bash
dotnet ef database update --context AppDbContext
```

### 4. Chạy ứng dụng

```bash
dotnet run
```

API sẽ chạy mặc định tại: **http://localhost:5014**

## 🔑 Tài khoản mặc định (Seed Data)

| Role | Email | Password |
|------|-------|----------|
| **Admin** | admin@fashion.com | Admin123 |
| **Customer** | customer@fashion.com | Customer123 |

## 📑 Hướng dẫn Test các luồng nghiệp vụ (Workflows)

### 1. Luồng Xác thực (Authentication)

- **Đăng ký**: Sử dụng `POST /api/Auth/register` để tạo tài khoản mới.
- **Đăng nhập**: Gọi `POST /api/Auth/login`. Hệ thống trả về `accessToken` (hết hạn sau 15p) và `refreshToken`.
- **Gán Token**: Copy `accessToken` và dán vào phần Auth > Bearer Token trong Postman để gọi các API bảo mật.
- **Lấy Token mới**: Khi `accessToken` hết hạn, gọi `POST /api/Auth/refresh` kèm `refreshToken` để duy trì phiên đăng nhập.

### 2. Luồng Mua hàng (Customer Flow)

1. **Xem sản phẩm**: `GET /api/products` để lấy danh sách.
2. **Thêm giỏ hàng**: `POST /api/cart/items` (truyền `productId` và `quantity`).
   - ⚠️ Nếu số lượng vượt quá stock, hệ thống trả lỗi 400.
3. **Xem/Cập nhật giỏ hàng**: 
   - `GET /api/cart` để xem tổng tiền
   - `PUT` hoặc `DELETE` item nếu cần
4. **Đặt hàng (Checkout)**: `POST /api/orders`.
   - Hệ thống sẽ tự động chốt đơn, giảm tồn kho (stock) và xóa sạch giỏ hàng.
   - Trạng thái đơn hàng mặc định là **Pending**.

### 3. Luồng Quản lý đơn hàng & Thông báo (Admin + Customer)

- **Admin duyệt đơn**: Admin dùng `GET /api/admin/orders` để tìm đơn Pending.
- **Đổi trạng thái**: Admin gọi `PUT /api/admin/orders/{id}/status` để chuyển sang Paid, Shipping, v.v.
- **Nhận thông báo**: Ngay khi Admin đổi trạng thái, một Notification sẽ được tạo cho Customer.
- **Kiểm tra thông báo**: Customer gọi `GET /api/notifications` để xem badge và nội dung thay đổi.

### 4. Luồng Quản trị User (Admin Only)

- Admin có quyền xem danh sách User phân trang: `GET /api/Users?page=1&pageSize=10`.
- Khóa tài khoản: `PUT /api/Users/{id}/lock` truyền `true`. User bị khóa sẽ không thể login hoặc gọi API.

## 📉 Quy trình chuyển đổi trạng thái đơn hàng (Order Status)

Đơn hàng phải tuân thủ logic chuyển đổi nghiêm ngặt:

```
Pending    → Paid      │ Cancelled
   ↓
Paid       → Shipping  │ Cancelled
   ↓
Shipping   → Completed
   ↓
Completed (Trạng thái cuối - không thể đổi tiếp)
```

| Trạng thái | Mô tả |
|-----------|------|
| **Pending** | Đơn hàng vừa được tạo, chờ duyệt |
| **Paid** | Đơn hàng đã thanh toán |
| **Shipping** | Đơn hàng đang giao |
| **Completed** | Đơn hàng hoàn thành |
| **Cancelled** | Đơn hàng bị hủy |

## 🛠 Danh mục API quan trọng

### Auth & Users

| Method | Endpoint | Mô tả |
|--------|----------|------|
| `POST` | `/api/Auth/login` | Đăng nhập |
| `POST` | `/api/Auth/register` | Đăng ký tài khoản |
| `POST` | `/api/Auth/refresh` | Làm mới Token |
| `GET` | `/api/Users/me` | Lấy thông tin cá nhân hiện tại |
| `PUT` | `/api/Users/{id}/lock` | (Admin) Khóa/Mở khóa tài khoản |

### Products & Cart

| Method | Endpoint | Mô tả |
|--------|----------|------|
| `GET` | `/api/products` | Danh sách sản phẩm |
| `POST` | `/api/products/ProductImages/{id}` | (Admin) Thêm ảnh sản phẩm |
| `GET` | `/api/cart` | Xem giỏ hàng |
| `POST` | `/api/cart/items` | Thêm hàng vào giỏ |
| `PUT` | `/api/cart/items/{id}` | Cập nhật số lượng |
| `DELETE` | `/api/cart/items/{id}` | Xóa item từ giỏ |

### Orders & Notifications

| Method | Endpoint | Mô tả |
|--------|----------|------|
| `POST` | `/api/orders` | Tạo đơn hàng từ giỏ hàng |
| `GET` | `/api/orders` | Xem đơn hàng của bạn |
| `GET` | `/api/admin/orders` | (Admin) Xem tất cả đơn hàng |
| `PUT` | `/api/admin/orders/{id}/status` | (Admin) Cập nhật trạng thái đơn hàng |
| `GET` | `/api/notifications` | Xem thông báo mới nhất |

## 📝 Ghi chú

- Tất cả các endpoint bảo mật đều yêu cầu **Bearer Token** trong header `Authorization`.
- Admin role có quyền quản lý toàn bộ hệ thống.
- Customer role chỉ có thể xem/quản lý dữ liệu của riêng mình.
- Hệ thống tự động gửi thông báo (Notification) khi trạng thái đơn hàng thay đổi.