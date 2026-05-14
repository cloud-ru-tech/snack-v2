/**
 * Docs-only стабы: React-компоненты не для рендера, а чтобы `react-docgen-typescript`
 * (через `pnpm gen:props`) подхватил структуру Options-типов императивного API
 * (`toaster.<type>.<method>`) и вытащил их в `docs/props.json`. В public API
 * пакета не реэкспортируются (`src/index.ts` их не упоминает).
 */
import { SystemEventOptions, UploadOptions, UserActionOptions } from '../types';

export function ToasterUserActionOptions(props: UserActionOptions) {
  return props.id ?? null;
}

export function ToasterSystemEventOptions(props: SystemEventOptions) {
  return props.id ?? null;
}

export function ToasterUploadOptions(props: UploadOptions) {
  return props.id ?? null;
}
