import { AdaptiveProvider } from '@ds/adaptive';
import { Table, VIEW } from '@ds/table';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from 'storybook/test';

import { TREE_CELL_ID } from '../../../src/helperComponents/Cells/TreeCell/constants';
import { getUserSubRows, TREE_USERS } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

type TreePinningProps = {
  layoutType: 'desktop' | 'mobile';
  pinned?: boolean;
};

function TreePinningTable({ layoutType, pinned }: TreePinningProps) {
  return (
    <AdaptiveProvider layoutType={layoutType}>
      <Table
        data={TREE_USERS}
        columnDefinitions={[{ accessorKey: 'role', header: 'Тип', size: 160 }]}
        getRowId={user => user.id}
        view={VIEW.Table}
        expanding={{
          getSubRows: getUserSubRows,
          expandingColumnDefinition: { accessorKey: 'name', header: 'Подразделение', pinned },
        }}
        suppressToolbar
        suppressPagination
      />
    </AdaptiveProvider>
  );
}

const meta = {
  title: 'Components/Table/Table/Tests/TreePinning',
  component: TreePinningTable,
  tags: ['test', 'dev'],
  parameters: { layout: 'fullscreen', controls: { disable: true } },
} satisfies Meta<typeof TreePinningTable>;

export default meta;
type Story = StoryObj<typeof meta>;

function checkPinning(expectedPosition: 'left' | null): Story['play'] {
  return async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await waitFor(() => {
      const header = canvas.getByText('Подразделение');
      const cells = canvasElement.querySelectorAll(`[data-column-id="${TREE_CELL_ID}"]`);
      const pinnedSelector = `[data-test-id="${TEST_IDS.component.pinnedCells}"]`;

      expect(cells.length).toBeGreaterThan(0);
      expect(header.closest(pinnedSelector)?.getAttribute('data-position') ?? null).toBe(expectedPosition);
      for (const cell of cells) {
        expect(cell.closest(pinnedSelector)?.getAttribute('data-position') ?? null).toBe(expectedPosition);
      }
    });
  };
}

export const DesktopDefault: Story = {
  name: 'Desktop: закрепление по умолчанию',
  args: { layoutType: 'desktop' },
  play: checkPinning('left'),
};

export const MobileDefault: Story = {
  name: 'Mobile: без закрепления по умолчанию',
  args: { layoutType: 'mobile' },
  play: checkPinning(null),
};

export const DesktopPinnedTrue: Story = {
  name: 'Desktop: pinned=true',
  args: { layoutType: 'desktop', pinned: true },
  play: checkPinning('left'),
};

export const DesktopPinnedFalse: Story = {
  name: 'Desktop: pinned=false',
  args: { layoutType: 'desktop', pinned: false },
  play: checkPinning(null),
};

export const MobilePinnedTrue: Story = {
  name: 'Mobile: pinned=true',
  args: { layoutType: 'mobile', pinned: true },
  play: checkPinning('left'),
};

export const MobilePinnedFalse: Story = {
  name: 'Mobile: pinned=false',
  args: { layoutType: 'mobile', pinned: false },
  play: checkPinning(null),
};
