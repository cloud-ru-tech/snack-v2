import { Button } from '@ds/button';
import { CheckSVG, CopySVG } from '@ds/icons/interface/system';
import { Scroll } from '@ds/scroll';
import cn from 'classnames';
import { Children, isValidElement, ReactNode, useRef, useState } from 'react';

import { copyToClipboard } from '@cloud-ru/ft-copy-to-clipboard';

import { TEST_IDS } from '../../constants';
import { markdownLocale } from '../../locale';
import styles from './styles.module.scss';

const LANGUAGE_PATTERN = /language-([\w-]+)/;
const COPIED_RESET_MS = 1600;

/** Рекурсивно собирает текстовое содержимое узла — для копирования и подсчёта строк. */
function extractText(node: ReactNode): string {
  if (node === null || node === undefined || typeof node === 'boolean') return '';
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (Array.isArray(node)) return node.map(extractText).join('');
  if (isValidElement<{ children?: ReactNode }>(node)) return extractText(node.props.children);
  return '';
}

type CodeBlockProps = {
  /** `<code>`-элемент с подсветкой, который react-markdown передаёт внутрь `pre`. */
  children: ReactNode;
  /** Колбэк на копирование. Получает сырой код блока. */
  onCopyClick?(code: string): void;
};

export function CodeBlock({ children, onCopyClick }: CodeBlockProps) {
  const { t } = markdownLocale.useTranslations();
  const [copied, setCopied] = useState(false);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const codeElement = Children.toArray(children).find(child => isValidElement(child));
  const codeProps = isValidElement<{ className?: string; children?: ReactNode }>(codeElement)
    ? codeElement.props
    : { className: '', children };

  const className = codeProps.className ?? '';
  const codeChildren = codeProps.children;

  const language = LANGUAGE_PATTERN.exec(className)?.[1];
  const raw = extractText(codeChildren).replace(/\n$/, '');
  const lineCount = raw.length === 0 ? 1 : raw.split('\n').length;

  const markCopied = () => {
    setCopied(true);
    if (resetTimer.current) clearTimeout(resetTimer.current);
    resetTimer.current = setTimeout(() => setCopied(false), COPIED_RESET_MS);
  };

  const handleCopy = () => {
    onCopyClick?.(raw);
    // copy-to-clipboard синхронен и работает в insecure-context (execCommand-фолбэк).
    copyToClipboard(raw);
    markCopied();
  };

  return (
    <div className={styles.codeBlock}>
      <div className={styles.codeHeader}>
        <span className={styles.codeLang}>{language ?? 'text'}</span>
        <Button
          view='function'
          appearance='neutral'
          size='m'
          icon={copied ? <CheckSVG /> : <CopySVG />}
          className={styles.codeCopy}
          data-test-id={TEST_IDS.viewerCodeCopy}
          data-copied={copied || undefined}
          aria-label={copied ? t('copied') : t('copy')}
          onClick={handleCopy}
        />
      </div>
      <div className={styles.codeBody}>
        <span className={styles.codeGutter} aria-hidden='true'>
          {Array.from({ length: lineCount }, (_, i) => (
            <span key={i} className={styles.codeLineNo}>
              {i + 1}
            </span>
          ))}
        </span>
        {/* Горизонтальный скролл длинных строк кода — через @ds/scroll вместо нативного overflow.
            Вертикаль скрыта: блок растёт по высоте вместе с нумерацией строк. */}
        <Scroll className={styles.codeScroll} overflow={{ y: 'hidden' }}>
          <pre className={styles.codePre}>
            <code className={cn(styles.codeContent, className)}>{codeChildren}</code>
          </pre>
        </Scroll>
      </div>
    </div>
  );
}
