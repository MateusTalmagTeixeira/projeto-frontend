import { Link } from 'react-router-dom';

const mockOrders = [
  {
    number: '2234981932',
    product: 'Tênis Nike Revolution 6 Next Nature Masculino',
    status: 'Produto em trânsito',
    statusColor: 'text-[#F6AA1C]',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=200&q=80',
  },
  {
    number: '4495810492',
    product: 'Headphone Wireless Beats Studio Pro',
    status: 'Finalizado',
    statusColor: 'text-[#52CA76]',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80',
  },
];

export default function OrdersPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="lg:col-span-3 bg-white rounded-md p-6 shadow-xs space-y-4 text-sm">
          <p className="font-bold text-[#474747] pb-3 border-b border-gray-100">Meu Perfil</p>
          <p className="font-bold text-[#C92071] pb-3 border-b border-gray-100">Meus Pedidos</p>
          <Link to="/cadastro" className="block text-[#474747] hover:text-[#C92071] pb-3 border-b border-gray-100">
            Minhas Informações
          </Link>
          <p className="text-[#474747]">Métodos de Pagamento</p>
        </aside>

        <div className="lg:col-span-9 bg-white rounded-md p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-4">
            <h1 className="font-bold text-base text-[#474747]">Meus Pedidos</h1>
            <span className="text-xs font-bold text-[#8F8F8F] uppercase">Status</span>
          </div>

          <div className="space-y-5">
            {mockOrders.map((order) => (
              <div
                key={order.number}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-gray-100 last:border-none last:pb-0"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={order.image}
                    alt={order.product}
                    className="w-16 h-16 rounded bg-[#E2E3FF] object-contain p-1.5 shrink-0"
                  />
                  <div>
                    <p className="text-xs text-[#8F8F8F]">Pedido nº {order.number}</p>
                    <p className="text-sm font-bold text-[#1F1F1F] mt-0.5">{order.product}</p>
                  </div>
                </div>
                <span className={`text-xs sm:text-sm font-bold ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
