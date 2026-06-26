# What Happens Next?

AI-powered story prediction engine built with Next.js 14, Tailwind CSS, and Google Gemini.

## Setup

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and add your Gemini API key
4. Run `npm run dev`
5. Open http://localhost:3000

## Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS
- **AI**: Google Gemini 1.5 Flash
- **Language**: TypeScript

## Project Structure

```
app/
  api/predict/     → POST endpoint for predictions
  page.tsx         → Home page
components/
  layout/          → Navbar
  prediction/      → PredictionForm, PredictionResult
lib/
  gemini.ts        → Gemini client setup
services/
  prediction.ts    → AI prompt builder + response parser
types/
  index.ts         → Shared TypeScript interfaces
```

## Phase Roadmap

- [x] Phase 1 — Core prediction engine
- [x] Phase 2 — Auth + save predictions (NextAuth + MongoDB)
- [ ] Phase 3 — Pagination, search, filtering
- [ ] Phase 4 — Dashboard, analytics, community voting
- [ ] Phase 5 — Deploy to Vercel