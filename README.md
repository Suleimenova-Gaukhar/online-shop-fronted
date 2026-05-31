# MagazinOnline — Frontend

This is the frontend for the **MagazinOnline** project, built as part of our Software Engineering course. The backend was developed separately by our teammates Denisa and Nicoleta — you can find it here: [online-shop-backend](https://github.com/denisanemeth/online-shop-backend).

## Team

Gaukhar | Frontend Developer — HTML + CSS + JAVASCRIPT
Daria | Frontend Developer — HTML + CSS + JAVASCRIPT
Denisa | Backend Developer — Spring Boot, REST API, database
Nicoleta | Backend Developer — Spring Boot, REST API, database 

## How We Split the Work

We started by designing the website layout together on Miro, mapping out all the pages, 
functionalities and how the backend endpoints would connect to each part of the UI. 
Once we had a clear picture of the full system, we divided the frontend into two sides 
so we could work in parallel after the shared foundation was ready.

### Shared Foundation
- `js/api.js` — all backend API calls in one place
- `js/auth.js` — login state management across all pages
- `js/navbar.js` — dynamic navbar that adapts to user role
- `css/style.css` — shared design system with our color palette

### Gaukhar's tasks:
Responsible for the shared foundation js files and pages such as:
• `shop.html` - Product listing with real-time search filter 
• `product-detail.html` - 4-state negotiation system (no offer / pending / rejected / approved) 
• `seller-dashboard.html` - Seller manages products and incoming offers 
• `login.html` - Login with role-based redirect 

### Daria's tasks:
Responsible for the pages such as:
• `index.html` - Homepage with hero, category cards, seller CTA 
• `register.html` - Registration for buyers and sellers 
• `admin-dashboard.html` - Admin approves/deactivates sellers 
• `my-account-buyer.html` - Buyer personal info and order history 
• `my-account-seller.html` - Seller business info and sales history 

## Tech Stack

- **HTML5** — page structure
- **CSS3** — custom design system with CSS variables
- **Vanilla JavaScript** — no frameworks, just clean JS with fetch API
- **Backend** — Spring Boot REST API running on `http://localhost:8080`

## Color Palette

| White | `#FFFFFF` | Page backgrounds, cards, forms |
| Blue-grey | `#5C6784` | Buttons, badges, interactive elements |
| Deep navy | `#1D263B` | Navbar, footer, headings |

-----------------------------------------------------------------

## How to Run

### 1. Start the backend first
Clone and run the backend project in IntelliJ IDEA:
```
https://github.com/denisanemeth/online-shop-backend
```
The backend must be running on `http://localhost:8080` before opening any frontend page.

### 2. Open the frontend
Open `index.html` in your browser using the Live Server extension in VS Code, or simply double-click the file.

### 3. Default admin credentials
The admin account is hardcoded in the backend:
- **Email:** `admin@email.com`
- **Password:** `admin`

---

## Pages Overview

| Page | Access | Description |
|------|--------|-------------|
| `index.html` | Everyone | Homepage with category showcase |
| `shop.html` | Everyone | Browse all products with search |
| `product-detail.html` | Buyers only | View product and buy or negotiate |
| `login.html` | Logged out | Login for all user types |
| `register.html` | Logged out | Register as buyer or seller |
| `seller-dashboard.html` | Sellers only | Manage products and offers |
| `admin-dashboard.html` | Admin only | Approve and manage sellers |
| `my-account-buyer.html` | Buyers only | Personal info and order history |
| `my-account-seller.html` | Sellers only | Business info and sales history |

---

## API Endpoints Used

All backend calls are centralised in `js/api.js`. Here's a summary:

### Auth
| Method | Endpoint | Used for |
|--------|----------|---------|
| POST | `/auth/registerBuyer` | Register a buyer |
| POST | `/auth/registerSeller` | Register a seller |
| POST | `/auth/login` | Login for all users |

### Products
| Method | Endpoint | Used for |
|--------|----------|---------|
| GET | `/products` | Load all products |
| POST | `/products` | Seller adds a product |
| DELETE | `/products/{id}` | Seller deletes a product |

### Offers
| Method | Endpoint | Used for |
|--------|----------|---------|
| POST | `/offers` | Buyer submits a price offer |
| PUT | `/offers/{id}/approve` | Seller approves an offer |
| PUT | `/offers/{id}/reject` | Seller rejects an offer |
| GET | `/offers?sellerEmail=` | Seller sees their pending offers |
| GET | `/offers/{productId}/buyer?buyerEmail=` | Check buyer's offer status |

### Purchase
| Method | Endpoint | Used for |
|--------|----------|---------|
| POST | `/purchase/{productId}` | Buyer completes a purchase |
| GET | `/history` | Load sale history |

### Admin
| Method | Endpoint | Used for |
|--------|----------|---------|
| GET | `/admin/sellers` | Load all sellers |
| PUT | `/admin/approveSeller/{id}` | Approve a seller |
| PUT | `/admin/deactivateSeller/{id}` | Deactivate a seller |

---

## Key Design Decisions

**No shopping cart** — the backend processes one purchase at a time, so each product is bought individually. This was a deliberate backend design choice that aligns with the negotiation system.

**Negotiable products require an offer** — if a product is listed as negotiable, the buyer cannot purchase it at the fixed price directly. They must submit an offer, wait for the seller to approve it, and only then can they complete the purchase at the negotiated price. This is enforced by the backend and matches the project requirements.

**No product images** — the backend Product model has no image field, so we kept the cards clean and text-based instead of using placeholder images.

**Sellers cannot buy** — sellers are blocked from viewing product detail pages and purchasing items, since the system is designed for them to sell, not shop.

**Minimum price is hidden** — when a buyer makes an offer below the minimum price, the backend rejects it automatically without revealing the actual minimum. The buyer only sees a generic "offer too low" message, which matches the project requirements.

**Role-based navigation** — the navbar adapts automatically based on who is logged in, using the role stored in localStorage after login.

---

## Project Structure

```
online-shop-frontend/
├── css/
│   └── style.css              # Shared design system
├── images/
│   ├── electronics.svg        # Category card image
│   ├── furniture.svg          # Category card image
│   └── sport.svg              # Category card image
├── js/
│   ├── api.js                 # All backend API calls
│   ├── auth.js                # Login state management
│   └── navbar.js              # Dynamic navbar builder
├── index.html                 # Homepage
├── login.html                 # Login page
├── register.html              # Registration page
├── shop.html                  # Product listing
├── product-detail.html        # Product detail + buy/negotiate
├── seller-dashboard.html      # Seller management panel
├── admin-dashboard.html       # Admin management panel
├── my-account-buyer.html      # Buyer account page
└── my-account-seller.html     # Seller account page
```
