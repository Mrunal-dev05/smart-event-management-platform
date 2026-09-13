# 🌐 EventSphere — Smart Event Management Platform

> A unified platform for managing hackathons, tech fests, conferences, competitions, and other large-scale events.

**EventSphere** is a role-based event management platform that brings the complete event lifecycle into one place — from registration and check-in to team formation, submissions, judging, leaderboards, and analytics.

Built during **PromptWars 2026**, organized by **AbhiyantriX** in collaboration with **Hack2Skill** and **Google Developer Groups (GDG)**.

---

## 🚀 Live Demo

🌐 **[Open EventSphere](https://eventsphere-platform-wz3j.bolt.host)**

---

## 🎯 The Problem

Large-scale events often depend on multiple disconnected tools for:

- Registration and attendance
- QR-based check-in
- Team formation
- Announcements
- Project submissions
- Judging and scoring
- Leaderboards
- Event analytics

This creates unnecessary coordination overhead and fragments the experience for participants, judges, and organizers.

### 💡 The Idea

EventSphere brings these workflows together through a **single role-based platform**, giving each stakeholder the tools they need while keeping the overall event lifecycle connected.

---

## ✨ Key Features

### 👤 Participants

- Event registration
- QR-based check-in
- Team discovery and matchmaking
- Centralized announcements
- Project submission
- Progress tracking

### ⚖️ Judges

- Review project submissions
- Evaluate using structured criteria
- Assign scores
- Provide feedback
- Support transparent judging workflows

### 🧑‍💼 Organizers

- Manage participants and registrations
- Monitor attendance
- Manage teams
- Track submissions
- Manage judging workflows
- View leaderboards and analytics

---

## 🔄 Event Lifecycle

```text
Registration → Check-in → Team Formation → Announcements
       → Project Submission → Judging → Leaderboard → Analytics
```

The platform is designed around this lifecycle so stakeholders can work within one connected system instead of switching between multiple tools.

---

## 🛠️ Built With

**React.js · TypeScript · Vite · Tailwind CSS · Supabase**

---

## 📸 Platform Preview

<p align="center">
  <img src="screenshots/1%20img.jpeg" width="30%" alt="EventSphere platform overview" />
  <img src="screenshots/2%20img.jpeg" width="30%" alt="EventSphere participant experience" />
  <img src="screenshots/3%20img.jpeg" width="30%" alt="EventSphere judging and evaluation" />
</p>

<p align="center">
  <sub><b>Platform Overview</b></sub>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <sub><b>Participant Experience</b></sub>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <sub><b>Judging & Evaluation</b></sub>
</p>

<p align="center">
  <img src="screenshots/4%20img.jpeg" width="30%" alt="EventSphere organizer dashboard" />
  <img src="screenshots/5%20img.jpeg" width="30%" alt="EventSphere event management and results" />
</p>

<p align="center">
  <sub><b>Organizer Dashboard</b></sub>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
  <sub><b>Event Management & Results</b></sub>
</p>

---

## 🧩 What I Explored

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

## 🏗️ Platform Architecture

```text
                         EventSphere
                              │
             ┌────────────────┼────────────────┐
             │                │                │
        Participant         Judge          Organizer
             │                │                │
      ┌──────┼──────┐    ┌────┼────┐    ┌──────┼───────┐
      │Register     │    │Review   │    │Participants  │
      │Check-in     │    │Score    │    │Teams         │
      │Find Teams   │    │Feedback │    │Submissions   │
      │Submit       │    └─────────┘    │Analytics     │
      └─────────────┘                   └───────────────┘
```

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

## ⚙️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- npm

### Installation

```bash
git clone https://github.com/Mrunal-dev05/smart-event-management-platform.git
cd smart-event-management-platform
npm install
npm run dev
```

The application will start using Vite's development server.

---

## 🎯 Core Design Principle

```text
Participant → Participate & Collaborate
Judge       → Evaluate & Score
Organizer   → Manage & Analyze
```

EventSphere focuses on solving a real coordination problem through a connected, role-based workflow rather than treating event management as a collection of disconnected features.

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
