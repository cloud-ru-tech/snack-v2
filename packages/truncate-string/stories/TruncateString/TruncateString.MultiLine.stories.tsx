import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import styles from './stories.module.scss';
import { TRUNCATE_STRING_TEST_ID } from './testIds';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'centered', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const LONG_TEXT =
  'Описание задачи с несколькими предложениями. Пользователь не хочет видеть полный текст в карточке списка, но ему нужна возможность прочитать всё при наведении или переходе на страницу.';

export const MultiLine: Story = {
  tags: ['dev'],
  render: () => (
    <div className={styles.container}>
      <TruncateString variant={VARIANT.End} text={LONG_TEXT} maxLines={3} data-test-id={TRUNCATE_STRING_TEST_ID} />
    </div>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TRUNCATE_STRING_TEST_ID)).toBeVisible();
  },
};
