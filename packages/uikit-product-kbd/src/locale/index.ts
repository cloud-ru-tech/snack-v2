import { defineLocale, defineMessages } from '@ds/locale';

// Модификаторы называются латиницей и на русском: так подписаны клавиши.
// `mod`, `alt` и `meta` различаются по платформе — ключи `*Other` для Windows/Linux.
const KBD_MESSAGES = defineMessages({
  'en-GB': {
    mod: 'Command',
    modOther: 'Control',
    ctrl: 'Control',
    alt: 'Option',
    altOther: 'Alt',
    meta: 'Command',
    metaOther: 'Windows',
    shift: 'Shift',
    up: 'Up arrow',
    down: 'Down arrow',
    left: 'Left arrow',
    right: 'Right arrow',
    enter: 'Enter',
    esc: 'Escape',
  },
  'ru-RU': {
    mod: 'Command',
    modOther: 'Control',
    ctrl: 'Control',
    alt: 'Option',
    altOther: 'Alt',
    meta: 'Command',
    metaOther: 'Windows',
    shift: 'Shift',
    up: 'Стрелка вверх',
    down: 'Стрелка вниз',
    left: 'Стрелка влево',
    right: 'Стрелка вправо',
    enter: 'Enter',
    esc: 'Escape',
  },
});

/** Форма словаря — для типизации сервисных оверрайдов/новых языков. */
export type KbdMessages = (typeof KBD_MESSAGES)['en-GB'];

/** locale компонента Kbd: `kbdLocale.useTranslations()` в коде, `kbdLocale.extend(...)` в сервисе. */
export const kbdLocale = defineLocale('@ds/uikit-product-kbd', KBD_MESSAGES);
