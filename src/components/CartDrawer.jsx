import { X, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartDrawer() {
  const { cart, removeFromCart, clearCart, totalPrice, isCartOpen, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  if (!isCartOpen) return null;

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const handleCheckout = () => {
    setIsCartOpen(false);
    clearCart();
    navigate('/checkout/sucesso');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-xs">
      <div className="bg-white w-full max-w-sm h-full flex flex-col justify-between p-6 shadow-2xl">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-gray-200">
            <h3 className="font-bold text-base text-[#474747]">Meu Carrinho</h3>
            <button
              onClick={() => setIsCartOpen(false)}
              className="text-[#474747] hover:text-[#C92071] cursor-pointer"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mt-4 space-y-4 max-h-[55vh] overflow-y-auto pr-1">
            {cart.length === 0 ? (
              <div className="py-16 text-center space-y-4">
                <ShoppingBag size={48} className="mx-auto text-gray-300" />
                <p className="text-sm text-[#8F8F8F]">Seu carrinho está vazio.</p>
                <button
                  onClick={() => {
                    setIsCartOpen(false);
                    navigate('/produtos');
                  }}
                  className="bg-[#C92071] text-white text-xs font-bold px-5 py-2.5 rounded-lg cursor-pointer hover:bg-[#991956]"
                >
                  Ver Produtos
                </button>
              </div>
            ) : (
              cart.map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 pb-3 border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded bg-[#E2E3FF] object-contain p-1 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-[#1F1F1F] truncate">{item.name}</p>
                    <p className="text-xs text-[#8F8F8F]">
                      Tam: {item.size} • Qtd: {item.quantity}
                    </p>
                    <p className="text-sm font-bold text-[#1F1F1F] mt-1">
                      {formatPrice(item.price * item.quantity)}
                    </p>
                  </div>
                  <button
                    onClick={() => removeFromCart(idx)}
                    className="text-gray-400 hover:text-red-500 p-1 cursor-pointer"
                    aria-label="Remover item"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ))
            )}
          </div>
        </div>

        {cart.length > 0 && (
          <div className="pt-4 border-t border-gray-200 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold text-[#474747]">Valor total:</span>
              <span className="text-lg font-bold text-[#EE4266]">
                {formatPrice(totalPrice)}
              </span>
            </div>

            <div className="flex items-center justify-between gap-3">
              <button
                onClick={clearCart}
                className="text-xs text-[#474747] underline hover:text-[#C92071] cursor-pointer"
              >
                Esvaziar
              </button>
              <button
                onClick={handleCheckout}
                className="bg-[#C92071] hover:bg-[#991956] text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors cursor-pointer"
              >
                Finalizar Pedido
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
