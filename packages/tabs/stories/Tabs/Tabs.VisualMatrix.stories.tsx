import { APPEARANCE, Button } from '@ds/button';
import { MARKER_POSITION, ORIENTATION, Orientation, Tabs, VARIANT } from '@ds/tabs';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs/Tabs',
  component: Tabs,
  parameters: { layout: 'fullscreen' },
};

export default meta;
type Story = StoryObj<typeof Tabs>;

const items = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
  { value: 'c', label: 'Gamma' },
];

function HorizontalBar({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <div className={styles.wide}>
      <Tabs defaultValue='a'>
        <Tabs.TabBar variant={variant}>
          {items.map(i => (
            <Tabs.Tab key={i.value} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
    </div>
  );
}

function VerticalBar({ variant }: { variant: 'primary' | 'secondary' }) {
  return (
    <div className={styles.wide}>
      <Tabs defaultValue='a' orientation={ORIENTATION.Vertical}>
        <Tabs.TabBar variant={variant}>
          {items.map(i => (
            <Tabs.Tab key={i.value} {...i} />
          ))}
        </Tabs.TabBar>
      </Tabs>
    </div>
  );
}

function BarWithAction({ variant, orientation }: { variant: 'primary' | 'secondary'; orientation: Orientation }) {
  return (
    <div className={styles.wide}>
      <Tabs defaultValue='a' orientation={orientation}>
        <Tabs.TabBar
          variant={variant}
          afterContent={
            <Button size={variant === VARIANT.Primary ? 'l' : 'm'} label='Создать' appearance={APPEARANCE.Primary} />
          }
        >
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
        sectionTitle='Variant × Orientation'
        firstColumnHeader='Variant'
        columnHeaders={['horizontal', 'vertical']}
        rows={([VARIANT.Primary, VARIANT.Secondary] as const).map(variant => ({
          variantLabel: variant,
          cells: [
            <HorizontalBar key={`h-${variant}`} variant={variant} />,
            <VerticalBar key={`v-${variant}`} variant={variant} />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Action slot (afterContent) × Orientation'
        firstColumnHeader='Variant'
        columnHeaders={['horizontal', 'vertical']}
        rows={([VARIANT.Primary, VARIANT.Secondary] as const).map(variant => ({
          variantLabel: variant,
          cells: [
            <BarWithAction key={`ha-${variant}`} variant={variant} orientation={ORIENTATION.Horizontal} />,
            <BarWithAction key={`va-${variant}`} variant={variant} orientation={ORIENTATION.Vertical} />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Variant × Marker position × Divider × Action'
        firstColumnHeader='Variant'
        columnHeaders={['horizontal', 'vertical']}
        rows={Object.values(VARIANT).flatMap(variant =>
          Object.values(MARKER_POSITION).flatMap(markerPosition =>
            [true, false].flatMap(divider =>
              [false, true].map(showAction => ({
                variantLabel: `${variant} / ${markerPosition} / divider ${divider} / action ${showAction}`,
                cells: Object.values(ORIENTATION).map(orientation => (
                  <Tabs key={orientation} defaultValue='a' orientation={orientation}>
                    <Tabs.TabBar
                      variant={variant}
                      markerPosition={markerPosition}
                      divider={divider}
                      afterContent={
                        showAction ? (
                          <Button size={variant === VARIANT.Primary ? 'l' : 'm'} label='Создать' />
                        ) : undefined
                      }
                    >
                      {items.map(item => (
                        <Tabs.Tab key={item.value} {...item} counter={{ value: 12 }} />
                      ))}
                    </Tabs.TabBar>
                  </Tabs>
                )),
              })),
            ),
          ),
        )}
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
                    <Tabs.Tab value='a' label='Входящие' counter={{ value: 12 }} />
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
