import { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Filter, SlidersHorizontal, ArrowUpDown, X, ShoppingBag } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { products as initialProducts } from '../data/products';

export default function ProductListingPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryFilter = searchParams.get('q') || '';
  const categoryParam = searchParams.get('categoria') || searchParams.get('category') || searchParams.get('filter');

  const [products] = useState(initialProducts);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedGender, setSelectedGender] = useState('todos');
  const [maxPrice, setMaxPrice] = useState(1000);
  const [sortBy, setSortBy] = useState('relevant');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategories([categoryParam]);
    }
  }, [categoryParam]);

  const categories = ['Tênis', 'Camisetas', 'Calças', 'Bonés', 'Headphones'];
  const brands = ['Nike', 'Adidas', 'Puma', 'K-Swiss', 'Balenciaga'];

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrands([]);
    setSelectedGender('todos');
    setMaxPrice(1000);
    setSearchParams({});
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (queryFilter) {
      const q = queryFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          (p.category && p.category.toLowerCase().includes(q)) ||
          (p.brand && p.brand.toLowerCase().includes(q))
      );
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedGender !== 'todos') {
      result = result.filter(
        (p) =>
          p.gender && p.gender.toLowerCase() === selectedGender.toLowerCase()
      );
    }

    result = result.filter((p) => (p.priceDiscount || p.price) <= maxPrice);

    if (sortBy === 'lowest') {
      result.sort((a, b) => (a.priceDiscount || a.price) - (b.priceDiscount || b.price));
    } else if (sortBy === 'highest') {
      result.sort((a, b) => (b.priceDiscount || b.price) - (a.priceDiscount || a.price));
    } else if (sortBy === 'name') {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [products, queryFilter, selectedCategories, selectedBrands, selectedGender, maxPrice, sortBy]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-[#1F1F1F]">
            {queryFilter ? `Resultados para "${queryFilter}"` : 'Catálogo de Produtos'}
          </h1>
          <p className="text-sm text-gray-500 mt-0.5">
            Mostrando <span className="font-bold text-[#1F1F1F]">{filteredProducts.length}</span> produtos disponíveis
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileFilterOpen(true)}
            className="md:hidden inline-flex items-center gap-2 bg-white px-4 py-2.5 rounded-lg border border-gray-200 text-sm font-semibold text-[#1F1F1F] shadow-sm cursor-pointer"
          >
            <SlidersHorizontal size={16} /> Filtros
          </button>

          <div className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg border border-gray-200 shadow-sm">
            <ArrowUpDown size={16} className="text-gray-400" />
            <span className="text-xs text-gray-400 hidden sm:inline">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="text-sm font-semibold text-[#1F1F1F] bg-transparent outline-none cursor-pointer"
            >
              <option value="relevant">Mais relevantes</option>
              <option value="lowest">Menor preço</option>
              <option value="highest">Maior preço</option>
              <option value="name">Nome (A-Z)</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="hidden lg:block lg:col-span-1 space-y-6 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm h-fit">
          <div className="flex items-center justify-between pb-4 border-b border-gray-100">
            <h3 className="font-bold text-[#1F1F1F] flex items-center gap-2">
              <Filter size={18} className="text-[#C92071]" /> Filtrar por
            </h3>
            {(selectedCategories.length > 0 || selectedBrands.length > 0 || selectedGender !== 'todos' || maxPrice < 1000 || queryFilter) && (
              <button
                type="button"
                onClick={clearFilters}
                className="text-xs text-[#C92071] font-bold hover:underline cursor-pointer"
              >
                Limpar filtros
              </button>
            )}
          </div>

          {/* Faixa de Preço */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
              <span>Preço Máximo</span>
              <span className="text-[#C92071]">R$ {maxPrice}</span>
            </div>
            <input
              type="range"
              min="100"
              max="1000"
              step="50"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#C92071] cursor-pointer"
            />
          </div>

          {/* Categorias */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categorias</h4>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#1F1F1F]">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 rounded text-[#C92071] focus:ring-[#C92071] accent-[#C92071] cursor-pointer"
                  />
                  {cat}
                </label>
              ))}
            </div>
          </div>

          {/* Marcas */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Marcas</h4>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label key={brand} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#1F1F1F]">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="w-4 h-4 rounded text-[#C92071] focus:ring-[#C92071] accent-[#C92071] cursor-pointer"
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          {/* Gênero */}
          <div className="space-y-3 pt-4 border-t border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Gênero</h4>
            <div className="space-y-2">
              {['todos', 'Masculino', 'Feminino', 'Unissex'].map((g) => (
                <label key={g} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer hover:text-[#1F1F1F]">
                  <input
                    type="radio"
                    name="genderFilter"
                    checked={selectedGender.toLowerCase() === g.toLowerCase()}
                    onChange={() => setSelectedGender(g)}
                    className="w-4 h-4 text-[#C92071] focus:ring-[#C92071] accent-[#C92071] cursor-pointer"
                  />
                  {g === 'todos' ? 'Todos' : g}
                </label>
              ))}
            </div>
          </div>
        </aside>

        <main className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 text-center border border-gray-100 shadow-sm space-y-4">
              <div className="w-16 h-16 bg-[#F9F8FE] text-gray-400 rounded-full flex items-center justify-center mx-auto">
                <ShoppingBag size={28} />
              </div>
              <h3 className="text-lg font-bold text-[#1F1F1F]">Nenhum produto encontrado</h3>
              <p className="text-sm text-gray-500 max-w-sm mx-auto">
                Não encontramos itens correspondentes aos filtros selecionados. Tente limpar os filtros para ver mais opções.
              </p>
              <button
                type="button"
                onClick={clearFilters}
                className="mt-2 bg-[#C92071] hover:bg-[#991956] text-white text-sm font-bold px-6 py-3 rounded-lg transition-colors cursor-pointer"
              >
                Limpar todos os filtros
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </main>
      </div>

      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex justify-end">
          <div className="w-full max-w-xs bg-white h-full p-6 overflow-y-auto space-y-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-gray-100">
              <h3 className="font-bold text-[#1F1F1F] flex items-center gap-2">
                <Filter size={18} className="text-[#C92071]" /> Filtrar produtos
              </h3>
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="p-2 text-gray-400 hover:text-[#1F1F1F] cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center text-xs font-bold text-gray-400 uppercase tracking-wider">
                <span>Preço Máximo</span>
                <span className="text-[#C92071]">R$ {maxPrice}</span>
              </div>
              <input
                type="range"
                min="100"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-[#C92071]"
              />
            </div>

            <div className="space-y-3 pt-4 border-t border-gray-100">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Categorias</h4>
              <div className="space-y-2">
                {categories.map((cat) => (
                  <label key={cat} className="flex items-center gap-3 text-sm text-gray-600 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(cat)}
                      onChange={() => handleCategoryChange(cat)}
                      className="w-4 h-4 rounded text-[#C92071] accent-[#C92071]"
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>

            <div className="pt-6">
              <button
                type="button"
                onClick={() => setMobileFilterOpen(false)}
                className="w-full bg-[#C92071] text-white font-bold py-3 rounded-lg text-sm"
              >
                Aplicar filtros
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
