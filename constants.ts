import type { Product, User, Order, PaymentMethod, DeliveryZone, SocialLinks, PaymentDetails } from './types';

export const PRODUCTS: Product[] = [
  { id: 1, name: 'Aji Pimiento (verde)', price: 450, imageUrl: 'https://images.unsplash.com/photo-1599819098376-e5d71b53c6e2?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 100 },
  { id: 2, name: 'Zanahoria', price: 380, imageUrl: 'https://images.unsplash.com/photo-1590436427599-015893a7e5c3?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'mazo', stock: 80 },
  { id: 3, name: 'Remolacha', price: 380, imageUrl: 'https://images.unsplash.com/photo-1588669528621-0a09f81df16d?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'mazo', stock: 75 },
  { id: 4, name: 'Cebolla Morada', price: 300, imageUrl: 'https://images.unsplash.com/photo-1580252174938-273123840342?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'mazo', stock: 120 },
  { id: 5, name: 'Maíz Tierno', price: 50, imageUrl: 'https://images.unsplash.com/photo-1599940822971-d645d86235b2?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'unidad', stock: 200 },
  { id: 6, name: 'Col', price: 380, imageUrl: 'https://images.unsplash.com/photo-1561587317-233634116d12?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'unidad', stock: 50 },
  { id: 7, name: 'Aji Pimiento Importado (rojo)', price: 900, imageUrl: 'https://images.unsplash.com/photo-1518736349582-1a2243e33355?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 40 },
  { id: 8, name: 'Naranjas Importadas', price: 900, imageUrl: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'libra', stock: 60 },
  { id: 9, name: 'Mandarinas Importadas', price: 1100, imageUrl: 'https://images.unsplash.com/photo-1557800636-894a64c1696f?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'libra', stock: 55 },
  { id: 10, name: 'Manzanas', price: 260, imageUrl: 'https://images.unsplash.com/photo-1560806887-1e4cd0b69665?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'unidad', stock: 150 },
  { id: 11, name: 'Pepino', price: 120, imageUrl: 'https://images.unsplash.com/photo-1627799092451-19694857b15a?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 90 },
  { id: 12, name: 'Guayaba', price: 150, imageUrl: 'https://images.unsplash.com/photo-1631160242231-3c4671457497?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'libra', stock: 85 },
  { id: 13, name: 'Fruta Bomba Madura', price: 120, imageUrl: 'https://images.unsplash.com/photo-1596370932234-9c3f41f05e3f?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'libra', stock: 70 },
  { id: 14, name: 'Papas Importadas', price: 400, imageUrl: 'https://images.unsplash.com/photo-1518977676601-b53f82aba657?w=400&auto=format&fit=crop', category: 'Tubérculos', unit: 'libra', stock: 200 },
  { id: 15, name: 'Plátano Macho', price: 80, imageUrl: 'https://images.unsplash.com/photo-1556271923-281b5133e69f?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'unidad', stock: 180 },
  { id: 16, name: 'Plátano Burro Grande', price: 250, imageUrl: 'https://plus.unsplash.com/premium_photo-1674485546255-a0d49852277c?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'mano', stock: 100 },
  { id: 17, name: 'Cebolla Blanca Grande (española)', price: 400, imageUrl: 'https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 110 },
  { id: 18, name: 'Ajo Importado', price: 80, imageUrl: 'https://images.unsplash.com/photo-1594298159336-229d443a129f?w=400&auto=format&fit=crop', category: 'Condimentos', unit: 'cabeza', stock: 300 },
  { id: 19, name: 'Piña', price: 280, imageUrl: 'https://images.unsplash.com/photo-1587883139192-e171c6675553?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'unidad', stock: 60 },
  { id: 20, name: 'Plátano Fruta Maduro', price: 250, imageUrl: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'mano', stock: 90 },
  { id: 21, name: 'Arroz Importado', price: 270, imageUrl: 'https://images.unsplash.com/photo-1586201375765-c12eda5741e4?w=400&auto=format&fit=crop', category: 'Granos', unit: 'libra', stock: 500 },
  { id: 22, name: 'Tomate de Ensalada Importado', price: 750, imageUrl: 'https://images.unsplash.com/photo-1582284540020-8acbe03fec79?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 80 },
  { id: 23, name: 'Frijoles Colorados (California)', price: 480, imageUrl: 'https://images.unsplash.com/photo-1605584344439-e338d2f5597a?w=400&auto=format&fit=crop', category: 'Granos', unit: 'libra', stock: 100 },
  { id: 24, name: 'Frijoles Negros', price: 380, imageUrl: 'https://images.unsplash.com/photo-1605312109353-c408339c08a9?w=400&auto=format&fit=crop', category: 'Granos', unit: 'libra', stock: 150 },
  { id: 25, name: 'Frijoles Colorados (pequeño)', price: 400, imageUrl: 'https://plus.unsplash.com/premium_photo-1664478144214-046a6f11a84f?w=400&auto=format&fit=crop', category: 'Granos', unit: 'libra', stock: 120 },
  { id: 26, name: 'Aguacates Grandes', price: 130, imageUrl: 'https://images.unsplash.com/photo-1601039641847-7857b994d704?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'unidad', stock: 90 },
  { id: 27, name: 'Boniato', price: 80, imageUrl: 'https://images.unsplash.com/photo-1582877543887-2483f88b00a5?w=400&auto=format&fit=crop', category: 'Tubérculos', unit: 'libra', stock: 130 },
  { id: 28, name: 'Malanga', price: 150, imageUrl: 'https://plus.unsplash.com/premium_photo-1698031233816-4a372e9a7216?w=400&auto=format&fit=crop', category: 'Tubérculos', unit: 'libra', stock: 100 },
  { id: 29, name: 'Calabaza Amarilla', price: 50, imageUrl: 'https://images.unsplash.com/photo-1601982570023-e11504a259d4?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'libra', stock: 160 },
  { id: 30, name: 'Limón Persa', price: 480, imageUrl: 'https://images.unsplash.com/photo-1603120790103-013b3e5513e9?w=400&auto=format&fit=crop', category: 'Frutas', unit: 'libra', stock: 80 },
  { id: 31, name: 'Aji Cachucha', price: 70, imageUrl: 'https://plus.unsplash.com/premium_photo-1699252926040-34d28f804561?w=400&auto=format&fit=crop', category: 'Verduras', unit: 'paquete', stock: 95 },
];

export const USERS: User[] = [
    { id: 1, email: 'admin', password: 'admin123', role: 'admin', name: 'Admin General' },
    { id: 2, email: 'juan.perez', password: 'password123', role: 'messenger', name: 'Juan Perez' },
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
            { ...PRODUCTS[13], quantity: 3 },
        ],
        deliveryCost: 150,
        total: (450 * 2) + (300 * 1) + (400 * 3) + 150,
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
            { ...PRODUCTS[9], quantity: 5 }, // Manzanas
            { ...PRODUCTS[19], quantity: 2 }, // Platano fruta
        ],
        deliveryCost: 300,
        total: (260 * 5) + (250 * 2) + 300,
        paymentMethod: 'Transferencia',
    },
    {
        id: 3,
        orderNumber: 'AEC-1685831115',
        customerId: 4,
        customerName: 'Carlos Rodriguez',
        address: 'Edificio Focsa, Apto 10A, Vedado, La Habana',
        phone: '555-9012',
        date: '2024-07-27T15:00:00Z',
        status: 'Listo para Mensajería',
        items: [
            { ...PRODUCTS[25], quantity: 4 }, // Aguacates
            { ...PRODUCTS[20], quantity: 2 }, // Arroz
        ],
        deliveryCost: 150,
        total: (130 * 4) + (270 * 2) + 150,
        paymentMethod: 'Zelle',
    }
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