# EchoBloom – Wireframes & Prototyping

## Dokumentinformation

* Produktnamn: EchoBloom
* Version: 1.0
* Dokumenttyp: Wireframes & Prototyping
* Fokus: Lean MVP + SaaS onboarding feedback
* Syfte: Visualisera produktens första version före utveckling

---

# 1. Designprinciper

## 1.1 Produktkänsla

EchoBloom ska kännas:

* modern
* smart
* snabb
* premium SaaS
* AI-native men mänsklig
* enkel att förstå

## 1.2 Designord

* clean
* confidence
* clarity
* momentum
* insight-first

## 1.3 UI-principer

* visa viktigaste insikterna direkt
* få klick till värde
* låg kognitiv belastning
* tydliga CTA-knappar
* datavisualisering utan överdesign

---

# 2. Informationsarkitektur

## Huvuddelar i MVP

1. Login / Signup
2. Dashboard
3. Prompts
4. Responses
5. AI Insights
6. Reports
7. Settings

## Navigering

Desktop: vänstersidebar
Mobil: bottom nav / drawer

---

# 3. Screen 01 – Landing / Marketing Page

## Syfte

Konvertera trafik till signup/demo.

## Wireframe Struktur

### Hero Section

[ Logo EchoBloom ]
Headline:
Understand why users drop off onboarding.

Subheadline:
Collect real-time user feedback inside your product. Let AI turn reactions into action.

CTA Buttons:
[ Start Free Trial ] [ Book Demo ]

Hero Visual:
Dashboard preview + prompt popup

---

### Social Proof Strip

Trusted by modern SaaS teams.
(placeholder logos)

---

### Benefits Grid

* Reduce churn
* Improve onboarding conversion
* AI-powered summaries
* Launch in minutes

---

### Footer CTA

See what users feel before they leave.
[ Get Started ]

---

# 4. Screen 02 – Signup Flow

## Goal

Skapa konto på under 2 minuter.

## Step 1

Email
Password
Create Account

## Step 2

Company Name
Company Website
Team Size

## Step 3

What do you want to improve?
( ) Onboarding
( ) Activation
( ) Retention
( ) Feature launches

## Step 4

Success screen:
Your workspace is ready.
[ Create First Prompt ]

---

# 5. Screen 03 – Main Dashboard (Core MVP)

## Layout

---

## Sidebar | Main Content                        |

## Sidebar

* Dashboard
* Prompts
* Responses
* Reports
* Billing
* Settings

---

## Top Bar

Workspace Name
Search
Notifications
User Avatar

---

## KPI Cards Row

[ Response Rate ]
[ Avg Sentiment ]
[ Negative Trend Alerts ]
[ Active Prompts ]

---

## Main Section Left

### Sentiment Over Time Chart

Line graph: positive / neutral / negative

### Onboarding Drop-Off Feedback Themes

* Confusing setup
* Too many steps
* Missing integrations
* Slow loading

---

## Main Section Right

### AI Summary Card

"Users are generally positive, but frustration spikes after setup step 2. Most common complaint is unclear instructions."

### Recommended Action Card

* Simplify Step 2 copy
* Add progress indicator
* Improve integrations messaging

---

# 6. Screen 04 – Prompts Manager

## Purpose

Skapa och hantera prompts.

## Header

Prompts
[ + Create Prompt ]

## Prompt Table

---

## Name | Trigger | Status | Responses | Actions

Setup Ease Check | After Signup | Active | 124 | Edit
Confusion Pulse | Step 2 | Active | 87 | Edit
First Impression | Day 3 | Paused | 54 | Edit

---

## Create Prompt Modal

Prompt Name
Question Text
Type:
( ) Text
( ) Rating 1–5
( ) Emoji

Trigger:
( ) After Signup
( ) First Login
( ) Step Completed
( ) X Minutes Active

Buttons:
[ Save Draft ] [ Activate ]

---

# 7. Screen 05 – Responses View

## Purpose

Se rådata + filter.

## Filters Row

Date Range
Prompt
Sentiment
User Segment

## Response Feed

---

😕 "I got stuck connecting my account"
Negative | Step 2 | 2 min ago
-----------------------------

🙂 "Pretty easy setup actually"
Positive | Signup | 5 min ago
-----------------------------

😐 "Not sure what to do next"
Neutral | First Login | 8 min ago
---------------------------------

---

# 8. Screen 06 – AI Insights Page

## Goal

Visa mönster istället för råsvar.

## Blocks

### Theme Detection

1. Setup confusion (34%)
2. Missing integrations (22%)
3. Positive first impression (18%)

### Emotional Map

Frustration ↑ after step 2
Confidence ↑ after completion

### Suggested Actions

* Reduce fields in setup form
* Add checklist
* Explain integrations earlier

### Weekly Summary Export

[ Generate Report ]

---

# 9. Screen 07 – Reports Page

## Report Types

* Weekly onboarding summary
* Prompt performance report
* Sentiment trend report
* Executive summary PDF

## Table

Name | Created | Type | Download

---

# 10. Screen 08 – In-App Prompt Widget (Desktop)

## Trigger Example

Efter signup.

---

How easy was setup today?

😀 😐 😕 😡

Tell us more (optional)
[ text field ]

## [ Skip ] [ Submit ]

## UX Rules

* max 1 question åt gången
* dismiss möjlig
* visas ej igen direkt
* snabb att svara på under 10 sekunder

---

# 11. Screen 09 – Mobile Prompt Widget

---

Quick question 👋
How clear was setup?

1 2 3 4 5

Anything unclear?
[text]

## [ Submit ]

Mobilanpassad bottom sheet.

---

# 12. Core User Flows

## Flow A – Customer Admin

Signup → Create Workspace → Create Prompt → Activate → View Responses → Read AI Summary

## Flow B – End User

Complete Signup → Prompt appears → Answer in 5 sec → Continue product flow

## Flow C – Weekly Review

Login → Dashboard → AI Insights → Export report → Product team meeting

---

# 13. Clickable Prototype Prioritet (Figma senare)

## Must Prototype First

1. Landing Page
2. Signup Flow
3. Dashboard
4. Create Prompt Modal
5. Prompt Widget

## Nice To Have

6. Reports
7. Billing
8. Team Settings

---

# 14. Visual Direction

## Colors

Primary: modern purple / blue gradient
Neutral: white / slate / soft gray
Success: green
Warning: amber
Negative: red

## Typography

Modern SaaS sans-serif
Tydlig hierarchy

## Cards

Rounded corners
Soft shadows
Comfortable spacing

## Motion

Subtle transitions
Micro-interactions on charts/cards

---

# 15. UX Success Metrics

* signup completion > 60%
* first prompt created < 5 min after signup
* dashboard comprehension high in usability tests
* end-user prompt completion > 30%
* low annoyance complaints

---

# 16. My Recommendation Before Build

Design should feel like premium B2B SaaS, not survey software.

EchoBloom sells confidence and speed.
Not forms.

---

# 17. Next Recommended Documents

1. Business Plan
2. Pitch Deck
3. GTM Sales System
4. Brand Identity
5. Figma High Fidelity UI
