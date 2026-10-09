import { ChevronDownSVG, PlaceholderSVG } from '@ds/icons/interface/system';
import { MODE, Mode } from '@ds/list';
import { ListItemCustom } from '@ds/uikit-product-header';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';

const PLAYGROUND_ROOT = 'header-list-item-custom-playground';

type PlaygroundArgs = {
  selectionMode: Mode;
  checked: boolean;
  disabled: boolean;
  asParentGroup: boolean;
  asNested: boolean;
};

const meta: Meta<PlaygroundArgs> = {
  title: 'Uikit Product/Layout/Header/ListCustom/ListItemCustom',
  id: 'uikit-product-header-listitemcustom',
  parameters: { layout: 'fullscreen' },
  args: {
    selectionMode: MODE.Single,
    checked: false,
    disabled: false,
    asParentGroup: false,
    asNested: false,
  },
  argTypes: {
    selectionMode: {
      control: 'radio',
      // Figma listItemCustom: single / multiple; `none` приходит из List без selection.
      options: [MODE.Single, MODE.Multiple],
    },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    asParentGroup: { control: 'boolean' },
    asNested: { control: 'boolean' },
  },
};

export default meta;
type Story = StoryObj<PlaygroundArgs>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: function Render({ selectionMode, checked, disabled, asParentGroup, asNested }) {
    return (
      <DemoPage>
        <DemoPanel width='wide'>
          <DemoTitle>ListItemCustom</DemoTitle>
          <DemoHint>
            Индикаторы выбора рисует сама оболочка по `selectionMode` / `checked` / `disabled`. `asNested` → `level=1`,
            `asParentGroup` → `isParentNode` и шеврон.
          </DemoHint>
          <DemoActions align='center'>
            <div className={styles.listFrame} data-test-id={PLAYGROUND_ROOT}>
              <ListItemCustom
                selectionMode={selectionMode}
                checked={checked}
                disabled={disabled}
                isParentNode={asParentGroup || undefined}
                level={asNested ? 1 : 0}
                expandIcon={asParentGroup ? <ChevronDownSVG /> : undefined}
                beforeContent={<PlaceholderSVG />}
                afterContent={<PlaceholderSVG />}
                content={{ label: 'Content text', caption: 'Caption', description: 'Description text' }}
              />
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
