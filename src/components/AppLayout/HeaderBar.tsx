import { ActionIcon, Group, TextInput } from '@mantine/core';
import { IconSearch, IconSidebar } from '../icons';
import { LaunchButton } from '../LaunchButton';

export interface HeaderBarProps {
  /** Whether the sidebar is showing on desktop */
  sidebarOpened: boolean;
  onOpenMobileSidebar: () => void;
  onOpenDesktopSidebar: () => void;
}

export function HeaderBar({
  sidebarOpened,
  onOpenMobileSidebar,
  onOpenDesktopSidebar,
}: HeaderBarProps) {
  return (
    <Group
      h="100%"
      gap="sm"
      wrap="nowrap"
      justify="space-between"
      pr="md"
      // The search field starts flush with the sidebar's edge. When the
      // sidebar is not showing, the bar needs its own left padding.
      pl={{ base: 'md', sm: sidebarOpened ? 0 : 'md' }}
    >
      <Group gap="sm" wrap="nowrap" flex={1} miw={0}>
        <ActionIcon
          hiddenFrom="sm"
          variant="transparent"
          c="white"
          size="lg"
          aria-label="Open navigation"
          onClick={onOpenMobileSidebar}
        >
          <IconSidebar />
        </ActionIcon>

        {!sidebarOpened && (
          <ActionIcon
            visibleFrom="sm"
            variant="transparent"
            c="white"
            size="lg"
            aria-label="Show sidebar"
            onClick={onOpenDesktopSidebar}
          >
            <IconSidebar />
          </ActionIcon>
        )}

        <TextInput
          flex={1}
          maw={1028}
          variant="filled"
          radius={6}
          // gray.0 in the design; Mantine's filled input is gray.1
          styles={{ input: { backgroundColor: 'var(--mantine-color-gray-0)' } }}
          aria-label="Search dashboards"
          placeholder="Search dashboards by form, keyword, or type…"
          leftSection={<IconSearch size={14} color="var(--mantine-color-gray-7)" />}
        />
      </Group>

      <LaunchButton href="https://example.com" />
    </Group>
  );
}
