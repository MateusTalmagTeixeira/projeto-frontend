import { Link } from 'react-router-dom';
import { ShoppingBag, ArrowLeft } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-6">
      <div className="w-24 h-24 bg-[#F9F8FE] text-[#C92071] rounded-3xl flex items-center justify-center mx-auto shadow-sm border border-pink-100">
        <ShoppingBag size={44} />
      </div>
      
      <div className="space-y-2">
        <span className="text-xs font-extrabold text-[#C92071] tracking-widest uppercase">Erro 404</span>
        <h1 className="text-3xl font-extrabold text-[#1F1F1F]">Página não encontrada</h1>
        <p className="text-gray-500 text-sm max-w-md mx-auto">
          Ops! A página que você está procurando não existe ou foi movida para outro endereço.
        </p>
      </div>

      <div className="pt-4">
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#C92071] hover:bg-[#991956] text-white font-bold px-8 py-3.5 rounded-xl text-sm transition-colors shadow-sm cursor-pointer"
        >
          <ArrowLeft size={16} /> Voltar para a Página Inicial
        </Link>
      </div>
    </div>
  );
}
