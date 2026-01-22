
import React, { useState } from 'react';
import { OrderStatus } from '../types';
import { Package, Clock, CheckCircle, Truck, XCircle, Undo2, Box, ChevronRight, Hash, Calendar, CreditCard, X, List, Info, ShoppingBag, Sparkles } from 'lucide-react';
import Button from '../components/Common/Button';

interface MyOrdersProps {
  onNavigateSupport?: () => void;
  onNavigateProducts?: () => void;
  onReview?: (order: any) => void;
}

const MyOrders: React.FC<MyOrdersProps> = ({ onNavigateSupport, onNavigateProducts, onReview }) => {
  const [selectedOrder, setSelectedOrder] = useState<any>(null);

  const statusConfig = [
    { label: 'Đang xét duyệt', icon: Clock, color: 'bg-orange-400', textColor: 'text-orange-500' },
    { label: 'Đang đóng gói', icon: Box, color: 'bg-blue-400', textColor: 'text-blue-500' },
    { label: 'Đang vận chuyển', icon: Truck, color: 'bg-purple-400', textColor: 'text-purple-500' },
    { label: 'Đang giao', icon: Package, color: 'bg-indigo-400', textColor: 'text-indigo-500' },
    { label: 'Hoàn thành', icon: CheckCircle, color: 'bg-green-400', textColor: 'text-green-500' },
    { label: 'Đã hủy', icon: XCircle, color: 'bg-red-400', textColor: 'text-red-500' },
    { label: 'Đã hoàn hàng', icon: Undo2, color: 'bg-gray-400', textColor: 'text-gray-500' },
  ];

  // Khởi tạo danh sách đơn hàng mẫu (Mặc định trống như yêu cầu trước đó)
  // Để demo nút đánh giá, ta thêm một đơn hàng đã hoàn thành
  const [orders, setOrders] = useState<any[]>([
    { 
      code: 'KANT777', 
      status: OrderStatus.COMPLETED, 
      date: '20/05/2024', 
      total: '2.150.000đ',
      items: [
        { name: 'Áo Blazer KANT Pastel', sku: 'BLXS', price: '1.200.000đ', qty: 1, color: 'Xanh', size: 'S' },
        { name: 'Quần tây KANT Lưng Cao', sku: 'QTX30', price: '950.000đ', qty: 1, color: 'Xám', size: '30' }
      ]
    }
  ]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-14 h-14 rounded-3xl kant-gradient flex items-center justify-center text-white shadow-xl">
          <Package className="w-7 h-7" />
        </div>
        <div>
          <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight">Đơn hàng của tôi</h1>
          <p className="text-gray-500 font-merriweather italic text-sm">Theo dõi trạng thái và lịch sử mua sắm tại KANT</p>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white/40 border-2 border-dashed border-[#90CAF9]/30 rounded-[60px] p-16 md:p-24 text-center space-y-8 animate-in fade-in zoom-in duration-700 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <Sparkles className="w-32 h-32 text-[#90CAF9]" />
          </div>
          <div className="w-28 h-28 rounded-[40px] bg-white flex items-center justify-center text-[#90CAF9] mx-auto shadow-xl border border-[#90CAF9]/10 relative z-10">
            <ShoppingBag className="w-12 h-12" />
          </div>
          <div className="space-y-4 relative z-10">
            <h2 className="text-2xl font-black font-montserrat uppercase tracking-tight text-[#2C3E50]">Bạn chưa có đơn hàng nào</h2>
            <p className="text-gray-500 font-merriweather italic text-lg max-w-lg mx-auto leading-relaxed">
              Hiện bạn chưa có đơn hàng nào, cùng xem qua các sản phẩm của KANT nhé!
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
            <Button onClick={onNavigateProducts} className="!px-12 !py-4 font-black uppercase tracking-widest text-sm">Đến cửa hàng ngay</Button>
            <Button type="ghost" onClick={onNavigateSupport} className="!px-12 !py-4 font-black uppercase tracking-widest text-sm text-[#F48FB1]">Cần hỗ trợ?</Button>
          </div>
        </div>
      ) : (
        <div className="space-y-8">
          {orders.map((order) => (
            <div key={order.code} className="bg-white/40 rounded-[50px] border border-white/30 shadow-xl overflow-hidden hover:shadow-2xl transition-all group">
              <div className="p-8 md:p-10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                  <div className="space-y-2">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl font-black font-playfair uppercase">#{order.code}</span>
                      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-white shadow-sm ${statusConfig[order.status].color}`}>
                        {statusConfig[order.status].label}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-gray-400 font-montserrat font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5" /> {order.date}</span>
                      <span className="flex items-center gap-1.5"><CreditCard className="w-3.5 h-3.5" /> {order.total}</span>
                    </div>
                  </div>
                  <button onClick={() => setSelectedOrder(order)} className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#90CAF9] hover:gap-4 transition-all">
                    Chi tiết đơn hàng <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Tracker Tracker UI code same as before... */}
                <div className="relative pt-4 pb-8">
                  <div className="absolute top-10 left-8 right-8 h-1 bg-gray-100 rounded-full hidden md:block z-0"></div>
                  <div className="grid grid-cols-2 md:grid-cols-7 gap-6 relative z-10">
                    {statusConfig.map((s, idx) => {
                      const isActive = idx === order.status;
                      const isPassed = order.status < 5 ? (idx < order.status) : false;
                      let circleColor = 'bg-gray-100 text-gray-300';
                      let labelColor = 'text-gray-300';
                      if (isActive) {
                        circleColor = `${s.color} text-white scale-125 shadow-xl ring-4 ring-white`;
                        labelColor = s.textColor;
                      } else if (isPassed) {
                        circleColor = 'bg-[#90CAF9] text-white';
                        labelColor = 'text-[#2C3E50]';
                      }
                      return (
                        <div key={idx} className="flex flex-col items-center text-center">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all duration-500 ${circleColor}`}><s.icon className="w-6 h-6" /></div>
                          <span className={`mt-5 text-[9px] font-black uppercase tracking-tighter font-montserrat leading-tight max-w-[80px] ${labelColor}`}>{s.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="mt-6 pt-6 border-t border-white/20 flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-xl bg-white/60 border border-white/40 flex items-center justify-center"><Hash className="w-5 h-5 text-[#90CAF9]" /></div>
                      <p className="text-sm font-bold font-montserrat text-gray-500 uppercase truncate max-w-md">Sản phẩm: <span className="text-[#2C3E50]">{order.items.map((i: any) => i.name).join(', ')}</span></p>
                   </div>
                   {order.status === OrderStatus.COMPLETED && (
                      <button 
                        onClick={() => onReview?.(order)}
                        className="bg-[#FFD1FF] text-[#2C3E50] px-8 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#F48FB1] hover:text-white transition-all shadow-md active:scale-95"
                      >
                         Đánh giá ngay
                      </button>
                   )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-16 text-center">
         <p className="text-gray-400 font-merriweather italic text-sm mb-6">Bạn cần hỗ trợ về đơn hàng?</p>
         <button onClick={onNavigateSupport} className="bg-white/60 border border-[#90CAF9]/30 text-[#90CAF9] px-10 py-4 rounded-[20px] font-black uppercase text-xs tracking-[0.2em] hover:bg-[#90CAF9] hover:text-white transition-all shadow-sm">
            Liên hệ chăm sóc khách hàng
         </button>
      </div>

      {/* Order Details Modal (Same as previous implementation) */}
      {selectedOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-2xl rounded-[50px] p-10 shadow-2xl relative animate-in zoom-in duration-300 max-h-[90vh] overflow-y-auto">
            <button onClick={() => setSelectedOrder(null)} className="absolute top-8 right-8 p-3 bg-gray-50 rounded-full hover:bg-red-50 hover:text-red-500 transition-all"><X className="w-6 h-6" /></button>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-14 h-14 rounded-3xl kant-gradient flex items-center justify-center text-white shadow-xl"><List className="w-7 h-7" /></div>
              <div><h2 className="text-3xl font-black font-montserrat uppercase tracking-tight">Chi tiết đơn hàng</h2><p className="text-[#90CAF9] font-black uppercase text-[10px] tracking-[0.3em]">Mã đơn: {selectedOrder.code}</p></div>
            </div>
            <div className="space-y-8">
              <div className="bg-gray-50/50 p-6 rounded-[30px] border border-gray-100 space-y-4">
                <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 border-b border-gray-200 pb-2">Danh sách sản phẩm</h3>
                {selectedOrder.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-white">
                    <div>
                      <p className="font-bold text-[#2C3E50]">{item.name}</p>
                      <div className="flex gap-4 mt-1">
                        <span className="text-[10px] font-black uppercase text-gray-400">SKU: <span className="text-[#90CAF9]">{item.sku}</span></span>
                        <span className="text-[10px] font-black uppercase text-gray-400">Phân loại: <span className="text-[#F48FB1]">{item.color} / {item.size}</span></span>
                      </div>
                    </div>
                    <div className="text-right"><p className="font-black font-playfair">{item.price}</p><p className="text-[10px] font-bold text-gray-400">Số lượng: x{item.qty}</p></div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="p-6 bg-blue-50/30 rounded-[30px] border border-blue-100/50">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-[#90CAF9] mb-3">Thông tin thanh toán</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-gray-500 font-medium">Tạm tính:</span><span className="font-bold">{selectedOrder.total}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-gray-500 font-medium">Phí vận chuyển:</span><span className="font-bold">35.000đ</span></div>
                    <div className="h-[1px] bg-blue-100 my-2"></div>
                    <div className="flex justify-between items-baseline"><span className="text-[10px] font-black uppercase">Tổng cộng:</span><span className="text-xl font-black font-playfair">{selectedOrder.total}</span></div>
                  </div>
                </div>
                <div className="p-6 bg-pink-50/30 rounded-[30px] border border-pink-100/50 flex flex-col justify-center">
                  <div className="flex items-center gap-2 mb-2"><Info className="w-4 h-4 text-[#F48FB1]" /><span className="text-[10px] font-black uppercase tracking-widest text-[#F48FB1]">Trạng thái hiện tại</span></div>
                  <p className="text-2xl font-black font-montserrat uppercase leading-tight">{statusConfig[selectedOrder.status].label}</p>
                </div>
              </div>
            </div>
            <div className="mt-10 flex justify-center"><Button onClick={() => setSelectedOrder(null)} className="!px-16 uppercase tracking-widest text-xs font-black">Đóng chi tiết</Button></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyOrders;
