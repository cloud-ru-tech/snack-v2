import { Kbd, KbdShortcut } from '@ds/uikit-product-kbd';

export function SearchHints() {
  return (
    <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
      <span>
        <KbdShortcut keys={['mod', '/']} /> открыть поиск
      </span>
      <span>
        <Kbd keyName='up' /> <Kbd keyName='down' /> выбрать результат
      </span>
      <span>
        <Kbd keyName='enter' /> перейти
      </span>
      <span>
        <Kbd keyName='esc' /> закрыть
      </span>
    </div>
  );
}
