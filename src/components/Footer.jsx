import React from 'react';
import { Mail, MapPin, Phone, Heart, Truck, Shield } from 'lucide-react';
import { SOCIAL_LINKS } from '../config';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{
      background: 'linear-gradient(135deg, #1E40AF 0%, #6B21A8 50%, #8B5CF6 100%)',
      color: 'white',
      marginTop: 'auto',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Animated Background Pattern */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0.1,
        backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.2) 0%, transparent 50%),
                          radial-gradient(circle at 80% 80%, rgba(255,255,255,0.2) 0%, transparent 50%)`,
        pointerEvents: 'none'
      }} />

      {/* Decorative Top Wave */}
      <svg 
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '80px',
          transform: 'translateY(-99%)'
        }}
        viewBox="0 0 1200 120" 
        preserveAspectRatio="none"
      >
        <path 
          d="M0,0 C150,100 350,0 600,50 C850,100 1050,0 1200,50 L1200,120 L0,120 Z" 
          fill="url(#footerGradient)"
        />
        <defs>
          <linearGradient id="footerGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1E40AF" />
            <stop offset="50%" stopColor="#6B21A8" />
            <stop offset="100%" stopColor="#8B5CF6" />
          </linearGradient>
        </defs>
      </svg>

      <div className="container" style={{ 
        maxWidth: '1400px', 
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 1
      }}>
        
        {/* Main Footer Content */}
        <div style={{
          padding: 'clamp(50px, 8vw, 80px) 0 clamp(30px, 5vw, 40px)',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: 'clamp(40px, 6vw, 60px)'
        }}>
          
          {/* Column 1: Brand & Description */}
          <div style={{
            animation: 'fadeIn 0.6s ease'
          }}>
            <h2 style={{
              fontSize: 'clamp(36px, 6vw, 48px)',
              fontWeight: '900',
              marginBottom: '16px',
              fontFamily: "'Playfair Display', serif",
              background: 'linear-gradient(135deg, #FFF 0%, #FFB84D 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1px',
              lineHeight: '1.2'
            }}>
              Vendora
            </h2>
            <p style={{
              fontSize: 'clamp(15px, 2.5vw, 17px)',
              lineHeight: '1.7',
              opacity: 0.9,
              marginBottom: '24px',
              maxWidth: '320px'
            }}>
              Revenue infrastructure for campus vendors. We handle your storefront, orders, and delivery so you can focus on selling more.
            </p>
            
            {/* Trust Badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '12px',
              marginTop: '20px'
            }}>
              <TrustBadge icon={Truck} text="Fast Delivery" />
              <TrustBadge icon={Shield} text="Secure Payment" />
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div style={{
            animation: 'fadeIn 0.8s ease'
          }}>
            <h3 style={{
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#FFB84D',
              letterSpacing: '0.5px'
            }}>
              Quick Links
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              <FooterLink href="/">Home</FooterLink>
              <FooterLink href="/shop">Shop Products</FooterLink>
              <FooterLink href="/vendor/apply">Become a Vendor</FooterLink>
              <FooterLink href="/cart">Shopping Cart</FooterLink>
              <FooterLink href="/support">Help & Support</FooterLink>
            </div>
          </div>

          {/* Column 3: Contact Info */}
          <div style={{
            animation: 'fadeIn 1s ease'
          }}>
            <h3 style={{
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: '700',
              marginBottom: '20px',
              color: '#FFB84D',
              letterSpacing: '0.5px'
            }}>
              Get in Touch
            </h3>
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px'
            }}>
              <ContactItem 
                icon={Mail}
                text={SOCIAL_LINKS.email}
                href={`mailto:${SOCIAL_LINKS.email}`}
              />
              <ContactItem 
                icon={Phone}
                text="08028265637"
                href={SOCIAL_LINKS.whatsapp}
              />
              <ContactItem 
                icon={MapPin}
                text="University of Ibadan, Nigeria"
              />
            </div>
            
            {/* Social Media */}
            <div style={{ marginTop: '24px' }}>
              <p style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '600',
                marginBottom: '12px',
                opacity: 0.9
              }}>
                Follow Us
              </p>
              <div style={{
                display: 'flex',
                gap: '12px',
                flexWrap: 'wrap'
              }}>
                <SocialIcon
                  href={SOCIAL_LINKS.whatsapp}
                  title="WhatsApp"
                  bg="#25D366"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                </SocialIcon>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '2px solid rgba(255,255,255,0.15)',
          padding: 'clamp(24px, 4vw, 32px) 0',
          animation: 'fadeIn 1.2s ease'
        }}>
          <div style={{
            display: 'flex',
            flexDirection: window.innerWidth < 768 ? 'column' : 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            textAlign: window.innerWidth < 768 ? 'center' : 'left'
          }}>
            {/* Copyright */}
            <div>
              <p style={{
                fontSize: 'clamp(14px, 2.5vw, 16px)',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: window.innerWidth < 768 ? 'center' : 'flex-start',
                gap: '8px',
                flexWrap: 'wrap',
                marginBottom: '8px'
              }}>
                © {currentYear} Vendora
                <span style={{ opacity: 0.7, fontSize: '14px' }}>•</span>
                <span style={{ opacity: 0.9 }}>All Rights Reserved</span>
              </p>
              <p style={{
                fontSize: 'clamp(13px, 2vw, 14px)',
                opacity: 0.8,
                fontWeight: '500'
              }}>
                Made with <Heart size={14} style={{ 
                  display: 'inline',
                  verticalAlign: 'middle',
                  color: '#FFB84D',
                  animation: 'pulse 2s infinite'
                }} /> for Campus Vendors
              </p>
            </div>

            {/* Features */}
            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap',
              justifyContent: window.innerWidth < 768 ? 'center' : 'flex-end',
              fontSize: 'clamp(12px, 2vw, 13px)',
              fontWeight: '600',
              opacity: 0.9
            }}>
              <span>🚚 Fast Delivery</span>
              <span>•</span>
              <span>🔒 Secure Payments</span>
              <span>•</span>
              <span>⭐ Quality Products</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

// Trust Badge Component
const TrustBadge = ({ icon: Icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '8px 14px',
    background: 'rgba(255,255,255,0.15)',
    backdropFilter: 'blur(10px)',
    borderRadius: '20px',
    fontSize: 'clamp(12px, 2vw, 13px)',
    fontWeight: '600',
    border: '1px solid rgba(255,255,255,0.2)',
    whiteSpace: 'nowrap'
  }}>
    <Icon size={16} style={{ flexShrink: 0 }} />
    {text}
  </div>
);

// Footer Link Component
const FooterLink = ({ href, children }) => (
  <a
    href={href}
    style={{
      color: 'white',
      textDecoration: 'none',
      fontSize: 'clamp(14px, 2.5vw, 16px)',
      opacity: 0.9,
      transition: 'all 0.3s ease',
      display: 'inline-block',
      fontWeight: '500',
      position: 'relative',
      paddingLeft: '0'
    }}
    onMouseEnter={(e) => {
      e.target.style.opacity = '1';
      e.target.style.paddingLeft = '8px';
      e.target.style.color = '#FFB84D';
    }}
    onMouseLeave={(e) => {
      e.target.style.opacity = '0.9';
      e.target.style.paddingLeft = '0';
      e.target.style.color = 'white';
    }}
  >
    {children}
  </a>
);

// Contact Item Component
const ContactItem = ({ icon: Icon, text, href }) => {
  const content = (
    <div style={{
      display: 'flex',
      alignItems: 'flex-start',
      gap: '12px',
      transition: 'all 0.3s ease'
    }}>
      <div style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'rgba(255,184,77,0.2)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
        border: '2px solid rgba(255,184,77,0.3)'
      }}>
        <Icon size={20} color="#FFB84D" />
      </div>
      <div>
        <p style={{
          fontSize: 'clamp(14px, 2.5vw, 16px)',
          fontWeight: '600',
          lineHeight: '1.6',
          wordBreak: 'break-word'
        }}>
          {text}
        </p>
      </div>
    </div>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          color: 'white',
          textDecoration: 'none',
          display: 'block'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateX(4px)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateX(0)';
        }}
      >
        {content}
      </a>
    );
  }

  return content;
};

// Social Icon Component  
const SocialIcon = ({ href, title, bg, children }) => (
  <a 
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    title={title}
    style={{
      width: '44px',
      height: '44px',
      borderRadius: '12px',
      background: bg,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      cursor: 'pointer',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      border: '2px solid transparent'
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
      e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.25)';
      e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0) scale(1)';
      e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      e.currentTarget.style.borderColor = 'transparent';
    }}
  >
    {children}
  </a>
);

export default Footer;
