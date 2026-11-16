import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('digitalStoreUser', name || email);
    navigate('/');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F] mb-6">Criar Conta</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-md p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#474747] border-b border-gray-100 pb-3">
            Informações Pessoais
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">Nome Completo *</label>
            <input
              type="text"
              required
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">CPF *</label>
            <input
              type="text"
              required
              placeholder="Insira seu CPF"
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">E-mail *</label>
            <input
              type="email"
              required
              placeholder="Insira seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">Celular *</label>
            <input
              type="tel"
              required
              placeholder="Insira seu celular"
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
            />
          </div>
        </div>

        <div className="bg-white rounded-md p-6 sm:p-8 shadow-xs space-y-4">
          <h2 className="text-sm font-bold text-[#474747] border-b border-gray-100 pb-3">
            Informações de Entrega
          </h2>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-[#474747]">Endereço *</label>
            <input
              type="text"
              required
              placeholder="Insira seu endereço"
              className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Bairro *</label>
              <input
                type="text"
                required
                placeholder="Insira seu bairro"
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
              />
            </div>
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Cidade *</label>
              <input
                type="text"
                required
                placeholder="Insira sua cidade"
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm"
              />
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-semibold py-3.5 rounded-lg text-sm transition-colors cursor-pointer"
        >
          Criar Conta
        </button>
      </form>
    </div>
  );
}
