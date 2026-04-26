import { Carousel } from '@ds/carousel';

export function Basic() {
  return (
    <div style={{ width: 480 }}>
      <Carousel>
        <div style={{ height: 180, background: '#4f46e5', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 1
        </div>
        <div style={{ height: 180, background: '#0ea5e9', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 2
        </div>
      </Carousel>
    </div>
  );
}
