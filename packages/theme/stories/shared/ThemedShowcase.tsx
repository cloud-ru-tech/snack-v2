import { APPEARANCE, Button, SIZE, VIEW } from '@ds/button';
import { Link } from '@ds/link';
import { Typography } from '@ds/typography';
import { ReactNode } from 'react';

import styles from './ThemedShowcase.module.scss';

export type ThemedShowcaseProps = {
  /** Подпись над кластером — например, какая ось здесь переопределена. */
  caption?: ReactNode;
  /** Стабильный id корня для play/e2e. */
  testId?: string;
};

/**
 * Кластер реальных компонентов DS, чьи цвета, фон и плотность приходят из токенов оформления
 * (`--sn-theme-color-*`). Используется в стори `@ds/theme`, чтобы смена осей
 * (colorScheme/brand/brandRole/density/acrylic) была видна на живом UI, а не на строке классов.
 */
export function ThemedShowcase({ caption, testId }: ThemedShowcaseProps) {
  return (
    <div className={styles.showcase} data-test-id={testId}>
      {caption !== undefined && (
        <Typography variant='body' size='s' as='div' className={styles.caption}>
          {caption}
        </Typography>
      )}
      <div className={styles.row}>
        <Button appearance={APPEARANCE.Primary} view={VIEW.Filled} size={SIZE.M} label='Основное' />
        <Button appearance={APPEARANCE.Primary} view={VIEW.Tonal} size={SIZE.M} label='Tonal' />
        <Button appearance={APPEARANCE.Primary} view={VIEW.Outline} size={SIZE.M} label='Outline' />
      </div>
      <div className={styles.row}>
        <Button appearance={APPEARANCE.Neutral} view={VIEW.Filled} size={SIZE.M} label='Нейтральная' />
        <Button appearance={APPEARANCE.Critical} view={VIEW.Filled} size={SIZE.M} label='Удалить' />
        <Link appearance='primary' label='Ссылка с акцентом' href='#' />
      </div>
    </div>
  );
}
