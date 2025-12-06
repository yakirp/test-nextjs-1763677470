# Detailed Setup Guide

This guide walks you through setting up the Next.js + Clerk authentication project from scratch.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Clerk Account Setup](#clerk-account-setup)
- [Project Installation](#project-installation)
- [Configuration](#configuration)
- [Testing the Application](#testing-the-application)
- [Customization](#customization)

## Prerequisites

Ensure you have the following installed:

- **Node.js** 18.x or later ([Download](https://nodejs.org/))
- **npm** 9.x or later (comes with Node.js)
- **Git** ([Download](https://git-scm.com/))
- A code editor (VS Code recommended)

Verify your installation:

```bash
node --version  # Should show v18.x or higher
npm --version   # Should show 9.x or higher
```

## Clerk Account Setup

### Step 1: Create a Clerk Account

1. Go to [clerk.com](https://clerk.com)
2. Click **Sign Up** and create a free account
3. Verify your email address

### Step 2: Create a New Application

1. In the [Clerk Dashboard](https://dashboard.clerk.com), click **+ Create Application**
2. Enter an application name (e.g., "Next.js Auth Starter")
3. Select authentication methods:
   - Email
   - Google (optional)
   - GitHub (optional)
4. Click **Create Application**

### Step 3: Get Your API Keys

1. In your application dashboard, navigate to **API Keys** in the left sidebar
2. You'll see two keys:
   - **Publishable Key** - Starts with `pk_test_` (safe to use in browser)
   - **Secret Key** - Starts with `sk_test_` (keep this private)
3. Keep this tab open - you'll need these keys in the next step

## Project Installation

### Step 1: Clone and Install

```bash
# Clone the repository
git clone <your-repo-url>
cd clerk

# Install dependencies
npm install
```

### Step 2: Configure Environment Variables

Create a `.env.local` file in the project root:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and paste your Clerk keys:

```env
# Clerk Authentication Keys
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
CLERK_SECRET_KEY=sk_test_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

# Clerk Redirect URLs (these can stay as-is)
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/dashboard
```

**Important:** 
- Never commit `.env.local` to version control
- The `.gitignore` file already excludes it

### Step 3: Start the Development Server

```bash
npm run dev
```

You should see:

```
▲ Next.js 16.0.7
- Local:        http://localhost:3000
- Environments: .env.local

✓ Ready in 2s
```

## Configuration

### Clerk Dashboard Configuration

#### 1. Configure Allowed Redirect URLs

In your Clerk Dashboard:

1. Go to **Paths** in the left sidebar
2. Add these URLs under **Allowed redirect URLs**:
   - `http://localhost:3000`
   - `http://localhost:3000/dashboard`
   - Your production URL (when deploying)

#### 2. Customize Sign-In/Sign-Up Pages (Optional)

1. Go to **Account Portal** → **Appearance**
2. Customize colors, logos, and branding
3. Changes appear immediately in your app

#### 3. Configure User Profile Fields

1. Go to **User & Authentication** → **User Profile**
2. Add custom fields if needed (e.g., phone number, username)
3. Update your dashboard page to display these fields

### Project Configuration

#### Modify Protected Routes

Edit `middleware.ts` to change which routes are public:

```typescript
// Add more public routes
const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/about",        // Add this
  "/pricing",      // Add this
]);
```

#### Customize After-Sign-In Redirect

Update `.env.local`:

```env
# Redirect to a different page after authentication
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/welcome
```

## Testing the Application

### Test 1: Public Landing Page

1. Open [http://localhost:3000](http://localhost:3000)
2. You should see the landing page with **Sign In** and **Sign Up** buttons
3. The header should show a **Sign In** link

**Expected Result:** ✅ Page loads without errors

### Test 2: Sign Up Flow

1. Click **Sign Up** button
2. Fill in email and password
3. Verify your email (check inbox)
4. You should be redirected to `/dashboard`

**Expected Result:** ✅ Account created and logged in

### Test 3: Protected Route Access

1. Sign out (click user avatar → Sign Out)
2. Try to visit [http://localhost:3000/dashboard](http://localhost:3000/dashboard)
3. You should be redirected to `/sign-in`

**Expected Result:** ✅ Unauthenticated users cannot access dashboard

### Test 4: Sign In Flow

1. Click **Sign In**
2. Enter your credentials
3. You should be redirected to `/dashboard`
4. Dashboard should display your name and email

**Expected Result:** ✅ Successfully authenticated

### Test 5: Navigation Header

1. While signed in, check the header
2. You should see:
   - Brand name/logo
   - Dashboard link
   - User avatar button

**Expected Result:** ✅ Header shows authenticated state

## Customization

### Change Theme Colors

Edit `app/globals.css` or use Tailwind config:

```javascript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',  // Change primary color
      }
    }
  }
}
```

### Add More Protected Routes

1. Create a new folder in `app/` (e.g., `app/settings/`)
2. Add a `page.tsx` file
3. The middleware automatically protects it (unless added to `isPublicRoute`)

Example:

```typescript
// app/settings/page.tsx
export default function SettingsPage() {
  return <div>Settings Page</div>;
}
```

### Customize Dashboard Content

Edit `app/dashboard/page.tsx` to add more features:

```typescript
// Add more user data
const user = await currentUser();

return (
  <div>
    <h1>Welcome, {user?.firstName}!</h1>
    <p>Member since: {new Date(user?.createdAt).toLocaleDateString()}</p>
    {/* Add more dashboard widgets */}
  </div>
);
```

## Common Issues

### Issue: Environment variables not loading

**Solution:** Restart the dev server after changing `.env.local`

```bash
# Stop server (Ctrl+C)
npm run dev
```

### Issue: Clerk keys invalid

**Solution:** Verify keys are copied correctly from Clerk dashboard
- No extra spaces
- Complete key including prefixes (`pk_test_` and `sk_test_`)

### Issue: Middleware not working

**Solution:** Ensure `middleware.ts` is in the root directory (not `app/` or `src/`)

## Next Steps

- Read the [Clerk Documentation](https://clerk.com/docs) for advanced features
- Customize the UI to match your brand
- Add more protected routes
- Deploy to production (see main README)

## Getting Help

- [Clerk Support](https://clerk.com/support)
- [Next.js Discord](https://discord.gg/nextjs)
- [GitHub Issues](https://github.com/your-repo/issues)
