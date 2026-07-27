import { CHIP_CHOICE_TEST_IDS, ChipChoice, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';
import styles from '../styles.module.scss';

const CUSTOM_OPTIONS = ['Alpha', 'Beta', 'Gamma'];

const meta: Meta<typeof ChipChoice.Custom> = {
  title: 'Components/Chips/ChipChoice/Custom/Tests/Interaction',
  component: ChipChoice.Custom,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
  args: {
    label: 'Custom',
    size: SIZE.S,
    onChange: fn(),
    'data-test-id': TEST_IDS.chipChoice.root,
  },
};

export default meta;
type Story = StoryObj<typeof ChipChoice.Custom>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>InteractionTest (Custom)</DemoTitle>
        <DemoHint>Клик открывает кастомное выпадающее меню; выбор опции закрывает его.</DemoHint>
        <DemoActions align='center'>
          <ChipChoice.Custom
            {...args}
            content={({ closeDroplist, value, onChange }) => (
              <div className={styles.customContent}>
                {CUSTOM_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    type='button'
                    data-test-id={`custom-option-${opt.toLowerCase()}`}
                    className={
                      value === opt ? `${styles.customOption} ${styles.customOptionSelected}` : styles.customOption
                    }
                    onClick={() => {
                      onChange?.(opt);
                      closeDroplist();
                    }}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            )}
            valueRender={value => value ?? null}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const chip = canvas.getByTestId(TEST_IDS.chipChoice.root);

    await step('click: opens custom dropdown', async () => {
      await userEvent.click(chip);
      await waitFor(() => {
        expect(canvas.getByTestId(CHIP_CHOICE_TEST_IDS.droplist)).toBeVisible();
      });
    });

    await step('click option: closes dropdown', async () => {
      const option = canvas.getByTestId('custom-option-alpha');
      await userEvent.click(option);
      await waitFor(() => {
        expect(canvas.queryByTestId(CHIP_CHOICE_TEST_IDS.droplist)).not.toBeInTheDocument();
      });
    });
  },
};
