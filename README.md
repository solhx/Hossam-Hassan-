# Hossam Hassan Portfolio · 🚀

[![Next.js](https://img.shields.io/badge/Next.js-16-000000.svg?logo=next.js&logoColor=white&style=flat)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19-61DAFB.svg?logo=react&logoColor=black&style=flat)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178C6.svg?logo=typescript&logoColor=white&style=flat)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4-06B6D4.svg?logo=tailwindcss&logoColor=white&style=flat)](https://tailwindcss.com)

Modern, high-performance portfolio powered by Next.js App Router, featuring Three.js 3D, GSAP animations, AI chat (OpenAI/Gemini), and buttery-smooth interactions.

## ✨ Features

- 🎨 **Advanced Animations**: GSAP timelines, Framer Motion, magnetic interactions
- 🌐 **3D Graphics**: React Three Fiber (particles, gradient spheres)
- 💬 **AI Chat Widget**: OpenAI + Google Gemini API integration
- ⚡ **Performance**: Turbopack HMR, aggressive caching, WebP/AVIF images
- 📱 **Fully Responsive**: Mobile-first Tailwind design system
- 🌙 **Dark/Light Theme**: Automatic system preference
- 🔍 **SEO Optimized**: Metadata, JSON-LD, sitemaps, structured data
- 📊 **Analytics**: Vercel Speed Insights + Analytics
- ✅ **TypeScript**: End-to-end type safety + Zod validation

## 🏗️ Project Structure

```
hossam-hassan-portfolio/
├── public/                 # Static assets (images, resume, sitemaps)
├── src/
│   ├── app/               # Next.js App Router
│   │   ├── layout.tsx     # Global providers + SEO
│   │   ├── page.tsx       # Home page (sections)
│   │   └── api/chat/      # AI Chat endpoint
│   ├── components/        # Feature slices
│   │   ├── core/          # Cursor, nav, preloader
│   │   ├── sections/home/ # Hero, Showcase, Expertise
│   │   ├── ui/            # Glass cards, magnetic buttons
│   │   └── three/         # 3D scenes
│   ├── systems/           # Design tokens + animations
│   ├── hooks/             # useMagnetic, useCursorState
│   └── utils/             # cn.ts, math helpers
├── next.config.ts         # Turbopack + webpack (Three.js)
├── tailwind.config.ts     # Design system
└── package.json           # Next 16 + GSAP + Three.js 0.182
```

### Architecture Layers

```
1. Global Shell (layout.tsx)
   ├── ThemeProvider
   ├── CursorProvider  
   └── Lenis SmoothScroll

2. Page Flow (page.tsx)
   ├── Preloader
   └── Sections (Hero → CTA)

3. UI Primitives (components/ui/)
   └── Powered by: hooks/ + systems/

4. Data Flow
   └── lib/portfolio-data.ts → Sections
```

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| Framework | Next.js 16 (App Router), React 19 |
| Styling | Tailwind CSS 4, Headless UI patterns |
| Animation | GSAP 3.14, Framer Motion 12, Lenis |
| 3D | Three.js 0.182, React Three Fiber 9 |
| AI | OpenAI 6.33, Google Generative AI |
| Utils | Zod 4, React Hook Form, clsx |
| Deployment | Vercel (zero-config) |

## 🚀 Quick Start

```bash
npm install
npm run dev      # Turbopack HMR
npm run build    # Production build + sitemap
npm start        # Production server
```

## 📁 Detailed Structure Analysis

### 1. **Next.js App Router** (`src/app/`)
- **`layout.tsx`**: Root wrapper with providers, SEO metadata (OG/Twitter/JSON-LD Person schema), Analytics
- **`page.tsx`**: Client-side home composing self-contained sections
- **`loading.tsx`**: Automatic suspense boundaries
- **`api/chat/route.ts`**: Serverless AI chat endpoint

### 2. **Components Organization** (Feature + Atomic)
```
components/
├── core/          # Global (wrapped in layout)
│   ├── cursor/    # Custom mouse followers
│   └── floating-app-bar.tsx
├── sections/home/ # Vertical narrative
│   ├── hero-section.tsx (3D background)
│   └── connect-section.tsx (form)
├── ui/            # Reusable primitives
│   ├── glass-card.tsx
│   └── magnetic-element.tsx
└── chat/          # Floating AI widget
```

### 3. **Design & Motion Systems** (`src/systems/`)
```
systems/
├── design/
│   └── tokens.ts      # CSS vars: --color-primary, spacing
└── animation/
    ├── motion-variants.ts  # Framer presets
    └── gsap-config.ts      # Timelines
```
**Purpose**: DRY - one change cascades everywhere.

### 4. **Custom Hooks** (`src/hooks/`)
- `useMagnetic.ts`: Hover parallax effects
- `useCursorState.ts`: Ring/trail variants
- `useScrollProgress.ts`: Scroll-driven animations

### 5. **Conventions & Patterns**
- **Naming**: Kebab-case (`hero-section.tsx`), descriptive
- **Organization**: Hybrid (ui/ type-based + sections/ feature-based)
- **Path Aliases**: `@/components/ui/button` → `src/components/ui/button`
- **CSS**: `globals.css` (Tailwind + @layer utilities)

## 🎨 Design System Philosophy

**Glassmorphism + 3D + Kinetics**:
- Cards: Backdrop blur + border gradients
- Interactions: Magnetic pull, cursor scaling
- Motion: GSAP for complex timelines, Framer for declarative

## 🔍 SEO & Performance

**next.config.ts highlights**:
- Image optimization (WebP/AVIF, device sizes)
- Static asset caching (1 year immutable)
- Three.js GLSL loader
- Custom headers (DNS prefetch, security)

**Deployed at**: [hossamhassan.dev](https://hossamhassan.dev)

## 🙌 Acknowledgments

Built with ❤️ using modern web standards. View [resume](public/Hossam-Hassan-Resume.pdf).

---

⭐ **Star on GitHub** · 🐦 [Follow @hossamhassan](https://x.com/hossamhassan) · 📧 [Get in touch](mailto:hossamhassan112003@gmail.com)

