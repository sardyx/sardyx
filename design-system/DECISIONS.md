# SARDYX AI — Design System Decisions & Overrides

This document records the architectural and design reconciliation between automated **UI UX Pro Max** skill recommendations, the **User Brief**, and the **Visual References** (Quantix, Marketex, Futuristic Neons Palette).

---

## 1. Theme & Color Decisions

| Element | UI UX Pro Max Default Output | Reference / Brief Requirement | Winning Decision & Rationale |
|---|---|---|---|
| **Theme Mode** | Auto / Light mode bias (`#F8FAFC` background) | **Dark only** for public site ("Deep-space violet glass") | **Brief wins**: The public site is strictly dark theme (`#07060D`). Dark theme is foundational to the futuristic AI agency identity seen in both references. |
| **Primary Color** | Trust Blue (`#2563EB`) with Orange CTA (`#EA580C`) | Violet (`#8A2BEF`) with Electric Cyan (`#00C0FF`) accent | **Brief wins**: Reference Image 3 ("Futuristic Neons on Dark") and Quantix/Marketex heavily feature the `#8A2BEF` violet glow as primary, with electric cyan for secondary accents. Blue/orange is standard SaaS and lacks the agency punch. |
| **Success Color** | Default green | Neon Green (`#32CD32`) restricted strictly to positive metrics & status | **Brief wins**: Matches the exact hex in the futuristic neon palette; never used as a primary brand element to avoid visual noise. |
| **Surfaces** | Neutral slate light surfaces | Multi-tiered deep obsidian/violet (`#07060D`, `#0D0B16`, `#14111F`, `#1C1830`) | **Brief wins**: Creates genuine depth and glassmorphic contrast with top 1px borders. |

---

## 2. Typography Decisions

| Element | UI UX Pro Max Suggestion | Reference / Brief Requirement | Winning Decision & Rationale |
|---|---|---|---|
| **Heading Font** | Space Grotesk / Inter | **Manrope** (600–800) | **Brief wins**: Manrope delivers geometric modernism without being overly quirky or monospace-like, maintaining high prestige and legibility at large display sizes. |
| **Body Font** | DM Sans / Inter | **Inter** (400–500) | **Harmonized**: Inter provides pristine readability on dark glass backgrounds. |
| **Data / Code Font** | Monospace general | **JetBrains Mono** (500–600) | **Brief wins**: Used for metrics, uptime, pricing tags, and tech stack tags to reinforce engineering credibility. |

---

## 3. Component & Layout Decisions

| Pattern | Skill / Standard | Reference / Brief Requirement | Winning Decision |
|---|---|---|---|
| **Hero Construction** | Generic Hero + Form | Quantix arc glow horizon + centered headline with italic gradient highlight + Marketex floating SVG tech icons + CSS/SVG Mockup | **Hybrid synthesis**: Centered Quantix arc light with glowing horizon behind headline, flanked by clean SVG tech badges (Next.js, Supabase, n8n, Flutter), followed by an interactive dashboard/POS/AI-voice mockup. |
| **Capability Strip** | Standard icon grid | Marketex horizontal 5-item glass strip | **Reference wins**: 5 capability pills (Websites, Cloud POS, Mobile Apps, AI Voice & Chatbots, SEO & Growth) right beneath hero. |
| **Feature Grid** | 3-column equal cards | Bento Grid with mini-visualizations | **Brief & Quantix wins**: Bento cards featuring subtle violet glass, 1px gradient borders, and visual accents (waveform, mini bar chart, orbit nodes). |
| **Client Proof** | Traditional logo marquee (often faked) | **Strictly No Fake Logos**: Replace with real Tech Stack Marquee & verifiable stats | **Brief wins (§0, Non-negotiable Rule 4)**: Never fabricate logos or stats. Showcase real tech stack logos (Next.js, TypeScript, Supabase, Tailwind, Python, n8n, Flutter). |

---

## 4. Accessibility & Contrast Safeguards

- Background canvas: `#07060D`
- Headings (`#F5F3FF`): Contrast ratio = **15.4:1** (AAA standard)
- Body text (`#B8B3CC`): Contrast ratio = **8.5:1** (AAA standard)
- Muted text (`#8A849F`): Contrast ratio = **5.2:1** on `#07060D` and **4.7:1** on `#14111F` (Meets AA minimum 4.5:1 everywhere)
- Interactive Focus: Electric cyan focus outline (`#00C0FF`) with 2px offset ensures 3:1 non-text contrast against dark surfaces.

