import { extractSupportProps, WithSupportProps } from '@ds/utils';

import { Color, RgbaColor, Size } from '../../types';
import { FieldPrivate } from '../FieldPrivate';

export type FieldAlphaColorProps = WithSupportProps<{
  rgba: RgbaColor;
  onChange(color: Color): void;
  size?: Size;
}>;

export function FieldAlphaColor({ onChange, rgba, size, 'aria-label': ariaLabel, ...rest }: FieldAlphaColorProps) {
  const handleChange = (a: string = '0') => {
    const clamped = Math.min(100, Math.max(0, Number(a) || 0));
    onChange({ ...rgba, a: clamped / 100 });
  };

  return (
    <FieldPrivate
      value={Math.round(rgba.a * 100)}
      onChange={handleChange}
      inputType='number'
      min={0}
      max={100}
      size={size}
      aria-label={ariaLabel}
      {...extractSupportProps(rest)}
    />
  );
}
