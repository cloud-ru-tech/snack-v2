import { Scroll } from '@ds/scroll';

export function Resizable() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll resize='both'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Контент, который можно ресайзить — {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
