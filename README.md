# FitLog — Workout Library

A dark, no-nonsense gym companion. Browse 12 lifts, open a detail page, add workouts to today's plan or save them for later, and watch your minutes and calories add up.

## Technologies Used
- Next.js 14 (App Router)
- React 18 (Context API, hooks)
- Tailwind CSS
- react-hot-toast (notifications)
- react-icons

## Features
1. Fully responsive layout for mobile, tablet and desktop
2. Workout library loaded from a REST API with a loading spinner
3. Sort by duration, calories or rating, plus search by name or muscle tag
4. Workout detail page with specs table and step-by-step instructions
5. Today's Plan (max 5 lifts) and Saved lists with live navbar counters
6. My Plan metrics (exercises, minutes, calories) that update live
7. Mark as done / remove with toast notifications
8. Plan and saved counts start at 0 every time the app opens
9. Custom 404 page

## Getting Started
```bash
npm install
npm run dev
```
Open http://localhost:3000

## Deploy
Push to GitHub and import the repo in Vercel. Next.js handles page reloads on every route.
