import { Accordion } from '@design-system/accordion';

export function AccordionBasicExample() {
  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <Accordion>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <Accordion.CollapseBlockPrimary id='doc-block-1' title='Первая секция'>
            Контент первой секции.
          </Accordion.CollapseBlockPrimary>
          <Accordion.CollapseBlockPrimary id='doc-block-2' title='Вторая секция'>
            Контент второй секции.
          </Accordion.CollapseBlockPrimary>
        </div>
      </Accordion>
    </div>
  );
}
