# Globetrotter Challenge

Welcome to **Globetrotter Challenge**, a full-stack web app built with Next.js where players guess famous destinations from cryptic clues, unlock fun facts, and challenge friends! This project showcases engaging UI/UX, effective AI utilization, and extensibility.

Live Demo: [Hosted Link](https://tour-play.vercel.app/) <br/>
GitHub Repo: [github.com/RamGoel/tour-play](https://github.com/RamGoel/tour-play) <br/>
Loom Walkthrough: [Video Link](#) _(Replace with your Loom URL)_

## Features

- Displays 1 random clue as a quote for a destination for first 5s & gives 2 point if correct answer.
- If 5s up, then shows second clue, and gives 1 point if correct answer.
- Offers 4 answer options (1 correct, 3 random).
- Provides funky feedback:
  - Correct: Confetti animation + fun fact + success sound
  - Incorrect: Sad face animation + fun fact + failure sound
- Tracks user score (correct/incorrect).
- Includes a "Next Destination" button for continuous play.
- Allows users to enter a unique username.
- Generates a shareable invite link with a dynamic image (via `html-to-image`).
- Shows invitees the inviter’s score on a funky invite page.
- Incorporates animated loader, confetti, and sad face components.
- Ensures responsive design with Tailwind CSS.
- Stores dataset on the backend (API routes).
- Uses Zustand for global state management (username, animations).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Confetti**: [react-confetti](https://www.npmjs.com/package/react-confetti)
- **Image Generation**: [html-to-image](https://www.npmjs.com/package/html-to-image)
- **Backend**: Next.js API Routes
- **Font**: [DM_Sans (Google Fonts)](https://fonts.google.com/specimen/DM_Sans)
- **Database**: [MongoDB](https://www.mongodb.com/)
- **Code Style**: [Prettier](https://prettier.io/)

## Technical Decisions

- **Authentication** - Cookie Based (User Id stored in cookies)
- **Database** - MongoDB (I had more experience with it)
- **Why Username Before Use** - So score can be tracked

## Architecture

```
globetrotter-challenge/
├── app/
│   ├── (private)/
│   │   ├── (game)/
│   │   │   └── game.tsx          # Main game page
│   │   ├── layout.tsx        # Layout for (private) page
│   ├── (public)/
│   │   ├── auth/
│   │   │   └── page.tsx          # Username input page
│   │   ├── invite/
│   │   │   └── page.tsx          # Invite landing page
│   │   ├── page.tsx              # Landing page (SSR)
│   │   ├── favicon.ico           # App favicon
│   │   ├── global.css            # Global styles
│   │   └── layout.tsx            # Root layout
├── components/
│   ├── AnswerOptions.tsx         # Answer buttons
│   ├── ChallengeModal.tsx        # "Challenge a Friend" modal
│   ├── CluesList.tsx             # Clues display
│   ├── Confetti.tsx              # Confetti animation
│   ├── Header.tsx                # Navbar
│   ├── Loader.tsx                # Animated loader
│   ├── QuizFeedback.tsx          # Feedback after answering
│   ├── SadFace.tsx               # Sad face animation
│   ├── StatsHeader.tsx           # Score display
├── lib/
│   ├── axios.ts                  # API client
│   ├── data.ts                   # Static dataset
│   └── store.ts                  # Zustand store
├── public/
│   └── media/                    # Static assets
│   └── sounds/                   # Audio files
├── utils/
│   ├── constants.ts              # App constants
│   ├── helpers.ts                # Utility functions
│   └── types.ts                  # TypeScript types
├── prisma/
│   └── schema.prisma             # Prisma schema (MongoDB)
│   └── client.ts                 # Prisma Client
└── README.md                     # Project documentation
```

- **Pages**:

  - `/` (SSR): Landing page with teaser clue.
  - `/auth`: Username entry (client-side).
  - `/game`: Core gameplay (client-side).
  - `/invite`: Invite landing (client-side).

- **API Routes**:
  - `/auth`: GET/CREATE/UPDATE user info
  - `/get-quiz`: Get Random quiz data

## Setup Instructions

1. **Clone the Repo**:

   ```bash
   git clone https://github.com/your-username/globetrotter-challenge.git
   cd globetrotter-challenge
   ```

2. **Install Dependencies**:

   ```bash
   npm install
   ```

3. **Run Locally**:

   ```bash
   npm run dev
   ```

   Open `http://localhost:3000` in your browser.

4. **Build for Production**:
   ```bash
   npm run build
   npm start
   ```
