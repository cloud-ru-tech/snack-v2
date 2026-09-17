import { PlaceholderSVG } from '@ds/icons/interface/system';
import { APPEARANCE, PromoTag, PromoTagProps, ROLE_APPEARANCE, SIZE } from '@ds/promo-tag';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<PromoTagProps> = {
  title: 'Components/PromoTag',
  component: PromoTag,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<PromoTagProps>;

const keySizes = Object.values(SIZE);
const keyAppearances = Object.values(APPEARANCE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size with roleAppearance=accent'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <PromoTag
              key={`${appearance}-${size}`}
              label='Promo'
              appearance={appearance}
              size={size}
              roleAppearance={ROLE_APPEARANCE.Accent}
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Appearance × Size with roleAppearance=decor'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <PromoTag
              key={`${appearance}-${size}`}
              label='Promo'
              appearance={appearance}
              size={size}
              roleAppearance={ROLE_APPEARANCE.Decor}
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
                label='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                beforeContent={<PlaceholderSVG />}
              />
            )),
          },
          {
            variantLabel: 'after',
            cells: keySizes.map(size => (
              <PromoTag
                key={`after-${size}`}
                label='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                afterContent={<PlaceholderSVG />}
              />
            )),
          },
          {
            variantLabel: 'before + after',
            cells: keySizes.map(size => (
              <PromoTag
                key={`before-after-${size}`}
                label='Promo'
                appearance={APPEARANCE.Primary}
                size={size}
                beforeContent={<PlaceholderSVG />}
                afterContent={<PlaceholderSVG />}
              />
            )),
          },
        ]}
      />
    </>
  ),
};
