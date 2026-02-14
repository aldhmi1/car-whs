
import React from 'react';
import { SERVICES } from '../constants';

interface CustomerHomeProps {
  onOrderClick: () => void;
}

export const CustomerHome: React.FC<CustomerHomeProps> = ({ onOrderClick }) => {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto pb-10 custom-scrollbar">
      {/* Hero Section */}
      <div className="relative h-[45vh] w-full bg-black">
        <img 
          src="https://picsum.photos/seed/carwash1/600/800" 
          alt="Car Wash" 
          className="absolute inset-0 w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050A14] via-transparent to-transparent" />
        <div className="absolute bottom-8 right-6 left-6">
          <img src="https://i.ibb.co/3WqjH2c/logo.png" alt="Logo" className="h-10 mb-4 invert" />
          <h1 className="text-5xl font-extrabold leading-tight">
            LET'S <br />
            <span className="text-[#C0FF00]">WASH N'</span> <br />
            ROLL
          </h1>
        </div>
      </div>

      <div className="px-6 space-y-8 mt-4">
        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-2xl font-bold">باقات الغسيل</h2>
            <button className="text-[#C0FF00] text-sm">عرض الكل</button>
          </div>
          <div className="flex space-x-4 space-x-reverse overflow-x-auto pb-4 custom-scrollbar">
            {SERVICES.map((service) => (
              <div key={service.id} className="min-w-[160px] bg-[#111827] rounded-3xl p-5 border border-gray-800 shadow-xl">
                <div className="w-10 h-10 bg-gray-800 rounded-full mb-4 flex items-center justify-center">
                  <span className="text-xl">🚿</span>
                </div>
                <h3 className="font-bold text-lg mb-1">{service.name_ar}</h3>
                <p className="text-[#C0FF00] font-bold">{service.price_kd.toFixed(3)} د.ك</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-[#111827] rounded-3xl p-6 border border-gray-800 relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-xl font-bold mb-2">غسيل سريع في المطلاع؟</h3>
            <p className="text-gray-400 text-sm mb-6">نصل إليك أينما كنت في منطقة المطلاع بضغطة زر واحدة.</p>
            <button 
              onClick={onOrderClick}
              className="bg-[#C0FF00] text-black font-bold px-8 py-3 rounded-2xl hover:scale-105 transition-transform"
            >
              اطلب الآن
            </button>
          </div>
          <div className="absolute -left-10 -bottom-10 opacity-20">
             <span className="text-9xl">✨</span>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4">لماذا نحن؟</h2>
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-4 space-x-reverse bg-gray-900/50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-[#C0FF00]/10 text-[#C0FF00] rounded-xl flex items-center justify-center text-2xl">📍</div>
              <div>
                <h4 className="font-bold">تغطية شاملة</h4>
                <p className="text-gray-500 text-sm">نغطي كافة قطع المطلاع.</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse bg-gray-900/50 p-4 rounded-2xl">
              <div className="w-12 h-12 bg-[#C0FF00]/10 text-[#C0FF00] rounded-xl flex items-center justify-center text-2xl">⚡</div>
              <div>
                <h4 className="font-bold">سرعة التنفيذ</h4>
                <p className="text-gray-500 text-sm">أقل من 30 دقيقة لوصول السائق.</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
