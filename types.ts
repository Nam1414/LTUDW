
export enum OrderStatus {
  PENDING = 0,    // Đang xét duyệt
  PACKING = 1,    // Đang đóng gói
  SHIPPING = 2,   // Đang vận chuyển
  DELIVERING = 3, // Đang giao
  COMPLETED = 4,  // Hoàn thành
  CANCELLED = 5,  // Đã hủy
  RETURNED = 6    // Đã hoàn hàng
}

export interface User {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  role: 'Customer' | 'Admin';
}

export interface ProductVariant {
  id: string;
  sku: string;
  color: string;
  size: string;
  priceModifier: number;
  quantity: number;
}

export interface Product {
  id: string;
  name: string;
  basePrice: number;
  description: string;
  category: string;
  images: string[];
  variants: ProductVariant[];
  rating: number;
  reviewsCount: number;
}

export interface CartItem {
  productId: string;
  variantId: string;
  quantity: number;
}

export interface Order {
  id: string;
  orderCode: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  createdAt: string;
  items: any[];
}
