<h1 align="center">Qwizz</h1>

<p align="center">
  <strong>Revolutionize your learning with Qwizz – your all-in-one, personalized education assistant.</strong><br>
  Integrate AI-powered tools to absorb and retain knowledge for long-term success.<br>
  Unlimited MCQ, flashcard generation, and more for standardized tests, difficult subjects, and active recall.<br>
</p>

<p align="center">
  <a href="https://devpost.com/software/studybuddy-qgdn7b">Best Education Project</a> • Boost Hacks II
</p>

---

## Overview

Qwizz is an **all-in-one personalized education assistant** designed to revolutionize how students learn and retain information, empowering learners of all ages, backgrounds, and grade levels. It goes beyond just studying—it integrates **AI-powered tools** with intuitive features to ensure learners can absorb and retain meaningful knowledge for **long-term success**.

---

## Features

### Magic Notes (In Development)
A smart, interactive note-taking feature where users can perform **smart analysis**, **create mind maps**, **fact-check**, and receive **instant summarization**. Themed around casting spells, Magic Notes transforms disorganized information into structured, insightful learning resources.

### Memory Vault (In Development)
A "second brain" feature where users can store important knowledge, ensuring they retain and recall critical information over time. It helps students **save and lock away** their most important learnings for when they are needed most.

### Active Memory Recall (In Development)
An advanced algorithm to personalize the learning experience, optimizing for **long-term retention** and **active recall**.

### Flashcards (Completed)
**AI-powered flashcard generation** from your study materials to enhance learning and retention.

### Knowledge Web (In Development)
Visualize how concepts and ideas interconnect in a **node-web structure**. Build a map of your mind to understand how concepts relate and stack upon one another for **long-term retention**.

### Study Planning & Notifications (In Development)
Integrated study planning features connect directly to the **Google Calendar API**, allowing you to plan your study schedules seamlessly. Stay **consistent** with notifications and reminders to keep you on track with your goals.

### Dashboard Overview
Smooth animations and real-time statistics.
<p align="center">
  <img src="https://github.com/user-attachments/assets/33cfdb54-187d-4814-b175-21fbe5fedc0e" alt="Dashboard and Statistics Page" width="600">
</p>

### Responsive Onboarding
Document upload & advanced OCR (server computing via Tesseract.js) linking to local storage (refresh resistant).
<p align="center">
  <img src="https://github.com/user-attachments/assets/3617e8c8-9511-4462-90ef-a42773edd12e" alt="Onboarding" width="600">
</p>

---

## How It's Made

<table>
  <tr>
    <td><strong>Front-end</strong></td>
    <td>React, Next.js, Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>Back-end</strong></td>
    <td>MongoDB, Prisma ORM, Flask</td>
  </tr>
  <tr>
    <td><strong>APIs</strong></td>
    <td>Resend (Emailing/Authentication), NextAuth (Authentication), Tesseract.js (OCR)</td>
  </tr>
  <tr>
    <td><strong>Hosting</strong></td>
    <td>Vercel (full-stack)</td>
  </tr>
</table>

---

## Project Status

### Goals
- **Seamlessly integrate learning tools** into students' study routines through a unified platform that offers note-taking, concept mapping, quizzes, and study planning.
- Help users **retain knowledge for a lifetime** by creating long-term learning habits rather than relying on cramming for exams.
- Enable students to excel in school and exams by preparing them with personalized study plans, intelligent tools, and reminders, ensuring they consistently stay on top of their learning journey.

### To-Do
- [ ] Develop even more personalized shuffle algorithm for better active recall
- [ ] Implement more robust fact-checking for optimal accuracy
- [ ] Integrate with popular learning management systems (such as Notion)
- [ ] Deploy backend to sustainable service (GPU access)
- [ ] Set up automated testing pipeline
- [ ] **Dockerize** the application for easier deployment

### Completed
- [x] Designed and implemented dashboard UI
- [x] Implemented robust user authentication system with settings, confirmation emails, password changing, and more
- [x] Set up MongoDB database with Prisma ORM, connected with OpenAI API using Flask
- [x] **AI-powered learning system** accepting long context files for optimal question and flashcard generation
- [x] Basic **fact-checking** for material generation
- [x] Implemented document upload functionality
- [x] Integrated Tesseract.js for OCR capabilities
- [x] Created mobile-responsive design
- [x] Completed **Flashcards** feature for enhanced learning and retention

---

## Design & Theme

Built with **modern glassmorphism**, Qwizz offers a smooth and interactive user experience, with hover animations, dynamic shadows, and cursor-tracked visuals that make learning both engaging and visually appealing.

Qwizz embraces a **wizard/magic theme**, where features are framed as spells and magical tools to make the learning process feel exciting and less technical, particularly appealing to students.

---

## Target Audience

Designed for students of all levels, Qwizz aims to **simplify complex subjects**, making learning engaging and effective. It offers personalized tools for students prepping for school exams, while also fostering **deep learning and retention** for lifelong knowledge.

---

## How to Run

### Requirements
Before you begin, ensure you have met the following requirements:

- A modern web browser
- Python 3 and pip
- Node.js installed on your machine
- A JS package manager (pnpm recommended)

### Step 1: Node Setup and Run
```bash
# Using pnpm (recommended)
./setup.sh  # or ./setup.bat on Windows

# Or, if not using pnpm
<package manager> install
<package manager run (ex: npx)> prisma generate
<package manager run (ex: npx)> prisma db push
<package manager> run dev
```

### Step 2: Python Setup and Run
```bash
cd ./Backend
pip install -r ./requirements.txt
python -m flask run
```
> Ensure the Flask app runs on port 5000 or update the `.env` file accordingly.
> Default: `FLASK_API_URL=http://127.0.0.1:5000/`

### Step 3: Run Next.js Dev Server
```bash
cd ..
next dev  # or npm/pnpm run dev, depending on your setup
```

---

<p align="center">
  <a href="https://nextjs.org/">Next.js</a> •
  <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">create-next-app</a>
</p>
