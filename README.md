# 🛍️ Endenaire - Full-Stack E-commerce Platform

A modern, full-stack e-commerce application built with Next.js, TypeScript, and PostgreSQL. Features a complete authentication system, admin dashboard, and comprehensive e-commerce functionality.

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

#### 🛒 E-commerce Core Features
- [x] Product catalog with dynamic data fetching
- [x] Product detail pages
- [x] Shopping cart functionality
- [x] Wishlist management
- [x] Checkout process
- [x] Order management
- [x] Category-based navigation
- [x] Product search and filtering

#### 👤 User Account Management
- [x] User profile management
- [x] Order history and tracking
- [x] Wishlist management
- [x] Settings with notification preferences
- [x] Security actions (password change, account deletion)
- [x] Subscription management (subscribe, upgrade, cancel)

#### 🎛️ Admin Dashboard
- [x] Product management (CRUD operations)
- [x] Order tracking and management
- [x] User analytics and insights
- [x] Sales reporting and charts
- [x] Inventory management

#### 🎨 UI/UX Features
- [x] Modern, responsive design
- [x] Mobile-first approach
- [x] Hero sections with background images
- [x] Global background image system
- [x] Toast notifications
- [x] Loading states and error handling
- [x] Client-side data fetching with SWR

#### 🔧 Technical Implementation
- [x] Next.js 14 with App Router
- [x] TypeScript for type safety
- [x] Prisma ORM with PostgreSQL
- [x] Database migrations and schema
- [x] RESTful API routes
- [x] Server and Client Components separation
- [x] Environment variable management

### 🚧 **In Progress / Partially Implemented**

#### 📱 Mobile Responsiveness
- [x] Basic responsive design implemented
- [ ] Mobile-specific optimizations needed
- [ ] Touch gestures for mobile shopping

#### 🔍 Search & Filtering
- [x] Basic product filtering
- [ ] Advanced search with autocomplete
- [ ] Filter by price range, category, etc.

### ❌ **Missing Features**

#### 💳 Payment Integration
- [ ] Stripe/PayPal payment processing
- [ ] Payment method management
- [ ] Subscription billing
- [ ] Refund processing

#### 📧 Email & Notifications
- [ ] Email verification system
- [ ] Order confirmation emails
- [ ] Password reset emails
- [ ] Marketing email campaigns
- [ ] Push notifications

#### 📊 Analytics & Reporting
- [ ] Google Analytics integration
- [ ] Advanced sales analytics
- [ ] Customer behavior tracking
- [ ] Inventory alerts

#### 🚚 Shipping & Logistics
- [ ] Shipping calculator
- [ ] Multiple shipping options
- [ ] Order tracking integration
- [ ] Address validation

#### 🔒 Security Enhancements
- [ ] Rate limiting on API routes
- [ ] Input validation and sanitization
- [ ] CSRF protection
- [ ] Security headers

#### 🌐 Internationalization
- [ ] Multi-language support
- [ ] Currency conversion
- [ ] Regional pricing
- [ ] Localized content

#### 📱 PWA Features
- [ ] Service worker for offline support
- [ ] App manifest
- [ ] Push notifications
- [ ] Install prompt

#### 🧪 Testing
- [ ] Unit tests
- [ ] Integration tests
- [ ] E2E tests
- [ ] Performance testing

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
│   │   └── admin/                # Admin dashboard APIs
│   ├── auth/                     # Authentication pages
│   ├── account/                  # User account pages
│   ├── admin/                    # Admin dashboard
│   ├── shop/                     # Product catalog
│   ├── product/                  # Product detail pages
│   ├── cart/                     # Shopping cart
│   ├── checkout/                 # Checkout process
│   └── wishlist/                 # Wishlist
├── components/                   # Reusable components
│   ├── ui/                       # shadcn/ui components
│   ├── header.tsx               # Site header
│   ├── footer.tsx               # Site footer
│   └── providers.tsx            # Context providers
├── contexts/                     # React contexts
├── hooks/                        # Custom hooks
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

6. **Open your browser**
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
- Implement input validation
- Add error handling and logging
- Use NextAuth.js for authentication

### Components
- Use Server Components by default
- Use Client Components only when necessary
- Implement proper prop typing
- Add accessibility attributes

## 🐛 Known Issues

1. **Google OAuth**: Requires proper Google Cloud Console setup
2. **Database Connections**: May need to restart PostgreSQL if connection limit is reached
3. **Image Optimization**: Some placeholder images need to be replaced with actual product images

## 🔄 Next Steps for Development

### Priority 1: Payment Integration
1. Set up Stripe account and API keys
2. Implement payment processing in checkout
3. Add payment method management
4. Handle subscription billing

### Priority 2: Email System
1. Set up email service (SendGrid, AWS SES)
2. Implement email templates
3. Add email verification
4. Create order confirmation emails

### Priority 3: Enhanced Security
1. Add rate limiting to API routes
2. Implement input validation
3. Add security headers
4. Set up monitoring and logging

### Priority 4: Performance Optimization
1. Implement image optimization
2. Add caching strategies
3. Optimize database queries
4. Add CDN for static assets

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
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order by ID

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

**Last Updated**: July 26, 2024
**Version**: 1.0.0
**Status**: Production Ready (Core Features) 