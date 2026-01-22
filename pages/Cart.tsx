
import React, { useState } from 'react';
import { MOCK_PRODUCTS, VOUCHERS } from '../constants';
import Button from '../components/Common/Button';
import { Trash2, Plus, Minus, Tag, ChevronRight, MapPin, CreditCard, Banknote, Save, AlertCircle, CheckCircle2, Lock, ShieldCheck, Printer, ArrowRight, Package, Clock, Mail, FileText, X } from 'lucide-react';
import { OrderStatus } from '../types';

interface CartProps {
  onCheckout: () => void;
  isAdmin?: boolean;
  userEmail?: string;
}

type CheckoutStep = 'cart' | 'verifying' | 'success';

const Cart: React.FC<CartProps> = ({ onCheckout, isAdmin = false, userEmail = 'khachhang@kant.vn' }) => {
  const [items, setItems] = useState([
    { productId: '1', variantId: 'v1', quantity: 1 },
    { productId: '2', variantId: 'v4', quantity: 2 }
  ]);
  const [coupon, setCoupon] = useState('');
  const [appliedVoucher, setAppliedVoucher] = useState<any>(null);
  const [couponError, setCouponError] = useState('');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart');
  const [verifyPassword, setVerifyPassword] = useState('');
  const [verifyError, setVerifyError] = useState('');
  const [orderId] = useState(`KANT-${Math.floor(1000 + Math.random() * 9000)}`);
  const [showAdminPrintModal, setShowAdminPrintModal] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);

  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [addressInfo, setAddressInfo] = useState({
    name: 'Nguyễn Văn A',
    phone: '0901234567',
    address: '123 Đường KANT, Phường Pastel, Quận Blue, TP. Hồ Chí Minh'
  });
  const [paymentMethod, setPaymentMethod] = useState<'visa' | 'cod'>('visa');

  const getProductData = (id: string) => MOCK_PRODUCTS.find(p => p.id === id);
  const getVariantData = (p: any, vId: string) => p.variants.find((v: any) => v.id === vId);

  const subtotal = items.reduce((acc, item) => {
    const p = getProductData(item.productId);
    const v = getVariantData(p, item.variantId);
    const priceToUse = p.discountPrice || p.basePrice;
    return acc + (priceToUse + v.priceModifier) * item.quantity;
  }, 0);

  const shipping = 35000;
  let discount = 0;
  let shippingDiscount = 0;

  if (appliedVoucher) {
    if (appliedVoucher.type === 'percentage') {
      discount = subtotal * appliedVoucher.value;
    } else if (appliedVoucher.type === 'shipping') {
      shippingDiscount = Math.min(shipping, appliedVoucher.value);
    }
  }

  const total = subtotal + (shipping - shippingDiscount) - discount;

  const handleApplyCoupon = () => {
    setCouponError('');
    const foundVoucher = VOUCHERS.find(v => v.code.toUpperCase() === coupon.trim().toUpperCase());
    
    if (!foundVoucher) {
      setCouponError('Mã giảm giá không tồn tại!');
      setAppliedVoucher(null);
      return;
    }

    if (subtotal < foundVoucher.minOrder) {
      setCouponError(`Đơn hàng tối thiểu ${foundVoucher.minOrder.toLocaleString()}đ để dùng mã này.`);
      setAppliedVoucher(null);
      return;
    }

    setAppliedVoucher(foundVoucher);
  };

  const handlePlaceOrder = () => {
    if (paymentMethod === 'visa') {
      setCheckoutStep('verifying');
    } else {
      setCheckoutStep('success');
    }
  };

  const handleVerifySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyPassword === '123456') {
      setCheckoutStep('success');
    } else {
      setVerifyError('Mật khẩu xác nhận không chính xác (Thử: 123456)');
    }
  };

  const handleSendElectronicInvoice = () => {
    setIsSendingEmail(true);
    // Giả lập gửi mail
    setTimeout(() => {
      setIsSendingEmail(false);
      alert(`Hóa đơn điện tử PDF đã được gửi đến email: ${userEmail}`);
    }, 2000);
  };

  const handlePrintPaperInvoice = () => {
    setShowAdminPrintModal(false);
    window.print();
  };

  if (checkoutStep === 'verifying') {
    return (
      <div className="max-w-md mx-auto py-24 px-4 animate-in fade-in zoom-in duration-500">
        <div className="bg-white p-10 rounded-[40px] shadow-2xl border border-blue-50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 kant-gradient"></div>
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-[#90CAF9] mx-auto mb-6">
              <ShieldCheck className="w-10 h-10" />
            </div>
            <h2 className="text-2xl font-black font-montserrat uppercase tracking-tight">Xác thực thanh toán</h2>
            <p className="text-gray-500 font-merriweather italic text-xs mt-3">Vui lòng nhập mật khẩu tài khoản KANT của bạn để hoàn tất giao dịch bằng thẻ Visa.</p>
          </div>

          <form onSubmit={handleVerifySubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Mật khẩu xác nhận</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-300" />
                <input 
                  type="password" 
                  autoFocus
                  className="w-full pl-12 pr-4 py-4 bg-gray-50 border border-gray-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat"
                  placeholder="••••••••"
                  value={verifyPassword}
                  onChange={(e) => {
                    setVerifyPassword(e.target.value);
                    setVerifyError('');
                  }}
                />
              </div>
              {verifyError && <p className="text-[10px] font-bold text-red-400 ml-1">{verifyError}</p>}
            </div>

            <div className="pt-4 space-y-4">
              <Button className="w-full !py-4 shadow-xl uppercase tracking-widest text-xs">Xác nhận thanh toán</Button>
              <button 
                type="button"
                onClick={() => setCheckoutStep('cart')}
                className="w-full text-[10px] font-black uppercase tracking-widest text-gray-400 hover:text-[#90CAF9] transition-all"
              >
                Quay lại giỏ hàng
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="max-w-4xl mx-auto py-16 px-4 animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="bg-white/80 backdrop-blur-xl rounded-[60px] shadow-2xl border border-white overflow-hidden relative">
          <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
            <CheckCircle2 className="w-64 h-64 text-green-500" />
          </div>

          <div className="p-10 md:p-16">
            <div className="text-center mb-12">
              <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner ring-8 ring-green-50/50">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight mb-2">Đặt hàng thành công!</h1>
              <p className="text-gray-500 font-merriweather italic">Cảm ơn bạn đã tin tưởng lựa chọn KANT Fashion Boutique.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12">
              <div className="space-y-6">
                <div className="p-8 bg-blue-50/30 rounded-[40px] border border-blue-100/50">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#90CAF9] mb-4">Chi tiết đơn hàng</h3>
                  <div className="space-y-4 font-montserrat">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase">Mã đơn hàng:</span>
                      <span className="font-black text-[#2C3E50]">{orderId}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase">Trạng thái:</span>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3 h-3 text-orange-400" />
                        <span className="font-black text-orange-400 text-xs uppercase">Đang xét duyệt</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase">Ngày đặt:</span>
                      <span className="font-bold text-sm text-gray-600">{new Date().toLocaleDateString('vi-VN')}</span>
                    </div>
                  </div>
                </div>

                <div className="p-8 bg-pink-50/30 rounded-[40px] border border-pink-100/50">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-[#F48FB1] mb-4">Thông tin thanh toán</h3>
                  <div className="space-y-4 font-montserrat">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400 text-xs font-bold uppercase">Phương thức:</span>
                      <span className="font-bold text-[#2C3E50]">{paymentMethod === 'visa' ? 'Thẻ Visa (Đã thanh toán)' : 'Thanh toán khi nhận hàng'}</span>
                    </div>
                    <div className="flex justify-between items-baseline pt-4 border-t border-white/40">
                      <span className="text-xs font-black uppercase text-[#2C3E50]">Tổng thanh toán:</span>
                      <span className="text-3xl font-black text-[#F48FB1] font-baloo">{total.toLocaleString()}đ</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-8 bg-gray-50/50 rounded-[40px] border border-gray-100 flex flex-col">
                <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-gray-400 mb-6">Sản phẩm đã chọn</h3>
                <div className="flex-1 space-y-6">
                  {items.map((item, idx) => {
                    const p = getProductData(item.productId);
                    const v = getVariantData(p, item.variantId);
                    return (
                      <div key={idx} className="flex gap-4">
                        <div className="w-12 h-16 rounded-xl overflow-hidden shadow-sm flex-shrink-0">
                          <img src={p.images[0]} className="w-full h-full object-cover" alt={p.name} />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-bold text-xs font-montserrat text-[#2C3E50] truncate uppercase">{p.name}</p>
                          <p className="text-[10px] text-gray-400 font-fredoka uppercase tracking-wider">{v.color} / {v.size} x{item.quantity}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="pt-6 mt-6 border-t border-gray-200">
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-[#90CAF9]" />
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-[#2C3E50]">{addressInfo.name}</p>
                      <p className="text-[10px] text-gray-400 truncate max-w-[200px]">{addressInfo.address}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button className="!px-12 !py-4 shadow-xl shadow-blue-100 flex items-center gap-3" onClick={onCheckout}>
                XEM ĐƠN HÀNG CỦA TÔI <ArrowRight className="w-4 h-4" />
              </Button>
              
              {/* Logic in hóa đơn */}
              {(isAdmin || (paymentMethod === 'visa')) && (
                <button 
                  className={`px-10 py-4 bg-white border border-gray-100 rounded-[20px] font-black uppercase text-[10px] tracking-widest hover:bg-gray-50 transition-all flex items-center justify-center gap-3 ${isSendingEmail ? 'opacity-50 cursor-wait' : ''}`}
                  onClick={() => {
                    if (isAdmin) {
                      setShowAdminPrintModal(true);
                    } else {
                      handleSendElectronicInvoice();
                    }
                  }}
                  disabled={isSendingEmail}
                >
                  {isSendingEmail ? (
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 border-2 border-[#90CAF9] border-t-transparent rounded-full animate-spin"></div>
                      ĐANG GỬI...
                    </div>
                  ) : (
                    <>
                      {isAdmin ? <Printer className="w-4 h-4" /> : <Mail className="w-4 h-4" />}
                      {isAdmin ? 'IN HÓA ĐƠN' : 'GỬI HÓA ĐƠN QUA EMAIL'}
                    </>
                  )}
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Modal lựa chọn in cho Admin */}
        {showAdminPrintModal && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white w-full max-w-sm rounded-[40px] p-8 shadow-2xl relative animate-in zoom-in duration-300">
               <button onClick={() => setShowAdminPrintModal(false)} className="absolute top-6 right-6 text-gray-300 hover:text-gray-500">
                 <X className="w-5 h-5" />
               </button>
               <h3 className="text-xl font-black font-montserrat uppercase tracking-tight mb-8 text-center">Tùy chọn in hóa đơn</h3>
               <div className="space-y-4">
                 <button 
                    onClick={handlePrintPaperInvoice}
                    className="w-full p-6 bg-blue-50/50 rounded-3xl border border-blue-100 flex items-center gap-4 hover:bg-blue-50 transition-all group"
                 >
                   <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                      <Printer className="w-6 h-6" />
                   </div>
                   <div className="text-left">
                     <p className="font-black font-montserrat uppercase text-xs tracking-widest">In bản giấy</p>
                     <p className="text-[10px] text-gray-400 font-merriweather italic">Sử dụng máy in vật lý tại cửa hàng</p>
                   </div>
                 </button>
                 <button 
                    onClick={() => {
                      setShowAdminPrintModal(false);
                      handleSendElectronicInvoice();
                    }}
                    className="w-full p-6 bg-pink-50/50 rounded-3xl border border-pink-100 flex items-center gap-4 hover:bg-pink-50 transition-all group"
                 >
                   <div className="w-12 h-12 rounded-2xl bg-white shadow-sm flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                      <FileText className="w-6 h-6" />
                   </div>
                   <div className="text-left">
                     <p className="font-black font-montserrat uppercase text-xs tracking-widest">In bản điện tử</p>
                     <p className="text-[10px] text-gray-400 font-merriweather italic">Gửi file PDF qua email khách hàng</p>
                   </div>
                 </button>
               </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-black font-montserrat uppercase tracking-tight mb-12">Giỏ hàng của bạn</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-6">
          {items.map((item, idx) => {
            const p = getProductData(item.productId);
            const v = getVariantData(p, item.variantId);
            const priceToUse = p.discountPrice || p.basePrice;
            return (
              <div key={idx} className="bg-white/40 p-6 rounded-[32px] border border-white/30 flex gap-6">
                <div className="w-24 h-32 rounded-2xl overflow-hidden flex-shrink-0">
                  <img src={p.images[0]} className="w-full h-full object-cover" alt={p.name} />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between">
                    <div>
                      <h3 className="font-bold text-lg font-montserrat">{p.name}</h3>
                      <p className="text-sm text-gray-400 font-fredoka uppercase tracking-wider">Phân loại: {v.color} / {v.size}</p>
                    </div>
                    <button className="text-red-300 hover:text-red-500 transition-colors">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-end">
                    <div className="flex items-center bg-white/60 rounded-xl border border-white/20 p-1 shadow-sm">
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><Minus className="w-4 h-4" /></button>
                      <span className="w-8 text-center font-bold font-montserrat">{item.quantity}</span>
                      <button className="p-1 hover:bg-gray-100 rounded-lg transition-colors"><Plus className="w-4 h-4" /></button>
                    </div>
                    <p className="font-bold text-[#2C3E50] font-baloo text-xl">{(priceToUse + v.priceModifier).toLocaleString()}đ</p>
                  </div>
                </div>
              </div>
            );
          })}

          <div className="space-y-4">
            <div className="bg-white/40 p-8 rounded-[40px] border border-white/30 shadow-lg relative overflow-hidden transition-all duration-500">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#90CAF9]/20 flex items-center justify-center">
                    <MapPin className="text-[#90CAF9] w-5 h-5" />
                  </div>
                  <h3 className="font-black font-montserrat uppercase tracking-wider">Địa chỉ giao hàng</h3>
                </div>
                <button 
                  onClick={() => setIsEditingAddress(!isEditingAddress)}
                  className={`px-5 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all shadow-sm flex items-center gap-2 border ${
                    isEditingAddress 
                    ? 'bg-[#90CAF9] text-white border-[#90CAF9]' 
                    : 'bg-white/80 text-[#90CAF9] border-[#90CAF9]/30 hover:bg-[#90CAF9] hover:text-white'
                  }`}
                >
                  {isEditingAddress ? <><Save className="w-3 h-3" /> Lưu thay đổi</> : 'Thay đổi'}
                </button>
              </div>
              
              <div className={`p-6 rounded-[24px] border border-white/40 relative z-10 transition-all ${isEditingAddress ? 'bg-white/90 shadow-inner' : 'bg-white/60'}`}>
                {isEditingAddress ? (
                  <div className="space-y-4 animate-in fade-in duration-300">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Họ tên người nhận</label>
                        <input 
                          type="text" 
                          value={addressInfo.name}
                          onChange={(e) => setAddressInfo({...addressInfo, name: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                        />
                      </div>
                      <div className="space-y-1">
                        <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Số điện thoại</label>
                        <input 
                          type="tel" 
                          value={addressInfo.phone}
                          onChange={(e) => setAddressInfo({...addressInfo, phone: e.target.value})}
                          className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Địa chỉ chi tiết</label>
                      <textarea 
                        value={addressInfo.address}
                        onChange={(e) => setAddressInfo({...addressInfo, address: e.target.value})}
                        className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-100 focus:outline-none focus:ring-2 focus:ring-[#90CAF9]/50 font-montserrat text-sm h-20 resize-none"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="animate-in fade-in duration-300">
                    <p className="font-bold text-lg font-montserrat mb-1">{addressInfo.name} <span className="text-gray-400 font-medium text-sm ml-2">| {addressInfo.phone}</span></p>
                    <p className="text-sm text-gray-500 font-merriweather italic">{addressInfo.address}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white/40 p-8 rounded-[40px] border border-white/30 shadow-lg relative overflow-hidden">
              <div className="flex items-center justify-between mb-6 relative z-10">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#F48FB1]/20 flex items-center justify-center">
                    {paymentMethod === 'visa' ? <CreditCard className="text-[#F48FB1] w-5 h-5" /> : <Banknote className="text-[#F48FB1] w-5 h-5" />}
                  </div>
                  <h3 className="font-black font-montserrat uppercase tracking-wider">Phương thức thanh toán</h3>
                </div>
                <button 
                  onClick={() => setPaymentMethod(prev => prev === 'visa' ? 'cod' : 'visa')}
                  className="px-5 py-2 rounded-full bg-white/80 border border-[#F48FB1]/30 text-[#F48FB1] text-[10px] font-black uppercase tracking-widest hover:bg-[#F48FB1] hover:text-white transition-all shadow-sm"
                >
                  Thay đổi
                </button>
              </div>

              <div className="flex items-center gap-5 p-6 bg-white/60 rounded-[24px] border border-white/40 relative z-10 transition-all">
                {paymentMethod === 'visa' ? (
                  <>
                    <div className="w-16 h-10 bg-gradient-to-r from-blue-700 to-blue-500 rounded-xl flex items-center justify-center text-[10px] text-white font-black italic shadow-inner animate-in slide-in-from-left-4 duration-500">VISA</div>
                    <div className="animate-in fade-in duration-500">
                      <p className="font-bold font-montserrat text-lg">Thẻ Visa •••• 1234</p>
                      <p className="text-[10px] text-gray-400 font-fredoka uppercase tracking-widest">Hết hạn: 12/26</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="w-16 h-10 bg-gradient-to-r from-green-600 to-green-400 rounded-xl flex items-center justify-center text-[#2C3E50] shadow-inner animate-in slide-in-from-left-4 duration-500">
                      <Banknote className="w-6 h-6" />
                    </div>
                    <div className="animate-in fade-in duration-500">
                      <p className="font-bold font-montserrat text-lg">Thanh toán khi nhận hàng</p>
                      <p className="text-[10px] text-gray-400 font-fredoka uppercase tracking-widest">Kiểm tra hàng trước khi thanh toán</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white/60 p-8 rounded-[40px] border border-white/40 shadow-xl shadow-blue-200/20">
            <h2 className="text-2xl font-black font-montserrat uppercase mb-8">Tóm tắt đơn hàng</h2>
            
            <div className="space-y-4 mb-8 font-montserrat">
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Tạm tính</span>
                <span className="font-bold">{subtotal.toLocaleString()}đ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-medium">Phí vận chuyển</span>
                <span className={`font-bold ${shippingDiscount > 0 ? 'line-through text-gray-300' : ''}`}>{shipping.toLocaleString()}đ</span>
              </div>
              {shippingDiscount > 0 && (
                <div className="flex justify-between text-green-500">
                  <span className="font-medium">Giảm phí ship</span>
                  <span className="font-black">-{shippingDiscount.toLocaleString()}đ</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-[#F48FB1]">
                  <span className="font-medium">Voucher ({appliedVoucher?.code})</span>
                  <span className="font-black">-{discount.toLocaleString()}đ</span>
                </div>
              )}
              <div className="h-[1px] bg-gray-200 my-4"></div>
              <div className="flex justify-between items-end">
                <span className="text-xl font-black uppercase">Tổng cộng</span>
                <span className="text-3xl font-black text-[#2C3E50] font-baloo">{total.toLocaleString()}đ</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <Tag className={`absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors ${appliedVoucher ? 'text-green-500' : 'text-gray-400'}`} />
                <input 
                  type="text" 
                  placeholder="Nhập mã giảm giá" 
                  value={coupon}
                  onChange={(e) => {
                    setCoupon(e.target.value);
                    if (appliedVoucher) setAppliedVoucher(null);
                  }}
                  className={`w-full pl-12 pr-4 py-4 rounded-[20px] bg-white border focus:outline-none focus:ring-2 font-montserrat text-sm transition-all ${
                    couponError ? 'border-red-300 ring-red-100' : appliedVoucher ? 'border-green-300 ring-green-100' : 'border-gray-100 focus:ring-[#90CAF9]/50'
                  }`}
                />
                <button 
                  onClick={handleApplyCoupon}
                  className="absolute right-2 top-2 bottom-2 px-6 bg-[#FFD1FF] rounded-[15px] font-black text-[10px] uppercase tracking-widest text-[#2C3E50] hover:bg-[#F48FB1] hover:text-white transition-all shadow-sm"
                >
                  Áp dụng
                </button>
              </div>
              
              {couponError && (
                <div className="flex items-center gap-2 text-red-500 text-[10px] font-bold uppercase tracking-widest px-2 animate-in fade-in slide-in-from-top-1">
                  <AlertCircle className="w-3 h-3" /> {couponError}
                </div>
              )}
              
              {appliedVoucher && (
                <div className="flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-widest px-2 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle2 className="w-3 h-3" /> Đã áp dụng: {appliedVoucher.title}
                </div>
              )}

              <Button className="w-full !py-5 text-xl uppercase tracking-widest font-black" onClick={handlePlaceOrder}>
                Đặt hàng ngay
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
