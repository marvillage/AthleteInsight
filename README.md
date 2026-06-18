# AthleteInsight

An **Athlete Integrity & Anti-Doping Monitoring** dashboard. Sports authorities can register athletes, track doping-risk scores and biological-passport markers, flag athletes for review, and monitor status across sports — backed by a real Postgres database.

**Stack:** React + Vite + TypeScript · MUI · Recharts · TanStack Query · **Supabase** (Postgres + Auth)

## Features

- 🔐 **Real authentication** — Supabase email/password login; the dashboard is protected behind a session.
- 🗄️ **End-to-end database** — athletes are stored in Postgres. Add, view, and remove athletes; every change persists.
- 📊 **Live dashboard** — highest-risk athletes, status distribution, and metrics computed from real data.
- 🧪 **Athlete profiles** — doping-risk score, performance score, resting HR, VO₂max, hemoglobin (biological-passport markers), and test history.
- 🔎 Searchable, paginated data grid with status chips and risk indicators.

## Setup

### 1. Create a Supabase project
Create a free project at [supabase.com](https://supabase.com).

### 2. Create the schema + seed data
In the Supabase dashboard: **SQL Editor → New query**, paste the contents of [`supabase/schema.sql`](supabase/schema.sql), and **Run**. This creates the `athletes` table with row-level security and 12 seed athletes.

### 3. Create a login user
**Authentication → Users → Add user**. Use:
- Email: `demo@athleteinsight.app`
- Password: `demo12345`
- ✅ Auto Confirm User

(Or any email/password you prefer — update the hint on the login screen.)

### 4. Configure credentials
From **Project Settings → API**, copy the Project URL and the `anon` public key.

Local dev — create a `.env` (see [`.env.example`](.env.example)):
```
VITE_SUPABASE_URL=https://YOUR-PROJECT.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-public-key
```

Production — set the same two variables in your Vercel project's **Environment Variables**.

### 5. Run
```bash
npm install
npm run dev      # local
npm run build    # production build (tsc + vite)
```

## Deployment

Deploys to Vercel as a Vite app (build: `npm run build`, output: `dist`). [`vercel.json`](vercel.json) handles SPA routing. Set the two `VITE_SUPABASE_*` env vars in Vercel before deploying.
