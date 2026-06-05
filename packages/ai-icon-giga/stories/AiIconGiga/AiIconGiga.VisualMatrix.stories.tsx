import { AiIconGiga, VARIANT } from '@ds/ai-icon-giga';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof AiIconGiga> = {
  title: 'AI/IconGiga',
  component: AiIconGiga,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof AiIconGiga>;

const variants = [VARIANT.Neutral, VARIANT.LogoDark, VARIANT.LogoLight] as const;
const variantLabels: Record<(typeof variants)[number], string> = {
  [VARIANT.Neutral]: 'NEUTRAL',
  [VARIANT.LogoDark]: 'LOGO DARK',
  [VARIANT.LogoLight]: 'LOGO LIGHT',
};
const sizes = [24, 48, 80] as const;

function renderCell(variant: (typeof variants)[number], size: number): ReactElement {
  const icon = <AiIconGiga variant={variant} size={size} data-test-id={`${TEST_IDS.root}-${variant}-${size}`} />;
  return variant === VARIANT.LogoDark ? <span className={styles.darkCell}>{icon}</span> : icon;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <StoryTable
      sectionTitle='Variant × Size'
      firstColumnHeader='Size'
      columnHeaders={variants.map(variant => variantLabels[variant])}
      rows={sizes.map(size => ({
        variantLabel: `${size}px`,
        cells: variants.map(variant => renderCell(variant, size)),
      }))}
    />
  ),
};
