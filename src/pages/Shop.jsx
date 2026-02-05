import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Package, ArrowLeft, SlidersHorizontal, LayoutGrid, List } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../config';

function ShopPage({ addToCart, addToWishlist }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('default');
  const [viewMode, setViewMode] = useState('grid'); // grid or compact
  const navigate = useNavigate();

  const fetchCategoryProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?action=getProductsByCategory&category=${encodeURIComponent(category)}`);
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (data.success) {
          setProducts(data.products);
          setFilteredProducts(data.products);
        }
      } else {
        console.error('Expected JSON but got:', contentType);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }, [category]);

  const sortProducts = useCallback(() => {
    let sorted = [...products];
    
    switch(sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.discountPrice || a.price) - (b.discountPrice || b.price));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.discountPrice || b.price) - (a.discountPrice || a.price));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        // Keep original order
        break;
    }
    
    setFilteredProducts(sorted);
  }, [products, sortBy]);

  useEffect(() => {
    fetchCategoryProducts();
  }, [category, fetchCategoryProducts]);

  useEffect(() => {
    sortProducts();
  }, [sortBy, products, sortProducts]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#FFF8E7' }}>
      {/* Header - LEGENDARY */}
      <section style={{
        background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
        padding: 'clamp(40px, 8vw, 70px) 20px',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          right: '-10%',
          width: '50%',
          height: '100%',
          background: 'radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 70%)',
          animation: 'pulse 5s ease-in-out infinite'
        }} />
        
        <div className="container" style={{ position: 'relative', zIndex: 1 }}>
          {/* Back Button */}
          <button
            onClick={() => navigate('/categories')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              border: 'none',
              color: 'white',
              padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px)',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 2.5vw, 16px)',
              fontWeight: '600',
              marginBottom: 'clamp(20px, 4vw, 28px)',
              transition: 'all 0.3s ease',
              minHeight: '44px'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.3)';
              e.target.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(255,255,255,0.2)';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={20} />
            <span>All Categories</span>
          </button>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(12px, 2vw, 16px)',
            marginBottom: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              width: 'clamp(50px, 10vw, 64px)',
              height: 'clamp(50px, 10vw, 64px)',
              borderRadius: '50%',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
            }}>
              <Package size={window.innerWidth < 768 ? 24 : 32} color="white" />
            </div>
            
            <h1 style={{
              fontSize: 'clamp(32px, 8vw, 56px)',
              fontWeight: '900',
              color: 'white',
              fontFamily: "'Playfair Display', serif",
              textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
              animation: 'fadeIn 0.8s ease',
              margin: 0,
              wordBreak: 'break-word',
              lineHeight: '1.1'
            }}>
              {category}
            </h1>
          </div>
          
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            color: 'rgba(255,255,255,0.95)',
            animation: 'fadeIn 1s ease',
            fontWeight: '500'
          }}>
            {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''} available
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section style={{ 
        padding: 'clamp(20px, 4vw, 24px) 20px',
        background: 'white',
        borderBottom: '2px solid #e5e7eb',
        position: 'sticky',
        top: '70px',
        zIndex: 100
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            {/* Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flex: '1 1 auto' }}>
              <SlidersHorizontal size={20} color="#6b7280" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  padding: 'clamp(10px, 2vw, 12px) clamp(14px, 3vw, 16px)',
                  fontSize: 'clamp(14px, 2.5vw, 15px)',
                  border: '2px solid #e5e7eb',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  fontWeight: '600',
                  color: '#1f2937',
                  background: 'white',
                  transition: 'all 0.3s ease',
                  minHeight: '44px',
                  minWidth: 'clamp(150px, 30vw, 180px)'
                }}
                onFocus={(e) => e.target.style.borderColor = '#FFB84D'}
                onBlur={(e) => e.target.style.borderColor = '#e5e7eb'}
              >
                <option value="default">Default</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
            </div>

            {/* View Mode Toggle (Desktop only) */}
            {window.innerWidth >= 768 && (
              <div style={{
                display: 'flex',
                gap: '8px',
                padding: '4px',
                background: '#f3f4f6',
                borderRadius: '10px'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '10px',
                    background: viewMode === 'grid' ? 'white' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <LayoutGrid size={20} color={viewMode === 'grid' ? '#FFB84D' : '#6b7280'} />
                </button>
                <button
                  onClick={() => setViewMode('compact')}
                  style={{
                    padding: '10px',
                    background: viewMode === 'compact' ? 'white' : 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    boxShadow: viewMode === 'compact' ? '0 2px 8px rgba(0,0,0,0.1)' : 'none'
                  }}
                >
                  <List size={20} color={viewMode === 'compact' ? '#FFB84D' : '#6b7280'} />
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section style={{ padding: 'clamp(40px, 8vw, 80px) 20px' }}>
        <div className="container">
          {filteredProducts.length > 0 ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: viewMode === 'compact' 
                ? 'repeat(auto-fill, minmax(min(100%, 200px), 1fr))' 
                : 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
              gap: 'clamp(16px, 3vw, 24px)',
              animation: 'fadeIn 0.6s ease'
            }}>
              {filteredProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          ) : (
            <div style={{
              textAlign: 'center',
              padding: 'clamp(60px, 10vw, 80px) 20px',
              animation: 'fadeIn 0.6s ease'
            }}>
              <div style={{
                width: 'clamp(80px, 15vw, 100px)',
                height: 'clamp(80px, 15vw, 100px)',
                borderRadius: '50%',
                background: 'rgba(156, 163, 175, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto clamp(20px, 4vw, 24px)'
              }}>
                <Package size={window.innerWidth < 768 ? 40 : 56} color="#9ca3af" />
              </div>
              <h3 style={{
                fontSize: 'clamp(22px, 5vw, 28px)',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '12px'
              }}>
                No products in this category
              </h3>
              <p style={{
                fontSize: 'clamp(15px, 3vw, 18px)',
                color: '#6b7280',
                marginBottom: '28px',
                maxWidth: '500px',
                margin: '0 auto 28px'
              }}>
                Check back soon for new items!
              </p>
              <button
                onClick={() => navigate('/categories')}
                className="btn btn-primary"
              >
                Browse Other Categories
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Bottom CTA */}
      {filteredProducts.length > 0 && (
        <section style={{
          padding: 'clamp(40px, 8vw, 60px) 20px',
          background: 'linear-gradient(135deg, #6B21A8, #8B5CF6)',
          textAlign: 'center'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: 'clamp(24px, 5vw, 32px)',
              fontWeight: '800',
              color: 'white',
              marginBottom: '12px',
              fontFamily: "'Playfair Display', serif",
              lineHeight: '1.2'
            }}>
              Found what you're looking for?
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 3vw, 18px)',
              color: 'rgba(255,255,255,0.9)',
              marginBottom: '24px',
              padding: '0 20px',
              maxWidth: '600px',
              margin: '0 auto 24px'
            }}>
              Add items to your cart and checkout
            </p>
            <button
              onClick={() => navigate('/cart')}
              className="btn"
              style={{
                background: 'white',
                color: '#6B21A8',
                padding: 'clamp(12px, 2.5vw, 14px) clamp(28px, 6vw, 40px)',
                fontSize: 'clamp(15px, 3vw, 18px)',
                fontWeight: '700',
                minHeight: '52px'
              }}
            >
              View Cart
            </button>
          </div>
        </section>
      )}
    </div>
  );
}

export default ShopPage;
