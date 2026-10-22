import { CloseSVG } from '@ds/icons/interface/product';
import { PlaceholderSVG } from '@ds/icons/interface/system';
import { Tooltip } from '@ds/tooltip';
import { NodeViewProps, NodeViewWrapper } from '@tiptap/react';
import { MouseEvent, useCallback } from 'react';

import { SEGMENT_TYPE, TEST_IDS } from '../../constants';
import { getChipMetaKey, NODE_NAME } from '../../utils';
import { useEditorViewContext } from './context';
import styles from './styles.module.scss';

/** Задержка подсказки чипа (ISM-6.3). */
const TOOLTIP_DELAY = 300;

export function ChipView({ node, deleteNode, editor, selected }: NodeViewProps) {
  const { chips, removeLabel } = useEditorViewContext();
  const type = node.type.name === NODE_NAME.Skill ? SEGMENT_TYPE.Skill : SEGMENT_TYPE.Mention;
  const meta = chips.get(getChipMetaKey(type, String(node.attrs.id)));

  const handleRemove = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      deleteNode();
      editor.commands.focus();
    },
    [deleteNode, editor],
  );

  const body = (
    <span
      className={styles.chipBody}
      contentEditable={false}
      data-pressed={selected ? 'true' : undefined}
      data-test-id={TEST_IDS.chip}
    >
      <span className={styles.stateLayer} data-state='emptyNeutralOnBackground' aria-hidden />
      <span className={styles.chipIcon} aria-hidden>
        {meta?.icon ?? <PlaceholderSVG size={16} />}
      </span>
      {editor.isEditable && (
        <button
          type='button'
          tabIndex={-1}
          className={styles.chipRemove}
          aria-label={removeLabel}
          data-test-id={TEST_IDS.chipRemove}
          onMouseDown={handleRemove}
        >
          <CloseSVG size={16} />
        </button>
      )}
      <span className={styles.chipLabel}>{String(node.attrs.label)}</span>
    </span>
  );

  return (
    <NodeViewWrapper as='span' className={styles.chip} data-type={type}>
      {meta?.tooltip ? (
        <Tooltip tip={meta.tooltip} hoverDelayOpen={TOOLTIP_DELAY} disableSpanWrapper>
          {body}
        </Tooltip>
      ) : (
        body
      )}
    </NodeViewWrapper>
  );
}
