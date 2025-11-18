import React from 'react';
import type { Order, OrderStatus } from '../types';

interface CustomerOrdersPageProps {
  orders: Order[];
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

const CustomerOrdersPage: React.FC<CustomerOrdersPageProps> = ({ orders }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="text-center bg-white p-10 rounded-xl shadow-lg">
          <p className="text-lg text-gray-600 mb-4">Aún no has realizado ningún pedido.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
            <div key={order.id} className="bg-white p-6 rounded-lg shadow-md animate-[fadeIn_0.3s_ease-out]">
              <div className="flex flex-col sm:flex-row justify-between sm:items-center mb-4 border-b pb-4">
                <div>
                  <p className="font-semibold text-gray-500">Pedido #{order.orderNumber}</p>
                  <p className="text-sm text-gray-500">{new Date(order.date).toLocaleDateString()}</p>
                </div>
                <div className="mt-2 sm:mt-0 text-left sm:text-right">
                    <p className="text-lg font-bold">${order.total.toFixed(2)}</p>
                    <span className={`mt-1 inline-block px-2 py-1 rounded-full text-xs font-semibold ${statusColorMap[order.status] || 'bg-gray-100 text-gray-800'}`}>
                        {order.status}
                    </span>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Artículos:</h4>
                <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {order.items.map(item => (
                        <li key={item.id}>{item.quantity} x {item.name}</li>
                    ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerOrdersPage;