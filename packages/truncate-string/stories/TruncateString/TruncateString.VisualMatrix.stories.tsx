import { TruncateString, VARIANT } from '@ds/truncate-string';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof TruncateString> = {
  title: 'Components/TruncateString',
  component: TruncateString,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof TruncateString>;

const SHORT = 'Короткий текст';
const MEDIUM = 'Текст средней длины, который возможно не поместится';
const LONG = 'Очень длинный текст, который точно не поместится в узкий контейнер и должен быть обрезан';

const widths = [
  { key: '160px', className: styles.containerNarrow },
  { key: '220px', className: styles.container },
  { key: '360px', className: styles.containerWide },
] as const;

const samples = [
  { key: 'short', text: SHORT },
  { key: 'medium', text: MEDIUM },
  { key: 'long', text: LONG },
];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Variant × Width (text=long, maxLines=1)'
        firstColumnHeader='Variant'
        columnHeaders={widths.map(w => w.key)}
        rows={[
          {
            variantLabel: 'end',
            cells: widths.map(w => (
              <div key={w.key} className={w.className}>
                <TruncateString variant={VARIANT.End} text={LONG} maxLines={1} />
              </div>
            )),
          },
          {
            variantLabel: 'middle',
            cells: widths.map(w => (
              <div key={w.key} className={w.className}>
                <TruncateString variant={VARIANT.Middle} text={LONG} />
              </div>
            )),
          },
        ]}
      />

      <StoryTable
        sectionTitle='Text length × Variant (width=220)'
        firstColumnHeader='Length'
        columnHeaders={['end', 'middle']}
        rows={samples.map(s => ({
          variantLabel: s.key,
          cells: [
            <div key='end' className={styles.container}>
              <TruncateString variant={VARIANT.End} text={s.text} maxLines={1} />
            </div>,
            <div key='middle' className={styles.container}>
              <TruncateString variant={VARIANT.Middle} text={s.text} />
            </div>,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='maxLines (variant=end, width=220)'
        firstColumnHeader='maxLines'
        columnHeaders={['Result']}
        rows={[1, 2, 3].map(n => ({
          variantLabel: String(n),
          cells: [
            <div key={n} className={styles.container}>
              <TruncateString
                variant={VARIANT.End}
                text='Длинное описание задачи или комментария, которое можно обрезать по числу строк'
                maxLines={n}
              />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
