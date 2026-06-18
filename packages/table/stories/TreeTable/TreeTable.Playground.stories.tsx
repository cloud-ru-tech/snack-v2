import { TreeTable, TreeTableInput, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { expect, within } from 'storybook/test';

import { withTableStorySurface } from '../decorators';
import { getUserSubRows, TREE_USERS, User } from '../fixtures';
import { TEST_IDS } from '../testIds';

const treeSecondaryColumns: TreeTableInput<User>['secondaryColumns'] = [
  { key: 'role', header: 'Тип', width: 160 },
  { key: 'email', header: 'Email', width: 260 },
];

// Тогглы фич уровня story — собираются в render в реальные пропсы TreeTable.
type StoryToggles = {
  showSelection: boolean;
  selectionMultiRow: boolean;
};

type StoryArgs = TreeTableInput<User> & StoryToggles;

const meta: Meta<StoryArgs> = {
  title: 'Components/Table/TreeTable',
  component: TreeTable as ComponentType<StoryArgs>,
  parameters: { layout: 'fullscreen' },
  decorators: [withTableStorySurface],
  args: {
    data: TREE_USERS,
    getChildren: getUserSubRows,
    primaryColumn: { key: 'name', header: 'Подразделение' },
    secondaryColumns: treeSecondaryColumns,
    getRowId: user => user.id,
    expandingInitialState: { 'org-cloud': true },
    defaultView: VIEW.Table,
    headlineKey: 'name',
    outline: true,
    loading: false,
    showSelection: false,
    selectionMultiRow: true,
    'data-test-id': TEST_IDS.table.root,
  },
  argTypes: {
    showSelection: { name: '[Stories]: showSelection', control: 'boolean' },
    selectionMultiRow: {
      name: '[Stories]: selectionMultiRow',
      control: 'boolean',
      if: { arg: 'showSelection', eq: true },
    },

    headlineKey: { if: { arg: 'defaultView', eq: VIEW.Cards } },
    view: { table: { disable: true } },
    onViewChange: { table: { disable: true } },

    data: { table: { disable: true } },
    getChildren: { table: { disable: true } },
    primaryColumn: { table: { disable: true } },
    secondaryColumns: { table: { disable: true } },
    getRowId: { table: { disable: true } },
    selection: { table: { disable: true } },
    expandingInitialState: { table: { disable: true } },
    expandingState: { table: { disable: true } },
    onExpandingChange: { table: { disable: true } },
    renderCard: { table: { disable: true } },
    search: { table: { disable: true } },
    sorting: { table: { disable: true } },
    columnFilters: { table: { disable: true } },
    bulkActions: { table: { disable: true } },
    savedState: { table: { disable: true } },
    moreActions: { table: { disable: true } },
    onRefresh: { table: { disable: true } },
    onRowClick: { table: { disable: true } },
    getRowBackgroundColor: { control: false, table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<StoryArgs>;

function PlaygroundRender({ showSelection, selectionMultiRow, ...rest }: StoryArgs) {
  return <TreeTable {...rest} {...(showSelection ? { selection: { multiRow: selectionMultiRow } } : {})} />;
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: PlaygroundRender,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.table.root)).toBeVisible();
  },
};
