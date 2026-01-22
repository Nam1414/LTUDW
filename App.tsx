
import React, { useState, useEffect } from 'react';
import Header from './components/Layout/Header';
import Logo from './components/Common/Logo';
import Home from './pages/Home';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Products from './pages/Products';
import AdminDashboard from './pages/Admin/Dashboard';
import AdminReviews from './pages/Admin/Reviews';
import Notifications from './pages/Notifications';
import AccountSettings from './pages/AccountSettings';
import OrderTracking from './pages/OrderTracking';
import MyOrders from './pages/MyOrders';
import StaticPage from './pages/StaticPage';
import AILookbook from './pages/AILookbook';
import SupportChat from './pages/SupportChat';
import ProductReview from './pages/ProductReview';
import Promotions from './pages/Promotions';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import VerifyOTP from './pages/Auth/VerifyOTP';
import { MOCK_PRODUCTS } from './constants';
import { Send, MapPin, Phone, Mail, ChevronRight, Search, Facebook, Instagram, Twitter, Shield, FileText, Headphones, Globe } from 'lucide-react';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedOrderForReview, setSelectedOrderForReview] = useState<any>(null);
  const [cartCount, setCartCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const [pendingUser, setPendingUser] = useState<any>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleProductClick = (id: string) => {
    setSelectedProductId(id);
    setCurrentPage('product-detail');
  };

  const handleNavigate = (page: string, category: string | null = null) => {
    setActiveCategory(category);
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const handleAddToCart = (id?: string, qty: number = 1) => {
    if (!isLoggedIn) {
      handleNavigate('login');
      return;
    }
    setCartCount(prev => prev + qty);
  };

  const handleBuyNow = (id?: string, qty: number = 1) => {
    if (!isLoggedIn) {
      handleNavigate('login');
      return;
    }
    setCartCount(prev => prev + qty);
    handleNavigate('cart');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserProfile(null);
    handleNavigate('login');
  };

  const handleLoginSuccess = (userData: any) => {
    setIsLoggedIn(true);
    setUserProfile(userData);
    handleNavigate('home');
  };

  const handleRegisterSubmit = (userData: any) => {
    setPendingUser(userData);
    handleNavigate('verify-otp');
  };

  const handleVerifySuccess = () => {
    setUserProfile({
      ...pendingUser,
      id: 'new-user-' + Date.now(),
      fullName: pendingUser.username,
      email: pendingUser.contact.includes('@') ? pendingUser.contact : 'customer@kant.vn',
      phone: !pendingUser.contact.includes('@') ? pendingUser.contact : '0900000000',
      role: 'Customer'
    });
    setPendingUser(null);
    handleNavigate('login');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home 
          onProductClick={handleProductClick} 
          onAddToCart={handleAddToCart} 
          isLoggedIn={isLoggedIn} 
          onCategoryClick={(cat) => handleNavigate('products', cat)}
          onNavigate={handleNavigate}
        />;
      case 'login':
        return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
      case 'register':
        return <Register onNavigate={handleNavigate} onRegisterSubmit={handleRegisterSubmit} />;
      case 'verify-otp':
        return <VerifyOTP 
          contactInfo={pendingUser?.contact || ''} 
          onVerifySuccess={handleVerifySuccess} 
          onBack={() => handleNavigate('register')} 
        />;
      case 'product-detail':
        const product = MOCK_PRODUCTS.find(p => p.id === selectedProductId) || MOCK_PRODUCTS[0];
        return <ProductDetail 
          product={product} 
          onAddToCart={handleAddToCart} 
          onBuyNow={handleBuyNow}
        />;
      case 'products':
        return <Products 
          title="Cửa hàng KANT"
          initialCategory={activeCategory}
          onProductClick={handleProductClick} 
          onAddToCart={handleAddToCart} 
        />;
      case 'cart':
        if (!isLoggedIn) {
          return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        }
        return <Cart 
          onCheckout={() => handleNavigate('my-orders')} 
          isAdmin={userProfile?.role === 'Admin'} 
          userEmail={userProfile?.email}
        />;
      case 'admin':
        return <AdminDashboard onNavigate={handleNavigate} />;
      case 'admin-reviews':
        return <AdminReviews onBack={() => handleNavigate('admin')} />;
      case 'notifications':
        if (!isLoggedIn) {
          return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        }
        return <Notifications 
          onNavigate={handleNavigate} 
          isAdmin={userProfile?.role === 'Admin'} 
        />;
      case 'promotions':
        return <Promotions onBack={() => handleNavigate('home')} />;
      case 'account-settings':
        return <AccountSettings onLogout={handleLogout} userProfile={userProfile} />;
      case 'order-tracking':
        if (!isLoggedIn) return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        return <OrderTracking />;
      case 'my-orders':
        if (!isLoggedIn) return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        return <MyOrders 
          onNavigateSupport={() => handleNavigate('support-chat')} 
          onNavigateProducts={() => handleNavigate('products')}
          onReview={(order) => {
            setSelectedOrderForReview(order);
            handleNavigate('product-review');
          }}
        />;
      case 'product-review':
        if (!isLoggedIn) return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        return <ProductReview 
          order={selectedOrderForReview} 
          onBack={() => handleNavigate('my-orders')} 
        />;
      case 'ai-lookbook':
        return <AILookbook onBack={() => handleNavigate('home')} />;
      case 'support-chat':
        if (!isLoggedIn) return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        return <SupportChat onBack={() => handleNavigate('my-orders')} />;
      
      case 'privacy-policy':
        return (
          <StaticPage 
            title="Chính sách bảo mật" 
            onBack={() => handleNavigate('home')}
            content={
              <div className="space-y-6">
                <p>Tại KANT, chúng tôi cam kết bảo vệ sự riêng tư và dữ liệu cá nhân của bạn một cách tuyệt đối.</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">1. Thu thập thông tin</h3>
                <p>Chúng tôi chỉ thu thập những thông tin cần thiết như họ tên, địa chỉ email, số điện thoại và địa chỉ giao hàng để phục vụ quá trình đặt hàng và hỗ trợ khách hàng.</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">2. Sử dụng thông tin</h3>
                <p>Dữ liệu của bạn được sử dụng để: Xử lý đơn hàng, gửi thông báo cập nhật, tư vấn phong cách qua AI Stylist và cải thiện trải nghiệm mua sắm tại KANT.</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">3. Bảo mật dữ liệu</h3>
                <p>KANT sử dụng các công nghệ mã hóa hiện đại để đảm bảo thông tin thanh toán và hồ sơ cá nhân của bạn không bị truy cập trái phép.</p>
              </div>
            }
          />
        );
      case 'terms-of-service':
        return (
          <StaticPage 
            title="Điều khoản dịch vụ" 
            onBack={() => handleNavigate('home')}
            content={
              <div className="space-y-6">
                <p>Chào mừng bạn đến với KANT Fashion Boutique. Việc sử dụng website này đồng nghĩa với việc bạn chấp nhận các điều khoản sau:</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">1. Tài khoản người dùng</h3>
                <p>Bạn chịu trách nhiệm bảo mật mật khẩu và các thông tin liên quan đến tài khoản cá nhân. KANT có quyền từ chối dịch vụ nếu phát hiện hành vi gian lận.</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">2. Đặt hàng và Thanh toán</h3>
                <p>Mọi đơn hàng đều được xác nhận qua email hoặc số điện thoại. Giá niêm yết đã bao gồm các loại thuế hiện hành trừ khi có thông báo khác.</p>
                <h3 className="text-xl font-bold text-[#2C3E50]">3. Sở hữu trí tuệ</h3>
                <p>Tất cả nội dung, hình ảnh và logo KANT trên website đều thuộc quyền sở hữu độc quyền của thương hiệu KANT.</p>
              </div>
            }
          />
        );
      case 'customer-service':
        if (!isLoggedIn) {
          return <Login onNavigate={handleNavigate} onLogin={handleLoginSuccess} />;
        }
        return (
          <StaticPage 
            title="Chăm sóc khách hàng" 
            onBack={() => handleNavigate('home')}
            content={
              <div className="space-y-6 text-center">
                <div className="flex justify-center mb-8">
                   <div className="w-20 h-20 rounded-full bg-[#E3F2FD] flex items-center justify-center text-[#90CAF9] shadow-inner">
                      <Headphones className="w-10 h-10" />
                   </div>
                </div>
                <p className="text-lg">Đội ngũ KANT luôn sẵn sàng lắng nghe và hỗ trợ bạn 24/7.</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
                   <div className="p-8 bg-white/60 rounded-[30px] border border-white/20 shadow-sm">
                      <h4 className="font-bold text-[#90CAF9] mb-4 uppercase">Hotline hỗ trợ</h4>
                      <p className="text-2xl font-black text-[#2C3E50]">1900 1234</p>
                      <p className="text-xs text-gray-400 mt-2">(Từ 8:00 - 22:00 tất cả các ngày trong tuần)</p>
                   </div>
                   <div className="p-8 bg-white/60 rounded-[30px] border border-white/20 shadow-sm">
                      <h4 className="font-bold text-[#F48FB1] mb-4 uppercase">Email phản hồi</h4>
                      <p className="text-xl font-black text-[#2C3E50]">kantfashion@gmail.com</p>
                      <p className="text-xs text-gray-400 mt-2">(Chúng tôi sẽ phản hồi trong vòng 2 giờ làm việc)</p>
                   </div>
                </div>
                <div className="mt-12 p-8 rounded-[40px] kant-gradient text-white">
                   <h4 className="font-bold mb-4 uppercase">Chính sách đổi trả</h4>
                   <p className="italic">KANT hỗ trợ đổi hàng trong vòng 30 ngày kể từ ngày nhận hàng đối với các sản phẩm còn nguyên tem mác và chưa qua sử dụng.</p>
                </div>
              </div>
            }
          />
        );
      case 'store-system':
        return (
          <StaticPage 
            title="Hệ thống cửa hàng KANT" 
            onBack={() => handleNavigate('home')}
            content={
              <div className="space-y-8">
                <p className="text-center text-lg italic font-merriweather">Hãy ghé thăm không gian tối giản của KANT để trải nghiệm trực tiếp chất liệu cao cấp.</p>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10">
                   <div className="bg-white/60 p-8 rounded-[40px] border border-white/40 shadow-sm group hover:shadow-blue-100 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-500">
                            <MapPin className="w-6 h-6" />
                         </div>
                         <h4 className="text-xl font-black text-[#2C3E50] uppercase">Chi nhánh Hà Nội</h4>
                      </div>
                      <p className="font-bold">KANT Flagship Store Hoàn Kiếm</p>
                      <p className="text-sm text-gray-500 mt-2">45 Lý Thái Tổ, Quận Hoàn Kiếm, Hà Nội</p>
                      <p className="text-xs text-[#90CAF9] font-bold mt-4">SĐT: 024.3939.1234</p>
                   </div>
                   <div className="bg-white/60 p-8 rounded-[40px] border border-white/40 shadow-sm group hover:shadow-pink-100 transition-all">
                      <div className="flex items-center gap-4 mb-6">
                         <div className="w-12 h-12 rounded-2xl bg-pink-50 flex items-center justify-center text-pink-500">
                            <MapPin className="w-6 h-6" />
                         </div>
                         <h4 className="text-xl font-black text-[#2C3E50] uppercase">Chi nhánh TP. HCM</h4>
                      </div>
                      <p className="font-bold">KANT Boutique Quận 1</p>
                      <p className="text-sm text-gray-500 mt-2">88 Đồng Khởi, Quận 1, TP. Hồ Chí Minh</p>
                      <p className="text-xs text-[#F48FB1] font-bold mt-4">SĐT: 028.3822.5678</p>
                   </div>
                </div>
                <div className="aspect-video rounded-[50px] overflow-hidden border-8 border-white shadow-2xl mt-12">
                   <img src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover" alt="KANT Store Interior" />
                </div>
              </div>
            }
          />
        );
      default:
        return <Home onProductClick={handleProductClick} onAddToCart={handleAddToCart} isLoggedIn={isLoggedIn} onCategoryClick={(cat) => handleNavigate('products', cat)} onNavigate={handleNavigate} />;
    }
  };

  return (
    <div className="min-h-screen">
      <Header 
        cartCount={cartCount} 
        onNavigate={handleNavigate} 
        onSearch={(q) => console.log('Đang tìm kiếm:', q)} 
        isAdmin={userProfile?.role === 'Admin'}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
      />
      <main className="max-w-[1920px] mx-auto min-h-[60vh]">
        {renderPage()}
      </main>
      
      <footer className="glass-morphism mt-24 py-24 px-8 border-t border-white/20 shadow-[0_-20px_50px_rgba(144,202,249,0.1)]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 lg:gap-16">
          <div className="space-y-8">
            <div onClick={() => handleNavigate('home')}>
              <Logo size="lg" />
            </div>
            <p className="text-gray-500 leading-relaxed font-merriweather italic text-sm">
              Định nghĩa lại vẻ đẹp thời trang Pastel cao cấp tại Việt Nam. Thanh lịch, tối giản và thuần khiết.
            </p>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8 font-montserrat uppercase tracking-tight text-[#2C3E50]">Khám phá</h4>
            <ul className="space-y-4 text-gray-500 font-medium text-sm font-montserrat">
              <li onClick={() => handleNavigate('products')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><ChevronRight className="w-3 h-3"/> Sản phẩm</li>
              <li onClick={() => handleNavigate('ai-lookbook')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><ChevronRight className="w-3 h-3"/> AI Lookbook</li>
              <li onClick={() => handleNavigate('store-system')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><ChevronRight className="w-3 h-3"/> Hệ thống cửa hàng</li>
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8 font-montserrat uppercase tracking-tight text-[#2C3E50]">Hỗ trợ</h4>
            <ul className="space-y-4 text-gray-500 font-medium text-sm font-montserrat">
              {isLoggedIn && (
                <li onClick={() => handleNavigate('order-tracking')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><Search className="w-3 h-3"/> Tra cứu đơn hàng</li>
              )}
              <li onClick={() => handleNavigate('privacy-policy')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><Shield className="w-3 h-3"/> Chính sách bảo mật</li>
              <li onClick={() => handleNavigate('terms-of-service')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><FileText className="w-3 h-3"/> Điều khoản dịch vụ</li>
              <li onClick={() => handleNavigate('customer-service')} className="hover-link cursor-pointer flex items-center gap-2 uppercase tracking-wide"><Headphones className="w-3 h-3"/> Chăm sóc khách hàng</li>
            </ul>
          </div>

          <div className="space-y-8">
            <h4 className="font-black text-xl font-montserrat uppercase tracking-tight text-[#2C3E50]">Liên hệ</h4>
            <div className="space-y-4 text-sm text-gray-500 font-montserrat mb-6">
              <p className="flex items-center gap-3"><Phone className="w-4 h-4 text-[#90CAF9]"/> 1900 1234 (8:00 - 22:00)</p>
              <p className="flex items-center gap-3"><Mail className="w-4 h-4 text-[#F48FB1]"/> kantfashion@gmail.com</p>
              <p className="flex items-center gap-3"><Globe className="w-4 h-4 text-[#90CAF9]"/> www.kant.vn</p>
            </div>
            
            <div className="pt-4 flex items-center gap-4">
              <a href="https://facebook.com/kant" target="_blank" rel="noreferrer" className="social-icon-hover w-10 h-10 rounded-xl bg-white/60 border border-white/20 flex items-center justify-center text-[#2C3E50] shadow-sm transition-all">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com/kant" target="_blank" rel="noreferrer" className="social-icon-hover w-10 h-10 rounded-xl bg-white/60 border border-white/20 flex items-center justify-center text-[#2C3E50] shadow-sm transition-all">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com/kant" target="_blank" rel="noreferrer" className="social-icon-hover w-10 h-10 rounded-xl bg-white/60 border border-white/20 flex items-center justify-center text-[#2C3E50] shadow-sm transition-all">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
          <p>© 2024 KANT FASHION BOUTIQUE. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-6">
            <button onClick={() => handleNavigate('privacy-policy')} className="hover:text-[#90CAF9]">Privacy Policy</button>
            <button onClick={() => handleNavigate('terms-of-service')} className="hover:text-[#90CAF9]">Terms of Service</button>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
