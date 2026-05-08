import { describe, expect, it } from 'vitest';

import { domainIdForPath, pkgFromPath } from '../../apps/docs/src/lib/path';

describe('pkgFromPath', () => {
  it('extracts the package slug from a component pathname', () => {
    expect(pkgFromPath('/components/button')).toBe('button');
    expect(pkgFromPath('/components/ai-suggestion')).toBe('ai-suggestion');
    expect(pkgFromPath('/components/uikit-product-copy')).toBe('uikit-product-copy');
  });

  it('extracts only the first path segment after /components/', () => {
    expect(pkgFromPath('/components/tabs/tab-bar')).toBe('tabs');
  });

  it('works with a base-prefixed pathname', () => {
    expect(pkgFromPath('/docs/components/button')).toBe('button');
  });

  it('returns undefined for non-component pathnames', () => {
    expect(pkgFromPath('/')).toBeUndefined();
    expect(pkgFromPath('/patterns/forms')).toBeUndefined();
    expect(pkgFromPath('/components/')).toBeUndefined();
    expect(pkgFromPath('')).toBeUndefined();
  });
});

describe('domainIdForPath', () => {
  it('routes prefixed packages into the matching domain', () => {
    expect(domainIdForPath('/components/ai-suggestion')).toBe('ai');
    expect(domainIdForPath('/components/uikit-product-copy')).toBe('uikit-product');
    expect(domainIdForPath('/components/admin-anything')).toBe('admin');
  });

  it('falls back to the default domain for unprefixed packages', () => {
    expect(domainIdForPath('/components/button')).toBe('components');
    expect(domainIdForPath('/components/tabs')).toBe('components');
  });

  it('returns undefined for non-component pathnames', () => {
    expect(domainIdForPath('/')).toBeUndefined();
    expect(domainIdForPath('/patterns/forms')).toBeUndefined();
  });
});
