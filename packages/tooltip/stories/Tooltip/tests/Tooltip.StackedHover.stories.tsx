import { APPEARANCE, Button, VIEW } from '@ds/button';
import { PLACEMENT, Tooltip, TRIGGER } from '@ds/tooltip';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof Tooltip> = {
  title: 'Components/Tooltip/Tooltip/Tests/StackedHover',
  component: Tooltip,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tooltip>;

/**
 * Два триггера друг над другом: тултип нижнего раскрывается вверх и перекрывает верхний триггер.
 * Путь курсора от нижнего триггера к телу тултипа не должен открывать тултип верхнего.
 */
export const StackedHover: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>StackedHover</DemoTitle>
        <DemoHint>Наведение на нижний триггер и переход на тело тултипа не должны задевать верхний триггер.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.stackTight}>
            <Tooltip
              tip={<span data-test-id={TEST_IDS.tooltip.upperContent}>Тултип верхнего элемента</span>}
              placement={PLACEMENT.Top}
              trigger={TRIGGER.Hover}
            >
              <Button
                data-test-id={TEST_IDS.tooltip.upperTrigger}
                label='Верхний элемент'
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
              />
            </Tooltip>

            <Tooltip
              tip={<span data-test-id={TEST_IDS.tooltip.content}>Тултип нижнего элемента</span>}
              placement={PLACEMENT.Top}
              trigger={TRIGGER.Hover}
            >
              <Button
                data-test-id={TEST_IDS.tooltip.triggerOpen}
                label='Нижний элемент'
                view={VIEW.Outline}
                appearance={APPEARANCE.Neutral}
              />
            </Tooltip>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
