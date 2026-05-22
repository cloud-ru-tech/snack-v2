import { SIZE, Typography, TypographyProps, VARIANT } from '@ds/typography';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';

const meta: Meta<TypographyProps> = {
  title: 'Components/Typography/Examples/Polymorphism',
  component: Typography,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<TypographyProps>;

export const Polymorphism: Story = {
  tags: ['dev', 'test'],
  args: {
    as: 'span',
    variant: VARIANT.body,
    size: SIZE.m,
    children: 'Body text as <span>',
    'data-test-id': TEST_IDS.root,
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphism</DemoTitle>
        <DemoHint>Полиморфизм через проп as: рендер любым тегом без потери стилей.</DemoHint>
        <DemoActions align='center'>
          <Typography {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
