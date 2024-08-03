# StudyBuddy

Improve your learning skills with an all-in-one education assistant with unlimited MCQ and flashcard generation. Practice for standardized test, difficult subjects, and active recall.

# # Features
Dashboard Overview
![Dashboard and Statistics Page](https://github.com/user-attachments/assets/cdc9b76b-fbb6-4ea3-99d8-433935325c53)

Responsive Onboarding
![Onboarding](https://github.com/user-attachments/assets/3617e8c8-9511-4462-90ef-a42773edd12e)

<!--
**Link to project:** [http://yourstudybuddy.vercel.app](http://yourstudybuddy.vercel.app)
-->

## How It's Made

**Front-end**: React, Next.js, Tailwind CSS

**Backend**: MongoDB, Prisma ORM

**APIs**: Resend (Emailing/Authentication), NextAuth (Authentication)

**File Storage**: MongoDB Atlas

**Hosting**: Vercel (frontend)

## Lessons Learned
Most of the team members learned how to effectively use NextJS to develop a dynamic frontend and easy-to-use UI for users even though it was the first time deploying it onto a project for some of us.  We were also now more experienced with using AI tools on the backend including using GPT's APIs to generate content in flashcards, and all of us sharpened our skills in debugging and problem solving as we stumbled across errors and challenges throughout the hackathon. We learned to manage a project together as a team and communicate effectively with each other while working on the website. 

## Next.js

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).


## How to run

### Requirements

python 3 and pip

nodejs and a js package manager of your choise

for best results use pnpm for your package manager

### Step 1

> node setup and run

run ` ./setup.sh ` or ` ./setup.bat ` depending on your os

or if not using pnpm

`<package manager> install`

`<package manager run (ex: npx)> prisma generate`

`<package manager run (ex: npx)> prisma db push`

finally

`pnpm dev` or `<package manager> run dev`

### Step 2

> python setup and run

open a new terminal

`cd ./GPT_API`

`pip install -r ./reqirements.txt`

`python -m flask run`

make sure it is on port 5000 or update .env

.env defualt is `FLASK_API_URL=http://127.0.0.1:5000/`
