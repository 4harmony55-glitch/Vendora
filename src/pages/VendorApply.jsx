import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Store, CheckCircle, ArrowLeft, Loader } from 'lucide-react';
import { API_URL, PRICING_TIERS, CATEGORIES } from '../config';

function VendorApply() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    businessName: '',
    ownerName: '',
    email: '',
    phone: '',
    category: '',
    selectedTier: 'Starter',
    notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [vendorId, setVendorId] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.businessName || !formData.ownerName || !formData.email || !formData.phone || !formData.category) {
      setError('Please fill in all required fields');
      return;
    }

    // Email validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // Phone validation (Nigerian number)
    if (formData.phone.length < 11) {
      setError('Please enter a valid phone number');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          action: 'applyAsVendor',
          businessName: formData.businessName,
          ownerName: formData.ownerName,
          email: formData.email,
          phone: formData.phone,
          category: formData.category,
          notes: `Interested in ${formData.selectedTier} tier. ${formData.notes}`
        })
      });

      const data = await response.json();

      if (data.success) {
        setVendorId(data.vendorId);
        setSubmitted(true);
      } else {
        setError(data.error || 'Application failed. Please try again.');
      }
    } catch (err) {
      console.error('Application error:', err);
      setError('Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #FFF8E7 0%, #FEF3C7 100%)',
        padding: '20px'
      }}>
        <div style={{
          maxWidth: '600px',
          width: '100%',
          background: 'white',
          padding: 'clamp(40px, 6vw, 60px)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)',
          textAlign: 'center'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #10B981, #059669)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 24px'
          }}>
            <CheckCircle size={48} color="white" />
          </div>

          <h1 style={{
            fontSize: 'clamp(28px, 6vw, 36px)',
            fontWeight: '900',
            color: '#1f2937',
            marginBottom: '16px',
            fontFamily: "'Playfair Display', serif"
          }}>
            Application Submitted! 🎉
          </h1>

          <p style={{
            fontSize: 'clamp(16px, 3vw, 18px)',
            color: '#6b7280',
            lineHeight: '1.6',
            marginBottom: '24px'
          }}>
            Thank you for applying to Vendora! We've received your application for <strong>{formData.businessName}</strong>.
          </p>

          <div style={{
            background: '#F3F4F6',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <p style={{
              fontSize: '14px',
              color: '#6b7280',
              marginBottom: '8px',
              fontWeight: '600'
            }}>
              Your Vendor ID:
            </p>
            <p style={{
              fontSize: '24px',
              fontWeight: '900',
              color: '#6366F1',
              margin: '0'
            }}>
              {vendorId}
            </p>
          </div>

          <div style={{
            background: '#DBEAFE',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: '#1E40AF',
              marginBottom: '12px'
            }}>
              What Happens Next?
            </h3>
            <ol style={{
              fontSize: '15px',
              color: '#1f2937',
              lineHeight: '1.8',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>Our team will review your application within <strong>24 hours</strong></li>
              <li>You'll receive an email at <strong>{formData.email}</strong> with approval status</li>
              <li>Once approved, we'll contact you at <strong>{formData.phone}</strong> to set up your account</li>
              <li>After payment, your products go live on Vendora!</li>
            </ol>
          </div>

          <div style={{
            background: '#FEF3C7',
            padding: '20px',
            borderRadius: '12px',
            marginBottom: '32px',
            textAlign: 'left'
          }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '700',
              color: '#92400E',
              marginBottom: '12px'
            }}>
              💡 What to Prepare:
            </h3>
            <ul style={{
              fontSize: '14px',
              color: '#78350F',
              lineHeight: '1.8',
              paddingLeft: '20px',
              margin: 0
            }}>
              <li>High-quality photos of your products</li>
              <li>Product prices and descriptions</li>
              <li>Payment for {formData.selectedTier} tier (₦{PRICING_TIERS[formData.selectedTier.toUpperCase()].price.toLocaleString()}/month)</li>
            </ul>
          </div>

          <button
            onClick={() => navigate('/')}
            style={{
              padding: '16px 32px',
              fontSize: '16px',
              fontWeight: '700',
              background: '#6366F1',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              cursor: 'pointer',
              width: '100%',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.target.style.background = '#4F46E5';
            }}
            onMouseLeave={(e) => {
              e.target.style.background = '#6366F1';
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FFF8E7 0%, #FEF3C7 100%)',
      padding: 'clamp(40px, 6vw, 80px) 20px'
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        
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
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            marginBottom: '32px',
            transition: 'all 0.3s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.color = '#6366F1';
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

        {/* Form Card */}
        <div style={{
          background: 'white',
          padding: 'clamp(32px, 6vw, 48px)',
          borderRadius: '24px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.1)'
        }}>
          
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              borderRadius: '20px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px'
            }}>
              <Store size={40} color="white" />
            </div>

            <h1 style={{
              fontSize: 'clamp(28px, 6vw, 36px)',
              fontWeight: '900',
              color: '#1f2937',
              marginBottom: '12px',
              fontFamily: "'Playfair Display', serif"
            }}>
              Apply to Sell on Vendora
            </h1>

            <p style={{
              fontSize: 'clamp(15px, 3vw, 17px)',
              color: '#6b7280',
              lineHeight: '1.6'
            }}>
              Join campus vendors already growing their business with Vendora
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: '#FEE2E2',
              border: '2px solid #EF4444',
              borderRadius: '12px',
              padding: '16px',
              marginBottom: '24px',
              color: '#991B1B',
              fontSize: '15px',
              fontWeight: '600'
            }}>
              ⚠️ {error}
            </div>
          )}

          {/* Application Form */}
          <form onSubmit={handleSubmit}>
            
            {/* Business Information */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB'
              }}>
                Business Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormField
                  label="Business Name *"
                  name="businessName"
                  value={formData.businessName}
                  onChange={handleChange}
                  placeholder="e.g., Chidi's Gadgets"
                  required
                />

                <FormField
                  label="Your Name *"
                  name="ownerName"
                  value={formData.ownerName}
                  onChange={handleChange}
                  placeholder="e.g., Chidi Okonkwo"
                  required
                />

                <FormField
                  label="Category *"
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  type="select"
                  options={CATEGORIES}
                  required
                />
              </div>
            </div>

            {/* Contact Information */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB'
              }}>
                Contact Information
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <FormField
                  label="Email Address *"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  required
                />

                <FormField
                  label="Phone Number *"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="08012345678"
                  required
                />
              </div>
            </div>

            {/* Pricing Tier Selection */}
            <div style={{ marginBottom: '32px' }}>
              <h3 style={{
                fontSize: '18px',
                fontWeight: '700',
                color: '#1f2937',
                marginBottom: '20px',
                paddingBottom: '12px',
                borderBottom: '2px solid #E5E7EB'
              }}>
                Choose Your Tier
              </h3>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '16px',
                marginBottom: '20px'
              }}>
                {Object.entries(PRICING_TIERS).map(([key, tier]) => (
                  <TierCard
                    key={key}
                    tier={tier}
                    selected={formData.selectedTier === tier.name}
                    onClick={() => setFormData({ ...formData, selectedTier: tier.name })}
                  />
                ))}
              </div>

              <p style={{
                fontSize: '14px',
                color: '#6b7280',
                fontStyle: 'italic',
                lineHeight: '1.6'
              }}>
                💡 Most vendors start with Starter, then upgrade to Growth when orders increase
              </p>
            </div>

            {/* Additional Notes */}
            <div style={{ marginBottom: '32px' }}>
              <label style={{
                display: 'block',
                fontSize: '15px',
                fontWeight: '600',
                color: '#1f2937',
                marginBottom: '8px'
              }}>
                Additional Notes (Optional)
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                placeholder="Tell us about your business, what you sell, etc."
                rows="4"
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  fontSize: '15px',
                  border: '2px solid #E5E7EB',
                  borderRadius: '10px',
                  resize: 'vertical',
                  fontFamily: 'inherit'
                }}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '18px',
                fontSize: '18px',
                fontWeight: '700',
                background: loading ? '#9CA3AF' : 'linear-gradient(135deg, #6366F1, #8B5CF6)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px'
              }}
              onMouseEnter={(e) => {
                if (!loading) e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                if (!loading) e.target.style.transform = 'translateY(0)';
              }}
            >
              {loading ? (
                <>
                  <Loader size={20} className="spinning" />
                  Submitting Application...
                </>
              ) : (
                <>
                  Submit Application
                  <CheckCircle size={20} />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

// Form Field Component
const FormField = ({ label, name, type = 'text', value, onChange, placeholder, required, options }) => (
  <div>
    <label style={{
      display: 'block',
      fontSize: '15px',
      fontWeight: '600',
      color: '#1f2937',
      marginBottom: '8px'
    }}>
      {label}
    </label>
    
    {type === 'select' ? (
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: '2px solid #E5E7EB',
          borderRadius: '10px',
          cursor: 'pointer'
        }}
      >
        <option value="">Select category...</option>
        {options.map(opt => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
    ) : (
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '12px 16px',
          fontSize: '15px',
          border: '2px solid #E5E7EB',
          borderRadius: '10px'
        }}
      />
    )}
  </div>
);

// Tier Card Component
const TierCard = ({ tier, selected, onClick }) => (
  <div
    onClick={onClick}
    style={{
      padding: '20px',
      border: selected ? '3px solid #6366F1' : '2px solid #E5E7EB',
      borderRadius: '12px',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      background: selected ? '#EEF2FF' : 'white',
      position: 'relative'
    }}
  >
    {tier.badge && (
      <div style={{
        position: 'absolute',
        top: '-12px',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#F59E0B',
        color: 'white',
        padding: '4px 12px',
        borderRadius: '6px',
        fontSize: '11px',
        fontWeight: '700',
        whiteSpace: 'nowrap'
      }}>
        {tier.badge}
      </div>
    )}

    <h4 style={{
      fontSize: '18px',
      fontWeight: '700',
      color: '#1f2937',
      marginBottom: '8px'
    }}>
      {tier.name}
    </h4>
    <p style={{
      fontSize: '24px',
      fontWeight: '900',
      color: '#6366F1',
      marginBottom: '8px'
    }}>
      ₦{tier.price.toLocaleString()}
      <span style={{ fontSize: '14px', fontWeight: '600', color: '#6b7280' }}>/month</span>
    </p>
    <p style={{
      fontSize: '13px',
      color: '#6b7280',
      margin: 0
    }}>
      {tier.description}
    </p>
  </div>
);

export default VendorApply;
