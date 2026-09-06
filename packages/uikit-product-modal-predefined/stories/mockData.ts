import { placeholderImage } from '#storybook/components';

import { NoteItemProps } from '../src';

export const RELEASE_NOTES_ITEMS: NoteItemProps[] = [
  {
    title: 'Обновлённый интерфейс модальных сценариев',
    description:
      'Добавили единый визуальный язык для delete, recall и release notes сценариев.\n\n- унифицированные действия;\n- поддержка состояний контента;\n- bottom sheet для mobile.',
    image: {
      src: placeholderImage(520, 320, 'Release Notes'),
      alt: 'Release notes preview',
    },
  },
  {
    title: 'Больше контроля над состояниями',
    description: 'Компоненты поддерживают Figma-axis `contentState` и поле подтверждения через `confirmText`.',
    image: {
      src: placeholderImage(520, 320, 'States'),
      alt: 'States preview',
    },
  },
];

/** Новости с заведомо недоступной иллюстрацией: путь не существует на сервере Storybook. */
export const RELEASE_NOTES_ITEMS_BROKEN_IMAGE: NoteItemProps[] = RELEASE_NOTES_ITEMS.map(item => ({
  ...item,
  image: { ...item.image, src: '/release-notes-missing-illustration.png' },
}));
