import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import QuickBuyModal from './QuickBuyModal';

export default function ProductCard({ product }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <>
      <div className="group relative bg-white rounded-2xl shadow-xs p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-xl border border-gray-100">
        <div>
          <Link to={`/produto/${product.id}`} className="block relative aspect-square bg-[#F4F4F6] rounded-xl flex items-center justify-center overflow-hidden mb-4 p-4">
            {product.discountTag && (
              <span className="absolute top-3 left-3 bg-[#E7FF86] text-[#1F1F1F] text-[10px] font-black px-2.5 py-1 rounded-md uppercase z-10 shadow-xs tracking-wide">
                {product.discountTag}
              </span>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover rounded-lg group-hover:scale-105 transition-transform duration-500"
            />
          </Link>
        </div>

        <div className="space-y-2">
          <span className="text-[11px] font-bold text-[#8F8F8F] uppercase tracking-widest">{product.category}</span>
          <Link to={`/produto/${product.id}`} className="block">
            <h3 className="text-sm font-semibold text-[#1F1F1F] line-clamp-1 group-hover:text-[#C92071] transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between pt-2 border-t border-gray-100">
            <div className="flex flex-col">
              {product.priceDiscount ? (
                <>
                  <span className="text-[11px] text-[#8F8F8F] line-through font-medium">
                    {formatPrice(product.price)}
                  </span>
                  <span className="text-base text-[#1F1F1F] font-black">
                    {formatPrice(product.priceDiscount)}
                  </span>
                </>
              ) : (
                <span className="text-base text-[#1F1F1F] font-black">
                  {formatPrice(product.price)}
                </span>
              )}
            </div>

            <button
              onClick={() => setIsModalOpen(true)}
              className="bg-[#1F1F1F] hover:bg-[#C92071] text-white p-3 rounded-xl shadow-md transition-all duration-300 cursor-pointer flex items-center justify-center group-hover:scale-105"
              title="Adicionar ao carrinho"
              aria-label="Adicionar ao carrinho"
            >
              <ShoppingCart size={18} />
            </button>
          </div>
        </div>
      </div>

      {isModalOpen && (
        <QuickBuyModal product={product} onClose={() => setIsModalOpen(false)} />
      )}
    </>
  );
}
