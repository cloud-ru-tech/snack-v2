import { TOAST_SYSTEM_EVENT_APPEARANCE, ToastSystemEvent } from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof ToastSystemEvent> = {
  title: 'Components/Toaster/ToastSystemEvent',
  component: ToastSystemEvent,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToastSystemEvent>;

const appearances = Object.values(TOAST_SYSTEM_EVENT_APPEARANCE);

const noop = () => {};

const longTitle = 'Длинный заголовок уведомления, который должен переноситься на несколько строк';
const longDescription =
  'Подробное описание события — текст достаточно длинный, чтобы продемонстрировать wrap внутри узкого контейнера toaster.';

const twoActions = [
  { label: 'Основное', onClick: noop },
  { label: 'Отмена', onClick: noop },
];

const slotVariants = [
  { key: 'plain', props: {} },
  { key: 'withLink', props: { link: { text: 'Подробнее', href: '#' } } },
  { key: 'withAction', props: { action: twoActions } },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Progress bar'
        firstColumnHeader='appearance'
        columnHeaders={['without progress', 'with progress (50%)']}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: [
            <div key={`${appearance}-plain`} className={styles.toastCell}>
              <ToastSystemEvent
                appearance={appearance}
                closable
                progressBar={false}
                title='Заголовок'
                description='Короткое описание'
              />
            </div>,
            <div key={`${appearance}-progress`} className={`${styles.toastCell} ${styles.frozenProgressHalf}`}>
              <ToastSystemEvent
                appearance={appearance}
                closable
                progressBar
                autoClose={5000}
                title='Заголовок'
                description='Прогресс-полоса синхронизирована с autoClose'
              />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Slots (appearance=neutral)'
        firstColumnHeader='slot'
        columnHeaders={['toast']}
        rows={slotVariants.map(variant => ({
          variantLabel: variant.key,
          cells: [
            <div key={variant.key} className={styles.toastCell}>
              <ToastSystemEvent
                appearance='neutral'
                closable
                progressBar={false}
                title='Заголовок'
                description='Короткое описание'
                {...variant.props}
              />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Closable × Long content (appearance=neutral)'
        firstColumnHeader='closable'
        columnHeaders={['short', 'long wrap']}
        rows={[true, false].map(closable => ({
          variantLabel: closable ? 'true' : 'false',
          cells: [
            <div key={`${closable}-short`} className={styles.toastCell}>
              <ToastSystemEvent
                appearance='neutral'
                closable={closable}
                progressBar={false}
                title='Короткий заголовок'
              />
            </div>,
            <div key={`${closable}-long`} className={styles.toastCell}>
              <ToastSystemEvent
                appearance='neutral'
                closable={closable}
                progressBar={false}
                title={longTitle}
                description={longDescription}
              />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
