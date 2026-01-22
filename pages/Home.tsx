
import React, { useState } from 'react';
import Button from '../components/Common/Button';
import { MOCK_PRODUCTS } from '../constants';
import { ArrowRight, Star, Heart, Flame, Hash } from 'lucide-react';

interface HomeProps {
  onProductClick: (id: string) => void;
  onAddToCart: (id: string) => void;
  isLoggedIn?: boolean;
  onCategoryClick?: (category: string) => void;
  onNavigate?: (page: string) => void;
}

const Home: React.FC<HomeProps> = ({ onProductClick, onAddToCart, isLoggedIn = false, onCategoryClick, onNavigate }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const saleProducts = MOCK_PRODUCTS.slice(0, 3);

  const handleNewsletterSubmit = () => {
    // Luồng: Sau khi nhập email nhấn đăng ký sẽ chuyển đến trang đăng ký luôn
    onNavigate?.('register');
  };

  return (
    <div className="space-y-12 pb-20">
      {/* Hero Section */}
      <section className="relative h-[650px] rounded-[40px] overflow-hidden mx-4 md:mx-8 mt-4 group">
        <img 
          src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=2070&auto=format&fit=crop" 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          alt="Banner chính"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent flex flex-col justify-center px-12 md:px-24">
          <span className="text-white/90 font-bold mb-4 uppercase tracking-[0.4em] font-montserrat text-sm">Bộ sưu tập KANT 2024</span>
          <h1 className="text-5xl md:text-8xl font-black text-white mb-6 leading-tight font-montserrat uppercase tracking-tighter">
            Nâng tầm <br /> phong cách <br /> 
          </h1>
          <p className="text-white/80 max-w-lg mb-10 font-merriweather text-lg leading-relaxed">
            Khám phá sự kết hợp tinh tế giữa nghệ thuật tối giản và bảng màu pastel dịu nhẹ, mang lại vẻ đẹp thuần khiết cho tủ đồ của bạn.
          </p>
          <div className="flex gap-4">
            <Button 
              className="!px-10 !py-4 text-lg !font-montserrat uppercase tracking-widest"
              onClick={() => onNavigate?.('products')}
            >
              Khám phá ngay
            </Button>
            <Button 
              type="outline" 
              className="text-white border-white hover:bg-white/20 !px-10 !py-4 text-lg !font-montserrat uppercase tracking-widest"
              onClick={() => onNavigate?.('ai-lookbook')}
            >
              Xem Lookbook
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 md:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black font-montserrat uppercase tracking-tight">Danh mục xu hướng</h2>
          <button 
            onClick={() => onCategoryClick?.('All')}
            className="flex items-center gap-2 text-[#90CAF9] font-bold font-baloo hover:gap-3 transition-all"
          >
            XEM TẤT CẢ <ArrowRight className="w-5 h-5" />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { name: 'Áo khoác', tag: 'Áo khoác' },
            { name: 'Áo thun', tag: 'Áo thun' },
            { name: 'Quần tây', tag: 'Quần' },
            { name: 'Phụ kiện', tag: 'Phụ kiện' }
          ].map((cat, idx) => (
            <div 
              key={cat.tag} 
              className="group cursor-pointer"
              onClick={() => onCategoryClick?.(cat.tag)}
            >
              <div className="aspect-[4/5] rounded-[32px] overflow-hidden mb-5 glass-morphism p-2 shadow-lg hover:shadow-blue-100 transition-all duration-500">
                <img 
                  src={`https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop&sig=${idx}`} 
                  className="w-full h-full object-cover rounded-[24px] group-hover:scale-110 transition-transform duration-700"
                  alt={cat.name}
                />
              </div>
              <h3 className="text-center font-bold text-xl font-montserrat uppercase tracking-tight group-hover:text-[#90CAF9] transition-colors">{cat.name}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-4 md:px-8">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-black font-montserrat uppercase tracking-tight">Sản phẩm mới nhất</h2>
          <div className="flex gap-3">
            <span className="bg-[#FFD1FF] text-[#2C3E50] px-5 py-2 rounded-full text-xs font-bold font-fredoka shadow-sm uppercase tracking-wider">SALE KHỦNG</span>
            <span className="bg-white/60 px-5 py-2 rounded-full text-xs font-bold font-fredoka border border-white/20 shadow-sm uppercase tracking-wider">Mùa Xuân 2024</span>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_PRODUCTS.map((product) => (
            <div 
              key={product.id} 
              className="bg-white/40 p-5 rounded-[40px] border border-white/30 hover:shadow-[0_20px_50px_rgba(144,202,249,0.3)] transition-all group relative"
            >
              <div className="absolute top-8 left-8 z-10 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full border border-white/50 shadow-sm flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                <Hash className="w-3 h-3 text-[#90CAF9]" />
                <span className="text-[9px] font-black font-montserrat tracking-widest">{product.productCode}</span>
              </div>
              <div className="relative aspect-[3/4] rounded-[32px] overflow-hidden mb-6 cursor-pointer" onClick={() => onProductClick(product.id)}>
                <img 
                  src={product.images[0]} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  alt={product.name}
                />
                <button className="absolute top-5 right-5 p-3 bg-white/80 backdrop-blur-md rounded-full hover:bg-[#FFD1FF] transition-colors shadow-lg">
                  <Heart className="w-5 h-5 text-[#2C3E50]" />
                </button>
                <div className="absolute bottom-5 left-5 right-5 opacity-0 group-hover:opacity-100 transition-all translate-y-4 group-hover:translate-y-0 duration-500">
                  <Button 
                    className="w-full !py-4 text-lg shadow-xl !font-montserrat"
                    onClick={(e) => {
                      e.stopPropagation();
                      onAddToCart(product.id);
                    }}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                </div>
              </div>
              <div className="flex justify-between items-start px-2">
                <div>
                  <h3 className="font-bold text-xl mb-2 font-montserrat tracking-tight uppercase">{product.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-500 mb-3 font-fredoka">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-bold text-[#2C3E50]">{product.rating}</span>
                    <span className="italic">({product.reviewsCount} đánh giá)</span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-2xl text-[#2C3E50] font-baloo">{(product.discountPrice || product.basePrice).toLocaleString()}đ</p>
                  {product.discountPrice && (
                    <p className="text-xs text-gray-400 line-through italic font-merriweather">{product.basePrice.toLocaleString()}đ</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      {!isLoggedIn ? (
        <section className="mx-4 md:mx-8 p-16 md:p-28 rounded-[50px] kant-gradient text-white text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] -translate-y-1/2 translate-x-1/2 rounded-full"></div>
          <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-200/20 blur-[80px] translate-y-1/2 -translate-x-1/2 rounded-full"></div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-6xl font-black mb-8 font-montserrat uppercase">Trở thành một phần của KANT</h2>
            <p className="text-xl text-white/90 mb-12 leading-relaxed font-merriweather">
              Đăng ký để nhận thông tin về các bộ sưu tập giới hạn sớm nhất và nhận ngay ưu đãi độc quyền 15% cho đơn hàng đầu tiên của bạn.
            </p>
            <div className="flex flex-col sm:flex-row gap-5 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Nhập địa chỉ email của bạn..." 
                className="flex-1 px-10 py-5 rounded-[25px] text-[#2C3E50] font-medium focus:outline-none focus:ring-4 focus:ring-white/30 transition-all shadow-inner font-montserrat"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
              />
              <Button 
                type="secondary" 
                className="!bg-white !px-12 !py-5 text-lg font-bold hover:scale-105 !font-montserrat"
                onClick={handleNewsletterSubmit}
              >
                Đăng ký ngay
              </Button>
            </div>
          </div>
        </section>
      ) : (
        /* Sales Products for Logged In User */
        <section className="mx-4 md:mx-8 px-4 py-16 bg-white/40 border border-white/20 rounded-[50px] shadow-xl overflow-hidden relative">
          <div className="absolute top-0 right-0 p-10 opacity-10">
            <Flame className="w-64 h-64 text-[#F48FB1]" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-10 justify-center">
              <Flame className="w-8 h-8 text-[#F48FB1]" />
              <h2 className="text-4xl font-black font-montserrat uppercase tracking-tight text-center">Ưu đãi độc quyền cho bạn</h2>
              <Flame className="w-8 h-8 text-[#F48FB1]" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {saleProducts.map((product) => (
                <div key={`sale-${product.id}`} className="bg-white/60 p-6 rounded-[32px] border border-white/40 flex flex-col items-center text-center hover:scale-105 transition-all">
                  <div className="w-full aspect-square rounded-2xl overflow-hidden mb-4">
                    <img src={product.images[0]} className="w-full h-full object-cover" alt={product.name} />
                  </div>
                  <h4 className="font-bold font-montserrat uppercase mb-2">{product.name}</h4>
                  <div className="flex gap-3 items-center">
                    <span className="text-[#F48FB1] font-black text-xl font-baloo">{(product.discountPrice || product.basePrice * 0.7).toLocaleString()}đ</span>
                    <span className="text-gray-400 line-through text-sm font-merriweather italic">{product.basePrice.toLocaleString()}đ</span>
                  </div>
                  <Button className="mt-4 !py-2 !px-6 text-sm !font-montserrat" onClick={() => onProductClick(product.id)}>Xem ngay</Button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};

export default Home;
