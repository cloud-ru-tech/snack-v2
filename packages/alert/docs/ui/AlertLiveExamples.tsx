import { Alert, APPEARANCE, SIZE } from '@design-system/alert';
import cn from 'classnames';

import { ExampleItem, ExampleRow } from '#astro/components/mdx';

import styles from './styles.module.scss';

const noop = () => undefined;

export function AlertAppearanceExamples() {
  return (
    <ExampleRow gap='large' justifyContent='center' flexWrap='wrap'>
      {Object.values(APPEARANCE).map(appearance => (
        <ExampleItem label={appearance} key={appearance}>
          <Alert appearance={appearance} size={SIZE.M} title='Заголовок' description='Краткое описание' outline />
        </ExampleItem>
      ))}
    </ExampleRow>
  );
}

export function AlertWithActionsExample() {
  return (
    <div className={cn(styles.wrapper, styles.alertWithActions)}>
      <Alert
        appearance={APPEARANCE.Neutral}
        size={SIZE.M}
        title='Нужно подтвердить'
        description='Проверьте данные перед сохранением.'
        outline
        onClose={noop}
        actions={{
          primary: { label: 'Продолжить', onClick: noop },
          secondary: { label: 'Отмена', onClick: noop },
        }}
      />
    </div>
  );
}
