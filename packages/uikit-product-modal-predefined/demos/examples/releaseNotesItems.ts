import { NoteItemProps } from '@ds/uikit-product-modal-predefined';

export const releaseNotesItems: NoteItemProps[] = [
  {
    title: 'Обновлённые модальные сценарии',
    description: 'Единые состояния, подтверждение действий и release notes в desktop/mobile surfaces.',
    image: {
      src: 'https://placehold.co/520x320?text=Release+Notes',
      alt: 'Release notes preview',
    },
  },
  {
    title: 'Figma-first API',
    description: '`contentState` и поле подтверждения через `confirmText` соответствуют макетам Product UI Kit.',
    image: {
      src: 'https://placehold.co/520x320?text=Figma',
      alt: 'Figma preview',
    },
  },
];
