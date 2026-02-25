import { PlaceholderSVG } from '@design-system/icons';
import { ValueOf } from '@design-system/utils';
import type { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import readme from '../../README.md?raw';
import { Button, type ButtonProps } from '../../src/Button';
import { APPEARANCE, ICON_POSITION, SIZE, VIEW } from '../../src/Button/constants';

const meta: Meta<ButtonProps> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    readme: { content: readme },
  },
};

export default meta;

type Story = StoryObj<ButtonProps>;

const views: ReadonlyArray<[ValueOf<typeof VIEW>, string]> = [
  [VIEW.Filled, 'Filled'],
  [VIEW.Outline, 'Outline'],
  [VIEW.Simple, 'Simple'],
  [VIEW.Tonal, 'Tonal'],
  [VIEW.Elevated, 'Elevated'],
  [VIEW.Function, 'Function'],
];

const appearances = Object.values(APPEARANCE);
const sizes = Object.values(SIZE);

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <>
      <StoryTable
        sectionTitle='View × Appearance'
        firstColumnHeader='View'
        columnHeaders={appearances.slice()}
        rows={views.map(([view, label]) => ({
          variantLabel: label,
          cells: appearances.map(appearance => (
            <Button key={appearance} label={label} view={view} appearance={appearance} />
          )),
        }))}
      />

      <StoryTable
        sectionTitle='Sizes'
        firstColumnHeader=''
        columnHeaders={sizes.map(s => s.toUpperCase())}
        rows={[
          {
            variantLabel: '',
            cells: sizes.map(size => <Button key={size} label={size.toUpperCase()} size={size} view={VIEW.Filled} />),
          },
        ]}
      />

      <StoryTable
        sectionTitle='States'
        firstColumnHeader=''
        columnHeaders={['Default', 'Disabled', 'Loading', 'Full width']}
        rows={[
          {
            variantLabel: '',
            cells: [
              <Button key='default' label='Button' view={VIEW.Filled} />,
              <Button key='disabled' label='Disabled' disabled view={VIEW.Filled} />,
              <Button key='loading' label='Loading' loading view={VIEW.Filled} />,
              <div key='full' style={{ width: 200 }}>
                <Button label='Full width' fullWidth view={VIEW.Filled} />
              </div>,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='With icons'
        firstColumnHeader='Variant'
        columnHeaders={['icon before', 'icon after']}
        rows={[
          {
            variantLabel: 'Icons',
            cells: [
              <Button
                key='before'
                label='Button'
                icon={<PlaceholderSVG />}
                iconPosition={ICON_POSITION.Before}
                view={VIEW.Filled}
              />,
              <Button
                key='after'
                label='Button'
                icon={<PlaceholderSVG />}
                iconPosition={ICON_POSITION.After}
                view={VIEW.Filled}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='With counter (inline, no icon after)'
        firstColumnHeader='Variant'
        columnHeaders={['label only', 'icon before + label']}
        rows={[
          {
            variantLabel: 'Counter inline',
            cells: [
              <Button key='label' label='Уведомления' counter={{ value: 5 }} view={VIEW.Filled} />,
              <Button
                key='before'
                label='Уведомления'
                icon={<PlaceholderSVG />}
                iconPosition={ICON_POSITION.Before}
                counter={{ value: 5 }}
                view={VIEW.Filled}
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='With counter (badge, icon after)'
        firstColumnHeader='Variant'
        columnHeaders={['label + icon after', 'icon only']}
        rows={[
          {
            variantLabel: 'Counter badge',
            cells: [
              <Button
                key='after'
                label='Уведомления'
                icon={<PlaceholderSVG />}
                iconPosition={ICON_POSITION.After}
                counter={{ value: 9 }}
                view={VIEW.Filled}
              />,
              <Button
                key='iconOnly'
                icon={<PlaceholderSVG />}
                iconPosition={ICON_POSITION.After}
                counter={{ value: 9 }}
                view={VIEW.Filled}
                aria-label='Уведомления'
              />,
            ],
          },
        ]}
      />

      <StoryTable
        sectionTitle='As link (as="a")'
        firstColumnHeader='Variant'
        columnHeaders={['filled', 'outline']}
        rows={[
          {
            variantLabel: 'Link',
            cells: [
              <Button key='filled' as='a' href='#' label='О нас' view={VIEW.Filled} />,
              <Button key='outline' as='a' href='#' label='Внешняя ссылка' view={VIEW.Outline} target='_blank' />,
            ],
          },
        ]}
      />
    </>
  ),
};
