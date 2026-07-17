import { FolderSVG, HomeSVG, StarSVG } from '@ds/icons/interface/system';
import { ItemContentProps, ItemProps as Item, List, TEST_IDS as INTERNAL_TEST_IDS } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode, useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../stories.module.scss';

const meta: Meta<typeof List> = {
  title: 'Components/List/List/Tests/Interaction',
  component: List,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { 'data-test-id': TEST_IDS.list.root },
};

export default meta;
type Story = StoryObj<typeof List>;

const onClickA = fn();
const onClickB = fn();

const items: Item[] = [
  { id: 'a', beforeContent: <HomeSVG />, content: { option: 'Overview' }, onClick: onClickA },
  { id: 'b', beforeContent: <StarSVG />, content: { option: 'Analytics' }, onClick: onClickB },
  { id: 'c', content: { option: 'Billing' } },
  { id: 'notify', switch: true, content: { option: 'Notifications' } },
  // inactive: рендерится, но не выбирается и выпадает из навигации; без onClick → data-non-pointer.
  { id: 'dim', inactive: true, content: { option: 'Inactive row' } },
  // hidden: не рендерится в DOM вовсе.
  { id: 'ghost', hidden: true, content: { option: 'Hidden row' } },
];

const pinTop: Item[] = [{ id: 'pinned', beforeContent: <FolderSVG />, content: { option: 'Pinned' } }];

// Отдельный список с contentRender — кастомный рендер заменяет дефолтный ItemContent.
const CONTENT_RENDER_ROOT = 'list-content-render';
const CONTENT_RENDER_CUSTOM = 'list-content-render__custom';
const contentRenderItems: Item[] = [{ id: 'cr', content: { option: 'Original option' } }];

function renderContent({ content }: { content?: ItemContentProps | ReactNode }): ReactNode {
  const option = content && typeof content === 'object' && 'option' in content ? content.option : '';
  return <span data-test-id={CONTENT_RENDER_CUSTOM}>Custom · {option}</span>;
}

const itemId = (id: string) => `${INTERNAL_TEST_IDS.baseItem}_${id}`;
// SearchPrivate рендерит нативный input с этим data-test-id (из @ds/search-private).
const SEARCH_INPUT_TEST_ID = 'search__field-input';

function matchesSearch(item: Item, query: string): boolean {
  const content = 'content' in item ? item.content : undefined;
  if (typeof content === 'object' && content && 'option' in content) {
    return String(content.option).toLowerCase().includes(query.toLowerCase());
  }
  return true;
}

function InteractionScenario() {
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Array<string | number>>([]);
  const filtered = items.filter(item => matchesSearch(item, search));
  return (
    <DemoPage>
      <DemoPanel width='narrow'>
        <DemoActions align='center'>
          <div className={styles.listFrame}>
            <List
              data-test-id={TEST_IDS.list.root}
              items={filtered}
              pinTop={pinTop}
              size='m'
              marker
              selection={{ mode: 'multiple', value: selected, onChange: setSelected }}
              search={{ placeholder: 'Search', value: search, onChange: setSearch }}
            />
          </div>
          <div className={styles.listFrame}>
            <List
              data-test-id={CONTENT_RENDER_ROOT}
              items={contentRenderItems}
              size='m'
              contentRender={renderContent}
            />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => <InteractionScenario />,
  play: async ({ canvasElement, step }) => {
    onClickA.mockClear();
    onClickB.mockClear();
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.list.root);

    await step('renders root', async () => {
      await expect(root).toBeVisible();
    });

    await step('click: item with onClick fires its callback and selects it (multiple mode)', async () => {
      const overview = canvas.getByTestId(itemId('a'));
      await userEvent.click(overview);
      expect(onClickA).toHaveBeenCalledTimes(1);
      await expect(overview).toHaveAttribute('data-checked', 'true');
    });

    await step('click: second item toggles independently and keeps the first checked', async () => {
      const analytics = canvas.getByTestId(itemId('b'));
      await userEvent.click(analytics);
      expect(onClickB).toHaveBeenCalledTimes(1);
      await expect(analytics).toHaveAttribute('data-checked', 'true');
      await expect(canvas.getByTestId(itemId('a'))).toHaveAttribute('data-checked', 'true');
    });

    await step('click: clicking a selected item deselects it', async () => {
      const overview = canvas.getByTestId(itemId('a'));
      await userEvent.click(overview);
      await expect(overview).not.toHaveAttribute('data-checked', 'true');
    });

    await step('inactive item is non-interactive (data-non-pointer on the row, never checked)', async () => {
      // data-inactive живёт на внешней обёртке (itemWrapper); адресуемый <li> несёт data-non-pointer.
      const dim = canvas.getByTestId(itemId('dim'));
      await expect(dim).toHaveAttribute('data-non-pointer', 'true');
      await expect(dim).not.toHaveAttribute('data-checked', 'true');
    });

    await step('hidden item is absent from the DOM', async () => {
      await expect(canvas.queryByTestId(itemId('ghost'))).toBeNull();
    });

    await step('switch item toggles selection via its Switch input', async () => {
      // У switch-item состояние выбора несёт сам Switch (его нативный input), а не data-checked на <li>.
      const notify = canvas.getByTestId(itemId('notify'));
      const switchInput = canvas.getByTestId(`${INTERNAL_TEST_IDS.baseItemSwitch}-native-input`);
      await expect(switchInput).not.toBeChecked();
      await userEvent.click(notify);
      await expect(switchInput).toBeChecked();
    });

    await step('contentRender replaces the default ItemContent', async () => {
      const crRoot = canvas.getByTestId(CONTENT_RENDER_ROOT);
      await expect(within(crRoot).getByTestId(CONTENT_RENDER_CUSTOM)).toBeVisible();
      await expect(within(crRoot).queryByTestId(INTERNAL_TEST_IDS.baseItemOption)).toBeNull();
    });

    await step('search: typing filters items by content option', async () => {
      const input = canvas.getByTestId(SEARCH_INPUT_TEST_ID);
      await userEvent.click(input);
      await userEvent.type(input, 'Analyt');
      await expect(canvas.getByTestId(itemId('b'))).toBeVisible();
      await expect(canvas.queryByTestId(itemId('a'))).toBeNull();
      await userEvent.clear(input);
      await expect(canvas.getByTestId(itemId('a'))).toBeVisible();
    });

    await step('keyboard: root is focusable, ArrowDown moves focus off the root into the list', async () => {
      root.focus();
      await expect(root).toHaveFocus();
      await userEvent.keyboard('{ArrowDown}');
      await expect(root).not.toHaveFocus();
    });
  },
};
