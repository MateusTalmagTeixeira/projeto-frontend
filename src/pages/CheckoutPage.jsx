import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, CreditCard, MapPin, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function CheckoutPage() {
  const { cartItems, clearCart, cartTotal } = useCart();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: '',
    email: '',
    cpf: '',
    phone: '',
    cep: '',
    address: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
    paymentMethod: 'credit',
    cardNumber: '',
    cardName: '',
    cardExpiry: '',
    cardCvv: '',
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  // Máscaras automáticas em tempo real
  const handleInputChange = (e) => {
    let { name, value } = e.target;

    if (name === 'cpf') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
        .slice(0, 14);
    } else if (name === 'cep') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 9);
    } else if (name === 'phone') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .slice(0, 15);
    } else if (name === 'cardNumber') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{4})(?=\d)/g, '$1 ')
        .slice(0, 19);
    } else if (name === 'cardExpiry') {
      value = value
        .replace(/\D/g, '')
        .replace(/(\d{2})(\d)/, '$1/$2')
        .slice(0, 5);
    } else if (name === 'cardCvv') {
      value = value.replace(/\D/g, '').slice(0, 4);
    }

    setForm({ ...form, [name]: value });
    setError('');
  };

  const handleFinishOrder = (e) => {
    e.preventDefault();

    // Validação de campos obrigatórios
    if (!form.name || !form.cpf || !form.cep || !form.address || !form.number) {
      setError('Por favor, preencha todos os campos obrigatórios de endereço e identificação.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    if (form.paymentMethod === 'credit' && (!form.cardNumber || !form.cardExpiry || !form.cardCvv)) {
      setError('Por favor, preencha os dados do cartão de crédito.');
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    // Simula salvamento do pedido e sucesso
    const newOrder = {
      id: Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('pt-BR'),
      items: cartItems,
      total: cartTotal,
      status: 'Em processamento',
      address: `${form.address}, ${form.number} - ${form.city}/${form.state}`,
    };

    try {
      const existingOrders = JSON.parse(localStorage.getItem('dripstore_orders') || '[]');
      localStorage.setItem('dripstore_orders', JSON.stringify([newOrder, ...existingOrders]));
    } catch (err) {
      console.error('Erro ao salvar pedido:', err);
    }

    setSuccess(true);
    clearCart();
  };

  if (success) {
    return (
      <div className="max-w-xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
          <CheckCircle2 size={40} />
        </div>
        <h1 className="text-3xl font-extrabold text-[#1F1F1F]">Pedido realizado com sucesso!</h1>
        <p className="text-gray-600 text-sm">
          Obrigado pela sua compra. Seu pedido foi encaminhado para processamento e você pode acompanhar o status na sua página de Pedidos.
        </p>
        <div className="pt-4 flex gap-4 justify-center">
          <button
            type="button"
            onClick={() => navigate('/pedidos')}
            className="bg-[#C92071] hover:bg-[#991956] text-white font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Ver meus pedidos
          </button>
          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-100 hover:bg-gray-200 text-[#1F1F1F] font-bold px-6 py-3 rounded-xl text-sm transition-colors cursor-pointer"
          >
            Voltar à Loja
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-2xl font-bold text-[#1F1F1F] mb-8">Finalizar Pedido</h1>

      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 text-sm">
          <AlertCircle size={20} className="shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <form onSubmit={handleFinishOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Formulário de Dados e Endereço */}
        <div className="lg:col-span-2 space-y-6">
          {/* Informações Pessoais */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-base text-[#1F1F1F] flex items-center gap-2 pb-3 border-b border-gray-100">
              <User size={18} className="text-[#C92071]" /> Informações Pessoais
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Nome Completo *</label>
                <input
                  type="text"
                  name="name"
                  value={form.name}
                  onChange={handleInputChange}
                  placeholder="Ex: Larissa Talmag"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">E-mail *</label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CPF *</label>
                <input
                  type="text"
                  name="cpf"
                  value={form.cpf}
                  onChange={handleInputChange}
                  placeholder="000.000.000-00"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Celular / Telefone *</label>
                <input
                  type="text"
                  name="phone"
                  value={form.phone}
                  onChange={handleInputChange}
                  placeholder="(85) 90000-0000"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
            </div>
          </div>

          {/* Endereço de Entrega */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-base text-[#1F1F1F] flex items-center gap-2 pb-3 border-b border-gray-100">
              <MapPin size={18} className="text-[#C92071]" /> Endereço de Entrega
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CEP *</label>
                <input
                  type="text"
                  name="cep"
                  value={form.cep}
                  onChange={handleInputChange}
                  placeholder="00000-000"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Endereço (Rua, Avenida) *</label>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleInputChange}
                  placeholder="Ex: Av. Beira Mar"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Número *</label>
                <input
                  type="text"
                  name="number"
                  value={form.number}
                  onChange={handleInputChange}
                  placeholder="Ex: 1000"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Bairro *</label>
                <input
                  type="text"
                  name="neighborhood"
                  value={form.neighborhood}
                  onChange={handleInputChange}
                  placeholder="Ex: Meireles"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Cidade *</label>
                <input
                  type="text"
                  name="city"
                  value={form.city}
                  onChange={handleInputChange}
                  placeholder="Ex: Fortaleza"
                  className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                />
              </div>
            </div>
          </div>

          {/* Pagamento */}
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="font-bold text-base text-[#1F1F1F] flex items-center gap-2 pb-3 border-b border-gray-100">
              <CreditCard size={18} className="text-[#C92071]" /> Forma de Pagamento
            </h2>
            <div className="flex gap-4">
              <label className={`flex-1 p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${form.paymentMethod === 'credit' ? 'border-[#C92071] bg-pink-50/30' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="credit"
                  checked={form.paymentMethod === 'credit'}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="text-[#C92071] accent-[#C92071]"
                />
                <span className="text-sm font-bold text-[#1F1F1F]">Cartão de Crédito</span>
              </label>
              <label className={`flex-1 p-4 rounded-xl border cursor-pointer flex items-center gap-3 transition-all ${form.paymentMethod === 'pix' ? 'border-[#C92071] bg-pink-50/30' : 'border-gray-200'}`}>
                <input
                  type="radio"
                  name="paymentMethod"
                  value="pix"
                  checked={form.paymentMethod === 'pix'}
                  onChange={(e) => setForm({ ...form, paymentMethod: e.target.value })}
                  className="text-[#C92071] accent-[#C92071]"
                />
                <span className="text-sm font-bold text-[#1F1F1F]">PIX (À vista)</span>
              </label>
            </div>

            {form.paymentMethod === 'credit' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Número do Cartão *</label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onChange={handleInputChange}
                    placeholder="0000 0000 0000 0000"
                    className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Validade (MM/AA) *</label>
                  <input
                    type="text"
                    name="cardExpiry"
                    value={form.cardExpiry}
                    onChange={handleInputChange}
                    placeholder="MM/AA"
                    className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase mb-1">CVV *</label>
                  <input
                    type="text"
                    name="cardCvv"
                    value={form.cardCvv}
                    onChange={handleInputChange}
                    placeholder="123"
                    className="w-full bg-[#F9F8FE] border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-[#C92071]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Resumo do Pedido Sidebar */}
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm space-y-4 sticky top-6">
            <h3 className="font-bold text-base text-[#1F1F1F] pb-3 border-b border-gray-100">Resumo do Pedido</h3>
            
            <div className="max-h-60 overflow-y-auto space-y-3 pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-xs gap-2">
                  <span className="text-gray-600 line-clamp-1">{item.name} ({item.selectedSize}) x{item.quantity || 1}</span>
                  <span className="font-bold text-[#1F1F1F] shrink-0">R$ {((item.priceDiscount || item.price) * (item.quantity || 1)).toFixed(2).replace('.', ',')}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>Subtotal</span>
                <span>R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>Frete</span>
                <span className="text-green-600 font-bold">Grátis</span>
              </div>
              <div className="flex justify-between text-base font-extrabold text-[#1F1F1F] pt-2 border-t border-gray-100">
                <span>Total</span>
                <span className="text-[#C92071]">R$ {cartTotal.toFixed(2).replace('.', ',')}</span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-bold py-3.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer mt-4"
            >
              Finalizar Compra
            </button>

            <p className="text-[11px] text-gray-400 text-center flex items-center justify-center gap-1.5 pt-2">
              <ShieldCheck size={14} className="text-green-600" /> Ambiente 100% seguro e criptografado
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
