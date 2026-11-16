import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#1F1F1F] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Coluna Sobre */}
        <div className="md:col-span-4 space-y-4">
          <Link to="/" className="inline-flex items-center gap-2 cursor-pointer">
            <span className="bg-[#C92071] text-white p-1.5 rounded-lg font-black text-xl">
              D_S
            </span>
            <span className="text-xl font-bold tracking-tight">Digital Store</span>
          </Link>
          <p className="text-xs text-gray-400 leading-relaxed max-w-sm">
            Sua loja referência em sneakers, streetwear e tecnologia com entrega rápida para todo o Brasil. Estilo e inovação em um só lugar.
          </p>
          <div className="flex items-center gap-4 text-gray-300 pt-2">
            <a href="#facebook" className="hover:text-[#C92071] transition-colors"><Facebook size={18} /></a>
            <a href="#instagram" className="hover:text-[#C92071] transition-colors"><Instagram size={18} /></a>
            <a href="#twitter" className="hover:text-[#C92071] transition-colors"><Twitter size={18} /></a>
          </div>
        </div>

        {/* Coluna Informação */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-sm uppercase tracking-wider text-white">Informação</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/sobre" className="hover:text-white transition-colors block py-0.5">Sobre Drip Store</Link></li>
            <li><Link to="/seguranca" className="hover:text-white transition-colors block py-0.5">Segurança</Link></li>
            <li><Link to="/wishlist" className="hover:text-white transition-colors block py-0.5">Wishlist</Link></li>
            <li><Link to="/blog" className="hover:text-white transition-colors block py-0.5">Blog</Link></li>
            <li><Link to="/trabalhe-conosco" className="hover:text-white transition-colors block py-0.5">Trabalhe conosco</Link></li>
            <li><Link to="/pedidos" className="hover:text-white transition-colors block py-0.5">Meus Pedidos</Link></li>
          </ul>
        </div>

        {/* Coluna Categorias */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-sm uppercase tracking-wider text-white">Categorias</h4>
          <ul className="space-y-2.5 text-xs text-gray-400">
            <li><Link to="/produtos" className="hover:text-white transition-colors block py-0.5">Camisetas</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors block py-0.5">Calças</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors block py-0.5">Bonés</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors block py-0.5">Headphones</Link></li>
            <li><Link to="/produtos" className="hover:text-white transition-colors block py-0.5">Tênis</Link></li>
          </ul>
        </div>

        {/* Coluna Contato */}
        <div className="md:col-span-3 space-y-3">
          <h4 className="font-bold text-sm uppercase tracking-wider text-white">Contato</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161
          </p>
          <p className="text-xs font-bold text-white pt-1">(85) 3051-3411</p>
        </div>

      </div>

      {/* Métodos de Pagamento e Copyright */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
          <span className="font-bold text-white flex items-center gap-1"><CreditCard size={16} /> Formas de Pagamento:</span>
          <span className="bg-white/10 px-2.5 py-1 rounded font-semibold text-white">Pix</span>
          <span className="bg-white/10 px-2.5 py-1 rounded font-semibold text-white">Visa</span>
          <span className="bg-white/10 px-2.5 py-1 rounded font-semibold text-white">Mastercard</span>
          <span className="bg-white/10 px-2.5 py-1 rounded font-semibold text-white">Boleto</span>
          <span className="bg-white/10 px-2.5 py-1 rounded font-semibold text-white">Elo</span>
        </div>

        <div className="text-xs text-gray-500 text-center md:text-right">
          &copy; 2026 Digital College. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
