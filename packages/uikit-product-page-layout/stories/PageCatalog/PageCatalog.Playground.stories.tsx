import { PageCatalog, PageCatalogProps } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { CatalogCards, PAGE_ACTIONS } from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Тоггл видимости слота — только для Playground (не часть API компонента).
type StoryProps = PageCatalogProps & {
  showActions: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/PageLayout/PageCatalog',
  component: PageCatalog,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Каталог сервисов',
    actions: PAGE_ACTIONS,
    // На mobile видимым остаётся одно действие (растягивается), остальные — в kebab.
    maxVisibleActionsItems: 1,
    children: <CatalogCards />,
    'data-test-id': TEST_IDS.pageCatalog.root,
    showActions: true,
  },
  argTypes: {
    actions: { table: { disable: true } },
    children: { table: { disable: true } },
    showActions: { name: '[Stories]: showActions', control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showActions, ...args }) => (
    <div className={styles.fullPage}>
      <PageCatalog {...args} actions={showActions ? args.actions : undefined} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pageCatalog.root)).toBeVisible();
  },
};
