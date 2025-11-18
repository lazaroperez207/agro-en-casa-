import React from 'react';
import type { Order } from '../types';

interface OrderTrackingPageProps {
  order: Order | null;
  onNavigate: () => void;
}

const OrderTrackingPage: React.FC<OrderTrackingPageProps> = ({ order, onNavigate }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-4 text-center">Seguimiento de Pedido</h1>
      
      {order ? (
        <div className="bg-white p-8 rounded-2xl shadow-lg mt-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b pb-4 mb-4">
            <div>
              <p className="text-gray-600">Número de Pedido</p>
              <p className="text-xl font-bold font-mono text-primary">{order.orderNumber}</p>
            </div>
            <div className="text-left md:text-right mt-4 md:mt-0">
               <p className="text-gray-600">Fecha del Pedido</p>
               <p className="text-lg font-semibold">{order.date}</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h2 className="text-2xl font-bold mb-4">Estado Actual: <span className="text-green-600">{order.status}</span></h2>
            <p className="text-gray-600 mb-6">
              Recibirás notificaciones a medida que tu pedido avance en el proceso.
              Esta página es un marcador de posición y una característica de seguimiento más detallada estará disponible próximamente.
            </p>
            <div className="text-center">
              <button
                onClick={onNavigate}
                className="inline-block bg-primary text-white px-8 py-3 rounded-lg text-lg font-semibold hover:bg-primary-dark transition-colors shadow-md"
              >
                Seguir Comprando
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center bg-white p-10 rounded-xl shadow-lg mt-8">
          <p className="text-lg text-gray-600 mb-4">No hay ningún pedido para rastrear en este momento.</p>
          <button
             onClick={onNavigate}
             className="inline-block bg-primary text-white px-6 py-2 rounded-lg font-semibold hover:bg-primary-dark transition-colors"
          >
            Ir a Productos
          </button>
        </div>
      )}
    </div>
  );
};

export default OrderTrackingPage;
