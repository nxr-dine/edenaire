# 🚀 Vercel Deployment Guide

## Prerequisites

Before deploying to Vercel, you need to set up the following:

### 1. Database Setup
You need a PostgreSQL database. Recommended options:
- **Vercel Postgres** (Recommended for Vercel)
- **Supabase** (Free tier available)
- **Neon** (Free tier available)
- **Railway** (Free tier available)

### 2. Environment Variables
Set up the following environment variables in your Vercel project:

#### Required Variables:
```env
# Database
DATABASE_URL="postgresql://username:password@host:port/database"

# NextAuth.js
NEXTAUTH_SECRET="your-secret-key-here"
NEXTAUTH_URL="https://your-domain.vercel.app"

# Stripe (Required for payments)
STRIPE_SECRET_KEY="sk_test_your-stripe-secret-key"
STRIPE_PUBLISHABLE_KEY="pk_test_your-stripe-publishable-key"
STRIPE_WEBHOOK_SECRET="whsec_your-stripe-webhook-secret"
```

#### Optional Variables:
```env
# Google OAuth (Optional)
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

## Deployment Steps

### Step 1: Set up Database
1. Create a PostgreSQL database (Vercel Postgres recommended)
2. Get your database connection string
3. Add it to Vercel environment variables as `DATABASE_URL`

### Step 2: Set up Stripe
1. Create a Stripe account
2. Get your API keys from the Stripe dashboard
3. Add them to Vercel environment variables
4. Set up webhook endpoint: `https://your-domain.vercel.app/api/payment/webhook`

### Step 3: Set up NextAuth
1. Generate a secure secret: `openssl rand -base64 32`
2. Add it to Vercel environment variables as `NEXTAUTH_SECRET`
3. Set `NEXTAUTH_URL` to your Vercel domain

### Step 4: Deploy to Vercel
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add all environment variables in Vercel dashboard
4. Deploy!

## Database Migration

After deployment, you need to run database migrations:

```bash
# Connect to your Vercel project
vercel link

# Run database migrations
vercel env pull .env.local
npx prisma db push
```

## Post-Deployment Setup

### 1. Database Seeding
You may want to seed your database with initial data:

```bash
# Create a seed script in package.json
"seed": "tsx prisma/seed.ts"

# Run seeding
npm run seed
```

### 2. Stripe Webhook Configuration
1. Go to your Stripe dashboard
2. Navigate to Webhooks
3. Add endpoint: `https://your-domain.vercel.app/api/payment/webhook`
4. Select events: `payment_intent.succeeded`, `payment_intent.payment_failed`
5. Copy the webhook secret and add it to Vercel environment variables

### 3. Google OAuth (Optional)
1. Go to Google Cloud Console
2. Create OAuth 2.0 credentials
3. Add authorized redirect URI: `https://your-domain.vercel.app/api/auth/callback/google`
4. Add credentials to Vercel environment variables

## Troubleshooting

### Common Issues:

1. **Database Connection Error**
   - Check your `DATABASE_URL` format
   - Ensure database is accessible from Vercel
   - Verify SSL settings if required

2. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify TypeScript compilation

3. **Environment Variables**
   - Double-check all environment variables are set in Vercel
   - Ensure no typos in variable names
   - Restart deployment after adding new variables

4. **Prisma Issues**
   - Run `prisma generate` locally to ensure schema is valid
   - Check database connection string format
   - Verify database permissions

## Monitoring

### Vercel Analytics
- Enable Vercel Analytics in your project settings
- Monitor performance and errors

### Database Monitoring
- Use your database provider's monitoring tools
- Set up alerts for connection issues

### Error Tracking
- Consider adding error tracking (Sentry, LogRocket, etc.)
- Monitor API routes for errors

## Security Checklist

- [ ] All environment variables are set in Vercel
- [ ] Database connection uses SSL
- [ ] Stripe webhook signature verification is enabled
- [ ] NextAuth secret is properly generated
- [ ] Google OAuth redirect URIs are correct
- [ ] No sensitive data in code or logs

## Performance Optimization

- [ ] Enable Vercel Edge Functions where appropriate
- [ ] Use Vercel Image Optimization
- [ ] Implement proper caching strategies
- [ ] Optimize database queries
- [ ] Use SWR for data fetching

## Support

If you encounter issues:
1. Check Vercel build logs
2. Review environment variables
3. Test database connection
4. Check Stripe webhook configuration
5. Verify NextAuth setup 