import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Shirt, Footprints, Headphones, Watch } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

const slides = [
  {
    tag: 'Melhores ofertas personalizadas',
    title: 'Queima de estoque Nike 🔥',
    desc: 'Aproveite descontos exclusivos em tênis de corrida e streetwear com entrega rápida para todo o Brasil.',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Lançamentos da temporada',
    title: 'Nova Coleção Streetwear 👟',
    desc: 'Modelos exclusivos selecionados para unir conforto extremo e estilo urbano.',
    image: 'https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=900&q=80',
  },
  {
    tag: 'Tecnologia & Áudio',
    title: 'Som Imersivo Studio Pro 🎧',
    desc: 'Cancelamento de ruído ativo e design premium para acompanhar sua rotina.',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80',
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);

  return (
    <div className="space-y-16">
      <section className="bg-[#F5F5F5] py-12 sm:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-8">
            <div className="lg:col-span-5 space-y-5 text-center lg:text-left order-2 lg:order-1">
              <p className="text-[#F6AA1C] font-bold text-sm sm:text-base">{slides[currentSlide].tag}</p>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#1F1F1F] leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-[#474747] text-sm sm:text-base leading-relaxed">{slides[currentSlide].desc}</p>
              <div className="pt-2">
                <Link
                  to="/produtos"
                  className="inline-block bg-[#C92071] hover:bg-[#991956] text-white font-semibold text-sm sm:text-base px-10 py-3.5 rounded-lg transition-colors"
                >
                  Ver Ofertas
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7 flex justify-center order-1 lg:order-2">
              <img
                src={slides[currentSlide].image}
                alt={slides[currentSlide].title}
                className="w-full max-w-lg h-64 sm:h-96 object-contain drop-shadow-xl -rotate-6 transition-all duration-300"
              />
            </div>
          </div>
          <div className="flex items-center justify-center gap-2.5 mt-8">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-colors cursor-pointer ${
                  currentSlide === idx ? 'bg-[#C92071]' : 'bg-[#CCCCCC]'
                }`}
                aria-label={`Slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <h2 className="text-xl sm:text-2xl font-bold text-[#474747]">Coleções em destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Novo drop Supreme', cat: 'Camisetas', img: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=400&q=80' },
            { title: 'Coleção Adidas', cat: 'Tênis', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=400&q=80' },
            { title: 'Novo Beats Bass', cat: 'Headphones', img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=400&q=80' },
          ].map((col, i) => (
            <div key={i} className="bg-[#D8E3F2] rounded-lg p-6 flex items-center justify-between overflow-hidden relative min-h-[210px]">
              <div className="space-y-3 z-10 max-w-[55%]">
                <span className="inline-block bg-[#E7FF86] text-[#474747] text-xs font-bold px-3 py-1 rounded-full">30% OFF</span>
                <h3 className="text-2xl font-extrabold text-[#1F1F1F] leading-tight">{col.title}</h3>
                <Link to={`/produtos?cat=${col.cat}`} className="inline-block bg-[#F5F5F5] hover:bg-white text-[#C92071] font-bold text-sm px-6 py-2.5 rounded-lg transition-colors">
                  Comprar
                </Link>
              </div>
              <img src={col.img} alt={col.title} className="w-36 h-36 object-contain drop-shadow-md" />
            </div>
          ))}
        </div>

        <div className="pt-8 space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-[#474747] text-center">Coleções em destaque</h3>
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12">
            {[
              { label: 'Camisetas', icon: Shirt },
              { label: 'Calças', icon: Watch },
              { label: 'Bonés', icon: Watch },
              { label: 'Headphones', icon: Headphones },
              { label: 'Tênis', icon: Footprints },
            ].map(({ label, icon: Icon }) => (
              <Link key={label} to={`/produtos?cat=${label}`} className="group flex flex-col items-center gap-3">
                <div className="w-24 h-24 rounded-full bg-white shadow-xs flex items-center justify-center text-[#8F8F8F] group-hover:text-[#C92071] group-hover:shadow-md transition-all">
                  <Icon size={40} strokeWidth={1.5} />
                </div>
                <span className="text-sm font-bold text-[#474747] group-hover:text-[#C92071]">{label}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#474747]">Produtos em alta</h2>
          <Link to="/produtos" className="flex items-center gap-2 text-[#C92071] font-medium text-sm sm:text-base hover:underline">
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="bg-white py-14 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10">
            <div className="lg:col-span-6 flex justify-center">
              <div className="w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-gradient-to-b from-[#4200FF]/15 to-transparent flex items-center justify-center p-6">
                <img
                  src="https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?auto=format&fit=crop&w=800&q=80"
                  alt="Air Jordan edição de colecionador"
                  className="w-full h-full object-contain drop-shadow-xl"
                />
              </div>
            </div>
            <div className="lg:col-span-6 space-y-5">
              <p className="text-[#C92071] font-bold text-sm">Oferta especial</p>
              <h2 className="text-3xl sm:text-5xl font-bold text-[#474747] leading-tight">
                Air Jordan edição de colecionador
              </h2>
              <p className="text-[#474747] text-sm sm:text-base leading-relaxed">
                Construído com materiais premium, acabamento icônico e amortecimento responsivo. Garanta sua numeração antes que acabe o lote limitado.
              </p>
              <div className="pt-2">
                <Link
                  to="/produto/2"
                  className="inline-block bg-[#C92071] hover:bg-[#991956] text-white font-semibold text-sm px-10 py-3.5 rounded-lg transition-colors"
                >
                  Ver Oferta
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
