/*
 * Placeholder content, mirroring the Figma frames. Replace with real data.
 */

export interface DashboardLink {
  title: string;
  description?: string;
  href: string;
}

export interface Shelf {
  title: string;
  items: DashboardLink[];
}

export interface DashboardGroup {
  title: string;
  description: string;
  items: DashboardLink[];
}

export interface Category {
  label: string;
  href: string;
  /** Categories with sub-pages show a chevron in the sidebar */
  hasChildren: boolean;
}

const card = (): DashboardLink => ({
  title: 'Card Title',
  description: 'Description of this card.',
  href: '#/index',
});

const row = (): DashboardLink => ({ title: 'Item', href: 'https://example.com' });

const times = <T,>(count: number, make: () => T): T[] => Array.from({ length: count }, make);

export const categories: Category[] = [
  { label: 'Category 1', href: '#/index', hasChildren: true },
  { label: 'Category 2', href: '#/index', hasChildren: true },
  { label: 'Category 3', href: '#/index', hasChildren: true },
  { label: 'Category 4', href: '#/index', hasChildren: true },
  { label: 'Category 5', href: '#/index', hasChildren: true },
  { label: 'Category 6', href: '#/index', hasChildren: false },
];

export const shelves: Shelf[] = [
  { title: 'Recently Viewed', items: times(3, card) },
  { title: 'Newly Added', items: times(4, card) },
  { title: 'Popular', items: times(4, card) },
];

export const groups: DashboardGroup[] = [
  {
    title: 'Group A',
    description: 'Items relating to {Item Example} in the App',
    items: times(6, row),
  },
  {
    title: 'Group B',
    description: 'Items relating to {Item Example} in the App',
    items: times(7, row),
  },
  {
    title: 'Group C',
    description: 'Items relating to {Item Example} {Group C} in the App',
    items: times(5, row),
  },
];
