# Verdance Systems AI Website

A premium Apple-level website built with Next.js 14, TypeScript, and Tailwind CSS. Features intelligent automation and lead generation capabilities with seamless integrations.

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Copy the example environment file:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` and add your configuration:

```env
# Required: GoHighLevel Calendar URL
NEXT_PUBLIC_GHL_CALENDAR_URL=your-ghl-calendar-embed-url

# Contact Information (pre-configured)
NEXT_PUBLIC_WHATSAPP_NUMBER=27739961535
NEXT_PUBLIC_CONTACT_EMAIL=verdancesystems@gmail.com

# Optional: Analytics
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=verdancesystemsai.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 3. Start Development Server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the website.

## 🔧 Integration Setup

### BuildMyAgent Widget Integration

1. Open `src/app/(components)/WidgetLauncher.tsx`
2. Replace the placeholder `open()` function with your BuildMyAgent script
3. The widget will automatically be available via `window.VERDANCE_WIDGET.open()`

**Example integration:**
```typescript
// In WidgetLauncher.tsx
(window as any).VERDANCE_WIDGET = {
  open: () => {
    // Paste your BuildMyAgent initialization script here
    // Example:
    // window.BuildMyAgent?.open({
    //   agentId: 'your-agent-id',
    //   config: { /* your config */ }
    // });
  }
};
```

### GoHighLevel Calendar Setup

1. Get your GHL calendar embed URL
2. Add it to `.env.local` as `NEXT_PUBLIC_GHL_CALENDAR_URL`
3. The calendar will automatically load in the booking section

## 📁 Project Structure

```
src/
├── app/
│   ├── (components)/          # Reusable UI components
│   │   ├── Container.tsx      # Responsive container wrapper
│   │   ├── Button.tsx         # Button component with variants
│   │   ├── Card.tsx           # Card component for content blocks
│   │   ├── Section.tsx        # Section wrapper with padding/backgrounds
│   │   ├── Nav.tsx            # Sticky navigation with mobile menu
│   │   └── WidgetLauncher.tsx # BuildMyAgent widget integration
│   ├── (sections)/            # Page sections
│   │   ├── Hero.tsx           # Main hero with dual CTAs
│   │   ├── SocialProof.tsx    # Value proposition cards
│   │   ├── Advantage.tsx      # Three key benefits
│   │   ├── Features.tsx       # Product feature grid
│   │   ├── HowItWorks.tsx     # 4-step process
│   │   ├── Industries.tsx     # Industry verticals served
│   │   ├── Demo.tsx           # Demo section with widget CTA
│   │   ├── PricingTeaser.tsx  # Pricing without hard numbers
│   │   ├── Calendar.tsx       # GHL calendar iframe
│   │   ├── CTA.tsx            # Final conversion section
│   │   └── Footer.tsx         # Footer with contact/legal info
│   ├── layout.tsx             # Root layout with analytics
│   ├── page.tsx               # Main homepage
│   ├── globals.css            # Global styles and utilities
│   ├── robots.txt             # SEO robots file
│   └── sitemap.xml            # XML sitemap
├── lib/
│   ├── seo.ts                 # SEO configuration and metadata
│   └── gtag.ts                # Google Analytics tracking utilities
└── public/
    └── og-image.png           # Social sharing image (1200x630)
```

## 🎨 Design System

### Colors
- **Primary:** Deep Navy `#0A2342`
- **Secondary:** Ink-2 `#1B2F55`
- **Text:** `#111111`
- **Neutral:** `#334155`
- **Border:** `#E5E7EB`
- **Background:** `#FFFFFF`

### Typography
- **Font:** Poppins (400, 500, 600, 700)
- **H1:** 48px desktop, 36px mobile
- **H2:** 32-40px responsive
- **Body:** 16-18px with 1.6 line-height

### Components
- **Buttons:** Rounded-xl with hover animations
- **Cards:** 16px border-radius with subtle shadows
- **Navigation:** Sticky with backdrop blur
- **Sections:** Consistent vertical padding

## 🔧 CTA Button Behavior

All buttons are configured with specific actions:

### "Book Free Demo" / "Book a Demo"
- Scrolls to calendar section (`#book`)
- Uses smooth scrolling behavior

### "AI Demo" / "Try AI Demo"
- Opens BuildMyAgent widget
- Calls `window.VERDANCE_WIDGET.open()`

### Navigation Links
- Scroll to respective sections with smooth behavior
- Mobile-friendly with collapsible menu

## 📊 Analytics & Performance

### Built-in Tracking
- Google Analytics 4 support
- Plausible Analytics integration
- Performance monitoring
- Structured data for SEO

### Performance Features
- Lighthouse score ≥95 target
- Image optimization
- Font preloading
- Minimal JavaScript bundles
- CSS optimization

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm run build
```

### Environment Variables for Production
Ensure these are set in your deployment platform:
- `NEXT_PUBLIC_GHL_CALENDAR_URL`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_CONTACT_EMAIL`
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` (optional)
- `NEXT_PUBLIC_GA_MEASUREMENT_ID` (optional)

## 📝 Content Management

All content is stored in component files for easy editing:
- **Hero content:** `src/app/(sections)/Hero.tsx`
- **Features:** `src/app/(sections)/Features.tsx`
- **Benefits:** `src/app/(sections)/Advantage.tsx`
- **Process steps:** `src/app/(sections)/HowItWorks.tsx`
- **Contact info:** `src/app/(sections)/Footer.tsx`

## 🔒 Security & Compliance

- HTTPS enforced
- POPIA compliance messaging
- Secure headers configured
- Input sanitization
- Environment variable protection

## 🛠 Development Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # TypeScript type checking
```

## 📞 Support

For technical support or questions:
- **Email:** verdancesystems@gmail.com
- **Phone:** +27 73 996 1535

---

Built with ⚡ by Verdance Systems AI# Verdance Systems AI - Latest Version Wed Oct 15 18:39:18 SAST 2025
