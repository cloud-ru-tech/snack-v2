import { InnerLink } from '../../../../types';
import { isSubCategoryCard } from '../../../../utils/innerLink';

export type GroupBlock = { type: 'subcategory'; service: InnerLink } | { type: 'cards'; services: InnerLink[] };

/** Разбивает сервисы группы на блоки, как в макете: подкатегория — свой блок, подряд идущие карточки — общий. */
export function splitIntoBlocks(items: InnerLink[]): GroupBlock[] {
  return items.reduce<GroupBlock[]>((blocks, service) => {
    if (service.hidden) {
      return blocks;
    }

    if (isSubCategoryCard(service)) {
      return [...blocks, { type: 'subcategory', service }];
    }

    const last = blocks[blocks.length - 1];

    if (last?.type === 'cards') {
      last.services.push(service);
      return blocks;
    }

    return [...blocks, { type: 'cards', services: [service] }];
  }, []);
}
