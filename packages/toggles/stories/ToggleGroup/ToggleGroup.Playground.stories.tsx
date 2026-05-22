import { SELECTION_MODE, SelectionMode, ToggleGroup } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import { ToggleCard } from './components/ToggleCard';
import styles from './styles.module.scss';

type PlaygroundArgs = {
  selectionMode: SelectionMode;
};

const meta: Meta<PlaygroundArgs & { 'data-test-id'?: string }> = {
  title: 'Components/Toggles/ToggleGroup',
  component: ToggleGroup,
  parameters: { layout: 'fullscreen' },
  args: { 'data-test-id': TEST_IDS.toggleGroup.root, selectionMode: SELECTION_MODE.Single },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: Object.values(SELECTION_MODE),
      description: 'Режим выбора',
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

const ITEMS = [
  { id: '1', label: 'item1' },
  { id: '2', label: 'item2' },
  { id: '3', label: 'item3' },
  { id: '4', label: 'item4' },
];

function PlaygroundRender({ selectionMode }: PlaygroundArgs) {
  const [singleValue, setSingleValue] = useState<string | undefined>(undefined);
  const [multiValue, setMultiValue] = useState<string[]>([]);

  useEffect(() => {
    setSingleValue(undefined);
    setMultiValue([]);
  }, [selectionMode]);

  const body = (
    <div className={styles.toggleGroup}>
      {ITEMS.map(props => (
        <ToggleCard key={props.id} {...props} />
      ))}
    </div>
  );

  const inner =
    selectionMode === SELECTION_MODE.Multiple ? (
      <ToggleGroup selectionMode='multiple' value={multiValue} onChange={next => setMultiValue(next ?? [])}>
        {body}
      </ToggleGroup>
    ) : (
      <ToggleGroup selectionMode='single' value={singleValue} onChange={setSingleValue}>
        {body}
      </ToggleGroup>
    );

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Группа переключателей с режимом одиночного или множественного выбора.</DemoHint>
        <DemoActions align='center'>{inner}</DemoActions>
      </DemoPanel>
    </DemoPage>
  );
}

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => <PlaygroundRender {...args} />,
};
