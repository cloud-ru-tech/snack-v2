import { ORIENTATION, SIZE, Tabs } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

function HorizontalBar({ size }: { size: 'l' | 'm' }) {
  return (
    <div className={styles.wide}>
      <Tabs defaultValue='a'>
        <Tabs.TabBar size={size}>
          {items.map(i => (
            <Tabs.Tab key={i.value} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
    </div>
  );
}

function VerticalBar({ size }: { size: 'l' | 'm' }) {
  return (
    <div className={styles.wide}>
      <Tabs defaultValue='a'>
        <Tabs.TabBar size={size} orientation={ORIENTATION.Vertical}>
          {items.map(i => (
            <Tabs.Tab key={i.value} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
    </div>
  );
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Size × Orientation'
        firstColumnHeader='Size'
        columnHeaders={['horizontal', 'vertical']}
        rows={([SIZE.L, SIZE.M] as const).map(size => ({
          variantLabel: size,
          cells: [<HorizontalBar key={`h-${size}`} size={size} />, <VerticalBar key={`v-${size}`} size={size} />],
        }))}
      />

      <StoryTable
        sectionTitle='Content variations'
        firstColumnHeader='Case'
        columnHeaders={['Tabs']}
        rows={[
          {
            variantLabel: 'with counter',
            cells: [
              <div key='counter' className={styles.wide}>
                <Tabs defaultValue='a'>
                  <Tabs.TabBar>
                    <Tabs.Tab value='a' label='Входящие' counter={{ label: 12 }} />
                    <Tabs.Tab value='b' label='Архив' />
                  </Tabs.TabBar>
                </Tabs>
              </div>,
            ],
          },
          {
            variantLabel: 'with disabled',
            cells: [
              <div key='disabled' className={styles.wide}>
                <Tabs defaultValue='a'>
                  <Tabs.TabBar>
                    <Tabs.Tab value='a' label='Активен' />
                    <Tabs.Tab value='b' label='Выключен' disabled />
                  </Tabs.TabBar>
                </Tabs>
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
