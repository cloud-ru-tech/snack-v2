import { Carousel } from '@ds/carousel';

export function Infinite() {
  return (
    <div style={{ width: 480 }}>
      <Carousel infiniteScroll autoSwipe={3}>
        <div style={{ height: 180, background: '#10b981', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 1
        </div>
        <div style={{ height: 180, background: '#f59e0b', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 2
        </div>
        <div style={{ height: 180, background: '#ec4899', color: '#fff', display: 'grid', placeItems: 'center' }}>
          Slide 3
        </div>
      </Carousel>
    </div>
  );
}
