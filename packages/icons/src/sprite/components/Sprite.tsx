'use client';

import { memo, useEffect } from 'react';

import { notifySpriteMounted } from '../registry';

type SpriteProps = {
  content: string;
  'data-test-id'?: string;
};

export const Sprite = memo(function Sprite(props: SpriteProps) {
  // В SSR-разметке символы доступны иконкам сразу, но при динамическом монтировании
  // (SPA-переход, ленивый layout) иконки могли смаунтиться раньше и уйти в fallback —
  // сообщаем им, что спрайт появился (см. registry.ts).
  useEffect(() => {
    notifySpriteMounted();
  }, []);

  return (
    <div
      data-test-id={props['data-test-id']}
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{ __html: props.content }}
    />
  );
});
