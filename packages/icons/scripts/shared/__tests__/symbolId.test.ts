import { describe, expect, it } from 'vitest';
import { componentNameToSymbolIdPart, filenameToSymbolIdPart, normalizeToSymbolIdPart } from '../symbolId';

describe('normalizeToSymbolIdPart', () => {
  it('lowercases and strips a file extension', () => {
    expect(normalizeToSymbolIdPart('AI.svg')).toBe('ai');
    expect(normalizeToSymbolIdPart('CPU.svg')).toBe('cpu');
  });

  it('inserts a hyphen between camel/PascalCase segments', () => {
    expect(normalizeToSymbolIdPart('AiAssistant')).toBe('ai-assistant');
    expect(normalizeToSymbolIdPart('BootcampFullLogoLight')).toBe('bootcamp-full-logo-light');
  });

  it('collapses spaces and other separators to a single hyphen', () => {
    expect(normalizeToSymbolIdPart('Zap Flash.svg')).toBe('zap-flash');
    expect(normalizeToSymbolIdPart('Cote dIvoire')).toBe('cote-d-ivoire');
  });

  it('keeps a trailing number attached to its word instead of hyphenating it', () => {
    expect(normalizeToSymbolIdPart('Smile 2')).toBe('smile2');
  });

  it('is insensitive to a case-only difference (regression: eye vs Eye)', () => {
    expect(normalizeToSymbolIdPart('eye')).toBe(normalizeToSymbolIdPart('Eye'));
  });
});

describe('filenameToSymbolIdPart', () => {
  it('strips the .svg extension before normalizing', () => {
    expect(filenameToSymbolIdPart('AiAssistant.svg')).toBe('ai-assistant');
  });
});

describe('componentNameToSymbolIdPart', () => {
  it('strips svgr\'s own leading "Svg" prefix and the generated suffix', () => {
    expect(componentNameToSymbolIdPart('SvgAiAssistant')).toBe('ai-assistant');
    expect(componentNameToSymbolIdPart('AiAssistantSVG')).toBe('ai-assistant');
    expect(componentNameToSymbolIdPart('AiAssistantSpriteSVG')).toBe('ai-assistant');
  });

  it('regression (FF-8754): does not eat a leading "Svg" that is part of the real icon name', () => {
    // `SvgExtension.svg` is the icon for the .svg file extension itself — componentNameToSymbolIdPart
    // strips ONE leading "Svg" (svgr's own prefix), so the name-bearing "Svg" of "SvgExtension"
    // would be eaten too if this function were ever applied to a plain file basename instead of
    // svgr's raw internal component name. See createExportIndexFile.ts / syncGeneratedIcons.ts —
    // they must normalize a GENERATED FILE's basename via filenameToSymbolIdPart, not this one.
    expect(componentNameToSymbolIdPart('SvgSvgExtension')).toBe('svg-extension');
  });
});
