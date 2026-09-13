# 🌐 EventSphere — Smart Event Management Platform

> A unified platform for managing hackathons, tech fests, conferences, competitions, and other large-scale events.

**EventSphere** is a role-based event management platform designed to bring the complete event lifecycle into one place — from registration and check-in to team formation, submissions, judging, leaderboards, and analytics.

Built during **PromptWars 2026**, organized by **AbhiyantriX** in collaboration with **Hack2Skill** and **Google Developer Groups (GDG)**.

---

## 🚀 Live Demo

🔗 **[EventSphere — Live Demo](https://eventsphere-platform-wz3j.bolt.host)**

💻 **[GitHub Repository](https://github.com/Mrunal-dev05/smart-event-management-platform)**

---

## 🎯 Problem

Managing a large-scale event often requires multiple disconnected tools for:

- Registration
- Attendance and check-in
- Team formation
- Announcements
- Project submissions
- Judging
- Leaderboards
- Event analytics

This creates unnecessary coordination overhead for organizers and makes the participant experience fragmented.

### 💡 Our Approach

EventSphere brings these workflows together into a **single centralized platform** with dedicated experiences for participants, judges, and organizers.

---

## ✨ Key Features

### 👤 Participants

- 📝 Event registration
- 📱 QR-based check-in
- 🤝 Team discovery and matchmaking
- 📢 Centralized event announcements
- 📤 Project submission
- 📊 Progress tracking

### ⚖️ Judges

- 📂 Review project submissions
- 📋 Evaluate projects using structured criteria
- ⭐ Assign scores
- 💬 Provide feedback
- 📊 Support transparent judging workflows

### 🧑‍💼 Organizers

- 👥 Manage participants
- 📋 Monitor registrations and attendance
- 🤝 Manage teams
- 📤 Track project submissions
- ⚖️ Manage judging workflows
- 🏆 View leaderboards
- 📈 Access event analytics

---

## 🔄 Event Lifecycle

```text
Registration
     ↓
Check-in
     ↓
Team Formation
     ↓
Announcements
     ↓
Project Submission
     ↓
Judging
     ↓
Leaderboard
     ↓
Analytics
```

EventSphere is designed around this complete lifecycle so that different stakeholders can work on the same platform without switching between multiple tools.

---

## 🛠️ Built With

- **React.js** — Frontend UI
- **TypeScript** — Type-safe development
- **Vite** — Development and build tooling
- **Tailwind CSS** — Responsive UI styling
- **Supabase** — Backend services and database
- **Lucide React** — Interface icons

---

## 🏗️ Platform Architecture

EventSphere follows a role-based application approach where each stakeholder gets access to workflows relevant to their responsibilities.

```text
                    EventSphere
                        │
          ┌─────────────┼─────────────┐
          │             │             │
     Participant       Judge       Organizer
          │             │             │
     ┌────┴────┐    ┌───┴───┐    ┌────┴─────┐
     │Register │    │Review │    │Participants│
     │Check-in │    │Score  │    │Teams       │
     │Teams    │    │Feedback│   │Submissions │
     │Submit   │    └───────┘    │Analytics   │
     └─────────┘                 └─────────────┘
```

---

## 🧩 What I Explored

Building EventSphere provided hands-on exploration of:

- Role-based application design
- Product and problem analysis
- Event workflow design
- Dashboard development
- Team matchmaking concepts
- QR-based verification
- Submission management
- Judging and scoring systems
- Leaderboards
- Event analytics
- Responsive web application development

---

## 📸 Screenshots

## 📸 Screenshots

### 🖥️ Platform Overview

![EventSphere Screenshot 1](screenshots/1%20img.jpeg)

### 👤 Participant Experience

![EventSphere Screenshot 2](screenshots/2%20img.jpeg)

### ⚖️ Judging & Evaluation

![EventSphere Screenshot 3](screenshots/3%20img.jpeg)

### 🧑‍💼 Organizer Dashboard

![EventSphere Screenshot 4](screenshots/4%20img.jpeg)

### 🏆 Event Management & Results

![EventSphere Screenshot 5](screenshots/5%20img.jpeg)

## 🔮 Future Improvements

The platform can be extended with:

- 🤖 AI-powered team recommendations
- ⚖️ Intelligent judge allocation
- ⚡ Real-time event updates
- 📩 Automated communication
- 🏅 Automated certificate generation
- ☁️ Scalable cloud infrastructure
- 📊 Advanced event analytics
- 🔔 Smart notifications

The long-term vision is to expand EventSphere beyond hackathons and support:

**College Festivals • Competitions • Conferences • Workshops • Developer Communities**

---

## ⚙️ Getting Started

### Prerequisites

Make sure you have installed:

- Node.js
- npm

### Clone the repository

```bash
git clone https://github.com/Mrunal-dev05/smart-event-management-platform.git
```

### Navigate to the project

```bash
cd smart-event-management-platform
```

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

The application will be available on the local development server provided by Vite.

---

## 📁 Project Focus

EventSphere focuses on solving a real-world coordination problem through a centralized, role-based platform rather than treating event management as a collection of disconnected features.

The core design principle is:

```text
Participant → Participate & Collaborate
Judge       → Evaluate & Score
Organizer   → Manage & Analyze
```

---

## 🏆 Built During

**PromptWars 2026**

Organized by **AbhiyantriX**  
In collaboration with **Hack2Skill** and **Google Developer Groups (GDG)**

---

## 👩‍💻 Developer

**Mrunal Pimpale**

Computer Engineering Student | Software Development & Algorithms

🔗 GitHub: https://github.com/Mrunal-dev05

---

## 📄 License

This project is developed for learning, experimentation, and demonstration purposes.
