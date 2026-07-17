import {
  Sprite,
  SpriteExtensionsSVG,
  SpriteProductSVG,
  SpriteServicesSVG,
  SpriteSystemSVG,
  SpriteWebSVG,
} from '@ds/icons/sprite';

export function SpriteHost() {
  return (
    <>
      <Sprite content={SpriteSystemSVG} data-test-id='sprite-snack-icons' />
      <Sprite content={SpriteProductSVG} data-test-id='sprite-product-icons' />
      <Sprite content={SpriteWebSVG} data-test-id='sprite-web-icons' />
      <Sprite content={SpriteServicesSVG} data-test-id='sprite-services-icons' />
      <Sprite content={SpriteExtensionsSVG} data-test-id='sprite-extensions-icons' />
    </>
  );
}
