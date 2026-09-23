import { isMobileLayout, useAdaptiveLayout } from '@ds/adaptive';
import { ButtonGroup } from '@ds/button';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { EmptyBlock, EmptyBlockProps } from '../../../src';
import { TEST_IDS } from '../../testIds';

const meta: Meta<EmptyBlockProps> = {
  title: 'Uikit Product/Layout/Layout/EmptyBlock/Examples/WithFooter',
  id: 'uikit-product-layout-emptyblock-examples-withfooter',
  component: EmptyBlock,
  parameters: { layout: 'fullscreen' },
};

export default meta;

type Story = StoryObj<EmptyBlockProps>;

function FooterActions() {
  const { layoutType } = useAdaptiveLayout();
  const isMobile = isMobileLayout(layoutType);

  // На mobile кнопки в столбик на всю ширину, как в mobile-мастере Figma.
  return (
    <ButtonGroup
      primaryAction={{ label: 'Создать' }}
      secondaryAction={{ label: 'Импортировать' }}
      vertical={isMobile}
      filled={isMobile}
    />
  );
}

export const WithFooter: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>WithFooter</DemoTitle>
        <DemoHint>Слот `footer` принимает любой контент — например, `ButtonGroup` с действиями.</DemoHint>
        <DemoActions align='center'>
          <EmptyBlock
            data-test-id={TEST_IDS.emptyBlock.root}
            icon={{ icon: PlaceholderSVG }}
            title='Нет данных'
            content='Создайте первую запись, чтобы начать работу'
            footer={<FooterActions />}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.emptyBlock.root)).toBeVisible();
  },
};
