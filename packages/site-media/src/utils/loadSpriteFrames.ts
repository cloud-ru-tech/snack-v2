import { SpriteFrame } from '../shared/types';
import { parseSpriteVtt } from './sprite';

/** Необязательные кадры предпросмотра: недоступный VTT не препятствует проигрыванию. */
export async function loadSpriteFrames(url: string, signal: AbortSignal): Promise<SpriteFrame[]> {
  const response = await fetch(url, { signal });
  return response.ok ? parseSpriteVtt(await response.text(), url) : [];
}
