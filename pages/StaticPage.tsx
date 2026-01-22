
import React from 'react';
import { ChevronLeft } from 'lucide-react';

interface StaticPageProps {
  title: string;
  onBack: () => void;
  content: React.ReactNode;
}

const StaticPage: React.FC<StaticPageProps> = ({ title, onBack, content }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-[#90CAF9] font-bold font-montserrat uppercase text-xs tracking-widest mb-8 hover:-translate-x-2 transition-transform"
      >
        <ChevronLeft className="w-4 h-4" /> Quay lại
      </button>
      <div className="bg-white/40 p-12 rounded-[50px] border border-white/30 shadow-2xl">
        <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight mb-12 text-[#2C3E50] border-b border-white/20 pb-8">
          {title}
        </h1>
        <div className="prose prose-blue max-w-none font-merriweather text-gray-600 leading-relaxed space-y-6">
          {content}
        </div>
      </div>
    </div>
  );
};

export default StaticPage;
