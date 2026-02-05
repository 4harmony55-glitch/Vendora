import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, ArrowLeft, ChevronLeft, ChevronRight, Star, Package, Shield, Zap, Check } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { API_URL } from '../config';

function ProductDetails({ addToCart, addToWishlist }) {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [imageLoading, setImageLoading] = useState(true);
  const navigate = useNavigate();

  const fetchRecommendations = useCallback(async (category) => {
    try {
      const res = await fetch(`${API_URL}?action=getProductsByCategory&category=${encodeURIComponent(category)}`);
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (data.success) {
          const filtered = data.products.filter(p => p.id !== id);
          setRecommendations(filtered);
        }
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  }, [id]);

  const fetchProduct = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}?action=getProductById&id=${id}`);
      const contentType = res.headers.get("content-type");
      
      if (contentType && contentType.indexOf("application/json") !== -1) {
        const data = await res.json();
        if (data.success) {
          setProduct(data.product);
          fetchRecommendations(data.product.category);
        }
      }
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  }, [id, fetchRecommendations]);

  useEffect(() => {
    fetchProduct();
    window.scrollTo(0, 0);
  }, [id, fetchProduct]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div className="spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
        <Package size={64} color="#9ca3af" style={{ marginBottom: '20px' }} />
        <h2 style={{ fontSize: 'clamp(22px, 5vw, 28px)', marginBottom: '12px', color: '#1f2937' }}>Product not found</h2>
        <p style={{ fontSize: 'clamp(15px, 3vw, 16px)', color: '#6b7280', marginBottom: '24px' }}>
          The product you're looking for doesn't exist
        </p>
        <button onClick={() => navigate('/')} className="btn btn-primary">
          Back to Home
        </button>
      </div>
    );
  }

  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const nextImage = () => {
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  };

  const prevImage = () => {
    setImageLoading(true);
    setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    
    const toast = document.createElement('div');
    toast.textContent = `✓ ${quantity} item${quantity > 1 ? 's' : ''} added to cart!`;
    toast.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: linear-gradient(135deg, #10B981, #059669);
      color: white;
      padding: 16px 24px;
      border-radius: 12px;
      font-weight: 700;
      box-shadow: 0 8px 24px rgba(16, 185, 129, 0.4);
      z-index: 10000;
      animation: slideInRight 0.3s ease;
      font-size: 15px;
    `;
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'fadeOut 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  };

  return (
    <div style={{ minHeight: '80vh', background: '#FFF8E7' }}>
      {/* Product Section */}
      <section style={{ padding: 'clamp(40px, 6vw, 60px) 20px' }}>
        <div className="container" style={{ maxWidth: '1400px' }}>
          {/* Back Button */}
          <button
            onClick={() => navigate(-1)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'transparent',
              border: 'none',
              color: '#1f2937',
              padding: '8px 0',
              cursor: 'pointer',
              fontSize: 'clamp(15px, 3vw, 16px)',
              fontWeight: '600',
              marginBottom: 'clamp(24px, 4vw, 32px)',
              transition: 'all 0.3s ease',
              minHeight: '44px'
            }}
            onMouseEnter={(e) => {
              e.target.style.color = '#FFB84D';
              e.target.style.transform = 'translateX(-4px)';
            }}
            onMouseLeave={(e) => {
              e.target.style.color = '#1f2937';
              e.target.style.transform = 'translateX(0)';
            }}
          >
            <ArrowLeft size={20} />
            Back
          </button>

          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1fr 1fr',
            gap: 'clamp(32px, 6vw, 60px)',
            marginBottom: 'clamp(60px, 10vw, 80px)',
            animation: 'fadeIn 0.6s ease'
          }}>
            {/* Image Section */}
            <div>
              {/* Main Image */}
              <div style={{
                position: 'relative',
                width: '100%',
                height: window.innerWidth < 768 ? '400px' : '550px',
                borderRadius: '20px',
                overflow: 'hidden',
                background: imageLoading ? '#f3f4f6' : 'white',
                boxShadow: '0 12px 40px rgba(0,0,0,0.12)',
                marginBottom: '20px'
              }}>
                {/* Discount Badge */}
                {hasDiscount && (
                  <div style={{
                    position: 'absolute',
                    top: 'clamp(16px, 3vw, 24px)',
                    left: 'clamp(16px, 3vw, 24px)',
                    background: 'linear-gradient(135deg, #EF4444, #DC2626)',
                    color: 'white',
                    padding: 'clamp(10px, 2vw, 12px) clamp(16px, 3vw, 20px)',
                    borderRadius: '12px',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '800',
                    zIndex: 10,
                    boxShadow: '0 4px 16px rgba(239, 68, 68, 0.5)',
                    animation: 'pulse 2s infinite',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}>
                    <Zap size={18} />
                    {discountPercent}% OFF
                  </div>
                )}

                {/* Loading Skeleton */}
                {imageLoading && (
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(90deg, #f3f4f6 25%, #e5e7eb 50%, #f3f4f6 75%)',
                    backgroundSize: '200% 100%',
                    animation: 'shimmer 1.5s infinite'
                  }} />
                )}

                <img 
                  src={product.images[currentImageIndex] || 'https://via.placeholder.com/500'} 
                  alt={product.name}
                  onLoad={() => setImageLoading(false)}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    opacity: imageLoading ? 0 : 1,
                    transition: 'opacity 0.3s ease'
                  }}
                />
                
                {/* Overlay gradient on hover */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: 'linear-gradient(to top, rgba(0,0,0,0.3) 0%, transparent 50%)',
                  opacity: 0,
                  transition: 'opacity 0.3s ease'
                }} />

                {/* Navigation Arrows */}
                {product.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      style={{
                        position: 'absolute',
                        left: 'clamp(12px, 2vw, 20px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 'clamp(44px, 8vw, 56px)',
                        height: 'clamp(44px, 8vw, 56px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
                    >
                      <ChevronLeft size={window.innerWidth < 768 ? 20 : 28} color="#1f2937" />
                    </button>
                    <button
                      onClick={nextImage}
                      style={{
                        position: 'absolute',
                        right: 'clamp(12px, 2vw, 20px)',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'rgba(255,255,255,0.95)',
                        backdropFilter: 'blur(10px)',
                        border: 'none',
                        borderRadius: '50%',
                        width: 'clamp(44px, 8vw, 56px)',
                        height: 'clamp(44px, 8vw, 56px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer',
                        boxShadow: '0 4px 16px rgba(0,0,0,0.15)',
                        transition: 'all 0.3s ease',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-50%) scale(1.1)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(-50%) scale(1)'}
                    >
                      <ChevronRight size={window.innerWidth < 768 ? 20 : 28} color="#1f2937" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {product.images.length > 1 && (
                <div style={{
                  display: 'flex',
                  gap: '12px',
                  overflowX: 'auto',
                  padding: '8px 0',
                  scrollbarWidth: 'thin'
                }}>
                  {product.images.map((img, index) => (
                    <img 
                      key={index}
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      onClick={() => {
                        setImageLoading(true);
                        setCurrentImageIndex(index);
                      }}
                      style={{
                        width: 'clamp(70px, 15vw, 90px)',
                        height: 'clamp(70px, 15vw, 90px)',
                        objectFit: 'cover',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        border: currentImageIndex === index ? '3px solid #FFB84D' : '3px solid #e5e7eb',
                        transition: 'all 0.3s ease',
                        flexShrink: 0,
                        boxShadow: currentImageIndex === index ? '0 4px 12px rgba(255,184,77,0.4)' : 'none'
                      }}
                      onMouseEnter={(e) => {
                        if (currentImageIndex !== index) {
                          e.target.style.borderColor = '#FFB84D';
                          e.target.style.transform = 'scale(1.05)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (currentImageIndex !== index) {
                          e.target.style.borderColor = '#e5e7eb';
                          e.target.style.transform = 'scale(1)';
                        }
                      }}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div>
              {/* Category Badge */}
              <div style={{
                display: 'inline-block',
                padding: '8px 16px',
                background: 'linear-gradient(135deg, rgba(255,184,77,0.15), rgba(30,64,175,0.15))',
                borderRadius: '8px',
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                fontWeight: '700',
                color: '#1E40AF',
                marginBottom: '16px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}>
                {product.category}
              </div>

              <h1 style={{
                fontSize: 'clamp(28px, 6vw, 42px)',
                fontWeight: '900',
                color: '#1f2937',
                marginBottom: '16px',
                fontFamily: "'Playfair Display', serif",
                lineHeight: '1.2',
                wordBreak: 'break-word'
              }}>
                {product.name}
              </h1>

              {/* Price */}
              <div style={{ marginBottom: 'clamp(24px, 4vw, 32px)' }}>
                {hasDiscount ? (
                  <div>
                    <div style={{
                      fontSize: 'clamp(36px, 7vw, 48px)',
                      fontWeight: '900',
                      color: '#FFB84D',
                      marginBottom: '8px'
                    }}>
                      ₦{product.discountPrice.toLocaleString()}
                    </div>
                    <div style={{
                      fontSize: 'clamp(20px, 4vw, 24px)',
                      color: '#9ca3af',
                      textDecoration: 'line-through',
                      fontWeight: '600'
                    }}>
                      ₦{product.price.toLocaleString()}
                    </div>
                    <div style={{
                      marginTop: '8px',
                      fontSize: 'clamp(14px, 2.5vw, 15px)',
                      color: '#10B981',
                      fontWeight: '700'
                    }}>
                      You save ₦{(product.price - product.discountPrice).toLocaleString()} ({discountPercent}%)
                    </div>
                  </div>
                ) : (
                  <div style={{
                    fontSize: 'clamp(36px, 7vw, 48px)',
                    fontWeight: '900',
                    color: '#1E40AF'
                  }}>
                    ₦{product.price.toLocaleString()}
                  </div>
                )}
              </div>

              {/* Trust Badges */}
              <div style={{
                display: 'flex',
                gap: '16px',
                marginBottom: 'clamp(24px, 4vw, 32px)',
                flexWrap: 'wrap'
              }}>
                <TrustBadge icon={Shield} text="Secure Payment" />
                <TrustBadge icon={Package} text="2-4 Days Delivery" />
                <TrustBadge icon={Check} text="Quality Assured" />
              </div>

              {/* Description */}
              <div style={{
                background: 'white',
                padding: 'clamp(20px, 4vw, 28px)',
                borderRadius: '16px',
                marginBottom: 'clamp(24px, 4vw, 32px)',
                boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                border: '2px solid #f3f4f6'
              }}>
                <h3 style={{
                  fontSize: 'clamp(18px, 3.5vw, 22px)',
                  fontWeight: '700',
                  marginBottom: '12px',
                  color: '#1f2937',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <Star size={20} color="#FFB84D" />
                  Description
                </h3>
                <p style={{
                  fontSize: 'clamp(15px, 3vw, 16px)',
                  color: '#4b5563',
                  lineHeight: '1.8'
                }}>
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div style={{ marginBottom: '24px' }}>
                <label style={{
                  fontSize: 'clamp(15px, 3vw, 16px)',
                  fontWeight: '700',
                  color: '#1f2937',
                  marginBottom: '12px',
                  display: 'block'
                }}>
                  Quantity
                </label>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      borderRadius: '10px',
                      fontSize: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#FFB84D';
                      e.target.style.background = 'rgba(255,184,77,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = 'white';
                    }}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    style={{
                      width: 'clamp(70px, 15vw, 90px)',
                      height: '50px',
                      border: '2px solid #e5e7eb',
                      borderRadius: '10px',
                      textAlign: 'center',
                      fontSize: '20px',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    style={{
                      width: '50px',
                      height: '50px',
                      border: '2px solid #e5e7eb',
                      background: 'white',
                      borderRadius: '10px',
                      fontSize: '24px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      fontWeight: '700',
                      color: '#1f2937'
                    }}
                    onMouseEnter={(e) => {
                      e.target.style.borderColor = '#FFB84D';
                      e.target.style.background = 'rgba(255,184,77,0.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.borderColor = '#e5e7eb';
                      e.target.style.background = 'white';
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: window.innerWidth < 640 ? '1fr' : '1fr auto',
                gap: '16px',
                marginBottom: '20px'
              }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    padding: 'clamp(16px, 3vw, 20px)',
                    background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 8px 24px rgba(255,184,77,0.4)',
                    minHeight: '60px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 12px 32px rgba(255,184,77,0.5)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = '0 8px 24px rgba(255,184,77,0.4)';
                  }}
                >
                  <ShoppingCart size={24} />
                  Buy Now 📦
                </button>

                <button
                  onClick={() => {
                    addToWishlist(product);
                    const toast = document.createElement('div');
                    toast.textContent = '❤️ Added to wishlist!';
                    toast.style.cssText = `
                      position: fixed;
                      bottom: 20px;
                      right: 20px;
                      background: linear-gradient(135deg, #EF4444, #DC2626);
                      color: white;
                      padding: 16px 24px;
                      border-radius: 12px;
                      font-weight: 700;
                      box-shadow: 0 8px 24px rgba(239, 68, 68, 0.4);
                      z-index: 10000;
                      animation: slideInRight 0.3s ease;
                      font-size: 15px;
                    `;
                    document.body.appendChild(toast);
                    setTimeout(() => {
                      toast.style.animation = 'fadeOut 0.3s ease';
                      setTimeout(() => toast.remove(), 300);
                    }, 2500);
                  }}
                  style={{
                    padding: 'clamp(16px, 3vw, 20px) clamp(20px, 4vw, 24px)',
                    background: 'rgba(239, 68, 68, 0.1)',
                    color: '#EF4444',
                    border: '2px solid #EF4444',
                    borderRadius: '14px',
                    cursor: 'pointer',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    minHeight: '60px',
                    minWidth: window.innerWidth < 640 ? '100%' : 'auto'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = '#EF4444';
                    e.target.style.color = 'white';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                    e.target.style.color = '#EF4444';
                  }}
                >
                  <Heart size={24} />
                  Save ❤️
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recommendations */}
      {recommendations.length > 0 && (
        <section style={{
          padding: 'clamp(60px, 10vw, 80px) 20px',
          background: 'white'
        }}>
          <div className="container">
            <h2 style={{
              fontSize: 'clamp(26px, 6vw, 36px)',
              fontWeight: '800',
              marginBottom: 'clamp(32px, 6vw, 40px)',
              color: '#1f2937',
              fontFamily: "'Playfair Display', serif"
            }}>
              You May Also Like
            </h2>
            <div className="responsive-grid">
              {recommendations.slice(0, 4).map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

// Trust Badge Component
const TrustBadge = ({ icon: Icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(16, 185, 129, 0.1)',
    borderRadius: '8px',
    fontSize: 'clamp(13px, 2.5vw, 14px)',
    fontWeight: '600',
    color: '#10B981',
    border: '2px solid rgba(16, 185, 129, 0.2)'
  }}>
    <Icon size={18} />
    <span>{text}</span>
  </div>
);

export default ProductDetails;
