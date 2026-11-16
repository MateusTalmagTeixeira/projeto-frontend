import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white pt-14 pb-8 mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/15">
          {/* Coluna Logo e Descrição */}
          <div className="lg:col-span-4 space-y-5">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-[#1F1F1F] font-extrabold text-xl">
                &gt;_
              </div>
              <span className="text-2xl sm:text-3xl font-bold tracking-tight">
                Digital Store
              </span>
            </Link>
            <p className="text-sm text-gray-300 leading-relaxed max-w-xs">
              Sua loja referência em sneakers, streetwear e tecnologia com entrega rápida para todo o Brasil.
            </p>
            <div className="flex items-center gap-5 pt-1 text-white">
              <a href="#facebook" aria-label="Facebook" className="hover:text-[#C92071] transition-colors font-bold text-lg">
                f
              </a>
              <a href="#instagram" aria-label="Instagram" className="hover:text-[#C92071] transition-colors font-bold text-lg">
                ig
              </a>
              <a href="#twitter" aria-label="Twitter" className="hover:text-[#C92071] transition-colors font-bold text-lg">
                X
              </a>
            </div>
          </div>

          {/* Coluna Informação */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-base">Informação</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/produtos" className="hover:text-white">Sobre Drip Store</Link></li>
              <li><Link to="/produtos" className="hover:text-white">Segurança</Link></li>
              <li><Link to="/produtos" className="hover:text-white">Wishlist</Link></li>
              <li><Link to="/produtos" className="hover:text-white">Blog</Link></li>
              <li><Link to="/produtos" className="hover:text-white">Trabalhe conosco</Link></li>
              <li><Link to="/produtos" className="hover:text-white">Meus Pedidos</Link></li>
            </ul>
          </div>

          {/* Coluna Categorias */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="font-semibold text-base">Categorias</h4>
            <ul className="space-y-2.5 text-sm text-gray-300">
              <li><Link to="/produtos?cat=Camisetas" className="hover:text-white">Camisetas</Link></li>
              <li><Link to="/produtos?cat=Calças" className="hover:text-white">Calças</Link></li>
              <li><Link to="/produtos?cat=Bonés" className="hover:text-white">Bonés</Link></li>
              <li><Link to="/produtos?cat=Headphones" className="hover:text-white">Headphones</Link></li>
              <li><Link to="/produtos?cat=Tênis" className="hover:text-white">Tênis</Link></li>
            </ul>
          </div>

          {/* Coluna Contato */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="font-semibold text-base">Contato</h4>
            <p className="text-sm text-gray-300 leading-relaxed">
              Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161
            </p>
            <p className="text-sm text-gray-300">(85) 3051-3411</p>
          </div>
        </div>

        <p className="text-center text-xs text-gray-400 pt-6">
          @ 2026 Digital College
        </p>
      </div>
    </footer>
  );
}
