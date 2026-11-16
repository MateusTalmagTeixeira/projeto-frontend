import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Search, ShoppingCart, Menu, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Header() {
  const [searchTerm, setSearchTerm] = useState('');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/produtos?filter=${encodeURIComponent(searchTerm.trim())}`);
    } else {
      navigate('/produtos');
    }
    setMobileMenuOpen(false);
  };

  const navLinkClass = ({ isActive }) =>
    `pb-1 text-base transition-colors ${
      isActive
        ? 'text-[#C92071] font-bold border-b-2 border-[#C92071]'
        : 'text-[#474747] hover:text-[#C92071]'
    }`;

  return (
    <header className="bg-white shadow-xs sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <div className="flex items-center justify-between gap-4">
          {/* Botão Menu Mobile */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#1F1F1F] p-1"
            aria-label="Menu"
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>

          {/* Logo Digital Store */}
          <Link to="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 rounded-lg bg-[#C92071] flex items-center justify-center text-white font-extrabold text-xl">
              &gt;_
            </div>
            <span className="text-2xl sm:text-3xl font-bold text-[#C92071] tracking-tight">
              Digital Store
            </span>
          </Link>

          {/* Barra de Busca Desktop */}
          <form
            onSubmit={handleSearch}
            className="hidden md:flex flex-1 max-w-xl mx-6 relative"
          >
            <input
              type="text"
              placeholder="Pesquisar produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#F8F8F8] text-[#474747] placeholder-[#8F8F8F] rounded-lg pl-4 pr-12 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
            />
            <button
              type="submit"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F8F] hover:text-[#C92071]"
              aria-label="Pesquisar"
            >
              <Search size={20} />
            </button>
          </form>

          {/* Ações (Cadastre-se, Entrar, Carrinho) */}
          <div className="flex items-center gap-4 sm:gap-6">
            <Link
              to="/produtos"
              className="hidden lg:inline-block text-sm text-[#474747] underline hover:text-[#C92071]"
            >
              Cadastre-se
            </Link>
            <Link
              to="/produtos"
              className="hidden sm:inline-block bg-[#C92071] hover:bg-[#991956] text-white font-semibold text-sm px-6 py-2.5 rounded-lg transition-colors"
            >
              Entrar
            </Link>

            <button
              onClick={() => setIsCartOpen(true)}
              className="relative text-[#C92071] hover:opacity-80 p-1 cursor-pointer"
              aria-label="Carrinho"
            >
              <ShoppingCart size={24} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-[#EE4266] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Barra de Busca Mobile */}
        <form onSubmit={handleSearch} className="mt-4 md:hidden relative">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-[#F8F8F8] text-[#474747] rounded-lg pl-4 pr-10 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#C92071]"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8F8F8F]"
          >
            <Search size={18} />
          </button>
        </form>

        {/* Navegação Principal Desktop */}
        <nav className="hidden md:flex items-center gap-8 mt-6">
          <NavLink to="/" end className={navLinkClass}>
            Home
          </NavLink>
          <NavLink to="/produtos" className={navLinkClass}>
            Produtos
          </NavLink>
          <NavLink to="/produtos?cat=Tênis" className={navLinkClass}>
            Categorias
          </NavLink>
          <NavLink to="/produtos?orders=true" className={navLinkClass}>
            Meus Pedidos
          </NavLink>
        </nav>
      </div>

      {/* Menu Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 space-y-4">
          <p className="text-xs font-bold uppercase text-[#8F8F8F]">Páginas</p>
          <nav className="flex flex-col gap-3">
            <Link to="/" onClick={() => setMobileMenuOpen(false)} className="text-[#474747] font-medium">
              Home
            </Link>
            <Link to="/produtos" onClick={() => setMobileMenuOpen(false)} className="text-[#474747] font-medium">
              Produtos
            </Link>
            <Link to="/produtos?cat=Tênis" onClick={() => setMobileMenuOpen(false)} className="text-[#474747] font-medium">
              Categorias
            </Link>
            <Link to="/produtos" onClick={() => setMobileMenuOpen(false)} className="text-[#474747] font-medium">
              Meus Pedidos
            </Link>
          </nav>
          <div className="pt-3 border-t border-gray-100 flex flex-col gap-2">
            <Link
              to="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center bg-[#C92071] text-white font-semibold py-2.5 rounded-lg text-sm"
            >
              Entrar
            </Link>
            <Link
              to="/produtos"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center text-sm text-[#474747] underline py-1"
            >
              Cadastre-se
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
