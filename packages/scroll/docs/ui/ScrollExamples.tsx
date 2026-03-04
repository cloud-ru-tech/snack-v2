import { AUTOSCROLL_TO, BAR_HIDE_STRATEGY, RESIZE, Scroll } from '@design-system/scroll';
import type { CSSProperties } from 'react';

const scrollWrapperStyle: CSSProperties = {
  width: '100%',
  height: 200,
  minHeight: 200,
  overflow: 'hidden',
};

const scrollWrapperStyleSmall: CSSProperties = {
  width: '100%',
  height: 140,
  minHeight: 140,
  overflow: 'hidden',
};

const scrollWrapperStyleResize: CSSProperties = {
  width: '100%',
  height: 220,
  minHeight: 220,
  overflow: 'hidden',
};

export function ScrollBasicExample() {
  return (
    <div style={scrollWrapperStyle}>
      <Scroll barHideStrategy={BAR_HIDE_STRATEGY.Never}>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i}>Line {i + 1}. Long content to trigger vertical scroll.</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export function ScrollBarHideNeverExample() {
  return (
    <div style={scrollWrapperStyleSmall}>
      <Scroll barHideStrategy={BAR_HIDE_STRATEGY.Never}>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Line {i + 1}. Scrollbars always visible.</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export function ScrollBarHideScrollExample() {
  return (
    <div style={scrollWrapperStyleSmall}>
      <Scroll barHideStrategy={BAR_HIDE_STRATEGY.Scroll}>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 10 }, (_, i) => (
            <div key={i}>Line {i + 1}. Visible only while scrolling.</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export function ScrollAutoscrollToBottomExample() {
  return (
    <div style={scrollWrapperStyle}>
      <Scroll barHideStrategy={BAR_HIDE_STRATEGY.Never} autoscrollTo={AUTOSCROLL_TO.Bottom}>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>
              [12:00:{String(i).padStart(2, '0')}] Log entry {i + 1}
            </div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}

export function ScrollResizeExample() {
  return (
    <div style={scrollWrapperStyleResize}>
      <Scroll barHideStrategy={BAR_HIDE_STRATEGY.Never} resize={RESIZE.Both}>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Line {i + 1}. Resizable content. Drag the corner to resize the scroll area.</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
