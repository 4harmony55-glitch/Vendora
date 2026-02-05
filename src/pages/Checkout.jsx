import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, MapPin, User, Gift } from 'lucide-react';
import { API_URL, HALLS, COD_MAX_AMOUNT, PAYMENT_METHODS } from '../config';

function Checkout({ cart, clearCart, user }) {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [useReferralBalance, setUseReferralBalance] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    locationType: '',
    address: '',
    roomNo: '',
    paymentMethod: ''
  });

  const total = cart.reduce((sum, item) => {
    const price = item.discountPrice || item.price;
    return sum + (price * item.quantity);
  }, 0);

  // Calculate referral discount
  const canUseReferral = user && user.referralBalance > 0 && total >= 10000;
  const referralDiscount = canUseReferral && useReferralBalance 
    ? Math.min(user.referralBalance, total) 
    : 0;
  const finalTotal = total - referralDiscount;

  // Auto-fill form if user is logged in
  useEffect(() => {
    if (user) {
      const isKnownHall = HALLS.includes(user.hall) && user.hall !== 'Outside School (Off-Campus)';

      setFormData(prev => ({
        ...prev,
        name: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        locationType: isKnownHall ? user.hall : (user.hall ? 'Outside School (Off-Campus)' : ''),
        address: isKnownHall ? '' : (user.hall || '')
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.name || !formData.email || !formData.phone || !formData.locationType || !formData.paymentMethod) {
      alert('Please fill all required fields');
      return;
    }

    if (formData.locationType === 'Outside School (Off-Campus)' && !formData.address) {
      alert('Please enter your address');
      return;
    }

    if (formData.locationType !== 'Outside School (Off-Campus)' && !formData.roomNo) {
      alert('Please enter your room number');
      return;
    }

    // Check COD limit
    if (formData.paymentMethod === 'COD' && finalTotal > COD_MAX_AMOUNT) {
      alert(`Cash on Delivery is only available for orders up to ₦${COD_MAX_AMOUNT.toLocaleString()}`);
      return;
    }

    // If Transfer, redirect to payment page
    if (formData.paymentMethod === 'Transfer') {
      sessionStorage.setItem('checkoutData', JSON.stringify({
        ...formData,
        cart,
        total: finalTotal,
        originalTotal: total,
        referralDiscount: referralDiscount,
        userId: user?.userId || null
      }));
      navigate('/payment');
      return;
    }

    // Process COD order
    setLoading(true);
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 45000); // Increased to 45 seconds

    try {
      const orderData = {
        action: 'createOrder',
        vendorId: cart[0]?.vendorId || 'N/A',
        customerName: String(formData.name || '').trim(),
        customerEmail: String(formData.email || '').trim(),
        customerPhone: String(formData.phone || '').trim(),
        locationType: formData.locationType,
        location: formData.locationType === 'Outside School (Off-Campus)' ? formData.address : formData.locationType,
        roomNo: formData.roomNo || 'N/A',
        items: cart.map(item => `${item.name} (x${item.quantity})`).join(', '),
        subtotal: finalTotal,
        deliveryFee: 0,
        paymentMethod: PAYMENT_METHODS.COD,
        paymentStatus: 'Pending',
        referralDiscount: referralDiscount,
        userId: user?.userId || ''
      };

      console.log('📤 Sending COD order:', orderData);
      console.log('📍 API URL:', API_URL);

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(orderData),
        signal: controller.signal,
        mode: 'cors'
      });

      clearTimeout(timeoutId);
      
      console.log('📥 Response status:', response.status);
      console.log('📥 Response ok:', response.ok);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('❌ Response error:', errorText);
        throw new Error(`Server error (${response.status}): ${errorText}`);
      }

      const result = await response.json();
      console.log('📥 Response data:', result);
      
      if (result.success) {
        // Check email status
        const emailStatus = result.emailStatus;
        let emailWarning = '';
        
        if (emailStatus && (!emailStatus.customerEmailSent || !emailStatus.adminEmailSent)) {
          emailWarning = '\n\n⚠️ Note: Order saved but email notifications may have failed. We\'ll contact you via phone.';
          console.warn('Email status:', emailStatus);
        }

        clearCart();
        const discountMsg = referralDiscount > 0
          ? `\n\n🎁 Referral Discount Applied: -₦${referralDiscount.toLocaleString()}`
          : '';

        alert(`✅ Order Confirmed!\n\nOrder ID: ${result.orderId}\nTotal: ₦${finalTotal.toLocaleString()}${discountMsg}\n\nYou will be contacted at: ${formData.phone}\nDelivery: 2-4 working days${emailWarning}\n\nThank you for shopping with DropCart! 🛍️`);
        navigate('/');
      } else {
        throw new Error(result.error || 'Server failed to process order');
      }
      
    } catch (error) {
      clearTimeout(timeoutId);
      console.error('❌ Order error:', error);
      console.error('Error name:', error.name);
      console.error('Error message:', error.message);

      if (error.name === 'AbortError') {
        alert('⏱️ Request Timeout!\n\nThe server took too long to respond.\n\nYour order might have been placed. Please:\n1. Check your phone for confirmation call\n2. Wait 5 minutes for email\n3. If no contact, try again\n\nContact us: 08028265637');
      } else if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        alert('🌐 Connection Error!\n\nCannot reach the server. Please check:\n1. Your internet connection\n2. The API URL is correct\n\nCurrent API: ' + API_URL + '\n\nContact support: 08028265637');
      } else {
        alert(`⚠️ Order Failed\n\nError: ${error.message}\n\nPlease try again or contact support:\nWhatsApp: 08028265637\nEmail: support@dropcart.com`);
      }
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div style={{ minHeight: '80vh', background: '#FFF8E7', padding: 'clamp(40px, 6vw, 60px) clamp(16px, 3vw, 24px)' }}>
      <div className="container" style={{ maxWidth: '1200px' }}>
        <h1 style={{
          fontSize: 'clamp(32px, 7vw, 48px)',
          fontWeight: '800',
          marginBottom: '16px',
          background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontFamily: "'Playfair Display', serif",
          animation: 'fadeIn 0.6s ease'
        }}>
          Checkout
        </h1>
        <p style={{ fontSize: 'clamp(15px, 3vw, 18px)', color: '#6b7280', marginBottom: 'clamp(32px, 6vw, 48px)' }}>
          Complete your order details
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: window.innerWidth < 1024 ? '1fr' : '1.5fr 1fr',
          gap: 'clamp(32px, 6vw, 40px)',
          animation: 'fadeIn 0.8s ease'
        }}>
          {/* Checkout Form */}
          <form onSubmit={handleSubmit}>
            <div className="card" style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '24px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <User size={24} />
                Personal Information
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="Enter your full name"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="your.email@example.com"
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                  placeholder="08012345678"
                />
              </div>
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '24px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <MapPin size={24} />
                Delivery Information
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Location Type *</label>
                <select
                  name="locationType"
                  value={formData.locationType}
                  onChange={handleChange}
                  required
                  style={inputStyle}
                >
                  <option value="">Select your location</option>
                  {HALLS.map(hall => (
                    <option key={hall} value={hall}>{hall}</option>
                  ))}
                </select>
              </div>

              {formData.locationType === 'Outside School (Off-Campus)' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Full Address *</label>
                  <textarea
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    style={{ ...inputStyle, minHeight: '100px', resize: 'vertical' }}
                    placeholder="Enter your complete delivery address"
                  />
                </div>
              )}

              {formData.locationType && formData.locationType !== 'Outside School (Off-Campus)' && (
                <div style={{ marginBottom: '20px' }}>
                  <label style={labelStyle}>Room Number *</label>
                  <input
                    type="text"
                    name="roomNo"
                    value={formData.roomNo}
                    onChange={handleChange}
                    required
                    style={inputStyle}
                    placeholder="e.g., A101"
                  />
                </div>
              )}
            </div>

            <div className="card" style={{ marginBottom: '24px' }}>
              <h2 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '24px',
                color: '#1f2937',
                display: 'flex',
                alignItems: 'center',
                gap: '12px'
              }}>
                <CreditCard size={24} />
                Payment Method
              </h2>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  ...paymentOptionStyle,
                  border: formData.paymentMethod === 'COD' ? '3px solid #FFB84D' : '2px solid #e5e7eb',
                  background: formData.paymentMethod === 'COD' ? 'rgba(255,184,77,0.1)' : 'white'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="COD"
                    checked={formData.paymentMethod === 'COD'}
                    onChange={handleChange}
                    style={{ marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '600', color: '#1f2937' }}>
                      Cash on Delivery (COD)
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                      Pay when you receive (Max: ₦{COD_MAX_AMOUNT.toLocaleString()})
                    </div>
                  </div>
                </label>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  ...paymentOptionStyle,
                  border: formData.paymentMethod === 'Transfer' ? '3px solid #1E40AF' : '2px solid #e5e7eb',
                  background: formData.paymentMethod === 'Transfer' ? 'rgba(30,64,175,0.1)' : 'white'
                }}>
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="Transfer"
                    checked={formData.paymentMethod === 'Transfer'}
                    onChange={handleChange}
                    style={{ marginRight: '12px' }}
                  />
                  <div>
                    <div style={{ fontSize: 'clamp(16px, 3vw, 18px)', fontWeight: '600', color: '#1f2937' }}>
                      Bank Transfer (OPay)
                    </div>
                    <div style={{ fontSize: '14px', color: '#6b7280', marginTop: '4px' }}>
                      Pay securely with bank transfer
                    </div>
                  </div>
                </label>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn"
              style={{
                width: '100%',
                marginTop: '32px',
                padding: 'clamp(16px, 3vw, 18px)',
                fontSize: 'clamp(16px, 3vw, 18px)',
                fontWeight: '700',
                background: formData.paymentMethod === 'Transfer' 
                  ? 'linear-gradient(135deg, #1E40AF, #6B21A8)'
                  : 'linear-gradient(135deg, #FFB84D, #1E40AF)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.7 : 1,
                minHeight: '56px'
              }}
            >
              {loading ? '⏳ Processing Order...' : formData.paymentMethod === 'Transfer' ? 'Proceed to Payment' : 'Confirm COD Order'}
            </button>
          </form>

          {/* Order Summary */}
          <div>
            <div className="card" style={{
              position: window.innerWidth >= 1024 ? 'sticky' : 'relative',
              top: window.innerWidth >= 1024 ? '100px' : 'auto',
              background: 'linear-gradient(135deg, #FFB84D, #1E40AF)',
              color: 'white'
            }}>
              <h3 style={{
                fontSize: 'clamp(20px, 4vw, 24px)',
                fontWeight: '700',
                marginBottom: '24px',
                fontFamily: "'Playfair Display', serif"
              }}>
                Order Summary
              </h3>

              <div style={{ marginBottom: '24px' }}>
                {cart.map(item => (
                  <div key={item.id} style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: 'clamp(14px, 2.5vw, 16px)',
                    paddingBottom: '12px',
                    borderBottom: '1px solid rgba(255,255,255,0.2)'
                  }}>
                    <span>{item.name} x{item.quantity}</span>
                    <span>₦{((item.discountPrice || item.price) * item.quantity).toLocaleString()}</span>
                  </div>
                ))}
              </div>

              {/* Referral Balance Option */}
              {canUseReferral && (
                <div style={{
                  background: 'rgba(255,255,255,0.2)',
                  padding: '16px',
                  borderRadius: '12px',
                  marginBottom: '16px'
                }}>
                  <label style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    fontSize: 'clamp(14px, 2.5vw, 16px)'
                  }}>
                    <input
                      type="checkbox"
                      checked={useReferralBalance}
                      onChange={(e) => setUseReferralBalance(e.target.checked)}
                      style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                    />
                    <div>
                      <div style={{ fontWeight: '700', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Gift size={18} />
                        Use Referral Balance
                      </div>
                      <div style={{ fontSize: '13px', opacity: 0.9, marginTop: '4px' }}>
                        Available: ₦{user.referralBalance.toLocaleString()}
                      </div>
                    </div>
                  </label>
                </div>
              )}

              <div style={{
                borderTop: '2px solid rgba(255,255,255,0.5)',
                paddingTop: '16px',
                marginBottom: '16px'
              }}>
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  marginBottom: '12px',
                  fontSize: 'clamp(16px, 3vw, 18px)'
                }}>
                  <span>Subtotal</span>
                  <span>₦{total.toLocaleString()}</span>
                </div>
                
                {referralDiscount > 0 && (
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '12px',
                    fontSize: 'clamp(16px, 3vw, 18px)',
                    color: '#10B981'
                  }}>
                    <span>🎁 Referral Discount</span>
                    <span>-₦{referralDiscount.toLocaleString()}</span>
                  </div>
                )}

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(16px, 3vw, 18px)',
                  marginBottom: '16px'
                }}>
                  <span>Delivery</span>
                  <span>FREE</span>
                </div>

                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  fontSize: 'clamp(24px, 5vw, 28px)',
                  fontWeight: '800',
                  paddingTop: '16px',
                  borderTop: '2px solid rgba(255,255,255,0.5)'
                }}>
                  <span>Total</span>
                  <span>₦{finalTotal.toLocaleString()}</span>
                </div>

                {referralDiscount > 0 && (
                  <div style={{
                    fontSize: '13px',
                    opacity: 0.9,
                    marginTop: '8px',
                    textAlign: 'center'
                  }}>
                    You saved ₦{referralDiscount.toLocaleString()}!
                  </div>
                )}
              </div>

              <div style={{
                background: 'rgba(255,255,255,0.2)',
                padding: '16px',
                borderRadius: '8px',
                fontSize: '14px',
                lineHeight: '1.6'
              }}>
                🚚 Delivery within 2-4 working days
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const labelStyle = {
  display: 'block',
  fontSize: 'clamp(14px, 2.5vw, 16px)',
  fontWeight: '600',
  color: '#1f2937',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: 'clamp(12px, 2.5vw, 14px)',
  fontSize: 'clamp(15px, 3vw, 16px)',
  border: '2px solid #e5e7eb',
  borderRadius: '8px',
  fontFamily: "'Merriweather', serif",
  transition: 'all 0.3s ease',
  minHeight: '48px'
};

const paymentOptionStyle = {
  display: 'flex',
  alignItems: 'center',
  padding: 'clamp(16px, 3vw, 20px)',
  borderRadius: '12px',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

export default Checkout;
