import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Lock, ShoppingBag, ArrowRight, CheckCircle2, Clock } from 'lucide-react';

export default function OrdersPage() {
  const [user, setUser] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Verifica se há usuário logado no localStorage
    const storedUser = localStorage.getItem('user') || localStorage.getItem('dripstore_user');
    const token = localStorage.getItem('token') || localStorage.getItem('dripstore_token');

    if (storedUser || token) {
      try {
        setUser(storedUser ? JSON.parse(storedUser) : { name: 'Cliente' });
      } catch {
        setUser({ name: 'Cliente' });
      }

      // Carrega pedidos salvos do usuário (se existirem)
      const savedOrders = localStorage.getItem('dripstore_orders');
      if (savedOrders) {
        try {
          setOrders(JSON.parse(savedOrders));
        } catch {
          setOrders([]);
        }
      }
    } else {
      setUser(null);
      setOrders([]);
    }
  }, []);

  // Tela exibida quando NÃO há usuário logado
  if (!user) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100 text-center space-y-5">
          <div className="w-16 h-16 bg-[#F9F8FE] text-[#C92071] rounded-full flex items-center justify-center mx-auto">
            <Lock size={28} />
          </div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Faça login para ver seus pedidos</h1>
          <p className="text-sm text-gray-500 max-w-md mx-auto leading-relaxed">
            Você precisa estar conectado à sua conta Digital Store para acompanhar o status das suas compras e visualizar o histórico de pedidos.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              to="/login"
              className="w-full sm:w-auto bg-[#C92071] hover:bg-[#991956] text-white font-bold text-sm px-8 py-3.5 rounded-lg transition-colors inline-flex items-center justify-center gap-2"
            >
              Entrar na minha conta <ArrowRight size={16} />
            </Link>
            <Link
              to="/cadastro"
              className="w-full sm:w-auto bg-gray-100 hover:bg-gray-200 text-[#1F1F1F] font-semibold text-sm px-6 py-3.5 rounded-lg transition-colors"
            >
              Criar conta
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Tela exibida quando HÁ usuário logado
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">Meus Pedidos</h1>
          <p className="text-sm text-gray-500">Acompanhe o status e o histórico das suas compras</p>
        </div>
        <Link
          to="/produtos"
          className="text-sm font-bold text-[#C92071] hover:underline inline-flex items-center gap-1"
        >
          Continuar comprando <ArrowRight size={16} />
        </Link>
      </div>

      {orders.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 shadow-sm border border-gray-100 text-center space-y-4">
          <div className="w-16 h-16 bg-[#F9F8FE] text-gray-400 rounded-full flex items-center justify-center mx-auto">
            <ShoppingBag size={28} />
          </div>
          <h2 className="text-lg font-bold text-[#1F1F1F]">Você ainda não possui pedidos</h2>
          <p className="text-sm text-gray-500 max-w-md mx-auto">
            Explore nosso catálogo de sneakers, roupas e acessórios e faça sua primeira compra na Digital Store!
          </p>
          <div className="pt-2">
            <Link
              to="/produtos"
              className="bg-[#C92071] hover:bg-[#991956] text-white font-bold text-sm px-8 py-3 rounded-lg transition-colors inline-block"
            >
              Ver produtos
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order, index) => (
            <div
              key={order.id || index}
              className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-[#F9F8FE] text-[#C92071] rounded-lg">
                  <Package size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold text-gray-400 uppercase">
                    Pedido #{order.id || `DS-${1000 + index}`}
                  </span>
                  <h3 className="font-bold text-[#1F1F1F] text-base mt-0.5">
                    {order.itemsSummary || 'Compra na Digital Store'}
                  </h3>
                  <p className="text-xs text-gray-500 mt-1">
                    Data: {order.date || new Date().toLocaleDateString('pt-BR')} • Total:{' '}
                    <span className="font-bold text-[#1F1F1F]">
                      R$ {Number(order.total || 0).toFixed(2).replace('.', ',')}
                    </span>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-start md:self-center">
                {order.status === 'Entregue' ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600">
                    <CheckCircle2 size={14} /> Entregue
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600">
                    <Clock size={14} /> {order.status || 'Em processamento'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
