import { Scroll } from '@ds/scroll';

export function AutoscrollBottom() {
  return (
    <div style={{ height: 200, width: 320 }}>
      <Scroll autoscrollTo='bottom'>
        <div style={{ padding: 8 }}>
          {Array.from({ length: 40 }, (_, i) => (
            <div key={i}>Сообщение {i + 1}</div>
          ))}
        </div>
      </Scroll>
    </div>
  );
}
