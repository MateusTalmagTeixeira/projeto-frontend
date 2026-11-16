import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="group relative bg-white rounded-xl shadow-xs p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
      <div>
        <Link to={`/produto/${product.id}`} className="block relative aspect-square flex items-center justify-center overflow-hidden">
          {product.discountTag && (
            <span className="absolute top-2 left-2 bg-[#E7FF86] text-[#474747] text-xs font-bold px-2.5 py-0.5 rounded-full uppercase z-10">
              {product.discountTag}
            </span>
          )}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      <div className="mt-4 space-y-2">
        <span className="text-xs font-bold text-[#8F8F8F] uppercase">{product.category}</span>
        <Link to={`/produto/${product.id}`} className="block">
          <h3 className="text-sm sm:text-base text-[#474747] font-medium line-clamp-1 group-hover:text-[#C92071] transition-colors">
            {product.name}
          </h3>
        </Link>

        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            {product.priceDiscount ? (
              <>
                <span className="text-xs text-[#8F8F8F] line-through">
                  {formatPrice(product.price)}
                </span>
                <span className="text-sm sm:text-base text-[#1F1F1F] font-bold">
                  {formatPrice(product.priceDiscount)}
                </span>
              </>
            ) : (
              <span className="text-sm sm:text-base text-[#1F1F1F] font-bold">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          <button
            onClick={() => addToCart(product, product.sizes?.[0] || 'Único', product.colors?.[0] || '#1F1F1F')}
            className="bg-[#C92071] hover:bg-[#991956] text-white p-2.5 rounded-lg shadow-sm transition-colors cursor-pointer"
            title="Adicionar ao carrinho"
            aria-label="Adicionar ao carrinho"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
