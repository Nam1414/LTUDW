
import React from 'react';

export const COLORS = {
  primary: '#E3F2FD',
  accent: '#FFD1FF',
  dark: '#2C3E50',
  blueDark: '#90CAF9',
  pinkDark: '#F48FB1'
};

export const VOUCHERS = [
  {
    id: 1,
    code: 'KANTLOVE20',
    title: 'Giảm 20% cho bộ sưu tập Xuân Hè',
    desc: 'Áp dụng cho mọi đơn hàng từ 1.500.000đ. Không giới hạn số lượng sản phẩm.',
    expiry: '31/06/2024',
    type: 'percentage',
    value: 0.2,
    minOrder: 1500000,
    color: 'from-[#90CAF9] to-[#64B5F6]'
  },
  {
    id: 2,
    code: 'FREESHIPKANT',
    title: 'Miễn phí vận chuyển toàn quốc',
    desc: 'Áp dụng cho đơn hàng từ 500.000đ. Tối đa 50.000đ phí vận chuyển.',
    expiry: '30/12/2024',
    type: 'shipping',
    value: 35000,
    minOrder: 500000,
    color: 'from-[#F48FB1] to-[#F06292]'
  },
  {
    id: 3,
    code: 'NEWFRIEND15',
    title: 'Chào bạn mới - Giảm 15%',
    desc: 'Ưu đãi dành riêng cho khách hàng đăng ký tài khoản lần đầu tại KANT.',
    expiry: 'Vô thời hạn',
    type: 'percentage',
    value: 0.15,
    minOrder: 0,
    color: 'from-purple-300 to-indigo-400'
  }
];

export const MOCK_PRODUCTS: any[] = [
  {
    id: '1',
    productCode: 'BL',
    name: 'Áo Blazer KANT Pastel',
    basePrice: 1200000,
    discountPrice: 990000,
    description: 'Một thiết kế áo khoác thanh lịch với tông màu pastel hiện đại, phù hợp cho cả môi trường công sở sang trọng và những buổi dạo phố cuối tuần đầy phong cách. Chất liệu vải cao cấp mang lại cảm giác mềm mại và thoáng mát tuyệt đối.',
    category: 'Áo khoác',
    images: ['https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop', 'https://images.unsplash.com/photo-1548883354-94bcfe321cbb?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.8,
    reviewsCount: 120,
    variants: [
      { id: 'v1', sku: 'BLXS', color: 'Xanh', size: 'S', priceModifier: 0, quantity: 10 },
      { id: 'v2', sku: 'BLXM', color: 'Xanh', size: 'M', priceModifier: 50000, quantity: 5 },
      { id: 'v3', sku: 'BLHS', color: 'Hồng', size: 'S', priceModifier: 0, quantity: 8 }
    ]
  },
  {
    id: '2',
    productCode: 'TS',
    name: 'Áo thun KANT Signature',
    basePrice: 450000,
    discountPrice: 380000,
    description: 'Áo thun cotton hữu cơ cao cấp với logo KANT thêu tỉ mỉ bằng chỉ lụa. Sản phẩm là sự kết hợp hoàn hảo giữa tính ứng dụng cao và vẻ đẹp tinh tế của phong cách tối giản.',
    category: 'Áo thun',
    images: ['https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.5,
    reviewsCount: 85,
    variants: [
      { id: 'v4', sku: 'TSTM', color: 'Trắng', size: 'M', priceModifier: 0, quantity: 50 },
      { id: 'v5', sku: 'TSTL', color: 'Trắng', size: 'L', priceModifier: 0, quantity: 30 }
    ]
  },
  {
    id: '3',
    productCode: 'QT',
    name: 'Quần tây KANT Lưng Cao',
    basePrice: 850000,
    discountPrice: 720000,
    description: 'Quần tây với form dáng lưng cao giúp tôn vinh đường nét cơ thể. Chất liệu vải chống nhăn đặc biệt giúp bạn luôn giữ được vẻ ngoài chỉn chu suốt cả ngày dài năng động.',
    category: 'Quần',
    images: ['https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=1000&auto=format&fit=crop'],
    rating: 4.9,
    reviewsCount: 210,
    variants: [
      { id: 'v6', sku: 'QTX28', color: 'Xám', size: '28', priceModifier: 0, quantity: 15 },
      { id: 'v7', sku: 'QTX30', color: 'Xám', size: '30', priceModifier: 0, quantity: 12 }
    ]
  }
];
