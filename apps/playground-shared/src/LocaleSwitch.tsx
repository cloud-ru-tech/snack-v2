import { getGlobalLocaleStore } from '@ds/locale';
import { SegmentControl } from '@ds/segment-control';
import { Typography } from '@ds/typography';
import { useSyncExternalStore } from 'react';

import styles from './scene.module.scss';

/**
 * Переключатель языка на `SegmentControl`: RU / EN / DE. Пишет в глобальный singleton-стор языка
 * (`getGlobalLocaleStore().setLang`) — тот же рецепт, что у темы/адаптива. В single-spa переключатель
 * живёт в navbar-MFE, а `LocaleShowcase` — в content-MFE: оба читают ОДИН стор, поэтому смена языка в
 * шапке синхронно переключает контент в другом микрофронте. DE — язык, которого нет в словарях DS из
 * коробки: он приезжает только из сервисных `extend('de-DE', …)`, заданных на провайдере островка.
 */
const LOCALE_SEGMENTS: { value: string; label: string }[] = [
  { value: 'ru-RU', label: 'RU' },
  { value: 'en-GB', label: 'EN' },
  { value: 'de-DE', label: 'DE' },
];

export const LOCALE_SWITCH_TEST_IDS = {
  control: 'locale-switch',
  lang: 'navbar-lang',
} as const;

export function LocaleSwitch() {
  const localeStore = getGlobalLocaleStore();
  const lang = useSyncExternalStore(
    localeStore.store.subscribe,
    () => localeStore.getLang(),
    () => localeStore.getLang(),
  );

  return (
    <div className={styles.themeSwitch}>
      <SegmentControl<string>
        size='s'
        items={LOCALE_SEGMENTS}
        value={lang}
        onChange={localeStore.setLang}
        data-test-id={LOCALE_SWITCH_TEST_IDS.control}
        outline
      />
      <Typography variant='body' size='s'>
        язык: <strong data-test-id={LOCALE_SWITCH_TEST_IDS.lang}>{lang}</strong>
      </Typography>
    </div>
  );
}
