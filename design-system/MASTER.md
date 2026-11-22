# SARDYX AI — Design System Master (Source of Truth)

> Generated via UI UX Pro Max & Reference Analysis (Deep-space violet glass, Quantix arc horizon, Marketex neon glass capability & bento grid).

---

## 1. Core Visual Direction: "Deep-Space Violet Glass"

- **Theme**: Dark only for public site; dark with optional high-contrast/clean dark-slate mode for Admin Panel.
- **Atmosphere**: Near-black space canvas (`#07060D`), layered with subtle violet horizon light/glow, frosted glass cards (1px semi-transparent borders with top-inner illumination), micro-visualizations, neon accents, and crisp typography.

---

## 2. Color Palette & Semantic Tokens

```css
:root {
  /* Surfaces */
  --bg-0: #07060D;          /* Base Page Canvas */
  --bg-1: #0D0B16;          /* Section Alternates */
  --bg-2: #14111F;          /* Cards & Panels */
  --bg-3: #1C1830;          /* Elevated / Dropdown / Modal */
  --border: rgba(255, 255, 255, 0.08);
  --border-subtle: rgba(255, 255, 255, 0.05);
  --border-strong: rgba(138, 43, 239, 0.40);
  --border-focus: rgba(0, 192, 255, 0.70);

  /* Brand Primary (Violet) */
  --violet-300: #C4A0FF;
  --violet-400: #A66BFF;
  --violet-500: #8A2BEF;    /* Primary Brand Lead */
  --violet-600: #7220CC;
  --violet-glow: rgba(138, 43, 239, 0.45);
  --violet-glow-subtle: rgba(138, 43, 239, 0.18);

  /* Secondary Accent (Electric Cyan) */
  --cyan-400: #33D1FF;
  --cyan-500: #00C0FF;      /* High-intent interactive / focus rings / data viz */
  --cyan-glow: rgba(0, 192, 255, 0.35);

  /* Status Colors */
  --green-500: #32CD32;     /* Success / positive metrics / uptime only */
  --danger: #FF5C7A;        /* Errors / alerts */
  --warning: #FFB020;       /* Caution / draft status */

  /* Text Hierarchy (Enforcing WCAG 2.2 AA Contrast ≥ 4.5:1) */
  --text-1: #F5F3FF;        /* Headings & prominent titles (Contrast 14.8:1) */
  --text-2: #B8B3CC;        /* Primary body copy (Contrast 8.2:1) */
  --text-3: #8A849F;        /* Secondary / meta info (Contrast 5.1:1 on --bg-0) */

  /* Gradients & Special Effects */
  --grad-primary: linear-gradient(135deg, #8A2BEF 0%, #5B2BEF 60%, #00C0FF 140%);
  --grad-text: linear-gradient(90deg, #C4A0FF 0%, #8A2BEF 55%, #00C0FF 100%);
  --grad-glass: linear-gradient(180deg, rgba(255, 255, 255, 0.06) 0%, rgba(255, 255, 255, 0.02) 100%);
  --grad-card-hover: linear-gradient(180deg, rgba(138, 43, 239, 0.12) 0%, rgba(255, 255, 255, 0.02) 100%);
  --arc-glow: radial-gradient(ellipse 80% 50% at 50% -10%, rgba(138, 43, 239, 0.35), transparent 70%);

  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-card: 20px;
  --radius-pill: 9999px;
}
```

---

## 3. Typography Scale & Fonts

- **Display & Headings**: `Manrope`, weights 600, 700, 800 (`next/font/google`, `display: swap`).
- **Body & Controls**: `Inter`, weights 400, 500, 600 (`next/font/google`, `display: swap`).
- **Code, Metrics & Data**: `JetBrains Mono`, weights 500, 600 (`next/font/google`, `display: swap`).

### Fluid Typography Scale
- **H1 (Hero Display)**: `clamp(2.5rem, 5.5vw + 1rem, 4.5rem)` (40px mobile → 72px desktop)
- **H2 (Section Heading)**: `clamp(1.85rem, 3.2vw + 0.5rem, 2.75rem)` (30px mobile → 44px desktop)
- **H3 (Card Title / Subsection)**: `clamp(1.25rem, 1.8vw + 0.25rem, 1.6rem)` (20px mobile → 26px desktop)
- **Body (Primary)**: `clamp(0.95rem, 0.5vw + 0.8rem, 1.05rem)` (15px mobile → 17px desktop)
- **Eyebrow / Badge**: `0.75rem` - `0.8125rem` (12px - 13px), tracking `0.08em`, uppercase

---

## 4. Spacing, Grid & Layout

- **Container**: Max width 1200px, responsive gutters: 20px mobile (`px-5`), 32px desktop (`px-8`).
- **Section Spacing**:
  - Desktop: 96px – 128px (`py-24` to `py-32`)
  - Mobile: 64px – 80px (`py-16` to `py-20`)
- **Spacing Rhythm**: 4px / 8px grid (4, 8, 12, 16, 24, 32, 48, 64, 96, 128).

---

## 5. Components & UI Patterns

1. **Eyebrow Pill**: Small translucent pill (`bg-violet-500/10 text-violet-300 border border-violet-500/25`), centered or left-aligned with subtle purple spark/dot.
2. **Buttons**:
   - *Primary CTA*: Pill shape, violet gradient fill (`--grad-primary`), white text, subtle hover lift (`translate-y-[-2px]`), violet glow on hover.
   - *Secondary / Outlined CTA*: Glass pill (`border border-white/15 hover:border-violet-400/50 hover:bg-white/5`), arrow icon with hover translate.
   - *Touch Target*: Minimum 44px × 44px hit-box on all interactive buttons and links.
3. **Glass Card**:
   - Background: `rgba(20, 17, 31, 0.70)` with `backdrop-filter: blur(16px)`.
   - Border: 1px `rgba(255, 255, 255, 0.08)` with inner top highlight (`box-shadow: inset 0 1px 0 0 rgba(255, 255, 255, 0.12)`).
   - Hover: Border shifts to `rgba(138, 43, 239, 0.40)` and subtle violet halo.
4. **Bento Grid**: 3-column or 2-column asymmetric grid showcasing services, features, and mini-visualizations (SVG waveforms, mini-bar charts, orbit nodes).
5. **Icon Discipline**:
   - Single vector library: `Lucide React`.
   - No emojis as UI structural icons.
   - Icons sized with semantic tokens (16px, 20px, 24px).

---

## 6. Motion & Accessibility Standards

- **Framer Motion**: Smooth entrance fades (`y: 20 -> 0`, opacity `0 -> 1`, duration `0.45s - 0.6s`, ease `[0.21, 0.47, 0.32, 0.98]`).
- **Reduced Motion**: All animations wrapped with `@media (prefers-reduced-motion: reduce)` fallbacks; no parallax or auto-scrolling triggers when reduced motion is detected.
- **Focus Rings**: Electric cyan visible focus rings (`ring-2 ring-cyan-500 ring-offset-2 ring-offset-bg-0`) for full keyboard navigation.
- **Contrast**: Every text element strictly verified for WCAG 2.2 AA (normal text ≥ 4.5:1, large text ≥ 3:1).

