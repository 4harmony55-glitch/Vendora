import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Heart, Eye, Zap } from 'lucide-react';

function ProductCard({ product, addToCart, addToWishlist }) {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  
  const hasDiscount = product.discountPrice && product.discountPrice < product.price;
  const discountPercent = hasDiscount 
    ? Math.round(((product.price - product.discountPrice) / product.price) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product);
    
    // Show toast-like notification
    const toast = document.createElement('div');
    toast.textContent = '✓ Added to cart!';
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
    }, 2000);
  };

  const handleAddToWishlist = (e) => {
    e.stopPropagation();
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
    }, 2000);
  };

  return (
    <div
      onClick={() => navigate(`/product/${product.id}`)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: 'white',
        borderRadius: '16px',
        overflow: 'hidden',
        cursor: 'pointer',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        boxShadow: isHovered 
          ? '0 20px 40px rgba(0,0,0,0.15), 0 0 0 3px rgba(255,184,77,0.3)' 
          : '0 4px 12px rgba(0,0,0,0.08)',
        transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
        animation: 'fadeIn 0.6s ease'
      }}
    >
      {/* Discount Badge */}
      {hasDiscount && (
        <div style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          background: 'linear-gradient(135deg, #EF4444, #DC2626)',
          color: 'white',
          padding: '8px 14px',
          borderRadius: '10px',
          fontSize: 'clamp(13px, 2.5vw, 15px)',
          fontWeight: '800',
          zIndex: 10,
          boxShadow: '0 4px 12px rgba(239, 68, 68, 0.5)',
          animation: 'pulse 2s infinite',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <Zap size={14} />
          -{discountPercent}%
        </div>
      )}

      {/* Quick View Button (Desktop only) */}
      {isHovered && window.innerWidth >= 768 && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/product/${product.id}`);
          }}
          style={{
            position: 'absolute',
            top: '12px',
            right: '12px',
            background: 'rgba(255,255,255,0.95)',
            backdropFilter: 'blur(10px)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10,
            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            animation: 'fadeIn 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.background = '#1E40AF';
            e.target.querySelector('svg').style.color = 'white';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'rgba(255,255,255,0.95)';
            e.target.querySelector('svg').style.color = '#1E40AF';
          }}
        >
          <Eye size={20} color="#1E40AF" />
        </button>
      )}

      {/* Product Image */}
      <div style={{
        width: '100%',
        height: 'clamp(200px, 40vw, 260px)',
        overflow: 'hidden',
        background: imageLoaded ? 'transparent' : '#f3f4f6',
        position: 'relative'
      }}>
        {!imageLoaded && (
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
          src={product.images[0] || 'https://via.placeholder.com/300'} 
          alt={product.name}
          onLoad={() => setImageLoaded(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: isHovered ? 'scale(1.15)' : 'scale(1)',
            opacity: imageLoaded ? 1 : 0
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
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>

      {/* Product Info */}
      <div style={{ 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column', 
        padding: 'clamp(16px, 3vw, 20px)'
      }}>
        {/* Category Badge */}
        <div style={{
          display: 'inline-block',
          alignSelf: 'flex-start',
          padding: '4px 12px',
          background: 'linear-gradient(135deg, rgba(255,184,77,0.15), rgba(30,64,175,0.15))',
          borderRadius: '6px',
          fontSize: 'clamp(11px, 2vw, 12px)',
          fontWeight: '700',
          color: '#1E40AF',
          marginBottom: '10px',
          textTransform: 'uppercase',
          letterSpacing: '0.5px'
        }}>
          {product.category}
        </div>

        <h3 style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          fontWeight: '700',
          marginBottom: '12px',
          color: '#1f2937',
          lineHeight: '1.4',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          minHeight: 'clamp(40px, 8vw, 50px)'
        }}>
          {product.name}
        </h3>

        {/* Price Section */}
        <div style={{ marginBottom: '16px', marginTop: 'auto' }}>
          {hasDiscount ? (
            <div>
              <div style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '800',
                color: '#FFB84D',
                marginBottom: '4px'
              }}>
                ₦{product.discountPrice.toLocaleString()}
              </div>
              <div style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                color: '#9ca3af',
                textDecoration: 'line-through',
                fontWeight: '500'
              }}>
                ₦{product.price.toLocaleString()}
              </div>
            </div>
          ) : (
            <div style={{
              fontSize: 'clamp(20px, 4vw, 24px)',
              fontWeight: '800',
              color: '#1E40AF'
            }}>
              ₦{product.price.toLocaleString()}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: '10px'
        }}>
          <button
            onClick={handleAddToCart}
            style={{
              padding: 'clamp(12px, 2.5vw, 14px)',
              background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
              color: 'white',
              border: 'none',
              borderRadius: '10px',
              cursor: 'pointer',
              fontSize: 'clamp(14px, 2.5vw, 15px)',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              transition: 'all 0.3s ease',
              minHeight: '48px',
              boxShadow: '0 4px 12px rgba(255,184,77,0.3)'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-2px)';
              e.target.style.boxShadow = '0 8px 20px rgba(255,184,77,0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 4px 12px rgba(255,184,77,0.3)';
            }}
          >
            <ShoppingCart size={18} />
            <span>Add</span>
          </button>

          <button
            onClick={handleAddToWishlist}
            style={{
              padding: 'clamp(12px, 2.5vw, 14px)',
              background: 'rgba(239, 68, 68, 0.1)',
              color: '#EF4444',
              border: '2px solid #EF4444',
              borderRadius: '10px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minWidth: '48px',
              minHeight: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#EF4444';
              e.target.querySelector('svg').style.color = 'white';
              e.target.style.transform = 'scale(1.05)';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
              e.target.querySelector('svg').style.color = '#EF4444';
              e.target.style.transform = 'scale(1)';
            }}
          >
            <Heart size={20} />
          </button>
        </div>
      </div>

      {/* Stock Indicator (if out of stock) */}
      {product.stock === 0 && (
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'rgba(0,0,0,0.7)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 5
        }}>
          <span style={{
            color: 'white',
            fontSize: 'clamp(18px, 4vw, 24px)',
            fontWeight: '800',
            padding: '12px 24px',
            background: 'rgba(239, 68, 68, 0.9)',
            borderRadius: '12px'
          }}>
            OUT OF STOCK
          </span>
        </div>
      )}
    </div>
  );
}

// Add shimmer animation
const style = document.createElement('style');
style.textContent = `
  @keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
  }
  
  @keyframes slideInRight {
    from { transform: translateX(400px); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  
  @keyframes fadeOut {
    from { opacity: 1; transform: translateY(0); }
    to { opacity: 0; transform: translateY(-20px); }
  }
`;
document.head.appendChild(style);

export default ProductCard;