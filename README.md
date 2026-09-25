# 🏋️ FitLog — Workout Library & Daily Fitness Planner

FitLog is a dark, responsive, and performance-driven gym companion built with **Next.js (App Router)** and **Tailwind CSS**. It allows lifters to explore detailed workout movements, calculate cumulative workout statistics, and schedule routines seamlessly with instant local persistence.

---

## 🚀 Live Demo & API Endpoints
- **Live URL**: https://fitlog-indol-pi.vercel.app/
- **API Endpoints**: 
  - All Lifts: `https://api.abcz.workers.dev/api/fitlog`
  - Single Detail: `https://api.abcz.workers.dev/api/fitlog/:id`

---

## 🛠️ Technologies Used
- **Framework**: Next.js (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Deployment**: Vercel

---

## ⚡ Key Features (Minimum 5 Covered)

1. **Interactive Workout Library with Sorting & Search**:
   - Fetches workouts directly from the FitLog Cloudflare Workers API.
   - Allows multi-metric sorting by Duration, Calories burned, and Rating with real-time query filtering.

2. **Full-Featured Workout Specification Detail Page**:
   - Dynamic routing (`/workout/[id]`) rendering detailed specs tables (Equipment, Difficulty, Sets, Reps, etc.).
   - Includes ordered step-by-step instruction lists and CTA buttons with animated toast alerts.

3. **Dynamic Daily Plan Manager (`/my-plan`)**:
   - Built-in cap limit protection (maximum 5 lifts per day).
   - Real-time aggregated statistics tracking total selected exercises, cumulative duration minutes, and burned calories.

4. **Status Flags & Organization Tabs**:
   - Separate interactive tabs for **Today's Plan** and **Saved For Later** routines.
   - Completion tracker allowing users to mark exercises as "Done" or remove them instantly.

5. **Client-Side Persistence & Resilient Routing**:
   - Integrated `localStorage` synchronization preventing loss of plan data upon page reload.
   - Custom-designed, branded 404 Error fallback page ensuring zero routing breakage after cloud deployment.

---