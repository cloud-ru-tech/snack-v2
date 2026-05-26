import { Avatar, AVATAR_TO_STATUS_INDICATOR_SIZE, SIZE } from '@ds/avatar';
import { Counter, SIZE as COUNTER_SIZE } from '@ds/counter';
import { CheckSVG } from '@ds/icons';
import { APPEARANCE as STATUS_APPEARANCE, StatusIndicator } from '@ds/status';

import styles from './CustomBadge.module.scss';

export function CustomBadge() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <Avatar
        name='John Doe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=12'
        badge={<Counter value={5} size={COUNTER_SIZE.S} />}
      />

      <Avatar
        name='Jane Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=47'
        badge={
          <span className={styles.verified}>
            <CheckSVG size={16} />
          </span>
        }
      />

      <Avatar
        name='Alex Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=8'
        status={STATUS_APPEARANCE.Green}
      />

      <Avatar
        name='Mia Roe'
        size={SIZE['6Xl']}
        src='https://i.pravatar.cc/120?img=20'
        badge={
          <StatusIndicator size={AVATAR_TO_STATUS_INDICATOR_SIZE[SIZE['6Xl']]} appearance={STATUS_APPEARANCE.Red} />
        }
      />
    </div>
  );
}
