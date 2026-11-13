import { Button } from '@ds/button';
import { ChevronDownSVG, ChevronUpSVG } from '@ds/icons/interface/system';
import { Droplist, ItemId } from '@ds/list';
import { useRef, useState } from 'react';
import Player from 'video.js/dist/types/player';

import { PLAYBACK_RATES, TEST_IDS } from '../../constants';
import { siteMediaLocale } from '../../locale';
import { formatRate } from '../../utils';
import styles from './styles.module.scss';

type SpeedSelectProps = { player: Player; rate: number };

export function SpeedSelect({ player, rate }: SpeedSelectProps) {
  const { t } = siteMediaLocale.useTranslations();
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: ItemId) => {
    player.playbackRate(Number(value));
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={styles.root}>
      <Droplist
        items={PLAYBACK_RATES.map(value => ({
          id: String(value),
          content: { label: formatRate(value) },
          'data-test-id': `${TEST_IDS.speedOption}-${value}`,
        }))}
        selection={{ mode: 'single', value: String(rate), onChange: handleChange }}
        open={open}
        onOpenChange={setOpen}
        placement='top-end'
        trigger='click'
        triggerElemRef={triggerRef}
        container={containerRef}
        className={styles.menu}
        size='s'
        label={t('speed')}
        closeDroplistOnItemClick
        disableSpanWrapper
        data-test-id={TEST_IDS.speedMenu}
      >
        {({ onKeyDown }) => (
          <Button
            innerRef={triggerRef}
            label={formatRate(rate)}
            icon={open ? <ChevronUpSVG /> : <ChevronDownSVG />}
            iconPosition='after'
            view='simple'
            appearance='neutral'
            size='s'
            minWidth={false}
            aria-label={t('speed')}
            aria-haspopup='menu'
            aria-expanded={open}
            onKeyDown={onKeyDown}
            data-test-id={TEST_IDS.speed}
          />
        )}
      </Droplist>
    </div>
  );
}
