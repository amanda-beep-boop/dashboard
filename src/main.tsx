import '@mantine/core/styles.css';
import '@fontsource/source-sans-3/400.css';
import '@fontsource/source-sans-3/600.css';
import '@fontsource/source-sans-3/700.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme } from '@mantine/core';
import App from './App';

// Source Sans 3 is my read of the typeface in the mockup – change it here if
// the design uses something else.
const fontFamily =
  "'Source Sans 3', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";

const theme = createTheme({
  fontFamily,
  headings: { fontFamily },
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MantineProvider theme={theme} defaultColorScheme="light">
      <App />
    </MantineProvider>
  </StrictMode>
);
