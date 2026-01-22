
import React, { useState } from 'react';
import Button from '../../components/Common/Button';
import Logo from '../../components/Common/Logo';
import { ShieldCheck, RefreshCw } from 'lucide-react';

interface VerifyOTPProps {
  contactInfo: string;
  onVerifySuccess: () => void;
  onBack: () => void;
}

const VerifyOTP: React.FC<VerifyOTPProps> = ({ contactInfo, onVerifySuccess, onBack }) => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    // Giả lập mã OTP đúng là 123456
    if (otp === '123456') {
      onVerifySuccess();
    } else {
      setError('Mã xác nhận sai!');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md bg-white/60 backdrop-blur-xl p-10 rounded-[40px] border border-white/40 shadow-2xl space-y-8">
        <div className="text-center">
          <Logo size="md" />
          <div className="w-16 h-16 bg-[#90CAF9]/20 rounded-2xl flex items-center justify-center text-[#90CAF9] mx-auto mt-6 shadow-inner">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-black font-montserrat uppercase tracking-tight mt-6">Xác thực tài khoản</h2>
          <p className="text-gray-500 font-merriweather italic text-sm mt-3 px-4">
            Mã OTP đã được gửi đến <span className="text-[#2C3E50] font-bold">{contactInfo}</span>. Vui lòng kiểm tra và nhập mã bên dưới.
          </p>
        </div>

        <form onSubmit={handleVerify} className="space-y-6">
          <div className="space-y-2">
            <input 
              type="text" 
              required
              maxLength={6}
              placeholder="123456"
              className={`w-full text-center tracking-[1em] text-2xl font-black py-4 bg-white rounded-2xl border focus:outline-none focus:ring-4 transition-all ${
                error ? 'border-red-300 ring-red-100 text-red-500' : 'border-white/20 ring-[#90CAF9]/20 text-[#2C3E50]'
              }`}
              value={otp}
              onChange={(e) => {
                setOtp(e.target.value);
                setError('');
              }}
            />
            {error && <p className="text-center text-xs font-bold text-red-400 animate-bounce">{error}</p>}
          </div>

          <Button className="w-full !py-4 text-sm font-black uppercase tracking-[0.2em]">
            Xác nhận mã
          </Button>
        </form>

        <div className="text-center pt-4 space-y-4">
          <button className="flex items-center gap-2 mx-auto text-gray-400 font-bold text-xs uppercase tracking-widest hover:text-[#90CAF9] transition-all">
            <RefreshCw className="w-4 h-4" /> Gửi lại mã sau 60s
          </button>
          <button 
            onClick={onBack}
            className="text-xs font-bold text-[#F48FB1] uppercase tracking-widest hover:underline"
          >
            Quay lại đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
