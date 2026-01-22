
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import Button from '../components/Common/Button';
import { Sparkles, ArrowLeft, RefreshCw, Palette, Star, Send } from 'lucide-react';

interface Look {
  title: string;
  description: string;
  items: string[];
}

const AILookbook: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [looks, setLooks] = useState<Look[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [userInput, setUserInput] = useState('');

  const generateLookbook = async (prompt?: string) => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const finalPrompt = prompt 
        ? `Tạo 3 bộ phối đồ thời trang pastel (lookbook) dựa trên yêu cầu: "${prompt}".`
        : "Tạo 3 bộ phối đồ thời trang pastel (lookbook) mang phong cách KANT: sang trọng, tối giản, thanh khiết.";

      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `${finalPrompt} 
        Trả về kết quả dưới dạng JSON là một mảng gồm các đối tượng có cấu trúc: { "title": "tên bộ phối", "description": "mô tả cảm hứng", "items": ["món đồ 1", "món đồ 2"] }. 
        Ngôn ngữ: Tiếng Việt.`,
        config: {
          responseMimeType: 'application/json'
        }
      });

      const data = JSON.parse(response.text || '[]');
      setLooks(data);
    } catch (error) {
      console.error(error);
      setLooks([
        {
          title: "Sương Sớm Hồ Tây",
          description: "Sự kết hợp hoàn hảo giữa áo Blazer xanh pastel và quần lụa trắng.",
          items: ["Áo Blazer KANT", "Quần lụa trắng", "Giày loafer kem"]
        }
      ]);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-16 gap-8">
        <div className="flex items-center gap-6">
          <button 
            onClick={onBack}
            className="p-4 bg-white/60 rounded-full hover:bg-white transition-all shadow-sm group"
          >
            <ArrowLeft className="w-6 h-6 text-gray-500 group-hover:text-[#90CAF9]" />
          </button>
          <div>
            <h1 className="text-4xl md:text-5xl font-black font-montserrat uppercase tracking-tight flex items-center gap-3">
              AI Lookbook <Sparkles className="w-8 h-8 text-[#90CAF9] animate-pulse" />
            </h1>
            <p className="text-gray-500 font-merriweather italic mt-2">Gợi ý phối đồ thông minh từ trợ lý AI KANT</p>
          </div>
        </div>

        <div className="flex gap-4 w-full md:w-auto">
          <div className="relative flex-1 md:w-80">
            <input 
              type="text" 
              placeholder="Bạn muốn phối đồ đi đâu? (Ví dụ: Dự tiệc tối...)"
              className="w-full pl-6 pr-14 py-4 rounded-3xl bg-white border border-white/20 shadow-xl focus:outline-none focus:ring-2 focus:ring-[#90CAF9] font-montserrat text-sm"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && generateLookbook(userInput)}
            />
            <button 
              onClick={() => generateLookbook(userInput)}
              className="absolute right-2 top-2 bottom-2 px-4 bg-[#90CAF9] text-white rounded-2xl hover:bg-[#64B5F6] transition-all"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {!looks.length && !isGenerating ? (
        <div className="text-center py-32 bg-white/40 rounded-[60px] border border-white/30 shadow-inner">
          <div className="w-24 h-24 rounded-[30px] kant-gradient flex items-center justify-center text-white mx-auto mb-10 shadow-2xl animate-bounce">
            <Palette className="w-12 h-12" />
          </div>
          <h2 className="text-3xl font-black font-montserrat uppercase mb-6 tracking-tight">Khởi tạo phong cách của bạn</h2>
          <p className="text-gray-500 max-w-lg mx-auto mb-10 font-merriweather text-lg">
            Nhấn nút bên dưới để AI KANT phân tích và gợi ý cho bạn những bộ phối đồ pastel thời thượng nhất.
          </p>
          <Button 
            className="!px-16 !py-5 text-xl font-black font-montserrat uppercase tracking-widest shadow-blue-200"
            onClick={() => generateLookbook()}
          >
            Bắt đầu gợi ý
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {isGenerating ? (
            Array(3).fill(0).map((_, i) => (
              <div key={i} className="bg-white/40 rounded-[45px] p-8 border border-white/30 h-[450px] animate-pulse">
                <div className="w-full h-56 bg-white/60 rounded-3xl mb-8"></div>
                <div className="h-6 bg-white/60 rounded-full w-2/3 mb-4"></div>
                <div className="h-4 bg-white/60 rounded-full w-full mb-2"></div>
                <div className="h-4 bg-white/60 rounded-full w-4/5"></div>
              </div>
            ))
          ) : (
            looks.map((look, idx) => (
              <div 
                key={idx} 
                className="bg-white/60 rounded-[45px] p-10 border border-white/40 shadow-xl hover:shadow-2xl transition-all duration-500 group relative overflow-hidden"
              >
                <div className="absolute top-0 left-0 w-full h-2 kant-gradient opacity-60"></div>
                <div className="mb-8">
                  <span className="text-[10px] font-black uppercase tracking-[0.3em] text-[#90CAF9] mb-3 block font-montserrat">Gợi ý #{idx + 1}</span>
                  <h3 className="text-3xl font-black font-montserrat uppercase leading-tight text-[#2C3E50]">{look.title}</h3>
                </div>
                
                <p className="text-gray-500 font-merriweather italic text-sm leading-relaxed mb-8 border-l-4 border-[#FFD1FF] pl-6 py-2">
                  "{look.description}"
                </p>

                <div className="space-y-4 mb-10">
                  <h4 className="text-[10px] font-black uppercase tracking-widest text-gray-400">Danh sách món đồ:</h4>
                  <ul className="space-y-3">
                    {look.items.map((item, i) => (
                      <li key={i} className="flex items-center gap-3 text-sm font-bold font-montserrat group-hover:translate-x-2 transition-transform duration-300">
                        <div className="w-2 h-2 rounded-full bg-[#F48FB1]"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <Button className="w-full !py-4 text-xs font-black uppercase tracking-widest bg-white/60 !text-[#90CAF9] border border-[#90CAF9]/20 hover:bg-[#90CAF9] hover:text-white transition-all shadow-none">
                  Xem sản phẩm tương tự
                </Button>
              </div>
            ))
          )}
        </div>
      )}

      {looks.length > 0 && !isGenerating && (
        <div className="mt-20 text-center">
          <Button 
            type="outline" 
            className="flex items-center gap-3 mx-auto !px-12 border-2 hover:bg-[#90CAF9] hover:text-white"
            onClick={() => generateLookbook(userInput)}
          >
            <RefreshCw className="w-5 h-5" /> ĐỔI GỢI Ý KHÁC
          </Button>
        </div>
      )}
    </div>
  );
};

export default AILookbook;
