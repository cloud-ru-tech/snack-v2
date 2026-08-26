type XML = {
  [key: `@_${string}`]: string;
  [key: string]: string | XML;
};

export type SVGIcon = {
  svg: XML;
};

export type IconInfo = {
  path: string;
  content: string;
  xml: SVGIcon;
};

export type ValidationResult = {
  level: 'error' | 'warning';
  message: string;
};

export type Validator = {
  validate(props: { icon: IconInfo; allIcons: IconInfo[] }): ValidationResult | null;
};
