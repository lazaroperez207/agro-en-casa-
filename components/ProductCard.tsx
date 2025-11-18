import React from 'react';
import type { Product } from '../types';
import CartIcon from './icons/CartIcon';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart }) => {
  const isOutOfStock = product.stock <= 0;
  const isLowStock = product.stock > 0 && product.stock <= 10;

  return (
    <div className={`group bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ease-in-out hover:shadow-2xl hover:-translate-y-2 flex flex-col ${isOutOfStock ? 'saturate-50 opacity-60' : ''}`}>
      <div className="relative">
        <img 
          className="w-full h-52 object-cover transition-transform duration-300 group-hover:scale-105" 
          src={product.imageUrl} 
          alt={product.name} 
        />
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-t from-black/50 to-transparent"></div>
        {isLowStock && <span className="absolute top-3 left-3 bg-yellow-400 text-yellow-900 text-xs font-semibold px-2.5 py-1 rounded-full border border-yellow-500">¡Poco stock!</span>}
        {isOutOfStock && <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full border border-red-600">Agotado</span>}
        
        <div className="absolute bottom-0 left-0 p-4">
           <p className="text-sm text-gray-200">{product.category}</p>
           <h3 className="text-xl font-bold text-white tracking-tight leading-tight">{product.name}</h3>
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-2xl font-extrabold text-primary">${product.price.toFixed(2)}</span>
            <span className="text-sm text-text-secondary"> / {product.unit}</span>
          </div>
        </div>
        
        <button
          onClick={() => onAddToCart(product)}
          disabled={isOutOfStock}
          className="mt-auto w-full flex items-center justify-center gap-2 bg-primary text-white rounded-lg px-4 py-2.5 font-semibold hover:bg-primary-dark transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed group-hover:scale-105 group-hover:shadow-lg"
          aria-label={`Añadir ${product.name} al carrito`}
        >
          <CartIcon className="w-5 h-5" />
          <span>Añadir</span>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;