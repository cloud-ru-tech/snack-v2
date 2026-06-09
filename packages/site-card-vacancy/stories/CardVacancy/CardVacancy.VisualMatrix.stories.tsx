import { APPEARANCE, CardVacancy } from '@ds/site-card-vacancy';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof CardVacancy> = {
  title: 'Site/CardVacancy',
  component: CardVacancy,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof CardVacancy>;

const appearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        cellAlign='start'
        sectionTitle='Appearance × Mobile'
        firstColumnHeader='appearance'
        columnHeaders={['desktop', 'mobile']}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: [false, true].map(mobile => (
            <div key={String(mobile)} className={styles.card}>
              <CardVacancy
                href='#'
                appearance={appearance}
                mobile={mobile}
                title='Frontend Developer'
                description='Remote · Full-time'
              />
            </div>
          )),
        }))}
      />

      <StoryTable
        cellAlign='start'
        sectionTitle='Truncation (long title & description)'
        firstColumnHeader='appearance'
        columnHeaders={['desktop', 'mobile']}
        rows={appearances.map(appearance => ({
          variantLabel: appearance,
          cells: [false, true].map(mobile => (
            <div key={String(mobile)} className={styles.card}>
              <CardVacancy
                href='#'
                appearance={appearance}
                mobile={mobile}
                title='Senior Frontend Developer for the Cloud Platform team'
                description='Remote · Full-time · Relocation supported · Stock options'
              />
            </div>
          )),
        }))}
      />
    </div>
  ),
};
