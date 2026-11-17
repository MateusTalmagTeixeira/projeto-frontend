import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Heart, ShoppingBag, X, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CATEGORY_FALLBACKS = {
  Tênis: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80',
  Headphones: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80',
  Camisetas: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=600&q=80',
  Calças: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=600&q=80',
  Bonés: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=600&q=80',
};

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const navigate = useNavigate();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [quickBuyOpen, setQuickBuyOpen] = useState(false);

  // Define tamanhos e cores com base na categoria
  const isSneaker = product.category === 'Tênis';
  const isHeadphone = product.category === 'Headphones';

  const availableSizes = isSneaker
    ? ['38', '39', '40', '41', '42']
    : isHeadphone
    ? ['Tamanho Único']
    : ['P', 'M', 'G', 'GG'];

  const availableColors = isHeadphone
    ? [
        { name: 'Preto Fosco', class: 'bg-neutral-900 border-gray-300' },
        { name: 'Prata Metálico', class: 'bg-gray-300 border-gray-400' },
        { name: 'Branco Minimalista', class: 'bg-white border-gray-300' },
      ]
    : [
        { name: 'Preto', class: 'bg-black border-gray-300' },
        { name: 'Branco', class: 'bg-white border-gray-300' },
        { name: 'Rosa Drip', class: 'bg-[#C92071] border-[#C92071]' },
      ];

  const [selectedSize, setSelectedSize] = useState(availableSizes[0]);
  const [selectedColor, setSelectedColor] = useState(availableColors[0].name);

  const fallbackImg =
    CATEGORY_FALLBACKS[product.category] ||
    'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80';

  const initialImg =
    (Array.isArray(product.images) && product.images[0]) ||
    product.image ||
    product.imageUrl ||
    fallbackImg;

  const [imgSrc, setImgSrc] = useState(initialImg);

  useEffect(() => {
    setImgSrc(initialImg);
  }, [initialImg]);

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
        updated = [...saved, { ...product, image: imgSrc }];
        setIsWishlisted(true);
      }

      localStorage.setItem('dripstore_wishlist', JSON.stringify(updated));
      window.dispatchEvent(new Event('wishlistUpdated'));
    } catch (err) {
      console.error('Erro ao atualizar wishlist:', err);
    }
  };

  const handleConfirmQuickBuy = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    addToCart({
      ...product,
      image: imgSrc,
      selectedSize,
      selectedColor,
    });
    setQuickBuyOpen(false);
  };

  const finalPrice = product.priceDiscount || product.price;
  const badgeText = product.discountTag || (product.discount ? `${product.discount}% OFF` : null);

  return (
    <>
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
        {badgeText && (
          <span className="absolute top-6 left-6 z-10 bg-[#E7FF86] text-[#1F1F1F] text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase">
            {badgeText}
          </span>
        )}

        {/* Imagem e Link para Detalhes */}
        <Link to={`/produto/${product.id}`} className="block">
          <div className="aspect-square bg-[#F9F8FE] rounded-lg overflow-hidden flex items-center justify-center p-3 mb-4">
            <img
              src={imgSrc}
              alt={product.name}
              onError={() => {
                if (imgSrc !== fallbackImg) {
                  setImgSrc(fallbackImg);
                }
              }}
              className="w-full h-full object-cover rounded-md group-hover:scale-105 transition-transform duration-300"
            />
          </div>

          <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
            {product.category || 'Sneakers'}
          </span>
          <h3 className="text-sm font-semibold text-[#1F1F1F] line-clamp-2 mt-1 group-hover:text-[#C92071] transition-colors">
            {product.name}
          </h3>
        </Link>

        {/* Preço e Botão Quick Buy */}
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
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setQuickBuyOpen(true);
            }}
            title="Escolher opção"
            className="p-2.5 rounded-lg bg-[#F9F8FE] text-[#C92071] hover:bg-[#C92071] hover:text-white transition-colors cursor-pointer"
          >
            <ShoppingBag size={18} />
          </button>
        </div>
      </div>

      {/* MODAL QUICK BUY (Escolha de Tamanho/Modelo e Cor) */}
      {quickBuyOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div 
            className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl relative animate-in fade-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setQuickBuyOpen(false)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-[#1F1F1F] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X size={20} />
            </button>

            <div className="flex items-center gap-4 mb-6">
              <div className="w-20 h-20 bg-[#F9F8FE] rounded-xl p-2 flex items-center justify-center shrink-0">
                <img src={imgSrc} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <div>
                <span className="text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                  {product.category}
                </span>
                <h4 className="font-bold text-sm text-[#1F1F1F] line-clamp-2">{product.name}</h4>
                <p className="text-sm font-extrabold text-[#C92071] mt-1">
                  R$ {Number(finalPrice).toFixed(2).replace('.', ',')}
                </p>
              </div>
            </div>

            <div className="space-y-5">
              {/* Escolha de Tamanho / Formato */}
              <div>
                <label className="block text-xs font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  {isHeadphone ? 'Especificação:' : 'Tamanho:'}{' '}
                  <span className="text-[#C92071]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableSizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`h-11 px-4 rounded-lg font-bold text-sm transition-all cursor-pointer flex items-center justify-center border ${
                        selectedSize === size
                          ? 'border-[#C92071] bg-[#C92071] text-white shadow-sm'
                          : 'border-gray-200 bg-white text-[#1F1F1F] hover:border-gray-400'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Escolha de Cor */}
              <div>
                <label className="block text-xs font-bold text-[#1F1F1F] uppercase tracking-wider mb-2">
                  Cor / Acabamento: <span className="text-[#C92071]">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-3">
                  {availableColors.map((color) => (
                    <button
                      key={color.name}
                      type="button"
                      onClick={() => setSelectedColor(color.name)}
                      title={color.name}
                      className={`w-8 h-8 rounded-full ${color.class} border-2 transition-all cursor-pointer flex items-center justify-center shadow-xs ${
                        selectedColor === color.name ? 'ring-2 ring-[#C92071] ring-offset-2 scale-110' : 'opacity-80 hover:opacity-100'
                      }`}
                    >
                      {selectedColor === color.name && (
                        <Check size={14} className={color.name.includes('Branco') || color.name.includes('Prata') ? 'text-black' : 'text-white'} />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Botão Confirmar */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={handleConfirmQuickBuy}
                  className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <ShoppingBag size={18} /> Adicionar ao Carrinho
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
