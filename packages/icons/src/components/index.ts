export * as ProductIcons from './product-icons';
export * from './snack-icons';
export * as WebIcons from './web-icons';

// TODO: сделать отдельный экспорт для всех иконок без неймспейса и посмотреть наличие дублей
// product x snack: LinkSVG, LinkSpriteSVG
// web x snack: TableSVG, TableSpriteSVG
// product x web: CpuSVG, DataSVG, ExitSVG (+ их *SpriteSVG)
export { DotSmallSVG, DecorCheckedSVG, DecorCheckedSpriteSVG } from './product-icons';
