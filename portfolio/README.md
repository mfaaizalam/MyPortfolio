# Muhammad Faaiz Alam: 3D Portfolio
React + TypeScript + Tailwind + Three.js (R3F, Drei) + Framer Motion. Contact form runs on a Vercel serverless function using Resend.

## Run locally
```
npm install
cp .env.example .env      # fill in values
npm i -g vercel && vercel dev    # serves site AND /api/contact
```
`npm run dev` runs the frontend only (the contact form needs `vercel dev` or a deployment).

## Deploy (Vercel)
1. Push to GitHub, import the repo in Vercel (Vite preset detected).
2. Add env vars from `.env.example`. Create a Resend API key at resend.com; verify your domain to send from your own address (the `onboarding@resend.dev` sender can only deliver to your Resend account email).
3. Deploy. Test the form on the live URL.

## Replace CV and photo
- CV: overwrite `public/cv.pdf` (keep the name). Your uploaded CV is already included.
- Photo: add `public/profile.jpg`, then set `image:'/profile.jpg'` in `src/config/content.ts`.

## Customise
- `src/config/theme.ts`: colors, font, radius, shadows, animation on/off + intensity, and every 3D setting.
- `src/config/content.ts`: text, skills, projects. Add `github` / `live` URLs per project; buttons appear when set.

## Spam protection
Hidden honeypot field, minimum fill time, per-IP rate limit (5/hour), server-side validation and HTML escaping. For stronger protection add Cloudflare Turnstile verification in `api/contact.ts`.
