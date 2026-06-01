import { CHIP_CHOICE_TEST_IDS, ChipChoice, SIZE } from '@ds/chips';
import { Meta, StoryObj } from '@storybook/react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../../testIds';

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
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4, padding: 8 }}>
                {CUSTOM_OPTIONS.map(opt => (
                  <button
                    key={opt}
                    data-test-id={`custom-option-${opt.toLowerCase()}`}
                    style={{
                      background: value === opt ? '#e0e8ff' : 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      textAlign: 'left',
                      borderRadius: 4,
                    }}
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
        expect(canvas.queryByTestId(CHIP_CHOICE_TEST_IDS.droplist)).not.toBeVisible();
      });
    });
  },
};
