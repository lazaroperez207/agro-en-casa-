
import React from 'react';
import ShoppingBagIcon from './icons/ShoppingBagIcon';
import TruckIcon from './icons/TruckIcon';
import StarIcon from './icons/StarIcon';
import ShieldIcon from './icons/ShieldIcon';

interface HomePageProps {
  onNavigate: () => void;
  appLogoUrl: string;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate, appLogoUrl }) => {
  return (
    <div className="bg-gradient-to-b from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-4 mb-6">
            <img 
              src={appLogoUrl}
              alt="AGRO EN CASA🥗🍇🥙 Logo" 
              className="w-24 h-24 rounded-full shadow-2xl" 
            />
            <h1 className="text-5xl md:text-6xl font-extrabold text-green-800 tracking-tight">
              AGRO EN CASA🥗🍇🥙
            </h1>
          </div>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-3xl mx-auto">
            Productos agrícolas frescos directamente del campo a tu hogar
          </p>
          <button
            onClick={onNavigate}
            className="inline-block bg-gradient-to-r from-green-600 to-green-700 text-white px-8 py-4 rounded-xl text-lg font-semibold hover:from-green-700 hover:to-green-800 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Ver Productos
          </button>
        </div>

        <div className="bg-amber-50 border-l-4 border-amber-400 p-6 rounded-r-lg mb-16 shadow-md">
            <h2 className="text-2xl font-bold text-amber-800 mb-2">AGRO EN CASA🥗🍇🥙</h2>
            <p className="text-amber-700 leading-relaxed">
                ¡Bienbenidos a AGRO EN CASA🥗🍇🥙! Se realiza el servicio a domicilio de productos del Agro mercado <strong>SOLO EN LA HABANA</strong>.
                Las entregas las realizamos en el mismo día que usted hace su pedido y así puede disfrutar de productos frescos y de gran calidad.
                ¡Este es un Proyecto de apoyo a la familia cubana con la Seriedad y seguridad en el servicio que usted se merece!
            </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShoppingBagIcon className="text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Productos Frescos</h3>
            <p className="text-gray-600">Directamente del campo, garantizamos frescura en cada producto.</p>
          </div>
          <div className="bg-blue-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <TruckIcon className="text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Entrega Rápida</h3>
            <p className="text-gray-600">Recibe tus productos en la puerta de tu casa en tiempo récord.</p>
          </div>
          <div className="bg-yellow-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <StarIcon className="text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Calidad Premium</h3>
            <p className="text-gray-600">Seleccionamos los mejores productos para nuestros clientes.</p>
          </div>
          <div className="bg-purple-100 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ShieldIcon className="text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Compra Segura</h3>
            <p className="text-gray-600">Tu información y pagos están completamente protegidos.</p>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-3xl p-12 text-white text-center shadow-2xl">
          <h2 className="text-4xl font-bold mb-4">¿Listo para comenzar?</h2>
          <p className="text-xl mb-8 text-green-100">Explora nuestro catálogo y disfruta de productos agrícolas de primera calidad.</p>
          <button
            onClick={onNavigate}
            className="inline-block bg-white text-green-700 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-green-50 transition-colors shadow-lg"
          >
            Explorar Productos
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;