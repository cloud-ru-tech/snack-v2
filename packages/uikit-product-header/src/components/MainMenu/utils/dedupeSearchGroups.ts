import { LinksGroup } from '../types';

/**
 * Один и тот же сервис может быть представлен в разных сегментах с разной
 * детализацией — например, простой карточкой в общем каталоге и раскрытой
 * аккордеоном карточкой с вложенными сервисами в «Центре управления». Обе
 * версии используют общий {@link InnerLink.id}.
 *
 * При поиске результаты сегментов объединяются в один список (см.
 * {@link MainMenuProps.segments}), поэтому такой сервис может совпасть сразу в
 * нескольких сегментах. Функция оставляет только первое по порядку `groups`
 * (то есть по приоритету сегментов) вхождение каждого id, а группы, опустевшие
 * после удаления дублей, убирает целиком — иначе группа с тем же заголовком
 * задублируется в выдаче.
 */
export function dedupeSearchGroups(groups: LinksGroup[]): LinksGroup[] {
  const seenItemIds = new Set<string>();

  return groups.reduce<LinksGroup[]>((acc, group) => {
    const items = group.items.filter(item => {
      if (seenItemIds.has(item.id)) {
        return false;
      }

      seenItemIds.add(item.id);
      return true;
    });

    if (items.length > 0) {
      acc.push({ ...group, items });
    }

    return acc;
  }, []);
}
