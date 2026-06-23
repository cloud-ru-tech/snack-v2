import { BUILTIN_LANGS, defineLocale, defineMessages, LocaleProvider, useLang } from '@ds/locale';
import { Meta, StoryObj } from '@storybook/react';
import { expect, within } from 'storybook/test';

import { DemoActions, DemoHint, DemoPage, DemoPanel, DemoTitle } from '#storybook/components';

import styles from './styles.module.scss';
import { TEST_IDS } from './testIds';

// Словарь демо co-located с компонентом: defineMessages на уровне типов требует одинаковый
// набор ключей во всех языках. defineLocale из него отдаёт хук переводов и билдер оверрайдов.
const DEMO_MESSAGES = defineMessages({
  'en-GB': {
    greeting: 'Hello, {{name}}!',
    state: { empty: 'Nothing found' },
  },
  'ru-RU': {
    greeting: 'Привет, {{name}}!',
    state: { empty: 'Ничего не найдено' },
  },
});

const demoLocale = defineLocale('LocaleStoryDemo', DEMO_MESSAGES);

/**
 * Консьюмер: читает строки из ближайшего `LocaleProvider` через `useTranslations`,
 * текущий тег языка — через `useLang`. Прокидывать пропсы не нужно.
 */
function LocaleSurface() {
  const { t } = demoLocale.useTranslations();
  const lang = useLang();

  return (
    <div className={styles.localeSurface} data-test-id={TEST_IDS.root}>
      <div className={styles.row}>
        <span>useLang():</span>
        <span className={styles.value}>{lang}</span>
      </div>
      <div className={styles.row}>
        <span>t(&apos;greeting&apos;):</span>
        <span className={styles.value}>{t('greeting', { name: 'Ada' })}</span>
      </div>
      <div className={styles.row}>
        <span>t(&apos;state.empty&apos;):</span>
        <span className={styles.value}>{t('state.empty')}</span>
      </div>
    </div>
  );
}

type StoryProps = {
  lang: string;
  fallbackLang: string;
};

const meta: Meta<StoryProps> = {
  title: 'Components/Locale',
  parameters: { layout: 'fullscreen', figma: { disable: true } },
  args: {
    lang: 'ru-RU',
    fallbackLang: 'en-GB',
  },
  argTypes: {
    lang: { control: 'select', options: BUILTIN_LANGS },
    fallbackLang: { control: 'select', options: BUILTIN_LANGS },
  },
};

export default meta;

type Story = StoryObj<StoryProps>;

export const Playground: Story = {
  tags: ['dev', 'test'],
  render: args => (
    <DemoPage>
      <DemoPanel width='wide'>
        <DemoTitle>Locale Provider</DemoTitle>
        <DemoHint>
          <code>LocaleProvider</code> несёт только язык и fallback — строки живут в самих пакетах (
          <code>defineMessages</code> / <code>defineLocale</code>). Переключите <code>lang</code>; консьюмер ниже читает
          строки через <code>useTranslations</code>. В приложении язык приходит пропом или из{' '}
          <code>getGlobalLocaleStore().store</code> (MFE).
        </DemoHint>
        <DemoActions block>
          <div className={styles.localeStack}>
            <LocaleProvider lang={args.lang} fallbackLang={args.fallbackLang}>
              <LocaleSurface />
            </LocaleProvider>
          </div>
        </DemoActions>
      </DemoPanel>
    </DemoPage>
  ),
  play: async ({ canvasElement }) => {
    await expect(within(canvasElement).getByTestId(TEST_IDS.root)).toBeVisible();
  },
};
