import { getPageNumberTestId } from '@ds/pagination';
import { EntitiesTable, EntitiesTableHandle } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { useRef } from 'react';
import { expect, userEvent, within } from 'storybook/test';

import { withTableStorySurface } from '../../decorators';
import {
  entitiesColumnDefinitions,
  mockEntitiesQueryFn,
  StoryEntity,
  StoryFilters,
  StoryProps,
} from '../../entitiesTableFixtures';
import { TEST_IDS } from '../../testIds';

type StoryArgs = StoryProps;

function InteractionExample(args: StoryArgs) {
  const ref = useRef<EntitiesTableHandle<StoryEntity>>(null);

  return <EntitiesTable<StoryEntity, StoryFilters> {...args} ref={ref} />;
}

const meta: Meta<typeof InteractionExample> = {
  title: 'Components/Table/EntitiesTable/Tests/InteractionTest',
  component: InteractionExample,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  decorators: [withTableStorySurface],
  args: {
    id: 'entities-table-interaction',
    columnDefinitions: entitiesColumnDefinitions,
    defaultLimit: 5,
    searchPlaceholder: 'Search entities',
    getRowId: (entity: StoryEntity) => entity.id,
    queryFn: mockEntitiesQueryFn,
    'data-test-id': TEST_IDS.serverTable.root,
  },
};

export default meta;
type Story = StoryObj<typeof InteractionExample>;

export const InteractionTest: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const searchInput = canvas.getByTestId(TEST_IDS.toolbar.searchInput);

    await step('search: filters visible rows', async () => {
      await userEvent.clear(searchInput);
      await userEvent.type(searchInput, 'Entity 1');
      await expect(searchInput).toHaveValue('Entity 1');
      await expect(canvas.getByTestId(TEST_IDS.serverTable.root)).toBeVisible();
    });

    await step('pagination: second page is reachable', async () => {
      await userEvent.clear(searchInput);
      const page2 = canvas.getByTestId(getPageNumberTestId(2));
      await userEvent.click(page2);
      await expect(page2).toBeVisible();
    });
  },
};
