
import { Service, SpeedOption } from './types';

export const SERVICES: Service[] = [
  { id: 'ext', name_ar: 'غسيل خارجي', name_en: 'External Wash', price_kd: 3.000 },
  { id: 'int', name_ar: 'غسيل داخلي', name_en: 'Internal Wash', price_kd: 4.000 },
  { id: 'pre', name_ar: 'غسيل مميز', name_en: 'Premium Wash', price_kd: 6.000 },
];

export const SPEED_OPTIONS: SpeedOption[] = [
  { id: 'std', name_ar: 'توصيل عادي', name_en: 'Standard Speed', fee_kd: 0.500 },
  { id: 'fast', name_ar: 'توصيل سريع', name_en: 'Fast Speed', fee_kd: 1.000 },
];

export const DRIVERS = [
  { id: 'd1', name: 'أحمد السائق', phone: '99887766', status: 'AVAILABLE' },
  { id: 'd2', name: 'محمد السائق', phone: '55443322', status: 'AVAILABLE' },
  { id: 'd3', name: 'خالد السائق', phone: '11223344', status: 'AVAILABLE' },
];

export const COLORS = {
  primary: '#C0FF00', // Neon Lime
  secondary: '#050A14', // Deep Dark
  card: '#111827',
  textGray: '#9CA3AF'
};
