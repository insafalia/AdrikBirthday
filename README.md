# Luxury Birthday Invitation

Next.js (App Router) · React · TypeScript · Tailwind · Framer Motion · Canvas scratch card.

## Run it
```bash
npm install
npm run dev      # http://localhost:3000
```

## Make a new invitation — edit ONLY `src/data/birthday.ts`
| To change | Edit in `birthday.ts` |
|---|---|
| Name | `person.name` |
| Age | `person.age` |
| Date / time | `date` ("YYYY-MM-DD") and `time` ("HH:mm", 24h). Countdown, calendar link and text all follow. Also set `events[0].date/time`. |
| Venue | `venue.name`, `venue.address`, `venue.mapsUrl` (any Google Maps share link, no API key) and `events[0].venue` |
| Story / memories | `story` (add or remove items freely) |
| Wording | `invitation`, `welcome`, `final`, `scratch`, `countdown` |
| WhatsApp RSVP | `rsvp.whatsapp` (country code + number, no +) |
| Share preview | `seo` |
| Colours | `theme` (hex values) |

## Photos
1. Put your portrait at `public/images/person.jpg` and set `person.photo` to `/images/person.jpg`.
2. Put gallery photos in `public/images/gallery/` and list them in `gallery.photos` (`src`, `alt`, `caption`). Add as many as you like; the editorial layout repeats automatically. Mix portrait and landscape photos for the best look. The placeholder SVGs can be deleted.
3. WhatsApp preview: add a 1200×630 `public/images/og.jpg`.

## Music
Replace `public/music/birthday.mp3` with your own file (keep the name, or change `music` in `birthday.ts`). Use a royalty-free track. Music starts when guests tap "Tap To Open"; browsers block autoplay before that.

## Deploy to Vercel
1. Push this folder to GitHub.
2. In Vercel: **Add New → Project**, import the repo, keep defaults, **Deploy**.
3. (Recommended) add env var `NEXT_PUBLIC_SITE_URL=https://your-domain.vercel.app` so the WhatsApp/Open Graph image resolves, then redeploy.

## Structure
`src/components/birthday/*` sections · `decorations/*` (DecorativeParticles also provides the confetti burst, FloralDivider, GoldOrnament) · `ui/*` (SectionHeading, Reveal) · `hooks/*` (useCountdown, useScrollLock).
Respects `prefers-reduced-motion`.
