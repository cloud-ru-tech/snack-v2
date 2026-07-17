import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { EmptyBlock, EmptyBlockProps } from '../../src';
import { TEST_IDS } from '../testIds';

type PlaygroundArgs = EmptyBlockProps & {
  showFooter?: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/Layout/Layout/EmptyBlock',
  id: 'uikit-product-layout-emptyblock',
  component: EmptyBlock,
  parameters: { layout: 'fullscreen' },
  args: {
    title: 'Title text',
    content: 'Body text',
    icon: { icon: PlaceholderSVG },
    showFooter: true,
    'data-test-id': TEST_IDS.emptyBlock.root,
  },
  argTypes: {
    icon: { table: { disable: true } },
    footer: { table: { disable: true } },
    showFooter: { name: '[Stories]: showFooter', control: 'boolean' },
  },
};

export default meta;

type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: ({ showFooter, ...args }) => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Блок-заглушка для пустого состояния списка, таблицы или экрана.</DemoHint>
        <DemoActions align='center'>
          <EmptyBlock
            {...args}
            footer={
              showFooter ? (
                <ButtonGroup primaryAction={{ label: 'Label text' }} secondaryAction={{ label: 'Label text' }} />
              ) : undefined
            }
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.emptyBlock.root)).toBeVisible();
  },
};
