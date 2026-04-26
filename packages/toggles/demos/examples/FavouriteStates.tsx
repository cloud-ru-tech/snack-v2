import { Favourite } from '@ds/toggles';

export function FavouriteStates() {
  return (
    <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
      <Favourite icon='star' />
      <Favourite icon='star' defaultChecked />
      <Favourite icon='heart' disabled />
      <Favourite icon='heart' loading />
    </div>
  );
}
