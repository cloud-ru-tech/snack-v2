import { defineLocale, defineMessages } from '@ds/locale';

const AVATAR_DETAIL_MESSAGES = defineMessages({
  'en-GB': {
    copy: 'Copy',
    copied: 'Copied',
    copyContactData: 'Copy contact data',
  },
  'ru-RU': {
    copy: 'Скопировать',
    copied: 'Скопировано',
    copyContactData: 'Скопировать контактные данные',
  },
});

export type AvatarDetailMessages = (typeof AVATAR_DETAIL_MESSAGES)['en-GB'];

/** locale компонента AvatarDetail: `avatarDetailLocale.useTranslations()` в коде, `avatarDetailLocale.extend(...)` в сервисе. */
export const avatarDetailLocale = defineLocale('@ds/uikit-product-avatar-detail', AVATAR_DETAIL_MESSAGES);
