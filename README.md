# 🌐 EventSphere — Smart Event Management Platform

<p align="center">
  <strong>A unified, role-based platform for managing modern events from registration to analytics.</strong>
</p>

<p align="center">
  <a href="https://eventsphere-platform-wz3j.bolt.host"><img src="https://img.shields.io/badge/🚀_Live_Demo-EventSphere-0A7CFF?style=for-the-badge" alt="Live Demo"></a>
  <a href="https://github.com/Mrunal-dev05/smart-event-management-platform"><img src="https://img.shields.io/badge/GitHub-Repository-181717?style=for-the-badge&logo=github" alt="GitHub Repository"></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18.3.1-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Vite-5.4-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/Supabase-2.57-3FCF8E?style=flat-square&logo=supabase&logoColor=white" alt="Supabase">
</p>

---

## 📌 Overview

**EventSphere** is a smart event management platform designed to bring the complete event lifecycle into one connected system. It supports **participants, judges, and organizers** with role-specific workflows for registration, check-in, team formation, submissions, judging, leaderboards, and analytics.

The platform is designed for **hackathons, tech fests, conferences, competitions, workshops, and other large-scale events** where multiple disconnected tools can make coordination difficult.

Built during **PromptWars 2026**, organized by **AbhiyantriX** in collaboration with **Hack2Skill** and **Google Developer Groups (GDG)**.

---

## 🚀 Live Demo

**[Open EventSphere →](https://eventsphere-platform-wz3j.bolt.host)**

---

## 🎯 Problem Statement

Large-scale events often rely on separate tools for:

- Registration and attendance
- QR-based check-in
- Team formation
- Announcements
- Project submissions
- Judging and scoring
- Leaderboards
- Event analytics

This can create coordination overhead and fragment the experience for participants, judges, and organizers.

### 💡 Solution

EventSphere connects these workflows through a **single role-based platform**, allowing each stakeholder to manage the part of the event lifecycle relevant to them while keeping the overall process connected.

---

## ✨ Key Features

### 👤 Participant Portal

- 📝 Event registration
- 📱 QR-based check-in
- 🤝 Team discovery and matchmaking
- 📢 Centralized announcements
- 📤 Project submission
- 📈 Progress tracking

### ⚖️ Judge Portal

- 📂 Review project submissions
- 📊 Evaluate projects using structured criteria
- 🏆 Assign scores
- 💬 Provide feedback
- 🔎 Support transparent judging workflows

### 🧑‍💼 Organizer Portal

- 👥 Manage participants and registrations
- 📋 Monitor attendance
- 🤝 Manage teams
- 📦 Track submissions
- ⚖️ Manage judging workflows
- 📊 View leaderboards and analytics

---

## 🔄 Event Lifecycle

```text
Registration → Check-in → Team Formation → Announcements
       → Project Submission → Judging → Leaderboard → Analytics
```

---

## 🏗️ Platform Architecture

```text
                         EventSphere
                              │
             ┌────────────────┼────────────────┐
             │                │                │
        Participant         Judge          Organizer
             │                │                │
      ┌──────┼──────┐    ┌────┼─────┐    ┌──────┼────────┐
      │ Register    │    │ Review   │    │ Participants  │
      │ Check-in    │    │ Score    │    │ Teams         │
      │ Find Teams  │    │ Feedback │    │ Submissions   │
      │ Submit      │    └──────────┘    │ Analytics     │
      └─────────────┘                    └───────────────┘
```

---

## 🛠️ Tech Stack

| Technology | Purpose |
|---|---|
| **React** | Component-based frontend development |
| **TypeScript** | Type-safe application development |
| **Vite** | Development server and production build tooling |
| **Tailwind CSS** | Responsive UI styling |
| **Supabase** | Backend services and data integration |
| **Lucide React** | Interface icons |
| **ESLint** | Code quality and linting |

---

## 📂 Project Structure

```text
smart-event-management-platform/
├── public/
├── screenshots/
│   ├── 1 img.jpeg
│   ├── 2 img.jpeg
│   ├── 3 img.jpeg
│   ├── 4 img.jpeg
│   └── 5 img.jpeg
├── src/
├── package.json
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
└── README.md
```

---

## 📸 Platform Preview

<p align="center">
  <img src="screenshots/1%20img.jpeg" width="31%" alt="EventSphere platform overview">
  <img src="screenshots/2%20img.jpeg" width="31%" alt="EventSphere participant experience">
  <img src="screenshots/3%20img.jpeg" width="31%" alt="EventSphere judging and evaluation">
</p>

<p align="center">
  <b>Platform Overview</b> &nbsp;&nbsp;&nbsp; <b>Participant Experience</b> &nbsp;&nbsp;&nbsp; <b>Judging & Evaluation</b>
</p>

<p align="center">
  <img src="screenshots/4%20img.jpeg" width="31%" alt="EventSphere organizer dashboard">
  <img src="screenshots/5%20img.jpeg" width="31%" alt="EventSphere event management and results">
</p>

<p align="center">
  <b>Organizer Dashboard</b> &nbsp;&nbsp;&nbsp; <b>Event Management & Results</b>
</p>

---

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/Mrunal-dev05/smart-event-management-platform.git
cd smart-event-management-platform
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Vite will start the application in development mode and provide a local URL in the terminal.

### 4. Production Build

```bash
npm run build
```

### 5. Preview Production Build

```bash
npm run preview
```

### 6. Code Quality Checks

```bash
npm run lint
npm run typecheck
```

---

## 🧩 Core Design Principle

```text
Participant → Participate & Collaborate
Judge       → Evaluate & Score
Organizer   → Manage & Analyze
```

The platform is designed around connected workflows rather than treating event management as a collection of isolated features.

---

## 💭 What I Explored

Building EventSphere provided hands-on exploration of:

- Role-based application design
- Product and problem analysis
- Event workflow design
- Dashboard and UI development
- Team matchmaking concepts
- QR-based verification
- Submission management
- Judging and scoring systems
- Leaderboards and analytics
- Responsive web application development

---

## 🔮 Future Improvements

- 🤖 AI-powered team recommendations
- ⚖️ Intelligent judge allocation
- ⚡ Real-time event updates
- 📩 Automated communication
- 🏅 Automated certificate generation
- ☁️ Scalable cloud infrastructure
- 📊 Advanced event analytics
- 🔔 Smart notifications

The long-term vision is to expand EventSphere beyond hackathons to support **college festivals, competitions, conferences, workshops, and developer communities**.

---

## 🏆 Built During

**PromptWars 2026**  
Organized by **AbhiyantriX** in collaboration with **Hack2Skill** and **Google Developer Groups (GDG)**.

---

## 👩‍💻 Developer

**Mrunal Pimpale**  
Computer Engineering Student | Software Development & Algorithms

🔗 **GitHub:** [Mrunal-dev05](https://github.com/Mrunal-dev05)

---

## 📄 License

This project is developed for learning, experimentation, and demonstration purposes.

---

<p align="center">
  ⭐ If you found this project interesting, consider giving the repository a star!
</p>
