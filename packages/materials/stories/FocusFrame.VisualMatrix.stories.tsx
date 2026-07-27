import { Meta, StoryFn } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { FocusSquare } from './components/FocusSquare';
import { FOCUS_APPEARANCE, FOCUS_POSITION } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Materials',
};

export default meta;

const appearances = Object.values(FOCUS_APPEARANCE);
const positions = Object.values(FOCUS_POSITION);

const Template: StoryFn = () => (
  <div className={styles.externalWrapper}>
    <StoryTable
      firstColumnHeader='Appearance \\ Position'
      columnHeaders={positions}
      rows={appearances.map(appearance => ({
        variantLabel: appearance,
        cells: positions.map(position => (
          <div key={position} className={styles.focusCell} data-focus-appearance={appearance}>
            <FocusSquare appearance={appearance} position={position} static />
          </div>
        )),
      }))}
    />
  </div>
);

export const FocusFrameVisualMatrix = {
  tags: ['dev', 'test'],
  parameters: { controls: { disable: true } },
  render: Template,
};
