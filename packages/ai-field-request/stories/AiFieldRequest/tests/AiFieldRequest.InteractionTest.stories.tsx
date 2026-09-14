import { AiFieldRequest, APPEARANCE } from '@ds/ai-field-request';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const LONG_CONTENT =
  'Виртуальная машина будет остановлена и удалена вместе с дисками. Дополнительное описание действия занимает несколько строк и используется для проверки раскрытия длинного текста в свёрнутом и развёрнутом состояниях. Ещё один абзац с нейтральным содержимым без привязки к предметной области. Третий абзац нужен, чтобы содержимое переполняло предел по высоте и на широком экране: тогда кнопка «Показать» появляется в любой ширине карточки, а не только в узкой.';

const meta: Meta<typeof AiFieldRequest> = {
  title: 'Ai/AiFieldRequest/Tests/Interaction',
  component: AiFieldRequest,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    primaryAction: { label: 'Подтвердить', onClick: fn() },
    secondaryAction: { label: 'Отмена', onClick: fn() },
  },
};

export default meta;
type Story = StoryObj<typeof AiFieldRequest>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldRequest
            {...args}
            className={styles.root}
            title='Удалить виртуальную машину?'
            content={LONG_CONTENT}
            hint='Подсказка под панелью'
            appearance={APPEARANCE.Primary}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    await expect(root).toBeVisible();

    const expand = await canvas.findByTestId(TEST_IDS.expand);
    await userEvent.click(expand);
    await expect(root).toHaveAttribute('data-open', 'true');
    await userEvent.click(expand);
    await expect(root).not.toHaveAttribute('data-open');
    await expect(expand).toHaveFocus();

    await userEvent.click(canvas.getByTestId(TEST_IDS.primaryAction));
    expect(args.primaryAction.onClick).toHaveBeenCalledTimes(1);
    await userEvent.click(canvas.getByTestId(TEST_IDS.secondaryAction));
    expect(args.secondaryAction.onClick).toHaveBeenCalledTimes(1);
  },
};

function ControlledOpenDemo() {
  const [open, setOpen] = useState(false);

  return (
    <AiFieldRequest
      className={styles.root}
      title='Удалить виртуальную машину?'
      content={LONG_CONTENT}
      open={open}
      onOpenChange={setOpen}
      primaryAction={{ label: 'Подтвердить' }}
      secondaryAction={{ label: 'Отмена' }}
      data-test-id={TEST_IDS.root}
    />
  );
}

export const ControlledOpen: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <ControlledOpenDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.root);
    await userEvent.click(await canvas.findByTestId(TEST_IDS.expand));
    await expect(root).toHaveAttribute('data-open', 'true');
  },
};

export const ShortContent: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldRequest
            className={styles.root}
            title='Удалить виртуальную машину?'
            content='Диски будут удалены вместе с машиной.'
            primaryAction={{ label: 'Подтвердить' }}
            secondaryAction={{ label: 'Отмена' }}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByTestId(TEST_IDS.root)).toBeVisible();
    await expect(canvas.getByTestId(TEST_IDS.expand)).toHaveAttribute('aria-hidden', 'true');
  },
};

export const Loading: Story = {
  tags: ['test', 'dev'],
  args: {
    title: 'Удалить виртуальную машину?',
    content: LONG_CONTENT,
    hint: 'Подсказка под панелью',
    primaryAction: { label: 'Подтвердить', loading: true },
    secondaryAction: { label: 'Отмена' },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldRequest {...args} className={styles.root} data-test-id={TEST_IDS.root} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

function ConstrainedHeightDemo() {
  const [open, setOpen] = useState(true);

  return (
    <div className={styles.constrainedParent} data-test-id={TEST_IDS.constrainedParent}>
      <AiFieldRequest
        className={styles.constrainedRoot}
        title='Удалить виртуальную машину?'
        content={LONG_CONTENT}
        hint='Подсказка под панелью'
        appearance={APPEARANCE.Primary}
        primaryAction={{ label: 'Подтвердить' }}
        secondaryAction={{ label: 'Отмена' }}
        open={open}
        onOpenChange={setOpen}
        data-test-id={TEST_IDS.root}
      />
    </div>
  );
}

export const ConstrainedHeight: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <ConstrainedHeightDemo />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
