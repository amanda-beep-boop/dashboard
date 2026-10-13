import { Button, createTheme, rem } from '@mantine/core';
import type { CSSVariablesResolver, MantineColorsTuple } from '@mantine/core';

/*
 * Design tokens. Everything here is a decision that holds across the app, so
 * components pick it up through Mantine props (c="navy.5", radius="md", …)
 * instead of their own CSS.
 *
 * gray, blue, spacing (xs–xl), radius (sm, md) and font sizes (xs–xl) are
 * Mantine's defaults, which already match the Figma variables.
 */

// navy/0, navy/5 and navy/7 are the Figma variables. navy.9 is the sidebar and
// header colour ("Color Palette/color/blue/7" in Figma). The other six shades
// are interpolated PLACEHOLDERS: replace them with the real library values.
const navy: MantineColorsTuple = [
  '#d9edfa', // 0  Figma navy/0
  '#b3d1e7', // 1  placeholder
  '#8db5d3', // 2  placeholder
  '#6699c0', // 3  placeholder
  '#407dac', // 4  placeholder
  '#1a6199', // 5  Figma navy/5 (also text/link)
  '#14578d', // 6  placeholder
  '#0d4d80', // 7  Figma navy/7
  '#103e69', // 8  placeholder
  '#122e51', // 9  sidebar and header bar
];

// Source Sans 3 is the current web release of Source Sans Pro.
const fontFamily =
  "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

export const theme = createTheme({
  fontFamily,
  colors: { navy },

  // Filled buttons, focus rings and other "primary" surfaces use blue.7.
  primaryColor: 'blue',
  primaryShade: 7,

  headings: {
    fontFamily,
    fontWeight: '600',
    sizes: {
      h1: { fontSize: rem(36) }, // home banner title
      h2: { fontSize: rem(28), lineHeight: '1.25' }, // index banner title
      h3: { fontSize: rem(20), lineHeight: '1.25' }, // group titles
      h4: { fontSize: rem(18), lineHeight: '1.25' }, // shelf titles
    },
  },

  components: {
    // 6px is the button radius throughout the design. It is not a Mantine
    // radius token (sm is 4, md is 8), so it is set once here.
    Button: Button.extend({ defaultProps: { radius: 6 } }),
  },
});

// Placeholder text is gray.7 in the design; Mantine's default is gray.5.
export const cssVariablesResolver: CSSVariablesResolver = (t) => ({
  variables: {},
  light: { '--mantine-color-placeholder': t.colors.gray[7] },
  dark: {},
});
