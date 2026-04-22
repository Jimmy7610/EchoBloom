# EchoBloom – Antigravity Build Pack

## Dokumentinformation

* Produktnamn: EchoBloom
* Version: 1.0
* Dokumenttyp: Build Pack / Delivery Blueprint
* Syfte: Ge utvecklingsteam ett tydligt genomförandeunderlag
* Fokus: Lean MVP för snabb launch

---

# 1. Executive Summary

EchoBloom ska byggas som en snabb, modern B2B SaaS-produkt med fokus på onboarding feedback för SaaS-bolag.

Målet med första versionen är inte maximal funktionalitet.
Målet är att:

* gå live snabbt
* kunna sälja direkt
* samla riktig usage-data
* validera willingness to pay
* iterera snabbt efter kundfeedback

Bygg därför enkelt, modulärt och releasebart.

---

# 2. Build Philosophy

## Prioritera alltid:

1. Shipping speed
2. Reliability
3. Simplicity
4. Clear UX
5. Easy iteration

## Undvik tidigt:

* överarkitektur
* microservices i onödan
* enterprise edge cases
* perfekt design före launch
* komplex automation före PMF

---

# 3. Recommended Tech Stack

## Frontend Web App

* Next.js
* React
* TypeScript
* Tailwind CSS
* Component library (clean SaaS style)

## Backend

* Supabase (Auth + DB + Realtime)
  eller motsvarande enkel stack

## AI Layer

* OpenAI API / equivalent LLM provider

## Hosting

* Vercel (frontend)
* Supabase managed backend

## Analytics

* PostHog / lightweight analytics optional

---

# 4. Monorepo Recommendation

/apps/web        -> Dashboard SaaS app
/apps/widget     -> embeddable prompt widget
/packages/ui     -> shared components
/packages/lib    -> shared utils/types/api
/packages/ai     -> summarization + sentiment logic

---

# 5. Core MVP Scope (Do Not Expand)

## Must Ship

* auth
* workspace system
* dashboard shell
* create prompt
* activate/deactivate prompt
* widget prompt display
* collect responses
* basic analytics cards
* AI summary generation
* export simple report

## Not In MVP

* enterprise roles
* advanced permissions
* billing automation v2+
* complex segmentation
* custom ML models
* mobile native apps
* full integrations marketplace

---

# 6. Suggested Sprint Plan (6 Weeks)

# Sprint 0 – Setup (2–3 days)

## Deliverables

* repo init
* CI/CD basic
* env structure
* design tokens
* auth scaffold
* DB schema first pass

---

# Sprint 1 – Core Foundation

## Build

* login/signup
* workspace creation
* protected dashboard routes
* sidebar layout
* top nav shell

## Done When

New user can sign up and enter dashboard.

---

# Sprint 2 – Prompt Engine

## Build

* create prompt form
* prompt types (text/rating/emoji)
* prompt list table
* activate/pause status
* DB persistence

## Done When

Customer can create and manage prompts.

---

# Sprint 3 – Widget + Response Capture

## Build

* embeddable widget loader
* modal / bottom sheet UI
* trigger rules v1
* submit responses
* anonymous session token

## Done When

Prompt can be shown and answered.

---

# Sprint 4 – Dashboard Intelligence

## Build

* response count cards
* sentiment distribution
* response feed
* trend chart basic
* filters by prompt/date

## Done When

Customer sees usable insights.

---

# Sprint 5 – AI Layer

## Build

* classify sentiment
* summarize responses
* detect recurring themes
* recommendation text block

## Done When

AI adds visible value.

---

# Sprint 6 – Polish + Launch

## Build

* onboarding wizard
* empty states
* export CSV/report
* settings basic
* bug fixing
* performance pass
* launch page

## Done When

Product can onboard first paying customers.

---

# 7. Database Schema (MVP)

## users

id
email
name
created_at

## workspaces

id
name
owner_user_id
plan
created_at

## memberships

id
workspace_id
user_id
role

## prompts

id
workspace_id
title
question_text
type
status
trigger_type
created_at

## responses

id
prompt_id
workspace_id
session_ref
rating_value
text_value
sentiment
submitted_at

## insights

id
workspace_id
prompt_id
summary_text
theme_json
updated_at

## reports

id
workspace_id
type
file_url
created_at

---

# 8. API Modules

## Auth API

signup/login/logout/session

## Prompt API

create/list/update/status

## Widget API

fetch active prompt
submit response

## Insights API

dashboard stats
summary data
chart data

## Reports API

generate/export

---

# 9. Widget Embed Strategy

## Option Recommended for MVP

Simple JS snippet:

<script src="widget.js"></script>

Customer installs on app/web product.

## Benefits

* low friction
* fast adoption
* no SDK complexity initially

Later add React SDK / native SDK.

---

# 10. Security Rules

## Must Have

* row level security / workspace isolation
* authenticated dashboard routes
* rate limit response endpoints
* sanitize text input
* secrets in env only
* audit logs later

---

# 11. UX Rules for Build Team

## Dashboard

Should feel premium SaaS, not admin panel.

## Widget

Answer in under 10 sec.

## Empty States

Always helpful.

## First Session

User should create first prompt in <5 min.

---

# 12. Metrics Instrumentation

Track:

* signup completed
* workspace created
* prompt created
* first response received
* report exported
* weekly active workspace

These events matter more than vanity traffic.

---

# 13. QA Checklist Before Launch

* signup works
* forgot password works
* create prompt works
* widget loads externally
* responses save correctly
* dashboard loads fast
* AI summary stable
* no cross-workspace leaks
* mobile responsive acceptable
* error states graceful

---

# 14. Launch Strategy

## Launch Version = v0.1 Paid Beta

Do NOT wait for perfection.
Launch when first 3 customers can get value.

## First Customers Get:

* white glove onboarding
* founder support
* discounted founding pricing

---

# 15. Post Launch Priorities

After real users:

1. improve response rates
   n2. improve summaries
2. reduce onboarding friction inside EchoBloom
3. add top requested features only
4. tighten pricing

---

# 16. Anti-Bloat Rules

If feature request does NOT:

* improve acquisition
* improve retention
* improve revenue
* improve activation

Then delay it.

---

# 17. Antigravity Delivery Rhythm

## Weekly Cadence

Monday: priorities locked
Tuesday–Thursday: build
Friday: QA + deploy + feedback review

## Every Week Ask:

What gets us to paying customers faster?

---

# 18. Founder Dashboard Metrics

Need visible internal metrics:

* trials started
* active workspaces
* prompts created
* avg response rate
* MRR
* churn

---

# 19. Final Recommendation

Build EchoBloom as a weapon, not a monument.

Ship lean.
Learn fast.
Charge early.
Improve weekly.

---

# 20. Immediate Next Deliverables

After build pack:

1. UI Brand System
2. High Fidelity Figma Screens
3. Landing Page Copy Pack
4. Launch Campaign Plan
5. Customer Onboarding Playbook
