import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { MARKER_POSITION, ORIENTATION, SIZE, Tabs } from '../../src';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Tabs',
  component: Tabs,
};

export default meta;

type Story = StoryObj<typeof meta>;

const sizes = Object.values(SIZE);
const orientations = Object.values(ORIENTATION);
const markerPositions = Object.values(MARKER_POSITION);
const scenarios = ['Default', 'With counter', 'Disabled tab'] as const;

const TAB_CELL_ITEMS = [
  { value: 'tab1', label: 'Вкладка 1', counter: 5 },
  { value: 'tab2', label: 'Вкладка 2' },
  { value: 'tab3', label: 'Вкладка 3' },
];

function TabsCell({
  size,
  orientation,
  markerPosition,
  scenario,
}: {
  size: (typeof sizes)[number];
  orientation: (typeof orientations)[number];
  markerPosition: (typeof markerPositions)[number];
  scenario: (typeof scenarios)[number];
}) {
  const content = (
    <Tabs defaultValue='tab1'>
      <Tabs.TabBar size={size} orientation={orientation} markerPosition={markerPosition}>
        <Tabs.Tab
          label={TAB_CELL_ITEMS[0].label}
          value={TAB_CELL_ITEMS[0].value}
          counter={
            scenario === 'With counter' && TAB_CELL_ITEMS[0].counter != null
              ? { label: TAB_CELL_ITEMS[0].counter }
              : undefined
          }
        />
        <Tabs.Tab
          label={TAB_CELL_ITEMS[1].label}
          value={TAB_CELL_ITEMS[1].value}
          disabled={scenario === 'Disabled tab'}
        />
        <Tabs.Tab label={TAB_CELL_ITEMS[2].label} value={TAB_CELL_ITEMS[2].value} />
      </Tabs.TabBar>
      {TAB_CELL_ITEMS.map(({ value }) => (
        <Tabs.TabContent key={value} value={value}>
          Контент {value.replace('tab', '')}
        </Tabs.TabContent>
      ))}
    </Tabs>
  );

  if (orientation === ORIENTATION.Vertical) {
    return <div className={styles.verticalCellWrapper}>{content}</div>;
  }
  return content;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Size × Scenario'
        firstColumnHeader='Size'
        columnHeaders={[...sizes]}
        rows={scenarios.map(scenario => ({
          variantLabel: scenario,
          cells: sizes.map(size => (
            <TabsCell
              key={`size-${size}-${scenario}`}
              size={size}
              orientation={ORIENTATION.Horizontal}
              markerPosition={MARKER_POSITION.After}
              scenario={scenario}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Orientation × Scenario'
        firstColumnHeader='Orientation'
        columnHeaders={[...orientations]}
        rows={scenarios.map(scenario => ({
          variantLabel: scenario,
          cells: orientations.map(orientation => (
            <TabsCell
              key={`orientation-${orientation}-${scenario}`}
              size={SIZE.L}
              orientation={orientation}
              markerPosition={MARKER_POSITION.After}
              scenario={scenario}
            />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Marker Position × Orientation'
        firstColumnHeader='Orientation'
        columnHeaders={[...markerPositions]}
        rows={orientations.map(orientation => ({
          variantLabel: orientation,
          cells: markerPositions.map(markerPosition => (
            <TabsCell
              key={`marker-${markerPosition}-${orientation}`}
              size={SIZE.L}
              orientation={orientation}
              markerPosition={markerPosition}
              scenario='Default'
            />
          )),
        }))}
      />
    </>
  ),
};
