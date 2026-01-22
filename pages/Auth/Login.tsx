
import React, { useState } from 'react';
import Button from '../../components/Common/Button';
import Logo from '../../components/Common/Logo';
import { User, Lock, ArrowRight, Info } from 'lucide-react';

interface LoginProps {
  onNavigate: (page: string) => void;
  onLogin: (user: any) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Logic kiểm tra tài khoản mặc định
    if (username === 'admin@kant.vn' && password === 'admin123') {
      onLogin({
        id: 'admin-01',
        fullName: 'Admin KANT',
        email: 'admin@kant.vn',
        role: 'Admin',
        phone: '0901234567'
      });
    } else if (username === 'user@kant.vn' && password === 'user123') {
      onLogin({
        id: 'user-01',
        fullName: 'Nguyễn Văn Người Dùng',
        email: 'user@kant.vn',
        role: 'Customer',
        phone: '0908889999'
      });
    } else {
      setError('Email hoặc mật khẩu không chính xác!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl p-10 rounded-[40px] border border-white/40 shadow-2xl space-y-8">
        <div className="text-center">
          <Logo size="lg" />
          <p className="text-gray-500 font-merriweather italic text-sm mt-4">Chào mừng bạn trở lại với không gian Pastel</p>
        </div>

        {/* Thông báo tài khoản test */}
        <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl space-y-2">
          <div className="flex items-center gap-2 text-[#90CAF9] font-black text-[10px] uppercase tracking-widest">
            <Info className="w-3 h-3" /> Tài khoản mặc định để test:
          </div>
          <div className="grid grid-cols-2 gap-2 text-[9px] font-montserrat">
            <div className="p-2 bg-white rounded-lg border border-blue-50">
              <p className="font-bold text-[#90CAF9] mb-1 uppercase">Admin</p>
              <p>Email: admin@kant.vn</p>
              <p>Pass: admin123</p>
            </div>
            <div className="p-2 bg-white rounded-lg border border-pink-50">
              <p className="font-bold text-[#F48FB1] mb-1 uppercase">Customer</p>
              <p>Email: user@kant.vn</p>
              <p>Pass: user123</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Email</label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
              <input 
                type="text" 
                required
                placeholder="admin@kant.vn"
                className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400">Mật khẩu</label>
              <button type="button" className="text-[10px] font-bold text-[#F48FB1] hover:underline uppercase">Quên mật khẩu?</button>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#90CAF9]" />
              <input 
                type="password" 
                required
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-white/80 rounded-2xl border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-center text-xs font-bold text-red-400 animate-shake">{error}</p>}

          <Button className="w-full !py-4 text-sm font-black uppercase tracking-[0.2em] shadow-blue-100">
            Đăng nhập ngay
          </Button>
        </form>

        <div className="text-center pt-4 border-t border-white/20">
          <p className="text-sm text-gray-500 font-medium">Bạn chưa có tài khoản?</p>
          <button 
            onClick={() => onNavigate('register')}
            className="mt-2 flex items-center gap-2 mx-auto text-[#90CAF9] font-black uppercase text-xs tracking-widest hover:gap-3 transition-all"
          >
            Đăng ký ngay <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
