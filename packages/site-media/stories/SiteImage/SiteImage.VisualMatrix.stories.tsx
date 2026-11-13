import { SiteImage } from '@ds/site-media';
import { Meta, StoryObj } from '@storybook/react';

import { StoryTable } from '#storybook/components';

import { POSTER } from '../fixtures';
import styles from '../styles.module.scss';

const meta: Meta<typeof SiteImage> = {
  title: 'Site/Media/SiteImage',
  component: SiteImage,
  parameters: { layout: 'padded', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof SiteImage>;
export const VisualMatrix: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <StoryTable
      className={styles.matrix}
      sectionTitle='Изображение'
      columnHeaders={['720px', '360px']}
      rows={[
        {
          variantLabel: 'default',
          cells: [styles.player, styles.mobile].map(className => (
            <SiteImage key={className} src={POSTER} alt='Интерфейс сервиса' className={className} />
          )),
        },
      ]}
    />
  ),
};
