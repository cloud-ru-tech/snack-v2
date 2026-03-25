import type { Item } from '../../src';

/** Few items — fits a wide container without collapse. */
export const shortTrailItems: Item[] = [
  { id: '1', label: 'Home', href: '#' },
  { id: '2', label: 'Section', href: '#' },
  { id: '3', label: 'Current page' },
];

/** Long trail with short labels for collapsed / ellipsis modes when space is tight. */
export const longTrailItems: Item[] = [
  { id: '1', label: 'Литература', href: '#' },
  { id: '2', label: 'Стихи', href: '#' },
  { id: '3', label: 'Золотой век русской поэзии', shortLabel: 'Золотой век', href: '#' },
  { id: '4', label: 'Михаил Лермонтов', shortLabel: 'Лермонтов', href: '#' },
  { id: '5', label: 'Тема "Одиночество"', shortLabel: 'Одиночество', href: '#' },
  { id: '6', label: 'Парус', href: '#' },
];
