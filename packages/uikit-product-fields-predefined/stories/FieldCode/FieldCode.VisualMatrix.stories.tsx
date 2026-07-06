import { FieldCode } from '@ds/uikit-product-fields-predefined';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import styles from './styles.module.scss';

const sizes = ['s', 'm', 'l'] as const;

const states = [
  { label: 'default', props: {} },
  { label: 'filled', props: { value: '123456' } },
  { label: 'error', props: { value: '111111', error: 'Неверный код' } },
  { label: 'disabled', props: { value: '123456', disabled: true } },
] as const;

type FeatureRow = { label: string; props: Partial<Parameters<typeof FieldCode>[0]> };

const features: FeatureRow[] = [
  { label: 'showEmptyChars', props: { value: '12', showEmptyChars: true } },
  { label: 'spacing [2]', props: { value: '123456', spacing: [2] } },
  { label: 'resendCode (таймер)', props: { resendCode: { onResend: () => undefined, secondsToNextResend: 45 } } },
  { label: 'resendCode (активна)', props: { resendCode: { onResend: () => undefined, secondsToNextResend: 0 } } },
];

const meta: Meta<typeof FieldCode> = {
  title: 'Uikit Product/FieldsPredefined/FieldCode',
  component: FieldCode,
  parameters: { layout: 'padded', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof FieldCode>;

export const VisualMatrix: Story = {
  tags: ['test', 'dev', 'no-a11y'],
  render: () => (
    <div className={styles.grid}>
      <StoryTable
        sectionTitle='state × size'
        firstColumnHeader='state'
        columnHeaders={sizes.map(size => size.toUpperCase())}
        rows={states.map(({ label, props }) => ({
          variantLabel: label,
          cells: sizes.map(size => (
            <FieldCode key={`${label}-${size}`} codeLength={6} size={size} label='Код' {...props} />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='features'
        firstColumnHeader='feature'
        columnHeaders={['M']}
        rows={features.map(({ label, props }) => ({
          variantLabel: label,
          cells: [<FieldCode key={label} codeLength={6} size='m' label='Код' {...props} />],
        }))}
      />
      <StoryTable
        sectionTitle='stretchCells (контейнер 360px)'
        firstColumnHeader='variant'
        columnHeaders={['M']}
        rows={[
          {
            variantLabel: 'stretchCells',
            cells: [
              <div key='stretch' className={styles.stretchContainer}>
                <FieldCode codeLength={6} size='m' label='Код' stretchCells />
              </div>,
            ],
          },
        ]}
      />
    </div>
  ),
};
