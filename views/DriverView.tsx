
import React from 'react';
import { Order, OrderStatus } from '../types';

interface DriverViewProps {
  orders: Order[];
  updateStatus: (orderId: string, status: OrderStatus, driverId?: string) => void;
}

export const DriverView: React.FC<DriverViewProps> = ({ orders, updateStatus }) => {
  const driverId = 'd1'; // Logged in as Ahmed
  const availableOrders = orders.filter(o => o.status === OrderStatus.NEW);
  const myActiveOrders = orders.filter(o => o.driverId === driverId && o.status !== OrderStatus.COMPLETED && o.status !== OrderStatus.CANCELED);

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-2xl font-bold">لوحة السائق</h1>
          <p className="text-[#C0FF00] text-sm">متصل (أحمد السائق)</p>
        </div>
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">👷‍♂️</div>
      </div>

      <div className="space-y-8">
        {myActiveOrders.length > 0 && (
          <section>
            <h2 className="text-xl font-bold mb-4 flex items-center">
              <span className="w-2 h-2 bg-green-500 rounded-full ml-2" />
              طلبك الحالي
            </h2>
            {myActiveOrders.map(order => (
              <div key={order.id} className="bg-[#C0FF00] text-black p-6 rounded-3xl space-y-4 shadow-xl">
                <div className="flex justify-between">
                   <div className="font-bold text-lg">{order.orderNumber}</div>
                   <div className="bg-black/10 px-2 py-1 rounded text-xs">الحالة: {order.status}</div>
                </div>
                <div>
                   <div className="text-xs opacity-60">العميل</div>
                   <div className="font-bold">{order.customerName}</div>
                   <div className="text-sm">{order.customerPhone}</div>
                </div>
                <div>
                   <div className="text-xs opacity-60">العنوان</div>
                   <div className="font-bold">{order.address}</div>
                </div>
                
                <div className="grid grid-cols-1 gap-2 pt-4">
                  <a 
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(order.address)}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="w-full bg-black text-white text-center py-3 rounded-xl font-bold"
                  >
                    فتح الملاحة (Maps) 📍
                  </a>
                  
                  {order.status === OrderStatus.ACCEPTED && (
                    <button 
                      onClick={() => updateStatus(order.id, OrderStatus.ENROUTE)}
                      className="w-full bg-white text-black py-3 rounded-xl font-bold"
                    >
                      أنا في الطريق
                    </button>
                  )}
                  {order.status === OrderStatus.ENROUTE && (
                    <button 
                      onClick={() => updateStatus(order.id, OrderStatus.STARTED)}
                      className="w-full bg-white text-black py-3 rounded-xl font-bold"
                    >
                      بدأت الغسيل
                    </button>
                  )}
                  {order.status === OrderStatus.STARTED && (
                    <button 
                      onClick={() => updateStatus(order.id, OrderStatus.COMPLETED)}
                      className="w-full bg-black text-white py-3 rounded-xl font-bold"
                    >
                      إنهاء الطلب ✅
                    </button>
                  )}
                </div>
              </div>
            ))}
          </section>
        )}

        <section>
          <h2 className="text-xl font-bold mb-4">الطلبات المتاحة ({availableOrders.length})</h2>
          {availableOrders.length === 0 ? (
            <div className="bg-gray-900/50 p-10 rounded-3xl border border-gray-800 text-center text-gray-500">
               لا يوجد طلبات جديدة حالياً
            </div>
          ) : (
            <div className="space-y-4">
              {availableOrders.map(order => (
                <div key={order.id} className="bg-[#111827] p-5 rounded-3xl border border-gray-800 space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="font-bold">{order.orderNumber}</div>
                      <div className="text-xs text-gray-400">{order.serviceId} - {order.speedId}</div>
                    </div>
                    <div className="text-[#C0FF00] font-bold">{order.total.toFixed(3)} د.ك</div>
                  </div>
                  <div className="text-sm bg-gray-800/50 p-3 rounded-xl">
                     📍 {order.address}
                  </div>
                  <button 
                    onClick={() => updateStatus(order.id, OrderStatus.ACCEPTED, driverId)}
                    className="w-full bg-[#C0FF00] text-black font-bold py-3 rounded-xl"
                  >
                    قبول الطلب
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
