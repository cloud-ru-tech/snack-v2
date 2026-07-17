import { Button } from '@ds/button';
import { FieldSelect, TEST_IDS } from '@ds/fields';
import { ItemId, ItemProps } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

const ALL_OPTIONS: ItemProps[] = [
  { id: 'ru-central1-a', content: { option: 'ru-central1-a' } },
  { id: 'ru-central1-b', content: { option: 'ru-central1-b' } },
  { id: 'kz-central1-a', content: { option: 'kz-central1-a' } },
];

// Имитация backend-состояний дроплиста: потребитель сам ведёт стейт-машину и переключает
// loading / empty / error флаги FieldSelect. Эти ветви не выражаются ни args Playground'а,
// ни строкой VisualMatrix — нужен живой провайдер.
type DataState = 'loading' | 'loaded' | 'empty' | 'error';

const SCENARIO_BUTTON_IDS = {
  loading: 'field-select-async-loading',
  loaded: 'field-select-async-loaded',
  empty: 'field-select-async-empty',
  error: 'field-select-async-error',
} as const;

function AsyncStatesDemo() {
  const [state, setState] = useState<DataState>('loaded');
  const [value, setValue] = useState<ItemId | undefined>(undefined);

  const items = state === 'loaded' ? ALL_OPTIONS : [];

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>Async droplist states</DemoTitle>
        <DemoHint>
          Переключите имитируемое состояние backend&apos;а — дроплист показывает loader / список / noData /
          errorDataState.
        </DemoHint>
        <DemoActions align='start'>
          <Button
            label='Loading'
            size='s'
            view='outline'
            appearance='neutral'
            onClick={() => setState('loading')}
            data-test-id={SCENARIO_BUTTON_IDS.loading}
          />
          <Button
            label='Loaded'
            size='s'
            view='outline'
            appearance='neutral'
            onClick={() => setState('loaded')}
            data-test-id={SCENARIO_BUTTON_IDS.loaded}
          />
          <Button
            label='Empty'
            size='s'
            view='outline'
            appearance='neutral'
            onClick={() => setState('empty')}
            data-test-id={SCENARIO_BUTTON_IDS.empty}
          />
          <Button
            label='Error'
            size='s'
            view='outline'
            appearance='neutral'
            onClick={() => setState('error')}
            data-test-id={SCENARIO_BUTTON_IDS.error}
          />
          <FieldSelect
            data-test-id={TEST_IDS.fieldSelect}
            label='Зона доступности'
            placeholder='Выберите зону'
            selection='single'
            items={items}
            value={value}
            onChange={setValue}
            loading={state === 'loading'}
            dataError={state === 'error'}
            noDataState={{ content: 'Зоны недоступны' }}
            errorDataState={{ content: 'Не удалось загрузить зоны' }}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof FieldSelect> = {
  title: 'Components/Fields/FieldSelect/Examples/AsyncStates',
  component: FieldSelect,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldSelect>;

export const AsyncStates: Story = {
  tags: ['dev', 'test'],
  render: () => <AsyncStatesDemo />,
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.fieldSelect)).toBeVisible();
  },
};
