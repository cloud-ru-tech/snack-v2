import { Breadcrumbs } from '@design-system/breadcrumbs';
import { PlaceholderSVG } from '@design-system/icons';

/** Для `client:load`: иконка в `items` не сериализуется из MDX — держим данные внутри модуля острова. */
export function BreadcrumbsWithFirstItemIconExample() {
  return (
    <Breadcrumbs
      firstItemIconOnly
      items={[
        { id: '1', label: 'Главная', href: '#', icon: PlaceholderSVG },
        { id: '2', label: 'Проекты', href: '#' },
        { id: '3', label: 'Сводка' },
      ]}
    />
  );
}
