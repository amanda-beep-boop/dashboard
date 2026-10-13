import { Group, Paper, Text, rem } from '@mantine/core';
import type { PaperProps } from '@mantine/core';
import { IconInfo } from './icons';

export interface LaunchNoticeProps extends PaperProps {
  /** Name of the app the links open in. */
  appName?: string;
  /** Icon colour. Defaults to the text colour. */
  iconColor?: string;
}

/**
 * The "Launch first to sign in" note that sits beside the Launch button.
 * Pass `bg`, `c` and `radius` to fit the surface it sits on.
 */
export function LaunchNotice({ appName = 'App', iconColor, ...others }: LaunchNoticeProps) {
  return (
    <Paper role="note" px="md" py={8} radius="sm" shadow="none" {...others}>
      <Group gap={8} wrap="nowrap" align="flex-start">
        {/* 2px down centres the 16px icon on the first 20px line of text */}
        <IconInfo size={16} color={iconColor} style={{ marginTop: rem(2) }} />
        <Text size="sm" lh={rem(20)}>
          <Text span inherit fw={700}>
            Launch first to sign in
          </Text>{' '}
          — some links open in {appName}. Login first so the links work properly.
        </Text>
      </Group>
    </Paper>
  );
}
