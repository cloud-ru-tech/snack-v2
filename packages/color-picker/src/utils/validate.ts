const matcher = /^#?([0-9A-F]{3,8})$/i;

export const isHexValid = (value: string, alpha?: boolean): boolean => {
  const match = matcher.exec(value);
  const length = match ? match[1].length : 0;

  return length === 3 || length === 6 || (Boolean(alpha) && length === 4) || (Boolean(alpha) && length === 8);
};
