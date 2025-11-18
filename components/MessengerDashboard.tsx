import React, { useMemo } from 'react';
import type { Order, OrderStatus } from '../types';

interface MessengerDashboardProps {
  orders: Order[];
  onUpdateStatus: (orderId: number, status: OrderStatus) => void;
}

const statusColorMap: Record<OrderStatus, string> = {
    'Pendiente': 'bg-yellow-100 text-yellow-800',
    'Pendiente de Pago': 'bg-orange-100 text-orange-800',
    'Aprobado': 'bg-blue-100 text-blue-800',
    'En Preparación': 'bg-indigo-100 text-indigo-800',
    'Listo para Mensajería': 'bg-purple-100 text-purple-800',
    'En Camino': 'bg-cyan-100 text-cyan-800',
    'Entregado': 'bg-green-100 text-green-800',
    'Cancelado': 'bg-red-100 text-red-800',
};

const OrderCard: React.FC<{ order: Order; onUpdateStatus: (orderId: number, status: OrderStatus) => void }> = ({ order, onUpdateStatus }) => {
    const handleOpenMap = (destination: string) => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition((position) => {
            const { latitude, longitude } = position.coords;
            const url = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(destination)}`;
            window.open(url, '_blank');
          }, () => {
            alert('No se pudo obtener tu ubicación. Por favor, habilita los permisos de geolocalización.');
            const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(destination)}`;
            window.open(url, '_blank');
          });
        } else {
          alert('La geolocalización no es soportada por este navegador.');
        }
    };
    
    return (
        <div className="bg-white p-4 rounded-lg shadow transition-shadow hover:shadow-md animate-[fadeIn_0.3s_ease-out]">
            <div className="flex justify-between items-start">
            <div>
                <h3 className="font-bold text-lg">{order.orderNumber} - {order.customerName}</h3>
                <p className="text-sm text-gray-600 font-semibold">{order.address}</p>
                <p className="text-sm text-gray-500">Tel: {order.phone}</p>
            </div>
            <div className="text-right flex-shrink-0 ml-4">
                <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
                <p className="text-sm text-gray-500">{order.paymentMethod}</p>
                <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[order.status]}`}>
                {order.status}
                </span>
            </div>
            </div>
            <div className="mt-4 pt-4 border-t flex flex-col sm:flex-row justify-end items-center gap-2">
            <button
                onClick={() => handleOpenMap(order.address)}
                className="w-full sm:w-auto bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
                Ver en Mapa
            </button>
            {order.status === 'Listo para Mensajería' && (
                <button
                onClick={() => onUpdateStatus(order.id, 'En Camino')}
                className="w-full sm:w-auto bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                Iniciar Entrega
                </button>
            )}
            {order.status === 'En Camino' && (
                <button
                onClick={() => onUpdateStatus(order.id, 'Entregado')}
                className="w-full sm:w-auto bg-green-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-green-600 transition-colors"
                >
                Marcar como Entregado
                </button>
            )}
            </div>
        </div>
    );
};

const MessengerDashboard: React.FC<MessengerDashboardProps> = ({ orders, onUpdateStatus }) => {
  const readyOrders = useMemo(() => orders.filter(o => o.status === 'Listo para Mensajería'), [orders]);
  const inTransitOrders = useMemo(() => orders.filter(o => o.status === 'En Camino'), [orders]);

  const renderOrderList = (orderList: Order[], title: string) => (
    <section aria-labelledby={title.replace(/\s+/g, '-').toLowerCase()}>
      <h2 id={title.replace(/\s+/g, '-').toLowerCase()} className="text-2xl font-bold mb-4 border-b pb-2 text-gray-700">{title} <span className="text-base font-medium text-gray-500">({orderList.length})</span></h2>
      {orderList.length === 0 ? (
        <div className="text-center bg-gray-50 p-6 rounded-lg">
          <p className="text-gray-500">No hay pedidos en esta categoría.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orderList.map(order => (
            <OrderCard key={order.id} order={order} onUpdateStatus={onUpdateStatus} />
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-800">Panel de Entregas</h1>
        <p className="text-lg text-gray-600 mt-1">Gestiona tus entregas asignadas.</p>
      </header>
      
      {orders.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-lg shadow-md">
          <svg className="mx-auto h-16 w-16 text-gray-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.125-.504 1.125-1.125V14.25m-17.25 4.5v-1.875a3.375 3.375 0 003.375-3.375h1.5a1.125 1.125 0 011.125 1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 003.375 3.375v1.875" />
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-gray-800">Todo al día</h2>
          <p className="mt-1 text-gray-500">No hay pedidos asignados en este momento.</p>
        </div>
      ) : (
        <div className="space-y-10">
          {renderOrderList(readyOrders, "Pedidos por Recoger")}
          {renderOrderList(inTransitOrders, "Entregas en Curso")}
        </div>
      )}
    </div>
  );
};

export default MessengerDashboard;
