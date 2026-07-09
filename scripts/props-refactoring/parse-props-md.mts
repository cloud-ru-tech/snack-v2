import { readFileSync } from 'node:fs';

import { isCallbackProp, isInfraProp } from './format-props.mts';
import { classifyTypeSignature } from './text-props.mts';

export type ParsedProp = {
  name: string;
  values: string[];
  valueKind: 'boolean' | 'enum' | 'complex';
  typeSignature: string;
  typeBucket: ReturnType<typeof classifyTypeSignature>;
  nested: boolean;
};

export type ParsedComponent = {
  pkg: string;
  displayName: string;
  surface: 'consumer' | 'exported-helper';
  props: ParsedProp[];
};

export type ParsedPropsDoc = {
  components: ParsedComponent[];
};

function parseValues(raw: string): { values: string[]; valueKind: ParsedProp['valueKind']; typeSignature: string } {
  const text = raw.trim();

  if (text.startsWith('[') && text.endsWith(']')) {
    const typeSignature = text.slice(1, -1).trim();
    return { values: [], valueKind: 'complex', typeSignature };
  }

  const parts = text.split(',').map(part => part.trim()).filter(Boolean);
  const boolSet = new Set(['true', 'false']);

  if (parts.length > 0 && parts.every(part => boolSet.has(part))) {
    return { values: ['true', 'false'], valueKind: 'boolean', typeSignature: 'boolean' };
  }

  if (parts.length > 0) {
    return { values: parts, valueKind: 'enum', typeSignature: parts.join(' | ') };
  }

  return { values: [], valueKind: 'complex', typeSignature: text };
}

export function parsePropsMarkdown(content: string): ParsedPropsDoc {
  const components: ParsedComponent[] = [];
  let current: ParsedComponent | null = null;

  for (const line of content.split('\n')) {
    if (line.startsWith('# ') || line.startsWith('- Generated:') || line.startsWith('- Command:') || line.startsWith('- Packages:') || line.startsWith('- Components:') || line.startsWith('- Props:') || line.startsWith('## Appendix')) {
      continue;
    }
    if (line.startsWith('|')) continue;

    const header = line.match(/^([a-z0-9-]+) \(([^)]+)\)(?: \[surface: (consumer|exported-helper)\])?$/);
    if (header) {
      current = {
        pkg: header[1],
        displayName: header[2],
        surface: (header[3] as ParsedComponent['surface']) ?? 'consumer',
        props: [],
      };
      components.push(current);
      continue;
    }

    if (!current) continue;

    const propLine = line.match(/^- ([^:]+): (.+)$/);
    if (!propLine) continue;

    const name = propLine[1].trim();
    if (isInfraProp(name) || isCallbackProp(name)) continue;

    const fullValue = propLine[2].trim();
    const tagMatch = fullValue.match(/\s+\[(infra|callback|nested)(?:,\s*(?:infra|callback|nested))*\]$/);
    const tags = tagMatch?.[0] ?? '';
    const rawValue = tagMatch ? fullValue.slice(0, tagMatch.index).trim() : fullValue;
    const nested = tags.includes('nested');
    const { values, valueKind, typeSignature } = parseValues(rawValue);

    current.props.push({
      name,
      values,
      valueKind,
      typeSignature,
      typeBucket: classifyTypeSignature(typeSignature),
      nested,
    });
  }

  return { components };
}

export function readPropsMarkdown(path: string): ParsedPropsDoc {
  return parsePropsMarkdown(readFileSync(path, 'utf8'));
}
