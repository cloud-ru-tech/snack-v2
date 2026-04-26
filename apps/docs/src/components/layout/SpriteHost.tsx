import { Sprite, SpriteProductIconsSVG, SpriteSnackIconsSVG, SpriteWebIconsSVG } from '@ds/icons';

export function SpriteHost() {
  return (
    <>
      <Sprite content={SpriteSnackIconsSVG} data-test-id='sprite-snack-icons' />
      <Sprite content={SpriteProductIconsSVG} data-test-id='sprite-product-icons' />
      <Sprite content={SpriteWebIconsSVG} data-test-id='sprite-web-icons' />
    </>
  );
}
