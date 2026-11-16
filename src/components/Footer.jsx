import { useNavigate } from 'react-router-dom';
import { Facebook, Instagram, Twitter, CreditCard } from 'lucide-react';

export default function Footer() {
  const navigate = useNavigate();

  return (
    <footer className="bg-[#1F1F1F] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10">
        
        {/* Coluna Sobre */}
        <div className="md:col-span-4 space-y-4">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <span className="bg-[#C92071] text-white p-1.5 rounded-lg font-black text-xl">
              D_S
            </span>
            <span className="text-xl font-bold tracking-tight">Digital Store</span>
          </div>
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
          <ul className="space-y-2 text-xs text-gray-400">
            <li><button onClick={() => navigate('/sobre')} className="hover:text-white transition-colors cursor-pointer text-left">Sobre Drip Store</button></li>
            <li><button onClick={() => navigate('/seguranca')} className="hover:text-white transition-colors cursor-pointer text-left">Segurança</button></li>
            <li><button onClick={() => navigate('/wishlist')} className="hover:text-white transition-colors cursor-pointer text-left">Wishlist</button></li>
            <li><button onClick={() => navigate('/blog')} className="hover:text-white transition-colors cursor-pointer text-left">Blog</button></li>
            <li><button onClick={() => navigate('/trabalhe-conosco')} className="hover:text-white transition-colors cursor-pointer text-left">Trabalhe conosco</button></li>
            <li><button onClick={() => navigate('/pedidos')} className="hover:text-white transition-colors cursor-pointer text-left">Meus Pedidos</button></li>
          </ul>
        </div>

        {/* Coluna Categorias */}
        <div className="md:col-span-2 space-y-3">
          <h4 className="font-bold text-sm uppercase tracking-wider text-white">Categorias</h4>
          <ul className="space-y-2 text-xs text-gray-400">
            <li><button onClick={() => navigate('/produtos')} className="hover:text-white transition-colors cursor-pointer text-left">Camisetas</button></li>
            <li><button onClick={() => navigate('/produtos')} className="hover:text-white transition-colors cursor-pointer text-left">Calças</button></li>
            <li><button onClick={() => navigate('/produtos')} className="hover:text-white transition-colors cursor-pointer text-left">Bonés</button></li>
            <li><button onClick={() => navigate('/produtos')} className="hover:text-white transition-colors cursor-pointer text-left">Headphones</button></li>
            <li><button onClick={() => navigate('/produtos')} className="hover:text-white transition-colors cursor-pointer text-left">Tênis</button></li>
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
