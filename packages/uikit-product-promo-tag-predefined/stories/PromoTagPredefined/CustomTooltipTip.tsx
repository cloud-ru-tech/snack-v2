import { Link } from '@ds/link';
import { Typography } from '@ds/typography';
import { MouseEvent } from 'react';

import { CUSTOM_TOOLTIP_CONTENT } from '../constants';
import styles from './styles.module.scss';

type CustomTooltipTipProps = {
  /** Текст над ссылкой; по умолчанию — Figma slot placeholder */
  text?: string;
  onLinkClick?(e: MouseEvent): void;
};

/** Кастомный tip как в Figma: многострочный текст + Link. */
export function CustomTooltipTip({ text = CUSTOM_TOOLTIP_CONTENT, onLinkClick }: CustomTooltipTipProps) {
  return (
    <>
      <Typography className={styles.customTipText} variant='body' size='s'>
        {text}
      </Typography>
      <Link
        className={styles.supportLink}
        underlined
        insideText
        appearance='invertNeutral'
        label='Link text'
        onClick={onLinkClick ?? ((e: MouseEvent) => e.preventDefault())}
      />
    </>
  );
}
