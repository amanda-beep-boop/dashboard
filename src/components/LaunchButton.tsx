import { Button, rem } from '@mantine/core';
import type { ButtonProps } from '@mantine/core';
import { IconExternalLink } from './icons';

export interface LaunchButtonProps extends ButtonProps {
  /** Where the button goes. Opens in a new tab. */
  href: string;
  /** Name of the app being launched, e.g. "App" gives "Launch App". */
  appName?: string;
}

/**
 * The "Launch App" call to action used in the header and in both banners.
 * Colour and radius come from the theme (primary blue.7, 6px).
 */
export function LaunchButton({ href, appName = 'App', ...others }: LaunchButtonProps) {
  const label = `Launch ${appName}`;

  return (
    <Button
      component="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${label} (opens in a new tab)`}
      fz="md"
      // 16px side padding in the design, less Mantine's 1px button border
      px={15}
      rightSection={<IconExternalLink size={14} />}
      // 8px between label and icon, as in the design (Mantine's default is 10)
      styles={{ section: { marginInlineStart: rem(8) } }}
      {...others}
    >
      {label}
    </Button>
  );
}
