# Hướng Dẫn Test API Với Postman

Project đang chạy tại: **http://localhost:5014**

---

## 1. Đăng Nhập (Lấy Token)

### Đăng nhập Admin
- **Method:** POST
- **URL:** `http://localhost:5014/api/auth/login`
- **Body (JSON):**
```json
{
    "email": "admin@fashion.com",
    "password": "Admin123"
}
```

**Response:**
```json
{
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "...",
    "userId": 1,
    "email": "admin@fashion.com",
    "role": "Admin"
}
```

> 📝 **Copy giá trị "token"** để sử dụng cho các API cần auth

---

## 2. Cách Thêm Token Vào Header

Trong Postman:
1. Chọn tab **Headers**
2. Thêm:
   - **Key:** `Authorization`
   - **Value:** `Bearer {YOUR_TOKEN}`

---

## 3. Các API Cần Test

### 🔓 Public APIs (Không cần token)

| Method | URL | Mô Tả |
|--------|-----|--------|
| GET | `http://localhost:5014/api/products` | Danh sách sản phẩm |
| GET | `http://localhost:5014/api/products/1` | Sản phẩm theo ID |
| GET | `http://localhost:5014/api/categories` | Danh mục |
| GET | `http://localhost:5014/api/mastercolors` | Danh sách màu |
| GET | `http://localhost:5014/api/mastersizes` | Danh sách size |
| GET | `http://localhost:5014/api/promotions` | Danh sách khuyến mãi |

### 🔐 Protected APIs (Cần token)

| Method | URL | Body | Mô Tả |
|--------|-----|------|--------|
| POST | `/api/products` | ✅ | Tạo sản phẩm |
| PUT | `/api/products/1` | ✅ | Cập nhật sản phẩm |
| DELETE | `/api/products/1` | - | Xóa sản phẩm |
| POST | `/api/categories` | ✅ | Tạo danh mục |
| GET | `/api/admin/orders` | - | Tất cả đơn hàng |
| PUT | `/api/admin/orders/1/status` | ✅ | Cập nhật trạng thái |

---

## 4. Ví Dụ Chi Tiết

### Tạo Sản Phẩm (Admin)

- **Method:** POST
- **URL:** `http://localhost:5014/api/products`
- **Headers:**
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```
- **Body:**
```json
{
    "name": "Áo Thun Nam",
    "description": "Áo thun cotton 100%",
    "price": 150000,
    "discount": 10,
    "stock": 100,
    "categoryId": 1,
    "slug": "ao-thun-nam",
    "thumbnail": "https://example.com/image.jpg"
}
```

### Tạo Danh Mục (Admin)

- **Method:** POST
- **URL:** `http://localhost:5014/api/categories`
- **Headers:**
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```
- **Body:**
```json
{
    "name": "Áo Thun",
    "slug": "ao-thun",
    "description": "Các loại áo thun",
    "parentId": null
}
```

### Đăng Ký User Mới

- **Method:** POST
- **URL:** `http://localhost:5014/api/auth/register`
- **Body:**
```json
{
    "email": "user@example.com",
    "password": "user123",
    "fullName": "Nguyễn Văn A"
}
```

### Thêm Vào Giỏ Hàng (User)

- **Method:** POST
- **URL:** `http://localhost:5014/api/cart`
- **Headers:**
```
Authorization: Bearer {USER_TOKEN}
Content-Type: application/json
```
- **Body:**
```json
{
    "productId": 1,
    "quantity": 2
}
```

### Tạo Đơn Hàng (User)

- **Method:** POST
- **URL:** `http://localhost:5014/api/orders`
- **Headers:**
```
Authorization: Bearer {USER_TOKEN}
Content-Type: application/json
```
- **Body:**
```json
{
    "shippingAddress": "123 Đường Nguyễn Trãi, Quận 1, TP.HCM"
}
```

### Cập Nhật Trạng Thái Đơn Hàng (Admin)

- **Method:** PUT
- **URL:** `http://localhost:5014/api/admin/orders/1/status`
- **Headers:**
```
Authorization: Bearer {ADMIN_TOKEN}
Content-Type: application/json
```
- **Body:**
```json
{
    "newStatus": "Paid",
    "note": "Đã xác nhận thanh toán"
}
```

**Các trạng thái hợp lệ:**
- Pending → Paid, Cancelled
- Paid → Shipping, Cancelled
- Shipping → Completed

---

## 5. Quy Trình Test Đầy Đủ

1. ✅ **Đăng nhập Admin** → Lấy admin token
2. ✅ **Tạo category** → POST /api/categories
3. ✅ **Tạo sản phẩm** → POST /api/products
4. ✅ **Đăng ký user** → POST /api/auth/register
5. ✅ **Đăng nhập user** → Lấy user token
6. ✅ **Thêm vào giỏ** → POST /api/cart
7. ✅ **Tạo đơn hàng** → POST /api/orders
8. ✅ **Admin cập nhật trạng thái** → PUT /api/admin/orders/{id}/status
9. ✅ **Kiểm tra thông báo** → GET /api/notifications

---

## 6. Truy Cập Swagger UI

Ngoài Postman, bạn có thể test trực tiếp trên trình duyệt:

**http://localhost:5014/swagger**

Swagger UI cho phép:
- Xem tất cả API endpoints
- Test trực tiếp trên trình duyệt
- Tự động generate request body

