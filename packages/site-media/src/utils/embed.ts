export type EmbedSource = {
  provider: 'youtube' | 'rutube';
  src: string;
};

export function getEmbedSource(link: string): EmbedSource | undefined {
  let url: URL;

  try {
    url = new URL(link);
  } catch {
    return undefined;
  }

  if (!['https:', 'http:'].includes(url.protocol)) {
    return undefined;
  }

  const host = url.hostname.toLowerCase();

  if (
    [
      'youtube.com',
      'www.youtube.com',
      'm.youtube.com',
      'youtube-nocookie.com',
      'www.youtube-nocookie.com',
      'youtu.be',
    ].includes(host)
  ) {
    const id =
      host === 'youtu.be'
        ? url.pathname.slice(1)
        : (url.searchParams.get('v') ?? url.pathname.match(/^\/(?:embed|shorts)\/([^/]+)/)?.[1]);

    if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) {
      return { provider: 'youtube', src: 'https://www.youtube.com/embed/' + id + '?enablejsapi=1&playsinline=1' };
    }
  }

  if (host === 'rutube.ru' || host === 'www.rutube.ru') {
    const id = url.pathname.match(/^\/(?:video|play\/embed)\/([a-zA-Z0-9_-]+)/)?.[1];

    if (id) {
      return { provider: 'rutube', src: 'https://rutube.ru/play/embed/' + id };
    }
  }

  return undefined;
}

/** Разбор сообщений встраиваемого плеера на границе postMessage. */
export function parseEmbedMessage(data: unknown): Record<string, unknown> | undefined {
  try {
    const value: unknown = typeof data === 'string' ? JSON.parse(data) : data;

    return value !== null && typeof value === 'object' && !Array.isArray(value)
      ? (value as Record<string, unknown>)
      : undefined;
  } catch {
    return undefined;
  }
}

export function getEmbedPlaying(
  provider: EmbedSource['provider'],
  message: Record<string, unknown>,
): boolean | undefined {
  if (provider === 'rutube' && message.type === 'player:changeState') {
    const data = parseEmbedMessage(message.data);

    if (data?.state === 'playing') {
      return true;
    }

    if (data?.state === 'paused' || data?.state === 'stopped') {
      return false;
    }
  }

  const info = parseEmbedMessage(message.info);
  const state = message.event === 'onStateChange' ? message.info : info?.playerState;

  if (provider === 'youtube' && (message.event === 'onStateChange' || message.event === 'infoDelivery')) {
    if (state === 1) {
      return true;
    }

    if (state === 0 || state === 2) {
      return false;
    }
  }

  return undefined;
}
