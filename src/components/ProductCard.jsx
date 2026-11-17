import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);

  const isLoggedIn = () => {
    return Boolean(
      localStorage.getItem('user') ||
      localStorage.getItem('dripstore_user') ||
      localStorage.getItem('token') ||
      localStorage.getItem('dripstore_token')
    );
  };

  useEffect(() => {
    if (!isLoggedIn()) {
      setIsWishlisted(false);
      return;
    }
    try {
      const saved = JSON.parse(localStorage.getItem('dripstore_wishlist') || '[]');
      setIsWishlisted(saved.some((item) => item.id === product.id));
    } catch {
      setIsWishlisted(false);
    }
  }, [product.id]);

  const handleToggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!isLoggedIn()) {
      navigate('/login');
      return;
    }

    try {
      const saved = JSON.parse(localStorage.getItem('dripstore_wishlist') || '[]');
      const exists = saved.some((item) => item.id === product.id);
      let updated;

      if (exists) {
        updated = saved.filter((item) => item.id !== product.id);
        setIsWishlisted(false);
      } else {
        updated = [...saved, product];
        setIsWishlisted(true);
      }

      localStorage.setItem('dripstore_wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (err) {
      console.error('Erro ao atualizar wishlist:', err);
    }
  };

  const finalPrice = product.priceDiscount || product.price;
  const productImage =
    product.image ||
    product.imageUrl ||
    product.img ||
    (Array.isArray(product.images) && product.images[0]) ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80';

  return (
    <div className="group bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all border border-gray-100 flex flex-col justify-between relative">
      {/* Botão Wishlist no topo direito */}
      <button
        type="button"
        onClick={handleToggleWishlist}
        title={isWishlisted ? 'Remover da Wishlist' : 'Adicionar à Wishlist'}
        className={`absolute top-6 right-6 z-10 p-2 rounded-full shadow-sm transition-all cursor-pointer ${
          isWishlisted
            ? 'bg-[#C92071] text-white'
            : 'bg-white/90 text-gray-400 hover:text-[#C92071] hover:bg-white'
        }`}
      >
        <Heart size={16} className={isWishlisted ? 'fill-white' : ''} />
      </button>

      {/* Badge de Desconto */}
      {product.discount && (
        <span className="absolute top-6 left-6 z-10 bg-[#E7FF86] text-[#1F1F1F] text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase">
          {product.discount}% OFF
        </span>
      )}

      {/* Imagem e Link para Detalhes */}
      <Link to={`/produto/${product.id}`} className="block">
        <div className="aspect-square bg-[#F9F8FE] rounded-lg overflow-hidden flex items-center justify-center p-4 mb-4">
          <img
            src={productImage}
            alt={product.name}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80';
            }}
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
          {product.category || 'Sneakers'}
        </span>
        <h3 className="text-sm font-semibold text-[#1F1F1F] line-clamp-2 mt-1 group-hover:text-[#C92071] transition-colors">
          {product.name}
        </h3>
      </Link>

      {/* Preço e Botão Comprar */}
      <div className="mt-3 pt-3 border-t border-gray-50 flex items-center justify-between gap-2">
        <div>
          {product.priceDiscount && (
            <span className="block text-xs text-gray-400 line-through">
              R$ {Number(product.price).toFixed(2).replace('.', ',')}
            </span>
          )}
          <span className="text-base font-extrabold text-[#1F1F1F]">
            R$ {Number(finalPrice).toFixed(2).replace('.', ',')}
          </span>
        </div>

        <button
          type="button"
          onClick={() => addToCart(product)}
          title="Adicionar ao carrinho"
          className="p-2.5 rounded-lg bg-[#F9F8FE] text-[#C92071] hover:bg-[#C92071] hover:text-white transition-colors cursor-pointer"
        >
          <ShoppingBag size={18} />
        </button>
      </div>
    </div>
  );
}
