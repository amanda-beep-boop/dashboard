import { useId } from 'react';
import { SimpleGrid, Stack, Title } from '@mantine/core';
import type { Shelf as ShelfData } from '../data';
import { DashboardCard } from './DashboardCard';

/** A titled row of dashboard cards, e.g. "Recently Viewed". */
export function Shelf({ title, items }: ShelfData) {
  const titleId = useId();

  return (
    <Stack component="section" gap={8} aria-labelledby={titleId}>
      <Title order={2} size="h4" id={titleId} c="gray.9" tt="capitalize">
        {title}
      </Title>

      {/* Columns follow the shelf's own width, so the grid adapts whether or
          not the sidebar is open. Four across at the full 1225px. */}
      <SimpleGrid
        type="container"
        spacing="md"
        cols={{ base: 1, '560px': 2, '860px': 3, '1160px': 4 }}
      >
        {items.map((item, index) => (
          <DashboardCard key={index} {...item} />
        ))}
      </SimpleGrid>
    </Stack>
  );
}
