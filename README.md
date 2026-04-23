# 🌸 EchoBloom

**Transform User Feedback into Growth Insights with AI.**

EchoBloom is a state-of-the-art, AI-powered onboarding feedback platform designed for SaaS teams. It enables product-led organizations to capture user sentiment at critical friction points and transform raw data into actionable growth strategies using a proprietary sentiment intelligence engine.

---

## 📈 Product Overview

EchoBloom provides a seamless bridge between user experience and product development. By deploying lightweight, non-intrusive feedback prompts, SaaS teams can identify drop-off reasons, celebrate feature wins, and prioritize their roadmap based on real user sentiment rather than intuition.

> [!NOTE]
> EchoBloom is currently in **Public Beta**. We are actively onboarding early partners to refine our AI insights and multi-prompt sequencing.

---

## 🚀 Core Features

- **Multi-Modal Prompting**: Create highly customizable prompts supporting:
  - **1-5 Star Ratings**: For quantitative satisfaction tracking.
  - **Emoji Selection**: For quick, emotional sentiment capture.
  - **Open-Ended Text**: For rich, qualitative insights.
- **AI Sentiment Intelligence**: Automatically classify every response (Positive, Neutral, Negative) and extract recurring themes using our `@echobloom/ai` engine.
- **Interactive Trend Charts**: Visualize sentiment shifts over time with our custom 7-day stacked bar charts.
- **Lightweight Embeddable Widget**: A performance-optimized IIFE bundle (<15KB) that works in any web environment with a single script tag.
- **Onboarding Checklist**: A built-in guide that helps new users reach "Time to Value" instantly.
- **Executive Data Exports**: Download complete response history in CSV format for deep-dive analysis.

---

## 🖼 Screenshots & Demos

<!-- 
PLACEHOLDER: Add your product screenshots to /assets and update the links below.
Example: ![EchoBloom Dashboard](assets/dashboard.png)
-->

| Dashboard Overview | Widget Preview |
| :--- | :--- |
| ![Dashboard Placeholder](https://via.placeholder.com/600x400?text=EchoBloom+Dashboard) | ![Widget Placeholder](https://via.placeholder.com/600x400?text=EchoBloom+Widget) |

---

## 🛠 Tech Stack

- **Dashboard**: [Next.js 16](https://nextjs.org/) (App Router), Tailwind CSS.
- **Infrastructure**: [Supabase](https://supabase.com/) (PostgreSQL, Real-time, Auth, RLS).
- **Package Management**: [NPM Workspaces](https://docs.npmjs.com/cli/v7/using-npm/workspaces) (Monorepo).
- **Widget**: [Vite](https://vitejs.dev/), TypeScript.
- **Icons**: [Lucide React](https://lucide.dev/).

---

## 🏗 Monorepo Structure

```text
EchoBloom/
├── apps/
│   ├── web/          # Next.js Dashboard & Customer Portal
│   └── widget/       # Vanilla JS / Vite Embeddable Widget
├── packages/
│   └── ai/           # Shared Sentiment & AI Intelligence Module
├── documents/
│   └── build/        # Database Schema & Migration SQL
├── scripts/
│   └── seed_demo.js  # Sales Demo Seeding Script
└── README.md
```

---

## ⚙️ Local Development

### 1. Installation
Clone the repository and install the shared dependencies:
```bash
git clone https://github.com/Jimmy7610/EchoBloom.git
cd EchoBloom
npm install
```

### 2. Environment Variables
Create a `.env.local` file in `apps/web/` with the following:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key (only for seeding)
```

### 3. Database Setup
Execute the SQL scripts found in `documents/build/Schema.sql` in your Supabase SQL Editor to initialize the tables and Row Level Security (RLS) policies.

### 4. Running the App
```bash
# Run everything in dev mode
npm run dev

# Or build the widget specifically
npm run build -w @echobloom/widget
```

---

## 📊 Demo / Seed Data

To quickly experience the full power of the AI dashboard, you can populate your workspace with 40+ realistic historical responses:
```bash
# Ensure your service role key is in .env.local
node scripts/seed_demo.js
```

---

## ✅ Current Status

| Component | Status |
| :--- | :--- |
| **Auth & Workspace** | ✅ Stable |
| **Prompt Engine** | ✅ Beta Ready |
| **AI Sentiment** | ✅ Beta Ready (Rule-based) |
| **Reporting** | ✅ Functional (CSV) |
| **LLM Insights** | 🚧 Planned (Sprint 7) |
| **Slack Integration** | 📅 Roadmap |

---

## 📖 Documents / Source of Truth

- **Database**: [Schema definition](documents/build/Schema.sql)
- **AI Engine**: [Logic implementation](packages/ai/src/index.ts)
- **Widget API**: [Route handlers](apps/web/src/app/api/v1/)

---

**Built with ❤️ by Jimmy.**
