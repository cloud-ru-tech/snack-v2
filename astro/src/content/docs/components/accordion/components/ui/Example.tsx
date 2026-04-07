import { Accordion } from '@design-system/accordion';

export function ExamplePrimary() {
  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <Accordion>
        <Accordion.CollapseBlockPrimary
          view='outline'
          id='cb-primary-1'
          title='Заголовок Primary'
          subTitle='Подзаголовок'
        >
          Содержимое секции.
        </Accordion.CollapseBlockPrimary>
      </Accordion>
    </div>
  );
}

export function ExampleSecondary() {
  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <Accordion>
        <Accordion.CollapseBlockSecondary view='outline' id='cb-secondary-1' title='Заголовок Secondary'>
          Содержимое секции.
        </Accordion.CollapseBlockSecondary>
      </Accordion>
    </div>
  );
}

export function ExampleTertiary() {
  return (
    <div style={{ maxWidth: 480, width: '100%' }}>
      <Accordion>
        <Accordion.CollapseBlockTertiary id='cb-tertiary-1' title='Заголовок Tertiary'>
          Содержимое секции.
        </Accordion.CollapseBlockTertiary>
      </Accordion>
    </div>
  );
}
