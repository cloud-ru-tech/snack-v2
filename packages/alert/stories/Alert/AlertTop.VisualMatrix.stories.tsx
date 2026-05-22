import { AlertTop, APPEARANCE } from '@ds/alert';
import { Meta, StoryObj } from '@storybook/react';
import { fn } from 'storybook/test';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof AlertTop> = {
  title: 'Components/Alert/AlertTop',
  component: AlertTop,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AlertTop>;

const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Icon'
        firstColumnHeader='Appearance'
        columnHeaders={['icon=true', 'icon=false']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [true, false].map(icon => (
            <div key={String(icon)} className={styles.wide}>
              <AlertTop
                appearance={appearance}
                icon={icon}
                title={`AlertTop ${appearance}`}
                description='Краткое описание системного уведомления.'
              />
            </div>
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Appearance × Actions/onClose'
        firstColumnHeader='Appearance'
        columnHeaders={['with actions', 'with onClose']}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: [
            <div key='actions' className={styles.wide}>
              <AlertTop
                appearance={appearance}
                title={`AlertTop ${appearance}`}
                description='Краткое описание системного уведомления.'
                actions={{
                  primary: { label: 'Принять' },
                  secondary: { label: 'Отклонить' },
                }}
              />
            </div>,
            <div key='close' className={styles.wide}>
              <AlertTop
                appearance={appearance}
                title={`AlertTop ${appearance}`}
                description='Краткое описание системного уведомления.'
                onClose={fn()}
              />
            </div>,
          ],
        }))}
      />
    </div>
  ),
};
