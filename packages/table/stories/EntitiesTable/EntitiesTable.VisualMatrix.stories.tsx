import { EntitiesTable } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { withTableStorySurface } from '../decorators';
import {
  createMockEntitiesQueryFn,
  entitiesColumnDefinitions,
  entitiesColumnFilters,
  mockEntitiesQueryFn,
  StoryEntity,
  StoryFilters,
} from '../entitiesTableFixtures';
import { TEST_IDS } from '../testIds';
import styles from './styles.module.scss';

const meta: Meta<typeof EntitiesTable> = {
  title: 'Components/Table/EntitiesTable',
  component: EntitiesTable,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  decorators: [withTableStorySurface],
};

export default meta;
type Story = StoryObj<typeof EntitiesTable>;

const baseProps = {
  id: 'entities-table-visual-matrix',
  columnDefinitions: entitiesColumnDefinitions,
  defaultLimit: 5,
  searchPlaceholder: 'Search entities',
  getRowId: (entity: StoryEntity) => entity.id,
  queryFn: mockEntitiesQueryFn,
  'data-test-id': TEST_IDS.serverTable.root,
} as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        firstColumnHeader='Состояние'
        columnHeaders={['EntitiesTable']}
        cellAlign='start'
        rows={[
          {
            variantLabel: 'default',
            cells: [<EntitiesTable<StoryEntity, StoryFilters> key='default' {...baseProps} />],
          },
          {
            variantLabel: 'loading',
            cells: [
              <EntitiesTable<StoryEntity, StoryFilters>
                key='loading'
                {...baseProps}
                queryFn={createMockEntitiesQueryFn({ isLoading: true, isFetching: true })}
              />,
            ],
          },
          {
            variantLabel: 'empty',
            cells: [
              <EntitiesTable<StoryEntity, StoryFilters>
                key='empty'
                {...baseProps}
                queryFn={() => ({
                  data: { total: 0, data: [] },
                  isLoading: false,
                  isFetching: false,
                  isError: false,
                  isSuccess: true,
                  refetch: () => {},
                })}
              />,
            ],
          },
          {
            variantLabel: 'error',
            cells: [
              <EntitiesTable<StoryEntity, StoryFilters>
                key='error'
                {...baseProps}
                queryFn={() => ({
                  data: { total: 0, data: [] },
                  isLoading: false,
                  isFetching: false,
                  isError: true,
                  isSuccess: false,
                  refetch: () => {},
                })}
              />,
            ],
          },
          {
            variantLabel: 'filters',
            cells: [
              <EntitiesTable<StoryEntity, StoryFilters>
                key='filters'
                {...baseProps}
                columnFilters={entitiesColumnFilters}
              />,
            ],
          },
        ]}
      />
    </div>
  ),
};
