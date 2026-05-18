import { HsvaColor, RgbaColor } from '../types';
import { hsvaToHex } from './convert';

const rgb = (r: number, g: number, b: number): string => `rgb(${r}, ${g}, ${b})`;

export function rgbChannelGradient(channel: 'r' | 'g' | 'b'): string {
  const pure: Record<typeof channel, string> = {
    r: rgb(255, 0, 0),
    g: rgb(0, 255, 0),
    b: rgb(0, 0, 255),
  };
  return `linear-gradient(to right, ${rgb(0, 0, 0)}, ${pure[channel]})`;
}

export function hueGradient(): string {
  return (
    'linear-gradient(to right, ' +
    `${rgb(255, 0, 0)} 0%, ` +
    `${rgb(255, 255, 0)} 16.6667%, ` +
    `${rgb(0, 255, 0)} 33.3333%, ` +
    `${rgb(0, 255, 255)} 50%, ` +
    `${rgb(0, 0, 255)} 66.6667%, ` +
    `${rgb(255, 0, 255)} 83.3333%, ` +
    `${rgb(255, 0, 0)} 100%)`
  );
}

export function hsvSaturationGradient({ h, v }: { h: number; v: number }): string {
  const start = hsvaToHex({ h, s: 0, v, a: 1 });
  const end = hsvaToHex({ h, s: 100, v, a: 1 });
  return `linear-gradient(to right, ${start}, ${end})`;
}

export function hsvValueGradient({ h, s }: { h: number; s: number }): string {
  const start = hsvaToHex({ h, s, v: 0, a: 1 });
  const end = hsvaToHex({ h, s, v: 100, a: 1 });
  return `linear-gradient(to right, ${start}, ${end})`;
}

export function alphaGradient({ r, g, b }: RgbaColor): string {
  // `in srgb` фиксит «серую полосу» в середине: без него WebKit интерполирует через
  // premultiplied alpha и rgba(r,g,b,0) даёт серый в середине градиента.
  return `linear-gradient(in srgb to right, rgba(${r}, ${g}, ${b}, 0), ${rgb(r, g, b)})`;
}

export function composeRgba({ r, g, b, a }: RgbaColor): string {
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

export function hsvToHexOpaque(hsva: HsvaColor): string {
  return hsvaToHex({ ...hsva, a: 1 });
}
