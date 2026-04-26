import { Scroll } from '@ds/scroll';

export function Basic() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Строка контента {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
