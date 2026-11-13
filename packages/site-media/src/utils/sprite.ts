import { SpriteFrame } from '../shared/types';
import { resolveUrl } from './url';

const VTT_TIMES_REGEXP = /(\d+):(\d+):(\d+)[.,](\d+)\s+-->/;
const VTT_XYWH_REGEXP = /^(.+)#xywh=(\d+),(\d+),(\d+),(\d+)$/;

export function parseSpriteVtt(vtt: string, vttUrl: string): SpriteFrame[] {
  const lines = vtt.split(/\r?\n/).map(line => line.trim());

  return lines.reduce<SpriteFrame[]>((frames, line, index) => {
    const time = line.match(VTT_TIMES_REGEXP);
    const xywh = lines[index + 1]?.match(VTT_XYWH_REGEXP);

    if (!time || !xywh) {
      return frames;
    }

    const [, hours, minutes, seconds, fraction] = time;
    const [, image, x, y, width, height] = xywh;
    const imageUrl = resolveUrl(image, vttUrl);

    if (imageUrl) {
      frames.push({
        start: Number(hours) * 3600 + Number(minutes) * 60 + Number(`${seconds}.${fraction}`),
        imageUrl,
        x: Number(x),
        y: Number(y),
        width: Number(width),
        height: Number(height),
      });
    }

    return frames;
  }, []);
}

export function findSpriteFrame(frames: SpriteFrame[], time: number) {
  let result: SpriteFrame | undefined;

  for (const frame of frames) {
    if (frame.start > time) {
      break;
    }
    result = frame;
  }

  return result;
}
