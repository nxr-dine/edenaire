# 🛍️ Endenaire - Full-Stack E-commerce Platform

A modern, full-stack e-commerce application built with Next.js, TypeScript, and PostgreSQL. Features a complete authentication system, admin dashboard, comprehensive e-commerce functionality, and production-ready API implementations.

## 🚀 Live Demo

**Repository**: https://github.com/nxr-deen/edenaire-.git

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Backend**: Next.js API Routes, Prisma ORM
- **Database**: PostgreSQL
- **Authentication**: NextAuth.js (Credentials + Google OAuth)
- **Data Fetching**: SWR
- **State Management**: React Context, SWR
- **Payment Processing**: Stripe
- **Package Manager**: pnpm

## 📋 Project Status

### ✅ **Completed Features**

#### 🔐 Authentication System
- [x] User registration with automatic login
- [x] User login with credentials
- [x] Google OAuth integration
- [x] Session management with JWT
- [x] Protected routes and API endpoints
- [x] Password hashing with bcryptjs
- [x] Logout functionality
- [x] Password change functionality
- [x] Account deletion with confirmation

#### 🛒 E-commerce Core Features
- [x] Product catalog with dynamic data fetching
- [x] Product detail pages
- [x] Shopping cart functionality with real-time updates
- [x] Dynamic cart count in header
- [x] Wishlist management
- [x] Checkout process with Stripe integration
- [x] Order management
- [x] Category-based navigation
- [x] Product search and filtering
- [x] Price range filtering
- [x] Category filtering

#### 💳 Payment Integration
- [x] Stripe payment processing
- [x] Payment intent creation
- [x] Webhook handling
- [x] Payment method management
- [x] Order creation from cart
- [x] Payment status tracking

#### 👤 User Account Management
- [x] User profile management
- [x] Order history and tracking
- [x] Wishlist management
- [x] Settings with notification preferences
- [x] Security actions (password change, account deletion)
- [x] Subscription management (subscribe, upgrade, cancel)
- [x] Contact form with backend logic

#### 🎛️ Admin Dashboard
- [x] Product management (CRUD operations)
- [x] Order tracking and management
- [x] User analytics and insights
- [x] Sales reporting and charts
- [x] Inventory management
- [x] Category management
- [x] Bulk operations support

#### 🎨 UI/UX Features
- [x] Modern, responsive design
- [x] Mobile-first approach
- [x] Hero sections with background images
- [x] Global background image system
- [x] Toast notifications
- [x] Loading states and error handling
- [x] Client-side data fetching with SWR
- [x] Hydration-safe components
- [x] Browser extension compatibility

#### 🔧 Technical Implementation
- [x] Next.js 14 with App Router
- [x] TypeScript for type safety
- [x] Prisma ORM with PostgreSQL
- [x] Database migrations and schema
- [x] RESTful API routes with comprehensive validation
- [x] Server and Client Components separation
- [x] Environment variable management
- [x] Production-ready API logic
- [x] Error handling and logging
- [x] Data integrity protection

#### 🛡️ Security & Performance
- [x] Input validation and sanitization
- [x] Authentication checks on all protected routes
- [x] Transaction support for critical operations
- [x] Proper error handling and user feedback
- [x] Hydration mismatch prevention
- [x] Client-only rendering for interactive components

### 🚧 **In Progress / Partially Implemented**

#### 📱 Mobile Responsiveness
- [x] Basic responsive design implemented
- [x] Mobile-specific optimizations
- [ ] Touch gestures for mobile shopping

#### 🔍 Search & Filtering
- [x] Basic product filtering
- [x] Advanced search with category and price filters
- [ ] Search autocomplete
- [ ] Filter persistence

### ❌ **Missing Features**

#### 📊 Analytics & Reporting
- [ ] Google Analytics integration
- [ ] Advanced sales analytics
- [ ] Customer behavior tracking
- [ ] Inventory alerts

#### 🔒 Security Enhancements
- [ ] Rate limiting on API routes
- [ ] CSRF protection
- [ ] Security headers
- [ ] Advanced monitoring

## 🏗️ Project Structure

```
endenaire/
├── app/                          # Next.js App Router
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication endpoints
│   │   ├── account/              # User account management
│   │   ├── products/             # Product management
│   │   ├── cart/                 # Shopping cart
│   │   ├── orders/               # Order management
│   │   ├── wishlist/             # Wishlist management
│   │   ├── subscription/         # Subscription management
│   │   ├── contact/              # Contact form handling
│   │   ├── payment/              # Stripe payment processing
│   │   └── admin/                # Admin dashboard APIs
│   ├── auth/                     # Authentication pages
│   ├── account/                  # User account pages
│   ├── admin/                    # Admin dashboard
│   ├── shop/                     # Product catalog
│   ├── product/                  # Product detail pages
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # Checkout process
│   ├── wishlist/                 # Wishlist
│   └── contact/                  # Contact page
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── header.tsx               # Site header with dynamic cart
│   ├── footer.tsx               # Site footer
│   ├── client-only.tsx          # Hydration-safe wrapper
│   └── providers.tsx            # Context providers
├── contexts/                     # React contexts
├── hooks/                        # Custom hooks
│   └── use-hydration-safe.ts    # Hydration safety hooks
├── lib/                          # Utility functions
├── prisma/                       # Database schema and migrations
└── public/                       # Static assets
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- PostgreSQL database
- pnpm package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/nxr-deen/edenaire-.git
   cd endenaire
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/database_name"
   
   # NextAuth.js
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   
   # Google OAuth (optional)
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   # Stripe Configuration
   STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
   STRIPE_SECRET_KEY="sk_test_your_secret_key_here"
   STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret_here"
   NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key_here"
   ```

4. **Set up the database**
   ```bash
   pnpm exec prisma generate
   pnpm exec prisma migrate dev
   ```

5. **Start the development server**
   ```bash
   pnpm dev
   ```

6. **Set up Stripe (Optional)**
   Follow the setup guide in `STRIPE_SETUP.md` to enable payment processing

7. **Open your browser**
   Navigate to `http://localhost:3000`

## 🔧 Development Guidelines

### Code Style
- Use TypeScript for all new code
- Follow Next.js 14 App Router conventions
- Use shadcn/ui components for consistency
- Implement proper error handling
- Add loading states for better UX

### Database
- Use Prisma migrations for schema changes
- Follow naming conventions for models
- Add proper indexes for performance
- Implement soft deletes where appropriate

### API Routes
- Use proper HTTP status codes
- Implement comprehensive input validation
- Add error handling and logging
- Use NextAuth.js for authentication
- Implement transaction support for critical operations

### Components
- Use Server Components by default
- Use Client Components only when necessary
- Implement proper prop typing
- Add accessibility attributes
- Use ClientOnly wrapper for hydration-sensitive components

## 🐛 Known Issues

1. **Google OAuth**: Requires proper Google Cloud Console setup
2. **Database Connections**: May need to restart PostgreSQL if connection limit is reached
3. **Image Optimization**: Some placeholder images need to be replaced with actual product images

## 🔄 Recent Updates

### ✅ **Latest Improvements (Latest)**

#### 🛡️ **Hydration Error Fixes**
- Fixed hydration mismatches caused by browser extensions
- Implemented `ClientOnly` wrapper for interactive components
- Added `FormSafe` component for form-specific issues
- Enhanced hydration safety hooks

#### 🔧 **API Logic Improvements**
- Added comprehensive validation to all API endpoints
- Implemented proper error handling and user feedback
- Added transaction support for critical operations
- Enhanced data integrity protection
- Improved security with authentication checks

#### 🛒 **Dynamic Cart Count**
- Made cart count in header dynamic and real-time
- Integrated with actual cart data using SWR
- Added smart formatting for large numbers (99+)
- Applied to both desktop and mobile layouts

#### 📝 **Contact Form Backend**
- Implemented complete backend logic for contact form
- Added validation and error handling
- Integrated with user sessions
- Added email notification simulation

#### 🗑️ **Feature Cleanup**
- Removed rating and review features
- Removed user avatar functionality
- Removed loyalty points system
- Removed virtual try-on feature
- Streamlined codebase for better maintainability

## 📝 API Documentation

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/session` - Get current session

### Product Endpoints
- `GET /api/products` - Get all products
- `GET /api/products/[id]` - Get product by ID
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Cart Endpoints
- `GET /api/cart` - Get user cart
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/item` - Update cart item
- `DELETE /api/cart/item` - Remove item from cart

### Order Endpoints
- `GET /api/orders` - Get user orders
- `POST /api/orders/create` - Create order from cart
- `GET /api/orders/[id]` - Get order by ID
- `GET /api/orders/payment-intent/[id]` - Get order by payment intent

### Payment Endpoints
- `POST /api/payment/create-payment-intent` - Create Stripe payment intent
- `POST /api/payment/webhook` - Handle Stripe webhooks

### Category Endpoints
- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create category (admin)
- `GET /api/categories/[id]` - Get category by ID
- `PUT /api/categories/[id]` - Update category (admin)
- `DELETE /api/categories/[id]` - Delete category (admin)

### Contact Endpoints
- `POST /api/contact` - Submit contact form

### Account Endpoints
- `GET /api/account` - Get user profile
- `PUT /api/account` - Update user profile
- `PUT /api/account/settings` - Update user settings
- `POST /api/account/change-password` - Change password
- `DELETE /api/account/delete` - Delete account

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 👥 Team

- **Developer**: Noureddine
- **Repository**: https://github.com/nxr-deen/edenaire-.git

## 📞 Support

For questions or support, please open an issue on GitHub or contact the development team.

---

**Last Updated**: December 2024
**Version**: 2.0.0
**Status**: Production Ready (Enhanced Features) 