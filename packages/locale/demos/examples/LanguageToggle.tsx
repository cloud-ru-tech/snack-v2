import { LocaleProvider, useLocale } from '@ds/locale';
import { useState } from 'react';

function NotFoundLabel() {
  const { t } = useLocale();

  return <span>{t('Dropdown.states.notFound.title')}</span>;
}

export function LanguageToggle() {
  const [lang, setLang] = useState<'ru-RU' | 'en-GB'>('ru-RU');

  return (
    <LocaleProvider lang={lang} fallbackLang='en-GB'>
      <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
        <button type='button' onClick={() => setLang(lang === 'ru-RU' ? 'en-GB' : 'ru-RU')}>
          Lang: {lang}
        </button>
        <NotFoundLabel />
      </div>
    </LocaleProvider>
  );
}
