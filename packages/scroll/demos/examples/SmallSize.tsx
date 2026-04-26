import { Scroll } from '@ds/scroll';

export function SmallSize() {
  return (
    <div style={{ height: 180, width: 280 }}>
      <Scroll size='s'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 15 }, (_, i) => (
            <div key={i}>Пункт {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
