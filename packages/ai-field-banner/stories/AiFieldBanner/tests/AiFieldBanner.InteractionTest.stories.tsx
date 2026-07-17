import { AiFieldBanner } from '@ds/ai-field-banner';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoPage, DemoPanel } from '#storybook/components';

import styles from '../stories.module.scss';
import { TEST_IDS } from '../testIds';

const meta: Meta<typeof AiFieldBanner> = {
  title: 'Ai/AiFieldBanner/Tests/Interaction',
  component: AiFieldBanner,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};

export default meta;
type Story = StoryObj<typeof AiFieldBanner>;

export const InteractionTest: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            variant='information'
            description='Description'
            actionLabel='Label text'
            icon={<PlaceholderSVG />}
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const WithoutIcon: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            description='Description'
            actionLabel='Label text'
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};

export const WithoutAction: Story = {
  tags: ['test', 'dev'],
  render: () => (
    <DemoPage>
      <DemoPanel>
        <DemoActions align='start'>
          <AiFieldBanner
            description='Description'
            icon={<PlaceholderSVG />}
            className={styles.bannerCell}
            data-test-id={TEST_IDS.root}
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
