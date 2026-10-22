import { AiFieldBanner } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const onActionClick = fn();
const onClose = fn();

const meta: Meta<typeof AiFieldBanner> = {
  title: 'Ai/AiFieldBanner/Tests/Interaction',
  component: AiFieldBanner,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiFieldBanner>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            variant='information'
            content='Description'
            actionLabel='Label text'
            icon={<PlaceholderSVG />}
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
            onActionClick={onActionClick}
            onClose={onClose}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onActionClick.mockClear();
    onClose.mockClear();
    const canvas = within(canvasElement);

    await step('action: fires onActionClick only', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.action));
      expect(onActionClick).toHaveBeenCalledTimes(1);
      expect(onClose).not.toHaveBeenCalled();
    });

    await step('close: fires onClose only', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.close));
      expect(onClose).toHaveBeenCalledTimes(1);
      expect(onActionClick).toHaveBeenCalledTimes(1);
    });
  },
};

export const WithoutIcon: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            content='Description'
            actionLabel='Label text'
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const WithoutAction: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            content='Description'
            icon={<PlaceholderSVG />}
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
