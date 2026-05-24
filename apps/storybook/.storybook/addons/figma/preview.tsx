import type { Decorator } from '@storybook/react';
import { addons } from 'storybook/preview-api';

import { FIGMA_EMBED_HOST, FIGMA_NODES, figmaNode, type FigmaNodeRef } from '#docs/lib/figma';

import { resolvePkgFromTitle } from '../shared/pkgFromTitle';
import { EVENT_SET, type FigmaPayload } from './constants';

function buildEmbedUrl(ref: FigmaNodeRef): string {
  const params = new URLSearchParams({
    'node-id': ref.nodeId,
    'embed-host': FIGMA_EMBED_HOST,
  });
  return `https://embed.figma.com/design/${ref.fileKey}/${ref.fileName}?${params.toString()}`;
}

// www.figma.com нельзя фреймить (frame-ancestors CSP). Переписываем любой
// design/board/proto/file/slides URL на embed.figma.com с нужным embed-host.
function toEmbedUrl(rawUrl: string): string {
  try {
    const u = new URL(rawUrl);
    if (u.hostname !== 'www.figma.com' && u.hostname !== 'figma.com') {
      return rawUrl;
    }
    u.hostname = 'embed.figma.com';
    u.searchParams.delete('m');
    u.searchParams.set('embed-host', FIGMA_EMBED_HOST);
    return u.toString();
  } catch {
    return rawUrl;
  }
}

type DesignParam =
  | string
  | { type?: 'figma' | 'iframe'; url?: string; fileKey?: string; fileName?: string; nodeId?: string }
  | undefined;

function payloadFromParams(design: DesignParam): FigmaPayload {
  if (!design) {
    return null;
  }
  if (typeof design === 'string') {
    return { url: toEmbedUrl(design) };
  }
  if (design.url) {
    return { url: toEmbedUrl(design.url) };
  }
  if (design.fileKey && design.fileName && design.nodeId) {
    return { url: buildEmbedUrl(design as FigmaNodeRef) };
  }
  return null;
}

function resolveByTitle(title: string): FigmaNodeRef | undefined {
  const resolved = resolvePkgFromTitle(title, FIGMA_NODES as Record<string, unknown>);
  if (!resolved) {
    return undefined;
  }
  // Перебираем «отрезки» rest от длинного к короткому — сначала самый специфичный sub.
  for (let take = resolved.rest.length; take >= 0; take--) {
    const subKey = take === 0 ? undefined : resolved.rest.slice(0, take).join('-');
    const node = figmaNode(resolved.pkg, subKey);
    if (node) {
      return node;
    }
  }
  return undefined;
}

export const decorators: Decorator[] = [
  (Story, ctx) => {
    const explicit = payloadFromParams((ctx.parameters as { design?: DesignParam }).design);
    let payload = explicit;
    if (!payload) {
      const node = resolveByTitle(ctx.title);
      if (node) {
        payload = { url: buildEmbedUrl(node) };
      }
    }
    addons.getChannel().emit(EVENT_SET, payload);
    return Story();
  },
];
