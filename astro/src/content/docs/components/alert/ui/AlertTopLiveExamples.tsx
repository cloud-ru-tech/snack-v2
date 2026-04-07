import { AlertTop, APPEARANCE, SIZE } from '@design-system/alert';
import cn from 'classnames';

import { ExampleItem, ExampleRow } from '#astro/components/mdx';

import styles from './styles.module.scss';

const noop = () => undefined;

export function AlertTopAppearanceExamples() {
  return (
    <ExampleRow gap='large' justifyContent='center' flexWrap='wrap'>
      {Object.values(APPEARANCE).map(appearance => (
        <ExampleItem label={appearance} key={appearance}>
          <div className={cn(styles.wrapper, styles.alertTopAppearanceItem)}>
            <AlertTop appearance={appearance} size={SIZE.M} title='Заголовок' description='Краткое описание' />
          </div>
        </ExampleItem>
      ))}
    </ExampleRow>
  );
}

export function AlertTopWithActionsExample() {
  return (
    <div className={cn(styles.wrapper, styles.alertTopWithActions)}>
      <AlertTop
        appearance={APPEARANCE.Neutral}
        size={SIZE.M}
        title='Сервис недоступен'
        description='Пробуем восстановить работу. Обновите страницу позже.'
        onClose={noop}
        actions={{
          primary: { label: 'Обновить', onClick: noop },
          secondary: { label: 'Статус', onClick: noop },
        }}
      />
    </div>
  );
}
