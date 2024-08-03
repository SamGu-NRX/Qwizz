# StudyBuddy

[Insert your description here]

include a link and a screenshot (we're front end devs so we can actually see our work!).

**Link to project:** [http://yourstudybuddy.vercel.app](http://yourstudybuddy.vercel.app)

![alt tag](http://placecorgi.com/1200/650)

## How It's Made

**Front-end**: React, Next.js, Tailwind CSS

**Backend**: MongoDB, Prisma ORM

**APIs**: Resend (Emailing/Authentication), NextAuth (Authentication)

**File Storage**: MongoDB Atlas

**Hosting**: Vercel (frontend)

Here's where you can go to town on how you actually built this thing. Write as much as you can here, it's totally fine if it's not too much just make sure you write _something_. If you don't have too much experience on your resume working on the front end that's totally fine. This is where you can really show off your passion and make up for that ten fold.

## Optimizations

_(optional)_

You don't have to include this section but interviewers _love_ that you can not only deliver a final product that looks great but also functions efficiently. Did you write something then refactor it later and the result was 5x faster than the original implementation? Did you cache your assets? Things that you write in this section are **GREAT** to bring up in interviews and you can use this section as reference when studying for technical interviews!

## Lessons Learned:

No matter what your experience level, being an engineer means continuously learning. Every time you build something you always have those _whoa this is awesome_ or _wow I actually did it!_ moments. This is where you should share those moments! Recruiters and interviewers love to see that you're self-aware and passionate about growing.

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
