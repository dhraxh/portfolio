# Dheekshith — Portfolio

Next.js (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion. Fully static, no backend.

## Edit your content

| What | Where |
| --- | --- |
| Name, bio, links, education, skills, projects | `src/data/portfolio.ts` (search for `TODO`) |
| Resume | `public/resume.pdf` (replace the placeholder) |
| Project screenshots | `public/projects/` (then update `image` in the data file) |
| Avatar photo (optional) | `public/avatar.jpg` and set `avatar: "/avatar.jpg"` |
| Favicon | `src/app/icon.svg` |
| Social share image | generated automatically by `src/app/opengraph-image.tsx` |

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Deploy to Vercel

1. Push this folder to a new GitHub repo.
2. Go to https://vercel.com/new, import the repo, and click **Deploy** (defaults are correct).
3. Optional: if you add a custom domain, set the env var `NEXT_PUBLIC_SITE_URL=https://your-domain.com` in Vercel → Settings → Environment Variables and redeploy.
