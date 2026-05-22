import { Avatar, AvatarProps, TEST_IDS } from '@ds/avatar';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const STORY_TEST_IDS = {
  fromName: 'avatar-from-name',
  twoSymbols: 'avatar-two-symbols',
  longName: 'avatar-long-name',
  imageFallback: 'avatar-image-fallback',
} as const;

const meta: Meta<AvatarProps> = {
  title: 'Components/Avatar/Tests/Interaction',
  component: Avatar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<AvatarProps>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Аббревиатура из имени, двухсимвольная, длинное имя и fallback при ошибке загрузки картинки.</DemoHint>
        <DemoActions align='center'>
          <Avatar data-test-id={STORY_TEST_IDS.fromName} name='John Doe' />
          <Avatar data-test-id={STORY_TEST_IDS.twoSymbols} name='John Doe' showTwoSymbols />
          <Avatar data-test-id={STORY_TEST_IDS.longName} name='Very Long Name With Multiple Words' showTwoSymbols />
          <Avatar
            data-test-id={STORY_TEST_IDS.imageFallback}
            name='John Doe'
            src='https://invalid-url.example/broken-image.jpg'
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('abbreviation: derived from name, single letter by default', async () => {
      const root = canvas.getByTestId(STORY_TEST_IDS.fromName);
      const abbreviation = within(root).getByTestId(TEST_IDS.abbreviation);
      await expect(abbreviation).toBeVisible();
      await expect(abbreviation).toHaveTextContent('J');
      expect(abbreviation.textContent?.length).toBe(1);
    });

    await step('abbreviation: showTwoSymbols renders two letters', async () => {
      const root = canvas.getByTestId(STORY_TEST_IDS.twoSymbols);
      const abbreviation = within(root).getByTestId(TEST_IDS.abbreviation);
      await expect(abbreviation).toBeVisible();
      expect(abbreviation.textContent?.length).toBe(2);
    });

    await step('abbreviation: long name is truncated to two symbols', async () => {
      const root = canvas.getByTestId(STORY_TEST_IDS.longName);
      const abbreviation = within(root).getByTestId(TEST_IDS.abbreviation);
      await expect(abbreviation).toBeVisible();
      expect(abbreviation.textContent?.length).toBe(2);
    });

    await step('image: fallback to abbreviation when src fails to load', async () => {
      const root = canvas.getByTestId(STORY_TEST_IDS.imageFallback);
      // img onError handler must run before abbreviation slot becomes visible.
      await waitFor(() => {
        const abbreviation = within(root).getByTestId(TEST_IDS.abbreviation);
        expect(abbreviation).toBeVisible();
      });
    });
  },
};
