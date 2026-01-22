
import React, { useState } from 'react';
import { Star, Camera, Video, ChevronLeft, Sparkles, Send, CheckCircle2, Trash2 } from 'lucide-react';
import Button from '../components/Common/Button';

interface ProductReviewProps {
  order: any;
  onBack: () => void;
}

const ProductReview: React.FC<ProductReviewProps> = ({ order, onBack }) => {
  const [reviews, setReviews] = useState<Record<string, { rating: number; comment: string; media: string[] }>>(
    order.items.reduce((acc: any, item: any) => {
      acc[item.sku] = { rating: 5, comment: '', media: [] };
      return acc;
    }, {})
  );

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleRatingChange = (sku: string, rating: number) => {
    setReviews(prev => ({
      ...prev,
      [sku]: { ...prev[sku], rating }
    }));
  };

  const handleCommentChange = (sku: string, comment: string) => {
    setReviews(prev => ({
      ...prev,
      [sku]: { ...prev[sku], comment }
    }));
  };

  const handleAddMedia = (sku: string) => {
    // Giả lập chọn ảnh ngẫu nhiên từ Unsplash để minh họa
    const randomImg = `https://images.unsplash.com/photo-${Math.floor(Math.random() * 10000000)}?w=400&auto=format&fit=crop`;
    setReviews(prev => ({
      ...prev,
      [sku]: { ...prev[sku], media: [...prev[sku].media, randomImg] }
    }));
  };

  const handleRemoveMedia = (sku: string, mediaIdx: number) => {
    setReviews(prev => ({
      ...prev,
      [sku]: { ...prev[sku], media: prev[sku].media.filter((_, idx) => idx !== mediaIdx) }
    }));
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Giả lập gửi đánh giá
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 1500);
  };

  if (isSubmitted) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        <div className="w-24 h-24 rounded-[40px] kant-gradient flex items-center justify-center text-white mx-auto mb-8 shadow-2xl animate-in zoom-in duration-500">
          <CheckCircle2 className="w-12 h-12" />
        </div>
        <h2 className="text-4xl font-black font-montserrat uppercase tracking-tight mb-4">Cảm ơn bạn!</h2>
        <p className="text-gray-500 font-merriweather italic text-lg mb-10 leading-relaxed">
          Đánh giá của bạn đã được gửi thành công. KANT luôn trân trọng những ý kiến từ bạn để ngày càng hoàn thiện hơn.
        </p>
        <Button onClick={onBack} className="!px-12 !py-4 font-black uppercase tracking-widest text-xs">
          Quay lại đơn hàng
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <div className="flex items-center gap-6 mb-12">
        <button onClick={onBack} className="p-4 bg-white/60 rounded-full hover:bg-white transition-all shadow-sm group">
          <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-[#90CAF9]" />
        </button>
        <div>
          <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight flex items-center gap-3">
            Đánh giá sản phẩm <Sparkles className="w-7 h-7 text-[#F48FB1]" />
          </h1>
          <p className="text-gray-500 font-merriweather italic text-sm mt-1">Đơn hàng #{order.code} • Chia sẻ trải nghiệm của bạn về KANT</p>
        </div>
      </div>

      <div className="space-y-12 mb-16">
        {order.items.map((item: any) => (
          <div key={item.sku} className="bg-white/40 border border-white/30 rounded-[50px] p-10 shadow-xl space-y-8 animate-in slide-in-from-bottom-8 duration-500">
            <div className="flex items-center gap-6 pb-6 border-b border-white/20">
              <div className="w-20 h-24 bg-white/60 rounded-2xl border border-white/40 overflow-hidden shadow-inner flex-shrink-0">
                <img src={`https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=200&auto=format&fit=crop`} className="w-full h-full object-cover opacity-80" alt={item.name} />
              </div>
              <div>
                <h3 className="text-xl font-black font-montserrat uppercase leading-tight">{item.name}</h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-[#90CAF9] mt-2">Phân loại: {item.color} / {item.size}</p>
                <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase">Mã sản phẩm: {item.sku}</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Chất lượng sản phẩm</h4>
                <div className="flex gap-3">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button 
                      key={star}
                      onClick={() => handleRatingChange(item.sku, star)}
                      className="group transition-transform active:scale-90"
                    >
                      <Star 
                        className={`w-10 h-10 transition-colors duration-300 ${
                          reviews[item.sku].rating >= star 
                          ? 'fill-yellow-400 text-yellow-400' 
                          : 'text-gray-200 group-hover:text-yellow-200'
                        }`} 
                      />
                    </button>
                  ))}
                  <span className="ml-4 text-2xl font-black font-montserrat text-[#2C3E50]">
                    {reviews[item.sku].rating}/5
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Cảm nhận của bạn</h4>
                <textarea 
                  value={reviews[item.sku].comment}
                  onChange={(e) => handleCommentChange(item.sku, e.target.value)}
                  placeholder="Hãy chia sẻ thêm về chất liệu, form dáng và sự hài lòng của bạn..."
                  className="w-full h-32 p-6 bg-white/60 rounded-[30px] border border-white/20 focus:outline-none focus:ring-4 focus:ring-[#90CAF9]/20 font-merriweather text-sm leading-relaxed"
                />
              </div>

              <div className="space-y-4">
                <h4 className="text-xs font-black uppercase tracking-[0.2em] text-gray-400">Hình ảnh & Video thực tế</h4>
                <div className="flex flex-wrap gap-4">
                  {reviews[item.sku].media.map((url, mIdx) => (
                    <div key={mIdx} className="relative w-24 h-24 rounded-2xl overflow-hidden border-2 border-white shadow-sm group">
                      <img src={url} className="w-full h-full object-cover" alt="review" />
                      <button 
                        onClick={() => handleRemoveMedia(item.sku, mIdx)}
                        className="absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}
                  <button 
                    onClick={() => handleAddMedia(item.sku)}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#90CAF9]/40 flex flex-col items-center justify-center gap-2 text-[#90CAF9] hover:bg-[#E3F2FD] transition-all"
                  >
                    <Camera className="w-6 h-6" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Thêm ảnh</span>
                  </button>
                  <button 
                    onClick={() => handleAddMedia(item.sku)}
                    className="w-24 h-24 rounded-2xl border-2 border-dashed border-[#F48FB1]/40 flex flex-col items-center justify-center gap-2 text-[#F48FB1] hover:bg-[#FFECF1] transition-all"
                  >
                    <Video className="w-6 h-6" />
                    <span className="text-[8px] font-black uppercase tracking-widest">Thêm video</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        <Button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="!px-20 !py-6 text-xl uppercase tracking-[0.3em] shadow-xl hover:scale-105"
        >
          {isSubmitting ? 'Đang gửi...' : 'Gửi đánh giá'}
        </Button>
      </div>
    </div>
  );
};

export default ProductReview;
