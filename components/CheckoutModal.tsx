import React, { useState, useMemo, useEffect } from 'react';
import type { CartItem, DeliveryZone, PaymentMethod, PaymentDetails } from '../types';
import CloseIcon from './icons/CloseIcon';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPlaceOrder: (customerDetails: { name: string; address: string; phone: string; paymentMethod: string; }, deliveryCost: number) => void;
  cartItems: CartItem[];
  deliveryZones: DeliveryZone[];
  paymentMethods: PaymentMethod[];
  paymentDetails: PaymentDetails;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, onPlaceOrder, cartItems, deliveryZones, paymentMethods, paymentDetails }) => {
  const enabledPaymentMethods = useMemo(() => paymentMethods.filter(p => p.enabled), [paymentMethods]);
  
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState(enabledPaymentMethods[0]?.id || '');
  const [distance, setDistance] = useState('');
  const [deliveryCost, setDeliveryCost] = useState<number | null>(null);
  const [distanceError, setDistanceError] = useState('');

  const subtotal = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }, [cartItems]);
  
  const totalPrice = useMemo(() => {
    return subtotal + (deliveryCost || 0);
  }, [subtotal, deliveryCost]);

  useEffect(() => {
      const dist = parseFloat(distance);
      if (!isNaN(dist) && dist > 0) {
          const sortedZones = [...deliveryZones].sort((a, b) => a.maxDistanceKm - b.maxDistanceKm);
          const applicableZone = sortedZones.find(zone => dist <= zone.maxDistanceKm);
          
          if (applicableZone) {
              setDeliveryCost(applicableZone.cost);
              setDistanceError('');
          } else {
              setDeliveryCost(null);
              setDistanceError('Fuera de la zona de entrega.');
          }
      } else {
          setDeliveryCost(null);
          setDistanceError('');
      }
  }, [distance, deliveryZones]);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && address && phone && paymentMethod && deliveryCost !== null) {
      const selectedMethod = paymentMethods.find(p => p.id === paymentMethod);
      onPlaceOrder({ name, address, phone, paymentMethod: selectedMethod?.name || 'No especificado' }, deliveryCost);
    } else {
      alert('Por favor, completa todos los campos y asegúrate de que la distancia esté dentro de nuestra zona de entrega.');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] flex flex-col">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-2xl font-bold text-text-primary">Confirmar Pedido</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar modal">
            <CloseIcon />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col overflow-hidden">
          <div className="p-6 overflow-y-auto space-y-6">
            <div>
                <h3 className="text-lg font-semibold mb-2">Resumen del Pedido</h3>
                <div className="space-y-2 text-sm text-gray-600 border p-3 rounded-md">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between">
                            <span>{item.quantity} x {item.name}</span>
                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                        </div>
                    ))}
                    <div className="flex justify-between border-t pt-2">
                        <span>Subtotal</span>
                        <span>${subtotal.toFixed(2)}</span>
                    </div>
                     <div className="flex justify-between">
                        <span>Envío</span>
                        <span>{deliveryCost !== null ? `$${deliveryCost.toFixed(2)}` : 'Calculando...'}</span>
                    </div>
                    <div className="flex justify-between font-bold text-base text-black border-t pt-2">
                        <span>Total</span>
                        <span>${totalPrice.toFixed(2)}</span>
                    </div>
                </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Datos de Entrega</h3>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
                  <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                </div>
                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">Dirección de Entrega</label>
                  <input type="text" id="address" value={address} onChange={e => setAddress(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                </div>
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Número de Teléfono</label>
                  <input type="tel" id="phone" value={phone} onChange={e => setPhone(e.target.value)} required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                </div>
                 <div>
                    <label htmlFor="distance" className="block text-sm font-medium text-gray-700">Distancia aproximada (KM)</label>
                    <input type="number" id="distance" value={distance} onChange={e => setDistance(e.target.value)} placeholder="Ej: 7.5" required className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border" />
                     {distanceError && <p className="text-red-500 text-xs mt-1">{distanceError}</p>}
                </div>
              </div>
            </div>
             <div>
                <h3 className="text-lg font-semibold mb-2">Método de Pago</h3>
                <select value={paymentMethod} onChange={e => setPaymentMethod(e.target.value)} className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-primary focus:border-primary sm:text-sm p-2 border">
                    {enabledPaymentMethods.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                
                {paymentMethod === 'transferencia' && paymentDetails.accountNumber && (
                    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md text-sm text-blue-800">
                        <p className="font-semibold">Por favor, transfiere el total a la siguiente cuenta:</p>
                        <p><strong>Banco:</strong> {paymentDetails.bankName}</p>
                        <p><strong>Titular:</strong> {paymentDetails.accountHolder}</p>
                        <p><strong>Cuenta:</strong> {paymentDetails.accountNumber}</p>
                        {paymentDetails.bankNotes && <p className="mt-2 text-xs"><em>Nota: {paymentDetails.bankNotes}</em></p>}
                    </div>
                )}
                {paymentMethod === 'zelle' && paymentDetails.zelleInfo && (
                    <div className="mt-4 p-3 bg-indigo-50 border border-indigo-200 rounded-md text-sm text-indigo-800">
                        <p className="font-semibold">Por favor, realiza el pago por Zelle a:</p>
                        <p><strong>Correo/Teléfono:</strong> {paymentDetails.zelleInfo}</p>
                        {paymentDetails.zelleNotes && <p className="mt-2 text-xs"><em>Nota: {paymentDetails.zelleNotes}</em></p>}
                    </div>
                )}
             </div>
          </div>
          <div className="p-4 border-t bg-gray-50">
            <button
              type="submit"
              disabled={deliveryCost === null}
              className="w-full bg-primary text-white py-3 rounded-lg font-semibold hover:bg-primary-dark transition-colors duration-300 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              Realizar Pedido (${totalPrice.toFixed(2)})
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutModal;