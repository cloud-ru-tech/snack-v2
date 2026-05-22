import { APPEARANCE, ROLE, STYLE, Track, TrackProps, VARIANT } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from '../styles.module.scss';
import { TEST_IDS } from '../testIds';

/** `role` в args Storybook конфликтует с HTML-атрибутом; для контролов и E2E используем `trackRole`. */
type StoryProps = Omit<TrackProps, 'role'> & { trackRole: TrackProps['role'] };

const meta: Meta<StoryProps & { 'data-test-id'?: string }> = {
  title: 'Components/Timeline/Track',
  parameters: { layout: 'fullscreen' },
  args: {
    'data-test-id': TEST_IDS.track.root,
    trackRole: 'start',
    lineStyle: 'solid',
    dotVariant: 'default',
    dotAppearance: 'primary',
    showLines: true,
  },
  argTypes: {
    trackRole: {
      name: 'role',
      control: 'radio',
      options: Object.values(ROLE),
    },
    lineStyle: {
      control: 'radio',
      options: Object.values(STYLE),
    },
    dotVariant: {
      control: 'radio',
      options: Object.values(VARIANT),
    },
    dotAppearance: {
      control: 'select',
      options: Object.values(APPEARANCE),
    },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.track.root)).toBeVisible();
  },
  render: ({ trackRole, ...rest }) => (
    <DemoPage>
      <DemoPanel>
        <DemoTitle>Playground</DemoTitle>
        <DemoHint>Вертикальная дорожка таймлайна с точкой и линией.</DemoHint>
        <DemoActions align='center'>
          <div className={styles.trackWithContent}>
            <Track {...rest} role={trackRole} />
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
