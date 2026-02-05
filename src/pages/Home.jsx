import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { TrendingUp, Zap, Shield, BarChart3, Store, ArrowRight, CheckCircle } from 'lucide-react';
import ProductCard from '../components/ProductCard';
import { API_URL, PRICING_TIERS, APP_INFO } from '../config';

function Home({ addToCart, addToWishlist }) {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [featuredVendors, setFeaturedVendors] = useState([]);
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch products
      const productsRes = await fetch(`${API_URL}?action=getProducts`);
      const productsData = await productsRes.json();
      if (productsData.success) {
        setProducts(productsData.products.slice(0, 8)); // Show first 8
      }

      // Fetch featured vendors
      const vendorsRes = await fetch(`${API_URL}?action=getFeaturedVendors`);
      const vendorsData = await vendorsRes.json();
      if (vendorsData.success) {
        setFeaturedVendors(vendorsData.vendors);
      }

      // Fetch analytics for social proof
      const analyticsRes = await fetch(`${API_URL}?action=getAnalytics`);
      const analyticsData = await analyticsRes.json();
      if (analyticsData.success) {
        setAnalytics(analyticsData.analytics);
      }

      setLoading(false);
    } catch (error) {
      console.error('Error fetching data:', error);
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#FFF8E7' }}>
      
      {/* Hero Section - Vendor-First */}
      <section style={{
        background: 'linear-gradient(135deg, #6366F1 0%, #8B5CF6 100%)',
        color: 'white',
        padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Animated Background */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          backgroundImage: `radial-gradient(circle at 20% 50%, rgba(255,255,255,0.3) 0%, transparent 50%)`,
        }} />

        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.2fr 1fr',
            gap: 'clamp(40px, 6vw, 60px)',
            alignItems: 'center'
          }}>
            
            {/* Left: Value Proposition */}
            <div style={{ animation: 'fadeIn 0.8s ease' }}>
              <h1 style={{
                fontSize: 'clamp(36px, 8vw, 64px)',
                fontWeight: '900',
                lineHeight: '1.1',
                marginBottom: '24px',
                fontFamily: "'Playfair Display', serif"
              }}>
                Turn Your Campus Hustle Into
                <span style={{ 
                  display: 'block',
                  background: 'linear-gradient(135deg, #F59E0B, #FBBF24)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  marginTop: '8px'
                }}>
                  Real Revenue
                </span>
              </h1>

              <p style={{
                fontSize: 'clamp(18px, 3vw, 24px)',
                lineHeight: '1.6',
                marginBottom: '32px',
                opacity: 0.95,
                maxWidth: '600px'
              }}>
                {APP_INFO.description}
              </p>

              <div style={{
                display: 'flex',
                gap: '16px',
                flexWrap: 'wrap',
                marginBottom: '40px'
              }}>
                <button
                  onClick={() => navigate('/vendor/apply')}
                  style={{
                    padding: '16px 32px',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '700',
                    background: '#F59E0B',
                    color: 'white',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    transition: 'all 0.3s ease',
                    minHeight: '56px'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'translateY(-2px)';
                    e.target.style.boxShadow = '0 8px 24px rgba(245, 158, 11, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'translateY(0)';
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Start Selling Today
                  <ArrowRight size={20} />
                </button>

                <button
                  onClick={() => navigate('/pricing')}
                  style={{
                    padding: '16px 32px',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    fontWeight: '700',
                    background: 'rgba(255,255,255,0.2)',
                    color: 'white',
                    border: '2px solid white',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    minHeight: '56px',
                    backdropFilter: 'blur(10px)'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'white';
                    e.target.style.color = '#6366F1';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'rgba(255,255,255,0.2)';
                    e.target.style.color = 'white';
                  }}
                >
                  View Pricing
                </button>
              </div>

              {/* Social Proof */}
              {analytics && (
                <div style={{
                  display: 'flex',
                  gap: '32px',
                  flexWrap: 'wrap'
                }}>
                  <StatBadge number={analytics.activeVendors} label="Active Vendors" />
                  <StatBadge number={analytics.totalOrders} label="Orders Delivered" />
                  <StatBadge number={`₦${Math.round(analytics.totalRevenue / 1000000)}M+`} label="Vendor Revenue" />
                </div>
              )}
            </div>

            {/* Right: Trust Indicators */}
            <div style={{
              background: 'rgba(255,255,255,0.1)',
              backdropFilter: 'blur(20px)',
              padding: 'clamp(32px, 5vw, 48px)',
              borderRadius: '24px',
              border: '2px solid rgba(255,255,255,0.2)',
              animation: 'fadeIn 1s ease'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '24px'
              }}>
                Why Vendors Choose Vendora
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <BenefitItem icon={TrendingUp} text="Priority listing gets you 3-5x more orders" />
                <BenefitItem icon={Zap} text="We handle delivery coordination completely" />
                <BenefitItem icon={Shield} text="Professional storefront builds trust" />
                <BenefitItem icon={BarChart3} text="Track sales and grow strategically" />
              </div>

              <div style={{
                marginTop: '32px',
                padding: '16px',
                background: 'rgba(245, 158, 11, 0.2)',
                borderRadius: '12px',
                border: '2px solid rgba(245, 158, 11, 0.3)'
              }}>
                <p style={{ fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
                  💡 <strong>Smart vendors start with Starter (₦3k/mo), then upgrade to Growth (₦7k/mo) when orders increase.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)',
        background: 'white'
      }}>
        <div className="container" style={{ maxWidth: '1400px', margin: '0 auto' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'clamp(32px, 6vw, 48px)',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <div>
              <h2 style={{
                fontSize: 'clamp(28px, 6vw, 42px)',
                fontWeight: '800',
                color: '#1f2937',
                fontFamily: "'Playfair Display', serif",
                marginBottom: '8px'
              }}>
                Featured Products
              </h2>
              <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', color: '#6b7280' }}>
                From our Growth & Pro vendors
              </p>
            </div>

            <button
              onClick={() => navigate('/shop')}
              style={{
                padding: '12px 24px',
                fontSize: '16px',
                fontWeight: '600',
                background: 'transparent',
                color: '#6366F1',
                border: '2px solid #6366F1',
                borderRadius: '10px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.target.style.background = '#6366F1';
                e.target.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.color = '#6366F1';
              }}
            >
              View All Products →
            </button>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div className="spinner" />
            </div>
          ) : (
            <div className="responsive-grid">
              {products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  addToCart={addToCart}
                  addToWishlist={addToWishlist}
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* How It Works Section */}
      <section style={{
        padding: 'clamp(60px, 10vw, 100px) clamp(20px, 4vw, 40px)',
        background: 'linear-gradient(180deg, #FFF8E7 0%, #FEF3C7 100%)'
      }}>
        <div className="container" style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 6vw, 42px)',
            fontWeight: '800',
            color: '#1f2937',
            fontFamily: "'Playfair Display', serif",
            textAlign: 'center',
            marginBottom: 'clamp(48px, 8vw, 64px)'
          }}>
            From WhatsApp Chaos to Vendora Control
          </h2>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            <StepCard
              number="1"
              title="Apply & Get Approved"
              description="Fill out the vendor form. We review and approve within 24 hours."
            />
            <StepCard
              number="2"
              title="Add Your Products"
              description="We help you set up your storefront with photos and pricing."
            />
            <StepCard
              number="3"
              title="Receive Orders"
              description="Customers order directly. We notify you immediately."
            />
            <StepCard
              number="4"
              title="We Handle Delivery"
              description="Our riders pick up and deliver. You just prepare the product."
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        padding: 'clamp(80px, 12vw, 120px) clamp(20px, 4vw, 40px)',
        background: 'linear-gradient(135deg, #1E40AF 0%, #6366F1 100%)',
        color: 'white',
        textAlign: 'center'
      }}>
        <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 7vw, 48px)',
            fontWeight: '900',
            marginBottom: '24px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Ready to Grow Your Business?
          </h2>
          <p style={{
            fontSize: 'clamp(16px, 3vw, 20px)',
            marginBottom: '40px',
            opacity: 0.95,
            lineHeight: '1.6'
          }}>
            Join {analytics?.activeVendors || 'campus'} vendors already selling more with Vendora
          </p>

          <button
            onClick={() => navigate('/vendor/apply')}
            style={{
              padding: '20px 48px',
              fontSize: 'clamp(18px, 3vw, 22px)',
              fontWeight: '700',
              background: '#F59E0B',
              color: 'white',
              border: 'none',
              borderRadius: '14px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              minHeight: '64px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'scale(1.05)';
              e.target.style.boxShadow = '0 12px 40px rgba(245, 158, 11, 0.5)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'scale(1)';
              e.target.style.boxShadow = 'none';
            }}
          >
            Start Selling Today →
          </button>
        </div>
      </section>

    </div>
  );
}

// Helper Components
const StatBadge = ({ number, label }) => (
  <div>
    <div style={{
      fontSize: 'clamp(24px, 5vw, 32px)',
      fontWeight: '900',
      marginBottom: '4px'
    }}>
      {number}+
    </div>
    <div style={{
      fontSize: 'clamp(13px, 2.5vw, 15px)',
      opacity: 0.9,
      fontWeight: '600'
    }}>
      {label}
    </div>
  </div>
);

const BenefitItem = ({ icon: Icon, text }) => (
  <div style={{
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px'
  }}>
    <div style={{
      width: '40px',
      height: '40px',
      borderRadius: '10px',
      background: 'rgba(245, 158, 11, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0
    }}>
      <Icon size={20} color="#F59E0B" />
    </div>
    <p style={{
      fontSize: 'clamp(15px, 3vw, 17px)',
      lineHeight: '1.5',
      margin: 0
    }}>
      {text}
    </p>
  </div>
);

const StepCard = ({ number, title, description }) => (
  <div style={{
    background: 'white',
    padding: 'clamp(32px, 5vw, 40px)',
    borderRadius: '20px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    transition: 'all 0.3s ease',
    cursor: 'default'
  }}
    onMouseEnter={(e) => {
      e.currentTarget.style.transform = 'translateY(-8px)';
      e.currentTarget.style.boxShadow = '0 12px 32px rgba(0,0,0,0.12)';
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
    }}
  >
    <div style={{
      width: '56px',
      height: '56px',
      borderRadius: '14px',
      background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
      color: 'white',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '24px',
      fontWeight: '900',
      marginBottom: '20px'
    }}>
      {number}
    </div>
    <h3 style={{
      fontSize: 'clamp(18px, 3vw, 22px)',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '12px'
    }}>
      {title}
    </h3>
    <p style={{
      fontSize: 'clamp(14px, 2.5vw, 16px)',
      color: '#6b7280',
      lineHeight: '1.6',
      margin: 0
    }}>
      {description}
    </p>
  </div>
);

export default Home;
