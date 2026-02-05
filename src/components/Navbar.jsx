import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Store } from 'lucide-react';

function Navbar({ cartCount = 0 }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/shop', label: 'Shop' },
    { path: '/vendor/apply', label: 'Become a Vendor', highlight: true },
    { path: '/support', label: 'Support' }
  ];

  return (
    <nav style={{
      background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
      color: 'white',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
    }}>
      <div className="container" style={{
        maxWidth: '1400px',
        margin: '0 auto',
        padding: 'clamp(12px, 2vw, 16px) clamp(16px, 3vw, 24px)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          
          {/* Logo */}
          <div 
            onClick={() => navigate('/')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(255,255,255,0.2)',
              backdropFilter: 'blur(10px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '2px solid rgba(255,255,255,0.3)'
            }}>
              <Store size={24} />
            </div>
            <h1 style={{
              fontSize: 'clamp(22px, 5vw, 28px)',
              fontWeight: '900',
              margin: 0,
              fontFamily: "'Playfair Display', serif",
              letterSpacing: '-0.5px'
            }}>
              Vendora
            </h1>
          </div>

          {/* Desktop Navigation */}
          <div style={{
            display: window.innerWidth < 768 ? 'none' : 'flex',
            alignItems: 'center',
            gap: 'clamp(16px, 3vw, 32px)'
          }}>
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => navigate(link.path)}
                style={{
                  background: link.highlight 
                    ? 'rgba(245, 158, 11, 0.9)' 
                    : isActive(link.path) 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'transparent',
                  color: 'white',
                  border: link.highlight ? 'none' : '2px solid transparent',
                  padding: link.highlight ? '10px 20px' : '8px 16px',
                  fontSize: 'clamp(14px, 2.5vw, 16px)',
                  fontWeight: link.highlight ? '700' : '600',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  if (link.highlight) {
                    e.target.style.background = '#F59E0B';
                    e.target.style.transform = 'scale(1.05)';
                  } else {
                    e.target.style.background = 'rgba(255,255,255,0.15)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (link.highlight) {
                    e.target.style.background = 'rgba(245, 158, 11, 0.9)';
                    e.target.style.transform = 'scale(1)';
                  } else {
                    e.target.style.background = isActive(link.path) 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'transparent';
                  }
                }}
              >
                {link.label}
              </button>
            ))}

            {/* Cart Button */}
            <button
              onClick={() => navigate('/cart')}
              style={{
                position: 'relative',
                background: isActive('/cart') ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '10px 16px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '15px',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(255,255,255,0.15)';
                e.target.style.borderColor = 'rgba(255,255,255,0.5)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = isActive('/cart') ? 'rgba(255,255,255,0.2)' : 'transparent';
                e.target.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
            >
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '-8px',
                  right: '-8px',
                  background: '#F59E0B',
                  color: 'white',
                  borderRadius: '50%',
                  width: '24px',
                  height: '24px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '700',
                  border: '2px solid #6366F1'
                }}>
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: window.innerWidth < 768 ? 'flex' : 'none',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255,255,255,0.2)',
              border: '2px solid rgba(255,255,255,0.3)',
              color: 'white',
              padding: '10px',
              borderRadius: '10px',
              cursor: 'pointer'
            }}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div style={{
            display: window.innerWidth < 768 ? 'flex' : 'none',
            flexDirection: 'column',
            gap: '12px',
            marginTop: '20px',
            paddingTop: '20px',
            borderTop: '2px solid rgba(255,255,255,0.2)',
            animation: 'slideInRight 0.3s ease'
          }}>
            {navLinks.map(link => (
              <button
                key={link.path}
                onClick={() => {
                  navigate(link.path);
                  setMobileMenuOpen(false);
                }}
                style={{
                  background: link.highlight 
                    ? '#F59E0B' 
                    : isActive(link.path) 
                      ? 'rgba(255,255,255,0.2)' 
                      : 'transparent',
                  color: 'white',
                  border: 'none',
                  padding: '14px 20px',
                  fontSize: '16px',
                  fontWeight: link.highlight ? '700' : '600',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease'
                }}
              >
                {link.label}
              </button>
            ))}

            <button
              onClick={() => {
                navigate('/cart');
                setMobileMenuOpen(false);
              }}
              style={{
                background: isActive('/cart') ? 'rgba(255,255,255,0.2)' : 'transparent',
                border: '2px solid rgba(255,255,255,0.3)',
                color: 'white',
                padding: '14px 20px',
                borderRadius: '10px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                fontSize: '16px',
                fontWeight: '600'
              }}
            >
              <ShoppingCart size={20} />
              Cart
              {cartCount > 0 && (
                <span style={{
                  background: '#F59E0B',
                  color: 'white',
                  borderRadius: '12px',
                  padding: '4px 10px',
                  fontSize: '13px',
                  fontWeight: '700'
                }}>
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
