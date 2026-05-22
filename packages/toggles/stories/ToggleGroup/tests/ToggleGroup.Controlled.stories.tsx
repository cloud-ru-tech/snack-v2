import { SELECTION_MODE, ToggleGroup } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { ToggleCard } from '../components/ToggleCard';
import styles from '../styles.module.scss';

const ITEMS = [
  { id: 'a', label: 'A' },
  { id: 'b', label: 'B' },
];

type ControlledProps = {
  onChangeSingle?(value: string | undefined): void;
  onChangeMultiple?(value: string[]): void;
};

function ControlledDemo({ onChangeSingle, onChangeMultiple }: ControlledProps) {
  const [singleValue, setSingleValue] = useState<string | undefined>(undefined);
  const [multipleValue, setMultipleValue] = useState<string[]>([]);

  return (
    <>
      <ToggleGroup
        selectionMode={SELECTION_MODE.Single}
        value={singleValue}
        onChange={next => {
          setSingleValue(next ?? undefined);
          onChangeSingle?.(next ?? undefined);
        }}
      >
        <div className={styles.toggleGroup}>
          {ITEMS.map(props => (
            <ToggleCard key={`s-${props.id}`} id={`single-${props.id}`} label={props.label} />
          ))}
        </div>
      </ToggleGroup>
      <ToggleGroup
        selectionMode={SELECTION_MODE.Multiple}
        value={multipleValue}
        onChange={next => {
          const arr = next ?? [];
          setMultipleValue(arr);
          onChangeMultiple?.(arr);
        }}
      >
        <div className={styles.toggleGroup}>
          {ITEMS.map(props => (
            <ToggleCard key={`m-${props.id}`} id={`multiple-${props.id}`} label={props.label} />
          ))}
        </div>
      </ToggleGroup>
    </>
  );
}

const meta: Meta<ControlledProps> = {
  title: 'Components/Toggles/ToggleGroup/Tests/Controlled',
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: { onChangeSingle: fn(), onChangeMultiple: fn() },
};

export default meta;

export const Controlled: StoryObj<ControlledProps> = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Controlled</DemoTitle>
        <DemoHint>Controlled-режим: внешнее состояние для single и multiple.</DemoHint>
        <DemoActions align='center'>
          <ControlledDemo {...args} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ args, canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step('single: click A → onChange("single-a")', async () => {
      await userEvent.click(canvas.getByTestId('item-single-a'));
      expect(args.onChangeSingle).toHaveBeenLastCalledWith('single-a');
    });

    await step('single: click B → onChange("single-b")', async () => {
      await userEvent.click(canvas.getByTestId('item-single-b'));
      expect(args.onChangeSingle).toHaveBeenLastCalledWith('single-b');
    });

    await step('multiple: click A → parent state=["multiple-a"]', async () => {
      const a = canvas.getByTestId('item-multiple-a');
      await userEvent.click(a);
      expect(args.onChangeMultiple).toHaveBeenLastCalledWith(['multiple-a']);
      await waitFor(() => expect(a).toHaveAttribute('data-checked', 'true'));
    });

    await step('multiple: click B → parent state=["multiple-a","multiple-b"]', async () => {
      const a = canvas.getByTestId('item-multiple-a');
      const b = canvas.getByTestId('item-multiple-b');
      await userEvent.click(b);
      expect(args.onChangeMultiple).toHaveBeenLastCalledWith(['multiple-a', 'multiple-b']);
      await waitFor(() => expect(b).toHaveAttribute('data-checked', 'true'));
      await waitFor(() => expect(a).toHaveAttribute('data-checked', 'true'));
    });
  },
};
