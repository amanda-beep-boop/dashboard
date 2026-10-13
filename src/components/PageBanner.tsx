import { useId } from 'react';
import { Group, Paper, Stack, Text, Title, alpha } from '@mantine/core';
import { LaunchButton } from './LaunchButton';
import { LaunchNotice } from './LaunchNotice';

export interface PageBannerProps {
  /** Page heading, rendered as the h1 */
  title: string;
  description: string;
  /** Where the launch button goes. Opens in a new tab. */
  launchHref: string;
  /** Name of the app being launched */
  appName?: string;
}

// "banner-bg" in Figma: navy.0 at 50%.
const bannerBg = alpha('var(--mantine-color-navy-0)', 0.5);

/** The light banner at the top of an index page. Styled entirely with Mantine props. */
export function PageBanner({ title, description, launchHref, appName = 'App' }: PageBannerProps) {
  const titleId = useId();

  return (
    <Paper component="section" aria-labelledby={titleId} bg={bannerBg} radius="md" p="md">
      <Paper bg={bannerBg} radius="md" p={{ base: 'md', sm: 'xl' }}>
        <Stack gap={24}>
          <Stack gap={6} maw={700}>
            <Title order={1} size="h2" id={titleId} c="gray.9">
              {title}
            </Title>
            <Text size="sm" c="gray.8">
              {description}
            </Text>
          </Stack>

          <Group gap="md">
            <LaunchButton href={launchHref} appName={appName} />
            <LaunchNotice
              appName={appName}
              bg="blue.0"
              c="navy.7"
              radius="md"
              iconColor="var(--mantine-color-navy-7)"
            />
          </Group>
        </Stack>
      </Paper>
    </Paper>
  );
}
