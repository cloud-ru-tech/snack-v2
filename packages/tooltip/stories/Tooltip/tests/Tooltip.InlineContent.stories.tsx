import { Button } from '@ds/button';
import { Link } from '@ds/link';
import { PLACEMENT, Tooltip } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip/Tests/InlineContent',
  component: Tooltip,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const InlineContent: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='center'>
          <Tooltip
            tip={
              <>
                {'Подробнее читайте в '}
                <Link href='#documentation' label='документации' insideText />
                {' перед началом работы с компонентом.'}
              </>
            }
            placement={PLACEMENT.Bottom}
          >
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Текст со ссылкой'
              view='outline'
              appearance='neutral'
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
