
import type { Product, User, Order, PaymentMethod, DeliveryZone, SocialLinks, PaymentDetails } from './types';

export const PRODUCTS: Product[] = [
  // Productos Agrícolas
  { id: 1, name: 'Aji Pimiento (verde)', price: 450, imageUrl: 'https://images.unsplash.com/photo-1599819098376-e5d71b53c6e2?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 100 },
  { id: 2, name: 'Zanahoria', price: 380, imageUrl: 'https://images.unsplash.com/photo-1590436427599-015893a7e5c3?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'mazo', stock: 80 },
  { id: 3, name: 'Remolacha', price: 380, imageUrl: 'https://images.unsplash.com/photo-1588669528621-0a09f81df16d?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'mazo', stock: 75 },
  { id: 4, name: 'Cebolla Morada', price: 300, imageUrl: 'https://images.unsplash.com/photo-1580252174938-273123840342?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'mazo', stock: 120 },
  { id: 5, name: 'Maíz Tierno', price: 50, imageUrl: 'https://images.unsplash.com/photo-1599940822971-d645d86235b2?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'unidad', stock: 200 },
  { id: 6, name: 'Col', price: 380, imageUrl: 'https://images.unsplash.com/photo-1561587317-233634116d12?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'unidad', stock: 50 },
  { id: 7, name: 'Aji Pimiento Importado (rojo)', price: 900, imageUrl: 'https://images.unsplash.com/photo-1518736349582-1a2243e33355?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 40 },
  { id: 8, name: 'Naranjas Importadas', price: 900, imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 60 },
  { id: 10, name: 'Manzanas', price: 260, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b69665?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'unidad', stock: 150 },
  { id: 11, name: 'Pepino', price: 120, imageUrl: 'https://images.unsplash.com/photo-1627799092451-19694857b15a?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 90 },
  { id: 14, name: 'Papas Importadas', price: 400, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba657?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 200 },
  { id: 15, name: 'Plátano Macho', price: 80, imageUrl: 'https://images.unsplash.com/photo-1556271923-281b5133e69f?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'unidad', stock: 180 },
  { id: 18, name: 'Ajo Importado', price: 80, imageUrl: 'https://images.unsplash.com/photo-1594298159336-229d443a129f?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'cabeza', stock: 300 },
  { id: 21, name: 'Arroz Importado', price: 270, imageUrl: 'https://images.unsplash.com/photo-1586201375765-c12eda5741e4?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 500 },
  { id: 22, name: 'Tomate de Ensalada', price: 750, imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03fec79?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 80 },
  { id: 23, name: 'Frijoles Colorados', price: 480, imageUrl: 'https://images.unsplash.com/photo-1605584344439-e338d2f5597a?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 100 },
  { id: 24, name: 'Frijoles Negros', price: 380, imageUrl: 'https://images.unsplash.com/photo-1605312109353-c408339c08a9?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 150 },
  { id: 29, name: 'Calabaza Amarilla', price: 50, imageUrl: 'https://images.unsplash.com/photo-1601982570023-e11504a259d4?w=400&auto=format&fit=crop', category: 'Productos Agrícolas', unit: 'libra', stock: 160 },

  // Productos Cárnicos
  { id: 32, name: 'Carne de Cerdo (Bistec)', price: 1200, imageUrl: 'https://images.unsplash.com/photo-1602498456745-e9503b30470b?w=400&auto=format&fit=crop', category: 'Productos Cárnicos', unit: 'libra', stock: 50 },
  { id: 33, name: 'Pollo Entero', price: 350, imageUrl: 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?w=400&auto=format&fit=crop', category: 'Productos Cárnicos', unit: 'libra', stock: 40 },
  { id: 34, name: 'Costilla de Res', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=400&auto=format&fit=crop', category: 'Productos Cárnicos', unit: 'libra', stock: 30 },
  { id: 35, name: 'Picadillo de Res', price: 950, imageUrl: 'https://images.unsplash.com/photo-1550583724-b2692b85b150?w=400&auto=format&fit=crop', category: 'Productos Cárnicos', unit: 'libra', stock: 60 },

  // Productos Variados
  { id: 36, name: 'Puré de Tomate', price: 450, imageUrl: 'https://images.unsplash.com/photo-1603569283847-aa295f0d016a?w=400&auto=format&fit=crop', category: 'Productos Variados', unit: 'unidad', stock: 100 },
  { id: 37, name: 'Aceite Vegetal', price: 800, imageUrl: 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=400&auto=format&fit=crop', category: 'Productos Variados', unit: 'unidad', stock: 50 },
  { id: 38, name: 'Especias Mixtas', price: 200, imageUrl: 'https://images.unsplash.com/photo-1532336414038-cf19250c5757?w=400&auto=format&fit=crop', category: 'Productos Variados', unit: 'paquete', stock: 200 },
  { id: 39, name: 'Vinagre', price: 250, imageUrl: 'https://images.unsplash.com/photo-1565538420083-b9b5c2c77d4c?w=400&auto=format&fit=crop', category: 'Productos Variados', unit: 'unidad', stock: 80 },
];

export const USERS: User[] = [
    { id: 1, email: 'admin', password: 'admin123', role: 'admin', name: 'Admin General', permissions: ['canManageOrders', 'canManageProducts', 'canManageUsers', 'canManageSettings'] },
    { id: 2, email: 'juan.perez', password: 'password123', role: 'messenger', name: 'Juan Perez', permissions: [] },
    { id: 3, email: 'cliente@test.com', role: 'customer', name: 'Ana Garcia' },
    { id: 4, email: 'carlos@test.com', role: 'customer', name: 'Carlos Rodriguez' },
    { id: 5, email: 'beatriz@test.com', role: 'customer', name: 'Beatriz Gonzalez' },
];

export const ORDERS: Order[] = [
    {
        id: 1,
        orderNumber: 'AEC-1685824901',
        customerId: 4,
        customerName: 'Carlos Rodriguez',
        address: 'Calle F #25 apto 3, Vedado, La Habana',
        phone: '555-1234',
        date: '2024-07-28T10:00:00Z',
        status: 'Pendiente',
        items: [
            { ...PRODUCTS[0], quantity: 2 },
            { ...PRODUCTS[3], quantity: 1 },
        ],
        deliveryCost: 150,
        total: (450 * 2) + (300 * 1) + 150,
        paymentMethod: 'Efectivo (CUP)',
    },
    {
        id: 2,
        orderNumber: 'AEC-1685828410',
        customerId: 5,
        customerName: 'Beatriz Gonzalez',
        address: 'Ave 31 #1234, Playa, La Habana',
        phone: '555-5678',
        date: '2024-07-28T11:30:00Z',
        status: 'Aprobado',
        items: [
            { ...PRODUCTS[8], quantity: 5 }, 
        ],
        deliveryCost: 300,
        total: (260 * 5) + 300,
        paymentMethod: 'Transferencia',
    },
];

export const PAYMENT_METHODS: PaymentMethod[] = [
    { id: 'transferencia', name: 'Transferencia', enabled: true },
    { id: 'zelle', name: 'Zelle', enabled: true },
    { id: 'usd', name: 'Dólares (USD)', enabled: false },
    { id: 'eur', name: 'Euros (EUR)', enabled: false },
    { id: 'cup', name: 'Efectivo (CUP)', enabled: true },
];

export const INITIAL_PAYMENT_DETAILS: PaymentDetails = {
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    bankNotes: '',
    zelleInfo: '',
    zelleNotes: '',
};

export const DELIVERY_ZONES: DeliveryZone[] = [
    { id: 1, name: 'Zona 1 (Céntrica)', maxDistanceKm: 5, cost: 150 },
    { id: 2, name: 'Zona 2 (Periferia)', maxDistanceKm: 10, cost: 300 },
    { id: 3, name: 'Zona 3 (Lejana)', maxDistanceKm: 20, cost: 500 },
];

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  facebook: '',
  instagram: '',
  twitter: '',
  whatsapp: '',
};
