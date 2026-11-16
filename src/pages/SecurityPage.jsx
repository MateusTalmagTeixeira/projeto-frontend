import { ShieldCheck, Lock, CheckCircle2 } from 'lucide-react';

export default function SecurityPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 space-y-8">
      <div className="space-y-3">
        <span className="text-xs font-bold text-[#C92071] uppercase tracking-wider">Privacidade e Proteção</span>
        <h1 className="text-3xl font-black text-[#1F1F1F]">Segurança na Digital Store</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { icon: <ShieldCheck size={28} className="text-[#C92071]" />, title: 'Criptografia SSL', desc: 'Todos os dados de pagamento e navegação são protegidos por criptografia de ponta a ponta.' },
          { icon: <Lock size={28} className="text-[#C92071]" />, title: 'Privacidade de Dados', desc: 'Seus dados pessoais nunca são compartilhados com terceiros sem a sua autorização prévia.' },
          { icon: <CheckCircle2 size={28} className="text-[#C92071]" />, title: 'Compra Garantida', desc: 'Garantia de entrega ou o reembolso integral do seu dinheiro de forma rápida.' },
        ].map((item, idx) => (
          <div key={idx} className="bg-white rounded-2xl p-6 shadow-xs border border-gray-100 space-y-3">
            <div className="p-3 bg-gray-50 w-fit rounded-xl">{item.icon}</div>
            <h3 className="font-bold text-base text-[#1F1F1F]">{item.title}</h3>
            <p className="text-xs text-[#8F8F8F] leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
