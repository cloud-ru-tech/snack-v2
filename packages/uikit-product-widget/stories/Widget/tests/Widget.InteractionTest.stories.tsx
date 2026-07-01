import { segmentTestId, WIDTH } from '@ds/segment-control';
import { BUTTON_TYPE, Widget, WIDGET_STATE } from '@ds/uikit-product-widget';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const onClickUpdateError = fn();

const meta: Meta<typeof Widget> = {
  title: 'Uikit Product/Widget/Tests/Interaction',
  component: Widget,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Widget>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  args: {
    header: { title: 'Cloud servers', href: '#' },
    children: 'Widget body content.',
    state: WIDGET_STATE.Default,
    wide: false,
    segmentControl: {
      width: WIDTH.Full,
      defaultValue: 'overview',
      onChange: fn(),
      items: [
        { value: 'overview', label: 'Overview' },
        { value: 'events', label: 'Events' },
      ],
    },
    actions: [
      { label: 'Create', onClick: fn() },
      {
        variant: BUTTON_TYPE.Kebab,
        list: {
          items: [
            { content: { option: 'Export' }, onClick: fn() },
            { content: { option: 'Archive' }, onClick: fn() },
          ],
        },
      },
    ],
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Kebab droplist, segment control и error retry.</DemoHint>
        <DemoActions block>
          <Widget {...args} />
          <Widget
            header={{ title: 'Monitoring', href: '#' }}
            state={WIDGET_STATE.Error}
            errorState={{
              errorTitle: 'Metrics are unavailable',
              errorDescription: 'Try reloading the widget.',
              updateButtonLabel: 'Reload',
              onClickUpdate: onClickUpdateError,
            }}
            data-test-id='widget-error'
          >
            Metrics
          </Widget>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const body = within(document.body);
    const kebabButton = canvas.getByTestId(TEST_IDS.kebabButton);

    await step('click: kebab opens droplist in portal', async () => {
      await userEvent.click(kebabButton);
      await waitFor(() => expect(body.getByTestId(TEST_IDS.kebabDroplist)).toBeVisible());
    });

    await step('keyboard: Escape closes kebab droplist', async () => {
      await userEvent.keyboard('{Escape}');
      await waitFor(() => expect(body.queryByTestId(TEST_IDS.kebabDroplist)).toBeNull());
    });

    await step('click: segment control fires onChange', async () => {
      await userEvent.click(canvas.getByTestId(segmentTestId('events')));
      expect(args.segmentControl?.onChange).toHaveBeenCalledWith('events');
    });

    await step('click: error retry fires onClickUpdate', async () => {
      onClickUpdateError.mockClear();
      await userEvent.click(within(canvas.getByTestId('widget-error')).getByTestId(TEST_IDS.errorRetry));
      expect(onClickUpdateError).toHaveBeenCalledTimes(1);
    });
  },
};
