import type { ReactNode } from 'react';
import { AppShell } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { HeaderBar } from './HeaderBar';
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from './layout';
import { Sidebar } from './Sidebar';

export interface AppLayoutProps {
  /** Path of the page being shown, used to mark the current sidebar link */
  currentPath: string;
  children: ReactNode;
}

/**
 * Page frame: navy sidebar on the left, header bar across the top of the
 * content. Below Mantine's `sm` breakpoint the sidebar becomes a drawer that
 * the header's menu button opens.
 */
export function AppLayout({ currentPath, children }: AppLayoutProps) {
  const [mobileOpened, mobile] = useDisclosure(false);
  const [desktopOpened, desktop] = useDisclosure(true);

  return (
    <AppShell
      layout="alt"
      padding={0}
      header={{ height: HEADER_HEIGHT }}
      navbar={{
        width: SIDEBAR_WIDTH,
        breakpoint: 'sm',
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
    >
      <AppShell.Header bg="navy.9" withBorder={false}>
        <HeaderBar
          sidebarOpened={desktopOpened}
          onOpenMobileSidebar={mobile.open}
          onOpenDesktopSidebar={desktop.open}
        />
      </AppShell.Header>

      <AppShell.Navbar bg="navy.9" withBorder={false} aria-label="Main">
        <Sidebar
          currentPath={currentPath}
          onNavigate={mobile.close}
          onCloseMobile={mobile.close}
          onCollapseDesktop={desktop.close}
        />
      </AppShell.Navbar>

      <AppShell.Main bg="gray.1">{children}</AppShell.Main>
    </AppShell>
  );
}
