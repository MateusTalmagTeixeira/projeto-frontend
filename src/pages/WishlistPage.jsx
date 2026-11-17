import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Heart, Lock, ArrowRight, Trash2, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function WishlistPage() {
  const [user, setUser] = useState(null);
  const [wishlist, setWishlist] = useState([]);
  const { addToCart } = useCart();

  const loadWishlist = () => {
    const storedUser = localStorage.getItem('user') || localStorage.getItem('dripstore_user');
    const token = localStorage.getItem('token') || localStorage.getItem('dripstore_token');

    if (storedUser || token) {
      try {
        setUser(storedUser ? JSON.parse(storedUser) : { name: 'Cliente' });
      } catch {
        setUser({ name: 'Cliente' });
      }

      try {
        const saved = JSON.parse(localStorage.getItem('dripstore_wishlist') || '[]');
        setWishlist(saved);
      } catch {
        setWishlist([]);
      }
    } else {
      setUser(null);
      setWishlist([]);
    }
  };

  useEffect(() => {
    loadWishlist();
    window.addEventListener('wishlistUpdated', loadWishlist);
    return () => window.removeEventListener('wishlistUpdated', loadWishlist);
  }, []);

  const handleRemove = (id) => {
    const updated = wishlist.filter((item) => item.id !== id);
    setWishlist(updated);
    localStorage.setItem('dripstore_wishlist', JSON.stringify(updated));
  };

  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center space-y-5">
          <div className="w-16 h-16 bg-[#F9F8FE] text-[#C92071] rounded-full flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Faça login para acessar sua Wishlist</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Salve seus produtos favoritos para comprar depois! Entre na sua conta Digital Store para visualizar ou gerenciar sua lista de desejos.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-[#C92071] hover:bg-[#991956] text-white font-bold text-sm px-8 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Entrar na minha conta <ArrowRight size={16} />
            </Link>
            <Link
              to="/cadastro"
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-[#1F1F1F] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Minha Wishlist</h1>
          <p className="text-sm text-gray-500">Seus produtos favoritos salvos em um só lugar</p>
        </div>
        <Link
          to="/produtos"
          className="text-sm font-bold text-[#C92071] hover:underline inline-flex items-center gap-1"
        >
          Explorar mais produtos <ArrowRight size={16} />
        </Link>
      </div>

      {wishlist.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-[#F9F8FE] text-gray-400 rounded-full flex items-center justify-center mx-auto">
            <Heart size={28} />
          </div>
          <h2 className="text-lg font-bold text-[#1F1F1F]">Sua lista de desejos está vazia</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Clique no ícone de coração nos produtos da loja para salvá-los aqui!
          </p>
          <div className="pt-2">
            <Link
              to="/produtos"
              className="bg-[#C92071] hover:bg-[#991956] text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Ver produtos
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlist.map((product) => {
            const finalPrice = product.priceDiscount || product.price;
            const productImage =
              product.image ||
              product.imageUrl ||
              product.img ||
              (Array.isArray(product.images) && product.images[0]) ||
              'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80';

            return (
              <div
                key={product.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <Link to={`/produto/${product.id}`} className="block">
                    <div className="aspect-square bg-[#F9F8FE] rounded-lg p-4 mb-3 flex items-center justify-center">
                      <img
                        src={productImage}
                        alt={product.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <h3 className="text-sm font-semibold text-[#1F1F1F] line-clamp-2 hover:text-[#C92071]">
                      {product.name}
                    </h3>
                  </Link>
                  <p className="text-base font-extrabold text-[#1F1F1F] mt-2">
                    R$ {Number(finalPrice).toFixed(2).replace('.', ',')}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => addToCart(product)}
                    className="flex-1 bg-[#C92071] hover:bg-[#991956] text-white text-xs font-bold py-2.5 px-3 rounded-lg transition-colors inline-flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <ShoppingBag size={14} /> Comprar
                  </button>
                  <button
                    type="button"
                    onClick={() => handleRemove(product.id)}
                    title="Remover da Wishlist"
                    className="p-2.5 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
