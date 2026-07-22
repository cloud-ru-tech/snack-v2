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
    description: 'Компоненты поддерживают Figma-axis `contentState` и explicit `confirmable` для подтверждений.',
    image: {
      src: placeholderImage(520, 320, 'States'),
      alt: 'States preview',
    },
  },
];
