import { Meta, StoryFn } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { Square } from './components/Square';
import { StateSquare } from './components/StateSquare';
import { STATE } from './constants';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Materials',
};

export default meta;

const stateValues = Object.values(STATE);

const Template: StoryFn = () => (
  <div className={styles.externalWrapper}>
    <StoryTable
      firstColumnHeader='State'
      columnHeaders={stateValues}
      rows={[
        {
          variantLabel: '',
          cells: stateValues.map(state => (
            <div key={state} className={styles.squareWrapper} data-state={state} data-background>
              {state === STATE.TextOpacity ? (
                <Square className={styles.opacityDemo}>
                  <div className={styles.contentLayer} data-state={STATE.TextOpacity}>
                    <div className={styles.pseudoContentLayer} data-text-opacity />
                  </div>
                </Square>
              ) : (
                <StateSquare state={state} />
              )}
            </div>
          )),
        },
      ]}
    />
  </div>
);

export const StateLayersVisualMatrix = {
  tags: ['dev', 'test'],
  parameters: { controls: { disable: true } },
  render: Template,
};
