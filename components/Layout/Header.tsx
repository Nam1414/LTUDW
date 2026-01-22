
import React from 'react';
import Logo from '../Common/Logo';
import { ShoppingBag, Search, Bell, User as UserIcon, LogOut } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onNavigate: (page: string) => void;
  onSearch: (q: string) => void;
  isAdmin?: boolean;
  isLoggedIn: boolean;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartCount, onNavigate, onSearch, isAdmin = false, isLoggedIn, onLogout }) => {
  return (
    <header className="sticky top-0 z-50 glass-morphism px-4 py-3 md:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        <div onClick={() => onNavigate('home')}>
          <Logo />
        </div>

        <nav className="hidden md:flex items-center gap-8 text-sm font-medium font-montserrat uppercase tracking-wider">
          <button onClick={() => onNavigate('home')} className="hover:text-[#90CAF9] transition-colors font-bold">Trang chủ</button>
          <button onClick={() => onNavigate('products')} className="hover:text-[#90CAF9] transition-colors font-bold">Sản phẩm</button>
          {isLoggedIn && !isAdmin && (
            <button onClick={() => onNavigate('my-orders')} className="hover:text-[#90CAF9] transition-colors font-bold">
              Đơn hàng
            </button>
          )}
          {isLoggedIn && isAdmin && (
            <button 
              onClick={() => onNavigate('admin')} 
              className="hover:text-[#90CAF9] transition-colors font-bold"
            >
              Quản lý
            </button>
          )}
        </nav>

        <div className="flex-1 max-w-md hidden md:block">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Tìm kiếm thời trang KANT..."
              className="w-full pl-10 pr-4 py-2 bg-white/60 rounded-full border border-white/20 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 transition-all font-montserrat text-xs"
              onChange={(e) => onSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={() => onNavigate('notifications')}
            className="relative p-2 hover:bg-white/40 rounded-full transition-all"
          >
            <Bell className="w-6 h-6 text-[#2C3E50]" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#F48FB1] rounded-full border-2 border-white"></span>
          </button>
          
          <button 
            onClick={() => onNavigate('cart')}
            className="relative p-2 hover:bg-white/40 rounded-full transition-all"
          >
            <ShoppingBag className="w-6 h-6 text-[#2C3E50]" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#F48FB1] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[18px] text-center font-fredoka shadow-sm">
                {cartCount}
              </span>
            )}
          </button>

          {isLoggedIn ? (
            <button 
              onClick={() => onNavigate('account-settings')}
              className="flex items-center gap-2 p-1.5 pr-3 bg-white/60 rounded-full hover:bg-white/80 transition-all border border-white/20 shadow-sm"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#90CAF9] to-[#F48FB1] flex items-center justify-center text-white shadow-inner">
                <UserIcon className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold hidden sm:block font-montserrat uppercase tracking-tight">Tài khoản</span>
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('login')}
              className="px-6 py-2 bg-[#90CAF9] text-white rounded-full font-bold font-montserrat text-xs uppercase tracking-widest hover:bg-[#64B5F6] transition-all shadow-md"
            >
              Đăng nhập
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
