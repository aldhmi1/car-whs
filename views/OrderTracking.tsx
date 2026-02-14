
import React from 'react';
import { Order, OrderStatus } from '../types';

interface OrderTrackingProps {
  order: Order | undefined;
  onBack: () => void;
}

export const OrderTracking: React.FC<OrderTrackingProps> = ({ order, onBack }) => {
  if (!order) return <div className="p-10 text-center">لا يوجد طلب حالي.</div>;

  const getStatusText = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW: return 'بانتظار قبول السائق...';
      case OrderStatus.ACCEPTED: return 'تم قبول طلبك';
      case OrderStatus.ENROUTE: return 'السائق في الطريق إليك';
      case OrderStatus.STARTED: return 'بدأت عملية الغسيل';
      case OrderStatus.COMPLETED: return 'تم الانتهاء بنجاح';
      case OrderStatus.CANCELED: return 'تم إلغاء الطلب';
      default: return 'جاري المعالجة';
    }
  };

  const getStatusStep = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.NEW: return 1;
      case OrderStatus.ACCEPTED: return 2;
      case OrderStatus.ENROUTE: return 3;
      case OrderStatus.STARTED: return 4;
      case OrderStatus.COMPLETED: return 5;
      default: return 0;
    }
  };

  const currentStep = getStatusStep(order.status);

  return (
    <div className="flex-1 flex flex-col custom-scrollbar overflow-y-auto">
      <div className="bg-[#111827] p-6 rounded-b-[40px] shadow-2xl relative">
        <div className="flex justify-between items-center mb-6">
          <button onClick={onBack} className="text-gray-400">رجوع</button>
          <div className="bg-[#C0FF00]/10 text-[#C0FF00] px-3 py-1 rounded-full text-xs font-bold">
            {order.orderNumber}
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-1">{getStatusText(order.status)}</h1>
        <p className="text-gray-400 text-sm">توقع الوصول خلال 15 دقيقة</p>

        <div className="mt-10 relative flex justify-between">
           {/* Progress Line */}
           <div className="absolute top-4 left-0 right-0 h-0.5 bg-gray-800 z-0" />
           <div className="absolute top-4 right-0 h-0.5 bg-[#C0FF00] z-0 transition-all duration-1000" style={{ width: `${(currentStep - 1) * 25}%` }} />

           {[1, 2, 3, 4, 5].map(s => (
             <div key={s} className={`relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors ${currentStep >= s ? 'bg-[#C0FF00] border-[#C0FF00]' : 'bg-gray-900 border-gray-800'}`}>
                {currentStep > s ? '✓' : currentStep === s ? <div className="w-2 h-2 bg-black rounded-full animate-pulse" /> : ''}
             </div>
           ))}
        </div>
        <div className="flex justify-between text-[10px] text-gray-500 mt-2 px-1">
          <span>طلب</span>
          <span>قبول</span>
          <span>طريق</span>
          <span>غسيل</span>
          <span>تم</span>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Map Simulation */}
        <div className="h-48 bg-gray-800 rounded-3xl overflow-hidden relative border border-gray-700">
           <div className="absolute inset-0 bg-[url('https://i.ibb.co/VvzS07Y/map-dark.png')] bg-cover opacity-40" />
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
             <div className="w-10 h-10 bg-[#C0FF00] rounded-full flex items-center justify-center animate-bounce shadow-[0_0_20px_rgba(192,255,0,0.5)]">
               🚗
             </div>
           </div>
           <div className="absolute bottom-2 right-2 bg-black/50 backdrop-blur px-3 py-1 rounded-lg text-xs">خريطة المطلاع الحية</div>
        </div>

        {order.driverId && (
          <div className="bg-gray-900/50 p-4 rounded-3xl border border-gray-800 flex items-center space-x-4 space-x-reverse">
            <img src="https://picsum.photos/seed/driver/100/100" className="w-14 h-14 rounded-full object-cover" alt="Driver" />
            <div className="flex-1">
              <h4 className="font-bold">محمد السائق</h4>
              <p className="text-xs text-gray-500">سيارة رقم 4522</p>
            </div>
            <button className="bg-white/10 p-3 rounded-full hover:bg-white/20">📞</button>
          </div>
        )}

        <div className="space-y-4">
          <h3 className="font-bold">تفاصيل الفاتورة</h3>
          <div className="bg-[#111827] p-5 rounded-3xl border border-gray-800 space-y-3 text-sm">
             <div className="flex justify-between">
               <span className="text-gray-400">الموقع</span>
               <span className="text-left w-2/3">{order.address}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-400">الباقة</span>
               <span>{order.serviceId}</span>
             </div>
             <div className="flex justify-between">
               <span className="text-gray-400">حالة الدفع</span>
               <span className={order.paymentStatus === 'PAID' ? 'text-green-400' : 'text-yellow-400'}>
                 {order.paymentStatus === 'PAID' ? 'مدفوع' : 'كاش'}
               </span>
             </div>
             <div className="h-px bg-gray-800 my-1" />
             <div className="flex justify-between text-lg font-bold">
               <span>الإجمالي</span>
               <span className="text-[#C0FF00]">{order.total.toFixed(3)} د.ك</span>
             </div>
          </div>
        </div>

        <button 
          className="w-full bg-red-500/10 text-red-500 py-4 rounded-2xl border border-red-500/20 font-bold opacity-50 cursor-not-allowed"
          disabled
        >
          إلغاء الطلب
        </button>
      </div>
    </div>
  );
};
