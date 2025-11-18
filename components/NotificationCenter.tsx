import React from 'react';
import type { Notification } from '../types';
import CloseIcon from './icons/CloseIcon';
import TrashIcon from './icons/TrashIcon';
import BellIcon from './icons/BellIcon';

interface NotificationCenterProps {
  isOpen: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (notificationId: number) => void;
  onClearAll: () => void;
}

const timeSince = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
    let interval = seconds / 31536000;
    if (interval > 1) return `hace ${Math.floor(interval)} años`;
    interval = seconds / 2592000;
    if (interval > 1) return `hace ${Math.floor(interval)} meses`;
    interval = seconds / 86400;
    if (interval > 1) return `hace ${Math.floor(interval)} días`;
    interval = seconds / 3600;
    if (interval > 1) return `hace ${Math.floor(interval)} horas`;
    interval = seconds / 60;
    if (interval > 1) return `hace ${Math.floor(interval)} minutos`;
    return "hace unos segundos";
};


const NotificationCenter: React.FC<NotificationCenterProps> = ({
  isOpen,
  onClose,
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
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
        aria-labelledby="notifications-heading"
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-gray-50 shadow-xl z-50 transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        } flex flex-col`}
      >
        <div className="flex justify-between items-center p-4 border-b bg-white">
          <h2 id="notifications-heading" className="text-2xl font-bold text-text-primary">Notificaciones</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-800" aria-label="Cerrar notificaciones">
            <CloseIcon />
          </button>
        </div>

        {notifications.length === 0 ? (
          <div className="flex-grow flex flex-col items-center justify-center text-center p-4">
            <BellIcon className="w-24 h-24 text-gray-300 mb-4" />
            <p className="text-lg font-semibold text-text-secondary">No hay notificaciones</p>
            <p className="text-text-secondary">Tus actualizaciones de pedidos aparecerán aquí.</p>
          </div>
        ) : (
          <div className="flex-grow overflow-y-auto p-2 space-y-2">
            {notifications.map(notif => (
              <div
                key={notif.id}
                onClick={() => onMarkAsRead(notif.id)}
                className={`p-4 rounded-lg cursor-pointer transition-colors ${
                  notif.read ? 'bg-white shadow-sm' : 'bg-green-100 shadow'
                }`}
              >
                <div className="flex items-start">
                  <div className={`w-2 h-2 rounded-full mt-1.5 mr-3 flex-shrink-0 ${notif.read ? 'bg-gray-300' : 'bg-primary'}`}></div>
                  <div className="flex-grow">
                    <p className="font-semibold text-gray-800">Pedido #{notif.orderNumber}</p>
                    <p className="text-sm text-gray-600">{notif.message}</p>
                    <p className="text-xs text-gray-400 mt-1">{timeSince(notif.date)}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {notifications.length > 0 && (
          <div className="p-4 border-t bg-white">
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center gap-2 text-sm text-red-600 hover:text-red-800 font-semibold py-2 rounded-lg hover:bg-red-50 transition-colors duration-300"
            >
              <TrashIcon className="w-4 h-4" />
              Limpiar Todas
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default NotificationCenter;
