import React, { forwardRef, ButtonHTMLAttributes } from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isFullWidth?: boolean;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: '#2563eb',
    color: '#ffffff',
    border: '1px solid #1d4ed8'
  },
  secondary: {
    backgroundColor: '#e0e7ff',
    color: '#1e3a8a',
    border: '1px solid #c7d2fe'
  },
  ghost: {
    backgroundColor: 'transparent',
    color: '#1e293b',
    border: '1px solid #cbd5e1'
  }
};

const sizeStyles: Record<ButtonSize, React.CSSProperties> = {
  sm: { padding: '6px 12px', fontSize: '14px', borderRadius: '6px' },
  md: { padding: '8px 14px', fontSize: '15px', borderRadius: '8px' },
  lg: { padding: '12px 18px', fontSize: '16px', borderRadius: '10px' }
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      isFullWidth = false,
      style,
      children,
      ...rest
    },
    ref
  ) => {
    const mergedStyle: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px',
      fontWeight: 600,
      cursor: rest.disabled ? 'not-allowed' : 'pointer',
      opacity: rest.disabled ? 0.6 : 1,
      width: isFullWidth ? '100%' : undefined,
      transition: 'transform 120ms ease, box-shadow 120ms ease',
      boxShadow: rest.disabled ? undefined : '0 2px 8px rgba(37, 99, 235, 0.25)',
      ...variantStyles[variant],
      ...sizeStyles[size],
      ...style
    };

    return (
      <button ref={ref} style={mergedStyle} {...rest}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';




