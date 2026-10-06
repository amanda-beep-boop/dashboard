import { useId } from 'react';
import { Box, Button, Text, Title } from '@mantine/core';
import classes from './HeroBanner.module.scss';

export interface HeroBannerProps {
  /** Page heading, rendered as the h1 */
  title: string;
  /** Supporting copy under the heading */
  description: string;
  /** Where the launch button goes. Opens in a new tab. */
  launchHref: string;
  /** Launch button label */
  launchLabel?: string;
}

// The two icons are inlined so the component has no icon-library dependency.
// Swap them for the project's own icons if you prefer; keep the class names.
function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="3 3 18 18" aria-hidden="true" focusable="false">
      <path d="M12 6h-6a2 2 0 0 0 -2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-6" />
      <path d="M11 13l9 -9" />
      <path d="M15 4h5v5" />
    </svg>
  );
}

function InfoIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="2 2 20 20" aria-hidden="true" focusable="false">
      <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
      <path d="M12 9h.01" />
      <path d="M11 12h1v4h1" />
    </svg>
  );
}

export function HeroBanner({
  title,
  description,
  launchHref,
  launchLabel = 'Launch App',
}: HeroBannerProps) {
  const titleId = useId();

  return (
    <Box component="section" className={classes.root} aria-labelledby={titleId}>
      <div className={classes.banner}>
        <div className={classes.content}>
          <Title order={1} id={titleId} className={classes.title}>
            {title}
          </Title>

          <Text className={classes.description}>{description}</Text>

          <div className={classes.actions}>
            <Button
              component="a"
              href={launchHref}
              target="_blank"
              rel="noopener noreferrer"
              className={classes.launch}
              aria-label={`${launchLabel} (opens in a new tab)`}
            >
              {launchLabel}
              <ExternalLinkIcon className={classes.launchIcon} />
            </Button>

            <div className={classes.notice} role="note">
              <InfoIcon className={classes.noticeIcon} />
              <Text className={classes.noticeText}>
                <strong className={classes.noticeLead}>Launch first to sign in</strong> — some
                links open in App. Login first so the links work properly.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
