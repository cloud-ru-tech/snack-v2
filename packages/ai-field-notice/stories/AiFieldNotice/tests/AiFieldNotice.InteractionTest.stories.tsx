import { AiFieldNotice } from '@ds/ai-field-notice';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import { FIXTURE_PASSWORD_NOTICE, FIXTURE_VM_AGENT_NOTICE } from '../fixtures';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiFieldNotice> = {
  title: 'Ai/AiFieldNotice/Tests/Interaction',
  component: AiFieldNotice,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiFieldNotice>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldNotice {...FIXTURE_PASSWORD_NOTICE} data-test-id={TEST_IDS.root} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const BannerOnly: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldNotice {...FIXTURE_VM_AGENT_NOTICE} data-test-id={TEST_IDS.root} />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
