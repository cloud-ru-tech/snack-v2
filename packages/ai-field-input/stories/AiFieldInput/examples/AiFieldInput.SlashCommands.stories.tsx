import { TEST_IDS as BANNER_TEST_IDS } from '@ds/ai-field-banner';
import { AiFieldInput, AiFieldInputValue } from '@ds/ai-field-input';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DemoBanner, FooterLeftActions, FooterRightActions, useStoryTexts } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof AiFieldInput> = {
  title: 'AI/AiFieldInput/Examples/SlashCommands',
  component: AiFieldInput,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    onActionSelect: fn(),
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof AiFieldInput>;

function SlashCommandsDemo(args: Parameters<typeof AiFieldInput>[0]) {
  const texts = useStoryTexts();
  const [value, setValue] = useState<AiFieldInputValue>([]);
  const [sentCount, setSentCount] = useState(0);
  const [bannerVisible, setBannerVisible] = useState(true);

  const handleSubmit = () => {
    setSentCount(count => count + 1);
    setValue([]);
  };

  const handleBannerClose = () => setBannerVisible(false);

  return (
    <AiFieldInput
      {...args}
      value={value}
      onChange={setValue}
      onSubmit={handleSubmit}
      placeholder={texts.slashPlaceholder}
      searchPlaceholder={texts.searchPlaceholder}
      skills={texts.skills}
      mentions={texts.mentions}
      banner={bannerVisible ? <DemoBanner onClose={handleBannerClose} /> : undefined}
      footerLeftActions={<FooterLeftActions />}
      footerRightActions={<FooterRightActions />}
      disclaimer={sentCount ? texts.sentMessages(sentCount) : undefined}
    />
  );
}

export const SlashCommands: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>SlashCommands</DemoTitle>
        <DemoHint>
          «/» открывает скиллы, «@» — упоминания: список встаёт над полем, не меняя высоту, выбор строки вставляет чип и
          возвращает баннер.
        </DemoHint>
        <SlashCommandsDemo {...args} />
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const editor = await canvas.findByTestId(TEST_IDS.editor);

    await step('slash: list opens over the hidden banner', async () => {
      await userEvent.click(editor);
      await userEvent.keyboard('/');
      await expect(await canvas.findByTestId(TEST_IDS.actionList)).toBeVisible();
      await expect(canvas.getByTestId(BANNER_TEST_IDS.root)).not.toBeVisible();
    });

    await step('query without matches shows the empty row', async () => {
      await userEvent.keyboard('zzz');
      await expect(await canvas.findByTestId(TEST_IDS.actionListEmpty)).toBeVisible();
      await userEvent.keyboard('{Backspace}{Backspace}{Backspace}');
      await waitFor(() => expect(canvas.queryByTestId(TEST_IDS.actionListEmpty)).toBeNull());
    });

    await step('drill-down opens the next level with the back row', async () => {
      await userEvent.click(canvas.getByTestId('agents'));
      await expect(await canvas.findByTestId(TEST_IDS.actionListBack)).toBeVisible();
      await expect(canvas.getByTestId('hermes')).toBeVisible();

      await userEvent.click(canvas.getByTestId(TEST_IDS.actionListBack));
      await expect(await canvas.findByTestId('summarize')).toBeVisible();
    });

    await step('selection inserts a chip and brings the banner back', async () => {
      await userEvent.click(canvas.getByTestId('summarize'));
      await waitFor(() => expect(canvas.getAllByTestId(TEST_IDS.chip)).toHaveLength(1));
      expect(args.onActionSelect).toHaveBeenCalledWith(expect.objectContaining({ id: 'summarize' }), '/');
      await expect(canvas.queryByTestId(TEST_IDS.actionList)).toBeNull();
      await expect(canvas.getByTestId(BANNER_TEST_IDS.root)).toBeVisible();
    });

    await step('banner close button hides the banner', async () => {
      await userEvent.click(canvas.getByTestId(BANNER_TEST_IDS.close));
      await waitFor(() => expect(canvas.queryByTestId(BANNER_TEST_IDS.root)).toBeNull());
    });
  },
};
