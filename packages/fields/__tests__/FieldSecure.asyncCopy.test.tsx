/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- jsdom component regression test. */
import { act, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { FieldSecure } from '../src/components/FieldSecure/FieldSecure';
import { copyTextToClipboard } from '../src/components/shared/utils';
import { TEST_IDS } from '../src/constants';

vi.mock('../src/components/shared/utils', async importOriginal => ({
  ...(await importOriginal<typeof import('../src/components/shared/utils')>()),
  copyTextToClipboard: vi.fn(() => Promise.resolve(true)),
}));

const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

async function renderField(getter: () => Promise<string>, controlled: boolean) {
  actEnv.IS_REACT_ACT_ENVIRONMENT = true;
  const container = document.createElement('div');
  document.body.append(container);
  const root = createRoot(container);

  function Scenario() {
    const [value, setValue] = useState('********');
    return (
      <FieldSecure
        readonly
        {...(controlled ? { value, onChange: setValue } : { defaultValue: '********' })}
        asyncValueGetter={getter}
      />
    );
  }

  await act(async () => root.render(<Scenario />));

  return {
    async copy() {
      const button = container.querySelector<HTMLButtonElement>(`[data-test-id="${TEST_IDS.fieldTextCopyButton}"]`);
      expect(button).not.toBeNull();
      await act(async () => button?.click());
    },
    async cleanup() {
      await act(async () => root.unmount());
      container.remove();
    },
  };
}

describe('FieldSecure async copy', () => {
  it.each([true, false])(
    'should copy the fetched value on first and repeated clicks (controlled: %s)',
    async controlled => {
      vi.mocked(copyTextToClipboard).mockClear();
      const getter = vi.fn(() => Promise.resolve('loaded-api-key'));
      const field = await renderField(getter, controlled);
      try {
        await field.copy();
        expect(copyTextToClipboard).toHaveBeenLastCalledWith('loaded-api-key');
        await field.copy();
        expect(copyTextToClipboard).toHaveBeenNthCalledWith(2, 'loaded-api-key');
        expect(getter).toHaveBeenCalledTimes(1);
      } finally {
        await field.cleanup();
      }
    },
  );

  it('should leave the clipboard unchanged after a failed load and allow retry', async () => {
    vi.mocked(copyTextToClipboard).mockClear();
    const getter = vi
      .fn<() => Promise<string>>()
      .mockRejectedValueOnce(new Error('load failed'))
      .mockResolvedValueOnce('retried-api-key');
    const field = await renderField(getter, true);
    try {
      await field.copy();
      expect(copyTextToClipboard).not.toHaveBeenCalled();
      await field.copy();
      expect(copyTextToClipboard).toHaveBeenCalledExactlyOnceWith('retried-api-key');
    } finally {
      await field.cleanup();
    }
  });
});
