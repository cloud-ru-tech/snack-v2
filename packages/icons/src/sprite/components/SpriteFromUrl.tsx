'use client';

import { useEffect, useState } from 'react';

import { notifySpriteMounted } from '../registry';

/**
 * Кэш промисов по URL — общий на модуль, а не на компонент: несколько `<SpriteFromUrl>` с одним
 * и тем же `src` (например, при повторном монтировании страницы в SPA-навигации) переиспользуют
 * один и тот же fetch, а не дублируют запрос.
 */
const fetchCache = new Map<string, Promise<string>>();

function fetchSpriteContent(url: string): Promise<string> {
  let promise = fetchCache.get(url);
  if (!promise) {
    promise = fetch(url).then(res => {
      if (!res.ok) throw new Error(`[@ds/icons] Failed to fetch sprite "${url}": ${res.status}`);
      return res.text();
    });
    fetchCache.set(url, promise);
    promise.catch(() => fetchCache.delete(url));
  }
  return promise;
}

type SpriteFromUrlProps = {
  /**
   * URL статического sprite-файла (например, скопированного `npx @ds/icons` в public/
   * потребительского приложения). В отличие от `Sprite` (см. `content`), этот файл — обычный
   * статик-ассет с собственным HTTP-кэшем: браузер не платит за него повторно при переходах
   * между страницами, только один раз, пока `Cache-Control` не протухнет.
   */
  src: string;
  'data-test-id'?: string;
};

/**
 * Клиентский аналог `Sprite`: не печатает содержимое спрайта в SSR-разметку (в отличие от
 * `Sprite`, где `content` — часть серверного рендера), а догружает его через `fetch` после
 * гидрации и вставляет в текущий документ (не как внешнюю ссылку `<use href="url#id">` —
 * externally-referenced `<use>` ломает наследование `currentColor` в части браузеров). До того,
 * как контент загрузится, каждая иконка группы уже показывает свой инлайн-fallback
 * (см. postProcessIconFallback.ts) — визуальной просадки нет.
 *
 * Компонент клиентский (`'use client'`) — не рендерит контент при серверном рендере ни в каком
 * виде, чтобы не наступить на ту же проблему SSR-инлайна, которую он должен обойти.
 */
export function SpriteFromUrl({ src, ...rest }: SpriteFromUrlProps) {
  const [content, setContent] = useState('');

  useEffect(() => {
    let cancelled = false;

    fetchSpriteContent(src)
      .then(text => {
        if (!cancelled) setContent(text);
      })
      .catch(() => {
        // Намеренно проглатываем: fallback каждой иконки уже покрывает отсутствие спрайта.
      });

    return () => {
      cancelled = true;
    };
  }, [src]);

  // Эффект выполняется после коммита DOM — символы уже в документе, можно будить иконки,
  // ушедшие в fallback до загрузки спрайта (см. registry.ts).
  useEffect(() => {
    if (content) notifySpriteMounted();
  }, [content]);

  return (
    <div
      data-test-id={rest['data-test-id']}
      style={{ display: 'none' }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
