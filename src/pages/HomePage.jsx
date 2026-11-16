import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones, Flame } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: 'Coleção Exclusiva',
      title: 'Moda Urbana & Sneakers',
      description: 'As melhores tendências de streetwear com até 30% de desconto e frete grátis.',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=800&q=80',
      badge: 'Até 30% OFF'
    },
    {
      tag: 'Lançamentos',
      title: 'Estilo que Define Você',
      description: 'Renove o seu visual com peças selecionadas com alto padrão de qualidade.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      badge: 'Novidade'
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
        name: 'Tênis Adidas Superstar Classic White',
        category: 'Tênis',
        price: 399.90,
        priceDiscount: 299.90,
        discountTag: '25% OFF',
        images: ['https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?auto=format&fit=crop&w=600&q=80'],
        sizes: ['38', '39', '40', '41'],
        colors: ['#FFFFFF', '#1F1F1F']
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
    <div className="space-y-16 pb-20 bg-[#F9F8FE]">
      {/* Banner Principal */}
      <section className="relative bg-[#1F1F1F] text-white overflow-hidden shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center relative z-10">
          <div className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-[#C92071] text-white text-xs font-bold uppercase tracking-widest px-3.5 py-1.5 rounded-md">
              <Sparkles size={14} /> {slides[currentSlide].badge}
            </span>
            <h1 className="text-4xl sm:text-6xl font-black tracking-tight leading-none">
              {slides[currentSlide].title}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 max-w-lg font-light">
              {slides[currentSlide].description}
            </p>
            <div className="pt-2">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 bg-[#C92071] hover:bg-[#991956] text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg text-sm uppercase tracking-wider"
              >
                Ver Coleção <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={slides[currentSlide].image}
              alt="Banner Vitrine"
              className="max-h-[360px] w-full object-cover rounded-2xl shadow-2xl border border-white/10"
            />
          </div>
        </div>

        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-20">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[#C92071]' : 'w-2 bg-white/30'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Benefícios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xs border border-gray-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Truck className="text-[#C92071]" size={28} />, title: 'Frete Grátis', desc: 'Em compras acima de R$ 199' },
            { icon: <ShieldCheck className="text-[#C92071]" size={28} />, title: 'Compra Segura', desc: 'Ambiente 100% criptografado' },
            { icon: <Sparkles className="text-[#C92071]" size={28} />, title: 'Produtos Originais', desc: 'Garantia de fábrica e importados' },
            { icon: <Headphones className="text-[#C92071]" size={28} />, title: 'Suporte 24/7', desc: 'Atendimento humanizado rápido' },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-4 p-4 rounded-xl bg-gray-50/50 border border-gray-100">
              <div className="p-3 bg-white rounded-xl shadow-xs">{item.icon}</div>
              <div>
                <h4 className="font-bold text-sm text-[#1F1F1F]">{item.title}</h4>
                <p className="text-xs text-[#8F8F8F]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Produtos em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between bg-white p-6 rounded-2xl shadow-xs border border-gray-100">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-[#C92071]/10 text-[#C92071] rounded-xl">
              <Flame size={24} />
            </div>
            <div>
              <span className="text-xs font-bold text-[#C92071] uppercase tracking-wider">Em Alta</span>
              <h2 className="text-xl sm:text-2xl font-black text-[#1F1F1F] tracking-tight">Produtos em Destaque</h2>
            </div>
          </div>
          <Link
            to="/produtos"
            className="text-xs sm:text-sm font-bold text-[#C92071] hover:bg-[#C92071]/10 px-4 py-2 rounded-xl transition-colors flex items-center gap-1.5"
          >
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
