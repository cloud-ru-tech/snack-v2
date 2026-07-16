import { Button } from '@ds/button';
import { Droplist, DroplistProps, ItemProps as Item, List, ListProps, SIZE } from '@ds/list';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import matrixStyles from '../List/stories.module.scss';

const meta: Meta<typeof Droplist> = {
  title: 'Components/List/Droplist',
  component: Droplist,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Droplist>;

const items: Item[] = [
  { id: 'a', content: { label: 'Overview' } },
  { id: 'b', content: { label: 'Analytics' } },
  { id: 'c', content: { label: 'Billing' } },
];

const keySizes = Object.values(SIZE);

function renderTrigger(props: { items: Item[]; size?: DroplistProps['size'] }) {
  return (
    <Droplist {...props}>
      <Button label={`Open (${String(props.size ?? 's').toUpperCase()})`} size='m' />
    </Droplist>
  );
}

// Droplist открывается в портале — статичную матрицу собрать нельзя. Та же поверхность item'ов
// показана через List (size × selection × checked); открытое состояние Droplist'а — в visual.spec.ts.
function renderSurface(props: ListProps) {
  return (
    <div className={matrixStyles.cell}>
      <List {...props} />
    </div>
  );
}

export const VisualMatrix: Story = {
  // no-a11y: статичная матрица без интерактивного фокуса; a11y проверяется на Playground/InteractionTest.
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={matrixStyles.matrix}>
      <StoryTable
        sectionTitle='Trigger × Size (closed)'
        firstColumnHeader='Size'
        columnHeaders={['trigger']}
        rows={keySizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [renderTrigger({ items, size })],
        }))}
      />

      <StoryTable
        sectionTitle='Droplist surface — item types (rendered as List, size m)'
        firstColumnHeader='Surface'
        columnHeaders={['single (checked)', 'multiple + switch', 'group → collapse']}
        rows={[
          {
            variantLabel: 'M',
            cells: [
              renderSurface({ items, size: 'm', marker: true, selection: { mode: 'single', defaultValue: 'b' } }),
              renderSurface({
                size: 'm',
                selection: { mode: 'multiple', defaultValue: ['a'] },
                items: [
                  { id: 'a', content: { label: 'Overview' } },
                  { id: 'notify', switch: true, content: { label: 'Notifications' } },
                ],
              }),
              renderSurface({
                size: 'm',
                collapse: { defaultValue: ['nested'] },
                items: [
                  {
                    type: 'group',
                    label: 'Workspace',
                    groupVariant: 'subtitle',
                    items: [
                      {
                        id: 'nested',
                        type: 'collapse',
                        content: { label: 'Resources' },
                        items: [{ id: 'leaf', content: { label: 'Servers' } }],
                      },
                    ],
                  },
                ],
              }),
            ],
          },
        ]}
      />
    </div>
  ),
};
