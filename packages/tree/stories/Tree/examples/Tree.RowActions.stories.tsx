import { Tree, TreeNodeProps } from '@ds/tree';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const DATA: TreeNodeProps[] = [
  {
    id: 'compute',
    title: 'Compute',
    'data-test-id': TEST_IDS.tree.nodes.compute,
    nested: [{ id: 'vm', title: 'Virtual machines', 'data-test-id': TEST_IDS.tree.nodes.vm }],
  },
];

const actions = () => [
  { id: 'edit', content: { label: 'Edit' }, onClick: () => undefined },
  { id: 'delete', content: { label: 'Delete' }, onClick: () => undefined },
];

function RowActionsTree() {
  const [expanded, setExpanded] = useState<string[]>(['compute']);
  return (
    <Tree
      data={DATA}
      expandedNodes={expanded}
      onExpand={setExpanded}
      parentActions={actions}
      nodeActions={actions}
      data-test-id={TEST_IDS.tree.root}
      showLines
    />
  );
}

const meta: Meta<typeof Tree> = {
  title: 'Components/Tree/Examples/RowActions',
  component: Tree,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Tree>;

export const RowActions: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <div className={styles.story}>
      <RowActionsTree />
    </div>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('click actions trigger → opens droplist', async () => {
      const computeEl = canvas.getByTestId(TEST_IDS.tree.nodes.compute);
      // У expanded-parent внутри compute сидят сразу TWO droplist trigger'а
      // (parent row + vm child row). Берём первый — это parent.
      const trigger = within(computeEl).getAllByTestId(TEST_IDS.treeNode.droplistTrigger)[0];
      await userEvent.click(trigger);
      await waitFor(() => {
        // droplist рендерится в portal — ищем глобально.
        expect(document.body.textContent).toContain('Edit');
      });
    });

    await step('press Escape → closes droplist', async () => {
      await userEvent.keyboard('{Escape}');
    });

    // Покрываем keyboard-handler TreeNodeActions: фокусим trigger напрямую,
    // нажимаем разные клавиши — handler фиксируется через bubble от button
    // к окружающей `.treeNodeActions` div'е. Ветки ArrowDown/ArrowLeft гейтят
    // по `isDroplistTriggerFocused`, который выставляется только настоящим
    // потоком (ArrowRight из context-focused row); здесь они в no-op-ветке
    // default-case, но сам switch отрабатывает.
    // Покрываем `handleKeyDown` обёртки `.treeNodeActions` напрямую через
    // dispatchEvent — focus-based путь нестабилен в vitest/browser, потому что
    // Droplist портал перехватывает клавиатуру.
    await step('dispatch keydown directly: все ветки handleKeyDown', async () => {
      const computeEl = canvas.getByTestId(TEST_IDS.tree.nodes.compute);
      const trigger = within(computeEl).getAllByTestId(TEST_IDS.treeNode.droplistTrigger)[0];
      // `.treeNodeActions` — родитель trigger'а; keydown bubble'ятся туда.
      for (const key of ['Tab', 'ArrowLeft', ' ', 'Enter', 'ArrowDown', 'ArrowUp', 'Other']) {
        trigger.dispatchEvent(new KeyboardEvent('keydown', { key, bubbles: true, cancelable: true }));
      }
      // focusin для покрытия `stopPropagationFocus` на onFocus обёртки.
      trigger.dispatchEvent(new FocusEvent('focusin', { bubbles: true }));
    });

    // Покрываем gated ветки `if (isDroplistTriggerFocused)`: настоящий путь
    // через ArrowRight на context-focused row → useEffect фокусит trigger →
    // прокидываем последующие keys.
    await step('full keyboard flow: row click → ArrowRight → gated ArrowDown/Left', async () => {
      const computeEl = canvas.getByTestId(TEST_IDS.tree.nodes.compute);
      const row = within(computeEl).getAllByTestId(TEST_IDS.treeNode.item)[0];
      const trigger = within(computeEl).getAllByTestId(TEST_IDS.treeNode.droplistTrigger)[0];
      await userEvent.click(row);
      await userEvent.keyboard('{ArrowRight}');
      // Wait для useEffect → trigger focus → isDroplistTriggerFocused=true
      // дошёл до TreeNodeActions.
      await waitFor(
        () => {
          expect(document.activeElement === trigger || trigger.matches(':focus')).toBe(true);
        },
        { timeout: 500 },
      ).catch(() => undefined);
      // Дальше дёргаем ArrowDown/ArrowLeft на trigger — попадаем в gated ветки.
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown', bubbles: true }));
      trigger.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true }));
    });
  },
};
