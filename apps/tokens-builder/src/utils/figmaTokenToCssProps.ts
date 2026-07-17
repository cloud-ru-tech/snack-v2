import { COMMON_CSS_PROP_NAMES, FIGMA_TO_CSS_EXACT } from '../constants/figmaToCssProps.js';
import { ensureArray } from './ensureArray.js';
import { toKebabCase } from './toKebabCase.js';

export function figmaTokenToCssProps(key: string): string[] {
  const exact = FIGMA_TO_CSS_EXACT[key];
  if (exact) return ensureArray(exact);

  const patternResults: Array<{ test: (k: string) => boolean; result: string[] }> = [
    { test: k => k.endsWith('-gap') || k.endsWith('-content-gap'), result: ['gap'] },
    { test: k => k.endsWith('-corner-radius-top-left'), result: ['border-top-left-radius'] },
    { test: k => k.endsWith('-corner-radius-top-right'), result: ['border-top-right-radius'] },
    { test: k => k.endsWith('-corner-radius-bottom-left'), result: ['border-bottom-left-radius'] },
    { test: k => k.endsWith('-corner-radius-bottom-right'), result: ['border-bottom-right-radius'] },
    { test: k => k.endsWith('-corner-radius-left'), result: ['border-top-left-radius', 'border-bottom-left-radius'] },
    {
      test: k => k.endsWith('-corner-radius-right'),
      result: ['border-top-right-radius', 'border-bottom-right-radius'],
    },
    { test: k => k.endsWith('-corner-radius-top'), result: ['border-top-left-radius', 'border-top-right-radius'] },
    {
      test: k => k.endsWith('-corner-radius-bottom'),
      result: ['border-bottom-left-radius', 'border-bottom-right-radius'],
    },
    { test: k => k.endsWith('-corner-radius'), result: ['border-radius'] },
    { test: k => k.endsWith('-stroke-weight-top') || k.endsWith('-stroke-weigth-top'), result: ['border-top-width'] },
    {
      test: k => k.endsWith('-stroke-weight-right') || k.endsWith('-stroke-weigth-right'),
      result: ['border-right-width'],
    },
    {
      test: k => k.endsWith('-stroke-weight-bottom') || k.endsWith('-stroke-weigth-bottom'),
      result: ['border-bottom-width'],
    },
    {
      test: k => k.endsWith('-stroke-weight-left') || k.endsWith('-stroke-weigth-left'),
      result: ['border-left-width'],
    },
    {
      test: k => k.endsWith('-stroke-weight-horizontal') || k.endsWith('-stroke-weigth-horizontal'),
      result: ['border-left-width', 'border-right-width'],
    },
    {
      test: k => k.endsWith('-stroke-weight-vertical') || k.endsWith('-stroke-weigth-vertical'),
      result: ['border-top-width', 'border-bottom-width'],
    },
    {
      test: k =>
        /-stroke-weight$|-stroke-weigth$|^stroke-weigth$|^stroke-weight$|^strokeweigth$|^strokeweight$/.test(k),
      result: ['border-width'],
    },
    { test: k => k.endsWith('-padding-left'), result: ['padding-left'] },
    { test: k => k.endsWith('-padding-right'), result: ['padding-right'] },
    { test: k => k.endsWith('-padding-top'), result: ['padding-top'] },
    { test: k => k.endsWith('-padding-bottom'), result: ['padding-bottom'] },
    { test: k => k.endsWith('-padding-horizontal'), result: ['padding-left', 'padding-right'] },
    { test: k => k.endsWith('-padding-vertical'), result: ['padding-top', 'padding-bottom'] },
    {
      test: k => k.endsWith('-padding') || k.endsWith('-content-padding') || k === 'content-padding',
      result: ['padding'],
    },
    { test: k => k === 'font-size' || k === 'fontSize', result: ['font-size'] },
    { test: k => k.endsWith('-min-width') || k === 'min-width' || k === 'minWidth', result: ['min-width'] },
    { test: k => k.endsWith('-max-width') || k === 'max-width' || k === 'maxWidth', result: ['max-width'] },
    { test: k => k.endsWith('-min-height') || k === 'min-height' || k === 'minHeight', result: ['min-height'] },
    { test: k => k.endsWith('-max-height') || k === 'max-height' || k === 'maxHeight', result: ['max-height'] },
    { test: k => k.endsWith('-square') || k === 'square', result: ['width', 'height'] },
    { test: k => k.endsWith('-width') || k === 'width', result: ['width'] },
    { test: k => k.endsWith('-height') || k === 'height', result: ['height'] },
    { test: k => k.endsWith('-size') || k === 'size', result: ['width'] },
    { test: k => /-bg-(default|hover|pressed|disabled)$/.test(k), result: ['background-color'] },
    { test: k => /-fg-(default|hover|pressed|disabled)$/.test(k), result: ['color'] },
  ];

  for (const { test, result } of patternResults) {
    if (test(key)) return result;
  }
  return [key];
}

export function isValidCssProperty(key: string): boolean {
  const kebabKey = toKebabCase(key);
  const cssProps = figmaTokenToCssProps(kebabKey);
  return (
    COMMON_CSS_PROP_NAMES.includes(kebabKey as (typeof COMMON_CSS_PROP_NAMES)[number]) ||
    (cssProps.length > 0 && cssProps[0] !== kebabKey)
  );
}
