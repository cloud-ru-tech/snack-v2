# Addon: Theme Controls

Аддон Storybook для переключения **темы**, **бренда** и **плотности** через тулбар (хедер canvas). Значения хранятся в глобалах и передаются в `StoryWrapper` через декоратор в `preview.tsx`.

## Структура

```
theme-controls/
  preset.ts                 # Точка входа: managerEntries + previewAnnotations
  manager.tsx               # Регистрация TOOL в тулбаре
  preview-annotations.tsx    # Декоратор preview (ThemeSyncBridge)
  index.ts                  # Публичный API (constants для preview.tsx и др.)

  src/
    constants.ts            # ADDON_ID, GLOBAL_KEYS, OPTIONS, CHANNEL_SYNC_EVENT, типы
    config/
      brandColors.ts        # Цвета брендов
      svgPaths.ts           # SVG path для иконок (day, night, acrylic)
    toolbar/
      ThemeControlsToolbar.tsx   # UI тулбара (Select-ы с иконками)
    preview/
      ThemeSyncBridge.tsx   # postMessage → channel для синхронизации с документацией
```

## Поведение

- **Тулбар**: селекты темы, бренда, плотности и языка в хедере canvas; иконки из `src/config/svgPaths.ts`, цвет бренда из `src/config/brandColors.ts`.
- **Preview**: декоратор читает `context.globals` и передаёт значения в `StoryWrapper`.
- **Платформа**: отдельного селекта нет — декоратор в `preview.tsx` передаёт в `RootThemeProvider` платформу, согласованную с глобалом `layoutType` (переключатель Layout): `webMobile` только для Mobile.
- **Синхронизация с документацией**: iframe слушает `postMessage({ type: 'theme-sync', ... })` и шлёт в channel; manager обновляет глобалы.
