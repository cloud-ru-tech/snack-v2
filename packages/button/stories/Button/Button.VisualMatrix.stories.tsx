import { APPEARANCE, Button, ICON_POSITION, SIZE, VIEW } from '@ds/button';
import { SettingsSVG } from '@ds/icons';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentProps, ReactElement } from 'react';

import { StoryTable } from '#storybook/components';

import styles from './stories.module.scss';

const meta: Meta<typeof Button> = {
  title: 'Components/Button/Button',
  component: Button,
  parameters: { layout: 'padded' },
};

export default meta;
type Story = StoryObj<typeof Button>;

type ButtonPropsForMatrix = ComponentProps<typeof Button>;

const keySizes = [SIZE.S, SIZE.M, SIZE.L] as const;
const keyAppearances = [APPEARANCE.Primary, APPEARANCE.Neutral, APPEARANCE.Critical] as const;
const keyViews = [VIEW.Filled, VIEW.Outline, VIEW.Tonal, VIEW.Simple, VIEW.Elevated, VIEW.Function] as const;

const compositions: Array<{ key: string; props: ButtonPropsForMatrix }> = [
  { key: 'labelOnly', props: { label: 'Button' } },
  { key: 'iconBefore', props: { label: 'Button', icon: <SettingsSVG /> } },
  {
    key: 'iconAfter',
    props: { label: 'Button', icon: <SettingsSVG />, iconPosition: ICON_POSITION.After },
  },
  { key: 'iconOnly', props: { icon: <SettingsSVG />, 'aria-label': 'Settings' } },
  { key: 'withCounter', props: { label: 'Inbox', counter: { value: 12 } } },
  {
    key: 'counterWithIconAfter',
    props: {
      label: 'Notifications',
      icon: <SettingsSVG />,
      iconPosition: ICON_POSITION.After,
      counter: { value: 5 },
    },
  },
];

const states: Array<{ key: string; extra: Partial<ButtonPropsForMatrix> }> = [
  { key: 'default', extra: {} },
  { key: 'disabled', extra: { disabled: true } },
  { key: 'loading', extra: { loading: true } },
];

function renderButton(props: ButtonPropsForMatrix): ReactElement {
  return <Button {...props} />;
}

export const VisualMatrix: Story = {
  tags: ['test', 'dev'],
  parameters: { controls: { disable: true } },
  render: () => (
    <div className={styles.matrix}>
      <StoryTable
        sectionTitle='Appearance × Size'
        firstColumnHeader='Appearance'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={keyAppearances.map(appearance => ({
          variantLabel: appearance,
          cells: keySizes.map(size => renderButton({ size, appearance, label: 'Button' })),
        }))}
      />

      <StoryTable
        sectionTitle='View × Appearance'
        firstColumnHeader='View'
        columnHeaders={keyAppearances.map(a => a.toUpperCase())}
        rows={keyViews.map(view => ({
          variantLabel: view,
          cells: keyAppearances.map(appearance => renderButton({ view, appearance, label: 'Button' })),
        }))}
      />

      <StoryTable
        sectionTitle='Composition × Size'
        firstColumnHeader='Composition'
        columnHeaders={keySizes.map(s => s.toUpperCase())}
        rows={compositions.map(({ key, props }) => ({
          variantLabel: key,
          cells: keySizes.map(size => renderButton({ ...props, size })),
        }))}
      />

      <StoryTable
        sectionTitle='State × Composition (view=filled, appearance=primary)'
        firstColumnHeader='State'
        columnHeaders={compositions.map(c => c.key)}
        rows={states.map(({ key, extra }) => ({
          variantLabel: key,
          cells: compositions.map(c => renderButton({ view: 'filled', appearance: 'primary', ...c.props, ...extra })),
        }))}
      />
    </div>
  ),
};
