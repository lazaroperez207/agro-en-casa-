export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
  unit: 'libra' | 'mazo' | 'unidad' | 'mano' | 'cabeza' | 'paquete';
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export type Role = 'customer' | 'admin' | 'messenger';

export interface User {
  id: number;
  email: string; // This can be username for admin/messenger or email for customer
  password?: string;
  role: Role;
  name: string;
}

export type OrderStatus = 'Pendiente' | 'Pendiente de Pago' | 'Aprobado' | 'En Preparación' | 'Listo para Mensajería' | 'En Camino' | 'Entregado' | 'Cancelado';

export interface Order {
  id: number;
  orderNumber: string;
  customerId?: number;
  customerName: string;
  address: string;
  phone: string;
  date: string;
  status: OrderStatus;
  items: CartItem[];
  deliveryCost: number;
  total: number;
  paymentMethod: string;
}

export interface PaymentMethod {
  id: string;
  name: string;
  enabled: boolean;
}

export interface PaymentDetails {
    bankName: string;
    accountHolder: string;
    accountNumber: string;
    bankNotes: string;
    zelleInfo: string;
    zelleNotes: string;
}

export interface Notification {
  id: number;
  message: string;
  date: string;
  read: boolean;
  orderNumber: string;
}

export interface DeliveryZone {
    id: number;
    name: string;
    maxDistanceKm: number;
    cost: number;
}

export interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  whatsapp: string;
}