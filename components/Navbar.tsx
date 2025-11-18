

import React from 'react';
import type { User, Role } from '../types';
import CartIcon from './icons/CartIcon';
import UserIcon from './icons/UserIcon';
import LogoutIcon from './icons/LogoutIcon';
import BellIcon from './icons/BellIcon';

interface NavbarProps {
  user: User | null;
  // FIX: Changed 'orders' to 'customerOrders' to match App state and added it as a navigation option.
  onNavigate: (page: 'home' | 'products' | 'login' | 'admin' | 'messenger' | 'customerOrders' | 'registration') => void;
  onLogout: () => void;
  onCartClick: () => void;
  cartItemCount: number;
  onNotificationsClick: () => void;
  unreadNotificationCount: number;
  appLogoUrl: string;
}

const Navbar: React.FC<NavbarProps> = ({ user, onNavigate, onLogout, onCartClick, cartItemCount, onNotificationsClick, unreadNotificationCount, appLogoUrl }) => {
  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div 
            className="flex items-center space-x-2 cursor-pointer" 
            onClick={() => onNavigate(user?.role === 'admin' ? 'admin' : user?.role === 'messenger' ? 'messenger' : 'home')}
          >
            <img src={appLogoUrl} alt="Logo" className="w-10 h-10 rounded-full" />
            <span className="text-2xl font-bold text-primary hidden sm:inline">AGRO EN CASA🥗🍇🥙</span>
          </div>

          <div className="flex items-center space-x-4">
            {user?.role !== 'admin' && user?.role !== 'messenger' && (
               <button onClick={() => onNavigate('products')} className="text-gray-600 hover:text-primary transition-colors">Productos</button>
            )}
            
            {user?.role === 'customer' && (
               <button onClick={() => onNavigate('customerOrders')} className="text-gray-600 hover:text-primary transition-colors">Mis Pedidos</button>
            )}
           
            {user ? (
              <>
                <span className="text-gray-700 hidden md:inline">Hola, {user.name}</span>
                 <button
                    onClick={onLogout}
                    className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                    aria-label="Cerrar sesión"
                  >
                    <LogoutIcon />
                    <span className="hidden md:inline">Salir</span>
                 </button>
              </>
            ) : (
              <button
                onClick={() => onNavigate('login')}
                className="flex items-center space-x-2 text-gray-600 hover:text-primary transition-colors"
                aria-label="Iniciar sesión"
              >
                <UserIcon />
                <span className="hidden md:inline">Login</span>
              </button>
            )}
            
            {(user?.role === 'customer' || !user) && (
             <>
               <button
                  onClick={onNotificationsClick}
                  className="relative text-gray-600 hover:text-primary transition-colors duration-300"
                  aria-label="Ver notificaciones"
                >
                  <BellIcon />
                  {unreadNotificationCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center animate-pulse">
                      {unreadNotificationCount}
                    </span>
                  )}
                </button>

                <button
                  onClick={onCartClick}
                  className="relative text-gray-600 hover:text-primary transition-colors duration-300"
                  aria-label="Ver carrito de compras"
                >
                  <CartIcon />
                  {cartItemCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-secondary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {cartItemCount}
                    </span>
                  )}
                </button>
             </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
