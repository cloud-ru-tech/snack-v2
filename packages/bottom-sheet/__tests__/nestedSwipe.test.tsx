/* eslint-disable @cloud-ru/ssr-safe-react/domApi -- jsdom regression test. */
import { act } from 'react';
import { createPortal } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { describe, expect, it, vi } from 'vitest';

import { useDragEngine } from '../src/components/BottomSheetCustom/hooks/useDragEngine';

const actEnv = globalThis as { IS_REACT_ACT_ENVIRONMENT?: boolean };

function dispatchPointer(target: EventTarget | null, type: string, y: number) {
  const event = new Event(type, { bubbles: true, cancelable: true });
  Object.defineProperties(event, {
    pointerId: { value: 1 },
    pointerType: { value: 'touch' },
    isPrimary: { value: true },
    clientY: { value: y },
    button: { value: 0 },
  });
  target?.dispatchEvent(event);
}

describe('nested bottom-sheet swipe', () => {
  it('should close only the panel that owns the gesture through a nested portal', async () => {
    actEnv.IS_REACT_ACT_ENVIRONMENT = true;
    const container = document.createElement('div');
    const portal = document.createElement('div');
    document.body.append(container, portal);
    const root = createRoot(container);
    const closeParent = vi.fn();
    const closeChild = vi.fn();

    function Child() {
      const { setContentNode, dragHandlers } = useDragEngine({
        isActive: true,
        swipeEnabled: true,
        onClose: closeChild,
      });
      return createPortal(<div ref={setContentNode} {...dragHandlers} data-child />, portal);
    }

    function Parent() {
      const { setContentNode, dragHandlers } = useDragEngine({
        isActive: true,
        swipeEnabled: true,
        onClose: closeParent,
      });
      return (
        <div ref={setContentNode} {...dragHandlers} data-parent>
          <Child />
        </div>
      );
    }

    try {
      await act(async () => root.render(<Parent />));
      const child = portal.querySelector('[data-child]');
      expect(child).not.toBeNull();
      await act(async () => {
        dispatchPointer(child, 'pointerdown', 0);
        dispatchPointer(document, 'pointermove', 200);
        dispatchPointer(document, 'pointerup', 200);
      });
      expect(closeChild).toHaveBeenCalledOnce();
      expect(closeParent).not.toHaveBeenCalled();

      const parent = container.querySelector('[data-parent]');
      await act(async () => {
        dispatchPointer(parent, 'pointerdown', 0);
        dispatchPointer(document, 'pointermove', 200);
        dispatchPointer(document, 'pointerup', 200);
      });
      expect(closeParent).toHaveBeenCalledOnce();
    } finally {
      await act(async () => root.unmount());
      container.remove();
      portal.remove();
    }
  });
});
