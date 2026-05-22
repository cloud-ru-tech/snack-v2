import { Button } from '@ds/button';
import { PLACEMENT, Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

const LONG_TEXT =
  'Это очень длинная подсказка, которая по умолчанию должна обрезаться по max-width контейнера тултипа и переносить строки. Она нужна для визуальной регрессии truncation-поведения.';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip/Tests/LongText',
  component: Tooltip,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

export const LongTextDefault: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>LongTextDefault</DemoTitle>
        <DemoHint>{'Длинный текст подсказки с дефолтным max-width.'}</DemoHint>
        <DemoActions align='center'>
          <Tooltip
            tip={<span data-test-id={TEST_IDS.tooltip.content}>{LONG_TEXT}</span>}
            placement={PLACEMENT.Bottom}
            trigger={TRIGGER.HoverAndFocusVisible}
          >
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Long text (default max-width)'
              view='outline'
              appearance='neutral'
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const NoMaxWidthShort: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>NoMaxWidthShort</DemoTitle>
        <DemoHint>{'Короткий текст без ограничения max-width.'}</DemoHint>
        <DemoActions align='center'>
          <Tooltip
            tip={<span data-test-id={TEST_IDS.tooltip.content}>Короткий</span>}
            placement={PLACEMENT.Bottom}
            trigger={TRIGGER.HoverAndFocusVisible}
            disableMaxWidth
          >
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Short (no max-width)'
              view='outline'
              appearance='neutral'
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const LongTextNoMaxWidth: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>LongTextNoMaxWidth</DemoTitle>
        <DemoHint>{'Длинный текст без ограничения max-width — растягивается по контенту.'}</DemoHint>
        <DemoActions align='center'>
          <Tooltip
            tip={<span data-test-id={TEST_IDS.tooltip.content}>{LONG_TEXT}</span>}
            placement={PLACEMENT.Bottom}
            trigger={TRIGGER.HoverAndFocusVisible}
            disableMaxWidth
          >
            <Button
              data-test-id={TEST_IDS.tooltip.triggerOpen}
              label='Long text (no max-width)'
              view='outline'
              appearance='neutral'
            />
          </Tooltip>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
