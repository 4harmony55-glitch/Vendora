# 🚀 VENDORA - Revenue Infrastructure for Campus Vendors

**Complete E-Commerce Platform for University Vendors**

Vendora helps campus vendors sell more with managed storefront, orders, and delivery coordination. Built specifically for University of Ibadan vendors.

---

## 📦 WHAT'S INCLUDED

### **Backend**
- ✅ Google Apps Script (deployed)
- ✅ Email notifications
- ✅ Subscription management
- ✅ Order processing
- ✅ Analytics tracking

### **Frontend**
- ✅ Vendor application system
- ✅ Customer shopping interface
- ✅ Priority listing (Growth/Pro vendors first)
- ✅ Shopping cart & checkout
- ✅ Mobile-responsive design

### **Business Features**
- ✅ 3-tier pricing (Starter/Growth/Pro)
- ✅ Platform fee collection (0.75%)
- ✅ Delivery coordination
- ✅ Vendor dashboard
- ✅ Admin panel (basic)

---

## 🎯 PRICING TIERS

**🟢 Starter - ₦3,000/month**
- Basic storefront
- Order management
- Standard delivery

**🔵 Growth - ₦7,000/month** (Most Popular)
- Priority listing
- Reduced delivery fees
- Sales analytics
- Faster support

**🟣 Pro - ₦15,000/month**
- Featured placement
- Promo campaigns
- Custom store URL
- Priority support

---

## 🏗️ PROJECT STRUCTURE

```
vendora/
├── public/
│   └── index.html                    # HTML template
│
├── src/
│   ├── components/
│   │   ├── Navbar.jsx                # Navigation bar
│   │   ├── Footer.jsx                # Footer component
│   │   └── ProductCard.jsx           # Product display card
│   │
│   ├── pages/
│   │   ├── Home.jsx                  # Homepage (vendor-first)
│   │   ├── VendorApply.jsx           # Vendor application
│   │   ├── Shop.jsx                  # Product browsing
│   │   ├── ProductDetails.jsx        # Product page
│   │   ├── Cart.jsx                  # Shopping cart
│   │   ├── Checkout.jsx              # Checkout flow
│   │   └── Support.jsx               # Support page
│   │
│   ├── App.jsx                       # Main app with routing
│   ├── config.js                     # Configuration
│   ├── index.jsx                     # React entry point
│   └── styles.css                    # Global styles
│
├── package.json                      # Dependencies
└── vercel.json                       # Deployment config
```

---

## 🚀 QUICK START

### **Prerequisites**
- Node.js 16+ installed
- Git installed
- Vercel account (free)

### **Installation**

1. **Clone or download this repository**

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Update API URL in src/config.js:**
   ```javascript
   export const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
   ```

4. **Run locally:**
   ```bash
   npm start
   ```
   Open http://localhost:3000

5. **Build for production:**
   ```bash
   npm run build
   ```

---

## 🌐 DEPLOYMENT

### **Deploy to Vercel (Recommended)**

1. **Push to GitHub:**
   ```bash
   git init
   git add .
   git commit -m "Initial Vendora setup"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Connect to Vercel:**
   - Go to https://vercel.com
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Done!** Your site will be live at `https://your-project.vercel.app`

---

## ⚙️ CONFIGURATION

### **src/config.js**

Update these values:

```javascript
// Your deployed Google Apps Script URL
export const API_URL = 'https://script.google.com/macros/s/.../exec';

// Contact information
export const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/2348028265637',
  email: 'vendora.ui.inc@gmail.com',
  supportEmail: 'vendora.ui.inc@gmail.com'
};
```

---

## 📊 BACKEND (Google Apps Script)

### **Setup**

1. Open Google Sheets with your Vendora data
2. Go to Extensions → Apps Script
3. Delete existing code
4. Paste `Vendora_Complete_Backend.gs` code
5. Update email in line 7:
   ```javascript
   const VENDORA_EMAIL = 'vendora.ui.inc@gmail.com';
   ```
6. Save and deploy as Web App
7. Set "Who has access" to **Anyone**
8. Copy deployment URL

### **API Endpoints**

**GET Requests:**
- `?action=getProducts` - All products
- `?action=getProductById&id=P001` - Single product
- `?action=getProductsByCategory&category=Electronics` - Category products
- `?action=getFeaturedVendors` - Growth/Pro vendors
- `?action=getAnalytics` - Dashboard metrics

**POST Requests:**
- `action: applyAsVendor` - Vendor application
- `action: createOrder` - Customer order
- `action: addProduct` - Vendor adds product
- `action: recordSubscriptionPayment` - Record payment

---

## 👥 VENDOR ONBOARDING

### **Manual Process (Recommended for First 50 Vendors)**

1. **Vendor applies** via `/vendor/apply`
2. **You approve** in Google Sheets
3. **Collect payment** (₦3k/7k/15k)
4. **Add products** to Products sheet
5. **Activate vendor** (Status = Active)

### **Automated Process**

See `VENDORA_DEPLOYMENT_GUIDE.md` for automation setup

---

## 💰 REVENUE MODEL

### **Monthly Recurring Revenue (MRR)**
- Starter vendors: ₦3,000/month each
- Growth vendors: ₦7,000/month each
- Pro vendors: ₦15,000/month each

### **Transaction Fees**
- Platform fee: 0.75% per order
- Delivery margin: 20% of delivery fee

### **Example (30 Vendors)**
```
10 Starter × ₦3,000 = ₦30,000
15 Growth × ₦7,000 = ₦105,000
5 Pro × ₦15,000 = ₦75,000
━━━━━━━━━━━━━━━━━━━━━━━━━
Total MRR: ₦210,000/month
Annual: ₦2,520,000
```

---

## 📈 GROWTH STRATEGY

### **Phase 1: Launch (Month 1)**
- Goal: 10 vendors
- Target: ₦50,000 MRR
- Focus: Quality over quantity

### **Phase 2: Expansion (Month 2-3)**
- Goal: 30 vendors
- Target: ₦200,000 MRR
- Focus: Vendor retention

### **Phase 3: Scale (Month 4-6)**
- Goal: 50+ vendors
- Target: ₦350,000+ MRR
- Focus: Automation

---

## 🔧 CUSTOMIZATION

### **Branding**
- Update colors in `src/config.js` (COLORS object)
- Replace logo in Navbar component
- Update meta tags in `public/index.html`

### **Categories**
Update in `src/config.js`:
```javascript
export const CATEGORIES = [
  'Electronics',
  'Fashion',
  'Food',
  // Add more...
];
```

### **Pricing**
Update tiers in `src/config.js`:
```javascript
export const PRICING_TIERS = {
  STARTER: { price: 3000, ... },
  // Adjust prices...
};
```

---

## 🐛 TROUBLESHOOTING

### **Products not loading**
- Check API_URL in config.js
- Verify Products sheet has Status = "Active"
- Check browser console for errors

### **Vendor application fails**
- Check Google Apps Script deployment URL
- Verify "Who has access" = Anyone
- Check execution logs in Apps Script

### **Emails not sending**
- Check Gmail daily sending limit (500/day)
- Verify email addresses in code
- Check Apps Script execution logs

---

## 📞 SUPPORT

- **Email:** vendora.ui.inc@gmail.com
- **WhatsApp:** +234 802 826 5637
- **Documentation:** See VENDORA_DEPLOYMENT_GUIDE.md

---

## 📝 LICENSE

MIT License - Free to use and modify

---

## 🎉 LAUNCH CHECKLIST

- [ ] Backend deployed and tested
- [ ] Frontend deployed to Vercel
- [ ] API URL updated in config.js
- [ ] Email configured correctly
- [ ] Test vendor application flow
- [ ] Test order creation
- [ ] Mobile responsive checked
- [ ] Vendor pitch prepared
- [ ] Pricing cards printed
- [ ] First 10 vendors identified

---

## 🚀 READY TO LAUNCH

Everything is set up and ready to go. Follow the deployment guide and start onboarding vendors on March 6!

**Let's make millions.** 💰

---

Built with ❤️ for Campus Vendors
