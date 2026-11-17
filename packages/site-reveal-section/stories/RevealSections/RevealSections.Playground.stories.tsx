import { RevealSections } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';
import { ReactNode } from 'react';
import { expect, within } from 'storybook/test';

import { SampleSection, ScrollPreview } from '../fixtures';
import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof RevealSections> = {
  title: 'Site/RevealSection/RevealSections',
  component: RevealSections,
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    skipFirst: true,
    disabled: false,
    skipInitialViewport: false,
    duration: 650,
    delay: 0,
    offset: 28,
    easing: 'ease',
    rootMargin: '0px 0px -40px 0px',
    threshold: 0,
  },
  argTypes: {
    children: { table: { disable: true } },
    style: { table: { disable: true } },
    duration: { control: { type: 'number', min: 0, step: 50 } },
    delay: { control: { type: 'number', min: 0, step: 50 } },
    offset: { control: { type: 'number', step: 4 } },
    easing: { control: 'text' },
    rootMargin: { control: 'text' },
    threshold: { control: { type: 'number', min: 0, max: 1, step: 0.1 } },
    shouldSkip: {
      control: 'select',
      options: ['second', 'even'],
      mapping: {
        second: (_child: ReactNode, index: number) => index === 1,
        even: (_child: ReactNode, index: number) => index % 2 === 0,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof RevealSections>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <ScrollPreview>
      <div className={styles.stack}>
        <RevealSections {...args}>
          <div data-test-id={TEST_IDS.revealSections.first}>
            <SampleSection title='Первая секция'>
              По умолчанию отображается сразу, без дополнительной обёртки.
            </SampleSection>
          </div>
          <div data-test-id={TEST_IDS.revealSections.second}>
            <SampleSection title='Вторая секция' />
          </div>
          <div data-test-id={TEST_IDS.revealSections.third}>
            <SampleSection title='Третья секция' />
          </div>
        </RevealSections>
      </div>
      <div className={styles.spacer} />
    </ScrollPreview>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.revealSections.first)).toBeVisible();
  },
};
