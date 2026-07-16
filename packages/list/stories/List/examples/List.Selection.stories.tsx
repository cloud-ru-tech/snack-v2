import { ChevronRightSVG, FileSVG, HomeSVG, SettingsSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Examples/Selection',
  component: List,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof List>;

const items: Item[] = [
  {
    id: 'overview',
    beforeContent: <HomeSVG />,
    content: { label: 'Overview', description: 'Summary of the project', caption: '12 items' },
    afterContent: <ChevronRightSVG />,
  },
  {
    id: 'analytics',
    beforeContent: <FileSVG />,
    content: { label: 'Analytics', description: 'Usage metrics', caption: 'Today' },
    afterContent: <ChevronRightSVG />,
  },
  {
    id: 'billing',
    beforeContent: <StarSVG />,
    content: { label: 'Billing', description: 'Invoices and payments', caption: '₽ 1 240' },
    afterContent: <ChevronRightSVG />,
  },
  {
    id: 'settings',
    beforeContent: <SettingsSVG />,
    content: { label: 'Settings', description: 'Workspace preferences' },
    afterContent: <ChevronRightSVG />,
  },
];

function SelectionScenario() {
  const [single, setSingle] = useState<string | number>('overview');
  const [multi, setMulti] = useState<Array<string | number>>(['overview', 'billing']);
  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Selection</DemoTitle>
        <DemoHint>Controlled selection: single vs multiple — clic items to toggle.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.matrix}>
            <div className={styles.listFrame}>
              <strong>mode = single</strong>
              <List
                data-test-id={`${TEST_IDS.list.selectionScenario}-single`}
                items={items}
                size='m'
                selection={{ mode: 'single', value: single, onChange: setSingle }}
              />
            </div>
            <div className={styles.listFrame}>
              <strong>mode = multiple</strong>
              <List
                data-test-id={`${TEST_IDS.list.selectionScenario}-multiple`}
                items={items}
                size='m'
                selection={{ mode: 'multiple', value: multi, onChange: setMulti }}
              />
            </div>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Selection: Story = {
  tags: ['dev', 'test'],
  render: () => <SelectionScenario />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const single = canvas.getByTestId(`${TEST_IDS.list.selectionScenario}-single`);
    const multi = canvas.getByTestId(`${TEST_IDS.list.selectionScenario}-multiple`);

    await step('click items in single mode (toggles selection)', async () => {
      const items = single.querySelectorAll(`[data-test-id^="${INTERNAL_TEST_IDS.baseItem}_"]`);
      if (items[1]) await userEvent.click(items[1] as HTMLElement);
      if (items[2]) await userEvent.click(items[2] as HTMLElement);
    });

    await step('click items in multiple mode (toggles checkbox)', async () => {
      const items = multi.querySelectorAll(`[data-test-id^="${INTERNAL_TEST_IDS.baseItem}_"]`);
      if (items[1]) await userEvent.click(items[1] as HTMLElement);
      if (items[3]) await userEvent.click(items[3] as HTMLElement);
    });
  },
};
