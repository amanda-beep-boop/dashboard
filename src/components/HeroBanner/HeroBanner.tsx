import { useId } from 'react';
import { Box, Button, Text, Title, VisuallyHidden } from '@mantine/core';
import { IconExternalLink, IconInfoCircle } from '@tabler/icons-react';
import classes from './HeroBanner.module.css';

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
              color="blue.7"
              size="sm"
              radius={6}
              fz="md"
              px="md"
              rightSection={<IconExternalLink size={18} stroke={2.25} aria-hidden />}
            >
              {launchLabel}
              <VisuallyHidden> (opens in a new tab)</VisuallyHidden>
            </Button>

            <div className={classes.notice} role="note">
              <IconInfoCircle className={classes.noticeIcon} size={20} stroke={2} aria-hidden />
              <Text className={classes.noticeText}>
                <strong>Launch first to sign in</strong> — some links open in App. Login first so
                the links work properly.
              </Text>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}
