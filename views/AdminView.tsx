
import React from 'react';
import { Order, OrderStatus } from '../types';

interface AdminViewProps {
  orders: Order[];
  drivers: any[];
}

export const AdminView: React.FC<AdminViewProps> = ({ orders, drivers }) => {
  const stats = {
    total: orders.length,
    completed: orders.filter(o => o.status === OrderStatus.COMPLETED).length,
    active: orders.filter(o => o.status !== OrderStatus.COMPLETED && o.status !== OrderStatus.CANCELED).length,
    revenue: orders.filter(o => o.status === OrderStatus.COMPLETED).reduce((acc, curr) => acc + curr.total, 0)
  };

  return (
    <div className="flex-1 flex flex-col p-6 overflow-y-auto custom-scrollbar">
      <h1 className="text-2xl font-bold mb-6">لوحة التحكم</h1>

      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-[#111827] p-4 rounded-3xl border border-gray-800">
           <div className="text-xs text-gray-500 mb-1">الطلبات الكلية</div>
           <div className="text-2xl font-bold">{stats.total}</div>
        </div>
        <div className="bg-[#111827] p-4 rounded-3xl border border-gray-800">
           <div className="text-xs text-gray-500 mb-1">الإيرادات</div>
           <div className="text-2xl font-bold text-[#C0FF00]">{stats.revenue.toFixed(2)} د.ك</div>
        </div>
        <div className="bg-[#111827] p-4 rounded-3xl border border-gray-800">
           <div className="text-xs text-gray-500 mb-1">طلبات نشطة</div>
           <div className="text-2xl font-bold text-blue-400">{stats.active}</div>
        </div>
        <div className="bg-[#111827] p-4 rounded-3xl border border-gray-800">
           <div className="text-xs text-gray-500 mb-1">مكتملة</div>
           <div className="text-2xl font-bold text-green-400">{stats.completed}</div>
        </div>
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-bold mb-4">قائمة السائقين</h2>
        <div className="space-y-2">
          {drivers.map(d => (
            <div key={d.id} className="bg-gray-900 p-4 rounded-2xl flex justify-between items-center">
              <div>
                <div className="font-bold">{d.name}</div>
                <div className="text-xs text-gray-500">{d.phone}</div>
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                 <span className={`w-2 h-2 rounded-full ${d.status === 'AVAILABLE' ? 'bg-green-500' : 'bg-red-500'}`} />
                 <span className="text-sm">{d.status}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-xl font-bold mb-4">سجل الطلبات الأخير</h2>
        <div className="space-y-3">
          {orders.slice(0, 10).map(o => (
            <div key={o.id} className="bg-[#111827] p-4 rounded-2xl border border-gray-800 flex justify-between items-center text-sm">
               <div>
                 <div className="font-bold">{o.orderNumber}</div>
                 <div className="text-xs text-gray-500">{o.customerName}</div>
               </div>
               <div className="text-right">
                 <div className={`px-2 py-0.5 rounded text-[10px] inline-block ${o.status === OrderStatus.COMPLETED ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'}`}>
                    {o.status}
                 </div>
                 <div className="font-bold mt-1">{o.total.toFixed(3)} د.ك</div>
               </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
