# VALENCE Valet — Landing Page (Next.js + Tailwind)

### 0) Prereqs
- Node.js 18+ (LTS)
- npm or pnpm

### 1) Install
```bash
npm install
# or: pnpm install / yarn
```

### 2) Run locally
```bash
npm run dev
# then open http://localhost:3000
```

### 3) Deploy (Vercel)
- Create an account at vercel.com
- New Project → Import this repository (or drag & drop the folder)
- Framework: Next.js (auto-detected). Build command: `next build` (auto). Output: `.next` (auto)
- Set `Production` → Deploy → Add custom domain (optional)

### 4) Tailwind note
The `.input` utility is defined in `app/globals.css` via `@apply`. You can add more component-level utilities inside `@layer components`.
