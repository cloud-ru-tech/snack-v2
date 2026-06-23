import { defineLocale, defineMessages } from '@ds/locale';

const COLOR_PICKER_MESSAGES = defineMessages({
  'en-GB': {
    apply: 'Apply',
    cancel: 'Cancel',
    hex: 'Hex',
    r: 'Red',
    g: 'Green',
    b: 'Blue',
    h: 'Hue',
    s: 'Saturation',
    v: 'Value',
    alpha: 'Alpha',
  },
  'ru-RU': {
    apply: 'Применить',
    cancel: 'Отмена',
    hex: 'Hex',
    r: 'Красный',
    g: 'Зелёный',
    b: 'Синий',
    h: 'Тон',
    s: 'Насыщенность',
    v: 'Яркость',
    alpha: 'Прозрачность',
  },
});

export type ColorPickerMessages = (typeof COLOR_PICKER_MESSAGES)['en-GB'];

/** locale компонента ColorPicker: `colorPickerLocale.useTranslations()` в коде, `colorPickerLocale.extend(...)` в сервисе. */
export const colorPickerLocale = defineLocale('@ds/color-picker', COLOR_PICKER_MESSAGES);
