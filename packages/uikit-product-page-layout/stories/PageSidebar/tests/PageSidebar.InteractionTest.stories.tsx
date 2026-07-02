import { TEST_IDS as LIST_TEST_IDS } from '@ds/list';
import { PageSidebar } from '@ds/uikit-product-page-layout';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SIDEBAR_FOOTER_ITEMS, SIDEBAR_HEADER_TITLE, SIDEBAR_ITEMS } from '../../demoData';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof PageSidebar> = {
  title: 'Uikit Product/PageLayout/PageSidebar/Tests/Interaction',
  component: PageSidebar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof PageSidebar>;

const onSelect = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Выбор пункта сайдбара вызывает onSelect с его id.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.sidebarFrame}>
            <PageSidebar
              items={SIDEBAR_ITEMS}
              footerItems={SIDEBAR_FOOTER_ITEMS}
              header={SIDEBAR_HEADER_TITLE}
              selected='overview'
              onSelect={onSelect}
              defaultOpen
              data-test-id={TEST_IDS.pageSidebar.root}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onSelect.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.pageSidebar.root);

    await step('select item triggers onSelect', async () => {
      const item = within(root).getByTestId(`${LIST_TEST_IDS.baseItem}_overview`);
      await userEvent.click(item);
      await waitFor(() => expect(onSelect).toHaveBeenCalledWith('overview'));
    });

    await step('root remains visible', async () => {
      await expect(canvas.getByTestId(TEST_IDS.pageSidebar.root)).toBeVisible();
    });
  },
};
