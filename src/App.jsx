import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './components/CartDrawer';
import Toast from './components/Toast';
import ScrollToTop from './components/ScrollToTop';
import HomePage from './pages/HomePage';
import ProductListingPage from './pages/ProductListingPage';
import ProductViewPage from './pages/ProductViewPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import OrdersPage from './pages/OrdersPage';
import CheckoutPage from './pages/CheckoutPage';
import CheckoutSuccessPage from './pages/CheckoutSuccessPage';
import AboutPage from './pages/AboutPage';
import SecurityPage from './pages/SecurityPage';
import WishlistPage from './pages/WishlistPage';
import BlogPage from './pages/BlogPage';
import CareersPage from './pages/CareersPage';

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col justify-between bg-[#F9F8FE]">
          <Header />
          <CartDrawer />
          <Toast />
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/produtos" element={<ProductListingPage />} />
              <Route path="/produto/:id" element={<ProductViewPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/cadastro" element={<RegisterPage />} />
              <Route path="/pedidos" element={<OrdersPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/checkout/sucesso" element={<CheckoutSuccessPage />} />
              <Route path="/sobre" element={<AboutPage />} />
              <Route path="/seguranca" element={<SecurityPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/blog" element={<BlogPage />} />
              <Route path="/trabalhe-conosco" element={<CareersPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}
