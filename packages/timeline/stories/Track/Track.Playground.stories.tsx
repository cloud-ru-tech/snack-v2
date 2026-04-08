import type { Meta, StoryObj } from '@storybook/react';

import timelineReadme from '../../README.md?raw';
import { Track, type TrackProps } from '../../src/components/Track';
import { ROLE } from '../../src/components/Track/constants';
import { APPEARANCE, VARIANT } from '../../src/components/TrackDot/constants';
import { STYLE } from '../../src/components/TrackLine/constants';
import styles from '../styles.module.scss';

const figmaDesignUrl =
  'https://www.figma.com/design/aNPU3MHwRJiEwbk5F82zux/Snack-Ui-Kit-variables?node-id=8934-4234&m=dev';

/** `role` в args Storybook конфликтует с HTML-атрибутом; для контролов и E2E используем `trackRole`. */
type StoryProps = Omit<TrackProps, 'role'> & { trackRole: TrackProps['role'] };

const meta: Meta<StoryProps> = {
  title: 'Components/Timeline/Track',
  parameters: {
    readme: { content: timelineReadme },
    design: {
      type: 'figma',
      url: figmaDesignUrl,
    },
  },
  args: {
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
  render: ({ trackRole, ...rest }) => (
    <div className={styles.trackWithContent}>
      <Track {...rest} role={trackRole} />
    </div>
  ),
};
