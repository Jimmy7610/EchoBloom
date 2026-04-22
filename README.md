# 🌸 EchoBloom

**Transform User Feedback into Growth Insights with AI.**

EchoBloom is a powerful, lightweight B2B SaaS platform designed to capture in-app feedback and transform it into actionable intelligence. By combining a framework-agnostic widget with a rule-based AI sentiment engine, EchoBloom helps product teams understand user sentiment at every stage of the onboarding funnel.

---

## 🚀 Features

- **Multi-Modal Prompting**: Create prompts supporting 1-5 star ratings, emoji-based sentiment, and open-ended text feedback.
- **AI-Powered Analytics**: Automated sentiment classification and theme extraction using our custom `@echobloom/ai` engine.
- **Real-Time Dashboard**: Monitor response trends, active campaigns, and negative feedback alerts at a glance.
- **Lightweight Widget**: A <15KB Vanilla JS bundle that integrates seamlessly with any web application using a single script tag.
- **Executive Reporting**: Export all your data to CSV for deeper analysis and stakeholder reporting.
- **Developer-First**: Built with a modern monorepo architecture, ready for rapid scaling.

## 🛠 Tech Stack

- **Frontend**: Next.js 16 (App Router), Tailwind CSS, Lucide Icons.
- **Backend**: Supabase (PostgreSQL, Auth, RLS).
- **Package Management**: NPM Workspaces (Monorepo).
- **Widget**: TypeScript, Vite (IIFE Bundle).
- **Intelligence**: Custom rule-based sentiment module (ready for LLM hot-swapping).

## 🏗 Architecture

EchoBloom is organized as a monorepo for maximum efficiency:

- `apps/web`: The main analytics dashboard and customer portal.
- `apps/widget`: The embeddable feedback widget source.
- `packages/ai`: Shared intelligence layer for sentiment and theme analysis.
- `documents/build`: Database schemas and migration scripts.

## 🏁 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase project

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/Jimmy7610/EchoBloom.git
   cd EchoBloom
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Environment:
   Create `.env.local` in `apps/web` with your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## 📊 Demo Data
To quickly populate your dashboard for a demo, run our seeding script:
```bash
node scripts/seed_demo.js
```

---

## 📄 License
This project is private and intended for internal use and beta testing.

**Built with ❤️ by the EchoBloom Team.**
