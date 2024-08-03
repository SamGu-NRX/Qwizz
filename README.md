<h1 align="center">StudyBuddy</h1>

<p align="center">
  <strong>Improve your learning skills with an all-in-one education assistant.</strong><br>
  Unlimited MCQ and flashcard generation for standardized tests, difficult subjects, and active recall.
</p>

---

## Features

### Dashboard Overview
Smooth animations and real-time statistics
<p align="center">
  <img src="https://github.com/user-attachments/assets/33cfdb54-187d-4814-b175-21fbe5fedc0e" alt="Dashboard and Statistics Page" width="600">
</p>

### Responsive Onboarding
Document upload + OCR detection linking to local storage (refresh resistant)
<p align="center">
  <img src="https://github.com/user-attachments/assets/3617e8c8-9511-4462-90ef-a42773edd12e" alt="Onboarding" width="600">
</p>

## How It's Made

<table>
  <tr>
    <td><strong>Front-end</strong></td>
    <td>React, Next.js, Tailwind CSS</td>
  </tr>
  <tr>
    <td><strong>Back-end</strong></td>
    <td>MongoDB, Prisma ORM</td>
  </tr>
  <tr>
    <td><strong>APIs</strong></td>
    <td>Resend (Emailing/Authentication), NextAuth (Authentication), Tesseract.js (OCR)</td>
  </tr>
  <tr>
    <td><strong>Hosting</strong></td>
    <td>Vercel (frontend)</td>
  </tr>
</table>

## Lessons Learned

Our team gained valuable experience in:
- Effectively using NextJS for dynamic frontend development
- Implementing AI tools on the backend, including GPT's APIs for content generation
- Debugging and problem-solving in a hackathon environment
- Project management and effective team communication

## How to Run

### Requirements
- Python 3 and pip
- Node.js and a JS package manager (pnpm recommended)

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
cd ./GPT_API
pip install -r ./requirements.txt
python -m flask run
```
> Ensure the Flask app runs on port 5000 or update the `.env` file accordingly.
> Default: `FLASK_API_URL=http://127.0.0.1:5000/`

---

<p align="center">
  <a href="https://nextjs.org/">Next.js</a> •
  <a href="https://github.com/vercel/next.js/tree/canary/packages/create-next-app">create-next-app</a>
</p>
