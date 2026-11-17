import { Button } from '@ds/button';
import { RevealSections, RevealSectionsProps } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useCallback, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HIDDEN_ROOT_MARGIN } from '../../constants';
import { SampleSection } from '../../fixtures';
import styles from '../../styles.module.scss';
import { TEST_IDS } from '../../testIds';

function GroupFixture(args: RevealSectionsProps) {
  const [skipFirst, setSkipFirst] = useState(true);
  const [skipSelected, setSkipSelected] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const handleFirst = useCallback(() => setSkipFirst(value => !value), []);
  const handleSelected = useCallback(() => setSkipSelected(value => !value), []);
  const handleDisabled = useCallback(() => setDisabled(value => !value), []);

  return (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Исключения из анимации группы</DemoTitle>
        <DemoHint>Исключённые элементы не получают дополнительную DOM-обёртку.</DemoHint>
        <DemoActions>
          <Button label='Переключить skipFirst' onClick={handleFirst} data-test-id={TEST_IDS.toggleFirst} />
          <Button label='Исключить вторую секцию' onClick={handleSelected} data-test-id={TEST_IDS.toggleSelected} />
          <Button label='Переключить disabled' onClick={handleDisabled} data-test-id={TEST_IDS.toggleDisabled} />
        </DemoActions>
        <div className={styles.stack} data-test-id={TEST_IDS.revealSections.host}>
          <RevealSections
            {...args}
            skipFirst={skipFirst}
            shouldSkip={skipSelected ? args.shouldSkip : undefined}
            disabled={disabled}
            rootMargin={HIDDEN_ROOT_MARGIN}
          >
            <div data-test-id={TEST_IDS.revealSections.first}>
              <SampleSection title='Первая секция' />
            </div>
            {null}
            <div data-test-id={TEST_IDS.revealSections.second}>
              <SampleSection title='Вторая секция' />
            </div>
            <div data-test-id={TEST_IDS.revealSections.third}>
              <SampleSection title='Третья секция' />
            </div>
            {'Текстовая секция'}
          </RevealSections>
        </div>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof RevealSections> = {
  title: 'Site/RevealSection/RevealSections/Tests/Interaction',
  component: RevealSections,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
  args: { shouldSkip: fn((_child: ReactNode, index: number) => index === 1) },
};

export default meta;
type Story = StoryObj<typeof RevealSections>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => <GroupFixture {...args} />,
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const host = canvas.getByTestId(TEST_IDS.revealSections.host);
    const first = () => canvas.getByTestId(TEST_IDS.revealSections.first);
    const second = () => canvas.getByTestId(TEST_IDS.revealSections.second);
    const third = () => canvas.getByTestId(TEST_IDS.revealSections.third);

    await step('Первая секция пропущена, остальные обёрнуты', async () => {
      await expect(first().parentElement).toBe(host);
      await expect(second().parentElement).toHaveAttribute('data-revealed', 'false');
      await expect(third().parentElement).toHaveAttribute('data-revealed', 'false');
      await expect(host.children).toHaveLength(4);
      await expect(host.lastElementChild?.textContent).toBe('Текстовая секция');
    });

    await step('shouldSkip исключает вторую секцию и не вызывается для первой', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggleSelected));
      await waitFor(() => expect(second().parentElement).toBe(host));
      await expect(first().parentElement).toBe(host);
      await expect(third().parentElement).toHaveAttribute('data-revealed', 'false');
      await expect(args.shouldSkip).toHaveBeenCalledWith(expect.anything(), 1);
      await expect(args.shouldSkip).not.toHaveBeenCalledWith(expect.anything(), 0);
    });

    await step('skipFirst=false оборачивает первую секцию', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggleFirst));
      await waitFor(() => expect(first().parentElement).toHaveAttribute('data-revealed', 'false'));
      await expect(args.shouldSkip).toHaveBeenCalledWith(expect.anything(), 0);
      await expect(second().parentElement).toBe(host);
    });

    await step('Отключение shouldSkip возвращает обёртку второй секции', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggleSelected));
      await waitFor(() => expect(second().parentElement).toHaveAttribute('data-revealed', 'false'));
    });

    await step('disabled показывает все секции, сохраняя обёртки', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.toggleDisabled));
      await waitFor(() => expect(first().parentElement).toHaveAttribute('data-reveal-disabled', 'true'));
      await expect(second().parentElement).toHaveAttribute('data-reveal-disabled', 'true');
      await expect(third().parentElement).toHaveAttribute('data-reveal-disabled', 'true');
      await expect(first()).toBeVisible();
      await expect(second()).toBeVisible();
      await expect(third()).toBeVisible();
    });
  },
};
