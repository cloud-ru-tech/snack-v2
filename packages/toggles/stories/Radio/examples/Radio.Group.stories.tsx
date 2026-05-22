import { Radio, SIZE } from '@ds/toggles';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const meta: Meta<typeof Radio> = {
  title: 'Components/Toggles/Radio/Examples/Group',
  component: Radio,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Radio>;

const onChangeA = fn();
const onChangeB = fn();

export const Group: Story = {
  tags: ['test', 'dev'],
  args: {
    onChange: onChangeA,
  },
  render: function RenderRadioGroup() {
    const [selected, setSelected] = useState<'a' | 'b' | null>(null);
    return (
      <DemoPage>
        <DemoPanel>
          <DemoTitle>Group</DemoTitle>
          <DemoHint>Группа Radio: нативная взаимная эксклюзивность через атрибут name.</DemoHint>
          <DemoActions align='center'>
            <div className={styles.group}>
              <Radio
                size={SIZE.XS}
                name='radio-group'
                value='a'
                checked={selected === 'a'}
                onChange={next => {
                  onChangeA(next);
                  if (next) setSelected('a');
                }}
                data-test-id={TEST_IDS.radioGroup.a}
              />
              <Radio
                size={SIZE.XS}
                name='radio-group'
                value='b'
                checked={selected === 'b'}
                onChange={next => {
                  onChangeB(next);
                  if (next) setSelected('b');
                }}
                data-test-id={TEST_IDS.radioGroup.b}
              />
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement, step }) => {
    onChangeA.mockClear();
    onChangeB.mockClear();

    const canvas = within(canvasElement);
    const inputA = canvas.getByTestId('radio-a-native-input') as HTMLInputElement;
    const inputB = canvas.getByTestId('radio-b-native-input') as HTMLInputElement;

    await step('click A: onChange(true), A is checked', async () => {
      await userEvent.click(inputA);
      expect(onChangeA).toHaveBeenCalledTimes(1);
      expect(onChangeA).toHaveBeenLastCalledWith(true);
      await expect(inputA).toBeChecked();
    });

    await step('click B: native mutual exclusion — A loses DOM checked, B onChange(true)', async () => {
      await userEvent.click(inputB);
      expect(onChangeB).toHaveBeenCalledTimes(1);
      expect(onChangeB).toHaveBeenLastCalledWith(true);
      await expect(inputB).toBeChecked();
      await expect(inputA).not.toBeChecked();
    });
  },
};
