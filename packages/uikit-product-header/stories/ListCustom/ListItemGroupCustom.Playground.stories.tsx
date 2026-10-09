import { PlaceholderSVG } from '@ds/icons/interface/system';
import { ListItemGroupCustom } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';

const PLAYGROUND_ROOT = 'header-list-item-group-custom-playground';

type GroupVariant = 'subtitle' | 'subtitleTertiary';

type PlaygroundArgs = {
  /** Story-only: `false` — divider-only ветка Figma (без label). */
  withLabel: boolean;
  groupVariant: GroupVariant;
  divider: boolean;
  asNested: boolean;
  label: string;
  showBeforeContent: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/Layout/Header/ListCustom/ListItemGroupCustom',
  id: 'uikit-product-header-listitemgroupcustom',
  parameters: { layout: 'fullscreen' },
  args: {
    withLabel: true,
    groupVariant: 'subtitleTertiary',
    divider: false,
    asNested: false,
    label: 'Subtitle text',
    showBeforeContent: true,
  },
  argTypes: {
    withLabel: {
      name: '[Stories]: withLabel',
      control: 'boolean',
    },
    groupVariant: {
      control: 'radio',
      options: ['subtitle', 'subtitleTertiary'],
      if: { arg: 'withLabel', eq: true },
    },
    divider: {
      control: 'boolean',
      if: { arg: 'withLabel', eq: true },
    },
    label: {
      control: 'text',
      if: { arg: 'withLabel', eq: true },
    },
    showBeforeContent: {
      name: '[Stories]: showBeforeContent',
      control: 'boolean',
      if: { arg: 'withLabel', eq: true },
    },
    asNested: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: function Render({ withLabel, groupVariant, divider, asNested, label, showBeforeContent }) {
    const level = asNested ? 1 : 0;

    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>ListItemGroupCustom</DemoTitle>
          <DemoHint>
            Публичный API: `groupVariant` (`subtitle` / `subtitleTertiary`) и отдельный `divider`. Третий вид Figma
            (только линия) — `divider` без `label`: выключи `[Stories]: withLabel`.
          </DemoHint>
          <DemoActions align='center'>
            <div className={styles.listFrame} data-test-id={PLAYGROUND_ROOT}>
              {withLabel ? (
                <ListItemGroupCustom
                  label={label}
                  groupVariant={groupVariant}
                  divider={divider}
                  beforeContent={showBeforeContent ? <PlaceholderSVG /> : undefined}
                  level={level}
                  size='s'
                />
              ) : (
                <ListItemGroupCustom divider level={level} size='s' />
              )}
            </div>
          </DemoActions>
        </DemoPanel>
      </DemoPage>
    );
  },
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(PLAYGROUND_ROOT)).toBeVisible();
  },
};
