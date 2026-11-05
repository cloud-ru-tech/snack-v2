import { SECTION_TITLE_TAG, SECTION_TITLE_TYPE, SectionTitle } from '@ds/site-section-title';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { DESCRIPTION, TITLE } from './content';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof SectionTitle> = {
  title: 'Site/SectionTitle',
  component: SectionTitle,
  parameters: { layout: 'fullscreen' },
  args: {
    title: TITLE,
    description: DESCRIPTION,
    type: SECTION_TITLE_TYPE.DescriptionRight,
    titleTag: SECTION_TITLE_TAG.H2,
    'data-test-id': TEST_IDS.root,
  },
};

export default meta;
type Story = StoryObj<typeof SectionTitle>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Типографика и положение описания зависят от `type` и раскладки (Layout в тулбаре).</DemoHint>
        <DemoActions align='start'>
          <SectionTitle {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
