import { Link } from 'react-router-dom';

export default function ProductCard({ product }) {
  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <Link to={`/produto/${product.id}`} className="group block">
      <div className="relative bg-white rounded-md shadow-xs p-5 aspect-square flex items-center justify-center overflow-hidden transition-transform duration-200 group-hover:-translate-y-1">
        {product.discountTag && (
          <span className="absolute top-4 left-4 bg-[#E7FF86] text-[#474747] text-xs font-bold px-3 py-1 rounded-full uppercase">
            {product.discountTag}
          </span>
        )}
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="mt-3 space-y-1">
        <p className="text-xs font-bold text-[#8F8F8F]">{product.category}</p>
        <h3 className="text-base sm:text-lg text-[#474747] font-normal line-clamp-1 group-hover:text-[#C92071] transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-2 text-base sm:text-lg">
          {product.priceDiscount ? (
            <>
              <span className="text-[#8F8F8F] line-through">
                {formatPrice(product.price)}
              </span>
              <span className="text-[#1F1F1F] font-bold">
                {formatPrice(product.priceDiscount)}
              </span>
            </>
          ) : (
            <span className="text-[#1F1F1F] font-bold">
              {formatPrice(product.price)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
