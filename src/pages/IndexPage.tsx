import { useId } from 'react';
import { Anchor, Box, Breadcrumbs, Group, Stack, Text, TextInput, Title } from '@mantine/core';
import { DashboardRows } from '../components/DashboardRows';
import {
  IconCaretDown,
  IconChevronRight,
  IconHome,
  IconSearchOutline,
} from '../components/icons';
import { PageBanner } from '../components/PageBanner';
import { groups } from '../data';
import type { DashboardGroup } from '../data';

const CONTENT_WIDTH = 1080;

export interface IndexPageProps {
  /** What this index lists, e.g. a category name. Shown in the titles. */
  name?: string;
  /** Name of the app the dashboards open in */
  appName?: string;
}

function GroupSection({ title, description, items }: DashboardGroup) {
  const titleId = useId();

  return (
    <Stack component="section" gap={10} aria-labelledby={titleId}>
      <Stack gap={8}>
        <Title order={2} size="h3" id={titleId} c="gray.9">
          {title}
        </Title>
        <Text c="gray.9">{description}</Text>
      </Stack>
      <DashboardRows items={items} />
    </Stack>
  );
}

export function IndexPage({ name = '{Item Example}', appName = '{App}' }: IndexPageProps) {
  const searchId = useId();
  const pageTitle = `${name} Dashboards`;

  return (
    <Box px={{ base: 'md', sm: 'xl' }} pt={24} pb="xl">
      <Stack gap={24} maw={CONTENT_WIDTH} pb={40}>
        <Breadcrumbs
          component="nav"
          aria-label="Breadcrumb"
          separatorMargin={8}
          separator={<IconChevronRight size={8} color="var(--mantine-color-gray-9)" />}
        >
          <Anchor href="#/" c="navy.5" lh={1.4}>
            <Group component="span" gap={6} wrap="nowrap">
              <IconHome size={15} />
              <Text span inherit td="underline">
                Home
              </Text>
            </Group>
          </Anchor>

          <Group gap={8} wrap="nowrap" c="navy.5">
            <Anchor href="#/index" c="navy.5" fw={600} lh={1.4} underline="always" aria-current="page">
              {pageTitle}
            </Anchor>
            <IconCaretDown size={8} />
          </Group>
        </Breadcrumbs>

        <PageBanner
          title={pageTitle}
          description={`Explore ${name} dashboards lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum.`}
          launchHref="https://example.com"
          appName={appName}
        />

        <Stack gap={24}>
          <Stack gap={4}>
            <Text component="label" htmlFor={searchId} fw={600} c="gray.9">
              Search all {name} dashboards
            </Text>
            <TextInput
              id={searchId}
              size="md"
              radius="sm"
              placeholder="Search"
              leftSection={<IconSearchOutline size={16} color="var(--mantine-color-gray-6)" />}
            />
          </Stack>

          {groups.map((group) => (
            <GroupSection key={group.title} {...group} />
          ))}
        </Stack>
      </Stack>
    </Box>
  );
}
