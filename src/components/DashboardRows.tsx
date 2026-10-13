import { Fragment } from 'react';
import { Divider, Group, Paper, Text, UnstyledButton } from '@mantine/core';
import type { DashboardLink } from '../data';
import { IconExternalLinkSolid } from './icons';
import classes from './DashboardRows.module.css';

/** A bordered list of dashboards, one per row. Each row opens in a new tab. */
export function DashboardRows({ items }: { items: DashboardLink[] }) {
  return (
    <Paper withBorder radius="md" style={{ overflow: 'hidden' }}>
      {items.map((item, index) => (
        <Fragment key={index}>
          {index > 0 && <Divider />}
          <UnstyledButton
            component="a"
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            display="block"
            className={classes.row}
            // keeps Mantine's focus ring inside the row, where the rounded list can't clip it
            style={{ outlineOffset: -2 }}
            aria-label={`${item.title} (opens in a new tab)`}
          >
            <Group mih={43} px="md" py={8} gap={8} wrap="nowrap" justify="space-between" c="navy.5">
              <Text fw={600} tt="capitalize" truncate>
                {item.title}
              </Text>
              <IconExternalLinkSolid size={15} />
            </Group>
          </UnstyledButton>
        </Fragment>
      ))}
    </Paper>
  );
}
