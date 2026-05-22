import { APPEARANCE, Tag } from '@ds/tag';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag/Tag/Examples/AsLink',
  component: Tag,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Tag>;

export const AsLink: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>AsLink</DemoTitle>
        <DemoHint>Тег как ссылка: href, target=_blank.</DemoHint>
        <DemoActions align='center'>
          <Tag label='Документация' href='https://example.com' data-test-id={TEST_IDS.tag.docs} />
          <Tag
            appearance={APPEARANCE.Blue}
            label='Frontend'
            href='https://example.com/tags/frontend'
            target='_blank'
            data-test-id={TEST_IDS.tag.frontend}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const root = within(canvasElement);
    await expect(root.getByTestId(TEST_IDS.tag.docs)).toBeVisible();
    await expect(root.getByTestId(TEST_IDS.tag.frontend)).toBeVisible();
  },
};
