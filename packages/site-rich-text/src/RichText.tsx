import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';

import { RICH_TEXT_TAG } from './constants';
import styles from './styles.module.scss';
import { RichTextProps } from './types';
import { sanitizeRichText } from './utils';

export function RichText({ content = '', tag: Tag = RICH_TEXT_TAG.Div, className, ...rest }: RichTextProps) {
  const html = useMemo(() => (typeof content === 'string' ? sanitizeRichText(content) : undefined), [content]);

  return (
    <Tag
      className={cn(styles.richText, className)}
      {...(html === undefined ? { children: content } : { dangerouslySetInnerHTML: { __html: html } })}
      {...extractSupportProps(rest)}
    />
  );
}
