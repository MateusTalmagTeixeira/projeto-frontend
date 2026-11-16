import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '', cpf: '', email: '', phone: '', address: '', neighborhood: '', city: '', cep: ''
  });
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    localStorage.setItem('digitalStoreUser', formData.email);
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F] mb-6">Criar Conta</h1>

      {success && (
        <div className="bg-emerald-50 text-emerald-700 p-4 rounded-lg mb-6 border border-emerald-200 text-sm font-semibold">
          Conta criada com sucesso! Redirecionando para a loja...
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#474747] border-b border-gray-100 pb-3">
            Informações Pessoais
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">Nome Completo *</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Digite seu nome completo"
              value={formData.name}
              onChange={handleChange}
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">CPF *</label>
              <input
                type="text"
                name="cpf"
                required
                placeholder="000.000.000-00"
                value={formData.cpf}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Celular *</label>
              <input
                type="tel"
                name="phone"
                required
                placeholder="(00) 00000-0000"
                value={formData.phone}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">E-mail *</label>
            <input
              type="email"
              name="email"
              required
              placeholder="seu@email.com"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
            />
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#474747] border-b border-gray-100 pb-3">
            Informações de Entrega
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="sm:col-span-2 space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Endereço *</label>
              <input
                type="text"
                name="address"
                required
                placeholder="Rua, Avenida..."
                value={formData.address}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">CEP *</label>
              <input
                type="text"
                name="cep"
                required
                placeholder="00000-000"
                value={formData.cep}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Bairro *</label>
              <input
                type="text"
                name="neighborhood"
                required
                placeholder="Bairro"
                value={formData.neighborhood}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Cidade *</label>
              <input
                type="text"
                name="city"
                required
                placeholder="Cidade"
                value={formData.city}
                onChange={handleChange}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-[#C92071] focus:outline-none"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-semibold py-3.5 rounded-lg text-sm transition-colors cursor-pointer shadow-md"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}
