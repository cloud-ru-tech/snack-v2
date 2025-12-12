import React, { forwardRef, ButtonHTMLAttributes } from 'react';
import { Button } from './Button';

export interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label?: string;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  ({ icon, children, label, ...rest }, ref) => {
    return (
      <Button
        ref={ref}
        aria-label={label}
        style={{ paddingInline: 10, minWidth: 0, gap: 6 }}
        {...rest}
      >
        {icon}
        {children}
      </Button>
    );
  }
);

IconButton.displayName = 'IconButton';




