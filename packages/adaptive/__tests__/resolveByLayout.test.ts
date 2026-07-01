import { describe, expect, it } from 'vitest';

import { LAYOUT_TYPE } from '../src/types/layoutTypes';
import { LayoutPresets } from '../src/types/presets';
import { mergePresets, resolveByLayout } from '../src/utils/resolveByLayout';

type Props = {
  truncate?: { title: number };
  collapsible?: boolean;
  size?: string;
};

const BASE: Props = { truncate: { title: 1 }, collapsible: false, size: 'm' };
const PRESETS: LayoutPresets<Props> = { mobile: { truncate: { title: 2 }, collapsible: true } };

describe('resolveByLayout (desktop-first: preset[layout] > explicit > base)', () => {
  it('returns base on desktop (empty preset tier)', () => {
    expect(resolveByLayout({ layoutType: LAYOUT_TYPE.Desktop, base: BASE, presets: PRESETS, explicit: {} })).toEqual(
      BASE,
    );
  });

  it('applies the mobile preset on mobile', () => {
    expect(resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base: BASE, presets: PRESETS, explicit: {} })).toEqual({
      truncate: { title: 2 },
      collapsible: true,
      size: 'm',
    });
  });

  it('defaults to desktop when layoutType is undefined', () => {
    expect(resolveByLayout({ layoutType: undefined, base: BASE, presets: PRESETS, explicit: {} })).toEqual(BASE);
  });

  it('explicit prop sets the desktop value but the mobile preset still wins (desktop-first)', () => {
    const explicit: Partial<Props> = { collapsible: false, truncate: { title: 5 } };

    // desktop: no preset → explicit wins over base
    expect(resolveByLayout({ layoutType: LAYOUT_TYPE.Desktop, base: BASE, presets: PRESETS, explicit })).toEqual({
      truncate: { title: 5 },
      collapsible: false,
      size: 'm',
    });

    // mobile: preset wins over the (desktop-intended) explicit prop → mobile behaviour not clobbered
    expect(resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base: BASE, presets: PRESETS, explicit })).toEqual({
      truncate: { title: 2 },
      collapsible: true,
      size: 'm',
    });
  });

  it('explicit prop applies on layouts that have no preset (tablet / desktopSmall)', () => {
    const explicit: Partial<Props> = { collapsible: true };
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.Tablet, base: BASE, presets: PRESETS, explicit }).collapsible,
    ).toBe(true);
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.DesktopSmall, base: BASE, presets: PRESETS, explicit }).collapsible,
    ).toBe(true);
  });

  it('layoutPresets[mobile] overrides the mobile preset explicitly (the only way to change mobile)', () => {
    const merged = mergePresets<Props>(PRESETS, { mobile: { collapsible: false } });
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base: BASE, presets: merged, explicit: { collapsible: true } })
        .collapsible,
    ).toBe(false);
  });

  it('ignores undefined explicit keys (does not override preset/base)', () => {
    const explicit: Partial<Props> = { collapsible: undefined };
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base: BASE, presets: PRESETS, explicit }).collapsible,
    ).toBe(true);
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.Desktop, base: BASE, presets: PRESETS, explicit }).collapsible,
    ).toBe(false);
  });

  it('does not mutate the base object', () => {
    const base = { ...BASE };
    resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base, presets: PRESETS, explicit: { size: 'x' } });
    expect(base).toEqual(BASE);
  });
});

describe('mergePresets', () => {
  it('merges keys within a tier, later argument wins', () => {
    const merged = mergePresets<Props>(
      { mobile: { truncate: { title: 2 }, collapsible: true } },
      { mobile: { collapsible: false } },
    );
    expect(merged).toEqual({ mobile: { truncate: { title: 2 }, collapsible: false } });
  });

  it('skips undefined arguments', () => {
    const merged = mergePresets<Props>(PRESETS, undefined);
    expect(merged).toEqual(PRESETS);
  });

  it('keeps distinct tiers', () => {
    const merged = mergePresets<Props>({ mobile: { collapsible: true } }, { tablet: { size: 's' } });
    expect(merged).toEqual({ mobile: { collapsible: true }, tablet: { size: 's' } });
  });

  it('instance layoutPresets win over DS presets within the same tier', () => {
    const ds: LayoutPresets<Props> = { mobile: { collapsible: true } };
    const instance: LayoutPresets<Props> = { mobile: { collapsible: false } };
    expect(
      resolveByLayout({ layoutType: LAYOUT_TYPE.Mobile, base: BASE, presets: mergePresets(ds, instance), explicit: {} })
        .collapsible,
    ).toBe(false);
  });
});
