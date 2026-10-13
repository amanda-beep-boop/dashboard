import { useId } from 'react';
import { Box, Text, Title } from '@mantine/core';
import { LaunchButton } from '../LaunchButton';
import { LaunchNotice } from '../LaunchNotice';
import classes from './HeroBanner.module.scss';

export interface HeroBannerProps {
  /** Page heading, rendered as the h1 */
  title: string;
  /** Supporting copy under the heading */
  description: string;
  /** Where the launch button goes. Opens in a new tab. */
  launchHref: string;
  /** Name of the app being launched, e.g. "App" gives "Launch App". */
  appName?: string;
}

/**
 * The dark home-page banner with the building illustration.
 *
 * Type, colour, spacing and the button come from Mantine props and the theme.
 * The module only draws the background layers and arranges the pieces as the
 * banner's width changes.
 */
export function HeroBanner({ title, description, launchHref, appName = 'App' }: HeroBannerProps) {
  const titleId = useId();

  return (
    <Box component="section" className={classes.root} aria-labelledby={titleId}>
      <div className={classes.banner}>
        <div className={classes.content}>
          <Title
            order={1}
            id={titleId}
            c="white"
            size="var(--hero-title-size)"
            lh="var(--hero-title-lh)"
            textWrap="balance"
          >
            {title}
          </Title>

          <Text size="sm" lh={1.5} c="var(--hero-text)" mt={15} className={classes.description}>
            {description}
          </Text>

          <div className={classes.actions}>
            <LaunchButton href={launchHref} appName={appName} className={classes.launch} />
            <LaunchNotice
              appName={appName}
              className={classes.notice}
              bg="var(--hero-notice-bg)"
              c="white"
              iconColor="var(--hero-accent)"
            />
          </div>
        </div>
      </div>
    </Box>
  );
}
