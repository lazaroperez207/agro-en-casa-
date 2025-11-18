import React from 'react';
import type { Order } from '../types';
import CloseIcon from './icons/CloseIcon';
import CheckCircleIcon from './icons/CheckCircleIcon';

interface OrderConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onTrackOrder: () => void;
  order: Order | null;
}

const OrderConfirmationModal: React.FC<OrderConfirmationModalProps> = ({ isOpen, onClose, onTrackOrder, order }) => {
  if (!isOpen || !order) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col text-center p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-800" aria-label="Cerrar modal">
          <CloseIcon />
        </button>

        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h2 className="text-3xl font-bold text-gray-800 mb-2">¡Pedido Realizado!</h2>
        <p className="text-gray-600 mb-6">Gracias por tu compra. Tu pedido ha sido recibido y está siendo procesado.</p>

        <div className="bg-gray-50 p-4 rounded-lg text-left space-y-3 mb-6 border">
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">Número de Pedido:</span>
                <span className="font-mono text-gray-800">{order.orderNumber}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">Total:</span>
                <span className="font-bold text-gray-800">${order.total.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="font-semibold text-gray-700">Entrega Estimada:</span>
                <span className="text-gray-800">En el transcurso del día</span>
            </div>
        </div>

        <button
          onClick={onTrackOrder}
          className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
        >
          Seguir mi Pedido
        </button>
      </div>
    </div>
  );
};

export default OrderConfirmationModal;
