import { APPEARANCE, ROLE, STYLE, Track, type TrackProps, VARIANT } from '@ds/timeline';
import { Meta, StoryObj } from '@storybook/react';

import styles from '../styles.module.scss';

/** `role` в args Storybook конфликтует с HTML-атрибутом; для контролов и E2E используем `trackRole`. */
type StoryProps = Omit<TrackProps, 'role'> & { trackRole: TrackProps['role'] };

const meta: Meta<StoryProps> = {
  title: 'Components/Timeline/Track',
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
