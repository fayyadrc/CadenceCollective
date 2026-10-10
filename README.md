# Cadence Collective

Website for Cadence Collective, a student-led music education initiative nurturing confidence, creativity, and collaboration in young musicians.

Built with React 19, TypeScript, Vite, Tailwind (CDN), Framer Motion, and React Router.

## Getting started

Requires Node.js 18+.

```bash
npm install
npm run dev      # http://localhost:3000
```

## Scripts

| Command           | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Start the dev server on port 3000   |
| `npm run build`   | Build for production into `dist/`   |
| `npm run preview` | Preview the production build        |

## Project structure

```
components/   Shared UI and landing-page sections
context/      Auth and site-content providers (default content lives in DataContext.tsx)
pages/        Route pages: landing, gallery, apply, login, admin
public/       Static assets served as-is (images, videos, team photos)
media/        Original source media (not served by the site)
```

## Adding gallery media

1. Put web-ready files in `public/images/gallery/` or `public/videos/gallery/`.
   Convert iPhone `.MOV` (HEVC) videos to H.264 MP4 first, since most browsers can't play HEVC:
   `ffmpeg -i input.MOV -vf scale=720:-2 -c:v libx264 -crf 25 -c:a aac -movflags +faststart output.mp4`
2. Add an entry to `galleryItems` in `pages/GalleryPage.tsx` (set `portrait: true` for vertical videos).
