import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function WishlistPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-pink-50 text-[#C92071] rounded-full flex items-center justify-center mx-auto">
        <Heart size={40} />
      </div>
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Sua Wishlist (Lista de Desejos)</h1>
        <p className="text-sm text-[#8F8F8F]">
          Você ainda não salvou nenhum produto favorito. Explore nossa vitrine e clique no coração para salvar o que mais gosta!
        </p>
      </div>
      <div className="pt-2">
        <Link
          to="/produtos"
          className="bg-[#C92071] hover:bg-[#991956] text-white font-semibold text-sm px-8 py-3 rounded-xl transition-colors inline-block"
        >
          Explorar Produtos
        </Link>
      </div>
    </div>
  );
}
