import { useKbdShortcut } from '@ds/uikit-product-kbd';

export function ShortcutText() {
  const shortcut = useKbdShortcut(['mod', 'C']);

  return <span title={`Копировать (${shortcut})`}>Копировать — {shortcut}</span>;
}
