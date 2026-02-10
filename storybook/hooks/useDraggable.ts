import { PointerEvent, RefObject, useCallback, useEffect, useRef, useState } from 'react';

type DragPosition = {
  left: number;
  top: number;
};

type useDraggableProps = {
  isDraggable: boolean;
  wrapperRef: RefObject<HTMLElement | null>;
  draggableElementRef: RefObject<HTMLElement | null>;
};

export function useDraggable({ isDraggable, wrapperRef, draggableElementRef }: useDraggableProps) {
  const [position, setPosition] = useState<DragPosition | null>(null);
  const dragStateRef = useRef<{
    startX: number;
    startY: number;
    startLeft: number;
    startTop: number;
  } | null>(null);

  useEffect(() => {
    if (!isDraggable || !wrapperRef.current || !draggableElementRef.current) {
      setPosition(null);
      return;
    }
    const wrapper = wrapperRef.current.getBoundingClientRect();
    const block = draggableElementRef.current.getBoundingClientRect();
    setPosition({
      left: (wrapper.width - block.width) / 2,
      top: (wrapper.height - block.height) / 2,
    });
  }, [draggableElementRef, isDraggable, wrapperRef]);

  const clampPosition = useCallback(
    (left: number, top: number): DragPosition => {
      if (!wrapperRef.current || !draggableElementRef.current) return { left, top };
      const wrapper = wrapperRef.current.getBoundingClientRect();
      const block = draggableElementRef.current.getBoundingClientRect();
      return {
        left: Math.max(0, Math.min(wrapper.width - block.width, left)),
        top: Math.max(0, Math.min(wrapper.height - block.height, top)),
      };
    },
    [draggableElementRef, wrapperRef],
  );

  const handlePointerDown = useCallback(
    (e: PointerEvent) => {
      if (!isDraggable || position === null) return;
      e.preventDefault();
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
      dragStateRef.current = {
        startX: e.clientX,
        startY: e.clientY,
        startLeft: position.left,
        startTop: position.top,
      };
    },
    [isDraggable, position],
  );

  const handlePointerMove = useCallback(
    (e: PointerEvent) => {
      const state = dragStateRef.current;
      if (!state || !isDraggable) return;
      const deltaX = e.clientX - state.startX;
      const deltaY = e.clientY - state.startY;
      setPosition(clampPosition(state.startLeft + deltaX, state.startTop + deltaY));
    },
    [isDraggable, clampPosition],
  );

  const handlePointerUp = useCallback((e: PointerEvent) => {
    (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    dragStateRef.current = null;
  }, []);

  return {
    position,
    handlePointerDown,
    handlePointerMove,
    handlePointerUp,
  };
}
