import type { Meta } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MaterialSquare } from './components/MaterialSquare';
import { APPEARANCE, LEVEL } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Materials/Materials Visual Matrix',
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2014-81002&p=f&m=dev',
    },
  },
  args: {},
  argTypes: {},
};

export default meta;

const appearances = Object.values(APPEARANCE);
const levels = Object.values(LEVEL);

const Template = () => (
  <div className={styles.externalWrapper}>
    <StoryTable
      firstColumnHeader='Level \ Appearance'
      columnHeaders={appearances}
      rows={levels.map(level => ({
        variantLabel: level,
        cells: appearances.map(appearance => <MaterialSquare key={appearance} appearance={appearance} level={level} />),
      }))}
    />
  </div>
);

export const MaterialsVisualMatrix = {
  tags: ['dev', 'test'],
  render: Template,
};
