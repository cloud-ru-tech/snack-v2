import { Button } from '@ds/button';
import { defineLocale, defineMessages, LocaleProvider } from '@ds/locale';
import { SegmentControl } from '@ds/segment-control';
import { Tag } from '@ds/tag';
import { Typography } from '@ds/typography';
import { Flex } from '@ds/uikit-product-flex';
import { useState } from 'react';

// Словарь компонента co-located: defineMessages требует одинаковый набор ключей во всех языках.
const DEMO_MESSAGES = defineMessages({
  'en-GB': { action: 'Save', status: 'Ready', greeting: 'Hello' },
  'ru-RU': { action: 'Сохранить', status: 'Готово', greeting: 'Привет' },
});

const demoLocale = defineLocale('LocaleDemo', DEMO_MESSAGES);

// Консьюмер читает строки из ближайшего LocaleProvider — текст компонентов меняется вслед за языком.
function LocalizedSurface() {
  const { t, lang } = demoLocale.useTranslations();

  return (
    <Flex gap='2m' align='center' wrap>
      <Button appearance='primary' label={t('action')} />
      <Tag appearance='green' label={t('status')} />
      <Typography variant='body' size='s'>
        {t('greeting')} · {lang}
      </Typography>
    </Flex>
  );
}

const LANG_ITEMS = [
  { value: 'ru-RU', label: 'Русский' },
  { value: 'en-GB', label: 'English' },
];

export function LanguageToggle() {
  const [lang, setLang] = useState('ru-RU');

  return (
    <Flex direction='column' gap='2m' align='flex-start'>
      <SegmentControl items={LANG_ITEMS} value={lang} onChange={value => setLang(String(value))} />
      <LocaleProvider lang={lang} fallbackLang='en-GB'>
        <LocalizedSurface />
      </LocaleProvider>
    </Flex>
  );
}
