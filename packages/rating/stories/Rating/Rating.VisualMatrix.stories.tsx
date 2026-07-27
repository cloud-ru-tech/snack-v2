import { APPEARANCE, Rating, RatingProps, SIZE } from '@ds/rating';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

const meta: Meta<RatingProps> = {
  title: 'Components/Rating',
  component: Rating,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<RatingProps>;

const keySizes = Object.values(SIZE);
const keyAppearances = Object.values(APPEARANCE);
const keyValues = [0, 1, 2.5, 4, 5] as const;

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <>
      <StoryTable
        sectionTitle='Appearance × Size (defaultValue=3)'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => (
            <Rating
              key={`${appearance}-${size}`}
              appearance={appearance}
              size={size}
              count={5}
              defaultValue={3}
              allowHalf={false}
              allowClear={false}
              readonly={false}
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='Value × Size (allowHalf, appearance=yellow)'
        firstColumnHeader='Value'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyValues.map(value => ({
          variantLabel: String(value),
          cells: keySizes.map(size => (
            <Rating
              key={`${value}-${size}`}
              appearance={APPEARANCE.Yellow}
              size={size}
              count={5}
              defaultValue={value}
              allowHalf
              allowClear={false}
              readonly={false}
            />
          )),
        }))}
      />
      <StoryTable
        sectionTitle='State × Size (readonly, defaultValue=2)'
        firstColumnHeader='State'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: 'default',
            cells: keySizes.map(size => (
              <Rating
                key={`d-${size}`}
                appearance={APPEARANCE.Yellow}
                size={size}
                count={5}
                defaultValue={2}
                allowHalf={false}
                allowClear={false}
                readonly={false}
              />
            )),
          },
          {
            variantLabel: 'readonly',
            cells: keySizes.map(size => (
              <Rating
                key={`ro-${size}`}
                appearance={APPEARANCE.Yellow}
                size={size}
                count={5}
                defaultValue={2}
                allowHalf={false}
                allowClear={false}
                readonly
              />
            )),
          },
        ]}
      />
    </>
  ),
};
