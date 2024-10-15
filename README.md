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

## Disclaimer

> [!CAUTION]
> ### Important Notice
>
>  This project is currently in **early development** and is **not ready for deployment or public use**. We are actively working on new features and optimizations, and as such, the codebase is subject to significant changes. A **limited alpha test** is planned for early **2025**.
> 
> ### Code Usage and Distribution
>
> All code within this repository is **proprietary and confidential**. Unauthorized distribution, copying, or use of the code in any form is **strictly prohibited**. Please **do not distribute or use** any part of this code without explicit permission from the Qwizz team.

---

## Overview

Qwizz is an **all-in-one personalized education assistant** designed to **revolutionize** how students learn and retain information. Empowering learners of all ages and backgrounds, Qwizz goes beyond traditional studying by integrating **AI-powered tools** with intuitive features to ensure you absorb and retain meaningful knowledge for **long-term success**.

---

## Features

- **Highly Intuitive Design**: Qwizz boasts a modern, minimalistic, and user-friendly interface built with **glassmorphism**. Smooth animations, dynamic shadows, and cursor-tracked visuals make learning engaging and visually appealing, catering to students of all levels.

- **Dashboard Overview**: Access real-time statistics with smooth animations for an interactive experience.
  <p align="center">
    <img src="https://github.com/user-attachments/assets/33cfdb54-187d-4814-b175-21fbe5fedc0e" alt="Dashboard and Statistics Page" width="600">
  </p>

- **Responsive Onboarding**: Easily upload documents and utilize advanced OCR via Tesseract.js, linked to local storage for a refresh-resistant experience.
  <p align="center">
    <img src="https://github.com/user-attachments/assets/3617e8c8-9511-4462-90ef-a42773edd12e" alt="Onboarding" width="600">
  </p>


- **Magic Notes** *(In Development)*: A smart, interactive note-taking feature where you can perform **smart analysis**, **create mind maps**, **fact-check**, and receive **instant summarization**. Themed around casting spells, Magic Notes transforms disorganized information into structured, insightful learning resources.

- **Memory Vault** *(In Development)*: Your personal "second brain" to store important knowledge, ensuring you retain and recall critical information over time.

- **Active Memory Recall** *(In Development)*: An advanced algorithm that personalizes your learning experience, optimizing for **long-term retention** and **active recall**.

- **Flashcards** *(Completed)*: **AI-powered flashcard generation** from your study materials to enhance learning and retention.

- **Knowledge Web** *(In Development)*: Visualize how concepts and ideas interconnect in a **node-web structure**. Build a map of your mind to understand how concepts relate and build upon one another.

- **Study Planning & Notifications** *(In Development)*: Integrated study planning features connect directly to the **Google Calendar API**, allowing you to plan your study schedules seamlessly. Stay consistent with notifications and reminders to keep you on track with your goals.

---

## Project Status

Our mission is to **seamlessly integrate learning tools** into students' study routines through a unified platform that offers note-taking, concept mapping, quizzes, and study planning. We aim to help users **retain knowledge for a lifetime** by fostering long-term learning habits rather than relying on cramming.

### In Development

- [ ] **New Features: Magic Notes, Memory Vault, Knowledge Web**
- [ ] More robust, personalized **Active Memory Recall**
- [ ] **Study Planning & Notifications**
- [ ] Personalized shuffle and "next-up" algorithm
- [ ] **Integration with popular learning management systems (e.g., Notion)**
- [ ] **Personalized shuffle algorithm** for enhanced active recall
- [ ] **Robust fact-checking** for optimal accuracy
- [ ] Better mobile support
- [ ] **Deployment of backend** to sustainable services with GPU access
- [ ] **Automated testing pipeline**
- [ ] **Dockerization** of the application for easier deployment

### Completed

- [x] **Flashcards** feature for enhanced learning and retention
- [x] Designed and implemented the dashboard UI
- [x] Implemented a robust user authentication system with settings, confirmation emails, password changing, and more
- [x] Set up a MongoDB database with Prisma ORM, connected with the OpenAI API using Flask
- [x] Developed an **AI-powered learning system** accepting long context files for optimal question and flashcard generation
- [x] Implemented basic **fact-checking** for material generation
- [x] Enabled document upload functionality
- [x] Integrated Tesseract.js for OCR capabilities
- [x] Created an intuitive and modern, sleek design

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
    <td>Resend (Emailing/Authentication), Auth.js (Authentication), Tesseract.js (OCR)</td>
  </tr>
  <tr>
    <td><strong>Hosting</strong></td>
    <td>Vercel (full-stack)</td>
  </tr>
</table>

---

## Lessons Learned

Our team gained valuable experience in:

- Effectively using Next.js for dynamic **full-stack** development
- Implementing AI tools on the backend, including GPT's APIs for content generation
- Debugging and problem-solving in a hackathon environment
- Project management and effective team communication

---

## How to Run

*This section is currently intended for internal team use. Since the project is proprietary and not open for public deployment, we are not providing detailed setup instructions at this time. The below instructions are irrelevant for personal usage*

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
<package manager run (e.g., npx)> prisma generate
<package manager run (e.g., npx)> prisma db push
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

## FAQ

### 1. What is Qwizz?

**Qwizz** is an all-in-one personalized education assistant designed to revolutionize how students learn and retain information. By integrating AI-powered tools with intuitive features, Qwizz helps you absorb and retain meaningful knowledge for long-term success.

### 2. How does Qwizz protect my data privacy?

We take your privacy seriously. Qwizz complies with the **Family Educational Rights and Privacy Act (FERPA)** to protect your educational records. We implement appropriate security measures to safeguard your personal information and do not share your data with third parties without your explicit consent.

### 3. Can I use or contribute to the Qwizz codebase?

At this time, Qwizz is a **proprietary project under active development**, and we are not accepting external contributions. The code is not available for public use or distribution. We appreciate your interest and encourage you to check back after our planned alpha release in early 2025.

### 4. When will the alpha test be available?

We are planning a **limited alpha test** for early **2025**. Stay tuned for updates by following our announcements.

### 5. How can I participate in the alpha test?

Details about participating in the alpha test will be shared closer to the release date. Keep an eye on our official channels for the opportunity to sign up.

### 6. What features will be available in the alpha test?

The alpha test will focus on core features like **Magic Notes**, **Memory Vault**, and **Active Memory Recall**, allowing us to gather valuable feedback for improvements.

### 7. Is my data safe during the alpha test?

Yes, even during the alpha phase, we are committed to ensuring your data's security and privacy in compliance with FERPA and our Privacy Policy.

<details>
<summary>
  hidden info
</summary>
### 3. What personal information does Qwizz collect?

When you use Qwizz, we may collect:

- **Contact Information**: Name and email address.
- **Authentication Data**: OAuth tokens from third-party services.
- **User Content**: Documents you upload, chat messages, and responses.
- **Usage Data**: Scores, feedback, and interaction history.
- **Calendar Information**: If you integrate with Google Calendar.

### 4. How is my data used?

Your data is used to:

- Create and manage your account securely.
- Provide and improve our services, including personalized feedback.
- Communicate updates and support messages.
- Enhance your learning experience through analytics.
- Comply with legal obligations, including FERPA.

### 5. Is my data shared with third parties?

We only share your information in the following circumstances:

- **With Your Consent**: If you give explicit permission.
- **Service Providers**: Trusted third-party vendors who assist in providing our services.
- **Legal Requirements**: When required by law.

### 6. What is FERPA and how does Qwizz comply with it?

FERPA is a federal law that protects the privacy of student education records. Qwizz complies by:

- Allowing you to access and control your educational records.
- Implementing security measures to protect your data.
- Not disclosing your information without consent, except as permitted by FERPA.

### 7. How do the pricing tiers work?

We offer three pricing tiers to suit different needs:

- **Free Tier**: Basic access with limited features, ideal for casual users.
- **Pro Tier** ($9/month): Additional content sets, AI credits, and enhanced features.
- **Wizard Tier** ($19/month): Unlimited access to all features, highest AI credits, and premium support.

### 8. What are AI credits?

**AI credits** are units that allow you to utilize our AI-powered features, such as generating content sets, Magic Notes, and more. Each action may consume a certain number of credits based on its complexity.

### 9. Can I upgrade or downgrade my plan?

Yes, you can upgrade or downgrade your subscription at any time based on your learning needs.

### 10. How does the Magic Notes feature work?

**Magic Notes** is an AI-powered note-taking tool that allows you to perform smart analysis, create mind maps, fact-check, and receive instant summarizations. The level of features available depends on your subscription tier.

### 11. Is there a free trial available?

We offer a **Free Tier** that you can use to get started and explore basic features before deciding to upgrade.

### 12. How can I delete my account or data?

You have the right to delete your account and personal data at any time. Please contact us at **[Email Address]** to initiate the process.

### 13. What kind of customer support is available?

- **Free Tier**: Limited access to customer support.
- **Pro Tier**: Priority customer support.
- **Wizard Tier**: Dedicated customer support with a personal assistant.

### 14. How often is new content or features added?

We are continually developing Qwizz to add new features and improve existing ones. Stay tuned for updates and check our roadmap for upcoming releases.

### 15. How can I provide feedback or report issues?

We value your feedback! Please contact us at **[Email Address]** to share your thoughts or report any issues.
</details>

---

<p align="center">
  <a href="https://nextjs.org/">Next.js</a> •
  <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">create-next-app</a>
</p>

<p align="center">Made with ❤️ by the Qwizz team © 2024</p>
