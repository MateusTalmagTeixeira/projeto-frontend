import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { ArrowRight, Sparkles, ShieldCheck, Truck, Headphones } from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      tag: 'Coleção Exclusiva 2026',
      title: 'Streetwear & Sneakers 🍂',
      description: 'As melhores tendências de moda urbana e calçados com design moderno e frete grátis.',
      image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?auto=format&fit=crop&w=700&q=80',
    },
    {
      tag: 'Lançamentos Especiais',
      title: 'Estilo e Conforto para o Dia a Dia',
      description: 'Renove o seu visual com peças selecionadas com alto padrão de qualidade.',
      image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=80',
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
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
        images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80'],
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
    <div className="space-y-12 pb-16">
      {/* Carrossel / Banner Principal */}
      <section className="bg-gradient-to-r from-[#F5F5F7] to-[#E8E8ED] py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 items-center min-h-[380px]">
          <div className="space-y-4 animate-in fade-in duration-500">
            <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#F6AA1C] uppercase tracking-wider bg-amber-50 px-3 py-1 rounded-full border border-amber-200">
              <Sparkles size={14} /> {slides[currentSlide].tag}
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-[#1F1F1F] leading-tight">
              {slides[currentSlide].title}
            </h1>
            <p className="text-sm sm:text-base text-[#474747]">
              {slides[currentSlide].description}
            </p>
            <div className="pt-2">
              <Link
                to="/produtos"
                className="inline-flex items-center gap-2 bg-[#C92071] hover:bg-[#991956] text-white font-bold px-8 py-3.5 rounded-xl transition-colors shadow-md"
              >
                Ver Coleção <ArrowRight size={18} />
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={slides[currentSlide].image}
              alt="Banner Destaque"
              className="max-h-[320px] rounded-2xl object-cover shadow-xl"
            />
          </div>
        </div>

        {/* Indicadores de Slide */}
        <div className="flex justify-center gap-2 mt-8">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2.5 rounded-full transition-all cursor-pointer ${
                currentSlide === idx ? 'w-8 bg-[#C92071]' : 'w-2.5 bg-gray-300'
              }`}
              aria-label={`Ir para slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Ícones de Benefícios */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { icon: <Truck className="text-[#C92071]" size={28} />, title: 'Frete Grátis', desc: 'Em compras acima de R$ 199' },
          { icon: <ShieldCheck className="text-[#C92071]" size={28} />, title: 'Compra Segura', desc: 'Garantia de 100% de reembolso' },
          { icon: <Sparkles className="text-[#C92071]" size={28} />, title: 'Produtos Originais', desc: 'Importados direto das marcas' },
          { icon: <Headphones className="text-[#C92071]" size={28} />, title: 'Suporte 24/7', desc: 'Atendimento humanizado rápido' },
        ].map((item, i) => (
          <div key={i} className="bg-white p-6 rounded-xl shadow-xs flex items-center gap-4 border border-gray-100">
            {item.icon}
            <div>
              <h4 className="font-bold text-sm text-[#1F1F1F]">{item.title}</h4>
              <p className="text-xs text-[#8F8F8F]">{item.desc}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Produtos em Destaque */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#1F1F1F]">Produtos em Destaque</h2>
          <Link to="/produtos" className="text-sm font-semibold text-[#C92071] hover:underline flex items-center gap-1">
            Ver todos <ArrowRight size={16} />
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
