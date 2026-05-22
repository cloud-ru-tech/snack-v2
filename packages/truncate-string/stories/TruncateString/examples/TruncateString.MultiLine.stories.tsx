import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString/Examples/MultiLine',
  component: TruncateString,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const LONG_TEXT =
  'Описание задачи с несколькими предложениями. Пользователь не хочет видеть полный текст в карточке списка, но ему нужна возможность прочитать всё при наведении или переходе на страницу.';

export const MultiLine: Story = {
  tags: ['dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>MultiLine</DemoTitle>
        <DemoHint>Многострочная обрезка с лимитом числа строк.</DemoHint>
        <DemoActions block>
          <div className={styles.container}>
            <TruncateString variant={VARIANT.End} text={LONG_TEXT} maxLines={3} data-test-id={TEST_IDS.root} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
