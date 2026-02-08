# Bo Coach Website - Deployment Guide

## 🚀 Quick Deploy to Vercel (Recommended)

### Prerequisites
- GitHub account
- Vercel account (free tier works perfectly)
- Git installed locally

### Step-by-Step Deployment

#### 1. Prepare Your Local Project

```bash
# Create new Next.js project
npx create-next-app@latest bo-coach-website
cd bo-coach-website

# The installer will ask you questions - answer:
# ✓ Would you like to use TypeScript? › No
# ✓ Would you like to use ESLint? › Yes
# ✓ Would you like to use Tailwind CSS? › Yes
# ✓ Would you like to use `src/` directory? › No
# ✓ Would you like to use App Router? › Yes
# ✓ Would you like to customize the default import alias? › No
```

#### 2. Add the Bo Coach Files

Copy these files into your project structure:

```
bo-coach-website/
├── app/
│   ├── layout.jsx          # Copy from provided files
│   ├── page.jsx            # Copy from provided files
│   └── globals.css         # Copy from provided files
├── components/
│   ├── Hero3D.jsx          # Copy from provided files
│   ├── InteractiveFeatures.jsx
│   ├── SocialProof.jsx
│   └── CTASection.jsx
├── tailwind.config.js      # Replace with provided file
├── postcss.config.js       # Should already exist
└── package.json            # Merge dependencies
```

#### 3. Initialize Git Repository

```bash
# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit - Bo Coach website"
```

#### 4. Create GitHub Repository

1. Go to [github.com](https://github.com)
2. Click "New repository"
3. Name it: `bo-coach-website`
4. Don't initialize with README (you already have code)
5. Click "Create repository"

```bash
# Link to your GitHub repo (replace YOUR_USERNAME)
git remote add origin https://github.com/YOUR_USERNAME/bo-coach-website.git

# Push code
git branch -M main
git push -u origin main
```

#### 5. Deploy to Vercel

**Option A: Via Vercel Dashboard (Easiest)**

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click "Add New..." → "Project"
4. Import your `bo-coach-website` repository
5. Vercel auto-detects Next.js:
   - Framework Preset: **Next.js**
   - Root Directory: **./**
   - Build Command: `next build` (auto)
   - Output Directory: `.next` (auto)
6. Click "Deploy"
7. Wait 2-3 minutes ⏳
8. Done! 🎉 Your site is live at: `bo-coach-website.vercel.app`

**Option B: Via Vercel CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel

# Follow prompts:
# ? Set up and deploy? Yes
# ? Which scope? Your account
# ? Link to existing project? No
# ? What's your project's name? bo-coach-website
# ? In which directory is your code located? ./
# ? Want to override the settings? No

# Production deployment
vercel --prod
```

### 🎨 Custom Domain (Optional)

1. In Vercel dashboard, go to your project
2. Click "Settings" → "Domains"
3. Add your domain: `bocoach.com`
4. Follow DNS configuration instructions
5. Vercel automatically provisions SSL certificate

### 📊 Environment Variables

If you add authentication or API integrations:

1. Go to Vercel dashboard → Your project
2. "Settings" → "Environment Variables"
3. Add variables:
   - `NEXT_PUBLIC_API_URL`
   - `NEXT_PUBLIC_GOOGLE_CLIENT_ID`
   - `DATABASE_URL`
   etc.

4. Redeploy for changes to take effect

### 🔄 Continuous Deployment

Every git push to `main` branch automatically deploys:

```bash
# Make changes
git add .
git commit -m "Update hero animation"
git push

# Vercel automatically deploys in ~2 minutes
```

Preview deployments for branches:
```bash
# Create feature branch
git checkout -b feature/new-section

# Push branch
git push origin feature/new-section

# Vercel creates preview URL: bo-coach-website-git-feature-new-section.vercel.app
```

## 🛠️ Alternative Deployment Options

### Netlify

```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build
npm run build

# Deploy
netlify deploy --prod
```

### Traditional Hosting (cPanel, etc.)

```bash
# Build static export
npm run build

# Export static files
npx next export

# Upload 'out' folder to your host
```

## 📈 Performance Optimization

### 1. Image Optimization

Replace `<img>` tags with Next.js Image:

```jsx
import Image from 'next/image'

<Image 
  src="/bo-logo.png" 
  alt="Bo Coach" 
  width={200} 
  height={200}
  priority // for above-fold images
/>
```

### 2. Font Optimization

Already configured in `app/layout.jsx` with Google Fonts

### 3. Analytics Integration

Add to `app/layout.jsx`:

```jsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

Install package:
```bash
npm install @vercel/analytics
```

### 4. Speed Insights

```bash
npm install @vercel/speed-insights

# Add to layout.jsx
import { SpeedInsights } from "@vercel/speed-insights/next"
```

## 🐛 Troubleshooting

### Build Fails

```bash
# Clear cache
rm -rf .next node_modules
npm install
npm run build
```

### Hydration Errors

If you see "Hydration failed" errors:
- Check for mismatched HTML structure
- Ensure `useEffect` for client-only code
- Verify no invalid nesting (e.g., `<p>` inside `<p>`)

### Canvas Not Rendering

Add to `Hero3D.jsx`:
```jsx
'use client' // Ensure this is at the top
```

### Fonts Not Loading

Verify `next.config.js`:
```javascript
module.exports = {
  optimizeFonts: true,
}
```

## 📱 Testing

### Local Testing

```bash
# Development
npm run dev

# Production build locally
npm run build
npm run start
```

### Mobile Testing

1. Get your local IP: `ifconfig` (Mac/Linux) or `ipconfig` (Windows)
2. Access from phone: `http://YOUR_IP:3000`

### Lighthouse Score

Run in Chrome DevTools:
1. Open site
2. F12 → Lighthouse tab
3. Generate report
4. Aim for: Performance 90+, Accessibility 95+

## 🔒 Security

### Headers

Add to `next.config.js`:

```javascript
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ]
  },
}
```

### Environment Variables

Never commit `.env.local`:

```bash
# Add to .gitignore
.env.local
.env.production.local
```

## 📞 Support

- Vercel Docs: [vercel.com/docs](https://vercel.com/docs)
- Next.js Docs: [nextjs.org/docs](https://nextjs.org/docs)
- GitHub Issues: Create issues in your repository

---

**Estimated Timeline:**
- Local setup: 15 minutes
- GitHub push: 5 minutes
- Vercel deployment: 5 minutes
- **Total: ~25 minutes to live website** 🚀