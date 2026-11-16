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
      <div className="group relative bg-white rounded-2xl shadow-xs p-5 flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-md border border-gray-100">
        <div>
          <Link to={`/produto/${product.id}`} className="block relative aspect-square bg-[#F8F8FA] rounded-xl flex items-center justify-center overflow-hidden mb-4">
            {product.discountTag && (
              <span className="absolute top-3 left-3 bg-[#E7FF86] text-[#474747] text-xs font-bold px-2.5 py-1 rounded-full uppercase z-10 shadow-xs">
                {product.discountTag}
              </span>
            )}
            <img
              src={product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </Link>
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold text-[#8F8F8F] uppercase tracking-wider">{product.category}</span>
          <Link to={`/produto/${product.id}`} className="block">
            <h3 className="text-sm sm:text-base text-[#474747] font-medium line-clamp-1 group-hover:text-[#C92071] transition-colors">
              {product.name}
            </h3>
          </Link>

          <div className="flex items-center justify-between pt-2">
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
              onClick={() => setIsModalOpen(true)}
              className="bg-[#C92071] hover:bg-[#991956] text-white p-2.5 rounded-xl shadow-sm transition-colors cursor-pointer"
              title="Escolher opções e adicionar"
              aria-label="Escolher opções e adicionar"
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
