import { Flex, GAP_SIZE } from '@ds/uikit-product-flex';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';

const meta: Meta<typeof Flex> = {
  title: 'Uikit Product/Flex/Examples/Polymorphic',
  component: Flex,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof Flex>;

export const Polymorphic: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Polymorphic</DemoTitle>
        <DemoHint>
          Через <code>as</code> контейнер рендерится в нужный тег. Здесь — навигация в <code>nav</code> со
          ссылками-детьми.
        </DemoHint>
        <DemoActions block>
          <Flex as='nav' align='center' gap={GAP_SIZE.Gap3} fullWidth data-test-id='flex-nav'>
            <a className={styles.box} href='#one'>
              1
            </a>
            <a className={styles.box} href='#two'>
              2
            </a>
            <a className={styles.box} href='#three'>
              3
            </a>
          </Flex>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
