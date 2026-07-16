import { ItemProps as Item, List } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

// Визуальная фикстура для composite `variant-state-matrix.png` (visual.spec.ts).
// Псевдоклассовые состояния (:hover / :focus-visible / :active) нельзя выразить
// в статичной VisualMatrix, поэтому обе строки матрицы рендерятся здесь детерминированно:
// single checked (state-layer `activatedFilled`) и multiple unchecked
// (state-layer `regularFilled` + чекбокс в кадре), а spec снимает
// default × hover × focus × pressed для каждой строки.
const items: Item[] = [
  {
    id: 'x',
    content: { label: 'Content text', description: 'Description text', caption: 'Caption' },
  },
];

// Unchecked: hover/pressed в multiple-режиме меняют фон ряда (regularFilled),
// checked-чекбокс статикой уже покрыт в VM (секция «Selection mode × State»).
const multipleItems: Item[] = [
  {
    id: 'y',
    content: { label: 'Content text', description: 'Description text', caption: 'Caption' },
  },
];

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Tests/InteractionStates',
  component: List,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof List>;

export const InteractionStatesFixture: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>InteractionStates fixture</DemoTitle>
        <DemoHint>
          Две строки variant-state-matrix.png: single checked (activatedFilled) и multiple (regularFilled, чекбокс в
          кадре).
        </DemoHint>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.root}
              size='m'
              marker
              items={items}
              selection={{ mode: 'single', defaultValue: 'x' }}
            />
          </div>
          {/* Без data-test-id: спек адресует item'ы через itemTestId('x') / itemTestId('y'). */}
          <div className={styles.listFrame}>
            <List size='m' items={multipleItems} selection={{ mode: 'multiple', defaultValue: [] }} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
