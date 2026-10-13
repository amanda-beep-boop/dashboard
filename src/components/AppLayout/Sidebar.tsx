import type { ReactNode } from 'react';
import { ActionIcon, Divider, Group, Stack, Text, UnstyledButton, rem } from '@mantine/core';
import { categories } from '../../data';
import { IconChevronRight, IconHome, IconSidebar, IconSignOut } from '../icons';
import { HEADER_HEIGHT } from './layout';
import classes from './Sidebar.module.css';

export interface SidebarProps {
  currentPath: string;
  /** Called after a link is followed, so the mobile drawer can close */
  onNavigate: () => void;
  onCloseMobile: () => void;
  onCollapseDesktop: () => void;
}

// Mantine's focus ring is the primary blue; on the navy sidebar it is white.
const focusRingOnDark = { outlineColor: 'var(--mantine-color-white)' };

function SectionLabel({ children, pt }: { children: ReactNode; pt: number | string }) {
  return (
    <Text size="xs" fw={600} c="navy.0" tt="uppercase" lts={1} px={8} pt={pt}>
      {children}
    </Text>
  );
}

interface NavItemProps {
  label: string;
  href: string;
  icon?: ReactNode;
  /** Shows the chevron that marks a category with sub-pages */
  hasChildren?: boolean;
  current?: boolean;
  onClick: () => void;
}

function NavItem({ label, href, icon, hasChildren, current, onClick }: NavItemProps) {
  return (
    <UnstyledButton
      component="a"
      href={href}
      display="block"
      className={classes.item}
      style={focusRingOnDark}
      aria-current={current ? 'page' : undefined}
      onClick={onClick}
    >
      <Group h={36} p={8} gap={8} wrap="nowrap" c="white">
        {icon}
        <Text flex={1} tt="capitalize" truncate>
          {label}
        </Text>
        {hasChildren && <IconChevronRight size={12} />}
      </Group>
    </UnstyledButton>
  );
}

export function Sidebar({
  currentPath,
  onNavigate,
  onCloseMobile,
  onCollapseDesktop,
}: SidebarProps) {
  return (
    <Stack h="100%" justify="space-between" gap={0} px="md" pb={12}>
      <div>
        <Group h={HEADER_HEIGHT} justify="space-between" wrap="nowrap" pr={8}>
          <Text c="white">Dashboards</Text>

          <ActionIcon
            hiddenFrom="sm"
            variant="transparent"
            c="white"
            size="lg"
            mr={-5}
            aria-label="Close navigation"
            onClick={onCloseMobile}
          >
            <IconSidebar />
          </ActionIcon>
          <ActionIcon
            visibleFrom="sm"
            variant="transparent"
            c="white"
            size="lg"
            mr={-5}
            aria-label="Hide sidebar"
            onClick={onCollapseDesktop}
          >
            <IconSidebar />
          </ActionIcon>
        </Group>

        <Stack gap="md">
          <Stack gap={4}>
            <SectionLabel pt={24}>Browse</SectionLabel>
            <NavItem
              label="Home"
              href="#/"
              icon={<IconHome size={15} />}
              current={currentPath === ''}
              onClick={onNavigate}
            />
          </Stack>

          <Stack gap={4}>
            <SectionLabel pt="md">Categories</SectionLabel>
            {categories.map((category) => (
              <NavItem
                key={category.label}
                label={category.label}
                href={category.href}
                hasChildren={category.hasChildren}
                current={category.href === `#/${currentPath}`}
                onClick={onNavigate}
              />
            ))}
          </Stack>
        </Stack>
      </div>

      <div>
        <Divider color="white" />
        <UnstyledButton
          display="block"
          w="100%"
          mt={12}
          className={classes.item}
          style={focusRingOnDark}
        >
          <Group gap={8} px="md" py={4} wrap="nowrap" c="white">
            <IconSignOut size={15} />
            <Text size="sm" fw={700} lh={rem(16)}>
              Logout
            </Text>
          </Group>
        </UnstyledButton>
      </div>
    </Stack>
  );
}
