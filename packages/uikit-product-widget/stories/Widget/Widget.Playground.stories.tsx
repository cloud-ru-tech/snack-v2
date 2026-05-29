import { WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget, WIDGET_STATE } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof Widget> = {
  title: 'Uikit Product/Widget',
  component: Widget,
  parameters: { layout: 'fullscreen' },
  args: {
    loadingState: { showSkeleton: true },
    header: { title: 'Cloud servers', href: '#' },
    children: 'Keep product metrics, shortcuts, and status details in one compact card.',
    errorState: {
      onClickUpdate: () => undefined,
      errorTitle: 'Не удалось получить данные',
      errorDescription: 'Попробуйте обновить виджет',
      updateButtonLabel: 'Обновить',
    },
    segmentControl: {
      width: WIDTH.Full,
      defaultValue: 'overview',
      items: [
        { value: 'overview', label: 'Overview' },
        { value: 'events', label: 'Events' },
      ],
    },
    actions: [
      { label: 'Create', onClick: () => undefined },
      { variant: BUTTON_TYPE.Outline, label: 'Settings', onClick: () => undefined },
      {
        variant: BUTTON_TYPE.Kebab,
        list: {
          items: [
            { content: { option: 'Export' }, onClick: () => undefined },
            { content: { option: 'Archive' }, onClick: () => undefined },
          ],
        },
      },
    ],
    state: WIDGET_STATE.Default,
    wide: false,
    layoutType: 'desktop',
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    state: { control: 'radio', options: Object.values(WIDGET_STATE) },
    wide: { control: 'boolean' },
    layoutType: { control: 'radio', options: ['desktop', 'mobile'] },
  },
};

export default meta;
type Story = StoryObj<typeof Widget>;

export const Playground: Story = {
  tags: ['dev', 'test'],

  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Widget</DemoTitle>
        <DemoHint>Product card with a clickable header, optional controls, actions, loading and error states.</DemoHint>
        <DemoActions>
          <Widget {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),

  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
