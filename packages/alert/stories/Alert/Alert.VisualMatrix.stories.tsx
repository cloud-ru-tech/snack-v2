import { Alert, ALIGN, APPEARANCE, SIZE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Alert> = {
  title: 'Components/Alert/Alert',
  component: Alert,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Alert>;

const keyAppearances = [
  APPEARANCE.Neutral,
  APPEARANCE.Primary,
  APPEARANCE.Info,
  APPEARANCE.Success,
  APPEARANCE.Warning,
  APPEARANCE.Error,
] as const;

const keySizes = [SIZE.S, SIZE.M] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size (horizontal)'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <div key={size} className={styles.container}>
              <Alert
                appearance={appearance}
                size={size}
                align={ALIGN.Horizontal}
                title={`Alert ${appearance}`}
                description='Краткое описание'
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Appearance × Vertical align (size=m)'
        firstColumnHeader='Appearance'
        columnHeaders={['vertical']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [
            <div key='v' className={styles.container}>
              <Alert
                appearance={appearance}
                size='m'
                align={ALIGN.Vertical}
                title={`Alert ${appearance}`}
                description='Краткое описание уведомления, занимающее несколько строк для демонстрации vertical-выравнивания.'
              />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Slots — actions / closable / collapsible (appearance=info, size=m)'
        firstColumnHeader='Slot'
        columnHeaders={['vertical', 'horizontal']}
        rows={[
          {
            variantLabel: 'actions (primary)',
            cells: [ALIGN.Vertical, ALIGN.Horizontal].map(align => (
              <div key={align} className={styles.container}>
                <Alert
                  appearance={APPEARANCE.Info}
                  size='m'
                  align={align}
                  title='With primary action'
                  description='Краткое описание'
                  actions={{ primary: { label: 'Принять' } }}
                />
              </div>
            )),
          },
          {
            variantLabel: 'actions (primary + secondary)',
            cells: [ALIGN.Vertical, ALIGN.Horizontal].map(align => (
              <div key={align} className={styles.container}>
                <Alert
                  appearance={APPEARANCE.Info}
                  size='m'
                  align={align}
                  title='With actions'
                  description='Краткое описание'
                  actions={{
                    primary: { label: 'Принять' },
                    secondary: { label: 'Отклонить' },
                  }}
                />
              </div>
            )),
          },
          {
            variantLabel: 'closable (onClose)',
            cells: [ALIGN.Vertical, ALIGN.Horizontal].map(align => (
              <div key={align} className={styles.container}>
                <Alert
                  appearance={APPEARANCE.Info}
                  size='m'
                  align={align}
                  title='Closable'
                  description='Краткое описание'
                  onClose={fn()}
                />
              </div>
            )),
          },
          {
            variantLabel: 'collapsible',
            cells: [ALIGN.Vertical, ALIGN.Horizontal].map(align => (
              <div key={align} className={styles.container}>
                <Alert
                  appearance={APPEARANCE.Info}
                  size='m'
                  align={align}
                  collapsible
                  title='Collapsible alert with a long title that requires expansion to read fully'
                  description='Длинное описание уведомления, скрытое до раскрытия в режиме collapsible. Подробности раскрываются по клику на алёрт.'
                  onClose={fn()}
                />
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Appearance × Outline (size=m)'
        firstColumnHeader='Appearance'
        columnHeaders={['outline/false', 'outline/true']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [false, true].map(outline => (
            <div key={String(outline)} className={styles.container}>
              <Alert
                appearance={appearance}
                outline={outline}
                size='m'
                align={ALIGN.Horizontal}
                title={`Alert ${appearance}`}
                description='Краткое описание'
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
