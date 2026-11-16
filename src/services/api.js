import { products as fallbackProducts } from '../data/products';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

export async function fetchProducts() {
  try {
    const response = await fetch(`${API_URL}/v1/product/search`);
    if (!response.ok) throw new Error('API offline');
    const json = await response.json();
    const items = json.data || [];
    if (items.length === 0) return fallbackProducts;
    return items.map((item) => ({
      id: item.id,
      name: item.name,
      category: item.categories?.[0]?.name || 'Tênis',
      brand: 'Digital Store',
      gender: 'Unissex',
      condition: 'Novo',
      price: item.price,
      priceDiscount: item.price_with_discount,
      discountTag:
        item.price > item.price_with_discount
          ? `${Math.round(((item.price - item.price_with_discount) / item.price) * 100)}% OFF`
          : '',
      rating: 4.8,
      reviewsCount: 45,
      ref: String(item.id).padStart(8, '0'),
      description: item.description || 'Produto oficial Digital Store.',
      sizes: ['38', '39', '40', '41', '42'],
      colors: ['#1F1F1F', '#C92071', '#6FEEFF'],
      images:
        item.images?.length > 0
          ? item.images.map((img) => img.content)
          : ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80'],
    }));
  } catch {
    return fallbackProducts;
  }
}
