import { Button } from '@ds/button';
import { RevealSection, RevealSectionProps } from '@ds/site-reveal-section';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';
import { expect, userEvent, waitFor, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { HIDDEN_ROOT_MARGIN } from '../../constants';
import { SampleSection } from '../../fixtures';
import { TEST_IDS } from '../../testIds';

function DisabledFixture(args: RevealSectionProps) {
  const [disabled, setDisabled] = useState(false);
  const handleToggle = useCallback(() => setDisabled(value => !value), []);

  return (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Отключение анимации</DemoTitle>
        <DemoHint>Отключённая секция остаётся видимой после повторного включения.</DemoHint>
        <DemoActions>
          <Button label='Переключить disabled' onClick={handleToggle} data-test-id={TEST_IDS.toggleDisabled} />
        </DemoActions>
        <RevealSection {...args} disabled={disabled} rootMargin={HIDDEN_ROOT_MARGIN}>
          <SampleSection />
        </RevealSection>
      </DemoPanel>
    </DemoPage>
  );
}

const meta: Meta<typeof RevealSection> = {
  title: 'Site/RevealSection/RevealSection/Tests/Interaction',
  component: RevealSection,
  parameters: { layout: 'fullscreen', controls: { disable: true }, figma: { disable: true } },
  args: { 'data-test-id': TEST_IDS.revealSection.root },
};

export default meta;
type Story = StoryObj<typeof RevealSection>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: args => <DisabledFixture {...args} />,
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);
    const root = canvas.getByTestId(TEST_IDS.revealSection.root);
    const toggle = canvas.getByTestId(TEST_IDS.toggleDisabled);

    await step('До отключения секция ожидает пересечения', async () => {
      await expect(root).toHaveAttribute('data-revealed', 'false');
    });

    await step('disabled сразу показывает содержимое без перехода', async () => {
      await userEvent.click(toggle);
      await waitFor(() => expect(root).toHaveAttribute('data-reveal-disabled', 'true'));
      await expect(root).toBeVisible();
    });

    await step('Повторное включение не запускает анимацию заново', async () => {
      await userEvent.click(toggle);
      await expect(root).toHaveAttribute('data-revealed', 'true');
      await expect(root).toHaveAttribute('data-reveal-disabled', 'true');
    });
  },
};
