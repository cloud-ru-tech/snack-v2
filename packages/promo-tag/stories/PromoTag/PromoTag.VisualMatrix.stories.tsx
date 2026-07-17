import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE, Size } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const iconSizes: Record<Size, number> = {
  [SIZE.Xs]: 16,
  [SIZE.S]: 16,
  [SIZE.M]: 24,
};

const meta: Meta<PromoTagProps> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PromoTagProps>;

const keySizes = Object.values(SIZE);
const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Red, APPEARANCE.Green, APPEARANCE.Blue];

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size with role=accent'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <PromoTag
              key={`${appearance}-${size}`}
              text='Promo'
              appearance={appearance}
              size={size}
              role={ROLE_APPEARANCE.Accent}
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Appearance × Size with role=decor'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <PromoTag
              key={`${appearance}-${size}`}
              text='Promo'
              appearance={appearance}
              size={size}
              role={ROLE_APPEARANCE.Decor}
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='beforeContent / afterContent × Size (appearance=primary)'
        firstColumnHeader='Content'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'before',
            cells: keySizes.map(size => (
              <PromoTag
                key={`before-${size}`}
                text='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                beforeContent={<PlaceholderSVG size={iconSizes[size]} />}
              />
            )),
          },
          {
            variantLabel: 'after',
            cells: keySizes.map(size => (
              <PromoTag
                key={`after-${size}`}
                text='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                afterContent={<PlaceholderSVG size={iconSizes[size]} />}
              />
            )),
          },
          {
            variantLabel: 'before + after',
            cells: keySizes.map(size => (
              <PromoTag
                key={`before-after-${size}`}
                text='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                beforeContent={<PlaceholderSVG size={iconSizes[size]} />}
                afterContent={<PlaceholderSVG size={iconSizes[size]} />}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
