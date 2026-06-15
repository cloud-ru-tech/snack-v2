import { FieldText, SIZE, TEST_IDS } from '@ds/fields';
import { PlaceholderSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ResizableWrapper } from '../../_shared';
import { TEST_IDS as STORY_TEST_IDS } from '../testIds';

const ITEMS = [
  { id: '1', content: { option: 'Content text 1' }, 'data-test-id': `${STORY_TEST_IDS.fieldText.droplistItem}-1` },
  { id: '2', content: { option: 'Content text 2' }, 'data-test-id': `${STORY_TEST_IDS.fieldText.droplistItem}-2` },
  { id: '3', content: { option: 'Content text 3' }, 'data-test-id': `${STORY_TEST_IDS.fieldText.droplistItem}-3` },
];

const meta: Meta<typeof FieldText> = {
  title: 'Components/Fields/FieldText/Examples/WithDroplist',
  component: FieldText,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof FieldText>;

function WithDroplistDemo() {
  const [beforeValue, setBeforeValue] = useState('');
  const [beforeSelected, setBeforeSelected] = useState<string | number | undefined>();
  const [afterValue, setAfterValue] = useState('');
  const [afterSelected, setAfterSelected] = useState<string | number | undefined>();
  const [multipleValue, setMultipleValue] = useState('');
  const [multipleSelected, setMultipleSelected] = useState<string[]>([]);

  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoTitle>elementBefore</DemoTitle>
        <DemoHint>Встроенный выпадающий список в слоте-кнопке слева.</DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldText
              data-test-id={STORY_TEST_IDS.fieldText.droplistBeforeRoot}
              size={SIZE.S}
              label='Label text'
              required
              labelTooltip={{ tip: 'Подсказка' }}
              caption='Caption'
              placeholder='Placeholder'
              value={beforeValue}
              onChange={setBeforeValue}
              showClearButton={false}
              showCopyButton={false}
              length={{ current: beforeValue.length, max: 20 }}
              elementBefore={{
                action: <PlaceholderSVG />,
                'data-test-id': STORY_TEST_IDS.fieldText.droplistBeforeButton,
                droplist: {
                  items: ITEMS,
                  closeDroplistOnItemClick: true,
                  selection: {
                    mode: 'single',
                    value: beforeSelected,
                    onChange: id => {
                      setBeforeSelected(id);
                      setBeforeValue('Content text 1');
                    },
                  },
                },
              }}
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>

      <DemoPanel width='narrow'>
        <DemoTitle>elementAfter</DemoTitle>
        <DemoHint>Встроенный выпадающий список в слоте-кнопке справа.</DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldText
              data-test-id={STORY_TEST_IDS.fieldText.droplistAfterRoot}
              size={SIZE.S}
              label='Label text'
              required
              labelTooltip={{ tip: 'Подсказка' }}
              caption='Caption'
              hint='Hint text'
              placeholder='Placeholder'
              value={afterValue}
              onChange={setAfterValue}
              showClearButton={false}
              showCopyButton={false}
              elementAfter={{
                action: <PlaceholderSVG />,
                'data-test-id': STORY_TEST_IDS.fieldText.droplistAfterButton,
                droplist: {
                  items: ITEMS,
                  placement: 'bottom-end',
                  closeDroplistOnItemClick: true,
                  selection: {
                    mode: 'single',
                    value: afterSelected,
                    onChange: id => {
                      setAfterSelected(id);
                      setAfterValue('Content text 2');
                    },
                  },
                },
              }}
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>

      <DemoPanel width='narrow'>
        <DemoTitle>elementAfter — множественный выбор</DemoTitle>
        <DemoHint>Слот с множественным выбором (`selection.mode = multiple`); список остаётся открытым.</DemoHint>
        <DemoActions align='center'>
          <ResizableWrapper>
            <FieldText
              data-test-id={STORY_TEST_IDS.fieldText.droplistMultipleRoot}
              size={SIZE.S}
              label='Label text'
              caption='Caption'
              placeholder='Placeholder'
              value={multipleValue}
              onChange={setMultipleValue}
              showClearButton={false}
              showCopyButton={false}
              elementAfter={{
                action: <PlaceholderSVG />,
                'data-test-id': STORY_TEST_IDS.fieldText.droplistMultipleButton,
                droplist: {
                  items: ITEMS,
                  placement: 'bottom-end',
                  closeDroplistOnItemClick: false,
                  selection: {
                    mode: 'multiple',
                    value: multipleSelected,
                    onChange: ids => {
                      setMultipleSelected(ids.map(String));
                      setMultipleValue(`${ids.length} выбрано`);
                    },
                  },
                },
              }}
            />
          </ResizableWrapper>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

// Пункты Droplist рендерятся в портал вне canvasElement — ищем их через document по item-id.
function queryDroplistItem(id: string): HTMLElement | null {
  return document.querySelector(`[data-test-id="${id}"]`);
}

export const WithDroplist: Story = {
  tags: ['dev', 'test'],
  render: () => <WithDroplistDemo />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const beforeRoot = canvas.getByTestId(STORY_TEST_IDS.fieldText.droplistBeforeRoot);
    const afterRoot = canvas.getByTestId(STORY_TEST_IDS.fieldText.droplistAfterRoot);
    const multipleRoot = canvas.getByTestId(STORY_TEST_IDS.fieldText.droplistMultipleRoot);

    await step('renders all droplist-bearing fields', async () => {
      await expect(beforeRoot).toBeVisible();
      await expect(afterRoot).toBeVisible();
      await expect(multipleRoot).toBeVisible();
    });

    await step('elementBefore: click trigger opens portal → click item fills input and refocuses', async () => {
      await userEvent.click(canvas.getByTestId(STORY_TEST_IDS.fieldText.droplistBeforeButton));
      const itemId = `${STORY_TEST_IDS.fieldText.droplistItem}-1`;
      await waitFor(() => expect(queryDroplistItem(itemId)).not.toBeNull());
      const item = queryDroplistItem(itemId);
      if (item) {
        await userEvent.click(item);
      }

      const input = within(beforeRoot).getByTestId(TEST_IDS.fieldTextInput) as HTMLInputElement;
      await waitFor(() => expect(input.value).toBe('Content text 1'));
      // returnFocus возвращает фокус в input через setTimeout(0) — ждём явно.
      await waitFor(() => expect(input).toHaveFocus());
    });

    await step('elementAfter multiple: select two items, value reflects 2 selected, list stays open', async () => {
      // closeDroplistOnItemClick: false + selection.mode = 'multiple' — упражняет ветку
      // wrapSelection(multiple) + returnFocus, список не закрывается между кликами.
      await userEvent.click(canvas.getByTestId(STORY_TEST_IDS.fieldText.droplistMultipleButton));
      const firstId = `${STORY_TEST_IDS.fieldText.droplistItem}-1`;
      await waitFor(() => expect(queryDroplistItem(firstId)).not.toBeNull());

      const firstItem = queryDroplistItem(firstId);
      if (firstItem) {
        await userEvent.click(firstItem);
      }
      // Список остаётся открытым — второй пункт по-прежнему в DOM.
      const secondId = `${STORY_TEST_IDS.fieldText.droplistItem}-2`;
      await waitFor(() => expect(queryDroplistItem(secondId)).not.toBeNull());
      const secondItem = queryDroplistItem(secondId);
      if (secondItem) {
        await userEvent.click(secondItem);
      }

      const input = within(multipleRoot).getByTestId(TEST_IDS.fieldTextInput) as HTMLInputElement;
      await waitFor(() => expect(input.value).toBe('2 выбрано'));
      // closeDroplistOnItemClick: false → список не закрылся, оба пункта ещё в портале.
      await expect(queryDroplistItem(firstId)).not.toBeNull();
      await expect(queryDroplistItem(secondId)).not.toBeNull();
    });
  },
};
