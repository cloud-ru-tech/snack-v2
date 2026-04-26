import { Favourite } from '@ds/toggles';

export function FavouriteStates() {
  return (
    <>
      <Favourite icon='star' />
      <Favourite icon='star' defaultChecked />
      <Favourite icon='heart' disabled />
      <Favourite icon='heart' loading />
    </>
  );
}
