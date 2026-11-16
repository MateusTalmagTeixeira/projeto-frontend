import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';

export default function ProductViewPage() {
  const { id } = useParams();
  const product = products.find((p) => String(p.id) === String(id)) || products[0];
  const { addToCart } = useCart();

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  useEffect(() => {
    setSelectedImage(0);
    setSelectedSize(product.sizes[0]);
    setSelectedColor(product.colors[0]);
    window.scrollTo(0, 0);
  }, [product]);

  const formatPrice = (value) =>
    value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

  const relatedProducts = products.filter((p) => p.id !== product.id).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 space-y-16">
      {/* Breadcrumb */}
      <nav className="text-xs sm:text-sm text-[#474747] flex flex-wrap items-center gap-1.5">
        <Link to="/" className="font-bold hover:text-[#C92071]">Home</Link>
        <span>/</span>
        <Link to="/produtos" className="hover:text-[#C92071]">Produtos</Link>
        <span>/</span>
        <Link to={`/produtos?cat=${product.category}`} className="hover:text-[#C92071]">
          {product.category}
        </Link>
        <span>/</span>
        <span className="text-[#8F8F8F]">{product.name}</span>
      </nav>

      {/* Área Principal do Produto */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Galeria de Imagens */}
        <div className="lg:col-span-7 space-y-4">
          <div className="bg-[#E2E3FF] rounded-lg aspect-4/3 flex items-center justify-center p-8 overflow-hidden">
            <img
              src={product.images[selectedImage] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-contain transition-all duration-300"
            />
          </div>

          {product.images.length > 1 && (
            <div className="grid grid-cols-4 sm:grid-cols-5 gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`bg-[#E2E3FF] rounded-md p-2 aspect-square flex items-center justify-center border-2 transition-all cursor-pointer ${
                    selectedImage === idx ? 'border-[#C92071]' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-contain" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Informações e Opções de Compra */}
        <div className="lg:col-span-5 space-y-5">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#1F1F1F]">
            {product.name}
          </h1>

          <p className="text-xs text-[#666666]">
            Casual | {product.brand} | REF:{product.ref}
          </p>

          {/* Avaliação */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#F6AA1C]">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={16}
                  fill={i < Math.round(product.rating) ? '#F6AA1C' : 'none'}
                />
              ))}
            </div>
            <span className="inline-flex items-center gap-1 bg-[#F6AA1C] text-white text-xs font-bold px-2.5 py-0.5 rounded">
              {product.rating} ★
            </span>
            <span className="text-xs text-[#8F8F8F]">
              ({product.reviewsCount} avaliações)
            </span>
          </div>

          {/* Preço */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-3xl font-bold text-[#1F1F1F]">
              {formatPrice(product.priceDiscount || product.price)}
            </span>
            {product.priceDiscount && (
              <span className="text-base text-[#CCCCCC] line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>

          {/* Descrição */}
          <div className="space-y-1.5 pt-2">
            <h3 className="text-sm font-bold text-[#8F8F8F]">Descrição do produto</h3>
            <p className="text-sm text-[#474747] leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Tamanho */}
          <div className="space-y-2.5 pt-2">
            <h3 className="text-sm font-bold text-[#8F8F8F]">Tamanho</h3>
            <div className="flex flex-wrap gap-2.5">
              {product.sizes.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`min-w-12 h-12 px-3 rounded-md font-bold text-sm border transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-[#C92071] text-white border-[#C92071]'
                      : 'bg-white text-[#474747] border-gray-300 hover:border-[#C92071]'
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Cor */}
          <div className="space-y-2.5 pt-1">
            <h3 className="text-sm font-bold text-[#8F8F8F]">Cor</h3>
            <div className="flex items-center gap-3">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`w-9 h-9 rounded-full p-0.5 border-2 transition-all cursor-pointer ${
                    selectedColor === color ? 'border-[#C92071] scale-110' : 'border-transparent'
                  }`}
                  aria-label={`Cor ${color}`}
                >
                  <span
                    className="block w-full h-full rounded-full border border-black/10"
                    style={{ backgroundColor: color }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Botão Comprar */}
          <div className="pt-4">
            <button
              onClick={() => addToCart(product, selectedSize, selectedColor)}
              className="w-full sm:w-56 bg-[#F6AA1C] hover:bg-[#e09812] text-white font-bold text-base py-3.5 rounded-lg uppercase tracking-wide transition-colors cursor-pointer"
            >
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {/* Produtos Relacionados */}
      <section className="space-y-6 pt-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-[#474747]">
            Produtos Relacionados
          </h2>
          <Link
            to="/produtos"
            className="flex items-center gap-2 text-[#C92071] font-medium text-sm sm:text-base hover:underline"
          >
            Ver todos <ArrowRight size={18} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </section>
    </div>
  );
}
