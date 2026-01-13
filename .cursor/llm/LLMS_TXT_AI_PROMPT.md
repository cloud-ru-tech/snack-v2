# Промпт для AI-агента: Настройка генерации llms.txt

Используйте этот промпт для автоматической настройки генерации llms.txt файлов в другом репозитории через AI-агента.

---

## Промпт

```
Настрой генерацию llms.txt файлов для проекта на Astro + Starlight по следующей инструкции:

1. Установи пакет starlight-llms-txt версии 0.6.0 в devDependencies

2. Создай файл src/integrations/fixLlmsEncoding.ts со следующим содержимым:

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

        console.log(`[fix-llms-encoding] Checking files in ${distPath}`);
        
        for (const fileName of llmsFiles) {
          const filePath = join(distPath, fileName);
          try {
            if (!existsSync(filePath)) {
              continue;
            }
            
            // Read file as UTF-8
            const content = readFileSync(filePath, 'utf-8');
            
            // Normalize line endings and ensure UTF-8 encoding
            // Add BOM for explicit UTF-8 marking
            const normalizedContent = content
              .replace(/^\uFEFF/, '') // Remove BOM if present
              .replace(/\r\n/g, '\n') // Normalize line endings
              .replace(/\r/g, '\n');
            
            // Add BOM and write file back with explicit UTF-8 encoding
            const contentWithBom = '\uFEFF' + normalizedContent;
            writeFileSync(filePath, contentWithBom, { encoding: 'utf8' });
            
            console.log(`✅ Fixed encoding for ${fileName}`);
          } catch (error) {
            // File might not exist, which is fine
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
              console.warn(`⚠️  Could not fix encoding for ${fileName}:`, error);
            }
          }
        }
      },
    },
  };
}
```

3. В файле astro.config.mjs (или astro.config.ts):
   - Добавь импорт: `import starlightLlmsTxt from "starlight-llms-txt";`
   - Добавь импорт: `import fixLlmsEncoding from "./src/integrations/fixLlmsEncoding.js";`
   - Добавь `fixLlmsEncoding()` в массив integrations
   - В конфигурации starlight добавь плагин в массив plugins:

```javascript
starlight({
  // ... существующие настройки
  plugins: [
    // ... существующие плагины
    starlightLlmsTxt({
      projectName: "Название проекта", // Замени на реальное название
      exclude: ["design/**"], // Исключи страницы с React компонентами, если есть
      rawContent: true, // Используй сырой контент
      customSets: [
        {
          label: "llms-coding",
          paths: [
            "global/code-style/**",
            "global/i18n/**",
            "global/metrics/**",
            "global/routing/**",
            "global/adaptive/**",
          ],
        },
        {
          label: "llms-devflow",
          paths: [
            "global/development-flow/**",
            "global/git-flow/**",
            "global/ci-cd/**",
            "global/gitlab-structure/**",
          ],
        },
      ],
    }),
  ],
}),
```

4. Адаптируй пути в customSets.paths под структуру документации в этом проекте. 
   Пути должны быть относительно src/content/docs/ и использовать glob-паттерны.

5. После настройки файлы будут генерироваться автоматически при выполнении `pnpm build` 
   и появятся в директории dist/.
```

---

## Альтернативный упрощенный промпт

Если нужна минимальная настройка без кастомных наборов:

```
Настрой генерацию llms.txt файлов для Astro + Starlight проекта:

1. Установи starlight-llms-txt@0.6.0 в devDependencies
2. Создай src/integrations/fixLlmsEncoding.ts (код выше)
3. В astro.config добавь импорты и подключи:
   - fixLlmsEncoding() в integrations
   - starlightLlmsTxt({ projectName: "Название", rawContent: true }) в starlight.plugins

Файлы будут генерироваться при сборке в dist/.
```

---

## Что проверить после настройки

1. ✅ Пакет установлен: `pnpm list starlight-llms-txt`
2. ✅ Файл интеграции создан: `src/integrations/fixLlmsEncoding.ts`
3. ✅ Импорты добавлены в astro.config
4. ✅ Интеграция подключена
5. ✅ Плагин добавлен в starlight.plugins
6. ✅ Сборка проходит успешно: `pnpm build`
7. ✅ Файлы созданы: проверь `dist/llms.txt`, `dist/llms-full.txt`
