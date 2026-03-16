import type { Meta, StoryFn, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';

import togglesReadme from '../../README.md?raw';
import { SELECTION_MODE, ToggleGroup, ToggleGroupProps } from '../../src';
import { ToggleCard } from './components/ToggleCard';
import styles from './styles.module.scss';

const meta: Meta = {
  title: 'Components/Toggles/Toggle Group',
  component: ToggleGroup,
  parameters: {
    readme: { content: togglesReadme },
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=2815-30903&p=f&m=dev',
    },
  },
};

export default meta;

type StoryProps = ToggleGroupProps;
type Story = StoryObj<StoryProps>;

const ITEMS = [
  { id: '1', label: 'item1' },
  { id: '2', label: 'item2' },
  { id: '3', label: 'item3' },
  { id: '4', label: 'item4' },
];

const Template: StoryFn<ToggleGroupProps> = ({ selectionMode = SELECTION_MODE.Single }) => {
  const [value, setValue] = useState<string | string[] | undefined>(undefined);

  useEffect(() => {
    setValue(undefined);
  }, [selectionMode]);

  return (
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <ToggleGroup selectionMode={selectionMode} value={value} onChange={setValue}>
      <div className={styles.toggleGroup}>
        {ITEMS.map(props => (
          <ToggleCard key={props.id} {...props} />
        ))}
      </div>
    </ToggleGroup>
  );
};

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: Template,
  args: {
    selectionMode: SELECTION_MODE.Multiple,
  },
  argTypes: {
    selectionMode: {
      control: 'radio',
      options: Object.values(SELECTION_MODE),
    },
  },
};
