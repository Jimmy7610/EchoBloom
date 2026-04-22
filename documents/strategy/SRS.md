# EchoBloom – Software Requirements Specification (SRS)

## Dokumentinformation

* **Produktnamn:** EchoBloom
* **Version:** 1.0
* **Dokumenttyp:** Software Requirements Specification (SRS)
* **Produktfokus:** AI-driven micro-feedback för onboarding i SaaS-produkter
* **Strategisk riktning:** Lean MVP + nischfokus på SaaS onboarding feedback

---

## 1. Introduktion

### 1.1 Syfte

Syftet med detta dokument är att definiera funktionella och icke-funktionella krav för EchoBloom. Dokumentet ska fungera som grund för produktplanering, UX-design, teknisk arkitektur, prioritering av MVP och senare utveckling.

### 1.2 Produktöversikt

EchoBloom är en SaaS-plattform som hjälper produktteam och UX-team att samla in snabb, kontextuell användarfeedback direkt i en app eller webbtjänst. Plattformen skickar korta prompts till användare vid utvalda tillfällen under onboarding och analyserar svaren med AI för att identifiera sentiment, återkommande problem och möjliga risker för churn.

### 1.3 Affärsmål

EchoBloom ska:

* minska tiden för att förstå användarbeteenden och känslor
* hjälpa SaaS-bolag att förbättra onboarding och retention
* ersätta delar av långsam och dyr traditionell användarundersökning
* ge team snabbare beslutsunderlag genom AI-baserade sammanfattningar

### 1.4 Målgrupp

Primär målgrupp:

* Product Managers på tidiga SaaS-bolag
* UX Designers på tidiga SaaS-bolag
* Founders med produktansvar

Sekundär målgrupp:

* Customer Success-team
* Growth-team
* UX-konsulter och produktbyråer

### 1.5 Avgränsning för MVP

MVP-versionen fokuserar endast på:

* skapande av enkla feedback-prompts
* visning av prompts i produktens onboardingflöde
* insamling av svar
* grundläggande sentimentanalys
* enkel dashboard för insikter
* export av sammanfattningar

MVP-versionen inkluderar inte:

* avancerad beteendeprediktion
* white-label-funktioner
* inbyggd A/B-testning
* fullständig flerkanals-distribution
* avancerad rollhantering för stora organisationer

---

## 2. Problemdefinition

### 2.1 Problem som ska lösas

Traditionell användarundersökning är ofta:

* långsam
* dyr
* svår att skala
* påverkad av bias
* frikopplad från den verkliga användningssituationen

SaaS-bolag har ofta svårt att förstå:

* varför användare hoppar av onboarding
* vilka steg som skapar friktion
* hur nya funktioner faktiskt uppfattas
* vad användare känner i realtid

### 2.2 Lösningsprincip

EchoBloom löser detta genom att:

* skicka korta frågor i rätt kontext
* samla in spontana svar direkt i produkten
* använda AI för att analysera språk, känsla och teman
* presentera detta som tydliga insikter för teamet

---

## 3. Produktvision

### 3.1 Vision

EchoBloom ska bli det snabbaste sättet för SaaS-team att förstå användare i realtid.

### 3.2 Produktlöfte

"Instant community feedback, amplified by AI."

### 3.3 Positionering

EchoBloom positioneras som ett AI-first verktyg för realtidsfeedback under onboarding, mellan traditionella enkätverktyg och avancerade analysplattformar.

---

## 4. Användarroller

### 4.1 Admin

Ansvarar för konto, workspace, billing och övergripande inställningar.

### 4.2 Product Manager

Skapar prompts, ser dashboards, exporterar rapporter och följer sentiment.

### 4.3 UX Designer

Analyserar användarsvar, tematiska kluster och problemområden i onboarding.

### 4.4 End User

Slutanvändaren som får prompten i produkten och lämnar svar.

---

## 5. Användningsfall

### 5.1 Primärt användningsfall

En Product Manager vill förstå varför nya användare hoppar av onboardingflödet. Teamet skapar en prompt som visas efter ett kritiskt steg i onboarding. Svaren samlas in, analyseras och presenteras i dashboarden så att teamet kan prioritera förbättringar.

### 5.2 Sekundära användningsfall

* mäta reaktion på ny funktion under onboarding
* identifiera förvirrande moment i setup
* samla kvalitativ feedback utan att boka intervjuer
* få snabb summering inför sprint-planering

---

## 6. Funktionella krav

### 6.1 Konto och autentisering

Systemet ska:

* låta administratörer skapa konto
* låta användare logga in säkert
* stödja workspace-baserad åtkomst
* låta användare återställa lösenord

### 6.2 Workspace och organisationshantering

Systemet ska:

* låta varje kund ha ett separat workspace
* lagra prompts, svar och rapporter per workspace
* säkerställa att data inte delas mellan kunder

### 6.3 Promptskapande

Systemet ska:

* låta Product Managers skapa korta feedback-prompts
* stödja minst tre prompttyper i MVP:

  * fritextfråga
  * betygsskala 1–5
  * emoji/sentiment-val
* låta användaren namnge prompten internt
* låta användaren välja visningstillfälle
* låta användaren aktivera eller pausa prompten

### 6.4 Triggerlogik för onboarding

Systemet ska:

* stödja visning av prompt efter definierade onboardinghändelser
* stödja minst följande triggerpunkter i MVP:

  * efter registrering
  * efter första login
  * efter första slutförda setup-steg
  * efter viss tid i onboardingflöde
* kunna begränsa hur ofta en prompt visas för samma slutanvändare

### 6.5 Insamling av svar

Systemet ska:

* kunna ta emot svar från slutanvändare i realtid
* lagra svar säkert tillsammans med metadata
* stödja anonyma eller pseudonyma svar beroende på kundens val
* registrera tidpunkt, prompt-ID och kontextinformation

### 6.6 Dashboard

Systemet ska:

* visa antal inkomna svar
* visa svarsfördelning per prompt
* visa grundläggande sentimentanalys
* visa vanliga nyckelord eller teman
* visa trend över tid för en prompt
* låta användaren filtrera per period

### 6.7 AI-analys

Systemet ska:

* analysera fritextsvar och klassificera sentiment som positivt, neutralt eller negativt
* identifiera återkommande teman i fritextsvar
* generera en kort sammanfattning av inkomna svar
* markera möjliga problemområden i onboarding

MVP-nivå för AI ska vara enkel och begriplig, inte full prediktiv analys.

### 6.8 Rapportering och export

Systemet ska:

* låta användaren exportera en sammanfattningsrapport
* stödja export i minst CSV och PDF-format i senare MVP-fas, eller CSV + textbaserad sammanfattning i första versionen
* inkludera promptnamn, svarsmängd, sentimentfördelning och huvudteman i rapporten

### 6.9 Notifieringar

Systemet bör i en senare fas kunna:

* skicka notifiering när negativ feedback ökar kraftigt
* skicka dagliga eller veckovisa sammanfattningar

Detta är inte ett krav för första MVP-releasen.

---

## 7. Icke-funktionella krav

### 7.1 Prestanda

* Dashboardens huvudsidor bör ladda inom 2 sekunder vid normal användning.
* Svar från slutanvändare ska registreras utan märkbar fördröjning.
* Promptvisning ska inte störa eller låsa onboardingflödet.

### 7.2 Skalbarhet

Systemet ska kunna stödja:

* minst 50 kundkonton i tidig drift
* minst 10 000 inskickade svar per månad i första kommersiella fasen
* horisontell expansion i senare versioner

### 7.3 Säkerhet

Systemet ska:

* använda säker autentisering
* skydda kunddata per workspace
* använda kryptering under överföring
* begränsa åtkomst baserat på användarroll

### 7.4 Integritet och dataskydd

Systemet ska:

* utformas med GDPR i åtanke
* undvika att samla in mer persondata än nödvändigt
* ge kund möjlighet att välja anonymiserad feedbackinsamling
* kunna radera data på begäran

### 7.5 Tillgänglighet

Dashboarden bör vara responsiv och användbar på laptop och större surfplattor.

### 7.6 Användbarhet

* Produkten ska vara enkel att förstå utan lång onboarding.
* En Product Manager ska kunna skapa sin första prompt på några minuter.
* Visuella insikter ska vara tydliga och fokuserade på beslut, inte rådata.

### 7.7 Underhållbarhet

Systemet ska byggas modulärt så att följande delar kan utvecklas separat:

* promptmotor
* analysmotor
* dashboard
* integrationslager

---

## 8. Datamodell – konceptuell nivå

### 8.1 Entiteter

Minst följande entiteter ska finnas:

* User
* Workspace
* Prompt
* PromptTrigger
* Response
* AIInsight
* Report

### 8.2 Exempel på attribut

#### User

* id
* name
* email
* role
* workspace_id
* created_at

#### Workspace

* id
* company_name
* subscription_plan
* created_at

#### Prompt

* id
* workspace_id
* title
* question_text
* prompt_type
* status
* created_by
* created_at

#### PromptTrigger

* id
* prompt_id
* trigger_type
* trigger_value
* cooldown_rule

#### Response

* id
* prompt_id
* anonymous_user_ref
* answer_text
* rating_value
* sentiment_value
* context_event
* submitted_at

#### AIInsight

* id
* prompt_id
* summary_text
* theme_labels
* sentiment_distribution
* updated_at

#### Report

* id
* workspace_id
* generated_by
* report_type
* file_reference
* created_at

---

## 9. Systemarkitektur – logisk nivå

### 9.1 Klientlager

* Web dashboard för kunder
* In-app widget eller SDK för feedbackinsamling

### 9.2 Backendlager

* API för autentisering, prompts, svar och rapporter
* databashantering
* åtkomstkontroll per workspace

### 9.3 AI-lager

* textanalys
* sentimentklassificering
* temaklustering
* sammanfattningsgenerering

### 9.4 Export- och rapportlager

* generering av sammanfattningar
* export till filformat

### 9.5 Rekommenderad första arkitektur

För första versionen rekommenderas en enkel men skalbar arkitektur med:

* frontend för dashboard
* backend med databas och auth
* separat AI-service eller AI-modul
* enkel inbäddningsbar widget för promptinsamling

---

## 10. Integrationer

### 10.1 Nödvändiga integrationer för MVP

* autentisering och datalagring
* AI/NLP-tjänst för analys

### 10.2 Möjliga senare integrationer

* Slack
* e-postrapporter
* produktanalysverktyg
* CRM eller supportverktyg

---

## 11. UX-krav

### 11.1 Dashboard

Dashboarden ska:

* ha enkel vänsternavigering eller motsvarande tydlig struktur
* visa viktigaste insikterna direkt
* göra det lätt att skapa ny prompt
* prioritera tydlighet framför avancerad visualisering i MVP

### 11.2 Prompt-widget

Widgeten ska:

* vara diskret men tydlig
* fungera på mobil och desktop
* kunna stängas eller besvaras snabbt
* använda kortfattad text och låg friktion

### 11.3 Rapporter

Rapporter ska:

* vara lätta att läsa
* kunna delas internt
* ge beslutsstöd snarare än rådata dump

---

## 12. Begränsningar och antaganden

### 12.1 Begränsningar

* Första versionen är fokuserad på onboarding-feedback och ska inte försöka lösa alla former av användarresearch.
* AI-insikter i MVP ska vara tillräckligt bra för att skapa värde, men behöver inte vara fullständigt avancerade eller prediktiva.
* Promptlogiken ska initialt hållas enkel för att minska komplexitet.

### 12.2 Antaganden

* Målgruppen accepterar korta in-app frågor om de visas i rätt sammanhang.
* Kunder är villiga att installera en lätt integrationskomponent.
* AI-sammanfattningar ger tillräckligt värde för att motivera betalning redan i tidig version.

---

## 13. MVP-definition

### 13.1 Målet med MVP

Att validera att SaaS-team är villiga att använda och betala för realtidsfeedback under onboarding, samt att AI-baserade sammanfattningar upplevs som användbara.

### 13.2 Vad MVP måste innehålla

* konto och login
* workspace
* skapa prompt
* aktivera prompt
* enkel trigger i onboarding
* samla in svar
* enkel dashboard
* grundläggande sentimentanalys
* exportbar sammanfattning

### 13.3 Vad MVP inte behöver innehålla

* avancerad prediktion
* maskininlärning tränad på egen datamängd
* team-kommentarer och samarbete i appen
* full white-label
* avancerad rollstruktur
* avancerad automatisering

---

## 14. Prioritering av krav

### 14.1 Must Have

* autentisering
* workspace-separering
* promptskapande
* promptvisning
* svarsinsamlingsflöde
* dashboard med grunddata
* enkel AI-sammanfattning

### 14.2 Should Have

* filtrering per period
* enkel export
* fler prompttyper
* enkel historik per prompt

### 14.3 Could Have

* notifieringar
* Slack-integration
* benchmark mellan perioder
* enkel churn-riskflagga

### 14.4 Won’t Have i första MVP

* enterprise-funktioner
* white-label
* full multichannel feedback
* avancerad prediktiv motor

---

## 15. Acceptanskriterier för MVP

MVP ska anses redo när följande kan demonstreras:

1. Ett kundkonto kan skapas och logga in.
2. En Product Manager kan skapa en prompt.
3. Prompten kan visas för en slutanvändare i onboardingflöde.
4. Slutanvändaren kan svara utan tekniska problem.
5. Svaret sparas korrekt i systemet.
6. Dashboarden visar inkomna svar och grundläggande sentiment.
7. Systemet kan generera en enkel sammanfattning av feedback.
8. Data från olika kunder hålls separerad.

---

## 16. Risker

### 16.1 Produktmässiga risker

* användare ignorerar prompts
* kunder upplever att feedbackmängden är för låg
* AI-sammanfattningar upplevs som för generella

### 16.2 Tekniska risker

* triggerlogik blir för komplex för MVP
* textanalys ger låg kvalitet vid små datamängder
* integration i kundens produkt kan skapa friktion

### 16.3 Affärsrisker

* kunder jämför med billigare enkätverktyg
* målgruppen kräver djupare analyser tidigare än planerat

---

## 17. Rekommenderade nästa dokument

Efter denna SRS bör följande dokument tas fram:

1. Produktstrategi och roadmap
2. Business Plan
3. Wireframes och prototyping
4. Go-to-market-plan
5. Pitch deck

---

## 18. Sammanfattning

EchoBloom är definierad som en AI-driven SaaS-produkt för snabb, kontextuell feedback under onboarding. Första versionen ska vara smal, tydlig och lätt att validera kommersiellt. Fokus ligger på att hjälpa SaaS-team förstå vad användare tycker och känner i rätt ögonblick, utan att behöva genomföra långsamma och kostsamma traditionella researchprocesser.
