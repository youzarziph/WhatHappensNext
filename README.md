# What Happens Next?

AI-powered story prediction engine. Paste any story, anime scene, book chapter, or movie summary and get predictions, character survival chances, and alternative timelines.

## Live Demo

Coming soon — deploying in Phase 5.

## Stack

- **Framework**: Next.js 16 (App Router)
- **Styling**: Tailwind CSS + Inline Styles
- **AI**: Google Gemini 2.5 Flash
- **Database**: MongoDB Atlas
- **Auth**: NextAuth.js v5
- **Charts**: Recharts
- **Animations**: Framer Motion
- **Language**: TypeScript

## Getting Started

1. Clone the repo
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in your keys
4. Run `npm run dev`
5. Open http://localhost:3000

## Environment Variables

```env
GEMINI_API_KEY=your_gemini_api_key
MONGODB_URI=your_mongodb_connection_string
NEXTAUTH_SECRET=your_nextauth_secret
NEXTAUTH_URL=http://localhost:3000
```

## Project Structure

```
app/
  (auth)/
    login/           → Login page
    register/        → Register page
  (dashboard)/
    dashboard/       → Dashboard with stats and charts
    history/         → Prediction history with search and pagination
  api/
    predict/         → POST endpoint for AI predictions
    auth/
      [...nextauth]/ → NextAuth handler
      register/      → Register endpoint
  page.tsx           → Home page
  layout.tsx         → Root layout + providers
components/
  dashboard/
    DashboardCharts.tsx → Recharts bar and pie charts
  layout/
    Navbar.tsx       → Navbar with session state
  prediction/
    PredictionForm.tsx   → Story input form
    PredictionResult.tsx → Prediction results display
  providers.tsx      → SessionProvider wrapper
lib/
  gemini.ts          → Gemini AI client setup
  mongodb.ts         → MongoDB connection
models/
  User.ts            → User schema
  Prediction.ts      → Prediction schema (with index)
services/
  prediction.ts      → AI prompt builder + response parser
  user.ts            → Save predictions, fetch history, dashboard stats
types/
  index.ts           → Shared TypeScript interfaces
auth.ts              → NextAuth config
```

## Features

### Phase 1 — Core Prediction Engine ✅
- Paste any story and get an AI prediction
- Confidence score for the prediction
- Character survival chances with color-coded badges
- Alternative timeline generation
- Genre detection

### Phase 2 — Auth + Database ✅
- User registration and login
- Secure password hashing with bcrypt
- JWT session management
- MongoDB Atlas for data storage
- Navbar updates based on session state

### Phase 3 — Optimization ✅
- Save predictions to MongoDB automatically when logged in
- Prediction history page
- Search by story, genre, or prediction text
- Pagination (5 predictions per page)
- Indexed MongoDB queries for performance

### Phase 4 — Dashboard + Analytics ✅
- Stats cards: total predictions, average confidence, top genre
- Bar chart: predictions over time
- Pie chart: genre breakdown
- Recent activity feed
- Link to full history

### Phase 5 — Deployment (coming soon)
- Deploy to Vercel
- Environment variables setup
- Production testing checklist

## Phase Roadmap

- [x] Phase 1 — Core prediction engine
- [x] Phase 2 — Auth + save predictions (NextAuth + MongoDB)
- [x] Phase 3 — Pagination, search, filtering
- [x] Phase 4 — Dashboard, analytics, charts
- [ ] Phase 5 — Deploy to Vercel