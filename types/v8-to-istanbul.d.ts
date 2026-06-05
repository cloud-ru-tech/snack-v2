// `v8-to-istanbul` не поставляет типы и не имеет пакета `@types/*`. Объявляем
// минимальный публичный API, который используем в playwright/fixtures.ts для
// конвертации V8-coverage → istanbul-формат. См. coverage-standard.md.
declare module 'v8-to-istanbul' {
  interface IstanbulFileCoverage {
    path: string;
    [key: string]: unknown;
  }

  interface V8ToIstanbulConverter {
    load(): Promise<void>;
    applyCoverage(functions: unknown[]): void;
    toIstanbul(): Record<string, IstanbulFileCoverage>;
    destroy(): void;
  }

  export default function v8toIstanbul(
    scriptPath: string,
    wrapperLength?: number,
    sources?: { source: string; originalSource?: string; sourceMap?: unknown },
    excludePath?: (path: string) => boolean,
  ): V8ToIstanbulConverter;
}
