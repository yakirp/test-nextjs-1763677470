# Next.js Authentication with Clerk

A modern authentication starter built with Next.js 16, TypeScript, Tailwind CSS, and Clerk authentication.

## Features

- ✅ **Next.js 16** - Latest Next.js with App Router
- ✅ **TypeScript** - Type-safe development
- ✅ **Tailwind CSS** - Utility-first styling
- ✅ **Clerk Authentication** - Complete auth solution
- ✅ **Protected Routes** - Middleware-based route protection
- ✅ **User Dashboard** - Protected user area
- ✅ **Loading States** - Smooth UX with loading indicators
- ✅ **Error Boundaries** - Graceful error handling

## Prerequisites

- **Node.js** 18.x or higher
- **npm** or **yarn** package manager
- **Clerk Account** - Sign up at [clerk.com](https://clerk.com)

## Getting Started

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd clerk
npm install
```

### 2. Set Up Clerk Authentication

1. Sign up for a free account at [clerk.com](https://clerk.com)
2. Create a new application in the [Clerk Dashboard](https://dashboard.clerk.com)
3. Go to **API Keys** in your Clerk dashboard
4. Copy your **Publishable Key** and **Secret Key**

### 3. Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Update `.env.local` with your Clerk keys:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Clerk Redirect URLs
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

### 4. Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app.

## Project Structure

```
clerk/
├── app/
│   ├── dashboard/          # Protected dashboard route
│   │   ├── page.tsx        # Dashboard page
│   │   ├── loading.tsx     # Loading state
│   │   └── error.tsx       # Error boundary
│   ├── layout.tsx          # Root layout with ClerkProvider
│   ├── page.tsx            # Public landing page
│   ├── globals.css         # Global styles
│   └── error.tsx           # Global error boundary
├── components/
│   └── header.tsx          # Navigation header
├── middleware.ts           # Route protection middleware
├── .env.local.example      # Environment variable template
└── package.json
```

## Authentication Flow

1. **Public Routes** (`/`, `/sign-in`, `/sign-up`) - Accessible to everyone
2. **Protected Routes** (`/dashboard`) - Require authentication
3. **Middleware** - Automatically redirects unauthenticated users
4. **Clerk Components** - Handle all auth UI (sign-in, sign-up, user profile)

### Key Files

- **`middleware.ts`** - Protects routes using Clerk middleware
- **`app/layout.tsx`** - Wraps app with ClerkProvider
- **`app/dashboard/page.tsx`** - Protected page example
- **`components/header.tsx`** - Auth-aware navigation

## Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Production
npm run build        # Build for production
npm start            # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key | Yes |
| `CLERK_SECRET_KEY` | Clerk secret key | Yes |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in page URL | No (default: `/sign-in`) |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up page URL | No (default: `/sign-up`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in | No (default: `/dashboard`) |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up | No (default: `/dashboard`) |

## Troubleshooting

### "Invalid publishable key" Error

- Verify your `.env.local` file exists and contains valid Clerk keys
- Restart the dev server after changing environment variables
- Check that keys start with `pk_test_` (publishable) and `sk_test_` (secret)

### Middleware Not Protecting Routes

- Ensure `middleware.ts` is in the project root (not in `app/` directory)
- Check that the matcher pattern includes your protected routes
- Verify ClerkProvider wraps your app in `app/layout.tsx`

### Sign-In Redirect Loop

- Confirm redirect URLs in `.env.local` match your route structure
- Check that public routes are listed in middleware's `isPublicRoute` matcher
- Ensure `/sign-in` and `/sign-up` are marked as public

### TypeScript Errors

```bash
npm run build    # Check for type errors
npx tsc --noEmit # Run TypeScript compiler
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Clerk Documentation](https://clerk.com/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)

## Deploy on Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

1. Push your code to GitHub
2. Import your repository to Vercel
3. Add environment variables in Vercel project settings
4. Deploy!

## License

MIT
