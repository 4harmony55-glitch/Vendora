import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ShoppingCart, Trash2, Plus, Minus, Heart, ShoppingBag, Package, Sparkles } from 'lucide-react';

function Cart({ cart, wishlist, updateCartQuantity, removeFromCart, removeFromWishlist, addToCart }) {
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cart.reduce((sum, item) => {
      const price = item.discountPrice || item.price;
      return sum + (price * item.quantity);
    }, 0);
  };

  const total = calculateTotal();

  if (cart.length === 0 && wishlist.length === 0) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 'clamp(40px, 8vw, 60px) 20px',
        background: '#FFF8E7',
        animation: 'fadeIn 0.6s ease'
      }}>
        <div style={{
          width: 'clamp(100px, 18vw, 140px)',
          height: 'clamp(100px, 18vw, 140px)',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, rgba(255,184,77,0.2), rgba(30,64,175,0.2))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginBottom: '28px',
          animation: 'pulse 3s infinite'
        }}>
          <ShoppingCart size={window.innerWidth < 768 ? 48 : 64} color="#9ca3af" />
        </div>
        <h2 style={{
          fontSize: 'clamp(26px, 6vw, 36px)',
          fontWeight: '800',
          color: '#1f2937',
          marginBottom: '12px',
          fontFamily: "'Playfair Display', serif",
          textAlign: 'center'
        }}>
          Your Cart is Empty
        </h2>
        <p style={{
          fontSize: 'clamp(16px, 3vw, 18px)',
          color: '#6b7280',
          marginBottom: '32px',
          textAlign: 'center',
          padding: '0 20px',
          maxWidth: '500px'
        }}>
          Start shopping and add items to your cart
        </p>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <button
            onClick={() => navigate('/')}
            className="btn btn-primary"
            style={{ fontSize: 'clamp(15px, 3vw, 16px)', padding: 'clamp(14px, 3vw, 16px) clamp(32px, 6vw, 40px)' }}
          >
            Start Shopping
          </button>
          <button
            onClick={() => navigate('/categories')}
            className="btn btn-secondary"
            style={{ fontSize: 'clamp(15px, 3vw, 16px)', padding: 'clamp(14px, 3vw, 16px) clamp(32px, 6vw, 40px)' }}
          >
            Browse Categories
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '80vh', background: '#FFF8E7', padding: 'clamp(40px, 6vw, 60px) 20px' }}>
      <div className="container" style={{ maxWidth: '1400px' }}>
        {/* Header */}
        <div style={{
          marginBottom: 'clamp(32px, 6vw, 48px)',
          animation: 'fadeIn 0.6s ease'
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontWeight: '900',
            marginBottom: '12px',
            background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            fontFamily: "'Playfair Display', serif",
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap'
          }}>
            <ShoppingBag size={window.innerWidth < 768 ? 36 : 48} color="#FFB84D" />
            Shopping Cart
          </h1>
          <p style={{
            fontSize: 'clamp(15px, 3vw, 18px)',
            color: '#6b7280'
          }}>
            {cart.length} item{cart.length !== 1 ? 's' : ''} in your cart
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '2fr 1fr',
          gap: 'clamp(32px, 6vw, 40px)',
          animation: 'fadeIn 0.8s ease'
        }}>
          {/* Cart Items */}
          <div>
            <div style={{
              background: 'white',
              borderRadius: '16px',
              padding: 'clamp(20px, 4vw, 24px)',
              marginBottom: '24px',
              boxShadow: '0 4px 16px rgba(0,0,0,0.08)'
            }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '20px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Package size={24} color="#FFB84D" />
                Products in Cart
              </h2>
              
              {cart.map((item, index) => (
                <div 
                  key={item.id} 
                  className="card" 
                  style={{
                    display: 'grid',
                    gridTemplateColumns: window.innerWidth < 640 ? '100px 1fr' : '120px 1fr auto',
                    gap: window.innerWidth < 640 ? '16px' : '24px',
                    alignItems: 'center',
                    marginBottom: index === cart.length - 1 ? 0 : '16px',
                    padding: 'clamp(16px, 3vw, 20px)',
                    animation: `fadeIn ${0.4 + index * 0.1}s ease`
                  }}
                >
                  <img 
                    src={item.images[0] || 'https://via.placeholder.com/120'} 
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: window.innerWidth < 640 ? '100px' : '120px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  
                  <div>
                    <h3 style={{
                      fontSize: 'clamp(16px, 3vw, 18px)',
                      fontWeight: '700',
                      marginBottom: '8px',
                      color: '#1f2937',
                      lineHeight: '1.4'
                    }}>
                      {item.name}
                    </h3>
                    <p style={{
                      fontSize: 'clamp(14px, 2.5vw, 15px)',
                      color: '#6b7280',
                      marginBottom: '12px'
                    }}>
                      ₦{(item.discountPrice || item.price).toLocaleString()} each
                    </p>
                    
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                        style={{
                          width: '40px',
                          height: '40px',
                          border: '2px solid #e5e7eb',
                          background: 'white',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease'
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
                        <Minus size={16} />
                      </button>
                      <span style={{ 
                        fontSize: 'clamp(16px, 3vw, 18px)', 
                        fontWeight: '700', 
                        minWidth: '30px', 
                        textAlign: 'center',
                        color: '#1f2937'
                      }}>
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                        style={{
                          width: '40px',
                          height: '40px',
                          border: '2px solid #e5e7eb',
                          background: 'white',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          transition: 'all 0.3s ease'
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
                        <Plus size={16} />
                      </button>
                      
                      {window.innerWidth < 640 && (
                        <>
                          <p style={{
                            fontSize: 'clamp(18px, 4vw, 20px)',
                            fontWeight: '800',
                            color: '#FFB84D',
                            marginLeft: 'auto'
                          }}>
                            ₦{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                          </p>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            style={{
                              padding: '10px',
                              background: 'rgba(239, 68, 68, 0.1)',
                              color: '#EF4444',
                              border: 'none',
                              borderRadius: '8px',
                              cursor: 'pointer',
                              minWidth: '44px',
                              minHeight: '44px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              transition: 'all 0.3s ease'
                            }}
                            onMouseEnter={(e) => {
                              e.target.style.background = '#EF4444';
                              e.target.querySelector('svg').style.color = 'white';
                            }}
                            onMouseLeave={(e) => {
                              e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                              e.target.querySelector('svg').style.color = '#EF4444';
                            }}
                          >
                            <Trash2 size={20} />
                          </button>
                        </>
                      )}
                    </div>
                  </div>

                  {window.innerWidth >= 640 && (
                    <div style={{ textAlign: 'right' }}>
                      <p style={{
                        fontSize: 'clamp(20px, 4vw, 24px)',
                        fontWeight: '800',
                        color: '#FFB84D',
                        marginBottom: '12px'
                      }}>
                        ₦{((item.discountPrice || item.price) * item.quantity).toLocaleString()}
                      </p>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        style={{
                          padding: '10px',
                          background: 'rgba(239, 68, 68, 0.1)',
                          color: '#EF4444',
                          border: 'none',
                          borderRadius: '8px',
                          cursor: 'pointer',
                          minWidth: '44px',
                          minHeight: '44px',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.target.style.background = '#EF4444';
                          e.target.querySelector('svg').style.color = 'white';
                        }}
                        onMouseLeave={(e) => {
                          e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                          e.target.querySelector('svg').style.color = '#EF4444';
                        }}
                      >
                        <Trash2 size={20} />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary - Sticky on Desktop */}
          <div>
            <div className="card" style={{
              position: window.innerWidth >= 1024 ? 'sticky' : 'relative',
              top: window.innerWidth >= 1024 ? '100px' : 'auto',
              background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
              color: 'white',
              boxShadow: '0 12px 40px rgba(255,184,77,0.3)'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '800',
                marginBottom: '24px',
                fontFamily: "'Playfair Display', serif",
                display: 'flex',
                alignItems: 'center',
                gap: '10px'
              }}>
                <Sparkles size={24} />
                Order Summary
              </h3>
              
              <div style={{
                borderTop: '2px solid rgba(255,255,255,0.3)',
                paddingTop: '20px',
                marginBottom: '24px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  <span>Items ({cart.length})</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '20px',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  <span>Delivery</span>
                  <span style={{ color: '#10B981', fontWeight: '700' }}>FREE</span>
                </div>
                <div style={{
                  borderTop: '2px solid rgba(255,255,255,0.5)',
                  paddingTop: '20px',
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(24px, 5vw, 28px)',
                  fontWeight: '900'
                }}>
                  <span>Total</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                style={{
                  width: '100%',
                  padding: 'clamp(16px, 3vw, 18px)',
                  background: 'white',
                  color: '#1E40AF',
                  border: 'none',
                  borderRadius: '14px',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  fontWeight: '800',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  minHeight: '60px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                }}
                onMouseEnter={(e) => {
                  e.target.style.transform = 'translateY(-2px)';
                  e.target.style.boxShadow = '0 8px 24px rgba(0,0,0,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = 'translateY(0)';
                  e.target.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)';
                }}
              >
                Proceed to Checkout →
              </button>

              <div style={{
                marginTop: '20px',
                padding: '16px',
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                fontSize: 'clamp(13px, 2.5vw, 14px)',
                textAlign: 'center',
                backdropFilter: 'blur(10px)'
              }}>
                🚚 Free delivery on all orders • 2-4 working days
              </div>
            </div>
          </div>
        </div>

        {/* Wishlist Section */}
        {wishlist.length > 0 && (
          <div style={{ marginTop: 'clamp(60px, 10vw, 80px)', animation: 'fadeIn 1s ease' }}>
            <h2 style={{
              fontSize: 'clamp(22px, 5vw, 28px)',
              fontWeight: '800',
              marginBottom: '24px',
              color: '#1f2937',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap'
            }}>
              <Heart size={28} color="#EF4444" style={{ fill: '#EF4444' }} />
              <span>Your Wishlist</span>
            </h2>

            <div className="responsive-grid">
              {wishlist.map(item => (
                <div key={item.id} className="card">
                  <img 
                    src={item.images[0] || 'https://via.placeholder.com/280'} 
                    alt={item.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover',
                      borderRadius: '12px',
                      marginBottom: '16px',
                      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
                    }}
                  />
                  <h3 style={{
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '700',
                    marginBottom: '8px',
                    color: '#1f2937'
                  }}>
                    {item.name}
                  </h3>
                  <p style={{
                    fontSize: 'clamp(18px, 4vw, 20px)',
                    fontWeight: '800',
                    color: '#FFB84D',
                    marginBottom: '16px'
                  }}>
                    ₦{(item.discountPrice || item.price).toLocaleString()}
                  </p>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    <button
                      onClick={() => {
                        addToCart(item);
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
                      }}
                      style={{
                        flex: 1,
                        padding: '12px',
                        background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        fontSize: 'clamp(14px, 2.5vw, 15px)',
                        fontWeight: '700',
                        minHeight: '48px',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
                      onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
                    >
                      Add to Cart
                    </button>
                    <button
                      onClick={() => removeFromWishlist(item.id)}
                      style={{
                        padding: '12px',
                        background: 'rgba(239, 68, 68, 0.1)',
                        color: '#EF4444',
                        border: 'none',
                        borderRadius: '10px',
                        cursor: 'pointer',
                        minWidth: '48px',
                        minHeight: '48px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.target.style.background = '#EF4444';
                        e.target.querySelector('svg').style.color = 'white';
                      }}
                      onMouseLeave={(e) => {
                        e.target.style.background = 'rgba(239, 68, 68, 0.1)';
                        e.target.querySelector('svg').style.color = '#EF4444';
                      }}
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;