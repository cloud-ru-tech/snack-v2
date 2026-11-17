import { RevealSection } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';
import { expect, waitFor, within } from 'storybook/test';

import { DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { SampleSection } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

const meta: Meta<typeof RevealSection> = {
  title: 'Site/RevealSection/RevealSection/Tests/UnavailableObserver',
  component: RevealSection,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
  args: { 'data-test-id': TEST_IDS.revealSection.root },
  beforeEach: () => {
    const descriptor = Object.getOwnPropertyDescriptor(globalThis, 'IntersectionObserver');
    Object.defineProperty(globalThis, 'IntersectionObserver', { configurable: true, value: undefined });

    return () => {
      if (descriptor) Object.defineProperty(globalThis, 'IntersectionObserver', descriptor);
    };
  },
};

export default meta;
type Story = StoryObj<typeof RevealSection>;

export const UnavailableObserver: Story = {
  tags: ['test', 'dev'],
  render: args => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Браузер без IntersectionObserver</DemoTitle>
        <RevealSection {...args}>
          <SampleSection />
        </RevealSection>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    const root = within(canvasElement).getByTestId(TEST_IDS.revealSection.root);
    await waitFor(() => expect(root).toHaveAttribute('data-reveal-disabled', 'true'));
    await expect(root).toBeVisible();
  },
};
