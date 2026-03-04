import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { SIZE } from '../../src/Button/constants';
import { ButtonGroup, type ButtonGroupProps } from '../../src/ButtonGroup';

const meta: Meta<ButtonGroupProps> = {
  title: 'Components/Button/ButtonGroup',
  component: ButtonGroup,
  parameters: {
    design: {
      type: 'figma',
      url: 'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=9099-51008',
    },
  },
};

export default meta;

type Story = StoryObj<ButtonGroupProps>;

const sizes = Object.values(SIZE);

const primaryActionProps: ButtonGroupProps['primaryAction'] = {
  label: 'Label text',
  appearance: 'primary',
  view: 'filled',
};

const secondaryActionProps: ButtonGroupProps['secondaryAction'] = {
  label: 'Label text',
  appearance: 'neutral',
  view: 'outline',
};

const tertiaryActionProps: ButtonGroupProps['tertiaryAction'] = {
  label: 'Label text',
  appearance: 'neutral',
  view: 'simple',
};

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='Size × Layout'
        firstColumnHeader='Size'
        columnHeaders={['Horizontal', 'Vertical', 'Centered']}
        rows={sizes.map(size => ({
          variantLabel: size.toUpperCase(),
          cells: [
            <ButtonGroup
              key={`${size}-h`}
              size={size}
              primaryAction={primaryActionProps}
              secondaryAction={secondaryActionProps}
            />,
            <ButtonGroup
              key={`${size}-v`}
              size={size}
              vertical
              primaryAction={primaryActionProps}
              secondaryAction={secondaryActionProps}
            />,
            <ButtonGroup
              key={`${size}-c`}
              size={size}
              centered
              primaryAction={primaryActionProps}
              secondaryAction={secondaryActionProps}
            />,
          ],
        }))}
      />

      <StoryTable
        sectionTitle='Variants'
        firstColumnHeader='Variant'
        columnHeaders={['Primary only', 'Primary + Secondary', 'Primary + Secondary + Tertiary']}
        rows={[
          {
            variantLabel: 'Actions',
            cells: [
              <ButtonGroup key='primary' primaryAction={primaryActionProps} />,
              <ButtonGroup key='both' primaryAction={primaryActionProps} secondaryAction={secondaryActionProps} />,
              <ButtonGroup
                key='all'
                primaryAction={{ ...primaryActionProps, label: 'Primary' }}
                secondaryAction={{ ...secondaryActionProps, label: 'Secondary' }}
                tertiaryAction={{ ...tertiaryActionProps, label: 'Tertiary' }}
              />,
            ],
          },
        ]}
      />
    </>
  ),
};
