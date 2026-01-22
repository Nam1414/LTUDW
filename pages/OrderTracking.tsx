
import React, { useState } from 'react';
import { Search, Package, Clock, CheckCircle, Truck, XCircle, Undo2, Box } from 'lucide-react';

const OrderTracking: React.FC = () => {
  const [searchCode, setSearchCode] = useState('');

  const statuses = [
    { label: 'Đang xét duyệt', icon: Clock, color: 'bg-orange-500' },
    { label: 'Đang đóng gói', icon: Box, color: 'bg-blue-400' },
    { label: 'Đang vận chuyển', icon: Truck, color: 'bg-purple-500' },
    { label: 'Đang giao', icon: Package, color: 'bg-indigo-500' },
    { label: 'Hoàn thành', icon: CheckCircle, color: 'bg-green-500' },
    { label: 'Đã hủy', icon: XCircle, color: 'bg-red-500' },
    { label: 'Đã hoàn hàng', icon: Undo2, color: 'bg-gray-500' },
  ];

  const mockOrders = [
    { code: 'KANT001', statusIdx: 0, date: '24/05/2024', total: '1.200.000đ' },
    { code: 'KANT002', statusIdx: 4, date: '20/05/2024', total: '450.000đ' },
    { code: 'KANT003', statusIdx: 2, date: '22/05/2024', total: '850.000đ' },
  ];

  const filteredOrders = searchCode 
    ? mockOrders.filter(o => o.code.toLowerCase().includes(searchCode.toLowerCase()))
    : mockOrders;

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight mb-4">Tra cứu đơn hàng</h1>
        <p className="text-gray-500 font-merriweather italic">Theo dõi hành trình đơn hàng KANT của bạn</p>
      </div>

      <div className="max-w-xl mx-auto mb-16">
        <div className="relative">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input 
            type="text" 
            placeholder="Nhập mã đơn hàng (Ví dụ: KANT001)..." 
            className="w-full pl-14 pr-6 py-5 rounded-full bg-white border border-white/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#90CAF9] font-montserrat"
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-8">
        {filteredOrders.map((order) => (
          <div key={order.code} className="bg-white/40 p-8 rounded-[40px] border border-white/30 shadow-lg">
            <div className="flex flex-col md:flex-row justify-between mb-10 gap-4">
              <div>
                <h3 className="text-2xl font-black font-playfair mb-1">Đơn hàng: {order.code}</h3>
                <p className="text-sm text-gray-500 font-fredoka uppercase tracking-widest">Ngày đặt: {order.date} • Tổng cộng: {order.total}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white ${statuses[order.statusIdx].color}`}>
                  {statuses[order.statusIdx].label}
                </span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="relative px-2">
              <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -translate-y-1/2 z-0 hidden md:block"></div>
              <div className="grid grid-cols-2 md:grid-cols-7 gap-4 relative z-10">
                {statuses.map((s, idx) => {
                  const isActive = idx === order.statusIdx;
                  const isCompleted = idx < order.statusIdx && order.statusIdx < 5; // Simplified logic for normal flow
                  const StatusIcon = s.icon;
                  
                  // Handle cancelled/returned separately in UI logic if needed
                  let displayColor = idx <= order.statusIdx ? s.color : 'bg-gray-200';
                  if (order.statusIdx >= 5 && idx >= 5 && idx !== order.statusIdx) displayColor = 'bg-gray-200';
                  if (order.statusIdx >= 5 && idx < 5) displayColor = 'bg-gray-300'; // Past stages for cancelled

                  return (
                    <div key={idx} className="flex flex-col items-center text-center">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-all duration-500 ${displayColor} ${isActive ? 'scale-125 shadow-xl ring-4 ring-white' : ''}`}>
                        <StatusIcon className="w-6 h-6" />
                      </div>
                      <span className={`mt-4 text-[10px] font-black uppercase tracking-tighter font-montserrat leading-tight ${isActive ? 'text-[#2C3E50]' : 'text-gray-400'}`}>
                        {s.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        ))}
        {filteredOrders.length === 0 && (
          <div className="text-center py-20 bg-white/20 rounded-[40px] border border-dashed border-gray-300">
            <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="font-merriweather italic text-gray-500">Không tìm thấy đơn hàng nào khớp với mã bạn nhập.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderTracking;
