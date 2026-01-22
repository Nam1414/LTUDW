
import React, { useState } from 'react';
import Button from '../components/Common/Button';
import { User, Mail, Phone, Lock, LogOut, ShieldCheck, Camera, Calendar } from 'lucide-react';

interface AccountSettingsProps {
  onLogout: () => void;
  userProfile?: any;
}

const AccountSettings: React.FC<AccountSettingsProps> = ({ onLogout, userProfile }) => {
  const [formData, setFormData] = useState({
    fullName: userProfile?.fullName || 'Admin KANT',
    email: userProfile?.email || 'admin@kant.vn',
    phone: userProfile?.phone || '0901234567',
    dateOfBirth: userProfile?.dob || '1995-10-25', 
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [isUpdating, setIsUpdating] = useState(false);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setIsUpdating(true);
    setTimeout(() => {
      alert('Cập nhật thông tin thành công!');
      setIsUpdating(false);
    }, 1000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="flex items-center gap-4 mb-10">
        <div className="w-12 h-12 rounded-2xl kant-gradient flex items-center justify-center text-white shadow-lg">
          <ShieldCheck className="w-6 h-6" />
        </div>
        <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight">Cài đặt tài khoản</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 space-y-6">
          <div className="bg-white/40 border border-white/30 p-8 rounded-[40px] text-center space-y-4">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-full bg-gradient-to-tr from-[#90CAF9] to-[#F48FB1] flex items-center justify-center text-white text-4xl font-bold shadow-xl border-4 border-white">
                {formData.fullName.charAt(0)}
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-white rounded-full shadow-lg border border-gray-100 text-[#90CAF9] hover:bg-[#90CAF9] hover:text-white transition-all">
                <Camera className="w-4 h-4" />
              </button>
            </div>
            <div>
              <h2 className="font-bold text-xl font-montserrat uppercase">{formData.fullName}</h2>
              <p className="text-gray-400 text-xs font-fredoka uppercase tracking-widest mt-1">Thành viên ưu tú</p>
            </div>
            <div className="pt-4">
              <button 
                onClick={onLogout}
                className="flex items-center justify-center gap-2 w-full py-3 rounded-2xl border-2 border-[#F48FB1] text-[#F48FB1] font-bold font-baloo hover:bg-[#F48FB1] hover:text-white transition-all uppercase text-sm tracking-widest"
              >
                <LogOut className="w-4 h-4" /> Đăng xuất
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 space-y-6">
          <form onSubmit={handleUpdate} className="bg-white/40 border border-white/30 p-8 rounded-[40px] space-y-6">
            <h3 className="text-xl font-black font-montserrat uppercase tracking-tight border-b border-white/20 pb-4">Thông tin cá nhân</h3>
            
            <div className="space-y-4 font-montserrat">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Họ và tên</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="text" 
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Email</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="email" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Số điện thoại</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm" 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Ngày sinh (Cố định - Không thể chỉnh sửa)</label>
                <div className="relative">
                  <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                  <input 
                    type="date" 
                    readOnly
                    value={formData.dateOfBirth}
                    className="w-full pl-12 pr-4 py-3 bg-gray-100/50 rounded-2xl border border-white/10 text-gray-400 font-montserrat text-sm cursor-not-allowed" 
                  />
                </div>
                <p className="text-[10px] text-[#F48FB1] italic font-medium ml-1">Thông tin ngày sinh được xác thực từ lúc đăng ký và không thể thay đổi.</p>
              </div>
            </div>

            <div className="pt-4">
              <Button disabled={isUpdating} className="w-full sm:w-auto !px-12 !font-montserrat uppercase text-sm tracking-widest">
                {isUpdating ? 'Đang lưu...' : 'Lưu thông tin'}
              </Button>
            </div>
          </form>

          <form onSubmit={handleUpdate} className="bg-white/40 border border-white/30 p-8 rounded-[40px] space-y-6">
            <h3 className="text-xl font-black font-montserrat uppercase tracking-tight border-b border-white/20 pb-4">Đổi mật khẩu</h3>
            
            <div className="space-y-4 font-montserrat">
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mật khẩu hiện tại</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    value={formData.oldPassword}
                    onChange={(e) => setFormData({...formData, oldPassword: e.target.value})}
                    className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50" 
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Mật khẩu mới</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.newPassword}
                      onChange={(e) => setFormData({...formData, newPassword: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50" 
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-widest ml-1">Xác nhận mật khẩu</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input 
                      type="password" 
                      placeholder="••••••••"
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                      className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50" 
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4">
              <Button type="secondary" disabled={isUpdating} className="w-full sm:w-auto !px-12 !font-montserrat uppercase text-sm tracking-widest !bg-white">
                {isUpdating ? 'Đang cập nhật...' : 'Cập nhật mật khẩu'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSettings;
