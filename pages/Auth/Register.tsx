
import React, { useState } from 'react';
import Button from '../../components/Common/Button';
import Logo from '../../components/Common/Logo';
import { Mail, User, Lock, Calendar, Phone } from 'lucide-react';

interface RegisterProps {
  onNavigate: (page: string) => void;
  onRegisterSubmit: (userData: any) => void;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, onRegisterSubmit }) => {
  const [formData, setFormData] = useState({
    contact: '',
    username: '',
    dob: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Mật khẩu nhập lại không khớp!");
      return;
    }
    // Chuyển sang bước nhận mã OTP
    onRegisterSubmit(formData);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-lg bg-white/60 backdrop-blur-xl p-10 rounded-[40px] border border-white/40 shadow-2xl space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <h2 className="text-2xl font-black font-montserrat uppercase tracking-tight mt-4">Gia nhập đại gia đình KANT</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email hoặc Số điện thoại</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
              <input 
                type="text" 
                required
                placeholder="example@gmail.com"
                className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                value={formData.contact}
                onChange={(e) => setFormData({...formData, contact: e.target.value})}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Tên đăng nhập</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
                <input 
                  type="text" 
                  required
                  placeholder="kant_fan"
                  className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Ngày sinh</label>
              <div className="relative">
                <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
                <input 
                  type="date" 
                  required
                  className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                  value={formData.dob}
                  onChange={(e) => setFormData({...formData, dob: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                  value={formData.password}
                  onChange={(e) => setFormData({...formData, password: e.target.value})}
                />
              </div>
            </div>
            <div className="space-y-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Nhập lại mật khẩu</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
                <input 
                  type="password" 
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({...formData, confirmPassword: e.target.value})}
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
            <Button className="w-full !py-4 text-sm font-black uppercase tracking-[0.2em] shadow-blue-100">
              Đăng ký tài khoản
            </Button>
          </div>
        </form>

        <div className="text-center pt-4 border-t border-white/20">
          <p className="text-sm text-gray-500 font-medium">Đã có tài khoản KANT?</p>
          <button 
            onClick={() => onNavigate('login')}
            className="mt-2 text-[#90CAF9] font-black uppercase text-xs tracking-widest hover:underline"
          >
            Đăng nhập ngay
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
