# SARDYX — AI Agency Website

A futuristic, premium AI agency website built with **Next.js 15**, **Tailwind CSS**, **Framer Motion**, and **Supabase**.

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS + custom glassmorphism
- **Animations**: Framer Motion
- **Backend**: Supabase (contact form / leads table)
- **Icons**: Lucide React
- **Language**: TypeScript

## 📦 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/sardyx/sardyx.git
cd sardyx
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

Open `.env.local` and add:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

### 4. Set up Supabase

Create a `leads` table in your Supabase dashboard with these columns:

| Column | Type | Notes |
|--------|------|-------|
| id | uuid | Primary key, default: gen_random_uuid() |
| name | text | |
| email | text | |
| message | text | |
| created_at | timestamptz | Default: now() |

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ☁️ Deploy on Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) → **New Project** → Import your repo
3. Add environment variables in Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Click **Deploy** ✅

## 📁 Project Structure

```
src/
├── app/
│   ├── layout.tsx       # Root layout
│   └── page.tsx         # Home page
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── sections/
│       ├── Hero.tsx
│       ├── About.tsx
│       ├── Services.tsx
│       ├── Portfolio.tsx
│       └── Contact.tsx
└── lib/
    └── supabase.ts      # Supabase client
```

## 🔐 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Your Supabase anonymous/public key |

---

Built by [SARDYX](https://github.com/sardyx)
