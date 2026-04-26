# Сборка иконок @design-system/icons

Документ описывает пайплайн сборки иконок: от исходных SVG до React-компонентов (standalone и sprite) и спрайтов. Предназначен для разработчиков и агентов, которые меняют или отлаживают этот процесс.

---

## 1. Структура папок

| Путь                                 | Назначение                                                                                                                                                  | В git                                    |
| ------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- | ---------------------------------------- |
| `svgs/`                              | Исходные SVG (ручное редактирование). Группы = подпапки верхнего уровня в `svgs/` (например snack-icons, product-icons, web-icons).                         | да                                       |
| `svgs-fixed/`                        | Результат fixIcons: нормализованные SVG (currentColor, stroke-width через переменную). Вход для SVGR и createSprite. Временная папка для генерации/отладки. | нет (игнорируется корневым `.gitignore`) |
| `src/components/<group>/sprite/`     | React-компоненты спрайт-иконок (`*SpriteSVG`), генерируются SVGR из svgs-fixed.                                                                             | нет                                      |
| `src/components/<group>/standalone/` | React-компоненты инлайн-иконок (`*SVG`), генерируются SVGR из svgs-fixed.                                                                                   | нет                                      |
| `src/sprite/`                        | Компонент `Sprite.tsx` и сгенерированный barrel `index.ts` (экспорт Sprite + сырые SVG спрайтов по группам).                                                | да                                       |
| `templates/`                         | Конфиги и шаблоны SVGR (sprite/standalone), generateDataTestId.                                                                                             | да                                       |

Группы иконок определяются автоматически: каждая подпапка в `svgs/`, в которой есть хотя бы один `.svg`, считается группой (`iconGroups.ts`).

---

## 2. Порядок сборки (build:icons)

Вызов: из папки `packages/icons` — `pnpm run build:icons` (или `npm run build:icons`). Из корня монорепо — `pnpm --filter @design-system/icons run build:icons`.

1. **fixIcons**  
   `rimraf svgs-fixed && ts-node scripts/fixIcons.ts`
2. **SVGR: sprite-компоненты**  
   Для каждой группы: `svgr -d src/components/<group>/sprite svgs-fixed/<group> --config-file templates/.svgrrc.sprite.js` (с `SYMBOL_PREFIX=snack-uikit-<groupId>-`).
3. **postProcessIconFallback**  
   `ts-node scripts/postProcessIconFallback.ts`
4. **SVGR: standalone-компоненты**  
   Для каждой группы: `svgr -d src/components/<group>/standalone svgs-fixed/<group> --config-file templates/.svgrrc.standalone.js`.
5. **createSprite**  
   `ts-node scripts/createSprite.ts`
6. **syncGeneratedIcons**  
   `ts-node scripts/syncGeneratedIcons.ts` — синхронизация сгенерированных файлов с `svgs/`:
   - удаляет осиротевшие компоненты/группы (если исходники удалены);
   - удаляет осиротевшие sprite-файлы;
   - внутри вызывает `createExportIndexFile.ts` (индексы экспортов) и `fixTypesImport.ts` (относительные пути к `src/types` в сгенерированных компонентах).
7. **Prettier**  
   Из корня монорепозитория запускается `pnpm exec prettier --write` по сгенерированным путям (`packages/icons/src/components/**/*.{ts,tsx}`, `packages/icons/src/sprite/index.ts`, при наличии — `packages/icons/src/icon-font/*.{css,json}`), чтобы форматирование совпадало с правилами проекта и в git не появлялся лишний дифф после сборки.

---

## 3. fixIcons (svgs → svgs-fixed)

- **Источник:** `svgs/<group>/...`
- **Результат:** `svgs-fixed/<group>/...` (та же структура папок).

Для каждого SVG:

1. **oslllo-svg-fixer**  
   Конвертирует stroke в fill, приводит к одному path и т.п. (подготовка под шрифты/спрайты).
2. **normalizeSvgColors** (после записи файла в svgs-fixed):
   - **Цвета:** любой `fill="..."` и `stroke="..."` (в т.ч. в одинарных кавычках), кроме `none` / `currentColor` / `inherit`, заменяются на `fill="currentColor"` и `stroke="currentColor"`.
   - **stroke-width:**
     - `stroke-width="1.5"` и `stroke-width="1.5px"` (с любыми пробелами) → `stroke-width="var(--sn-density-size-icon-strokeWeight-s)"`.
     - Уже подставленная примитивная переменная `var(--sn-primitive-strokeWeight-strokeMedium, ...)` тоже заменяется на эту же токен-переменную.

Итог: в svgs-fixed все иконки окрашиваются через `currentColor` и используют дизайн-токен для толщины обводки.

---

## 4. SVGR: sprite и standalone

- **Вход:** `svgs-fixed/<group>/` (те же SVG после fixIcons).
- **Выход:**
  - sprite: `src/components/<group>/sprite/.../*.tsx` (компоненты с суффиксом `SpriteSVG`).
  - standalone: `src/components/<group>/standalone/.../*.tsx` (компоненты с суффиксом `SVG`).

Имена компонентов и `data-test-id` строятся из имени файла (PascalCase). В шаблоне спрайта `generateDataTestId(componentName)` использует ту же нормализацию, что и скрипты генерации: camel/PascalCase и пробелы/дефисы приводятся к одному kebab-виду с учётом чисел (например, `SvgAiAssistant` → `-ai-assistant`, `SvgSmile2` → `-smile2`). Это же значение участвует в **symbolId**: `snack-uikit-<groupId>-<kebab>`.

Важно: **symbolId в спрайте и в компоненте должны совпадать.** Иначе `<use href="#id">` не найдёт символ и сработает fallback.

---

## 5. createSprite (svgs-fixed → sprite.\*.symbol.svg)

- **Вход:** `svgs-fixed/<group>/` (все SVG рекурсивно).
- **Выход:** `src/sprite/svg/sprite.<groupId>.symbol.svg` (и копии в dist при сборке пакета).

Для каждого SVG:

1. **filenameToSymbolIdPart(basename(filePath))**  
   Имя файла без расширения нормализуется через общую утилиту `scripts/symbolId.ts`:
   - добавляется разделитель между camelCase/PascalCase сегментами;
   - любые неалфанумерические символы (пробелы, дефисы и т.д.) приводятся к `-`;
   - лишние `-` схлопываются, результат в lowercase.  
     Примеры: `AI.svg` → `ai`, `CPU.svg` → `cpu`, `AiAssistant.svg` → `ai-assistant`, `Zap Flash.svg` → `zap-flash`.
2. **Нормализация цветов в содержимом SVG:**  
   `fill="..."` и `stroke="..."` (кроме `none`) → `fill="currentColor"` и `stroke="currentColor"` (чтобы символы не наследовали `fill="none"` от `<symbol>` и оставались видимыми).
3. **SVGO** (optimize) по умолчанию.
4. **Пути без fill:** для self-closing `<path ... />` без атрибута `fill` добавляется `fill="currentColor"` (после optimize), чтобы они не наследовали `fill="none"` от символа.

Итог: в спрайте каждый символ имеет id `snack-uikit-<groupId>-<kebab>`, совпадающий с тем, что ожидает соответствующий sprite-компонент.

---

## 6. postProcessIconFallback

- **Запуск:** после генерации sprite-компонентов SVGR, до standalone и createSprite.
- **Назначение:** для каждого sprite-компонента (`*SpriteSVG`) подставить fallback на случай, если символ с нужным id не найден в DOM (например, спрайт не подключён или id не совпадает).

Для каждого `.tsx` в `src/components/<group>/sprite/`:

1. **Поиск соответствующего SVG в svgs-fixed**  
   Для группы строится индекс `symbolId -> svgPath` на основе всех файлов в `svgs-fixed/<group>`.  
   Поиск идёт в первую очередь по фактическому `symbolId` из компонента (`const symbolId = ...`), затем по имени компонента через ту же нормализацию `scripts/symbolId.ts`.
2. **Чтение SVG**, извлечение внутреннего HTML (содержимое между `<svg>` и `</svg>`), удаление атрибутов `fill` и `fill-opacity` из этого HTML, экранирование для строки в JS.
3. **Вставка в .tsx:**
   - константа `FALLBACK_SVG_INNER = "<path ...>"`;
   - состояние `useFallback` и `useEffect`: если `document.getElementById(symbolId)` отсутствует, выставить `useFallback(true)` и вывести предупреждение в консоль;
   - рендер: при `useFallback` — `<g dangerouslySetInnerHTML={{ __html: FALLBACK_SVG_INNER }} />`, иначе `<use href={'#' + symbolId} />`.

Если SVG для компонента не найден (например, имя файла с пробелами не сопоставилось), fallback не добавляется — компонент остаётся только с `<use>`, и при отсутствии символа иконка будет пустой.

---

## 7. Symbol ID: единая нормализация

Чтобы спрайт и компонент работали вместе:

- **createSprite** и **postProcessIconFallback** используют одну и ту же утилиту нормализации (`scripts/symbolId.ts`: `filenameToSymbolIdPart`, `componentNameToSymbolIdPart` / `normalizeToSymbolIdPart`) для получения id-части.
- **SVGR-компоненты** формируют `symbolId` через шаблон с `generateDataTestId` (`templates/generateDataTestId.js`), логика которого согласована с `symbolId.ts`.

Ожидаемое поведение: для любого имени файла после нормализации должен получаться тот же kebab-id, что и в компоненте (`AiAssistant` → `ai-assistant`, `Zap Flash` → `zap-flash`, числа без дефиса: `Smile2` → `smile2`). При рассинхроне `<use href="#id">` не найдёт символ и включится fallback.

---

## 8. Использование в приложении / Storybook

- **Standalone:** импорт компонента (например, `AcceptSVG`), рендер `<AcceptSVG size={24} />`. Цвет наследуется через `currentColor`.
- **Sprite:**
  1. В DOM должен быть разметан спрайт (содержимое `sprite.<group>.symbol.svg`), например через компонент `Sprite` с `content={SpriteProductIconsSVG}` и т.п.
  2. Компоненты вида `AcceptSpriteSVG` рендерят `<svg><use href="#snack-uikit-product-icons-accept" /></svg>`.
  3. Если символа с таким id нет, postProcessIconFallback (если он смог найти SVG) подставляет инлайн fallback.

В Storybook для варианта «sprite» передаётся нужный спрайт по выбранной группе (SpriteProvider + Sprite с контентом из экспортов `src/sprite/index.ts`).

---

## 9. Отдельные команды

Все команды запускаются из папки `packages/icons` (например, `pnpm run build:icons`).

- `fix:icons` — только fixIcons (svgs → svgs-fixed).
- `create-sprite` — только createSprite (ожидает уже существующий svgs-fixed).
- `post-process-icons` — только postProcessIconFallback.
- `create-export-index-file` — только пересборка индексов экспортов.
- `sync:icons` — синхронизация сгенерированных компонентов/спрайтов с исходниками (удаление осиротевших, вызов createExportIndexFile и fixTypesImport).
- `validate:icons` — валидация иконок (`ts-node scripts/validateIcons.ts`).
- Полная пересборка: `build:icons` (в конце автоматически вызывается Prettier по сгенерированным файлам).

`compile` для пакета иконок намеренно не используется: генерация и синхронизация выполняются вручную через команды выше.

---

## 10. Частые проблемы

- **Иконка в режиме sprite пустая или fallback:** проверьте, что id символа в спрайте совпадает с symbolId в компоненте (логика `scripts/symbolId.ts` + `generateDataTestId`). Проверьте, что спрайт реально смонтирован в DOM (например, SpriteProvider в сторибуке).
- **У части иконок нет fallback:** postProcessIconFallback не смог сопоставить `symbolId` с файлом в `svgs-fixed`. Проверка: id в компоненте должен находиться среди id в `sprite.<group>.symbol.svg`.
- **Цвет не наследуется / жёлтые иконки:** в svgs-fixed после fixIcons не должно оставаться жёстких цветов; всё заменяется на currentColor. Если правки вносятся вручную в svgs-fixed, их перезапишет следующий fixIcons — править нужно в `svgs/`.
- **Толщина обводки не по дизайну:** в fixIcons все `stroke-width="1.5"` и `1.5px` заменяются на `var(--sn-density-size-icon-strokeWeight-s)`. Убедитесь, что эта переменная подключена в приложении (например, из @sbercloud/figma-variables).
