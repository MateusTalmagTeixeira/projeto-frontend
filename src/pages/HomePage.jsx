import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones, Tag } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: 'Coleção Outono/Inverno',
      title: 'Descontos imperdíveis em Sneakers',
      description: 'As melhores marcas globais de streetwear com até 30% de desconto e frete grátis.',
      image: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=800&q=80',
      badge: 'Até 30% OFF'
    },
    {
      tag: 'Lançamentos Exclusivos',
      title: 'O novo padrão de estilo urbano',
      description: 'Conforto, durabilidade e sofisticação para compor o seu visual em qualquer ocasião.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      badge: 'Lançamento 2026'
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  useEffect(() => {
    setProducts([
      {
        id: 1,
        name: 'Tênis Nike Air Max Excee Edição Limitada',
        category: 'Tênis',
        price: 299.90,
        priceDiscount: 219.90,
        discountTag: '30% OFF',
        images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80'],
        sizes: ['38', '39', '40', '41', '42'],
        colors: ['#C92071', '#1F1F1F', '#4A90E2']
      },
      {
        id: 2,
        name: 'Sneaker Urban Streetwear Runner',
        category: 'Tênis',
        price: 349.90,
        priceDiscount: 279.90,
        discountTag: '20% OFF',
        images: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=600&q=80'],
        sizes: ['37', '38', '39', '40'],
        colors: ['#1F1F1F', '#E2E3FF']
      },
      {
        id: 3,
        name: 'Camiseta Oversized Minimalist Drip',
        category: 'Camisetas',
        price: 159.90,
        priceDiscount: 119.90,
        discountTag: '25% OFF',
        images: ['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80'],
        sizes: ['P', 'M', 'G', 'GG'],
        colors: ['#FFFFFF', '#1F1F1F', '#B5B6F2']
      },
      {
        id: 4,
        name: 'Headphone Gamer & Street Wireless RGB',
        category: 'Headphones',
        price: 499.90,
        priceDiscount: 389.90,
        discountTag: '22% OFF',
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=600&q=80'],
        sizes: ['Único'],
        colors: ['#1F1F1F', '#C92071']
      }
    ]);
  }, []);

  return (
    <div className="space-y-16 pb-20">
      {/* Banner Principal Estilo E-commerce de Griffe */}
      <section className="relative bg-[#1F1F1F] text-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#C92071] text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-md shadow-sm">
              <Tag size={14} /> {slides[currentSlide].badge}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-lg font-light">
              {slides[currentSlide].description}
            </p>
            <div className="pt-4 flex items-center gap-4">
              <Link
                to="/produtos"
                className="bg-[#C92071] hover:bg-[#991956] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg flex items-center gap-2 group text-sm uppercase tracking-wider"
              >
                Ver Coleção <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          <div className="flex justify-center relative">
            <div className="absolute w-72 h-72 bg-[#C92071]/20 rounded-full blur-3xl -z-10" />
            <img
              src={slides[currentSlide].image}
              alt="Banner Vitrine"
              className="max-h-[380px] w-full object-cover rounded-3xl shadow-2xl border border-white/10"
            />
          </div>
        </div>

        {/* Indicadores do Carrossel */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-10 bg-[#C92071]' : 'w-3 bg-white/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Ícones de Benefícios com Estilo Minimalista */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-8 shadow-xs border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <Truck className="text-[#C92071]" size={32} />, title: 'Frete Grátis', desc: 'Em compras acima de R$ 199' },
            { icon: <ShieldCheck className="text-[#C92071]" size={32} />, title: 'Compra 100% Segura', desc: 'Ambiente criptografado e seguro' },
            { icon: <Sparkles className="text-[#C92071]" size={32} />, title: 'Produtos Originais', desc: 'Garantia de fábrica e importados' },
            { icon: <Headphones className="text-[#C92071]" size={32} />, title: 'Atendimento Especial', desc: 'Suporte rápido humanizado' },
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="p-3 bg-gray-50 rounded-xl">{item.icon}</div>
              <div>
                <h4 className="font-bold text-sm text-[#1F1F1F] mb-0.5">{item.title}</h4>
                <p className="text-xs text-[#8F8F8F]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex items-end justify-between border-b border-gray-200 pb-4">
          <div>
            <span className="text-xs font-bold text-[#C92071] uppercase tracking-wider">Tendências</span>
            <h2 className="text-2xl sm:text-3xl font-black text-[#1F1F1F] tracking-tight">Produtos em Destaque</h2>
          </div>
          <Link to="/produtos" className="text-sm font-bold text-[#C92071] hover:underline flex items-center gap-1.5">
            Ver catálogo completo <ArrowRight size={16} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
}
