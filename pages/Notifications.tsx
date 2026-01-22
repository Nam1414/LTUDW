
import React from 'react';
import { Bell, Package, Tag, Info, ChevronRight, AlertCircle, ShoppingCart } from 'lucide-react';

interface NotificationsProps {
  onNavigate: (page: string) => void;
  isAdmin?: boolean;
}

const Notifications: React.FC<NotificationsProps> = ({ onNavigate, isAdmin = false }) => {
  // Danh sách thông báo cơ sở
  const commonNotifs = [
    {
      id: 1,
      title: 'Đơn hàng #KANT001 đã được xác nhận',
      desc: 'Đơn hàng của bạn đang được chuẩn bị và sẽ sớm được bàn giao cho đơn vị vận chuyển.',
      time: '2 giờ trước',
      type: 'order',
      target: 'my-orders',
      icon: Package,
      color: 'blue'
    },
    {
      id: 2,
      title: 'Mã giảm giá 20% dành riêng cho bạn',
      desc: 'Sử dụng mã KANTLOVE20 để nhận ưu đãi cho bộ sưu tập Xuân Hè mới nhất.',
      time: '5 giờ trước',
      type: 'promo',
      target: 'promotions',
      icon: Tag,
      color: 'pink'
    },
    {
      id: 3,
      title: 'Cập nhật chính sách bảo mật',
      desc: 'KANT vừa cập nhật điều khoản bảo mật để bảo vệ thông tin cá nhân của bạn tốt hơn.',
      time: '1 ngày trước',
      type: 'info',
      target: 'privacy-policy',
      icon: Info,
      color: 'gray'
    }
  ];

  // Thông báo dành riêng cho Admin
  const adminNotifs = [
    {
      id: 101,
      title: 'Đơn hàng mới #KANT888 cần duyệt',
      desc: 'Khách hàng Lê Minh Hùng vừa đặt một đơn hàng mới. Vui lòng kiểm tra và xác nhận.',
      time: 'Vừa xong',
      type: 'admin-action',
      target: 'admin',
      icon: AlertCircle,
      color: 'orange'
    },
    {
      id: 102,
      title: 'Báo cáo doanh thu tuần đã sẵn sàng',
      desc: 'Doanh thu tuần này tăng 15% so với tuần trước. Xem chi tiết tại bảng điều khiển.',
      time: '1 giờ trước',
      type: 'admin-info',
      target: 'admin',
      icon: ShoppingCart,
      color: 'indigo'
    }
  ];

  const currentNotifs = isAdmin ? [...adminNotifs, ...commonNotifs] : commonNotifs;

  return (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-3xl kant-gradient flex items-center justify-center text-white shadow-xl">
          <Bell className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight">Thông báo của bạn</h1>
          <p className="text-gray-500 font-merriweather italic text-sm mt-1">Cập nhật những tin tức mới nhất từ KANT Fashion</p>
        </div>
      </div>

      <div className="space-y-6">
        {currentNotifs.map((n) => (
          <div 
            key={n.id} 
            onClick={() => onNavigate(n.target)}
            className="bg-white/50 backdrop-blur-sm border border-white/40 p-8 rounded-[40px] flex items-center gap-8 hover:shadow-2xl hover:scale-[1.02] transition-all cursor-pointer group relative overflow-hidden"
          >
            {/* Indicator cho thông báo Admin */}
            {n.type.startsWith('admin') && (
               <div className="absolute top-0 right-0 p-4">
                  <span className="bg-[#90CAF9] text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-sm tracking-widest">Quản trị</span>
               </div>
            )}

            <div className={`w-16 h-16 rounded-[24px] flex items-center justify-center shadow-inner transition-transform group-hover:rotate-12 ${
              n.color === 'blue' ? 'bg-blue-50 text-blue-500' : 
              n.color === 'pink' ? 'bg-pink-50 text-pink-500' : 
              n.color === 'orange' ? 'bg-orange-50 text-orange-500' :
              n.color === 'indigo' ? 'bg-indigo-50 text-indigo-500' :
              'bg-gray-50 text-gray-500'
            }`}>
              <n.icon className="w-8 h-8" />
            </div>

            <div className="flex-1 space-y-1">
              <h3 className="font-black text-xl font-montserrat tracking-tight text-[#2C3E50] group-hover:text-[#90CAF9] transition-colors">{n.title}</h3>
              <p className="text-gray-500 text-sm font-merriweather italic leading-relaxed">{n.desc}</p>
              <div className="flex items-center gap-4 mt-3">
                 <span className="text-[10px] text-gray-400 font-black uppercase tracking-[0.2em]">{n.time}</span>
                 <span className="h-[2px] w-4 bg-gray-100 rounded-full"></span>
                 <span className="text-[10px] text-[#90CAF9] font-black uppercase tracking-[0.2em]">Bấm để xem chi tiết</span>
              </div>
            </div>

            <div className="w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-sm text-gray-300 group-hover:bg-[#90CAF9] group-hover:text-white transition-all">
               <ChevronRight className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>

      {currentNotifs.length === 0 && (
        <div className="text-center py-32 bg-white/20 rounded-[60px] border border-dashed border-gray-300">
           <Bell className="w-20 h-20 text-gray-200 mx-auto mb-6" />
           <p className="text-xl font-black font-montserrat uppercase text-gray-300 tracking-widest">Bạn chưa có thông báo nào</p>
        </div>
      )}
    </div>
  );
};

export default Notifications;
