import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, X } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from '../components/ProductCard';

export default function ProductListingPage() {
  const [searchParams] = useSearchParams();
  const initialCat = searchParams.get('cat') || '';
  const queryFilter = searchParams.get('filter') || '';

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState(
    initialCat ? [initialCat] : []
  );
  const [selectedGenders, setSelectedGenders] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState('');
  const [sortBy, setSortBy] = useState('relevant');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const toggleItem = (list, setList, value) => {
    setList((prev) =>
      prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]
    );
  };

  const filteredProducts = useMemo(() => {
    let result = [...products];

    if (queryFilter) {
      const q = queryFilter.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      );
    }

    if (selectedBrands.length > 0) {
      result = result.filter((p) => selectedBrands.includes(p.brand));
    }

    if (selectedCategories.length > 0) {
      result = result.filter((p) => selectedCategories.includes(p.category));
    }

    if (selectedGenders.length > 0) {
      result = result.filter((p) => selectedGenders.includes(p.gender));
    }

    if (selectedCondition) {
      result = result.filter((p) => p.condition === selectedCondition);
    }

    if (sortBy === 'price-asc') {
      result.sort((a, b) => (a.priceDiscount || a.price) - (b.priceDiscount || b.price));
    } else if (sortBy === 'price-desc') {
      result.sort((a, b) => (b.priceDiscount || b.price) - (a.priceDiscount || a.price));
    }

    return result;
  }, [queryFilter, selectedBrands, selectedCategories, selectedGenders, selectedCondition, sortBy]);

  const FilterContent = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <h3 className="font-bold text-base text-[#474747]">Filtrar por</h3>
        <button
          onClick={() => {
            setSelectedBrands([]);
            setSelectedCategories([]);
            setSelectedGenders([]);
            setSelectedCondition('');
          }}
          className="text-xs text-[#C92071] hover:underline cursor-pointer"
        >
          Limpar
        </button>
      </div>

      {/* Marca */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-sm text-[#474747]">Marca</h4>
        {['Adidas', 'Balenciaga', 'K-Swiss', 'Nike', 'Puma', 'Beats'].map((brand) => (
          <label key={brand} className="flex items-center gap-2.5 text-sm text-[#474747] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedBrands.includes(brand)}
              onChange={() => toggleItem(selectedBrands, setSelectedBrands, brand)}
              className="w-4 h-4 accent-[#C92071] rounded"
            />
            {brand}
          </label>
        ))}
      </div>

      {/* Categoria */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-sm text-[#474747]">Categoria</h4>
        {['Tênis', 'Camisetas', 'Calças', 'Bonés', 'Headphones'].map((cat) => (
          <label key={cat} className="flex items-center gap-2.5 text-sm text-[#474747] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedCategories.includes(cat)}
              onChange={() => toggleItem(selectedCategories, setSelectedCategories, cat)}
              className="w-4 h-4 accent-[#C92071] rounded"
            />
            {cat}
          </label>
        ))}
      </div>

      {/* Gênero */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-sm text-[#474747]">Gênero</h4>
        {['Masculino', 'Feminino', 'Unissex'].map((gender) => (
          <label key={gender} className="flex items-center gap-2.5 text-sm text-[#474747] cursor-pointer">
            <input
              type="checkbox"
              checked={selectedGenders.includes(gender)}
              onChange={() => toggleItem(selectedGenders, setSelectedGenders, gender)}
              className="w-4 h-4 accent-[#C92071] rounded"
            />
            {gender}
          </label>
        ))}
      </div>

      {/* Estado */}
      <div className="space-y-2.5">
        <h4 className="font-bold text-sm text-[#474747]">Estado</h4>
        {['Novo', 'Usado'].map((cond) => (
          <label key={cond} className="flex items-center gap-2.5 text-sm text-[#474747] cursor-pointer">
            <input
              type="radio"
              name="condition"
              checked={selectedCondition === cond}
              onChange={() => setSelectedCondition(cond)}
              className="w-4 h-4 accent-[#C92071]"
            />
            {cond}
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Topo: Resultados + Ordenar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <p className="text-sm sm:text-base text-[#474747]">
          <strong className="text-[#1F1F1F]">
            Resultados {queryFilter ? `para “${queryFilter}”` : ''}
          </strong>{' '}
          – {filteredProducts.length} produtos
        </p>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 border border-[#474747]/40 rounded-md px-3 py-2.5 bg-white text-sm">
            <span className="font-bold text-[#474747]">Ordenar por:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-[#474747] focus:outline-none cursor-pointer"
            >
              <option value="relevant">mais relevantes</option>
              <option value="price-asc">menor preço</option>
              <option value="price-desc">maior preço</option>
            </select>
          </div>

          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden bg-[#C92071] text-white p-3 rounded-md"
            aria-label="Abrir filtros"
          >
            <Filter size={20} />
          </button>
        </div>
      </div>

      {/* Conteúdo: Sidebar + Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <aside className="hidden lg:block lg:col-span-3 bg-white p-6 rounded-md shadow-xs">
          <FilterContent />
        </aside>

        <div className="lg:col-span-9">
          {filteredProducts.length === 0 ? (
            <div className="bg-white rounded-md p-12 text-center space-y-3">
              <p className="text-lg font-bold text-[#1F1F1F]">Nenhum produto encontrado</p>
              <p className="text-sm text-[#8F8F8F]">
                Tente remover alguns filtros ou pesquisar por outro termo.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Drawer de Filtro Mobile */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 flex">
          <div className="bg-white w-80 max-w-full h-full p-6 overflow-y-auto">
            <div className="flex justify-end mb-2">
              <button onClick={() => setMobileFilterOpen(false)} className="text-[#474747]">
                <X size={22} />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </div>
  );
}
