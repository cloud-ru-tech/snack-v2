import { basename } from 'path';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { normalizeToSymbolIdPart } from './symbolId.cjs';

/**
 * Нормализует имена иконок в kebab-case часть symbol id.
 * Сохраняет стабильное поведение для имён файлов с пробелами, дефисами и camel/pascal-case.
 * Основная regex-цепочка живёт в symbolId.cjs — используется совместно с
 * templates/generateDataTestId.cjs, который не может require .ts-файл (он выполняется в
 * собственном plain-Node процессе svgr, не в этом tsx-процессе).
 */
export { normalizeToSymbolIdPart };

export function filenameToSymbolIdPart(filename: string): string {
  return normalizeToSymbolIdPart(basename(filename, '.svg'));
}

export function componentNameToSymbolIdPart(componentName: string): string {
  return normalizeToSymbolIdPart(componentName.replace(/^Svg/, '').replace(/(SpriteSVG|SVG|Sprite)$/g, ''));
}
