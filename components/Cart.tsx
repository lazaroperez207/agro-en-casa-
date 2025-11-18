
import React, { useMemo } from 'react';
import type { CartItem } from '../types';
import CloseIcon from './icons/CloseIcon';
import TrashIcon from './icons/TrashIcon';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onRemoveItem: (productId: number) => void;
  onUpdateQuantity: (productId: number, quantity: number) => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  isOpen,
  onClose,
  cartItems,
  onRemoveItem,
  onUpdateQuantity,
  onCheckout,
}) => {
  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  return (
    <>
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      ></div>
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-heading"
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 id="cart-heading" className="text-2xl font-bold text-text-primary">Tu Carrito</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar carrito">
            <CloseIcon />
          </button>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <svg className="w-24 h-24 text-gray-300 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c.51 0 .962-.343 1.087-.835l.383-1.437M7.5 14.25 5.106 5.165A2.25 2.25 0 0 0 2.868 3H2.25" />
            </svg>
            <p className="text-lg font-semibold text-text-secondary">Tu carrito está vacío</p>
            <p className="text-text-secondary">Añade productos para verlos aquí.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center mb-4">
                <img src={item.imageUrl} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-text-secondary text-sm">${item.price.toFixed(2)} / {item.unit}</p>
                  <div className="flex items-center mt-2">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value, 10))}
                      min="1"
                      className="w-16 border rounded-md text-center"
                      aria-label={`Cantidad de ${item.name}`}
                    />
                  </div>
                </div>
                <button onClick={() => onRemoveItem(item.id)} className="text-red-500 hover:text-red-700 ml-4" aria-label={`Quitar ${item.name} del carrito`}>
                  <TrashIcon />
                </button>
              </div>
            ))}
          </div>
        )}

        {cartItems.length > 0 && (
            <div className="p-4 border-t space-y-4">
                <div className="space-y-1 text-text-secondary">
                   <div className="flex justify-between">
                       <span>Subtotal:</span>
                       <span className="font-medium text-text-primary">${subtotal.toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between">
                       <span>Envío:</span>
                       <span className="italic">Se calculará en el checkout</span>
                   </div>
                </div>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300"
                >
                    Finalizar Compra
                </button>
            </div>
        )}
      </div>
    </>
  );
};

export default Cart;
