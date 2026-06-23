import { Calendar, CALENDAR_MODE, calendarLocale } from '@ds/calendar';
import { getGlobalLocaleStore, LocaleProvider } from '@ds/locale';
import { Typography } from '@ds/typography';

import { greetingLocale } from './localeDemo';
import styles from './scene.module.scss';

/**
 * Витрина новой системы локализации (план: `.claude/plan/locale-decentralization.md`).
 *
 * Остров обёрнут в `LocaleProvider store={getGlobalLocaleStore().store}` — язык приезжает из глобального
 * singleton-стора (его двигает `LocaleSwitch` в шапке; в single-spa — из другого MFE). Демонстрирует:
 *
 *  1. **Строки в пакете.** `GreetingCard` берёт переводы из своего `greetingLocale` (`defineLocale`), не
 *     из центрального словаря. `Calendar` — реальный мигрированный @ds-компонент: названия месяца и
 *     дней недели переключаются вместе с языком (через `useLang` → `Intl.Locale`).
 *  2. **Новый язык без правок DS.** DE нет в словарях из коробки — он целиком из сервисных
 *     `*.extend('de-DE', …)` ниже. Непереведённые ключи грейсфулятся на fallback en-GB.
 *  3. **Каскад.** Вложенный `<LocaleProvider lang='en-GB'>` фиксирует свою карточку на английском,
 *     наследуя при этом DE-оверрайды родителя (merge), независимо от языка корня.
 */
const GERMAN_OVERRIDES = [
  greetingLocale.extend('de-DE', {
    title: 'Lokalisierungs-Kaskade',
    hello: 'Hallo, {{name}}!',
    note: 'Strings liegen im Paket; der Provider trägt nur die Sprache.',
    langLabel: 'Aktive Sprache',
  }),
  calendarLocale.extend('de-DE', {
    current: 'Jetzt',
    apply: 'Anwenden',
    time: 'Zeit',
    presets: 'Voreinstellungen',
    prevPeriodMonth: 'Voriger Monat',
    nextPeriodMonth: 'Nächster Monat',
    prevPeriodYear: 'Voriges Jahr',
    nextPeriodYear: 'Nächstes Jahr',
    prevPeriodDecade: 'Vorheriges Jahrzehnt',
    nextPeriodDecade: 'Nächstes Jahrzehnt',
  }),
];

export const LOCALE_SHOWCASE_TEST_IDS = {
  root: 'locale-showcase',
  greeting: 'locale-greeting',
  greetingLang: 'locale-greeting-lang',
  pinned: 'locale-pinned',
  pinnedLang: 'locale-pinned-lang',
} as const;

function GreetingCard() {
  const { t, lang } = greetingLocale.useTranslations();

  return (
    <div className={styles.localeCard} data-test-id={LOCALE_SHOWCASE_TEST_IDS.greeting}>
      <Typography variant='title' size='s'>
        {t('title')}
      </Typography>
      <Typography variant='body' size='m'>
        {t('hello', { name: 'Ada' })}
      </Typography>
      <Typography variant='body' size='s'>
        {t('note')}
      </Typography>
      <Typography variant='body' size='s'>
        {t('langLabel')}: <strong data-test-id={LOCALE_SHOWCASE_TEST_IDS.greetingLang}>{lang}</strong>
      </Typography>
    </div>
  );
}

function PinnedEnglishCard() {
  const { t, lang } = greetingLocale.useTranslations();

  return (
    <div className={styles.localeCard} data-test-id={LOCALE_SHOWCASE_TEST_IDS.pinned}>
      <Typography variant='body' size='m'>
        {t('hello', { name: 'Grace' })}
      </Typography>
      <Typography variant='body' size='s'>
        pinned: <strong data-test-id={LOCALE_SHOWCASE_TEST_IDS.pinnedLang}>{lang}</strong>
      </Typography>
    </div>
  );
}

export function LocaleShowcase() {
  return (
    <LocaleProvider store={getGlobalLocaleStore().store} overrides={GERMAN_OVERRIDES}>
      <section className={styles.localeShowcase} data-test-id={LOCALE_SHOWCASE_TEST_IDS.root}>
        <Typography variant='title' size='l'>
          Локализация
        </Typography>

        <div className={styles.localeCards}>
          <GreetingCard />
          {/* Каскад: эта карточка зафиксирована на en-GB независимо от языка корня. */}
          <LocaleProvider lang='en-GB'>
            <PinnedEnglishCard />
          </LocaleProvider>
        </div>

        <Calendar mode={CALENDAR_MODE.Date} fitToContainer={false} />
      </section>
    </LocaleProvider>
  );
}
