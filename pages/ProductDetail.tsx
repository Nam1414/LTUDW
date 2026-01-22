
import React, { useState, useEffect } from 'react';
import { Product, ProductVariant } from '../types';
import Button from '../components/Common/Button';
import { Star, ShieldCheck, Truck, RotateCcw, Plus, Minus, MessageCircle, Ruler, Hash, X } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

interface ProductDetailProps {
  product: any; // Using any to access new discount fields
  onAddToCart: (variantId: string, qty: number) => void;
  onBuyNow: (variantId: string, qty: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({ product, onAddToCart, onBuyNow }) => {
  const [selectedColor, setSelectedColor] = useState(product.variants[0].color);
  const [selectedSize, setSelectedSize] = useState(product.variants[0].size);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.images[0]);
  const [aiAdvice, setAiAdvice] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showSizeChart, setShowSizeChart] = useState(false);

  const colors: string[] = Array.from(new Set(product.variants.map((v: any) => v.color)));
  const sizes: string[] = Array.from(new Set(product.variants.map((v: any) => v.size)));

  const currentVariant = product.variants.find((v: any) => v.color === selectedColor && v.size === selectedSize);
  
  // Áp dụng giá giảm thẳng vào sản phẩm
  const basePriceToUse = product.discountPrice || product.basePrice;
  const currentPrice = basePriceToUse + (currentVariant?.priceModifier || 0);
  const originalPrice = product.basePrice + (currentVariant?.priceModifier || 0);

  // Correct implementation of Google GenAI for styling advice
  const getAiAdvice = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Bạn là một chuyên gia tư vấn thời trang cao cấp của thương hiệu KANT. 
        Hãy đưa ra lời khuyên phối đồ tinh tế cho sản phẩm "${product.name}" (Mô tả: ${product.description}). 
        Khuyên khách hàng nên chọn màu ${selectedColor} và size ${selectedSize} kết hợp với những phụ kiện hoặc trang phục khác như thế nào để tạo nên phong cách sang trọng. 
        Câu trả lời phải bằng tiếng Việt, giọng văn chuyên nghiệp, ngắn gọn và truyền cảm hứng.`
      });
      // Correct extraction using .text property
      setAiAdvice(response.text || '');
    } catch (error) {
      console.error(error);
      setAiAdvice('Chào bạn, đây là một lựa chọn tuyệt vời! Sản phẩm này cực kỳ tôn dáng và dễ dàng kết hợp với các phụ kiện tối giản để tạo nên vẻ ngoài thanh lịch nhất.');
    } finally {
      setIsGenerating(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const renderSizeTable = () => {
    const category = product.category.toLowerCase();
    
    if (category.includes('áo')) {
      return (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#90CAF9]/20 text-[#2C3E50] font-black uppercase text-[10px] tracking-widest">
              <th className="p-4 rounded-tl-2xl">Size</th>
              <th className="p-4">Vai</th>
              <th className="p-4">Ngực</th>
              <th className="p-4">Dài áo</th>
              <th className="p-4">Chiều cao</th>
              <th className="p-4 rounded-tr-2xl">Cân nặng</th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat divide-y divide-gray-100">
            <tr><td className="p-4 font-bold">S</td><td className="p-4 text-gray-500">38–40</td><td className="p-4 text-gray-500">84–88</td><td className="p-4 text-gray-500">62–64</td><td className="p-4 text-gray-500">155–162</td><td className="p-4 text-gray-500">45–52</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">M</td><td className="p-4 text-gray-500">40–42</td><td className="p-4 text-gray-500">88–92</td><td className="p-4 text-gray-500">64–66</td><td className="p-4 text-gray-500">160–168</td><td className="p-4 text-gray-500">52–60</td></tr>
            <tr><td className="p-4 font-bold">L</td><td className="p-4 text-gray-500">42–44</td><td className="p-4 text-gray-500">92–96</td><td className="p-4 text-gray-500">66–68</td><td className="p-4 text-gray-500">168–175</td><td className="p-4 text-gray-500">60–68</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">XL</td><td className="p-4 text-gray-500">44–46</td><td className="p-4 text-gray-500">96–102</td><td className="p-4 text-gray-500">68–70</td><td className="p-4 text-gray-500">173–180</td><td className="p-4 text-gray-500">68–78</td></tr>
            <tr><td className="p-4 font-bold rounded-bl-2xl">XXL</td><td className="p-4 text-gray-500">46–48</td><td className="p-4 text-gray-500">102–108</td><td className="p-4 text-gray-500">70–72</td><td className="p-4 text-gray-500">178–185</td><td className="p-4 text-gray-500 rounded-br-2xl">78–90</td></tr>
          </tbody>
        </table>
      );
    } else if (category.includes('quần')) {
      return (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#90CAF9]/20 text-[#2C3E50] font-black uppercase text-[10px] tracking-widest">
              <th className="p-4 rounded-tl-2xl">Size</th>
              <th className="p-4">Eo</th>
              <th className="p-4">Mông</th>
              <th className="p-4">Dài quần</th>
              <th className="p-4 rounded-tr-2xl">Cân nặng</th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat divide-y divide-gray-100">
            <tr><td className="p-4 font-bold">S</td><td className="p-4 text-gray-500">66–70</td><td className="p-4 text-gray-500">88–92</td><td className="p-4 text-gray-500">95–97</td><td className="p-4 text-gray-500">45–52</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">M</td><td className="p-4 text-gray-500">70–74</td><td className="p-4 text-gray-500">92–96</td><td className="p-4 text-gray-500">97–99</td><td className="p-4 text-gray-500">52–60</td></tr>
            <tr><td className="p-4 font-bold">L</td><td className="p-4 text-gray-500">74–78</td><td className="p-4 text-gray-500">96–100</td><td className="p-4 text-gray-500">99–101</td><td className="p-4 text-gray-500">60–68</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">XL</td><td className="p-4 text-gray-500">78–84</td><td className="p-4 text-gray-500">100–104</td><td className="p-4 text-gray-500">101–103</td><td className="p-4 text-gray-500">68–78</td></tr>
            <tr><td className="p-4 font-bold rounded-bl-2xl">XXL</td><td className="p-4 text-gray-500">84–90</td><td className="p-4 text-gray-500">104–110</td><td className="p-4 text-gray-500">103–105</td><td className="p-4 text-gray-500 rounded-br-2xl">78–90</td></tr>
          </tbody>
        </table>
      );
    } else {
      // Mặc định hoặc dành cho Đầm/Váy
      return (
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#90CAF9]/20 text-[#2C3E50] font-black uppercase text-[10px] tracking-widest">
              <th className="p-4 rounded-tl-2xl">Size</th>
              <th className="p-4">Ngực</th>
              <th className="p-4">Eo</th>
              <th className="p-4">Mông</th>
              <th className="p-4 rounded-tr-2xl">Dài váy</th>
            </tr>
          </thead>
          <tbody className="text-sm font-montserrat divide-y divide-gray-100">
            <tr><td className="p-4 font-bold">S</td><td className="p-4 text-gray-500">84–88</td><td className="p-4 text-gray-500">64–68</td><td className="p-4 text-gray-500">88–92</td><td className="p-4 text-gray-500">85–90</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">M</td><td className="p-4 text-gray-500">88–92</td><td className="p-4 text-gray-500">68–72</td><td className="p-4 text-gray-500">92–96</td><td className="p-4 text-gray-500">90–95</td></tr>
            <tr><td className="p-4 font-bold">L</td><td className="p-4 text-gray-500">92–96</td><td className="p-4 text-gray-500">72–76</td><td className="p-4 text-gray-500">96–100</td><td className="p-4 text-gray-500">95–100</td></tr>
            <tr className="bg-gray-50/50"><td className="p-4 font-bold">XL</td><td className="p-4 text-gray-500">96–102</td><td className="p-4 text-gray-500">76–82</td><td className="p-4 text-gray-500">100–104</td><td className="p-4 text-gray-500">100–105</td></tr>
            <tr><td className="p-4 font-bold rounded-bl-2xl">XXL</td><td className="p-4 text-gray-500">102–108</td><td className="p-4 text-gray-500">82–88</td><td className="p-4 text-gray-500">104–110</td><td className="p-4 text-gray-500 rounded-br-2xl">105–110</td></tr>
          </tbody>
        </table>
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
        {/* Gallery ảnh */}
        <div className="space-y-6">
          <div className="aspect-[3/4] rounded-[50px] overflow-hidden bg-white/40 border border-white/20 shadow-2xl">
            <img src={activeImage} className="w-full h-full object-cover hover:scale-110 transition-transform duration-1000" alt={product.name} />
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
            {product.images.map((img: string, idx: number) => (
              <button 
                key={idx}
                onClick={() => setActiveImage(img)}
                className={`w-28 h-36 rounded-2xl flex-shrink-0 overflow-hidden border-2 transition-all duration-300 ${activeImage === img ? 'border-[#90CAF9] scale-95 shadow-lg' : 'border-transparent opacity-60 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="hình nhỏ" />
              </button>
            ))}
          </div>
        </div>

        {/* Thông tin sản phẩm */}
        <div className="flex flex-col">
          <div className="mb-10">
            <div className="flex justify-between items-start mb-4">
              <span className="text-[#90CAF9] font-black uppercase tracking-[0.2em] text-sm block font-playfair">{product.category}</span>
              <div className="flex items-center gap-1.5 bg-white/80 px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                <Hash className="w-3 h-3 text-[#F48FB1]" />
                <span className="text-[10px] font-black text-[#2C3E50] uppercase tracking-widest">{currentVariant?.sku}</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold mb-6 font-playfair leading-tight">{product.name}</h1>
            <div className="flex items-center gap-8 mb-8">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                <span className="font-bold text-xl">{product.rating}</span>
                <span className="text-gray-400 font-merriweather italic text-sm">({product.reviewsCount} đánh giá khách hàng)</span>
              </div>
              <div className="h-5 w-[1px] bg-gray-300"></div>
              <span className="text-green-500 font-bold flex items-center gap-2 text-sm uppercase tracking-wide">
                <ShieldCheck className="w-5 h-5" /> Sản phẩm chính hãng
              </span>
            </div>
            
            <div className="flex items-baseline gap-4">
              <p className="text-4xl font-black text-[#2C3E50] font-playfair">{currentPrice.toLocaleString()}đ</p>
              {product.discountPrice && (
                <p className="text-xl text-gray-400 line-through italic font-merriweather">{originalPrice.toLocaleString()}đ</p>
              )}
              {product.discountPrice && (
                <span className="bg-[#FFD1FF] text-[#F48FB1] px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest">
                  ƯU ĐÃI KHỦNG
                </span>
              )}
            </div>
          </div>

          <div className="space-y-10 mb-12">
            {/* Chọn màu */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest font-playfair">Màu sắc: <span className="text-[#2C3E50]">{selectedColor}</span></h3>
              </div>
              <div className="flex gap-4">
                {colors.map(color => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`w-14 h-14 rounded-full border-2 transition-all flex items-center justify-center p-1 ${selectedColor === color ? 'border-[#90CAF9] shadow-lg' : 'border-transparent bg-white/60'}`}
                  >
                    <div 
                      className="w-full h-full rounded-full shadow-inner border border-black/5" 
                      style={{ backgroundColor: color === 'Hồng' ? '#FFD1FF' : color === 'Xanh' ? '#90CAF9' : color === 'Trắng' ? '#FFFFFF' : color === 'Xám' ? '#808080' : '#888888' }} 
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Chọn kích cỡ */}
            <div>
              <div className="flex justify-between items-center mb-5">
                <h3 className="text-sm font-black text-gray-400 uppercase tracking-widest font-playfair">Kích cỡ: <span className="text-[#2C3E50]">{selectedSize}</span></h3>
                <button 
                  onClick={() => setShowSizeChart(true)}
                  className="flex items-center gap-2 text-xs font-bold text-[#90CAF9] hover:underline uppercase tracking-wider transition-all hover:scale-105"
                >
                  <Ruler className="w-4 h-4" /> Bảng size chuẩn
                </button>
              </div>
              <div className="flex gap-4">
                {sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`min-w-[64px] h-16 rounded-2xl font-bold text-xl border-2 transition-all duration-300 ${selectedSize === size ? 'bg-[#90CAF9] text-white border-[#90CAF9] shadow-xl' : 'bg-white text-gray-600 border-gray-100 hover:border-[#90CAF9] shadow-sm'}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Số lượng */}
            <div className="flex items-center gap-8">
              <div className="flex items-center bg-white/80 rounded-[25px] border border-white/20 p-2 shadow-sm">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <Minus className="w-5 h-5 text-[#2C3E50]" />
                </button>
                <span className="w-14 text-center font-black text-2xl font-playfair">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-gray-100 rounded-2xl transition-colors">
                  <Plus className="w-5 h-5 text-[#2C3E50]" />
                </button>
              </div>
              <p className="text-sm font-merriweather italic text-gray-500">Chỉ còn {currentVariant?.quantity} sản phẩm khả dụng</p>
            </div>
          </div>

          <div className="flex gap-5 mb-14">
            <Button 
              className="flex-1 !py-6 text-xl font-bold font-playfair shadow-2xl hover:scale-[1.02]" 
              onClick={() => currentVariant && onAddToCart(currentVariant.id, quantity)}
            >
              Thêm vào giỏ hàng
            </Button>
            <Button 
              type="secondary" 
              className="px-10 !py-6 text-xl font-bold font-playfair shadow-xl"
              onClick={() => currentVariant && onBuyNow(currentVariant.id, quantity)}
            >
              Mua ngay
            </Button>
          </div>

          {/* Trợ lý AI Stylist */}
          <div className="p-10 rounded-[40px] bg-white/50 border border-white/40 shadow-xl space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl kant-gradient flex items-center justify-center text-white shadow-lg">
                  <MessageCircle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-xl font-playfair">Trợ lý Stylist AI</h3>
                  <p className="text-[10px] text-gray-400 uppercase tracking-widest font-bold">Cá nhân hóa phong cách</p>
                </div>
              </div>
              <Button type="ghost" className="!px-5 !py-3 text-sm font-bold bg-[#90CAF9]/10 hover:bg-[#90CAF9]/20" onClick={getAiAdvice} disabled={isGenerating}>
                {isGenerating ? 'Đang phân tích...' : 'Tư vấn phối đồ'}
              </Button>
            </div>
            {aiAdvice ? (
              <div className="relative p-6 bg-white/60 rounded-3xl border border-white/40 italic">
                <p className="text-[#2C3E50] leading-relaxed font-merriweather text-lg">"{aiAdvice}"</p>
                <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-white/60 rotate-45 border-b border-l border-white/40"></div>
              </div>
            ) : (
              <p className="text-gray-500 text-sm font-merriweather leading-relaxed">Hãy để trí tuệ nhân tạo của KANT gợi ý cho bạn những cách phối đồ tuyệt vời nhất dựa trên lựa chọn hiện tại.</p>
            )}
          </div>

          {/* Đặc điểm dịch vụ */}
          <div className="grid grid-cols-3 gap-6 mt-16 border-t border-gray-200 pt-10">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-[#E3F2FD] flex items-center justify-center mx-auto text-[#90CAF9] shadow-inner">
                <Truck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base font-playfair">Giao hàng hỏa tốc</h4>
              <p className="text-xs text-gray-400 font-merriweather">Nhận hàng từ 1-3 ngày</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-[#FFECF1] flex items-center justify-center mx-auto text-[#F48FB1] shadow-inner">
                <RotateCcw className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base font-playfair">Đổi trả tận tâm</h4>
              <p className="text-xs text-gray-400 font-merriweather">30 ngày miễn phí</p>
            </div>
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-3xl bg-green-50 flex items-center justify-center mx-auto text-green-500 shadow-inner">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h4 className="font-bold text-base font-playfair">Bảo hành trọn đời</h4>
              <p className="text-xs text-gray-400 font-merriweather">Chất lượng cao cấp</p>
            </div>
          </div>
        </div>
      </div>

      {/* Size Chart Modal */}
      {showSizeChart && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white/95 backdrop-blur-xl w-full max-w-2xl rounded-[40px] p-10 shadow-2xl relative animate-in zoom-in duration-300 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-2 kant-gradient opacity-60"></div>
            
            <button 
              onClick={() => setShowSizeChart(false)}
              className="absolute top-6 right-6 p-3 bg-gray-50 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X className="w-6 h-6 text-gray-400" />
            </button>

            <div className="flex items-center gap-4 mb-8">
              <div className="w-12 h-12 rounded-2xl bg-[#90CAF9]/20 flex items-center justify-center text-[#90CAF9]">
                <Ruler className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-3xl font-black font-montserrat uppercase tracking-tight">Bảng size chuẩn</h2>
                <p className="text-gray-500 font-merriweather italic text-xs">Phân loại: {product.category}</p>
              </div>
            </div>

            <div className="overflow-x-auto rounded-2xl shadow-sm border border-gray-100">
              {renderSizeTable()}
            </div>

            <div className="mt-8 p-6 bg-[#E3F2FD]/30 rounded-3xl border border-[#90CAF9]/20">
              <p className="text-xs text-gray-500 font-merriweather leading-relaxed">
                * Lưu ý: Các thông số trên chỉ mang tính chất tham khảo. KANT khuyến khích bạn nhắn tin trực tiếp để được tư vấn kích cỡ chính xác nhất dựa trên phom dáng sản phẩm cụ thể.
              </p>
            </div>

            <div className="mt-8 flex justify-center">
              <Button 
                className="!px-12 !py-3 uppercase tracking-widest text-xs font-black"
                onClick={() => setShowSizeChart(false)}
              >
                Đã hiểu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
