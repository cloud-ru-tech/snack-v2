import { RevealSection } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { SampleSection, ScrollPreview } from '../fixtures';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof RevealSection> = {
  title: 'Site/RevealSection/RevealSection',
  component: RevealSection,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    disabled: false,
    skipInitialViewport: false,
    duration: 650,
    delay: 0,
    offset: 28,
    easing: 'ease',
    rootMargin: '0px 0px -40px 0px',
    threshold: 0,
    'data-test-id': TEST_IDS.revealSection.root,
  },
  argTypes: {
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    duration: { control: { type: 'number', min: 0, step: 50 } },
    delay: { control: { type: 'number', min: 0, step: 50 } },
    offset: { control: { type: 'number', step: 4 } },
    easing: { control: 'text' },
    rootMargin: { control: 'text' },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
  },
};

export default meta;
type Story = StoryObj<typeof RevealSection>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <ScrollPreview>
      <RevealSection {...args} id={undefined} data-test-id={TEST_IDS.revealSection.initial}>
        <SampleSection title='Первый экран'>
          skipInitialViewport сохраняет видимую секцию без анимации. После изменения режима нажмите «Повторить».
        </SampleSection>
      </RevealSection>
      <div className={styles.spacer}>Прокрутите вниз</div>
      <RevealSection {...args}>
        <SampleSection />
      </RevealSection>
      <div className={styles.spacer} />
    </ScrollPreview>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);
    const viewport = canvas.getByTestId(TEST_IDS.viewport);
    const rootId = args['data-test-id'] ?? TEST_IDS.revealSection.root;

    if (args.disabled || globalThis.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      await expect(canvas.getByTestId(rootId)).toBeVisible();
      return;
    }

    await step('Секция скрыта до прокрутки', async () => {
      await waitFor(() => expect(canvas.getByTestId(rootId)).toHaveAttribute('data-revealed', 'false'));
    });

    await step('Секция появляется при входе в область просмотра', async () => {
      canvas.getByTestId(rootId).scrollIntoView({ block: 'center' });
      await waitFor(() => expect(canvas.getByTestId(rootId)).toHaveAttribute('data-revealed', 'true'));
    });

    await step('Обратная прокрутка не скрывает секцию', async () => {
      viewport.scrollTo(0, 0);
      await expect(canvas.getByTestId(rootId)).toHaveAttribute('data-revealed', 'true');
    });

    await step('Повторное монтирование возвращает начальное состояние', async () => {
      await userEvent.click(canvas.getByTestId(TEST_IDS.replay));
      await waitFor(() => expect(canvas.getByTestId(rootId)).toHaveAttribute('data-revealed', 'false'));
    });
  },
};
