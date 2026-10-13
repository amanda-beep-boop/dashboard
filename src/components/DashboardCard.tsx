import { Card, Text } from '@mantine/core';
import type { DashboardLink } from '../data';

/** A dashboard shown as a card on the home page shelves. The whole card is the link. */
export function DashboardCard({ title, description, href }: DashboardLink) {
  return (
    <Card component="a" href={href} withBorder radius="md" padding="md" shadow="xs" h={124}>
      <Text fw={600} c="navy.5" tt="capitalize" lh={1.25} lineClamp={2}>
        {title}
      </Text>
      {description && (
        <Text size="sm" c="gray.8" lh={1.4} mt={6} lineClamp={3}>
          {description}
        </Text>
      )}
    </Card>
  );
}
