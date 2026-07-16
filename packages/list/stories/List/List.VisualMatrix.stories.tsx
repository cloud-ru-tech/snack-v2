import { Button } from '@ds/button';
import { ChevronRightSVG, FileSVG, FolderSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List',
  component: List,
  parameters: {
    layout: 'padded',
    controls: { disable: true },
  },
};

export default meta;
type Story = StoryObj<typeof List>;

const keySizes = Object.values(SIZE);

const baseItems: Item[] = [
  { id: 'a', content: { label: 'Overview', description: 'Summary' } },
  { id: 'b', content: { label: 'Analytics', description: 'Metrics' } },
  { id: 'c', content: { label: 'Billing', description: 'Invoices' } },
];

const withDisabled: Item[] = [
  { id: 'a', content: { label: 'Overview' } },
  { id: 'b', content: { label: 'Archived' }, disabled: true },
  { id: 'c', content: { label: 'Settings' } },
];

// Figma listItem demo. Статические состояния: default, checked, disabled
// (hover/pressed зависят от псевдоклассов — снимаются в visual.spec.ts).
const singleItems: Item[] = [
  { id: 'a', content: { label: 'Default', description: 'Description text' } },
  { id: 'b', content: { label: 'Checked', description: 'Description text' } },
  { id: 'c', content: { label: 'Disabled', description: 'Description text' }, disabled: true },
];

const multipleItems: Item[] = [
  { id: 'a', content: { label: 'Default', description: 'Description text' } },
  { id: 'b', content: { label: 'Checked', description: 'Description text' } },
  { id: 'c', content: { label: 'Disabled', description: 'Description text' }, disabled: true },
];

function renderList(props: Parameters<typeof List>[0]) {
  return (
    <div className={styles.cell}>
      <List {...props} />
    </div>
  );
}

// Узкая ячейка — для секций, где сигнал виден только при ограниченной ширине (truncate).
function renderNarrow(props: Parameters<typeof List>[0]) {
  return (
    <div className={styles.cellNarrow}>
      <List {...props} />
    </div>
  );
}

// Составные типы айтемов (discriminated union Item) — collapse и group→collapse.
const collapseItems: Item[] = [
  {
    id: 'col',
    type: 'collapse',
    content: { label: 'Section' },
    items: [
      { id: 'col-1', content: { label: 'Child one' } },
      { id: 'col-2', content: { label: 'Child two' } },
    ],
  },
];

const groupWithCollapse: Item[] = [
  {
    type: 'group',
    label: 'Workspace',
    groupVariant: 'subtitle',
    items: [
      {
        id: 'gc',
        type: 'collapse',
        content: { label: 'Nested section' },
        items: [{ id: 'gc-1', content: { label: 'Leaf item' } }],
      },
    ],
  },
];

// `content` как сырой ReactNode (ветка `!isContentItem` в BaseItem) — без label/caption/TruncateString.
const rawContentItems: Item[] = [
  { id: 'r1', content: <strong>Custom raw node</strong> },
  {
    id: 'r2',
    content: (
      <span>
        Plain text + <code>code</code>
      </span>
    ),
  },
];

// Truncate (ItemContent.truncate) — проявляется только в узкой ячейке.
const truncateOption: Item[] = [
  {
    id: 't1',
    content: { label: 'A very long option label that overflows the cell', truncate: { label: 1 } },
  },
];
const truncateDescription: Item[] = [
  {
    id: 't2',
    content: {
      label: 'Title',
      description: 'A very long multi-line description that clamps after two lines and shows an ellipsis',
      truncate: { description: 2 },
    },
  },
];
const truncateMiddle: Item[] = [
  {
    id: 't3',
    content: { label: 'documents/2024/q3/report-final-version.pdf', truncate: { label: 1, variant: 'middle' } },
  },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × Selection mode'
        firstColumnHeader='Size'
        columnHeaders={['none', 'single (checked)', 'multiple (checked)']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({ items: baseItems, size }),
            renderList({
              items: baseItems,
              size,
              selection: { mode: 'single', defaultValue: 'b' },
            }),
            renderList({
              items: baseItems,
              size,
              selection: { mode: 'multiple', defaultValue: ['a', 'c'] },
            }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Selection mode × State (static)'
        firstColumnHeader='Selection'
        columnHeaders={['default', 'checked', 'disabled']}
        rows={[
          {
            variantLabel: 'single',
            cells: [
              renderList({ items: [singleItems[0]], size: 'm' }),
              renderList({
                items: [singleItems[1]],
                size: 'm',
                marker: true,
                selection: { mode: 'single', defaultValue: 'b' },
              }),
              renderList({ items: [singleItems[2]], size: 'm' }),
            ],
          },
          {
            variantLabel: 'multiple',
            cells: [
              renderList({
                items: [multipleItems[0]],
                size: 'm',
                selection: { mode: 'multiple', defaultValue: [] },
              }),
              renderList({
                items: [multipleItems[1]],
                size: 'm',
                selection: { mode: 'multiple', defaultValue: ['b'] },
              }),
              renderList({
                items: [multipleItems[2]],
                size: 'm',
                selection: { mode: 'multiple', defaultValue: [] },
              }),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Switch presentation × Size (BaseItem switch — Figma listItem toggle)'
        firstColumnHeader='Size'
        columnHeaders={['switch off', 'switch on', 'switch + disabled']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({
              size,
              selection: { mode: 'multiple', defaultValue: [] },
              items: [{ id: 'notify', switch: true, content: { label: 'Notifications' } }],
            }),
            renderList({
              size,
              selection: { mode: 'multiple', defaultValue: ['notify'] },
              items: [{ id: 'notify', switch: true, content: { label: 'Notifications' } }],
            }),
            renderList({
              size,
              selection: { mode: 'multiple', defaultValue: ['notify'] },
              items: [{ id: 'notify', switch: true, disabled: true, content: { label: 'Notifications' } }],
            }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Size × Slot composition (beforeContent / afterContent)'
        firstColumnHeader='Size'
        columnHeaders={['icon before', 'icon after', 'both', 'caption + both']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({
              items: [
                { id: 'a', beforeContent: <HomeSVG />, content: { label: 'Home' } },
                { id: 'b', beforeContent: <FileSVG />, content: { label: 'Documents' } },
                { id: 'c', beforeContent: <StarSVG />, content: { label: 'Favourites' } },
              ],
              size,
            }),
            renderList({
              items: [
                { id: 'a', afterContent: <ChevronRightSVG />, content: { label: 'Overview' } },
                { id: 'b', afterContent: <ChevronRightSVG />, content: { label: 'Analytics' } },
                { id: 'c', afterContent: <ChevronRightSVG />, content: { label: 'Billing' } },
              ],
              size,
            }),
            renderList({
              items: [
                {
                  id: 'a',
                  beforeContent: <HomeSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Home' },
                },
                {
                  id: 'b',
                  beforeContent: <SettingsSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Settings' },
                },
                {
                  id: 'c',
                  beforeContent: <FolderSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Projects' },
                },
              ],
              size,
            }),
            renderList({
              items: [
                {
                  id: 'a',
                  beforeContent: <HomeSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Overview', caption: '12' },
                },
                {
                  id: 'b',
                  beforeContent: <FileSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Analytics', caption: 'Today' },
                },
                {
                  id: 'c',
                  beforeContent: <StarSVG />,
                  afterContent: <ChevronRightSVG />,
                  content: { label: 'Favourites', caption: '∞', description: 'Pinned items' },
                },
              ],
              size,
            }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Composite item types × Size (Item union — collapse / group→collapse)'
        firstColumnHeader='Size'
        columnHeaders={['collapse (collapsed)', 'collapse (expanded)', 'group → nested collapse (expanded)']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({ size, items: collapseItems, collapse: { defaultValue: [] } }),
            renderList({ size, items: collapseItems, collapse: { defaultValue: ['col'] } }),
            renderList({ size, items: groupWithCollapse, collapse: { defaultValue: ['gc'] } }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Separator (listItemGroup) × size'
        firstColumnHeader='Size'
        columnHeaders={['subtitle', 'subtitleTertiary', 'subtitle + divider', 'divider only', 'long label (truncate)']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({
              size,
              items: [
                {
                  type: 'group',
                  label: 'Workspace',
                  beforeContent: <FolderSVG />,
                  groupVariant: 'subtitle',
                  items: [
                    { id: 'w1', content: { label: 'Overview' } },
                    { id: 'w2', content: { label: 'Analytics' } },
                  ],
                },
              ],
            }),
            renderList({
              size,
              items: [
                {
                  type: 'group',
                  label: 'Settings',
                  beforeContent: <SettingsSVG />,
                  groupVariant: 'subtitleTertiary',
                  items: [
                    { id: 's1', content: { label: 'Profile' } },
                    { id: 's2', content: { label: 'Security' } },
                  ],
                },
              ],
            }),
            renderList({
              size,
              items: [
                {
                  type: 'group',
                  label: 'Workspace',
                  beforeContent: <FolderSVG />,
                  groupVariant: 'subtitle',
                  divider: true,
                  items: [
                    { id: 'wd1', content: { label: 'Overview' } },
                    { id: 'wd2', content: { label: 'Analytics' } },
                  ],
                },
              ],
            }),
            renderList({
              size,
              items: [
                { id: 'a', content: { label: 'Above divider' } },
                {
                  type: 'group',
                  divider: true,
                  items: [{ id: 'b', content: { label: 'Below divider' } }],
                },
              ],
            }),
            renderNarrow({
              size,
              items: [
                {
                  type: 'group',
                  label: 'A very long group subtitle that gets truncated',
                  groupVariant: 'subtitle',
                  truncate: { variant: 'end' },
                  items: [{ id: 'lt1', content: { label: 'Child item' } }],
                },
              ],
            }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Chrome — header / footer / dividers'
        firstColumnHeader='Chrome'
        columnHeaders={['header only', 'header + divider', 'footer only', 'footer + divider', 'all + dividers']}
        rows={[
          {
            variantLabel: 'M',
            cells: [
              renderList({
                items: baseItems,
                size: 'm',
                header: <strong>Select navigation target</strong>,
              }),
              renderList({
                items: baseItems,
                size: 'm',
                headerDivider: true,
                header: <strong>Select navigation target</strong>,
              }),
              renderList({
                items: baseItems,
                size: 'm',
                footer: <Button view='function' appearance='neutral' size='s' label='Manage' />,
              }),
              renderList({
                items: baseItems,
                size: 'm',
                footerDivider: true,
                footer: <Button view='function' appearance='neutral' size='s' label='Manage' />,
              }),
              renderList({
                items: baseItems,
                size: 'm',
                headerDivider: true,
                footerDivider: true,
                header: <strong>Choose option</strong>,
                footer: <Button view='function' appearance='neutral' size='s' label='Apply' />,
              }),
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='Pinned groups (pinTop / pinBottom) × Size'
        firstColumnHeader='Pinned'
        columnHeaders={keySizes.map(size => size.toUpperCase())}
        rows={[
          {
            variantLabel: 'pinTop + main',
            cells: keySizes.map(size =>
              renderList({
                size,
                items: baseItems,
                pinTop: [
                  {
                    id: 'pinned-top',
                    beforeContent: <FolderSVG />,
                    content: { label: 'Pinned action', caption: 'Quick access' },
                    afterContent: <ChevronRightSVG />,
                  },
                ],
              }),
            ),
          },
          {
            variantLabel: 'main + pinBottom',
            cells: keySizes.map(size =>
              renderList({
                size,
                items: baseItems,
                pinBottom: [
                  {
                    id: 'pinned-bottom',
                    beforeContent: <FolderSVG />,
                    content: { label: 'Pinned footer', caption: 'Sticky bottom' },
                    afterContent: <ChevronRightSVG />,
                  },
                ],
              }),
            ),
          },
        ]}
      />

      {/* Submenu (next-list) и Group with bulk select (group-select) живут отдельными scenario-сторис
          с явной Figma-привязкой: examples/List.Submenu.stories.tsx, examples/List.BulkSelect.stories.tsx. */}

      <StoryTable
        sectionTitle='Empty states — loading / no-data / no-results'
        firstColumnHeader='List'
        columnHeaders={['loading', 'no-data (empty items)', 'no-results (search)', 'error (dataError)']}
        rows={[
          {
            variantLabel: 'list',
            cells: [
              renderList({ items: [], size: 'm', loading: true }),
              renderList({ items: [], size: 'm' }),
              renderList({
                items: [],
                size: 'm',
                search: { placeholder: 'Search', value: 'no-match', onChange: () => undefined },
              }),
              renderList({
                items: [],
                size: 'm',
                dataError: true,
                errorDataState: { content: 'Failed to load data' },
              }),
            ],
          },
        ]}
      />

      {/* Поиск в шапке списка наследует размер айтемов: size s/m/l → SearchPrivate s/m/l
          (SearchItem берёт size из контекста List, не фиксирован 's'). */}
      <StoryTable
        sectionTitle='Search follows list size'
        firstColumnHeader='Size'
        columnHeaders={['List with search']}
        rows={keySizes.map(size => ({
          variantLabel: size,
          cells: [
            renderList({
              items: baseItems,
              size,
              search: { placeholder: 'Search', value: '', onChange: () => undefined },
            }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Size × Marker × Disabled / raw content'
        firstColumnHeader='Size'
        columnHeaders={['marker=true + disabled item', 'marker=false', 'raw ReactNode content']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            renderList({
              items: withDisabled,
              size,
              marker: true,
              selection: { mode: 'single', defaultValue: 'a' },
            }),
            renderList({
              items: withDisabled,
              size,
              marker: false,
              selection: { mode: 'single', defaultValue: 'a' },
            }),
            renderList({ items: rawContentItems, size }),
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Truncation (ItemContent.truncate — fixed-width cell)'
        firstColumnHeader='Variant'
        columnHeaders={['option (1 line)', 'description (2 lines)', 'option (middle)']}
        rows={[
          {
            variantLabel: 'truncate',
            cells: [
              renderNarrow({ items: truncateOption, size: 'm' }),
              renderNarrow({ items: truncateDescription, size: 'm' }),
              renderNarrow({ items: truncateMiddle, size: 'm' }),
            ],
          },
        ]}
      />
    </div>
  ),
};
