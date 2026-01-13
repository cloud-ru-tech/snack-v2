# Быстрый старт: Генерация llms.txt файлов

## Минимальная настройка (5 минут)

### 1. Установка

```bash
pnpm add -D starlight-llms-txt
```

### 2. Создайте интеграцию

Создайте `src/integrations/fixLlmsEncoding.ts`:

```typescript
import type { AstroIntegration } from 'astro';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default function fixLlmsEncoding(): AstroIntegration {
  return {
    name: 'fix-llms-encoding',
    hooks: {
      'astro:build:done': async ({ dir }) => {
        const distPath = dir.pathname;
        const llmsFiles = [
          'llms-full.txt',
          'llms-coding.txt',
          'llms-devflow.txt',
          'llms.txt',
          'llms-small.txt',
          '_llms-txt/llms-coding.txt',
          '_llms-txt/llms-devflow.txt',
        ];

        for (const fileName of llmsFiles) {
          const filePath = join(distPath, fileName);
          if (!existsSync(filePath)) continue;
          
          const content = readFileSync(filePath, 'utf-8');
          const normalizedContent = content
            .replace(/^\uFEFF/, '')
            .replace(/\r\n/g, '\n')
            .replace(/\r/g, '\n');
          
          writeFileSync(filePath, '\uFEFF' + normalizedContent, { encoding: 'utf8' });
        }
      },
    },
  };
}
```

### 3. Обновите astro.config.mjs

```javascript
import starlightLlmsTxt from "starlight-llms-txt";
import fixLlmsEncoding from "./src/integrations/fixLlmsEncoding.js";

export default defineConfig({
  integrations: [
    fixLlmsEncoding(),
    starlight({
      plugins: [
        starlightLlmsTxt({
          projectName: "Ваш проект",
          rawContent: true,
        }),
      ],
    }),
  ],
});
```

### 4. Соберите проект

```bash
pnpm build
```

Файлы появятся в `dist/llms.txt`, `dist/llms-full.txt`, `dist/llms-small.txt`.

## Расширенная настройка с кастомными наборами

```javascript
starlightLlmsTxt({
  projectName: "Ваш проект",
  exclude: ["design/**"], // Исключить страницы
  rawContent: true,
  customSets: [
    {
      label: "coding", // Создаст llms-coding.txt
      paths: ["global/code-style/**", "global/i18n/**"],
    },
    {
      label: "devflow", // Создаст llms-devflow.txt
      paths: ["global/ci-cd/**", "global/git-flow/**"],
    },
  ],
}),
```

## Что дальше?

См. полную инструкцию в [LLMS_TXT_SETUP_GUIDE.md](./LLMS_TXT_SETUP_GUIDE.md)
