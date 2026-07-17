import { Avatar, AVATAR_TO_STATUS_INDICATOR_SIZE, SIZE } from '@ds/avatar';
import { Counter, SIZE as COUNTER_SIZE } from '@ds/counter';
import { CheckSVG } from '@ds/icons/interface/system';
import { APPEARANCE as STATUS_APPEARANCE, StatusIndicator } from '@ds/status';
import { Meta, StoryObj } from '@storybook/react';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import { TEST_IDS } from '../testIds';
import portrait3 from './assets/portrait-8.jpg';
import portrait1 from './assets/portrait-12.jpg';
import portrait4 from './assets/portrait-20.jpg';
import portrait2 from './assets/portrait-47.jpg';
import styles from './CustomBadge.module.scss';

// loader возвращает ImageMetadata-объект, в runtime — url. Cast в string —
// то же, что в Avatar.VisualMatrix.stories.tsx.
const portraits = [portrait1, portrait2, portrait3, portrait4].map(p => p as unknown as string);

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar/Examples/CustomBadge',
  component: Avatar,
  parameters: { layout: 'fullscreen', controls: { disable: true } },
};
export default meta;
type Story = StoryObj<typeof Avatar>;

/**
 * Слот `badge` принимает любой ReactNode. Положение — bbox прижат к
 * правому-нижнему углу аватара (см. `styles.module.scss::.badge`),
 * поэтому подойдёт `Counter`, иконка-«verified», или любой собственный
 * компонент. Размер бейджа потребитель выбирает сам — если хочется
 * визуальной парности с дефолтным `StatusIndicator`, можно взять
 * `AVATAR_TO_STATUS_INDICATOR_SIZE[avatarSize]` как ориентир.
 */
export const CustomBadge: Story = {
  tags: ['dev', 'test'],
  render: () => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Custom badge slot</DemoTitle>
        <DemoHint>
          В слот `badge` можно положить любой компонент: счётчик уведомлений, иконку верификации, собственный
          микро-компонент. Bbox бейджа упирается в правый-нижний угол аватара.
        </DemoHint>
        <DemoActions align='center'>
          <Avatar
            data-test-id={TEST_IDS.root}
            name='John Doe'
            size={SIZE['6Xl']}
            src={portraits[0]}
            badge={<Counter value={5} size={COUNTER_SIZE.S} />}
          />

          <Avatar
            name='Jane Roe'
            size={SIZE['6Xl']}
            src={portraits[1]}
            badge={
              <span className={styles.verified}>
                <CheckSVG size={16} />
              </span>
            }
          />

          <Avatar name='Alex Roe' size={SIZE['6Xl']} src={portraits[2]} status={STATUS_APPEARANCE.Green} />

          <Avatar
            name='Mia Roe'
            size={SIZE['6Xl']}
            src={portraits[3]}
            badge={
              <StatusIndicator size={AVATAR_TO_STATUS_INDICATOR_SIZE[SIZE['6Xl']]} appearance={STATUS_APPEARANCE.Red} />
            }
          />
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
};
