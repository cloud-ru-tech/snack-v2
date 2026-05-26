import { extractSupportProps } from '@ds/utils';
import cn from 'classnames';
import { useMemo } from 'react';
import ReactMarkdown, { Components } from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import remarkGfm from 'remark-gfm';

import { TEST_IDS } from '../../constants';
import syntaxStyles from '../../styles/syntax.module.scss';
import { MarkdownProps } from '../../types';
import { CodeBlock } from './CodeBlock';
import styles from './styles.module.scss';

export function Markdown({
  value,
  remarkPlugins,
  rehypePlugins,
  components,
  skipHtml = true,
  onCodeCopyClick,
  className,
  'data-test-id': dataTestId = TEST_IDS.viewer,
  ...rest
}: MarkdownProps) {
  const supportProps = extractSupportProps(rest);

  const mergedComponents = useMemo<Components>(
    () => ({
      pre: ({ children }) => <CodeBlock onCopyClick={onCodeCopyClick}>{children}</CodeBlock>,
      ...components,
    }),
    [components, onCodeCopyClick],
  );

  return (
    <div {...supportProps} className={cn(styles.root, syntaxStyles.syntax, className)} data-test-id={dataTestId}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, ...(remarkPlugins ?? [])]}
        rehypePlugins={[[rehypeHighlight, { detect: true }], ...(rehypePlugins ?? [])]}
        skipHtml={skipHtml}
        components={mergedComponents}
      >
        {value}
      </ReactMarkdown>
    </div>
  );
}
