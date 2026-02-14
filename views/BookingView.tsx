
import React, { useState } from 'react';
import { SERVICES, SPEED_OPTIONS } from '../constants';
import { Order, OrderStatus, PaymentStatus } from '../types';

interface BookingViewProps {
  onBack: () => void;
  onConfirm: (order: Order) => void;
}

export const BookingView: React.FC<BookingViewProps> = ({ onBack, onConfirm }) => {
  const [selectedService, setSelectedService] = useState(SERVICES[0]);
  const [selectedSpeed, setSelectedSpeed] = useState(SPEED_OPTIONS[0]);
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'ONLINE' | 'CASH'>('ONLINE');
  const [step, setStep] = useState(1);

  const total = selectedService.price_kd + selectedSpeed.fee_kd;

  const handleConfirm = () => {
    const newOrder: Order = {
      id: Math.random().toString(36).substr(2, 9),
      orderNumber: `ORD-${Math.floor(1000 + Math.random() * 9000)}`,
      customerId: 'user-1',
      customerName: name || 'عميل تجريبي',
      customerPhone: phone || '99999999',
      serviceId: selectedService.id,
      speedId: selectedSpeed.id,
      subtotal: selectedService.price_kd,
      deliveryFee: selectedSpeed.fee_kd,
      total: total,
      paymentMethod: paymentMethod,
      paymentStatus: paymentMethod === 'ONLINE' ? PaymentStatus.PAID : PaymentStatus.UNPAID,
      status: OrderStatus.NEW,
      address: address || 'المطلاع، قطعة 1، شارع 10',
      driverId: null,
      createdAt: new Date().toISOString()
    };
    onConfirm(newOrder);
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      <div className="flex items-center mb-8">
        <button onClick={onBack} className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center ml-4">
          <span className="text-xl">←</span>
        </button>
        <h1 className="text-2xl font-bold">تفاصيل الطلب</h1>
      </div>

      <div className="space-y-8 pb-32">
        {/* Step Indicators */}
        <div className="flex items-center justify-center space-x-2 space-x-reverse mb-6">
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 1 ? 'bg-[#C0FF00]' : 'bg-gray-800'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 2 ? 'bg-[#C0FF00]' : 'bg-gray-800'}`} />
          <div className={`h-1.5 rounded-full flex-1 transition-colors ${step >= 3 ? 'bg-[#C0FF00]' : 'bg-gray-800'}`} />
        </div>

        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <label className="block text-gray-400 mb-3 text-sm">اختر الباقة</label>
              <div className="grid grid-cols-1 gap-3">
                {SERVICES.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setSelectedService(s)}
                    className={`flex justify-between items-center p-4 rounded-2xl border transition-all ${selectedService.id === s.id ? 'border-[#C0FF00] bg-[#C0FF00]/5' : 'border-gray-800 bg-gray-900/50'}`}
                  >
                    <span className="font-bold">{s.name_ar}</span>
                    <span className="text-[#C0FF00]">{s.price_kd.toFixed(3)} د.ك</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-3 text-sm">سرعة التوصيل</label>
              <div className="grid grid-cols-2 gap-3">
                {SPEED_OPTIONS.map(s => (
                  <button 
                    key={s.id}
                    onClick={() => setSelectedSpeed(s)}
                    className={`p-4 rounded-2xl border text-center transition-all ${selectedSpeed.id === s.id ? 'border-[#C0FF00] bg-[#C0FF00]/5' : 'border-gray-800 bg-gray-900/50'}`}
                  >
                    <div className="font-bold text-sm mb-1">{s.name_ar}</div>
                    <div className="text-xs text-gray-400">+{s.fee_kd.toFixed(3)} د.ك</div>
                  </button>
                ))}
              </div>
            </div>
            
            <button 
              onClick={() => setStep(2)}
              className="w-full bg-[#C0FF00] text-black font-bold py-4 rounded-2xl mt-4"
            >
              التالي
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold">العنوان والبيانات</h3>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="الاسم بالكامل"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 focus:border-[#C0FF00] outline-none"
              />
              <input 
                type="tel" 
                placeholder="رقم الهاتف"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 focus:border-[#C0FF00] outline-none"
              />
              <textarea 
                placeholder="العنوان التفصيلي في المطلاع (قطعة، شارع، قسيمة)"
                rows={3}
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full bg-gray-900 border border-gray-800 rounded-2xl p-4 focus:border-[#C0FF00] outline-none"
              />
              <button className="w-full py-3 bg-blue-500/10 text-blue-400 rounded-xl text-sm border border-blue-500/20 flex items-center justify-center space-x-2 space-x-reverse">
                <span>📍</span>
                <span>تحديد الموقع التلقائي</span>
              </button>
            </div>
            
            <div className="flex space-x-3 space-x-reverse">
               <button onClick={() => setStep(1)} className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl">السابق</button>
               <button onClick={() => setStep(3)} className="flex-[2] bg-[#C0FF00] text-black font-bold py-4 rounded-2xl">التالي</button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <h3 className="text-lg font-bold">الدفع وتأكيد الطلب</h3>
            
            <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800 space-y-4">
              <div className="flex justify-between">
                <span className="text-gray-400">سعر الخدمة:</span>
                <span>{selectedService.price_kd.toFixed(3)} د.ك</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">رسوم التوصيل ({selectedSpeed.name_ar}):</span>
                <span>{selectedSpeed.fee_kd.toFixed(3)} د.ك</span>
              </div>
              <div className="h-px bg-gray-800 my-2" />
              <div className="flex justify-between text-xl font-bold">
                <span>الإجمالي:</span>
                <span className="text-[#C0FF00]">{total.toFixed(3)} د.ك</span>
              </div>
            </div>

            <div>
              <label className="block text-gray-400 mb-3 text-sm">طريقة الدفع</label>
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setPaymentMethod('ONLINE')}
                  className={`p-4 rounded-2xl border text-center transition-all ${paymentMethod === 'ONLINE' ? 'border-[#C0FF00] bg-[#C0FF00]/5' : 'border-gray-800 bg-gray-900/50'}`}
                >
                  <div className="font-bold text-sm">K-NET / رابط</div>
                </button>
                <button 
                  onClick={() => setPaymentMethod('CASH')}
                  className={`p-4 rounded-2xl border text-center transition-all ${paymentMethod === 'CASH' ? 'border-[#C0FF00] bg-[#C0FF00]/5' : 'border-gray-800 bg-gray-900/50'}`}
                >
                  <div className="font-bold text-sm">كاش (نقداً)</div>
                </button>
              </div>
            </div>

            <div className="flex space-x-3 space-x-reverse">
               <button onClick={() => setStep(2)} className="flex-1 bg-gray-800 text-white font-bold py-4 rounded-2xl">السابق</button>
               <button onClick={handleConfirm} className="flex-[2] bg-[#C0FF00] text-black font-bold py-4 rounded-2xl">تأكيد الطلب</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
