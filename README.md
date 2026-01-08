#  CodeRush_E101 – AI Personal Productivity Intelligence Platform

> **An AI-powered decision layer that helps users understand _what to work on next_ by unifying emails, calendar events, and tasks into actionable insights.**

---

##  Problem Statement

Modern professionals interact with multiple tools every day — emails, calendars, task managers, documents — yet still struggle to decide **what truly matters next**.

Despite having data everywhere, there is **no intelligence layer** that:
- Connects signals across tools
- Detects urgency, overload, or conflicts
- Suggests meaningful next actions

---

## 💡 Solution Overview

**CodeRush_E101** is a **Personal Productivity Intelligence Platform** that acts as a **decision layer**, not another task manager.

It:
- Ingests signals from emails, calendar events, and tasks
- Normalizes them into a unified event stream
- Uses AI to analyze importance, urgency, and context
- Surfaces **actionable insights** to the user via a dashboard

>  This is **not spyware** or an OS.  
> All data access is **permission-based** and currently mocked for MVP/demo purposes.

---

##  System Architecture

### High-Level Flow
1. **Data Sources**
   - Gmail API (emails)
   - Calendar API (events)
   - Tasks DB / Mock data

2. **Backend (Node.js + Express)**
   - Ingestion Layer to normalize data
   - AI Analysis Service for prioritization
   - REST API endpoints for frontend consumption

3. **AI Layer**
   - Structured prompt + unified events
   - Gemini client for analysis
   - Outputs structured insights (JSON)

4. **Frontend (Next.js)**
   - Global state via DataContext
   - Dashboard UI showing insights and priorities

---

## 🔧 Tech Stack

### Frontend
- Next.js
- React Context API (Global State)
- Dashboard-based UI

### Backend
- Node.js
- Express.js
- TypeScript

### AI / Intelligence
- Gemini API (via custom client)
- Prompt-based critical analysis
- Structured JSON outputs

### Data Sources
- Gmail API (mocked)
- Calendar API (mocked)
- Tasks DB / mock inputs

---

## 📂 Project Structure (Simplified)

/backend
├─ ingestion/
│ └─ ingest.ts
├─ ai/
│ ├─ criticalAnalysis.ts
│ └─ geminiClient.ts
├─ routes/
│ └─ api.ts

/frontend
├─ context/
│ └─ DataContext.tsx
├─ components/
└─ pages/


