import { Scroll } from '@ds/scroll';

export function HideOnLeave() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll barHideStrategy='leave'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 20 }, (_, i) => (
            <div key={i}>Строка {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
