import { Carousel } from '@ds/carousel';

export function ThreePerView() {
  return (
    <div style={{ width: 600 }}>
      <Carousel showItems={3} gap='12px'>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            style={{ height: 120, background: '#f3f4f6', display: 'grid', placeItems: 'center', borderRadius: 8 }}
          >
            Card {i + 1}
          </div>
        ))}
      </Carousel>
    </div>
  );
}
