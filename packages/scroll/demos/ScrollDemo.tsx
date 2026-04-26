import { Scroll } from '@ds/scroll';

export function ScrollDemo() {
  return (
    <div style={{ height: 220, width: '100%', maxWidth: 420 }}>
      <Scroll size='m' barHideStrategy='never'>
        <div style={{ padding: 12, display: 'grid', gap: 8 }}>
          {Array.from({ length: 25 }, (_, i) => (
            <div key={i}>Элемент списка {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
