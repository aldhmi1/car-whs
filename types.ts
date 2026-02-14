
export enum OrderStatus {
  NEW = 'NEW',
  OFFERED = 'OFFERED',
  ACCEPTED = 'ACCEPTED',
  ENROUTE = 'ENROUTE',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export enum PaymentStatus {
  UNPAID = 'UNPAID',
  PAID = 'PAID',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED'
}

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  DRIVER = 'DRIVER',
  ADMIN = 'ADMIN'
}

export interface Service {
  id: string;
  name_ar: string;
  name_en: string;
  price_kd: number;
}

export interface SpeedOption {
  id: string;
  name_ar: string;
  name_en: string;
  fee_kd: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  serviceId: string;
  speedId: string;
  subtotal: number;
  deliveryFee: number;
  total: number;
  paymentMethod: 'ONLINE' | 'CASH';
  paymentStatus: PaymentStatus;
  status: OrderStatus;
  lat?: number;
  lng?: number;
  address: string;
  driverId: string | null;
  createdAt: string;
  acceptedAt?: string;
  customerName: string;
  customerPhone: string;
}

export interface Driver {
  id: string;
  name: string;
  phone: string;
  status: 'AVAILABLE' | 'BUSY' | 'OFFLINE';
}
