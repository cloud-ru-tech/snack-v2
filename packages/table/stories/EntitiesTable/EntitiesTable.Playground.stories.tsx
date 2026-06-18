import { EntitiesTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import {
  entitiesColumnDefinitions,
  entitiesColumnFilters,
  mockEntitiesQueryFn,
  StoryEntity,
  StoryFilters,
  StoryProps,
} from '../entitiesTableFixtures';
import { TEST_IDS } from '../testIds';

type StoryArgs = Omit<StoryProps, 'queryFn'> & {
  showColumnFilters: boolean;
};

function PlaygroundRender({ showColumnFilters, ...args }: StoryArgs) {
  return (
    <EntitiesTable<StoryEntity, StoryFilters>
      {...args}
      queryFn={mockEntitiesQueryFn}
      columnFilters={showColumnFilters ? entitiesColumnFilters : undefined}
    />
  );
}

const meta: Meta<typeof PlaygroundRender> = {
  title: 'Components/Table/EntitiesTable',
  component: PlaygroundRender,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    id: 'entities-table-playground',
    columnDefinitions: entitiesColumnDefinitions,
    defaultLimit: 10,
    defaultOffset: 0,
    defaultSearch: '',
    searchPlaceholder: 'Search entities',
    getRowId: entity => entity.id,
    showColumnFilters: false,
    'data-test-id': TEST_IDS.serverTable.root,
  },
  argTypes: {
    queryProps: { table: { disable: true } },
    onQuerySuccess: { table: { disable: true } },
    onPaginationOrDataChange: { table: { disable: true } },
    columnDefinitions: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    showColumnFilters: { name: '[Stories]: showColumnFilters', control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<typeof PlaygroundRender>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
  },
};
