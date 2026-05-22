import { APPEARANCE, Button, VIEW } from '@ds/button';
import { Dropdown } from '@ds/dropdown';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

const meta: Meta<typeof Dropdown> = {
  title: 'Components/Dropdown',
  component: Dropdown,
  parameters: { layout: 'fullscreen' },
  args: {
    trigger: 'click',
    placement: 'bottom-start',
    content: <div className={styles.content}>Содержимое выпадающего блока</div>,
    'data-test-id': TEST_IDS.root,
  },
  argTypes: {
    trigger: {
      control: 'radio',
      options: ['click', 'hover', 'focus'],
      description: 'Тип триггера открытия',
    },
    placement: {
      control: 'select',
      options: ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left', 'right'],
      description: 'Позиция относительно триггера',
    },
    children: { table: { disable: true } },
  },
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>
          Открыть выпадающий блок триггером ниже. Тип ({args.trigger}) и позиционирование — из Controls.
        </DemoHint>
        <DemoActions align='center'>
          <Dropdown {...args}>
            <Button
              data-test-id={TEST_IDS.triggerOpen}
              label='Открыть'
              view={VIEW.Outline}
              appearance={APPEARANCE.Neutral}
            />
          </Dropdown>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.triggerOpen)).toBeVisible();
  },
};
