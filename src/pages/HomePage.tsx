import { Box, Stack } from '@mantine/core';
import { HeroBanner } from '../components/HeroBanner/HeroBanner';
import { Shelf } from '../components/Shelf';
import { shelves } from '../data';

const CONTENT_WIDTH = 1225;

export function HomePage() {
  return (
    <Stack gap="xl" px="md" pt={24} pb="xl">
      <Box maw={CONTENT_WIDTH}>
        <HeroBanner
          title="Operations Dashboard"
          description="Welcome back! Find operational dashboards for workloads, monitor open cases, tasks, work queues, intake, exceptions, case aging, flags, and office or program activity."
          launchHref="https://example.com"
        />
      </Box>

      <Stack gap={24} maw={CONTENT_WIDTH} pb={48}>
        {shelves.map((shelf) => (
          <Shelf key={shelf.title} {...shelf} />
        ))}
      </Stack>
    </Stack>
  );
}
