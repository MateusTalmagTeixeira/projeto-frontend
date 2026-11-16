import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '', email: '', cpf: '', phone: '', address: '', city: '', cep: '', paymentMethod: 'credit'
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFinalize = (e) => {
    e.preventDefault();
    clearCart();
    navigate('/checkout/sucesso');
  };

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-[#1F1F1F]">Seu carrinho está vazio</h2>
        <button
          onClick={() => navigate('/produtos')}
          className="bg-[#C92071] text-white px-6 py-3 rounded-lg font-semibold"
        >
          Voltar às Compras
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F] mb-8">Finalizar Pedido</h1>

      <form onSubmit={handleFinalize} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div className="lg:col-span-7 space-y-8">
          {/* Dados Pessoais */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-bold text-base text-[#474747] border-b border-gray-100 pb-3">
              1. Informações Pessoais
            </h2>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Nome Completo *</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Seu nome"
                value={form.name}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#474747]">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="seu@email.com"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#474747]">CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  required
                  placeholder="000.000.000-00"
                  value={form.cpf}
                  onChange={handleChange}
                  className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
                />
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-bold text-base text-[#474747] border-b border-gray-100 pb-3">
              2. Endereço de Entrega
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-[#474747]">Endereço *</label>
                <input
                  type="text"
                  name="address"
                  required
                  placeholder="Rua, Número"
                  value={form.address}
                  onChange={handleChange}
                  className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-[#474747]">CEP *</label>
                <input
                  type="text"
                  name="cep"
                  required
                  placeholder="00000-000"
                  value={form.cep}
                  onChange={handleChange}
                  className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
                />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Cidade *</label>
              <input
                type="text"
                name="city"
                required
                placeholder="Sua cidade"
                value={form.city}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>
          </div>

          {/* Forma de Pagamento */}
          <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
            <h2 className="font-bold text-base text-[#474747] border-b border-gray-100 pb-3">
              3. Forma de Pagamento
            </h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                { id: 'credit', label: 'Cartão de Crédito' },
                { id: 'pix', label: 'Pix' },
                { id: 'boleto', label: 'Boleto Bancário' },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`border rounded-xl p-4 text-center cursor-pointer font-bold text-xs sm:text-sm transition-all ${
                    form.paymentMethod === method.id
                      ? 'border-[#C92071] bg-[#C92071]/5 text-[#C92071]'
                      : 'border-gray-200 text-[#474747]'
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    value={method.id}
                    checked={form.paymentMethod === method.id}
                    onChange={handleChange}
                    className="sr-only"
                  />
                  {method.label}
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Resumo do Pedido */}
        <div className="lg:col-span-5 bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-6">
          <h2 className="font-bold text-base text-[#474747] border-b border-gray-100 pb-3">
            Resumo do Pedido
          </h2>

          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {cart.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between text-sm">
                <span className="text-[#474747] truncate max-w-[200px]">
                  {item.quantity}x {item.name}
                </span>
                <span className="font-bold text-[#1F1F1F]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div className="pt-4 border-t border-gray-100 space-y-2">
            <div className="flex justify-between text-sm text-[#8F8F8F]">
              <span>Frete</span>
              <span className="text-emerald-600 font-semibold">Grátis</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-[#1F1F1F] pt-2">
              <span>Total</span>
              <span className="text-[#EE4266]">{formatPrice(totalPrice)}</span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#F6AA1C] hover:bg-[#e09812] text-white font-bold py-4 rounded-xl uppercase tracking-wide transition-colors cursor-pointer shadow-md"
          >
            Realizar Pagamento
          </button>
        </div>
      </form>
    </div>
  );
}
