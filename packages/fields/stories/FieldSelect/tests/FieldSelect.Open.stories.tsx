import { FieldSelect, TEST_IDS } from '@ds/fields';
import { FolderSVG, PlaceholderSVG } from '@ds/icons';
import { ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

// `open` форсится статически без триггера — эти stories нужны только для снимков открытого
// Droplist (@ds/list nesting — портальная поверхность, в VisualMatrix не собирается).
const options: ItemProps[] = [
  { id: 's', content: { option: 'Small (1 vCPU, 2 GB)' } },
  { id: 'm', content: { option: 'Medium (2 vCPU, 4 GB)' } },
  { id: 'l', content: { option: 'Large (4 vCPU, 8 GB)' } },
];

const groupedItems: ItemProps[] = [
  {
    type: 'group',
    label: 'Standard',
    items: [
      { id: 's', content: { option: 'Small' } },
      { id: 'm', content: { option: 'Medium' } },
    ],
  },
  {
    type: 'group',
    label: 'High-memory',
    divider: true,
    items: [
      { id: 'r-m', content: { option: 'Memory M' } },
      { id: 'r-l', content: { option: 'Memory L' } },
    ],
  },
];

const groupSelectItems: ItemProps[] = [
  {
    type: 'group-select',
    id: 'standard',
    label: 'Standard',
    selectButtonLabel: 'Select all',
    items: [
      { id: 's', content: { option: 'Small' } },
      { id: 'm', content: { option: 'Medium' } },
    ],
  },
  {
    type: 'group-select',
    id: 'high-memory',
    label: 'High-memory',
    selectButtonLabel: 'Select all',
    items: [
      { id: 'r-m', content: { option: 'Memory M' } },
      { id: 'r-l', content: { option: 'Memory L' } },
    ],
  },
];

const nestedItems: ItemProps[] = [
  { id: 's', content: { option: 'Small' } },
  {
    type: 'next-list',
    id: 'regions',
    beforeContent: <PlaceholderSVG />,
    content: { option: 'Regions' },
    items: [
      { id: 'ru', content: { option: 'ru-central1' } },
      { id: 'kz', content: { option: 'kz-central1' } },
    ],
  },
];

const accordionItems: ItemProps[] = [
  { id: 's', content: { option: 'Small' } },
  {
    type: 'collapse',
    id: 'advanced',
    beforeContent: <FolderSVG />,
    content: { option: 'Advanced sizes' },
    items: [
      { id: 'xl', content: { option: 'X-Large' } },
      { id: 'xxl', content: { option: 'XX-Large' } },
    ],
  },
];

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect/Tests/Open',
  component: FieldSelect,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

function OpenHost({ children }: { children: ReactNode }) {
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='start'>{children}</DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Open: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance size'
        items={options}
        selection='single'
        defaultValue='m'
        open
      />
    </OpenHost>
  ),
};

// Multiple-mode с render-time defaultValue: чипы рендерятся сразу (chips-row в триггере).
// Render-time props обходят URL-arg coercion (Storybook приводит array defaultValue к строке,
// если дефолт arg'а — строка), поэтому multiple-with-chips нельзя надёжно собрать через args Playground'а.
export const OpenMultiple: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance sizes'
        items={options}
        selection='multiple'
        chips
        defaultValue={['m']}
        open
      />
    </OpenHost>
  ),
};

export const OpenGrouped: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance size'
        items={groupedItems}
        selection='single'
        open
      />
    </OpenHost>
  ),
};

export const OpenGroupSelect: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance sizes'
        items={groupSelectItems}
        selection='multiple'
        chips={false}
        open
      />
    </OpenHost>
  ),
};

export const OpenNested: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect data-test-id={TEST_IDS.fieldSelect} label='Location' items={nestedItems} selection='single' open />
    </OpenHost>
  ),
};

export const OpenAccordion: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance size'
        items={accordionItems}
        selection='single'
        open
      />
    </OpenHost>
  ),
};

export const OpenPinned: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Region'
        items={options}
        pinTop={[{ id: 'recommended', content: { option: 'Recommended', caption: 'ru-central1-a' } }]}
        pinBottom={[{ id: 'all', content: { option: 'Show all regions' } }]}
        selection='single'
        open
      />
    </OpenHost>
  ),
};

export const OpenLoading: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance size'
        items={[]}
        selection='single'
        loading
        open
      />
    </OpenHost>
  ),
};

export const OpenEmpty: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <OpenHost>
      <FieldSelect
        data-test-id={TEST_IDS.fieldSelect}
        label='Instance size'
        items={[]}
        selection='single'
        noDataState={{ description: 'No sizes available' }}
        open
      />
    </OpenHost>
  ),
};
