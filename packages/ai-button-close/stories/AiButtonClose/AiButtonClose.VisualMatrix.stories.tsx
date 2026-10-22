import { AiButtonClose, AiButtonCloseProps, SIZE } from '@ds/ai-button-close';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiButtonClose> = {
  title: 'AI/AiButtonClose',
  component: AiButtonClose,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiButtonClose>;

const variants = [
  { label: 'OUTLINE XS', props: { size: SIZE.Xs, outline: true } },
  { label: 'OUTLINE S', props: { size: SIZE.S, outline: true } },
  { label: 'S', props: { size: SIZE.S } },
  { label: 'M', props: { size: SIZE.M } },
] as const satisfies ReadonlyArray<{ label: string; props: AiButtonCloseProps }>;

const states = [
  { key: 'default', disabled: false },
  { key: 'disabled', disabled: true },
] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='State × Variant'
      firstColumnHeader='State'
      columnHeaders={variants.map(({ label }) => label)}
      rows={states.map(({ key, disabled }) => ({
        variantLabel: key,
        cells: variants.map(({ label, props }) => (
          <AiButtonClose
            key={label}
            {...props}
            disabled={disabled}
            data-test-id={`${TEST_IDS.root}-${key}-${label.toLowerCase().replace(' ', '-')}`}
          />
        )),
      }))}
    />
  ),
};
