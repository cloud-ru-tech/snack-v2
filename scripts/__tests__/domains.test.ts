import { describe, expect, it } from 'vitest';

import { DOMAINS, resolveDomain } from '../../apps/docs/src/config/domains';

describe('domain config', () => {
  it('exposes a default domain that catches everything else', () => {
    const defaults = DOMAINS.filter(d => d.isDefault);
    expect(defaults).toHaveLength(1);
    expect(defaults[0].prefix).toBeUndefined();
  });

  it('all non-default domains declare a prefix', () => {
    for (const d of DOMAINS.filter(d => !d.isDefault)) {
      expect(d.prefix).toBeTruthy();
      expect(d.prefix?.endsWith('-')).toBe(true);
    }
  });
});

describe('resolveDomain', () => {
  it('routes a uikit-product-* package into the uikit-product domain', () => {
    expect(resolveDomain('uikit-product-copy').id).toBe('uikit-product');
    expect(resolveDomain('uikit-product-info-row').id).toBe('uikit-product');
  });

  it('routes an ai-* package into the ai domain', () => {
    expect(resolveDomain('ai-suggestion').id).toBe('ai');
  });

  it('routes an admin-* package into the admin domain', () => {
    expect(resolveDomain('admin-anything').id).toBe('admin');
  });

  it('falls back to the default domain when no prefix matches', () => {
    expect(resolveDomain('button').id).toBe('components');
    expect(resolveDomain('tabs').id).toBe('components');
    expect(resolveDomain('').id).toBe('components');
  });
});
