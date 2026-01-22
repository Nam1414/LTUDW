
import React, { useState, useRef, useEffect } from 'react';
import { GoogleGenAI } from '@google/genai';
import { Send, User, Bot, Sparkles, ChevronLeft } from 'lucide-react';
import Button from '../components/Common/Button';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SupportChat: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Chào bạn! Tôi là trợ lý ảo của KANT. Tôi có thể giúp gì cho bạn về đơn hàng, chính sách đổi trả hay tư vấn phong cách hôm nay không?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim() || isTyping) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: userMsg,
        config: {
          systemInstruction: 'Bạn là một chuyên viên chăm sóc khách hàng tận tâm và sang trọng của KANT - thương hiệu thời trang Pastel cao cấp. Hãy trả lời khách hàng bằng tiếng Việt, giọng văn nhẹ nhàng, lịch sự và chuyên nghiệp. Nếu khách hỏi về đơn hàng, hãy bảo họ cung cấp mã đơn (ví dụ KANT001) để được hỗ trợ tốt nhất.'
        }
      });

      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'Xin lỗi, tôi gặp chút trục trặc. Bạn có thể nhắc lại được không?' }]);
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, { role: 'assistant', content: 'Hệ thống đang bận một chút, bạn vui lòng quay lại sau giây lát nhé!' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 h-[80vh] flex flex-col">
      <div className="flex items-center gap-4 mb-8">
        <button onClick={onBack} className="p-3 bg-white/60 rounded-full hover:bg-white transition-all shadow-sm">
          <ChevronLeft className="w-5 h-5 text-gray-500" />
        </button>
        <div>
          <h1 className="text-3xl font-black font-montserrat uppercase tracking-tight flex items-center gap-2">
            Hỗ trợ khách hàng <Sparkles className="w-6 h-6 text-[#F48FB1]" />
          </h1>
          <p className="text-gray-400 font-merriweather italic text-xs">Phản hồi tức thì bởi AI KANT</p>
        </div>
      </div>

      <div className="flex-1 bg-white/40 border border-white/30 rounded-[40px] shadow-2xl overflow-hidden flex flex-col">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`flex gap-4 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-2xl flex-shrink-0 flex items-center justify-center shadow-md ${msg.role === 'user' ? 'bg-[#90CAF9] text-white' : 'kant-gradient text-white'}`}>
                  {msg.role === 'user' ? <User className="w-5 h-5" /> : <Bot className="w-5 h-5" />}
                </div>
                <div className={`p-5 rounded-[25px] shadow-sm text-sm font-medium leading-relaxed ${msg.role === 'user' ? 'bg-white text-[#2C3E50] rounded-tr-none' : 'bg-white/80 text-[#2C3E50] rounded-tl-none border border-white/40'}`}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex gap-4">
                <div className="w-10 h-10 rounded-2xl kant-gradient flex items-center justify-center text-white shadow-md">
                  <Bot className="w-5 h-5 animate-pulse" />
                </div>
                <div className="p-5 bg-white/60 rounded-[25px] rounded-tl-none border border-white/40 flex gap-1">
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-100"></div>
                  <div className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-200"></div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="p-6 bg-white/60 border-t border-white/20">
          <div className="relative">
            <input 
              type="text" 
              placeholder="Nhập tin nhắn..."
              className="w-full pl-6 pr-16 py-4 rounded-full bg-white border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#90CAF9] font-montserrat"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            />
            <button 
              onClick={handleSend}
              disabled={!input.trim() || isTyping}
              className="absolute right-2 top-2 bottom-2 w-12 bg-[#90CAF9] text-white rounded-full flex items-center justify-center hover:bg-[#64B5F6] transition-all disabled:opacity-50"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SupportChat;
