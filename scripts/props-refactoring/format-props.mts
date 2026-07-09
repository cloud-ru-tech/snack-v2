import type { FlatPropDef } from './flatten-props.mts';
import type { PropDef } from './types.mts';
import type { ComponentSurface } from './surface.mts';

const INFRA_PROPS = new Set([
  'as',
  'children',
  'className',
  'data-test-id',
  'id',
  'innerRef',
  'style',
  'tabIndex',
]);

export function isInfraProp(name: string): boolean {
  const base = name.includes('.') ? name.split('.').at(-1)! : name;
  return INFRA_PROPS.has(base);
}

export function isCallbackProp(name: string): boolean {
  const base = name.includes('.') ? name.split('.').at(-1)! : name;
  return /^on[A-Z]/.test(base);
}

function simplifyType(type: string): string {
  const normalized = type.replace(/\s+/g, ' ').trim();
  if (normalized.length <= 96) return normalized;
  return `${normalized.slice(0, 93)}...`;
}

export function formatPropValues(def: PropDef | FlatPropDef): string {
  if (def.values && def.values.length > 0) {
    return def.values.join(', ');
  }

  const type = def.type.toLowerCase();
  if (type === 'boolean' || type === 'false' || type === 'true') {
    return 'true, false';
  }

  if (/\bboolean\b/.test(type) && !type.includes('|')) {
    return 'true, false';
  }

  return `[${simplifyType(def.type)}]`;
}

export function sortPropNames(names: string[]): string[] {
  return [...names].sort((a, b) => {
    const rank = (name: string) => {
      if (isInfraProp(name)) return 3;
      if (isCallbackProp(name)) return 4;
      if (name.includes('.')) return 2;
      return 1;
    };
    const rankDiff = rank(a) - rank(b);
    if (rankDiff !== 0) return rankDiff;
    return a.localeCompare(b);
  });
}

export function formatComponentBlock(
  pkgName: string,
  displayName: string,
  props: Record<string, PropDef | FlatPropDef>,
  surface?: ComponentSurface,
): string {
  const surfaceTag = surface === 'exported-helper' ? ' [surface: exported-helper]' : '';
  const lines: string[] = [`${pkgName} (${displayName})${surfaceTag}`];

  for (const propName of sortPropNames(Object.keys(props))) {
    const def = props[propName];
    const tags: string[] = [];
    if (isInfraProp(propName)) tags.push('infra');
    else if (isCallbackProp(propName)) tags.push('callback');
    if ('nested' in def && def.nested) tags.push('nested');
    const suffix = tags.length > 0 ? ` [${tags.join(', ')}]` : '';
    lines.push(`- ${propName}: ${formatPropValues(def)}${suffix}`);
  }

  return lines.join('\n');
}

export function formatMarkdownHeader(params: {
  title: string;
  generatedAt: string;
  command: string;
  packages: number;
  components: number;
  props: number;
}): string {
  return [
    `# ${params.title}`,
    '',
    `- Generated: ${params.generatedAt}`,
    `- Command: \`${params.command}\``,
    `- Packages: ${params.packages}`,
    `- Components: ${params.components}`,
    `- Props: ${params.props}`,
    '',
  ].join('\n');
}

export function formatTextCensusAppendix(rows: { name: string; count: number; types: string[]; packages: Set<string> }[]): string {
  const lines = [
    '## Appendix: Text-like prop census',
    '',
    '| Prop | Usages | Type signatures | Packages |',
    '|------|--------|-----------------|----------|',
  ];

  for (const row of rows) {
    const types = row.types.slice(0, 4).join('; ') + (row.types.length > 4 ? '; …' : '');
    const pkgs = [...row.packages].sort().slice(0, 8).join(', ') + (row.packages.size > 8 ? ', …' : '');
    lines.push(`| \`${row.name}\` | ${row.count} | ${types} | ${pkgs} |`);
  }

  lines.push('');
  return lines.join('\n');
}
