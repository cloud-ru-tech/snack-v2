import { GroupItemRenderProps, ItemRenderProps } from '@ds/list';

import { ListItemCustom } from './helperComponents/ListItemCustom';
import { ListItemGroupCustom } from './helperComponents/ListItemGroupCustom';

/** Стабильные рендеры для `itemRender` / `groupItemRender` у `List`/`Droplist`. */
export function renderListItemCustom(props: ItemRenderProps) {
  return <ListItemCustom {...props} />;
}

export function renderListItemGroupCustom(props: GroupItemRenderProps) {
  return <ListItemGroupCustom {...props} />;
}
