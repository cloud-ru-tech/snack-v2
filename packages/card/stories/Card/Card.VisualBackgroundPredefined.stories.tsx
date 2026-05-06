import { Card, RADIUS, VIEW } from '@ds/card';
import { BACKGROUND_PREDEFINED_FILL, BackgroundPredefinedFill } from '@ds/materials';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Card>;

function renderCard(fill: BackgroundPredefinedFill): ReactElement {
  return (
    <Card backgroundPredefined={fill} radius={RADIUS.M} view={VIEW.Simple}>
      {fill}
    </Card>
  );
}

export const VisualBackgroundPredefined: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='backgroundPredefined'
        firstColumnHeader='Fill'
        columnHeaders={['Card']}
        rows={Object.values(BACKGROUND_PREDEFINED_FILL).map(fill => ({
          variantLabel: fill,
          cells: [renderCard(fill)],
        }))}
      />
    </div>
  ),
};
