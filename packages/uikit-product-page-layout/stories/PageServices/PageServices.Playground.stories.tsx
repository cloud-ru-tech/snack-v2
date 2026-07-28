import { PageServices, PageServicesProps } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import {
  RUNNING_STATUS,
  SERVICE_ACTIONS,
  ServiceInfoContent,
  SIDEBAR_HEADER_BACK,
  SIDEBAR_SERVICE_ITEMS,
} from '../demoData';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

// Тогглы видимости слотов — только для Playground (не часть API компонента).
type StoryProps = PageServicesProps & {
  showActions: boolean;
  showSidebar: boolean;
  showSlotAfterTitle: boolean;
};

const meta: Meta<StoryProps> = {
  title: 'Uikit Product/PageLayout/PageServices',
  component: PageServices,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'vm-0c7afd',
    slotAfterTitle: RUNNING_STATUS,
    autoHeight: true,
    limitContentMaxWidth: false,
    actions: SERVICE_ACTIONS,
    // На mobile видимым остаётся одно действие (растягивается), остальные — в kebab (Figma 3334:63034).
    maxVisibleActionsItems: 1,
    sidebar: {
      items: SIDEBAR_SERVICE_ITEMS,
      header: SIDEBAR_HEADER_BACK,
      selected: 'info',
    },
    children: <ServiceInfoContent />,
    'data-test-id': TEST_IDS.pageServices.root,
    showActions: true,
    showSidebar: true,
    showSlotAfterTitle: true,
  },
  argTypes: {
    autoHeight: { control: 'boolean' },
    limitContentMaxWidth: { control: 'boolean' },
    actions: { table: { disable: true } },
    sidebar: { table: { disable: true } },
    children: { table: { disable: true } },
    slotBeforeTitle: { table: { disable: true } },
    slotAfterTitle: { table: { disable: true } },
    showActions: { name: '[Stories]: showActions', control: 'boolean' },
    showSidebar: { name: '[Stories]: showSidebar', control: 'boolean' },
    showSlotAfterTitle: { name: '[Stories]: showSlotAfterTitle', control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showActions, showSidebar, showSlotAfterTitle, ...args }) => (
    <div className={styles.fullPage}>
      <PageServices
        {...args}
        actions={showActions ? args.actions : undefined}
        sidebar={showSidebar ? args.sidebar : undefined}
        slotAfterTitle={showSlotAfterTitle ? args.slotAfterTitle : undefined}
      />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.pageServices.root)).toBeVisible();
  },
};
