import {
  TOAST_USER_ACTION_APPEARANCE,
  TOASTER_WIDTH,
  ToastUserAction,
  ToastUserActionAction,
  ToastUserActionAppearance,
} from '@ds/toaster';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof ToastUserAction> = {
  title: 'Components/Toaster/ToastUserAction',
  component: ToastUserAction,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof ToastUserAction>;

const appearances = Object.values(TOAST_USER_ACTION_APPEARANCE);
const widths = Object.values(TOASTER_WIDTH);

const loadingRows: ReadonlyArray<{ key: string; props: { loading?: boolean; timer?: boolean } }> = [
  { key: 'default', props: {} },
  { key: 'loading', props: { loading: true } },
  { key: 'loading+timer', props: { loading: true, timer: true } },
];

const noop = () => {};

const actionPresets: ReadonlyArray<{ key: string; action: ToastUserActionAction | undefined }> = [
  { key: 'none', action: undefined },
  { key: 'labelOnly', action: { label: 'Отменить', onClick: noop } },
  {
    key: 'link (as=a)',
    action: {
      label: 'Подробнее',
      as: 'a',
      href: '#',
      onClick: (e: { preventDefault?(): void }) => e.preventDefault?.(),
    },
  },
];

function WidthCell({ width, children }: { width: ToastUserActionAppearance | 'auto' | 'full'; children: ReactNode }) {
  return (
    <div className={width === TOASTER_WIDTH.Full ? styles.widthFull : styles.widthAuto} data-width={width}>
      {children}
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Width'
        firstColumnHeader='Appearance'
        columnHeaders={widths}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: widths.map(width => (
            <WidthCell key={`${appearance}-${width}`} width={width}>
              <ToastUserAction
                appearance={appearance}
                label='Изменения сохранены'
                action={{ label: 'Отменить', onClick: noop }}
              />
            </WidthCell>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Loading & Timer × Appearance'
        firstColumnHeader='State'
        columnHeaders={appearances}
        rows={loadingRows.map(row => ({
          variantLabel: row.key,
          cells: appearances.map(appearance => (
            <WidthCell key={`${appearance}-${row.key}`} width='auto'>
              <ToastUserAction appearance={appearance} label='Авто-скрытие' {...row.props} />
            </WidthCell>
          )),
        }))}
      />

      <StoryTable
        sectionTitle={`Action slot (appearance=${TOAST_USER_ACTION_APPEARANCE.Neutral})`}
        firstColumnHeader='Preset'
        columnHeaders={['toast']}
        rows={actionPresets.map(preset => ({
          variantLabel: preset.key,
          cells: [
            <WidthCell key={preset.key} width='auto'>
              <ToastUserAction
                appearance={TOAST_USER_ACTION_APPEARANCE.Neutral}
                label='Изменения сохранены'
                action={preset.action}
              />
            </WidthCell>,
          ],
        }))}
      />
    </div>
  ),
};
