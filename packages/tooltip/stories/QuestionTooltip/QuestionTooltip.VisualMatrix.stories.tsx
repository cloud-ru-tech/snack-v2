import { QuestionTooltip, SIZE } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoHint, DemoPage, DemoPanel, DemoTitle, StoryTable } from '#storybook/components';

const SIZES = [SIZE.XS, SIZE.S] as const;

const meta: Meta<typeof QuestionTooltip> = {
  title: 'Components/Tooltip/QuestionTooltip',
  component: QuestionTooltip,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof QuestionTooltip>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Visual matrix</DemoTitle>
        <DemoHint>
          Иконки-триггеры QuestionTooltip по оси <code>size</code>. QuestionTooltip сам ставит data-test-id на свой
          &lt;button&gt;, поэтому уникальный селектор для visual.spec — aria-label через <code>triggerLabel</code>.
        </DemoHint>
        <StoryTable
          firstColumnHeader='size'
          columnHeaders={['trigger']}
          rows={SIZES.map(size => ({
            variantLabel: size,
            cells: [
              <QuestionTooltip key={size} size={size} tip={`Подсказка ${size}`} triggerLabel={`Подсказка ${size}`} />,
            ],
          }))}
        />
      </DemoPanel>
    </DemoPage>
  ),
};
