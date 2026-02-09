# Materials

Пакет **не предоставляет React-компоненты**, только вспомогательные **SCSS-миксины** для общих визуальных модификаторов: акриловый фон (acrylic) и слой состояний (state layer). Используется при разработке компонентов дизайн-системы для единообразного оформления фона и интерактивных состояний.

## Installation

```bash
npm install @design-system/materials
# or
yarn add @design-system/materials
# or
pnpm add @design-system/materials
```

## Exports





## Usage

### Acrylic — базовый пример

```tsx
<div className={styles.card}>
  <div data-acrylic-background />
  <div className={styles.content}>{children}</div>
</div>
```

### State layer — слой состояний

```tsx
<button type="button" className={styles.button}>
  <span data-state-layer data-state="regularBackground" />
  <span className={styles.label}>Текст кнопки</span>
</button>
```

### State layer — маска для текста (maskColor)

```tsx
<div className={styles.iconButton}>
  <div data-content-layer data-state="maskColor" />
  <span data-masked-content>
    <Icon />
  </span>
</div>
```

## Props



## Best Practices

1. **Один фоновый слой** — в одном блоке один дочерний элемент с `data-acrylic-background`; контент размещайте в соседних дочерних элементах с вышележащим z-index.
2. **Один state layer на компонент** — у компонента может быть только один элемент с атрибутом `data-state-layer` (например, `div[data-state-layer]`); миксин применяется к корню, hover/active обрабатываются на корне.
3. **Переменные дизайн-системы** — для acrylic подставляйте значения из `@sbercloud/figma-variables` (blur, opacity, цвета), чтобы сохранять единый стиль.
4. **Маска только для нужного контента** — помечайте `data-masked-content` только у текста и иконок, которые должны менять цвет при наведении/нажатии.
5. **Не дублировать логику** — если используете готовый компонент (например, Block из `@design-system/block`), он уже может использовать эти миксины; не подключайте materials повторно для того же визуального эффекта.

---

## Additional Resources

- **Full Documentation:** [View documentation](./docs/index.mdx)
- **Changelog:** [View changelog](./CHANGELOG.md)
- **Migration Guide:** [View migration guide](./MIGRATION.md)
