import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password.length >= 6) {
      localStorage.setItem('digitalStoreUser', email);
      navigate('/');
    } else {
      setError(true);
    }
  };

  return (
    <div className="min-h-[75vh] bg-gradient-to-br from-[#B5B6F2]/40 to-[#EFEFFF] py-12 px-4 flex items-center justify-center">
      <div className="max-w-4xl w-full bg-white rounded-xl shadow-lg grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        <div className="lg:col-span-7 p-8 sm:p-12 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F]">Acesse sua conta</h1>
            <p className="text-sm text-[#474747]">
              Novo cliente? Então registre-se{' '}
              <Link to="/cadastro" className="underline text-[#C92071] font-semibold hover:opacity-80">
                clicando aqui
              </Link>
              .
            </p>
          </div>

          {error && (
            <div className="bg-red-50 text-red-600 text-xs p-3 rounded-lg border border-red-200">
              Por favor, insira um e-mail válido e senha com pelo menos 6 dígitos.
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">E-mail *</label>
              <input
                type="email"
                required
                placeholder="exemplo@email.com"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(false); }}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm text-[#474747] focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-[#474747]">Senha *</label>
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(false); }}
                className="w-full bg-[#F8F8F8] rounded-lg px-4 py-3 text-sm text-[#474747] focus:outline-none focus:ring-2 focus:ring-[#C92071]"
              />
            </div>

            <div className="flex items-center justify-between pt-1 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-[#474747]">
                <input type="checkbox" className="accent-[#C92071]" /> Lembrar-me
              </label>
              <Link to="/cadastro" className="text-[#474747] underline hover:text-[#C92071]">
                Esqueci minha senha
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-[#C92071] hover:bg-[#991956] text-white font-semibold py-3.5 rounded-lg text-sm transition-colors cursor-pointer shadow-md"
            >
              Acessar Conta
            </button>
          </form>
        </div>

        <div className="hidden lg:flex lg:col-span-5 bg-[#D8E3F2]/50 items-center justify-center p-8">
          <img
            src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80"
            alt="Login"
            className="w-full object-contain drop-shadow-xl -rotate-12"
          />
        </div>
      </div>
    </div>
  );
}
