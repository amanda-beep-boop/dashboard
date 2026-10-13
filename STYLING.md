# Styling approach

How these pages are styled, why, and what to do when bringing them into
another Mantine project.

## The short version

Earlier versions of the hero banner fought with Mantine: the component's
stylesheet and `@mantine/core` both set the same properties on the same
elements, and which one won depended on selector strength and stylesheet load
order. Load order differs between projects, so it could look right in one and
wrong in another.

This version removes the overlap. A property is set in exactly one place:

1. **Theme** (`src/theme.ts`) for decisions that apply across the app.
2. **Props on Mantine components** for everything specific to one use.
3. **CSS modules** only for things Mantine has no component or prop for.

No stylesheet in this repo sets a property that Mantine also sets on that
element, and there is no `!important` anywhere.

## The three layers

### 1. Theme

`src/theme.ts` adds only what Mantine's defaults don't already cover. Gray,
blue, spacing (`xs`–`xl`), radius (`sm`, `md`) and font sizes (`xs`–`xl`) are
Mantine's defaults, which match the Figma variables.

| Theme entry | Why it is there |
|---|---|
| `colors.navy` | Custom colour. Shades 0, 5, 7 are Figma variables, 9 is the sidebar/header colour. **The other six are interpolated placeholders.** |
| `primaryColor: 'blue'`, `primaryShade: 7` | The design's buttons are blue.7; Mantine's default primary is blue.6. |
| `headings.fontWeight: '600'` and `headings.sizes` h1–h4 | 36 / 28 / 20 / 18px, semibold. |
| `components.Button` default `radius: 6` | 6px is the design's button radius and is not a Mantine radius token. |
| `fontFamily` | Source Sans 3. |
| `cssVariablesResolver` (placeholder colour) | Placeholder text is gray.7 in the design; Mantine's default is gray.5. |

### 2. Props

Colour, type, spacing, radius, borders and shadows are passed as props:
`c="navy.5"`, `size="sm"`, `fw={600}`, `radius="md"`, `withBorder`,
`shadow="xs"`, `gap={8}`.

Spacing values in the design that are not Mantine tokens (4, 6, 8, 24) are
passed as plain numbers. Mantine converts them to rem.

### 3. CSS modules

There are three, about 230 lines in total, most of it the hero's background.

| Module | What it does | Why it can't be props |
|---|---|---|
| `HeroBanner.module.scss` | The banner's layered background (gradient, illustration, scrim) and how the banner rearranges as its own width changes (container queries). | Mantine has no layered-background component and no container-query props. |
| `Sidebar.module.css` | Corner radius and hover tint on sidebar links. | Mantine has no hover-style props. |
| `DashboardRows.module.css` | Hover tint on index rows. | Same. |

What the modules are allowed to touch:

- **Their own wrapper elements** (`<div className={classes.banner}>`): anything.
- **Mantine components**: layout only, and only properties Mantine does not
  set on that component. In practice that is `max-width` on the hero
  description and `flex` on the hero's button and notice.
- **`UnstyledButton`**: this is Mantine's blank primitive. The sidebar links
  and index rows are built on it so that the hover tint has nothing to
  compete with. (Its only background rule is `transparent` at rest, which a
  `:hover` selector always outranks.)

## Changing a Mantine-owned property responsively

Sometimes a property Mantine owns has to change in a way props can't express.
The hero title's size steps up with the banner's width, and Mantine's
responsive props only know about the viewport.

Do not override Mantine's rule from the module. Have the module set a CSS
variable on its own wrapper, and hand that variable to the component through
its normal prop:

```scss
// HeroBanner.module.scss
.banner {
  --hero-title-size: 1.75rem;
  @container (min-width: 30rem) {
    --hero-title-size: 2.25rem;
  }
}
```

```tsx
// HeroBanner.tsx
<Title order={1} size="var(--hero-title-size)" lh="var(--hero-title-lh)">
```

Mantine still applies the font size itself; it just reads the value from the
variable. The hero's own colours (`--hero-text`, `--hero-notice-bg`, …) are
passed the same way, e.g. `c="var(--hero-text)"`.

Likewise, one-off tweaks go on the component as props or inline `style`, not
in a stylesheet. Example: the focus ring on index rows is moved inside the row
with `style={{ outlineOffset: -2 }}`.

## Bringing this into another project

The components now depend on the theme. That is the trade for removing the
CSS overlap, and it is the main integration step.

**1. Merge the theme entries.** Each one is global in the host app, so decide
entry by entry. Where you can't or don't want to change the host theme, set
the value locally instead:

| Theme entry | Effect on the rest of the host app | Local alternative |
|---|---|---|
| `colors.navy` | None. It only adds a colour. | None. This one is required: `c="navy.5"`, `bg="navy.9"` and `var(--mantine-color-navy-7)` resolve to nothing without it. |
| `primaryShade: 7` | Every primary-coloured component shifts to shade 7. | `color="blue.7"` on `LaunchButton`. |
| `headings` weight and sizes | Every `Title` changes. | `fz`, `fw`, `lh` on the four Titles here: `HeroBanner`, `PageBanner`, `Shelf`, and `GroupSection` in `IndexPage`. |
| Button `radius: 6` | Every `Button` changes. | `radius={6}` on `LaunchButton`. |
| `fontFamily` | App font changes. | Skip it. Everything here inherits the host font. |
| Placeholder colour | Every input's placeholder changes. | Skip it. Placeholders fall back to gray.5. |

**2. Check the basics.**

- `@mantine/core/styles.css` is imported once at the app root.
- `sass` is installed (one module is SCSS).
- `@mantine/hooks` is installed (`AppLayout` uses `useDisclosure`).

**3. Replace the stand-ins.**

- `src/App.tsx` switches pages on the URL hash. Use the host router.
- `src/data.ts` is placeholder content.
- `src/components/icons.tsx` holds the icons exported from the Figma file.
  Swap for the host icon set if preferred. The solid ones are Font Awesome
  Free (CC BY 4.0, attribution required).

## What this does not protect against

The earlier SCSS version (commit `23cef3e`) pinned every property to shield
the banner from the host project. That pinning was the source of the overlap
with Mantine, so it is gone. The components are therefore open to the host in
three ways:

- **Global CSS in the host.** A project-wide rule for `h1`, `p`, `a`,
  `button`, `svg` or `section` will reach these components.
- **Host theme defaults.** `defaultProps`, `classNames` or `styles` set for
  `Button`, `Title`, `Text`, `Paper`, `Card` or `TextInput` in the host theme
  apply here too.
- **Missing theme entries.** See step 1 above.

## Diagnosing a styling problem

In dev tools, select the element and read the Styles panel from the top.

| What you see | Cause | Fix |
|---|---|---|
| A rule from a host stylesheet (not a `m_…` Mantine class, not a module class) winning | Host global CSS | Scope or remove the global rule, or set the property with a prop on the component so it is inline. |
| An inline `style` you didn't write, or a Mantine variable with an unexpected value | Host theme `defaultProps`, `styles` or `classNames` for that component | For `defaultProps`, pass the prop explicitly on the component here; explicit props win. For theme-level `styles` or `classNames`, change them in the host theme. |
| `var(--mantine-color-navy-N)` shown as undefined, or a heading/button at Mantine's default size or shade | Theme entry not merged | Step 1 above. |
| A module class (`HeroBanner_…`, `Sidebar_…`, `DashboardRows_…`) crossed out by a Mantine class, or the reverse | Should not happen with this version. If it does, a module is setting a property Mantine owns. | Move that property to a prop, or use the CSS-variable pattern above. |

## What was tested

- Built with `@mantine/core` 8.3.18, React 19.3, Sass 1.105.1, TypeScript 5.9.3.
- TypeScript check passes; Sass compiles with no warnings.
- Both pages rendered from 390px to 1592px wide with no console errors, and
  run under the Vite dev server.
- The hero's title, description, illustration and fade are pixel-identical to
  the previous version.

Not tested: any other Mantine major version, Next.js, or a host project with
its own theme and global CSS.
