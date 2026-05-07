import type { Meta } from '@storybook/react';
import { Fragment } from 'react';

import { StoryTable } from '#storybook/components';

import { MaterialSquare } from './components/MaterialSquare';
import { APPEARANCE, LEVEL } from './constants';
import styles from './styles.module.scss';
import type { Appearance, Level } from './types';

const meta: Meta = {
  title: 'Materials/Materials Visual Matrix',
  args: {},
  argTypes: {},
};

export default meta;

const appearances = Object.values(APPEARANCE);
const levels = Object.values(LEVEL);

/** В Figma decorTransparent и transparent стоят в одной строке с default-образцами, не в сетке 3×N по уровням. */
function matrixCell(appearance: Appearance, level: Level) {
  if (appearance === APPEARANCE.DecorTransparent && level !== LEVEL.Default) {
    return <span className={styles.matrixCellPlaceholder}>—</span>;
  }

  if (appearance === APPEARANCE.Transparent && level !== LEVEL.Default) {
    return <span className={styles.matrixCellPlaceholder}>—</span>;
  }

  return <MaterialSquare appearance={appearance} level={level} />;
}

const Template = () => (
  <div className={styles.externalWrapper}>
    <StoryTable
      firstColumnHeader='Level \\ Appearance'
      columnHeaders={appearances}
      rows={levels.map(level => ({
        variantLabel: level,
        cells: appearances.map(appearance => (
          <Fragment key={`${level}-${appearance}`}>{matrixCell(appearance, level)}</Fragment>
        )),
      }))}
    />
  </div>
);

export const MaterialsVisualMatrix = {
  tags: ['dev', 'test'],
  parameters: { controls: { disable: true } },
  render: Template,
};
