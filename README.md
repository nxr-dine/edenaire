# Endenaire

Endenaire is a full-stack jewelry e-commerce application built with Next.js, TypeScript, PostgreSQL, Prisma, NextAuth, and Stripe.

## Features

- Credentials and Google OAuth authentication
- Product catalog with search, category filters, and price filters
- Shopping cart and wishlist
- Checkout and payment processing with Stripe
- Order history and payment status tracking
- User profiles, account settings, subscriptions, and account deletion
- Admin dashboard for products, categories, users, orders, inventory, and analytics
- Responsive UI built with Tailwind CSS and reusable shadcn/ui components

## Tech Stack

- **Framework:** Next.js 15 App Router
- **Language:** TypeScript
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** NextAuth.js
- **Payments:** Stripe
- **Styling:** Tailwind CSS
- **Package manager:** pnpm

## Requirements

- Node.js 18+
- PostgreSQL
- pnpm

## Getting Started

```bash
pnpm install
pnpm exec prisma generate
pnpm exec prisma migrate dev
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env` file in the project root:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"

NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"

GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"

STRIPE_SECRET_KEY="sk_test_your_secret_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_your_publishable_key"
```

Google OAuth variables are optional unless Google sign-in is enabled. Stripe variables are required for payment functionality.

## Useful Commands

```bash
pnpm dev       # Start the development server
pnpm build     # Generate Prisma Client and build the app
pnpm start     # Start the production server
pnpm exec prisma studio
```

## Project Structure

```text
app/          Next.js pages and API routes
components/   Shared UI components
contexts/     React context providers
hooks/        Custom React hooks
lib/          Authentication, Prisma, Stripe, and utility modules
prisma/       Database schema and migrations
public/       Static assets
```

## API Areas

API routes are organized under `app/api` and include authentication, products, categories, cart, wishlist, orders, payments, subscriptions, account management, contact forms, and admin operations.

## Development Notes

- Use Prisma migrations for database schema changes.
- Protect authenticated and admin-only API routes with NextAuth.
- Validate request data on the server.
- Keep secrets in environment variables and never commit `.env` files.
