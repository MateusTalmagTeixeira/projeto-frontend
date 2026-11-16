import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('digitalStoreUser', email || 'cliente@digitalstore.com.br');
    navigate('/');
  };

  return (
    <div className="min-h-[75vh] bg-gradient-to-b from-[#B5B6F2] to-[#EFEFFF] py-12 px-4 flex items-center justify-center">
      <div className="max-w-5xl w-full grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
        <div className="lg:col-span-5 bg-white rounded-md p-8 shadow-md space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F]">Acesse sua conta</h1>
            <p className="text-sm text-[#474747]">
              Novo cliente? Então registre-se{' '}
              <Link to="/cadastro" className="underline text-[#474747] hover:text-[#C92071]">
                aqui
              </Link>
              .
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Login *</label>
              <input
                type="email"
                required
                placeholder="Insira seu login ou email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm text-[#474747] focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Senha *</label>
              <input
                type="password"
                required
                placeholder="Insira sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm text-[#474747] focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>

            <div className="pt-1">
              <Link to="/cadastro" className="text-xs text-[#474747] underline hover:text-[#C92071]">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-semibold py-3 rounded-lg text-sm transition-colors cursor-pointer"
            >
              Acessar Conta
            </button>
          </form>
        </div>

        <div className="hidden lg:flex lg:col-span-7 justify-center">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80"
            alt="Tênis Digital Store"
            className="w-full max-w-md object-contain drop-shadow-2xl -rotate-12"
          />
        </div>
      </div>
    </div>
  );
}
