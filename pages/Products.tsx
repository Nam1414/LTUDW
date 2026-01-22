
import React, { useState, useEffect } from 'react';
import { MOCK_PRODUCTS } from '../constants';
import Button from '../components/Common/Button';
import { Star, Heart, SlidersHorizontal, ChevronDown, Check, Hash } from 'lucide-react';

interface ProductsProps {
  title?: string;
  initialCategory?: string | null;
  onProductClick: (id: string) => void;
  onAddToCart: (id: string) => void;
}

const CATEGORIES = [
  { id: 'all', label: 'Tất cả sản phẩm', value: null },
  { id: 'coat', label: 'Áo khoác', value: 'Áo khoác' },
  { id: 'tshirt', label: 'Áo thun', value: 'Áo thun' },
  { id: 'pant', label: 'Quần', value: 'Quần' },
  { id: 'access', label: 'Phụ kiện', value: 'Phụ kiện' },
];

const Products: React.FC<ProductsProps> = ({ title = 'Cửa hàng KANT', initialCategory, onProductClick, onAddToCart }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory || null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    if (initialCategory !== undefined) {
      setSelectedCategory(initialCategory === 'All' ? null : initialCategory);
    }
  }, [initialCategory]);

  const filteredProducts = selectedCategory 
    ? MOCK_PRODUCTS.filter(p => p.category === selectedCategory)
    : MOCK_PRODUCTS;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-4">
        <div>
          <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight">{title}</h1>
          <p className="text-gray-500 font-merriweather italic">Khám phá bộ sưu tập thời trang Pastel mới nhất.</p>
        </div>
        
        <div className="relative">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center gap-3 px-8 py-3.5 bg-white/60 rounded-2xl border border-white/30 font-bold font-montserrat uppercase text-sm tracking-widest hover:bg-white transition-all shadow-sm active:scale-95"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#90CAF9]" />
            {selectedCategory ? `Lọc: ${selectedCategory}` : 'Bộ lọc sản phẩm'}
            <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${isFilterOpen ? 'rotate-180' : ''}`} />
          </button>

          {isFilterOpen && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setIsFilterOpen(false)}
              ></div>
              <div className="absolute right-0 mt-3 w-64 bg-white/95 backdrop-blur-xl border border-white/30 rounded-3xl shadow-2xl z-20 py-4 overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300">
                <div className="px-6 py-2 mb-2 border-b border-gray-100">
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Chọn danh mục</span>
                </div>
                {CATEGORIES.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => {
                      setSelectedCategory(cat.value);
                      setIsFilterOpen(false);
                    }}
                    className={`w-full px-6 py-3 text-left flex items-center justify-between font-montserrat text-sm font-bold transition-colors ${
                      selectedCategory === cat.value 
                        ? 'bg-[#90CAF9]/10 text-[#2C3E50]' 
                        : 'text-gray-500 hover:bg-gray-50 hover:text-[#90CAF9]'
                    }`}
                  >
                    {cat.label}
                    {selectedCategory === cat.value && <Check className="w-4 h-4 text-[#90CAF9]" />}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map((product) => (
          <div 
            key={product.id} 
            className="bg-white/40 p-4 rounded-[32px] border border-white/30 hover:shadow-xl transition-all group relative"
          >
            <div className="absolute top-6 left-6 z-10 bg-white/80 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/50 shadow-sm flex items-center gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
              <Hash className="w-2.5 h-2.5 text-[#90CAF9]" />
              <span className="text-[8px] font-black font-montserrat tracking-widest">{product.productCode}</span>
            </div>
            <div className="relative aspect-[3/4] rounded-[24px] overflow-hidden mb-4 cursor-pointer" onClick={() => onProductClick(product.id)}>
              <img 
                src={product.images[0]} 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                alt={product.name}
              />
              <button className="absolute top-4 right-4 p-2 bg-white/80 rounded-full hover:bg-[#FFD1FF] transition-colors shadow-lg">
                <Heart className="w-5 h-5 text-[#2C3E50]" />
              </button>
            </div>
            <div className="px-2">
              <h3 className="font-bold text-lg mb-1 font-montserrat uppercase tracking-tight truncate">{product.name}</h3>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1 text-xs text-gray-500 font-fredoka">
                  <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-[#2C3E50]">{product.rating}</span>
                </div>
                <div className="text-right">
                  <p className="font-bold text-[#2C3E50] font-baloo">{(product.discountPrice || product.basePrice).toLocaleString()}đ</p>
                  {product.discountPrice && (
                    <p className="text-[10px] text-gray-400 line-through italic font-merriweather">{product.basePrice.toLocaleString()}đ</p>
                  )}
                </div>
              </div>
              <Button 
                className="w-full mt-4 !py-2 !px-4 text-xs !font-montserrat uppercase"
                onClick={() => onAddToCart(product.id)}
              >
                Thêm vào giỏ
              </Button>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="text-center py-24 bg-white/20 rounded-[40px] border border-dashed border-gray-300">
          <p className="font-merriweather italic text-gray-500">Hiện tại chưa có sản phẩm nào trong danh mục này.</p>
        </div>
      )}
    </div>
  );
};

export default Products;
