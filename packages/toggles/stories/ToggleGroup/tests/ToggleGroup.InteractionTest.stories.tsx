import { SELECTION_MODE, ToggleGroup } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ToggleCard } from '../components/ToggleCard';
import styles from '../styles.module.scss';

const meta: Meta<typeof ToggleGroup> = {
  title: 'Components/Toggles/ToggleGroup/Tests/Interaction',
  component: ToggleGroup,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof ToggleGroup>;

const ITEMS = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
];

const onChangeSingle = fn();
const onChangeMultiple = fn();

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest</DemoTitle>
        <DemoHint>Клик переключает выбранные элементы в single и multiple режиме.</DemoHint>
        <DemoActions align='center'>
          <ToggleGroup selectionMode={SELECTION_MODE.Single} onChange={onChangeSingle}>
            <div className={styles.toggleGroup}>
              {ITEMS.map(props => (
                <ToggleCard key={`s-${props.id}`} id={`single-${props.id}`} label={props.label} />
              ))}
            </div>
          </ToggleGroup>
        </DemoActions>
        <DemoActions align='center'>
          <ToggleGroup selectionMode={SELECTION_MODE.Multiple} onChange={onChangeMultiple}>
            <div className={styles.toggleGroup}>
              {ITEMS.map(props => (
                <ToggleCard key={`m-${props.id}`} id={`multiple-${props.id}`} label={props.label} />
              ))}
            </div>
          </ToggleGroup>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    onChangeSingle.mockClear();
    onChangeMultiple.mockClear();

    const canvas = within(canvasElement);

    await step('single: click A → onChange("single-a")', async () => {
      await userEvent.click(canvas.getByTestId('item-single-a'));
      expect(onChangeSingle).toHaveBeenCalledTimes(1);
      expect(onChangeSingle).toHaveBeenLastCalledWith('single-a');
    });

    await step('single: click B → onChange("single-b")', async () => {
      await userEvent.click(canvas.getByTestId('item-single-b'));
      expect(onChangeSingle).toHaveBeenCalledTimes(2);
      expect(onChangeSingle).toHaveBeenLastCalledWith('single-b');
    });

    await step('multiple: click A → onChange(["multiple-a"])', async () => {
      await userEvent.click(canvas.getByTestId('item-multiple-a'));
      expect(onChangeMultiple).toHaveBeenCalledTimes(1);
      expect(onChangeMultiple).toHaveBeenLastCalledWith(['multiple-a']);
    });

    await step('multiple: click B → onChange(["multiple-a", "multiple-b"])', async () => {
      await userEvent.click(canvas.getByTestId('item-multiple-b'));
      expect(onChangeMultiple).toHaveBeenCalledTimes(2);
      expect(onChangeMultiple).toHaveBeenLastCalledWith(['multiple-a', 'multiple-b']);
    });
  },
};
