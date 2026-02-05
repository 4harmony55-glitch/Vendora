import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import VendorApply from './pages/VendorApply';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Support from './pages/Support';

function App() {
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Load cart and wishlist from session storage
  useEffect(() => {
    const savedCart = JSON.parse(sessionStorage.getItem('vendora_cart') || '[]');
    const savedWishlist = JSON.parse(sessionStorage.getItem('vendora_wishlist') || '[]');
    
    setCart(savedCart);
    setWishlist(savedWishlist);
  }, []);

  // Save to session storage whenever cart changes
  useEffect(() => {
    sessionStorage.setItem('vendora_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    sessionStorage.setItem('vendora_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Add to cart
  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  // Remove from cart
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  // Update cart quantity
  const updateCartQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setCart([]);
    sessionStorage.removeItem('vendora_cart');
  };

  // Add to wishlist
  const addToWishlist = (product) => {
    setWishlist(prevWishlist => {
      const exists = prevWishlist.find(item => item.id === product.id);
      if (exists) return prevWishlist;
      return [...prevWishlist, product];
    });
  };

  // Remove from wishlist
  const removeFromWishlist = (productId) => {
    setWishlist(prevWishlist => prevWishlist.filter(item => item.id !== productId));
  };

  return (
    <BrowserRouter>
      <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Routes>
          {/* Main Routes with Navbar & Footer */}
          <Route path="/" element={
            <>
              <Navbar cartCount={cart.length} />
              <Home addToCart={addToCart} addToWishlist={addToWishlist} />
              <Footer />
            </>
          } />

          <Route path="/vendor/apply" element={
            <>
              <Navbar cartCount={cart.length} />
              <VendorApply />
              <Footer />
            </>
          } />
          
          <Route path="/shop" element={
            <>
              <Navbar cartCount={cart.length} />
              <Shop addToCart={addToCart} addToWishlist={addToWishlist} />
              <Footer />
            </>
          } />
          
          <Route path="/shop/:category" element={
            <>
              <Navbar cartCount={cart.length} />
              <Shop addToCart={addToCart} addToWishlist={addToWishlist} />
              <Footer />
            </>
          } />
          
          <Route path="/product/:id" element={
            <>
              <Navbar cartCount={cart.length} />
              <ProductDetails 
                addToCart={addToCart}
                addToWishlist={addToWishlist}
              />
              <Footer />
            </>
          } />
          
          <Route path="/cart" element={
            <>
              <Navbar cartCount={cart.length} />
              <Cart 
                cart={cart}
                wishlist={wishlist}
                updateCartQuantity={updateCartQuantity}
                removeFromCart={removeFromCart}
                removeFromWishlist={removeFromWishlist}
                addToCart={addToCart}
              />
              <Footer />
            </>
          } />
          
          <Route path="/support" element={
            <>
              <Navbar cartCount={cart.length} />
              <Support />
              <Footer />
            </>
          } />
          
          {/* Checkout Route - Minimal Header */}
          <Route path="/checkout" element={
            <>
              <div style={{ 
                padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)', 
                background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                position: 'sticky',
                top: 0,
                zIndex: 1000
              }}>
                <a href="/cart" style={{ 
                  color: 'white', 
                  textDecoration: 'none',
                  fontSize: 'clamp(15px, 3vw, 18px)',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  ← Back to Cart
                </a>
              </div>
              <Checkout cart={cart} clearCart={clearCart} />
              <Footer />
            </>
          } />
          
          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
