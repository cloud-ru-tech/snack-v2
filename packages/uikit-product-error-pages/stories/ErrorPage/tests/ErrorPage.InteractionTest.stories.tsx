import { ERROR_TYPE, ErrorPage } from '@ds/uikit-product-error-pages';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const onSupportCenterClick = fn();
const onMainButtonClick = fn();

const meta: Meta<typeof ErrorPage> = {
  title: 'Uikit Product/ErrorPage/Tests/Interaction',
  component: ErrorPage,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ErrorPage>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик по кнопке поддержки и по главной кнопке вызывает соответствующие колбэки.</DemoHint>
        <DemoActions block>
          <div className={styles.frame}>
            <ErrorPage
              data-test-id={TEST_IDS.root}
              errorType={ERROR_TYPE.Custom}
              onSupportCenterClick={onSupportCenterClick}
              custom={{
                title: 'Custom error',
                description: 'Something went wrong',
                statusCode: 500,
                mainButton: { label: 'Retry', onClick: onMainButtonClick },
              }}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click: support center button triggers callback', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.supportButton));
      expect(onSupportCenterClick).toHaveBeenCalledTimes(1);
    });

    await step('click: main button triggers custom onClick', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.mainButton));
      expect(onMainButtonClick).toHaveBeenCalledTimes(1);
    });
  },
};
