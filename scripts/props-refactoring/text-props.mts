export const TEXT_LIKE_NAMES = [
  'label',
  'text',
  'title',
  'headline',
  'subtitle',
  'caption',
  'description',
  'hint',
  'helperText',
  'placeholder',
  'option',
  'content',
  'value',
] as const;

export type TextLikeName = (typeof TEXT_LIKE_NAMES)[number];

export const TEXT_ROLE_GROUPS = {
  primaryText: {
    id: 'primary-text',
    names: ['label', 'text', 'title', 'headline', 'option', 'content'] as const,
    description: 'Primary text / заголовок',
  },
  secondaryText: {
    id: 'secondary-text',
    names: ['caption', 'description', 'hint', 'subtitle', 'helperText'] as const,
    description: 'Secondary text / описание',
  },
  placeholder: {
    id: 'placeholder',
    names: ['placeholder'] as const,
    description: 'Placeholder',
  },
  valueId: {
    id: 'value-id',
    names: ['value'] as const,
    description: 'Value / id (overloaded)',
  },
} as const;

export type TypeSignatureBucket =
  | 'string'
  | 'react-node'
  | 'string-number'
  | 'string-react-node'
  | 'number'
  | 'boolean'
  | 'function'
  | 'object'
  | 'other';

export function classifyTypeSignature(raw: string): TypeSignatureBucket {
  const type = raw.replace(/\s+/g, ' ').trim().toLowerCase();
  if (!type) return 'other';

  if (/^\(\(/.test(type) || type.includes('=>') || type.includes('function')) return 'function';
  if (type === 'string') return 'string';
  if (type === 'number') return 'number';
  if (type === 'boolean') return 'boolean';
  if (type.includes('reactnode') || type.includes('reactelement') || type.includes('jsx.element')) return 'react-node';
  if (type.includes('string') && type.includes('number') && !type.includes('react')) return 'string-number';
  if (type.includes('string') && type.includes('react')) return 'string-react-node';
  if (type.includes('string')) return 'string';
  if (type.includes('number')) return 'number';
  if (type.includes('boolean')) return 'boolean';
  if (type.includes('{') || type.includes('[')) return 'object';
  return 'other';
}

export function isTextLikePropName(name: string): boolean {
  const base = name.includes('.') ? name.split('.').at(-1)! : name;
  return (TEXT_LIKE_NAMES as readonly string[]).includes(base);
}

export function isCompatibleTextBucket(a: TypeSignatureBucket, b: TypeSignatureBucket): boolean {
  if (a === b) return true;
  const stringLike = new Set<TypeSignatureBucket>(['string', 'string-number', 'string-react-node', 'react-node']);
  return stringLike.has(a) && stringLike.has(b);
}
