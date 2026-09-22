import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';

import { ChildThemeProvider } from '../src/components/ChildThemeProvider';
import { RootThemeProvider } from '../src/components/RootThemeProvider';

function classLists(html: string): string[] {
  return [...html.matchAll(/class="([^"]+)"/g)].map(match => match[1] ?? '');
}

describe('платформа в провайдерах', () => {
  it('без значения эмитится sn-webDesktop', () => {
    const [root] = classLists(renderToStaticMarkup(h(RootThemeProvider, { value: {}, children: 'content' })));

    expect(root).toContain('sn-webDesktop');
  });

  it('ChildThemeProvider наследует платформу родителя и переопределяет её явным значением', () => {
    const html = renderToStaticMarkup(
      h(RootThemeProvider, {
        value: { platform: 'webMobile', density: 'comfort' },
        children: [
          h(ChildThemeProvider, { key: 'inherited', value: { brand: 'snackUI' }, children: 'inherited' }),
          h(ChildThemeProvider, { key: 'override', value: { platform: 'webDesktop' }, children: 'override' }),
        ],
      }),
    );

    const [root, inherited, override] = classLists(html);

    expect(root).toContain('sn-webMobile');
    expect(inherited).toContain('sn-webMobile');
    expect(inherited).toContain('sn-comfort');
    expect(override).toContain('sn-webDesktop');
    expect(override).not.toContain('sn-webMobile');
  });
});
