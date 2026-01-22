
import React, { useState } from 'react';
import { Star, ChevronLeft, Search, Filter, MessageSquare, ShieldOff, Eye, Trash2, User, Calendar, Hash } from 'lucide-react';
import Button from '../../components/Common/Button';

interface AdminReviewsProps {
  onBack: () => void;
}

const MOCK_REVIEWS = [
  {
    id: 'R001',
    productName: 'Áo Blazer KANT Pastel',
    productImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop',
    customerName: 'Trần Mỹ Linh',
    rating: 5,
    comment: 'Sản phẩm quá tuyệt vời, form dáng rất chuẩn và màu sắc y hệt hình. Giao hàng cực nhanh!',
    date: '24/05/2024',
    status: 'visible',
    media: ['https://images.unsplash.com/photo-1548883354-94bcfe321cbb?w=400&auto=format&fit=crop']
  },
  {
    id: 'R002',
    productName: 'Áo thun KANT Signature',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&auto=format&fit=crop',
    customerName: 'Nguyễn Hoàng Nam',
    rating: 3,
    comment: 'Áo mặc mát nhưng size hơi rộng so với mình nghĩ. Hy vọng lần sau KANT tư vấn kỹ hơn.',
    date: '23/05/2024',
    status: 'visible',
    media: []
  },
  {
    id: 'R003',
    productName: 'Quần tây KANT Lưng Cao',
    productImage: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=200&auto=format&fit=crop',
    customerName: 'Phạm Gia Bảo',
    rating: 4,
    comment: 'Chất liệu vải rất thích, không nhăn. Tuy nhiên phí ship hơi cao.',
    date: '22/05/2024',
    status: 'hidden',
    media: []
  },
  {
    id: 'R004',
    productName: 'Áo Blazer KANT Pastel',
    productImage: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop',
    customerName: 'Hoàng Thị Thu',
    rating: 5,
    comment: 'Vải đẹp xỉu luôn mn ơi, shop tư vấn nhiệt tình lắm luôn ạ.',
    date: '21/05/2024',
    status: 'visible',
    media: ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=400&auto=format&fit=crop']
  },
  {
    id: 'R005',
    productName: 'Áo thun KANT Signature',
    productImage: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&auto=format&fit=crop',
    customerName: 'Lê Văn Tám',
    rating: 1,
    comment: 'Giao sai màu, mình đặt màu trắng mà giao màu kem. Thất vọng.',
    date: '20/05/2024',
    status: 'visible',
    media: []
  }
];

const AdminReviews: React.FC<AdminReviewsProps> = ({ onBack }) => {
  const [reviews, setReviews] = useState(MOCK_REVIEWS);
  const [filterRating, setFilterRating] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredReviews = reviews.filter(r => {
    const matchesRating = filterRating === null || r.rating === filterRating;
    const matchesSearch = r.productName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          r.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          r.comment.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesRating && matchesSearch;
  });

  const toggleStatus = (id: string) => {
    setReviews(prev => prev.map(r => r.id === id ? { ...r, status: r.status === 'visible' ? 'hidden' : 'visible' } : r));
  };

  const deleteReview = (id: string) => {
    if (window.confirm('Bạn có chắc chắn muốn xóa vĩnh viễn đánh giá này?')) {
      setReviews(prev => prev.filter(r => r.id !== id));
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-16">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-4 bg-white/60 rounded-full hover:bg-white transition-all shadow-sm group"
          >
            <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-[#90CAF9]" />
          </button>
          <div>
            <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight">Quản lý đánh giá</h1>
            <p className="text-gray-500 font-merriweather italic text-sm mt-1">Lắng nghe và quản lý ý kiến từ khách hàng KANT</p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input 
              type="text" 
              placeholder="Tìm theo sản phẩm, khách hàng..."
              className="pl-12 pr-6 py-3 bg-white border border-white/20 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 shadow-sm font-montserrat text-xs w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex bg-white/60 p-1.5 rounded-2xl border border-white/40 shadow-sm">
             <button 
                onClick={() => setFilterRating(null)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filterRating === null ? 'bg-[#90CAF9] text-white shadow-md' : 'text-gray-400 hover:text-[#90CAF9]'}`}
             >
                Tất cả
             </button>
             {[5, 4, 3, 2, 1].map(star => (
                <button 
                   key={star}
                   onClick={() => setFilterRating(star)}
                   className={`px-4 py-2 rounded-xl flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-all ${filterRating === star ? 'bg-[#90CAF9] text-white shadow-md' : 'text-gray-400 hover:text-[#90CAF9]'}`}
                >
                   {star} <Star className={`w-3 h-3 ${filterRating === star ? 'fill-white' : ''}`} />
                </button>
             ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8">
        {filteredReviews.length > 0 ? (
          filteredReviews.map((review) => (
            <div 
              key={review.id} 
              className={`bg-white/60 rounded-[40px] border border-white/40 p-10 shadow-xl transition-all relative overflow-hidden group ${review.status === 'hidden' ? 'opacity-60' : ''}`}
            >
               {review.status === 'hidden' && (
                  <div className="absolute top-0 right-0 p-6">
                     <span className="bg-red-500 text-white text-[8px] font-black uppercase px-3 py-1 rounded-full shadow-sm tracking-widest">Đã ẩn</span>
                  </div>
               )}

               <div className="flex flex-col lg:flex-row gap-10">
                  {/* Cột trái: Thông tin sản phẩm & Khách hàng */}
                  <div className="lg:w-1/3 space-y-6">
                     <div className="flex items-center gap-4">
                        <div className="w-16 h-20 rounded-2xl overflow-hidden shadow-md border-2 border-white flex-shrink-0">
                           <img src={review.productImage} className="w-full h-full object-cover" alt={review.productName} />
                        </div>
                        <div>
                           <h4 className="text-[10px] font-black uppercase tracking-widest text-[#90CAF9] mb-1">Sản phẩm</h4>
                           <h3 className="text-lg font-black font-montserrat leading-tight text-[#2C3E50]">{review.productName}</h3>
                        </div>
                     </div>

                     <div className="p-6 bg-white/40 rounded-[30px] border border-white/20 space-y-3">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500 shadow-inner">
                              <User className="w-5 h-5" />
                           </div>
                           <div>
                              <p className="text-sm font-black font-montserrat">{review.customerName}</p>
                              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Khách hàng KANT</p>
                           </div>
                        </div>
                        <div className="flex items-center gap-4 text-[10px] text-gray-400 font-black uppercase tracking-widest">
                           <span className="flex items-center gap-1.5"><Calendar className="w-3 h-3" /> {review.date}</span>
                           <span className="flex items-center gap-1.5"><Hash className="w-3 h-3" /> {review.id}</span>
                        </div>
                     </div>
                  </div>

                  {/* Cột phải: Nội dung đánh giá & Hành động */}
                  <div className="flex-1 space-y-6">
                     <div className="flex items-center gap-2 mb-2">
                        {[1, 2, 3, 4, 5].map(s => (
                           <Star key={s} className={`w-6 h-6 ${review.rating >= s ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />
                        ))}
                        <span className="ml-2 text-xl font-black font-montserrat text-[#2C3E50]">{review.rating}/5</span>
                     </div>

                     <div className="relative p-8 bg-white/80 rounded-[40px] border border-white shadow-inner font-merriweather italic text-[#2C3E50] leading-relaxed">
                        <p className="text-lg">"{review.comment}"</p>
                     </div>

                     {review.media.length > 0 && (
                        <div className="flex gap-4">
                           {review.media.map((img, i) => (
                              <div key={i} className="w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-md hover:scale-105 transition-transform cursor-pointer">
                                 <img src={img} className="w-full h-full object-cover" alt="review media" />
                              </div>
                           ))}
                        </div>
                     )}

                     <div className="pt-6 border-t border-white/40 flex flex-wrap gap-4 items-center justify-between">
                        <div className="flex gap-4">
                           <button 
                              onClick={() => toggleStatus(review.id)}
                              className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${review.status === 'visible' ? 'bg-gray-100 text-gray-500 hover:bg-orange-50 hover:text-orange-500' : 'bg-[#90CAF9] text-white shadow-md'}`}
                           >
                              {review.status === 'visible' ? <><ShieldOff className="w-4 h-4" /> Ẩn đánh giá</> : <><Eye className="w-4 h-4" /> Hiện đánh giá</>}
                           </button>
                           <button 
                              className="flex items-center gap-2 px-6 py-2.5 bg-[#FFD1FF] text-[#2C3E50] rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-[#F48FB1] hover:text-white transition-all shadow-sm"
                           >
                              <MessageSquare className="w-4 h-4" /> Phản hồi
                           </button>
                        </div>
                        <button 
                           onClick={() => deleteReview(review.id)}
                           className="flex items-center gap-2 px-6 py-2.5 bg-red-50 text-red-500 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-red-500 hover:text-white transition-all shadow-sm"
                        >
                           <Trash2 className="w-4 h-4" /> Xóa vĩnh viễn
                        </button>
                     </div>
                  </div>
               </div>
            </div>
          ))
        ) : (
          <div className="text-center py-32 bg-white/20 rounded-[60px] border border-dashed border-gray-300 animate-in fade-in duration-500">
             <Filter className="w-20 h-20 text-gray-200 mx-auto mb-6" />
             <p className="text-xl font-black font-montserrat uppercase text-gray-300 tracking-widest">Không có đánh giá nào khớp với bộ lọc</p>
             <button onClick={() => {setFilterRating(null); setSearchTerm('');}} className="mt-6 text-[#90CAF9] font-black uppercase text-xs tracking-[0.2em] hover:underline">Xóa tất cả bộ lọc</button>
          </div>
        )}
      </div>

      <div className="mt-20 text-center p-10 bg-white/40 rounded-[50px] border border-white/20 shadow-inner">
         <h4 className="text-xl font-black font-montserrat uppercase text-[#2C3E50] mb-4">Tổng quan đánh giá tuần này</h4>
         <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="space-y-1"><p className="text-4xl font-black text-[#90CAF9]">4.8/5</p><p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Điểm đánh giá TB</p></div>
            <div className="space-y-1"><p className="text-4xl font-black text-[#F48FB1]">124</p><p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Lượt đánh giá mới</p></div>
            <div className="space-y-1"><p className="text-4xl font-black text-green-500">92%</p><p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Tỉ lệ hài lòng</p></div>
            <div className="space-y-1"><p className="text-4xl font-black text-orange-400">15</p><p className="text-[10px] font-black uppercase tracking-widest text-gray-400">Cần phản hồi gấp</p></div>
         </div>
      </div>
    </div>
  );
};

export default AdminReviews;
