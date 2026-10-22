import { AiFieldInput, AiFieldInputProps, SEND_STATE, SendState } from '@ds/ai-field-input';
import { Meta, StoryObj } from '@storybook/react';
import { useArgs } from 'storybook/preview-api';
import { expect, within } from 'storybook/test';

import { DemoPage, DemoPanel } from '#storybook/components';

import { Attachments, DemoBanner, FooterLeftActions, FooterRightActions, useStoryTexts } from '../fixtures';
import { TEST_IDS } from '../testIds';

type StoryProps = AiFieldInputProps & {
  showBanner: boolean;
  showAttachments: boolean;
  showFooterActions: boolean;
  showScrollButton: boolean;
  scrollIndicator: boolean;
  sendState?: SendState;
  contextValue: number;
};

const meta: Meta<StoryProps> = {
  title: 'AI/AiFieldInput',
  component: AiFieldInput,
  parameters: { layout: 'fullscreen' },
  args: {
    disabled: false,
    showBanner: true,
    showAttachments: true,
    showFooterActions: true,
    showScrollButton: true,
    scrollIndicator: true,
    contextValue: 15,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    banner: { table: { disable: true } },
    skills: { table: { disable: true } },
    mentions: { table: { disable: true } },
    attachments: { table: { disable: true } },
    footerLeftActions: { table: { disable: true } },
    footerRightActions: { table: { disable: true } },
    scrollButton: { table: { disable: true } },
    send: { table: { disable: true } },
    showBanner: { name: '[Stories]: showBanner', control: 'boolean' },
    showAttachments: { name: '[Stories]: showAttachments', control: 'boolean' },
    showFooterActions: { name: '[Stories]: showFooterActions', control: 'boolean' },
    showScrollButton: { name: '[Stories]: showScrollButton', control: 'boolean' },
    scrollIndicator: {
      name: '[Stories]: scrollIndicator',
      control: 'boolean',
      if: { arg: 'showScrollButton', eq: true },
    },
    sendState: { name: '[Stories]: sendState', control: 'select', options: Object.values(SEND_STATE) },
    contextValue: {
      name: '[Stories]: contextValue',
      control: { type: 'range', min: 0, max: 100, step: 1 },
      if: { arg: 'showFooterActions', eq: true },
    },
  },
  render: function Render({
    showBanner,
    showAttachments,
    showFooterActions,
    showScrollButton,
    scrollIndicator,
    sendState,
    contextValue,
    ...args
  }) {
    const texts = useStoryTexts();
    const [, updateArgs] = useArgs<StoryProps>();
    const handleBannerClose = () => updateArgs({ showBanner: false });

    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <AiFieldInput
            {...args}
            placeholder={args.placeholder ?? texts.placeholder}
            banner={showBanner ? <DemoBanner onClose={handleBannerClose} /> : undefined}
            skills={args.skills ?? texts.skills}
            mentions={args.mentions ?? texts.mentions}
            attachments={showAttachments ? <Attachments /> : undefined}
            footerLeftActions={showFooterActions ? <FooterLeftActions /> : undefined}
            footerRightActions={showFooterActions ? <FooterRightActions contextValue={contextValue} /> : undefined}
            scrollButton={showScrollButton ? { indicator: scrollIndicator } : undefined}
            send={sendState ? { state: sendState } : undefined}
          />
        </DemoPanel>
      </DemoPage>
    );
  },
};

export default meta;
type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.send)).toHaveAttribute('data-state', SEND_STATE.Disabled);
  },
};
