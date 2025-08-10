import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/product/:id" element={<ProductDetailPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
        </main>
        
        {/* Footer */}
        <footer className="bg-gray-900 text-white py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              <div className="col-span-2">
                <h3 className="text-2xl font-bold text-blue-400 mb-4">ShopStore</h3>
                <p className="text-gray-300 mb-4">
                  Your one-stop destination for quality products at affordable prices.
                </p>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                <ul className="space-y-2">
                  <li><a href="/products" className="text-gray-300 hover:text-blue-400">Products</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400">About Us</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400">Contact</a></li>
                </ul>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold mb-4">Support</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-300 hover:text-blue-400">Help Center</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400">Shipping</a></li>
                  <li><a href="#" className="text-gray-300 hover:text-blue-400">Returns</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-700 mt-8 pt-8 text-center">
              <p className="text-gray-300">© 2024 ShopStore. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}

export default App;
