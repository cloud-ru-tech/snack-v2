import React, { forwardRef, AnchorHTMLAttributes } from 'react';

type LinkVariant = 'primary' | 'muted' | 'ghost';
type LinkWeight = 'regular' | 'semibold';
type LinkUnderline = 'hover' | 'always' | 'none';

export interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  variant?: LinkVariant;
  weight?: LinkWeight;
  underline?: LinkUnderline;
  isExternal?: boolean;
}

const variantStyles: Record<LinkVariant, React.CSSProperties> = {
  primary: { color: '#2563eb' },
  muted: { color: '#475569' },
  ghost: { color: '#0f172a' }
};

const weightStyles: Record<LinkWeight, React.CSSProperties> = {
  regular: { fontWeight: 500 },
  semibold: { fontWeight: 600 }
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    {
      children,
      variant = 'primary',
      weight = 'regular',
      underline = 'hover',
      isExternal = false,
      style,
      ...rest
    },
    ref
  ) => {
    const underlineStyle: React.CSSProperties =
      underline === 'always'
        ? { textDecoration: 'underline' }
        : underline === 'none'
          ? { textDecoration: 'none' }
          : { textDecoration: 'none', textDecorationThickness: '2px' };

    const externalProps = isExternal
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : undefined;

    const mergedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      cursor: 'pointer',
      transition: 'color 120ms ease, text-decoration-color 120ms ease',
      textDecorationColor: '#2563eb',
      ...variantStyles[variant],
      ...weightStyles[weight],
      ...underlineStyle,
      ...style
    };

    return (
      <a ref={ref} style={mergedStyle} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }
);

Link.displayName = 'Link';


