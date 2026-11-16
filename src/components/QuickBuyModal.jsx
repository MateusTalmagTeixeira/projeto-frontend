import { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function QuickBuyModal({ product, onClose }) {
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || 'Único');
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '#1F1F1F');
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart(product, selectedSize, selectedColor);
    onClose();
  };

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-xs p-4">
      <div className="bg-white w-full max-w-md rounded-2xl p-6 shadow-2xl relative space-y-6">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-[#C92071] cursor-pointer"
        >
          <X size={20} />
        </button>

        <div className="flex items-center gap-4 border-b border-gray-100 pb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-20 h-20 rounded-xl bg-[#E2E3FF] object-contain p-2 shrink-0"
          />
          <div>
            <span className="text-xs font-bold text-[#8F8F8F] uppercase">{product.category}</span>
            <h3 className="text-base font-bold text-[#1F1F1F] line-clamp-1">{product.name}</h3>
            <p className="text-lg font-bold text-[#1F1F1F] mt-1">
              {formatPrice(product.priceDiscount || product.price)}
            </p>
          </div>
        </div>

        {/* Seleção de Tamanho */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#8F8F8F] uppercase">Tamanho:</label>
          <div className="flex flex-wrap gap-2">
            {product.sizes?.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`min-w-10 h-10 px-3 rounded-lg font-bold text-xs border transition-all cursor-pointer ${
                  selectedSize === size
                    ? 'bg-[#C92071] text-white border-[#C92071] shadow-xs'
                    : 'bg-white text-[#474747] border-gray-200 hover:border-[#C92071]'
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>

        {/* Seleção de Cor */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-[#8F8F8F] uppercase">Cor:</label>
          <div className="flex items-center gap-3">
            {product.colors?.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-9 h-9 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                  selectedColor === color ? 'border-[#C92071] scale-110' : 'border-transparent'
                }`}
              >
                <span
                  className="block w-full h-full rounded-full border border-black/10 shadow-xs"
                  style={{ backgroundColor: color }}
                />
              </button>
            ))}
          </div>
        </div>

        <button
          onClick={handleAdd}
          className="w-full flex items-center justify-center gap-2 bg-[#C92071] hover:bg-[#991956] text-white font-semibold py-3.5 rounded-xl transition-colors cursor-pointer shadow-md"
        >
          <ShoppingCart size={18} /> Confirmar e Adicionar
        </button>
      </div>
    </div>
  );
}
