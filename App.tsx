
import React, { useState, useEffect } from 'react';
import { UserRole, Order, OrderStatus, PaymentStatus } from './types';
import { SERVICES, SPEED_OPTIONS, DRIVERS } from './constants';
import { CustomerHome } from './views/CustomerHome';
import { BookingView } from './views/BookingView';
import { OrderTracking } from './views/OrderTracking';
import { DriverView } from './views/DriverView';
import { AdminView } from './views/AdminView';

// Simulation of a global store using localStorage
const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [orders, setOrders] = useState<Order[]>([]);
  const [currentOrderId, setCurrentOrderId] = useState<string | null>(null);
  const [view, setView] = useState<'HOME' | 'BOOKING' | 'TRACKING'>('HOME');

  // Load orders from localStorage on mount
  useEffect(() => {
    const savedOrders = localStorage.getItem('carwash_orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  // Save orders to localStorage on change
  useEffect(() => {
    localStorage.setItem('carwash_orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (newOrder: Order) => {
    setOrders(prev => [newOrder, ...prev]);
    setCurrentOrderId(newOrder.id);
    setView('TRACKING');
  };

  const updateOrderStatus = (orderId: string, status: OrderStatus, driverId?: string) => {
    setOrders(prev => prev.map(o => {
      if (o.id === orderId) {
        return {
          ...o,
          status,
          driverId: driverId !== undefined ? driverId : o.driverId,
          acceptedAt: status === OrderStatus.ACCEPTED ? new Date().toISOString() : o.acceptedAt
        };
      }
      return o;
    }));
  };

  if (!role) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 space-y-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-2">نادي الغسيل</h1>
          <p className="text-gray-400">اختر نوع المستخدم للبدء</p>
        </div>
        <div className="grid grid-cols-1 gap-4 w-full max-w-xs">
          <button 
            onClick={() => setRole(UserRole.CUSTOMER)}
            className="bg-[#C0FF00] text-black font-bold py-4 rounded-2xl text-xl hover:scale-105 transition-transform"
          >
            أنا عميل (Customer)
          </button>
          <button 
            onClick={() => setRole(UserRole.DRIVER)}
            className="bg-gray-800 text-white font-bold py-4 rounded-2xl text-xl hover:scale-105 transition-transform"
          >
            أنا سائق (Driver)
          </button>
          <button 
            onClick={() => setRole(UserRole.ADMIN)}
            className="bg-gray-600 text-white font-bold py-4 rounded-2xl text-xl hover:scale-105 transition-transform"
          >
            الإدارة (Admin)
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto min-h-screen bg-[#050A14] flex flex-col relative overflow-hidden">
      {/* Role Badge */}
      <div className="absolute top-4 left-4 z-50">
        <button 
          onClick={() => { setRole(null); setView('HOME'); }}
          className="bg-gray-800/80 backdrop-blur px-3 py-1 rounded-full text-xs text-gray-300 border border-gray-700"
        >
          تغيير الدور: {role}
        </button>
      </div>

      {role === UserRole.CUSTOMER && (
        <>
          {view === 'HOME' && <CustomerHome onOrderClick={() => setView('BOOKING')} />}
          {view === 'BOOKING' && <BookingView onBack={() => setView('HOME')} onConfirm={addOrder} />}
          {view === 'TRACKING' && (
            <OrderTracking 
              order={orders.find(o => o.id === currentOrderId) || orders[0]} 
              onBack={() => setView('HOME')} 
            />
          )}
        </>
      )}

      {role === UserRole.DRIVER && (
        <DriverView orders={orders} updateStatus={updateOrderStatus} />
      )}

      {role === UserRole.ADMIN && (
        <AdminView orders={orders} drivers={DRIVERS} />
      )}
    </div>
  );
};

export default App;
