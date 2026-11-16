import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function CheckoutSuccessPage() {
  const orderId = Math.floor(100000000 + Math.random() * 900000000);

  return (
    <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
        <CheckCircle2 size={48} />
      </div>

      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-[#1F1F1F]">Pedido realizado com sucesso!</h1>
        <p className="text-sm text-[#8F8F8F]">
          Obrigado por comprar na <strong className="text-[#C92071]">Digital Store</strong>. O seu pedido foi registado com o número <strong className="text-[#1F1F1F]">#{orderId}</strong>.
        </p>
      </div>

      <div className="bg-white rounded-xl p-6 shadow-xs max-w-md mx-auto text-left space-y-3">
        <p className="text-xs font-bold text-[#8F8F8F] uppercase border-b border-gray-100 pb-2">Resumo do Envio</p>
        <p className="text-sm text-[#474747]"><strong>Status:</strong> Pagamento aprovado</p>
        <p className="text-sm text-[#474747]"><strong>Previsão de entrega:</strong> 3 a 5 dias úteis</p>
        <p className="text-sm text-[#474747]"><strong>Método:</strong> Entrega expresso</p>
      </div>

      <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link
          to="/pedidos"
          className="w-full sm:w-auto bg-[#C92071] hover:bg-[#991956] text-white font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          Ver Meus Pedidos
        </Link>
        <Link
          to="/produtos"
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-gray-100 hover:bg-gray-200 text-[#474747] font-semibold text-sm px-8 py-3 rounded-lg transition-colors"
        >
          Continuar Comprando <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
}
