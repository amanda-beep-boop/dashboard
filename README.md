# Dashboard banner

React + Mantine build of the Operations Dashboard hero banner.

## Run it

Needs Node.js 20 or newer (https://nodejs.org).

```
npm install
npm run dev
```

Then open http://localhost:5173.

## Using the banner in another project

Copy the `src/components/HeroBanner/` folder. It needs `react`, `@mantine/core`
and `sass` (dev dependency), and nothing else.

```tsx
<HeroBanner
  title="Operations Dashboard"
  description="Welcome back! …"
  launchHref="https://…"
/>
```

The styles are a CSS Module written in SCSS and are isolated in both
directions:

- Every class name is hashed and every rule is nested under the banner's root
  class, so the stylesheet cannot affect anything outside the banner. It
  declares no element selectors, CSS custom properties, keyframes or other
  global names.
- Every value is a private SCSS variable at the top of the file. The banner
  does not read Mantine's theme variables, so the host theme does not change
  how it looks. It inherits only the font family.
- The banner has no outer margin. Space it from its parent.

It responds to its own width (container queries), not the viewport: under
30rem it stacks, from 56rem it uses the Figma layout.

## Where things are

- `src/components/HeroBanner/HeroBanner.tsx` – the component
- `src/components/HeroBanner/HeroBanner.module.scss` – gradient, scrim, image and responsive rules; colors and sizes are variables at the top
- `src/components/HeroBanner/hero-building.webp` – the building illustration (12% opacity baked in)
- `src/main.tsx` – Mantine provider and theme font
- `src/App.tsx` – temporary page shell
