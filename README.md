# Dashboard banner

React + Mantine build of the Operations Dashboard hero banner.

## Run it

Needs Node.js 20 or newer (https://nodejs.org).

```
npm install
npm run dev
```

Then open http://localhost:5173.

## Where things are

- `src/components/HeroBanner/HeroBanner.tsx` – the component
- `src/components/HeroBanner/HeroBanner.module.css` – gradient, scrim, image and responsive rules; colors and layout values are variables at the top
- `src/components/HeroBanner/hero-building.webp` – the building illustration (12% opacity baked in)
- `src/main.tsx` – Mantine provider and theme font
- `src/App.tsx` – temporary page shell
