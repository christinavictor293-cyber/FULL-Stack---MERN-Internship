# InnovateCheck: Idea Similarity Assessment Platform

A beginner-friendly React SPA dashboard built with Vite, Tailwind CSS, and small reusable Shadcn-style UI components.

## Features
- Responsive Navbar and Sidebar
- Dashboard summary cards and recent assessments
- Submit a project idea with title, category, description, and comma-separated features
- Simple exact feature matching against sample ideas
- My Ideas page with search and report links
- Assessment report with similarity percentage and matched features

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite (usually http://localhost:5173).

## Important
This is a frontend demonstration. The sample ideas and newly submitted ideas are stored in React state, so they reset when the page is refreshed. MongoDB, Express, Node.js APIs, authentication, and a production similarity algorithm are not connected yet.
