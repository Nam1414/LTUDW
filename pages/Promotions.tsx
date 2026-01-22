
import React, { useState } from 'react';
import { Ticket, Copy, CheckCircle2, ChevronLeft, Sparkles, Gift } from 'lucide-react';
import Button from '../components/Common/Button';
import { VOUCHERS } from '../constants';

interface PromotionsProps {
  onBack: () => void;
}

const Promotions: React.FC<PromotionsProps> = ({ onBack }) => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <div className="flex items-center gap-6 mb-16">
        <button 
          onClick={onBack}
          className="p-4 bg-white/60 rounded-full hover:bg-white transition-all shadow-sm group"
        >
          <ChevronLeft className="w-6 h-6 text-gray-500 group-hover:text-[#90CAF9]" />
        </button>
        <div>
          <h1 className="text-5xl font-black font-montserrat uppercase tracking-tight flex items-center gap-4">
            Ưu đãi từ KANT <Sparkles className="w-8 h-8 text-[#90CAF9] animate-pulse" />
          </h1>
          <p className="text-gray-500 font-merriweather italic text-lg mt-2">Dành riêng những điều ngọt ngào nhất cho bạn</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        {VOUCHERS.map((v) => (
          <div 
            key={v.id} 
            className="flex bg-white rounded-[40px] shadow-xl border border-white/50 overflow-hidden relative group hover:scale-[1.02] transition-all duration-500"
          >
            <div className={`w-36 bg-gradient-to-br ${v.color} flex flex-col items-center justify-center p-6 text-white relative`}>
               <div className="absolute top-0 bottom-0 left-0 w-2 flex flex-col justify-around">
                  {Array(10).fill(0).map((_, i) => (
                    <div key={i} className="w-4 h-4 rounded-full bg-[#E3F2FD] -ml-2 shadow-inner"></div>
                  ))}
               </div>
               <Ticket className="w-10 h-10 mb-4 opacity-50" />
               <span className="text-[10px] font-black uppercase tracking-[0.3em] rotate-180 [writing-mode:vertical-lr]">VOUCHER</span>
            </div>

            <div className="flex-1 p-8 space-y-6 flex flex-col justify-between">
               <div>
                  <h3 className="text-2xl font-black font-montserrat uppercase leading-tight text-[#2C3E50]">{v.title}</h3>
                  <p className="text-gray-400 font-merriweather italic text-sm mt-3 leading-relaxed">{v.desc}</p>
               </div>

               <div className="flex items-center justify-between pt-6 border-t border-dashed border-gray-100">
                  <div className="space-y-1">
                     <span className="text-[10px] font-black uppercase tracking-widest text-gray-300">Hạn sử dụng:</span>
                     <p className="text-sm font-bold text-[#2C3E50]">{v.expiry}</p>
                  </div>
                  
                  <div className="relative">
                     <button 
                        onClick={() => handleCopy(v.code)}
                        className={`px-6 py-3 rounded-2xl flex items-center gap-3 font-black uppercase text-xs tracking-widest transition-all ${
                          copiedCode === v.code 
                          ? 'bg-green-500 text-white shadow-green-100' 
                          : 'bg-[#E3F2FD] text-[#90CAF9] hover:bg-[#90CAF9] hover:text-white'
                        }`}
                     >
                        {copiedCode === v.code ? (
                           <><CheckCircle2 className="w-4 h-4" /> ĐÃ LƯU</>
                        ) : (
                           <><Copy className="w-4 h-4" /> {v.code}</>
                        )}
                     </button>
                  </div>
               </div>
            </div>

            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
               <Gift className="w-6 h-6 text-[#F48FB1]" />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-20 text-center text-gray-400 font-merriweather italic">
        * Lưu ý: Sao chép mã và nhập tại bước thanh toán để áp dụng ưu đãi.
      </div>
    </div>
  );
};

export default Promotions;
