# Bo Coach - Modern ADHD Homework Helper Website

A dynamic, immersive website for Bo Coach, an AI-powered ADHD behavioral coaching app that transforms homework battles into peaceful afternoons.

## 🎨 Design Philosophy

This website embodies the core mission of Bo Coach through:
- **Dynamic 3D Hero**: Interactive canvas animation representing Bo's adaptive, engaging personality
- **Scroll-Triggered Storytelling**: Visual transformation showing homework breakdown from overwhelming to achievable
- **Brain-Approved Aesthetics**: Vibrant blues, warm accents, and smooth animations designed for ADHD-friendly engagement
- **Behavioral Science Foundation**: Every design choice reflects evidence-based principles for executive function support

## 🚀 Features

### Immersive Hero Section
- Custom canvas-based 3D animation with floating spheres representing Bo
- Mouse-following interactive elements
- Homework fragments floating in background
- Smooth fade-in animations for content reveal

### Dynamic Story Section
- Scroll-activated card transformation
- Visual representation of homework breakdown process
- Real-time animation showing "before" and "after" states
- Feature highlights with icon-based communication

### Modern Design Elements
- Custom cursor effects
- Scroll progress indicator
- Gradient overlays and background animations
- Responsive grid layouts
- Smooth scroll navigation

## 📦 Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Styling**: Tailwind CSS with custom configuration
- **Animations**: CSS animations + Canvas API for 3D effects
- **Typography**: Outfit (body) + Space Mono (accent)
- **Deployment**: Optimized for Vercel

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Quick Start

1. **Initialize Next.js project**
```bash
npx create-next-app@latest bo-coach-website
cd bo-coach-website
```

2. **Copy files to project structure**
```
bo-coach-website/
├── app/
│   ├── layout.jsx
│   ├── page.jsx
│   └── globals.css
├── components/
│   └── Hero3D.jsx
├── tailwind.config.js
└── package.json
```

3. **Install dependencies**
```bash
npm install
```

4. **Run development server**
```bash
npm run dev
```

Visit `http://localhost:3000` to see your website.

## 📁 File Structure

```
bo-coach-website/
├── app/
│   ├── layout.jsx          # Root layout with metadata
│   ├── page.jsx            # Main homepage component
│   └── globals.css         # Global styles and Tailwind imports
├── components/
│   └── Hero3D.jsx          # Interactive 3D canvas hero animation
├── public/                 # Static assets (images, icons)
├── tailwind.config.js      # Tailwind configuration with custom colors
├── package.json            # Dependencies and scripts
└── README.md               # This file
```

## 🎨 Customization

### Colors
Edit `tailwind.config.js` to modify the color scheme:
```javascript
colors: {
  'primary-blue': '#2D9CDB',
  'bright-cyan': '#56CCF2',
  'warm-yellow': '#F2C94C',
  'soft-pink': '#FF6B9D',
  // ... customize as needed
}
```

### Animations
Adjust animation timings in `tailwind.config.js`:
```javascript
animation: {
  'fade-in-up': 'fadeInUp 0.8s ease forwards',
  'float': 'float 20s infinite ease-in-out',
}
```

### Hero 3D Effects
Modify `components/Hero3D.jsx` to adjust:
- Number of spheres: Change `sphereCount` variable
- Particle count: Modify fragments array size
- Colors and movement: Edit class constructors

## 🚀 Deployment to Vercel

### Option 1: Deploy via Vercel CLI

1. **Install Vercel CLI**
```bash
npm install -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow prompts** to link your project

### Option 2: Deploy via GitHub

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin your-repo-url
git push -u origin main
```

2. **Connect to Vercel**
- Visit [vercel.com](https://vercel.com)
- Import your GitHub repository
- Vercel auto-detects Next.js configuration
- Click "Deploy"

### Environment Variables
If needed, add these in Vercel dashboard:
```
NEXT_PUBLIC_API_URL=your-api-url
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id
```

## 🔮 Future Enhancements

### Phase 2 Features
- [ ] **Three.js Integration**: Replace canvas with full WebGL for advanced 3D effects
- [ ] **GSAP ScrollTrigger**: Enhanced scroll animations with precise control
- [ ] **Authentication**: NextAuth.js for Google Login integration
- [ ] **Analytics**: Integration with Vercel Analytics
- [ ] **CMS Integration**: Headless CMS for content management

### Phase 3 Features
- [ ] **Interactive Demo**: Embedded Bo Coach prototype experience
- [ ] **Parent Dashboard**: Account creation and student management
- [ ] **School Portal**: Integration showcase for Google Classroom
- [ ] **Success Stories**: Video testimonials with lazy loading
- [ ] **Blog Section**: SEO-optimized content hub

## 🎯 Design Inspiration

This website draws inspiration from:
- [Mayda.co](https://mayda.co/) - Immersive scrolling storytelling
- [Camera WebGI](https://camera-webgi.vercel.app/) - 3D product visualization
- [NASA Eyes](https://eyes.nasa.gov/apps/solar-system/) - Interactive space exploration
- [Blob Mixer](https://blobmixer.14islands.com/) - Organic shape morphing

## 📊 Performance Optimization

- **Image Optimization**: Use Next.js Image component for all images
- **Code Splitting**: Automatic with Next.js App Router
- **Font Loading**: Preconnect to Google Fonts
- **Canvas Optimization**: RequestAnimationFrame for smooth 60fps animations
- **Lazy Loading**: Components load as needed

## 🧪 Testing

```bash
# Build for production
npm run build

# Test production build locally
npm run start

# Lint code
npm run lint
```

## 📱 Responsive Design

The website is fully responsive with breakpoints:
- Mobile: < 768px (simplified navigation, single column)
- Tablet: 768px - 1024px
- Desktop: > 1024px (full experience)

## 🤝 Contributing

This is a proprietary project for Werkable/Bo Coach. For questions or contributions:
- Contact: [Your contact info]
- Documentation: [Link to additional docs]

## 📄 License

Copyright © 2026 Werkable. All rights reserved.

## 🎓 Built With

- **Design**: Senior Designer + Senior Engineer collaboration
- **Behavioral Science**: Board Certified Behavior Analyst (BCBA)
- **Technology**: Modern web stack optimized for performance
- **Mission**: Supporting ADHD families with evidence-based tools

---

**Note**: This is version 1.0 - a standalone HTML version is also available in `bo-coach-website.html` for quick previews without Next.js setup.