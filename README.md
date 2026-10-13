# Dashboards

React + Mantine build of the Dashboards home page and index page, from the
Figma file "Dash — Design System - Homepage".

## Run it

Needs Node.js 20 or newer (https://nodejs.org).

```
npm install
npm run dev
```

Then open http://localhost:5173.

- `#/` is the home page
- `#/index` is the index page (any category in the sidebar goes there)

## How styling works

Styling is done at the Mantine level wherever Mantine has an answer, so
component CSS never has to fight Mantine's own styles.

1. **Theme (`src/theme.ts`)** holds the decisions that apply across the app:
   the navy colour, the font, heading sizes, the primary button colour and its
   6px radius, and the placeholder colour. Everything else is Mantine's
   defaults, which already match the Figma variables (gray, blue, spacing,
   radius, font sizes).
2. **Props on Mantine components** do the rest: `c="navy.5"`, `size="sm"`,
   `radius="md"`, `gap={8}` and so on. Spacing values that are not Mantine
   tokens (4, 6, 8, 24) are passed as plain numbers.
3. **CSS modules** are only used for what Mantine has no component for. There
   are three, and none of them restyles a Mantine component:
   - `HeroBanner.module.scss` – the banner's layered background and how it
     rearranges with its own width
   - `Sidebar.module.css` – corner radius and hover tint for sidebar links
   - `DashboardRows.module.css` – hover tint for index rows

## Where things are

```
src/
  theme.ts                 design tokens for Mantine
  data.ts                  placeholder content
  App.tsx                  picks the page from the URL hash (stand-in for a router)
  pages/
    HomePage.tsx           hero banner + shelves of cards
    IndexPage.tsx          breadcrumbs, light banner, search, grouped rows
  components/
    AppLayout/             sidebar + header bar (Mantine AppShell)
    HeroBanner/            dark home banner with the building illustration
    PageBanner.tsx         light banner on the index page
    LaunchButton.tsx       the "Launch App" button used in three places
    LaunchNotice.tsx       the "Launch first to sign in" note
    Shelf.tsx              titled grid of cards
    DashboardCard.tsx      one card
    DashboardRows.tsx      bordered list of rows
    icons.tsx              the icons from the Figma file
```

## Things to replace

- `navy` in `src/theme.ts`: shades 0, 5, 7 and 9 are from Figma; the other six
  are interpolated placeholders.
- `src/data.ts`: placeholder cards, rows and categories.
- The hash-based page switch in `src/App.tsx`: use the real project's router.
