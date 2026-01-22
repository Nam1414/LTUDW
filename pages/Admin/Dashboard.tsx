
import React, { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { LayoutDashboard, Package, ShoppingCart, Users, TrendingUp, DollarSign, Clock, CheckCircle, Truck, XCircle, Plus, Edit3, Send, Star } from 'lucide-react';
import { OrderStatus } from '../../types';
import Button from '../../components/Common/Button';

interface AdminDashboardProps {
  onNavigate?: (page: string) => void;
}

const data = [
  { name: 'T2', sales: 4000, orders: 24 },
  { name: 'T3', sales: 3000, orders: 18 },
  { name: 'T4', sales: 2000, orders: 12 },
  { name: 'T5', sales: 2780, orders: 20 },
  { name: 'T6', sales: 1890, orders: 15 },
  { name: 'T7', sales: 2390, orders: 22 },
  { name: 'CN', sales: 3490, orders: 30 },
];

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onNavigate }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [orders, setOrders] = useState([
    { id: '#KANT001', customer: 'Lê Minh Hùng', date: '24/05/2024', amount: '1.200.000đ', status: OrderStatus.PENDING },
    { id: '#KANT002', customer: 'Nguyễn Thảo Vy', date: '23/05/2024', amount: '850.000đ', status: OrderStatus.PACKING },
    { id: '#KANT003', customer: 'Trần Đại Nghĩa', date: '23/05/2024', amount: '2.100.000đ', status: OrderStatus.SHIPPING },
    { id: '#KANT004', customer: 'Phạm Kim Liên', date: '22/05/2024', amount: '450.000đ', status: OrderStatus.COMPLETED },
    { id: '#KANT005', customer: 'Bùi Gia Bảo', date: '22/05/2024', amount: '1.500.000đ', status: OrderStatus.CANCELLED },
  ]);

  const updateStatus = (id: string, newStatus: OrderStatus) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status: newStatus } : o));
    console.log(`Đã cập nhật trạng thái đơn ${id} thành ${newStatus}. Log OrderStatusHistory: OK`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-5xl font-black font-playfair mb-2">Quản trị hệ thống KANT</h1>
          <p className="text-gray-500 font-merriweather italic text-sm">Chào mừng bạn trở lại, Admin. Hãy quản lý hoạt động kinh doanh của ngày hôm nay.</p>
        </div>
        <div className="flex flex-wrap gap-4">
          <button 
            onClick={() => onNavigate?.('admin-reviews')}
            className="flex items-center gap-2 px-6 py-3 bg-[#FFD1FF] text-[#2C3E50] rounded-2xl font-bold font-montserrat text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-md"
          >
            <Star className="w-4 h-4" /> QUẢN LÝ ĐÁNH GIÁ
          </button>
          <Button 
            className="flex items-center gap-2 !px-6 shadow-xl"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="w-5 h-5" /> THÊM SẢN PHẨM
          </Button>
          <span className="px-5 py-2.5 bg-white rounded-2xl border border-gray-100 text-xs font-bold flex items-center gap-2 shadow-sm">
            <Clock className="w-4 h-4 text-[#90CAF9]" /> Cập nhật lúc: 15:45
          </span>
        </div>
      </div>

      {/* Grid thống kê */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Doanh thu tháng', value: '128.500.000đ', trend: '+12.5%', icon: DollarSign, color: 'blue' },
          { label: 'Tổng đơn hàng', value: '482', trend: '+5.2%', icon: ShoppingCart, color: 'pink' },
          { label: 'Khách hàng mới', value: '1,240', trend: '+2.1%', icon: Users, color: 'purple' },
          { label: 'Tỉ lệ chuyển đổi', value: '3.8%', trend: '-0.5%', icon: TrendingUp, color: 'orange' }
        ].map((stat, i) => (
          <div key={i} className="bg-white/60 p-8 rounded-[35px] border border-white/40 shadow-xl shadow-blue-50/50">
            <div className="flex justify-between items-start mb-6">
              <div className={`p-4 bg-${stat.color}-50 text-${stat.color}-500 rounded-[20px] shadow-inner`}>
                <stat.icon className="w-7 h-7" />
              </div>
              <span className={`${stat.trend.startsWith('+') ? 'text-green-500' : 'text-red-400'} text-sm font-black font-fredoka`}>{stat.trend}</span>
            </div>
            <p className="text-gray-400 font-bold text-xs uppercase tracking-widest mb-2 font-montserrat">{stat.label}</p>
            <h3 className="text-2xl font-black font-montserrat">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Biểu đồ */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white/60 p-10 rounded-[45px] border border-white/40 shadow-xl">
          <h3 className="font-bold text-2xl mb-10 font-playfair">Doanh thu tuần này</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#90CAF9" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#90CAF9" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                <Area type="monotone" dataKey="sales" stroke="#90CAF9" fillOpacity={1} fill="url(#colorSales)" strokeWidth={4} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white/60 p-10 rounded-[45px] border border-white/40 shadow-xl">
          <h3 className="font-bold text-2xl mb-10 font-playfair">Đơn đặt hàng</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fontWeight: 700}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12}} />
                <Tooltip contentStyle={{borderRadius: '15px', border: 'none', boxShadow: '0 10px 30px rgba(0,0,0,0.1)'}} />
                <Bar dataKey="orders" fill="#F48FB1" radius={[12, 12, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Đơn hàng gần đây */}
      <div className="bg-white/60 p-10 rounded-[45px] border border-white/40 shadow-2xl">
        <div className="flex justify-between items-center mb-10">
          <h3 className="font-bold text-2xl font-playfair">Quản lý đơn hàng mới nhất</h3>
          <button className="text-[#90CAF9] font-black text-sm uppercase tracking-widest hover:underline font-montserrat">Xuất báo cáo dữ liệu</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-gray-400 text-xs font-black uppercase tracking-[0.2em] border-b border-gray-100 font-montserrat">
                <th className="pb-6">Mã đơn</th>
                <th className="pb-6">Tên khách hàng</th>
                <th className="pb-6">Ngày đặt</th>
                <th className="pb-6 text-right">Tổng giá trị</th>
                <th className="pb-6 text-center">Trạng thái</th>
                <th className="pb-6 text-right">Thao tác Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 font-montserrat">
              {orders.map((order) => (
                <tr key={order.id} className="group hover:bg-white/50 transition-all duration-300">
                  <td className="py-6 font-black font-playfair text-lg">{order.id}</td>
                  <td className="py-6 font-bold">{order.customer}</td>
                  <td className="py-6 text-gray-500 text-sm font-merriweather italic">{order.date}</td>
                  <td className="py-6 font-black text-right">{order.amount}</td>
                  <td className="py-6 text-center">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-[0.1em] font-fredoka ${
                      order.status === OrderStatus.PENDING ? 'bg-orange-50 text-orange-500 border border-orange-100' :
                      order.status === OrderStatus.PACKING ? 'bg-blue-50 text-blue-500 border border-blue-100' :
                      order.status === OrderStatus.SHIPPING ? 'bg-purple-50 text-purple-500 border border-purple-100' :
                      order.status === OrderStatus.COMPLETED ? 'bg-green-50 text-green-500 border border-green-100' :
                      'bg-red-50 text-red-500 border border-red-100'
                    }`}>
                      {order.status === OrderStatus.PENDING ? 'Chờ duyệt' :
                       order.status === OrderStatus.PACKING ? 'Đang gói' :
                       order.status === OrderStatus.SHIPPING ? 'Đang giao' :
                       order.status === OrderStatus.COMPLETED ? 'Thành công' :
                       'Đã hủy'}
                    </span>
                  </td>
                  <td className="py-6 text-right">
                    <div className="flex gap-2 justify-end">
                      {order.status === OrderStatus.PENDING && (
                        <button 
                          onClick={() => updateStatus(order.id, OrderStatus.PACKING)}
                          title="Duyệt đơn"
                          className="p-3 bg-blue-50 text-blue-500 rounded-2xl hover:bg-blue-500 hover:text-white transition-all shadow-sm"
                        >
                          <CheckCircle className="w-4 h-4" />
                        </button>
                      )}
                      {order.status === OrderStatus.PACKING && (
                        <button 
                          onClick={() => updateStatus(order.id, OrderStatus.SHIPPING)}
                          title="Giao hàng"
                          className="p-3 bg-purple-50 text-purple-500 rounded-2xl hover:bg-purple-500 hover:text-white transition-all shadow-sm"
                        >
                          <Truck className="w-4 h-4" />
                        </button>
                      )}
                      {(order.status === OrderStatus.PENDING || order.status === OrderStatus.PACKING) && (
                        <button 
                          onClick={() => updateStatus(order.id, OrderStatus.CANCELLED)}
                          title="Hủy đơn"
                          className="p-3 bg-red-50 text-red-500 rounded-2xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      )}
                      <button className="p-3 bg-gray-50 text-gray-500 rounded-2xl hover:bg-gray-200 transition-all shadow-sm">
                        <Edit3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Mock Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
          <div className="bg-white w-full max-w-lg rounded-[40px] p-10 shadow-2xl animate-in zoom-in duration-300">
            <h2 className="text-3xl font-black font-montserrat uppercase mb-6 tracking-tight">Thêm sản phẩm mới</h2>
            <div className="space-y-4 font-montserrat">
              <input type="text" placeholder="Tên sản phẩm" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none" />
              <div className="grid grid-cols-2 gap-4">
                <input type="number" placeholder="Giá gốc" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none" />
                <select className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none">
                  <option>Chọn danh mục</option>
                  <option>Áo khoác</option>
                  <option>Áo thun</option>
                  <option>Quần</option>
                </select>
              </div>
              <textarea placeholder="Mô tả sản phẩm" className="w-full px-6 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none h-32" />
            </div>
            <div className="flex gap-4 mt-8">
              <Button className="flex-1" onClick={() => setShowAddModal(false)}>LƯU SẢN PHẨM</Button>
              <Button type="outline" className="flex-1" onClick={() => setShowAddModal(false)}>HỦY BỎ</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
